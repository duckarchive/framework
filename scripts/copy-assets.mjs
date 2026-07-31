// tsc only emits JS/d.ts, so the font binaries have to be mirrored into dist/
// by hand — `fonts.ts` resolves them relative to itself, which after compilation
// means `dist/assets/fonts/...`.
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const from = join(root, "assets");
const to = join(root, "dist", "assets");

if (!existsSync(from)) {
  console.error(`copy-assets: missing ${from}`);
  process.exit(1);
}

rmSync(to, { recursive: true, force: true });
cpSync(from, to, { recursive: true });
console.log(`copy-assets: ${from} -> ${to}`);
