// scripts/json-to-ts.ts
// Entrypoint that invokes converters under `scripts/funcs/`.
/// <reference types="node" />

import convertGames from "./funcs/games-converter";
import mergeGames from "./funcs/merge-games";

try {
  convertGames();
} catch (err) {
  console.error("Error generating TS files:", err);
  process.exit(1);
}

try {
  mergeGames();
} catch (err) {
  console.error("Error merging game JSON files:", err);
  process.exit(1);
}
