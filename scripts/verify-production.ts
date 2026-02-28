type Check = {
  path: string;
  label: string;
  alternatives?: string[];
  expectedStatus?: number;
  contentTypeIncludes?: string;
  bodyIncludes?: string;
  minBytes?: number;
};

const DEFAULT_BASE_URL = "https://franciscan-prayer.pages.dev";

function parseBaseUrl(): string {
  const arg = process.argv.find((value) => value.startsWith("--url="));
  const fromArg = arg?.split("=")[1];
  const fromEnv = process.env.VERIFY_BASE_URL;
  const raw = fromArg || fromEnv || DEFAULT_BASE_URL;
  return raw.replace(/\/+$/, "");
}

function getTimeoutSignal(ms: number): AbortSignal | undefined {
  if (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) {
    return AbortSignal.timeout(ms);
  }
  return undefined;
}

async function runSingleCheck(baseUrl: string, check: Check, path: string): Promise<string | null> {
  const url = `${baseUrl}${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      redirect: "follow",
      signal: getTimeoutSignal(15_000),
      headers: { "user-agent": "franciscan-prayer-health-check/1.0" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown fetch error";
    const cause = error && typeof error === "object" && "cause" in error
      ? (error as { cause?: unknown }).cause
      : undefined;
    const causeMessage = cause && typeof cause === "object" && "message" in cause
      ? String((cause as { message?: unknown }).message || "")
      : "";
    const details = causeMessage ? `${message} (${causeMessage})` : message;
    return `${path}: request failed (${details})`;
  }

  const expectedStatus = check.expectedStatus ?? 200;
  if (response.status !== expectedStatus) {
    return `${path}: expected status ${expectedStatus}, got ${response.status}`;
  }

  const contentType = response.headers.get("content-type") || "";
  if (check.contentTypeIncludes && !contentType.toLowerCase().includes(check.contentTypeIncludes.toLowerCase())) {
    return `${path}: expected content-type containing "${check.contentTypeIncludes}", got "${contentType}"`;
  }

  if (check.bodyIncludes) {
    const body = await response.text();
    if (!body.includes(check.bodyIncludes)) {
      return `${path}: body missing "${check.bodyIncludes}"`;
    }
    return null;
  }

  if (typeof check.minBytes === "number") {
    const bytes = new Uint8Array(await response.arrayBuffer()).byteLength;
    if (bytes < check.minBytes) {
      return `${path}: expected at least ${check.minBytes} bytes, got ${bytes}`;
    }
  }

  return null;
}

async function runCheck(baseUrl: string, check: Check): Promise<string | null> {
  const candidates = [check.path, ...(check.alternatives || [])];
  const failures: string[] = [];

  for (const path of candidates) {
    const failure = await runSingleCheck(baseUrl, check, path);
    if (!failure) return null;
    failures.push(failure);
  }

  return `${check.label}: ${failures.join(" | ")}`;
}

async function main() {
  const baseUrl = parseBaseUrl();
  const checks: Check[] = [
    { label: "home", path: "/", contentTypeIncludes: "text/html", bodyIncludes: "Franciscan Prayer" },
    { label: "hours", path: "/hours", alternatives: ["/hours/", "/hours.html"], contentTypeIncludes: "text/html" },
    { label: "prayers", path: "/prayers", alternatives: ["/prayers/", "/prayers.html"], contentTypeIncludes: "text/html" },
    { label: "about", path: "/about", alternatives: ["/about/", "/about.html"], contentTypeIncludes: "text/html" },
    { label: "settings", path: "/settings", alternatives: ["/settings/", "/settings.html"], contentTypeIncludes: "text/html" },
    { label: "sitemap", path: "/sitemap.xml", contentTypeIncludes: "xml", bodyIncludes: "<urlset" },
    { label: "manifest", path: "/manifest.webmanifest", alternatives: ["/site.webmanifest"], expectedStatus: 200 },
    { label: "audio-sample", path: "/audio/prayers/en/pater-noster.mp3", expectedStatus: 200, minBytes: 1000 },
  ];

  console.log(`Verifying production health at ${baseUrl}`);

  const failures: string[] = [];
  for (const check of checks) {
    const failure = await runCheck(baseUrl, check);
    if (failure) {
      failures.push(failure);
      console.error(`✗ ${failure}`);
    } else {
      console.log(`✓ ${check.label}`);
    }
  }

  if (failures.length > 0) {
    console.error(`\nFAILED: ${failures.length} checks failed.`);
    process.exit(1);
  }

  console.log(`\nPASSED: ${checks.length} checks passed.`);
}

void main();
