import { execSync } from "node:child_process";

function run(command: string): string {
  return execSync(command, { stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
}

function fail(message: string): never {
  console.error(`fail ${message}`);
  process.exit(1);
}

function main() {
  const branch = run("git rev-parse --abbrev-ref HEAD");
  if (branch !== "main") fail(`release must run from main (current: ${branch})`);
  console.log(`ok   branch is main`);

  const status = run("git status --porcelain");
  if (status.length > 0) fail("working tree must be clean before release");
  console.log(`ok   working tree is clean`);

  const head = run("git rev-parse HEAD");
  let originMain = "";
  try {
    originMain = run("git rev-parse origin/main");
  } catch {
    fail("origin/main is not available locally; fetch remote refs before release");
  }

  if (head !== originMain) {
    fail(`local main (${head.slice(0, 7)}) is not synced with origin/main (${originMain.slice(0, 7)})`);
  }
  console.log(`ok   local main is synced with origin/main (${head.slice(0, 7)})`);

  console.log("\nPASSED: release state checks passed.");
}

main();
