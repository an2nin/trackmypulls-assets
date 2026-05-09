# trackmypulls-core

`trackmypulls-core` is the public source of truth for the data, assets, and configuration that power the TrackMyPulls frontend.

This repository does not contain the app itself. It contains the game definitions, structured content, and image assets the frontend consumes to render supported games dynamically.

## What lives here

- Game configuration
- Item datasets
- Shared image assets
- Contribution-friendly content updates

In practice, this means new game support can be introduced here by adding the required config, data, and assets without changing the public contents of the frontend repository.

## Repo Roles

- `trackmypulls-core`: public data, config, and assets
- `trackmypulls-web`: private frontend application
- `trackmypulls-api`: private backend application

## Structure

- [`assets/data/config/games.json`](./assets/data/config/games.json): game registry and display/config metadata
- [`assets/data/gacha-items`](./assets/data/gacha-items): per-game item data
- [`assets/images`](./assets/images): per-game visual assets used by the frontend

## Contributing

Contributions are intended to happen here.

Useful examples include:

- adding support for a new game
- updating item data for an existing game
- fixing or improving image assets
- correcting config values used by the frontend

When adding a new game:

- update [`assets/data/config/games.json`](./assets/data/config/games.json) to register the game and define its frontend-facing config
- add or update the matching game file in [`assets/data/gacha-items`](./assets/data/gacha-items) to include characters, weapons, or other supported items
- add the required game assets under [`assets/images`](./assets/images)

Keep config, data, and assets aligned so the frontend can consume the new entry consistently.

## New Game Checklist

1. Add the new game entry to [`assets/data/config/games.json`](./assets/data/config/games.json).
2. Create or update the game item file in [`assets/data/gacha-items`](./assets/data/gacha-items), following the existing per-game pattern such as `wuwa.json` or `endfield.json`.
3. Add the game asset folder under [`assets/images`](./assets/images), using a consistent slug for the new game.
4. Add the image subfolders needed by that game's config and item data, such as character, weapon, element, or other attribute folders.
5. Verify the config slug, item data file, and image folder naming all match.

## Sync

This repository is used as a shared input for downstream apps. The asset sync workflow copies the contents of [`assets`](./assets) into target application repositories.
