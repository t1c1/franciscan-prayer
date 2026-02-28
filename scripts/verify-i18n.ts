import fs from "node:fs";
import path from "node:path";
import { UI_STRINGS } from "../src/lib/ui-strings";

function collectSourceFiles(rootDir: string): string[] {
  const files: string[] = [];

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const absPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(absPath);
        continue;
      }
      if (/\.(ts|tsx)$/.test(entry.name)) files.push(absPath);
    }
  };

  walk(rootDir);
  return files;
}

function collectTranslationKeys(files: string[]): Set<string> {
  const keyPattern = /\bt\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
  const keys = new Set<string>();

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, "utf8");
    let match: RegExpExecArray | null;
    while ((match = keyPattern.exec(source))) keys.add(match[1]);
  }

  return keys;
}

function main() {
  const files = collectSourceFiles(path.resolve("src"));
  const keys = collectTranslationKeys(files);

  let missingTotal = 0;
  for (const [locale, strings] of Object.entries(UI_STRINGS)) {
    const missing = [...keys].filter((key) => !(key in strings));
    if (missing.length === 0) {
      console.log(`${locale}: ok (${keys.size} keys checked)`);
      continue;
    }

    missingTotal += missing.length;
    console.error(`${locale}: missing ${missing.length} keys`);
    for (const key of missing) console.error(`  - ${key}`);
  }

  if (missingTotal > 0) {
    console.error(`\nFAILED: ${missingTotal} missing translations.`);
    process.exit(1);
  }

  console.log(`\nPASSED: ${keys.size} translation keys covered in all locales.`);
}

main();
