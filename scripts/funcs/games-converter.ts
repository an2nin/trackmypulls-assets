// scripts/funcs/games-converter.ts
// Splits `config/games.json` into `generated/games.ts` (game info) and `generated/banners.ts` (banners keyed by slug).
/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";
import toTsLiteral from "./ts-literal";

type Rarity = { name: string; label: string; styles: string };
type Game = { slug: string; rarities: Rarity[]; banners: unknown[]; [key: string]: unknown };

export default function convertGames(): void {
  const configDir = path.join(process.cwd(), "./static/data/config");
  const outputDir = path.join(process.cwd(), "./static/data/generated");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const games: Game[] = JSON.parse(fs.readFileSync(path.join(configDir, "games.json"), "utf-8"));
  const gachaColors: Record<string, unknown> = JSON.parse(
    fs.readFileSync(path.join(configDir, "gacha-colors.json"), "utf-8"),
  );

  const banners: Record<string, unknown[]> = {};

  const gamesInfo = games.map(({ banners: gameBanners, ...game }) => {
    banners[game.slug] = gameBanners;

    return {
      ...game,
      rarities: game.rarities.map((rarity) => {
        const styles = gachaColors[rarity.styles];
        if (!styles) {
          throw new Error(`Unknown rarity style "${rarity.styles}" in game "${game.slug}"`);
        }
        return { ...rarity, styles };
      }),
    };
  });

  fs.writeFileSync(path.join(outputDir, "games.ts"), `export const GAMES = ${toTsLiteral(gamesInfo)};\n`);
  fs.writeFileSync(path.join(outputDir, "banners.ts"), `export const BANNERS = ${toTsLiteral(banners)};\n`);
}
