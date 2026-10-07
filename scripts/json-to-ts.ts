// scripts/json-to-ts.ts
// Entrypoint that invokes converters under `scripts/funcs/`.
/// <reference types="node" />

import convertConfigs from "./funcs/config-converter";
import convertGames from "./funcs/games-converter";

try {
  convertGames();
  convertConfigs();
} catch (err) {
  console.error("Error generating TS files:", err);
  process.exit(1);
}
