// scripts/funcs/merge-games.ts
/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";

export default function mergeGames(): void {
  const inputDir = path.join(process.cwd(), "./static/data/config/games");
  const outputDir = path.join(process.cwd(), "./static/admin");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".json"));

  const merged: unknown[] = [];

  for (const file of files) {
    const jsonPath = path.join(inputDir, file);
    const raw = fs.readFileSync(jsonPath, "utf-8");
    try {
      const parsed = JSON.parse(raw);
      merged.push(parsed);
    } catch (err) {
      // Skip invalid JSON files but surface a console message so callers can investigate.
      // eslint-disable-next-line no-console
      console.warn(`Skipping invalid JSON file: ${file} — ${err}`);
    }
  }

  const outPath = path.join(outputDir, "games.json");
  fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), "utf-8");

  // eslint-disable-next-line no-console
  console.log(`Wrote merged JSON (array) to ${outPath}`);
}
