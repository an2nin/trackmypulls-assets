// scripts/funcs/games-converter.ts
// Ensure Node.js types are available to TypeScript (fixes "Cannot find name 'process'" errors)
/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";
import gachaColors from './../../static/data/config/others/gacha-colors.json';

export default function convertGames(): void {
  const inputDir = path.join(process.cwd(), "./static/data/config/games");
  const outputDir = path.join(process.cwd(), "./static/data/converted/games");
  const othersDir = path.join(process.cwd(), "./static/data/converted");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (!fs.existsSync(othersDir)) {
    fs.mkdirSync(othersDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir);

  const indexExports: string[] = [];
  const indexImports: string[] = [];
  const arrayEntries: string[] = [];
  const banners: any = {};

  for (const file of files) {
    const jsonPath = path.join(inputDir, file);

    const raw = fs.readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(raw);
    const currentRarities = parsed.rarities;
    // const processedRarityStyles = Object.fromEntries(
    //   currentRarityStyles.map(() => {
    //     return [rarity, gachaColors[color as keyof typeof gachaColors]] as const;
    //   }),
    // );
    const processedRarities = currentRarities.map((rarity: { name: string; label: string; styles: string }) => {
      const color = gachaColors[rarity.styles as keyof typeof gachaColors];
      return {
        ...rarity,
        styles: color,
      };
    });
    parsed.rarities = processedRarities;



    const baseName = path.basename(file, ".json").split('-')[1];
    const variableName = baseName.replace('-', '_').toUpperCase();

    banners[baseName.toLowerCase()] = parsed.banners;
    delete parsed.banners;

    const tsContent = `const ${variableName} = ${JSON.stringify(
      parsed,
      null,
      2,
    )};


export default ${variableName};
`;

    fs.writeFileSync(path.join(outputDir, `${baseName}.ts`), tsContent);

    indexImports.push(`import ${variableName} from "./${baseName}";`);

    indexExports.push(variableName);

    arrayEntries.push(`  ${variableName},`);
  }

  const indexContent = `
${indexImports.join("\n")}

const GAMES = [
${arrayEntries.join("\n")}
] as const;

export default GAMES;
`;

  fs.writeFileSync(path.join(outputDir, "index.ts"), indexContent);
  fs.writeFileSync(path.join(othersDir, "banners.ts"), `const BANNERS = ${JSON.stringify(banners, null, 2)};\n\nexport default BANNERS;\n`);
}
