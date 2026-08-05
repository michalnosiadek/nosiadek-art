#!/usr/bin/env node
/**
 * Pull the master translation file into this app.
 *
 * src/i18n/translations.json is COMMITTED, so a deploy never needs this — the
 * host only ever sees this directory, and running the repo-root tool from here
 * is what broke the Vercel build. This script therefore does nothing at all if
 * the master file isn't reachable, and always exits 0.
 *
 * The real sync lives at ../../tools/sync-i18n.mjs and also feeds the 3D
 * gallery and the games. Run that one when you're working in the repo.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const master = path.resolve(here, "..", "..", "..", "i18n", "translations.json");
const local = path.resolve(here, "..", "src", "i18n", "translations.json");

if (!fs.existsSync(master)) {
  console.log("i18n: no master file next door — using the committed copy.");
  process.exit(0);
}

const incoming = fs.readFileSync(master, "utf8").trimEnd() + "\n";
const current = fs.existsSync(local) ? fs.readFileSync(local, "utf8") : "";

if (incoming === current) {
  console.log("i18n: already up to date.");
} else {
  fs.mkdirSync(path.dirname(local), { recursive: true });
  fs.writeFileSync(local, incoming);
  console.log("i18n: refreshed src/i18n/translations.json from the master file.");
}
