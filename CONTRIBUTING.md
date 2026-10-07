# Contributing to trackmypulls-gacha-data

Thanks for contributing. This repository is the public core data and asset layer for TrackMyPulls.

## What to contribute

Good contributions include:

- adding support for a new game
- updating characters, weapons, or other item data
- fixing incorrect config values
- improving or correcting game assets
- cleaning up inconsistent naming across config, data, and images

## Before opening a pull request

Make sure your change is consistent across the repo:

- register the game in [`static/data/config/games.json`](./static/data/config/games.json) when adding a new game
- add or update the matching game file in [`static/data/collection-items`](./static/data/collection-items)
- add the required images under [`static/assets/images`](./static/assets/images)
- keep slugs and folder names aligned between config, data files, and asset folders

## New game checklist

1. Add the game entry to [`static/data/config/games.json`](./static/data/config/games.json).
2. Create a matching item file in [`static/data/collection-items`](./static/data/collection-items).
3. Add the matching asset folder in [`static/assets/images`](./static/assets/images).
4. Add the required subfolders and files for the item and attribute types used by that game.
5. Verify naming matches everywhere before opening the pull request.

## Pull request notes

- keep pull requests focused on one game or one logical change
- use clear file and folder names
- avoid unrelated formatting-only changes
- explain what game or data set you changed in the pull request description

## Questions

If something is unclear, open an issue or discussion before making a large structural change.
