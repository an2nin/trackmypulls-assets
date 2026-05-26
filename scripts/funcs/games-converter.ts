// scripts/funcs/games-converter.ts
// Ensure Node.js types are available to TypeScript (fixes "Cannot find name 'process'" errors)
/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";

export default function convertGames(): void {
  const inputDir = path.join(process.cwd(), "./static/data/config/games");
  const outputDir = path.join(process.cwd(), "./static/data/converted/games");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir);

  const indexExports: string[] = [];
  const indexImports: string[] = [];
  const arrayEntries: string[] = [];

  for (const file of files) {
    const jsonPath = path.join(inputDir, file);

    const raw = fs.readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(raw);

    const baseName = path.basename(file, ".json");

    const variableName = baseName.replace(/[-\s]+(.)?/g, (_, c) =>
      c ? c.toUpperCase() : "",
    );

    const tsContent = `const ${variableName} = ${JSON.stringify(
      parsed,
      null,
      2,
    )} as const;

export default ${variableName};
`;

    fs.writeFileSync(path.join(outputDir, `${baseName}.ts`), tsContent);

    indexImports.push(`import ${variableName} from "./${baseName}";`);

    indexExports.push(variableName);

    arrayEntries.push(`  ${variableName},`);
  }

  const indexContent = `
${indexImports.join("\n")}

export const games = [
${arrayEntries.join("\n")}
] as const;

export {
  ${indexExports.join(",\n  ")}
};

export default games;
`;

  fs.writeFileSync(path.join(outputDir, "index.ts"), indexContent);
}
