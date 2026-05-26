// scripts/json-to-ts.ts
// Entrypoint that invokes converters under `scripts/funcs/`.
/// <reference types="node" />

import convertGames from "./funcs/games-converter";
import mergeGames from "./funcs/merge-games";
import convertOthers from "./funcs/others-converter";

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

try {
  convertOthers();
}
catch (err) {
  console.error("Error generating TS files for others:", err);
  process.exit(1);
}
