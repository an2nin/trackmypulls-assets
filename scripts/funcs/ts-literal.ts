// scripts/funcs/ts-literal.ts
// Serializes JSON data as a TS literal: single quotes, unquoted keys where possible, trailing commas.

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const NUMERIC = /^(0|[1-9][0-9]*)$/;
const INDENT = "  ";

function formatKey(key: string): string {
  return IDENTIFIER.test(key) || NUMERIC.test(key) ? key : formatString(key);
}

function formatString(value: string): string {
  return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n")}'`;
}

export default function toTsLiteral(value: unknown, depth = 0): string {
  const pad = INDENT.repeat(depth + 1);
  const closePad = INDENT.repeat(depth);

  if (value === null) return "null";
  if (typeof value === "string") return formatString(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => `${pad}${toTsLiteral(item, depth + 1)},`);
    return `[\n${items.join("\n")}\n${closePad}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const items = entries.map(([key, item]) => `${pad}${formatKey(key)}: ${toTsLiteral(item, depth + 1)},`);
    return `{\n${items.join("\n")}\n${closePad}}`;
  }

  throw new Error(`Unsupported value type: ${typeof value}`);
}
