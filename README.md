# trackmypulls-gacha-data

`trackmypulls-gacha-data` is the public source of truth for the data, assets, and configuration that power the TrackMyPulls frontend.

This repository does not contain the app itself. It contains the game definitions, structured content, and image assets the frontend consumes to render supported games dynamically.

TrackMyPulls is a gacha tracking project. This repository is the shared data layer for game support, pull tracking content, character and weapon data, and frontend-ready assets.

Current game data in this repository includes support for Wuthering Waves and Arknights: Endfield.

## What lives here

- Game configuration
- Item datasets
- Shared image assets
- Contribution-friendly content updates

In practice, this means new game support can be introduced here by adding the required config, data, and assets without changing the public contents of the frontend repository.

## Discoverability

This repository may be useful if you are looking for:

- gacha game data
- gacha tracker assets
- pull tracker configuration
- Wuthering Waves character and weapon data
- Arknights Endfield character and weapon data
- frontend-ready game assets for a tracking app

## Repo Roles

- `trackmypulls-gacha-data`: public data, config, and assets
- `trackmypulls`: private frontend application
- `trackmypulls-api`: private backend application
- `trackmypulls-admin`: private admin UI for editing this repo

## Structure

- [`static/data/config/games.json`](./static/data/config/games.json): game registry and display/config metadata
- [`static/data/collection-items`](./static/data/collection-items): per-game item data
- [`static/data/generated`](./static/data/generated): TS built from `static/data/config` by `npm run generate:ts`. Do not edit by hand; edit the JSON in `config` instead
- [`static/assets/images`](./static/assets/images): per-game visual assets used by the frontend
- [`static/import`](./static/import): per-game PowerShell import scripts (`{game}.ps1`) that the frontend tells users to run

## Contributing

Contributions are intended to happen here.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for contribution guidelines.

Useful examples include:

- adding support for a new game
- updating item data for an existing game
- fixing or improving image assets
- correcting config values used by the frontend

When adding a new game:

- update [`static/data/config/games.json`](./static/data/config/games.json) to register the game and define its frontend-facing config
- add or update the matching game file in [`static/data/collection-items`](./static/data/collection-items) to include characters, weapons, or other supported items
- add the required game assets under [`static/assets/images`](./static/assets/images)

Keep config, data, and assets aligned so the frontend can consume the new entry consistently.

## New Game Checklist

1. Add the new game entry to [`static/data/config/games.json`](./static/data/config/games.json).
2. Create or update the game item file in [`static/data/collection-items`](./static/data/collection-items), following the existing per-game pattern such as `wuwa.json` or `endfield.json`.
3. Add the game asset folder under [`static/assets/images`](./static/assets/images), using a consistent slug for the new game.
4. Add the image subfolders needed by that game's config and item data, such as character, weapon, element, or other attribute folders.
5. Verify the config slug, item data file, and image folder naming all match.

## Banner 50/50 Pools

A banner in `games.json` can mark its top rarity as a 50/50 with `fiftyFifty`. `loseItems` lists what you can get by losing it, by collection item name:

```json
"fiftyFifty": {
  "itemType": "characters",
  "loseItems": [
    "Calcharo",
    { "name": "SomeCharacter", "since": "2026-09-15" }
  ]
}
```

- A plain name has been in the pool since launch.
- `{ "name", "since" }` is a formerly limited item that joined the pool later. `since` is an ISO date, or a full time with offset (`2026-09-15T04:00:00+08:00`) when the pool changed partway through a day. Pulls of it before `since` count as 50/50 wins.

The admin UI's banner editor sets both.

## Sync

This repository is used as a shared input for downstream apps. The asset sync workflow copies the contents of [`assets`](./assets) into target application repositories.
