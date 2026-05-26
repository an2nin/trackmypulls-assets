// scripts/funcs/games-converter.ts
// Ensure Node.js types are available to TypeScript (fixes "Cannot find name 'process'" errors)
/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";

export default function convertOthers(): void {
  const inputDir = path.join(process.cwd(), "./static/data/config/others");
  const outputDir = path.join(process.cwd(), "./static/data/converted/");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir);



  for (const file of files) {
    const jsonPath = path.join(inputDir, file);

    const raw = fs.readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(raw);

    const baseName = path.basename(file, ".json");

    const variableName = baseName.replace('-', '_').toUpperCase();

    const tsContent = `export const ${variableName} = ${JSON.stringify(
      parsed,
      null,
      2,
    )} as const;
`;

    fs.writeFileSync(path.join(outputDir, `${baseName}.ts`), tsContent);
  }
}
