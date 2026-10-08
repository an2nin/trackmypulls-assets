// scripts/funcs/config-converter.ts
// Converts standalone `config/*.json` files into `generated/*.ts`, one exported constant per file.
/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";
import toTsLiteral from "./ts-literal";

type ConfigFile = { name: string; exportName: string; asConst?: boolean };

const CONFIG_FILES: ConfigFile[] = [
  { name: "banner-styles", exportName: "BannerStyles", asConst: true },
  { name: "changelogs", exportName: "CHANGELOGS" },
  { name: "langs", exportName: "LANGS", asConst: true },
  { name: "supporters", exportName: "SUPPORTERS" },
];

export default function convertConfigs(): void {
  const configDir = path.join(process.cwd(), "./static/data/config");
  const outputDir = path.join(process.cwd(), "./static/data/generated");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const { name, exportName, asConst } of CONFIG_FILES) {
    const data: unknown = JSON.parse(fs.readFileSync(path.join(configDir, `${name}.json`), "utf-8"));
    const suffix = asConst ? " as const" : "";
    fs.writeFileSync(path.join(outputDir, `${name}.ts`), `export const ${exportName} = ${toTsLiteral(data)}${suffix};\n`);
  }
}
