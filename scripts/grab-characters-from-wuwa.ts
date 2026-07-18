/// <reference types="node" />

import fs from "node:fs";
import path from "node:path";

type WuwaCharacter = {
	name: string;
	quality: "4" | "5" | string;
};

type WuwaData = {
	characters: WuwaCharacter[];
};

function formatArray(name: string, values: string[]): string {
	const lines = values.map((value) => `  '${value}',`).join("\n");

	return `export const ${name}: string[] = [
${lines}
]`;
}

function main(): void {
	const inputFile = process.argv[2]
		? path.resolve(process.cwd(), process.argv[2])
		: path.join(process.cwd(), "./static/data/collection-items/wuwa.json");
	const outputFile = process.argv[3]
		? path.resolve(process.cwd(), process.argv[3])
		: path.join(process.cwd(), "./static/data/converted/games/wuwa-resonators.ts");

	const raw = fs.readFileSync(inputFile, "utf-8");
	const parsed = JSON.parse(raw) as WuwaData;

	const fiveStarResonators = parsed.characters
		.filter((character) => character.quality === "5")
		.map((character) => character.name)
		.sort((left, right) => left.localeCompare(right));

	const fourStarResonators = parsed.characters
		.filter((character) => character.quality === "4")
		.map((character) => character.name)
		.sort((left, right) => left.localeCompare(right));

	const output = [
		formatArray("FIVE_STAR_RESONATORS", fiveStarResonators),
		"",
		formatArray("FOUR_STAR_RESONATORS", fourStarResonators),
		"",
		"export const RESONATORS: string[] = [...FIVE_STAR_RESONATORS, ...FOUR_STAR_RESONATORS]",
		"",
	].join("\n");

	fs.mkdirSync(path.dirname(outputFile), { recursive: true });
	fs.writeFileSync(outputFile, output, "utf-8");
	process.stdout.write(`Wrote ${outputFile}\n`);
}

main();
