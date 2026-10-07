<#
This script finds the Signal Search history URL for "Zenless Zone Zero" (global client).
It locates the game folder, reads the game's web cache for the newest history URL,
checks that the URL still works, strips it down to the parameters TrackMyPulls needs,
and copies it to your clipboard.

Note: If the script can't find the game automatically, it will ask you for the
install folder. You can also pass it directly: .\zzz.ps1 -GamePath "D:\Games\ZenlessZoneZero Game"

Disclaimer: This script may not work correctly if the game has been modified by
third-party tools or mods. If you run into problems, join our Discord server for
help: https://discord.gg/DFKG4nqUD4

Based on get_signal_link_os.ps1 by rng.moe, licensed under the Apache License 2.0
(http://www.apache.org/licenses/LICENSE-2.0). Copyright 2026 rng.moe.
Modified by TrackMyPulls: rewritten game and cache discovery, version-safe cache
selection, shared-mode file reads, expired-link handling, a manual path prompt,
CN client detection and TrackMyPulls-specific output.
#>
[CmdletBinding()]
param(
    [string]$GamePath
)

# PowerShell 5.1 on older Windows may not enable TLS 1.2 by default
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
Add-Type -AssemblyName System.Web
$ProgressPreference = 'SilentlyContinue'

$discordUrl = 'https://discord.gg/DFKG4nqUD4'
$importUrl = 'https://trackmypulls.com/en/zzz/tracker/import'

# Query parameters TrackMyPulls needs. Everything else (device model, OS, etc.) is removed.
$keepParams = @('authkey', 'authkey_ver', 'sign_type', 'game_biz', 'lang')

function Read-SharedFileBytes {
    param ([string]$Path)

    # Open with ReadWrite sharing so the read works while the game has the file open
    $stream = $null
    try {
        $stream = [System.IO.File]::Open(
            $Path,
            [System.IO.FileMode]::Open,
            [System.IO.FileAccess]::Read,
            [System.IO.FileShare]::ReadWrite
        )
        $memoryStream = New-Object System.IO.MemoryStream
        $stream.CopyTo($memoryStream)
        return $memoryStream.ToArray()
    }
    finally {
        if ($stream) {
            $stream.Dispose()
        }
    }
}

function Read-SharedFileText {
    param ([string]$Path)

    return [System.Text.Encoding]::UTF8.GetString((Read-SharedFileBytes $Path))
}

# Accepts the install folder or the ZenlessZoneZero_Data folder. Returns the data folder or $null.
function Resolve-DataFolder {
    param ([string]$Path)

    if ([string]::IsNullOrWhiteSpace($Path)) {
        return $null
    }

    $Path = $Path.Trim().Trim('"')
    $candidates = @(
        $Path,
        (Join-Path $Path 'ZenlessZoneZero_Data'),
        (Join-Path $Path 'ZenlessZoneZero Game\ZenlessZoneZero_Data')
    )

    foreach ($candidate in $candidates) {
        if (Test-Path -LiteralPath (Join-Path $candidate 'webCaches')) {
            return $candidate
        }
    }

    return $null
}

# The game's Player.log records its data folder as "...ZenlessZoneZero_Data/UnitySubsystems"
function Find-DataFolderFromLogs {
    $localLow = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) '..\LocalLow\miHoYo'
    $logFolder = Join-Path $localLow 'ZenlessZoneZero'

    foreach ($logName in @('Player.log', 'Player-prev.log')) {
        $logPath = Join-Path $logFolder $logName
        if (-not (Test-Path -LiteralPath $logPath)) {
            continue
        }

        try {
            $text = Read-SharedFileText $logPath
        }
        catch {
            continue
        }

        $patterns = @(
            'Discovering subsystems at path ([^\r\n]*?ZenlessZoneZero_Data)[\\/]',
            '([A-Za-z]:[\\/][^\r\n:]*?ZenlessZoneZero_Data)[\\/]'
        )
        foreach ($pattern in $patterns) {
            $match = [regex]::Match($text, $pattern)
            if ($match.Success) {
                $dataFolder = Resolve-DataFolder $match.Groups[1].Value
                if ($dataFolder) {
                    return $dataFolder
                }
            }
        }
    }

    return $null
}

function Test-ChineseClient {
    # The CN client logs to LocalLow\miHoYo\<Chinese game name>, built from code points so the file stays ASCII
    $cnName = -join @([char]0x7EDD, [char]0x533A, [char]0x96F6)
    $localLow = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) '..\LocalLow\miHoYo'
    return (Test-Path -LiteralPath (Join-Path $localLow $cnName))
}

# Picks data_2 from the highest-versioned webCaches\<version> folder, falling back to the old flat layout
function Find-CacheFile {
    param ([string]$DataFolder)

    $webCaches = Join-Path $DataFolder 'webCaches'
    $best = $null
    $bestVersion = $null

    foreach ($folder in (Get-ChildItem -LiteralPath $webCaches -Directory -ErrorAction SilentlyContinue)) {
        $version = $null
        if (-not [version]::TryParse($folder.Name, [ref]$version)) {
            continue
        }

        $cacheFile = Join-Path $folder.FullName 'Cache\Cache_Data\data_2'
        if ((Test-Path -LiteralPath $cacheFile) -and (($null -eq $bestVersion) -or ($version -gt $bestVersion))) {
            $bestVersion = $version
            $best = $cacheFile
        }
    }

    if (-not $best) {
        $legacy = Join-Path $webCaches 'Cache\Cache_Data\data_2'
        if (Test-Path -LiteralPath $legacy) {
            $best = $legacy
        }
    }

    return $best
}

