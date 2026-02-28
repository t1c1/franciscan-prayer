import fs from "node:fs";
import path from "node:path";

type CheckResult = {
  ok: boolean;
  message: string;
};

function readIfExists(filePath: string): string {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function readEnvFile(filePath: string): Record<string, string> {
  const source = readIfExists(filePath);
  const out: Record<string, string> = {};

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) out[key] = value.replace(/^['"]|['"]$/g, "");
  }

  return out;
}

function isLikelySupabaseAnonKey(value: string): boolean {
  if (!value) return false;
  if (value.includes("your_") || value.includes("<")) return false;
  return value.startsWith("eyJ") || value.length > 40;
}

function runChecks(): CheckResult[] {
  const cwd = process.cwd();
  const envLocalPath = path.join(cwd, ".env.local");
  const supabaseConfigPath = path.join(cwd, "supabase", "config.toml");

  const envLocal = readEnvFile(envLocalPath);
  const supabaseConfig = readIfExists(supabaseConfigPath);

  const supabaseUrl = envLocal.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey =
    envLocal.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const checks: CheckResult[] = [];

  checks.push({
    ok: Boolean(supabaseUrl),
    message: "NEXT_PUBLIC_SUPABASE_URL is set",
  });
  checks.push({
    ok: /^https:\/\/.+/.test(supabaseUrl),
    message: "NEXT_PUBLIC_SUPABASE_URL uses https://",
  });
  checks.push({
    ok: isLikelySupabaseAnonKey(supabaseAnonKey),
    message: "NEXT_PUBLIC_SUPABASE_ANON_KEY appears valid",
  });

  const requiredRedirects = [
    "https://ignatiusguide.com",
    "https://ignatiusguide.com/**",
    "https://www.ignatiusguide.com",
    "https://www.ignatiusguide.com/**",
    "https://franciscan-prayer.pages.dev",
    "https://franciscan-prayer.pages.dev/**",
    "http://localhost:3000",
  ];
  for (const redirect of requiredRedirects) {
    checks.push({
      ok: supabaseConfig.includes(redirect),
      message: `supabase/config.toml includes redirect: ${redirect}`,
    });
  }

  checks.push({
    ok: supabaseConfig.includes("redirect_uri = \"https://api.franciscanprayer.com/auth/v1/callback\""),
    message: "Google OAuth callback redirect_uri is configured",
  });

  return checks;
}

function main() {
  const checks = runChecks();
  let failures = 0;

  for (const check of checks) {
    if (check.ok) {
      console.log(`ok   ${check.message}`);
    } else {
      failures += 1;
      console.error(`fail ${check.message}`);
    }
  }

  if (failures > 0) {
    console.error(`\nFAILED: ${failures} auth/config checks failed.`);
    process.exit(1);
  }

  console.log(`\nPASSED: ${checks.length} auth/config checks passed.`);
}

main();