# Returns history URLs found in the cache, newest first, one per authkey
function Get-HistoryUrls {
    param ([string]$Text)

    $found = [regex]::Matches(
        $Text,
        'https://[A-Za-z0-9.\-]+\.hoyoverse\.com/common/gacha_record/api/getGachaLog\?[^\s"<>\x00]+'
    )

    $urls = New-Object System.Collections.Generic.List[string]
    $seenKeys = New-Object System.Collections.Generic.HashSet[string]

    for ($i = $found.Count - 1; $i -ge 0; $i--) {
        $url = $found[$i].Value
        $authkey = [System.Web.HttpUtility]::ParseQueryString(([Uri]$url).Query)['authkey']
        if ($authkey -and $seenKeys.Add($authkey)) {
            $urls.Add($url)
        }
    }

    return , $urls
}

# Returns 'ok', 'invalid' (expired or rejected) or 'unknown' (network error)
function Test-HistoryUrl {
    param ([string]$Url)

    try {
        $response = Invoke-RestMethod -Uri $Url -UseBasicParsing -TimeoutSec 15
    }
    catch {
        return 'unknown'
    }

    if ($response.retcode -eq 0) {
        return 'ok'
    }
    return 'invalid'
}

function Get-CleanUrl {
    param ([string]$Url)

    $uri = [Uri]$Url
    $query = [System.Web.HttpUtility]::ParseQueryString($uri.Query)
    foreach ($key in @($query.AllKeys)) {
        if ($keepParams -notcontains $key) {
            $query.Remove($key)
        }
    }

    return $uri.Scheme + '://' + $uri.Host + $uri.AbsolutePath + '?' + $query.ToString()
}

function Copy-ToClipboard {
    param ([string]$Text)

    try {
        Set-Clipboard -Value $Text -ErrorAction Stop
        return $true
    }
    catch {
        try {
            $Text | clip.exe
            return ($LASTEXITCODE -eq 0)
        }
        catch {
            return $false
        }
    }
}

function Invoke-Main {
    Write-Host "`n`nLooking for your Zenless Zone Zero game folder..." -ForegroundColor Yellow

    $dataFolder = $null
    if ($GamePath) {
        $dataFolder = Resolve-DataFolder $GamePath
        if (-not $dataFolder) {
            Write-Host "Could not find the game's web cache under: $GamePath" -ForegroundColor Red
        }
    }

    if (-not $dataFolder) {
        $dataFolder = Find-DataFolderFromLogs
    }

    if (-not $dataFolder -and (Test-ChineseClient)) {
        Write-Host "`nIt looks like you're using the Chinese (CN) client. TrackMyPulls only supports the global client for now." -ForegroundColor Red
        Write-Host "If you also have the global client installed, enter its folder below.`n"
    }

    while (-not $dataFolder) {
        Write-Host "Game folder not found. Enter your Zenless Zone Zero install folder, or ask for help on Discord: $discordUrl"
        Write-Host 'Common install folders:' -ForegroundColor Yellow
        Write-Host '  C:\Program Files\HoYoPlay\games\ZenlessZoneZero Game'
        Write-Host '  C:\Program Files\Epic Games\ZenlessZoneZero'
        $manualPath = Read-Host 'Path'

        $dataFolder = Resolve-DataFolder $manualPath
        if (-not $dataFolder) {
            Write-Host "No game web cache found in that folder. Check the path and try again.`n" -ForegroundColor Red
        }
    }

    $cacheFile = Find-CacheFile $dataFolder
    if (-not $cacheFile) {
        Write-Host "`nNo web cache found in $dataFolder." -ForegroundColor Red
        Write-Host 'Open Signal Search in the game, open the history of any channel, wait for it to load, then run this command again.' -ForegroundColor Red
        return
    }

    try {
        $cacheText = Read-SharedFileText $cacheFile
    }
    catch {
        Write-Host "`nCould not read the game's web cache: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host 'Close the game and run this command again.' -ForegroundColor Red
        return
    }

    $urls = Get-HistoryUrls $cacheText
    if ($urls.Count -eq 0) {
        Write-Host "`nNo Signal Search history URL found." -ForegroundColor Red
        Write-Host 'Open Signal Search in the game, open the history of any channel, wait for it to load, then run this command again.' -ForegroundColor Red
        return
    }

    Write-Host "Found $($urls.Count) history link(s). Checking which one still works..." -ForegroundColor Yellow

    $chosen = $null
    $unchecked = $null
    foreach ($url in $urls) {
        $status = Test-HistoryUrl $url
        if ($status -eq 'ok') {
            $chosen = $url
            break
        }
        if ($status -eq 'unknown' -and -not $unchecked) {
            $unchecked = $url
        }
    }

    if (-not $chosen -and $unchecked) {
        # Couldn't reach HoYoverse to check; use the newest link and let the import page validate it
        $chosen = $unchecked
        Write-Host "`nCould not reach HoYoverse to check the link. Using the newest one found; if the import fails, open the history in-game again and rerun." -ForegroundColor Yellow
    }

    if (-not $chosen) {
        Write-Host "`nAll history links found have expired or are invalid." -ForegroundColor Red
        Write-Host 'Open Signal Search in the game, open the history of any channel again, then rerun this command.' -ForegroundColor Red
        return
    }

    $cleanUrl = Get-CleanUrl $chosen

    Write-Host "`nSignal Search history URL:"
    Write-Host $cleanUrl -ForegroundColor Cyan

    if (Copy-ToClipboard $cleanUrl) {
        Write-Host "`nURL copied to clipboard. Paste it into $importUrl and click 'Import Pulls'." -ForegroundColor Green
    }
    else {
        Write-Host "`nCould not copy to the clipboard. Copy the URL above and paste it into $importUrl." -ForegroundColor Yellow
    }
}

Invoke-Main
Write-Host "`n"
