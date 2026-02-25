import fs from "node:fs/promises";
import path from "node:path";
import { PRAYERS, HOURS, HOURS_I18N } from "../src/lib/prayers";
import { MORE_PRAYERS } from "../src/lib/more-prayers";
import { RULE_CHAPTERS, RULE_I18N } from "../src/lib/rule";
import { STATIONS, STATIONS_I18N, STATIONS_PRAYERS } from "../src/lib/stations";
import { CROWN_INSTRUCTIONS, CROWN_I18N, CROWN_MYSTERIES } from "../src/lib/franciscan-crown";
import { EXAMINATION_I18N, EXAMINATION_QUESTIONS } from "../src/lib/examination";
import { ABOUT_I18N } from "../src/lib/about-i18n";
import { FRANCISCAN_FEASTS, CALENDAR_I18N } from "../src/lib/franciscan-calendar";
import { UI_STRINGS } from "../src/lib/ui-strings";
import { spellOutSmallNumbers } from "../src/lib/number-words";

type Locale = "latin" | "en" | "es" | "it" | "fr" | "zh";
type AppLocale = Exclude<Locale, "latin">;

interface AssetItem {
  filePath: string;
  text: string;
  locale: Locale;
}

const APP_LOCALES: AppLocale[] = ["en", "es", "it", "fr", "zh"];
const PRAYER_LOCALES: Locale[] = ["latin", ...APP_LOCALES];
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

const DEFAULT_MODEL_ID = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";
const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "6nHqsk4yqXJbeTHWkGQB";
const LANGUAGE_CODES: Record<Locale, string> = {
  latin: "la",
  en: "en",
  es: "es",
  it: "it",
  fr: "fr",
  zh: "zh",
};

const force = process.argv.includes("--force");
const concurrencyArg = process.argv.find((arg) => arg.startsWith("--concurrency="));
const matchArg = process.argv.find((arg) => arg.startsWith("--match="));
const matchFilter = matchArg ? matchArg.split("=")[1] : "";
const requestedConcurrency = concurrencyArg ? Number(concurrencyArg.split("=")[1]) : 4;
const CONCURRENCY = Number.isFinite(requestedConcurrency) && requestedConcurrency > 0
  ? Math.floor(requestedConcurrency)
  : 4;

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function stripScriptureReference(text: string): string {
  return text.replace(/[\s\u3000]*[（(][^()（）]{2,120}[)）]\s*$/, "").trim();
}

function addAsset(map: Map<string, AssetItem>, filePath: string, text: string, locale: Locale) {
  const normalized = normalizeText(spellOutSmallNumbers(text, locale));
  if (!normalized) return;
  map.set(filePath, { filePath, text: normalized, locale });
}

function getAboutEnglish() {
  return {
    intro1:
      "Franciscan Prayer helps you pray as a Franciscan every day, whether you are a friar, a sister, a secular Franciscan, or anyone drawn to the spirituality of St. Francis of Assisi.",
    intro2:
      "This app offers two ways to pray the Liturgy of the Hours: the Original Pater Count (76 Our Fathers per day) for those who cannot recite the full Office, and links to the full Liturgy of the Hours on DivineOffice.org.",
    paterTitle: "The Original Pater Count",
    paterDesc:
      "Chapter III of the Rule of St. Francis (1223) prescribes that lay brothers who cannot read the Psalter should instead pray Our Fathers at each canonical hour. The exact distribution is:",
    howTitle: "How to Use This App",
    howFullDay: "Full Day (recommended)",
    howFullDayDesc:
      "Pray each Hour at its canonical time throughout the day. The app suggests the next Hour based on the time of day and highlights it on the home screen.",
    howBusy: "Busy Parent Mode",
    howBusyDesc:
      "Focus on Lauds (morning), Vespers (evening), and Compline (bedtime). These three are the most important Hours and take only a few minutes each.",
    howMissed: "If You Miss an Hour",
    howMissedDesc:
      "Simply continue with the next one. If you missed Terce, continue with Sext. There is no guilt in Franciscan prayer, only grace and joy in returning.",
    crownTitle: "The Franciscan Crown Rosary",
    crownDesc:
      "Also called the Seraphic Rosary, the Crown consists of 7 decades (not 5) honoring the Seven Joys of the Blessed Virgin Mary. It was revealed to a young Franciscan novice in 1422. The total is 72 Hail Marys, one for each year of Our Lady's earthly life according to tradition.",
    stationsTitle: "The Stations of the Cross",
    stationsDesc:
      "The Stations are a Franciscan gift to the Church. As custodians of the Holy Land since 1217, the Franciscans created this devotion so that those who could not make a pilgrimage to Jerusalem could spiritually walk the Via Dolorosa. The 14 stations were formally established by Pope Clement XII in 1731 and entrusted to the Franciscan Order.",
    sourcesTitle: "Sources & Credits",
    paxFooter: "Pax et Bonum",
    builtWith: "Built with love for the greater glory of God",
  };
}

function getDailyTotalLabel(locale: AppLocale): string {
  if (locale === "es") return "Total Diario";
  if (locale === "it") return "Totale Giornaliero";
  if (locale === "fr") return "Total Quotidien";
  if (locale === "zh") return "每日总计";
  return "Daily Total";
}

function buildStationUi() {
  return {
    en: {
      intro:
        "The Stations of the Cross is a Franciscan devotion. The Franciscans, as custodians of the Holy Land, popularized this meditation on Christ's Passion. Walk with Jesus from His condemnation to His burial through 14 stations of prayer.",
      prayInstruction: "Pray One Our Father, One Hail Mary, One Glory Be",
    },
    es: {
      intro:
        "El Viacrucis es una devoción franciscana. Los franciscanos, como custodios de Tierra Santa, popularizaron esta meditación sobre la Pasión de Cristo. Camina con Jesús desde su condena hasta su sepultura a través de 14 estaciones de oración.",
      prayInstruction: "Reza un Padrenuestro, un Avemaría, un Gloria",
    },
    it: {
      intro:
        "La Via Crucis è una devozione francescana. I francescani, come custodi della Terra Santa, hanno diffuso questa meditazione sulla Passione di Cristo. Cammina con Gesù dalla sua condanna alla sua sepoltura attraverso 14 stazioni di preghiera.",
      prayInstruction: "Prega un Padre Nostro, un Ave Maria, un Gloria",
    },
    fr: {
      intro:
        "Le Chemin de Croix est une dévotion franciscaine. Les franciscains, en tant que gardiens de la Terre Sainte, ont popularisé cette méditation sur la Passion du Christ. Marchez avec Jésus de sa condamnation à sa mise au tombeau à travers 14 stations de prière.",
      prayInstruction: "Priez un Notre Père, un Je vous salue Marie, un Gloire au Père",
    },
    zh: {
      intro:
        "苦路是方济各敬礼。方济各会士作为圣地的守护者，推广了这一默想基督苦难的祈祷方式。与耶稣同行，从被判刑到安葬，经过14处苦路祈祷。",
      prayInstruction: "诵念天主经一遍、圣母经一遍、圣三光荣颂一遍",
    },
  } as const;
}

function buildCrownUi() {
  return {
    en: { fruit: "Fruit", complete: "Now pray One Our Father, One Hail Mary, and One Glory Be for the Holy Father." },
    es: { fruit: "Fruto", complete: "Ahora reza un Padrenuestro, un Avemaría y un Gloria al Padre por el Santo Padre." },
    it: { fruit: "Frutto", complete: "Ora prega un Padre Nostro, un Ave Maria e un Gloria al Padre per il Santo Padre." },
    fr: { fruit: "Fruit", complete: "Priez maintenant un Notre Père, un Je vous salue Marie et un Gloire au Père pour le Saint-Père." },
    zh: { fruit: "神果", complete: "现在诵念天主经一遍、圣母经一遍、圣三光荣颂一遍，为教宗的意向祈祷。" },
  } as const;
}

function buildAssets(): AssetItem[] {
  const assets = new Map<string, AssetItem>();

  // Prayers and extra prayers
  const allPrayers = [...PRAYERS, ...MORE_PRAYERS];
  for (const prayer of allPrayers) {
    const byLocale: Record<Locale, string> = {
      latin: prayer.latin,
      en: prayer.en,
      es: prayer.es,
      it: prayer.it,
      fr: prayer.fr,
      zh: prayer.zh,
    };
    for (const locale of PRAYER_LOCALES) {
      const text = byLocale[locale];
      if (!text) continue;
      addAsset(assets, `/audio/prayers/${locale}/${prayer.id}.mp3`, text, locale);
    }
  }

  // Rule chapters
  for (const chapter of RULE_CHAPTERS) {
    addAsset(
      assets,
      `/audio/rule/latin/chapter-${chapter.chapter}.mp3`,
      `${chapter.titleLatin}\n\n${chapter.textLatin}`,
      "latin"
    );
    addAsset(
      assets,
      `/audio/rule/en/chapter-${chapter.chapter}.mp3`,
      `${chapter.title}\n\n${chapter.text}`,
      "en"
    );

    const idx = chapter.chapter - 1;
    for (const locale of ["es", "it", "fr", "zh"] as const) {
      const localized = RULE_I18N[locale]?.[idx];
      if (!localized) continue;
      addAsset(
        assets,
        `/audio/rule/${locale}/chapter-${chapter.chapter}.mp3`,
        `${localized.title}\n\n${localized.text}`,
        locale
      );
    }
  }

  // Stations
  const stationsUi = buildStationUi();
  const ourFather = PRAYERS.find((p) => p.id === "pater-noster");
  const hailMary = PRAYERS.find((p) => p.id === "ave-maria");
  const gloriaPatri = PRAYERS.find((p) => p.id === "gloria-patri");
  if (!ourFather || !hailMary || !gloriaPatri) {
    throw new Error("Missing core prayers for Stations audio generation.");
  }
  for (const locale of APP_LOCALES) {
    const ui = stationsUi[locale];
    const translatedStations = locale === "en" ? null : STATIONS_I18N[locale];

    addAsset(
      assets,
      `/audio/stations/${locale}/intro.mp3`,
      `${ui.intro}\n\n${STATIONS_PRAYERS.opening}`,
      locale
    );

    addAsset(assets, `/audio/stations/${locale}/closing.mp3`, STATIONS_PRAYERS.closing, locale);

    for (const station of STATIONS) {
      const translated = translatedStations ? translatedStations[station.number - 1] : null;
      const title = translated?.title || station.title;
      const scripture = translated?.scripture || station.scripture;
      const meditation = translated?.meditation || station.meditation;
      const prayersText = [
        ui.prayInstruction,
        `${ourFather.titles[locale] || ourFather.title}\n${ourFather[locale] || ourFather.en}`,
        `${hailMary.titles[locale] || hailMary.title}\n${hailMary[locale] || hailMary.en}`,
        `${gloriaPatri.titles[locale] || gloriaPatri.title}\n${gloriaPatri[locale] || gloriaPatri.en}`,
      ].join("\n\n");
      const stationText = [
        title,
        stripScriptureReference(scripture),
        meditation,
        STATIONS_PRAYERS.stationResponse,
        prayersText,
      ].join("\n\n");
      addAsset(
        assets,
        `/audio/stations/${locale}/station-${station.number}.mp3`,
        stationText,
        locale
      );
    }
  }

  // Crown
  const crownUi = buildCrownUi();
  for (const locale of APP_LOCALES) {
    const mysteries = locale === "en" ? CROWN_MYSTERIES : CROWN_I18N[locale];
    if (!mysteries) continue;

    addAsset(assets, `/audio/crown/${locale}/intro.mp3`, CROWN_INSTRUCTIONS[locale], locale);
    addAsset(assets, `/audio/crown/${locale}/complete.mp3`, crownUi[locale].complete, locale);

    for (let i = 0; i < 7; i++) {
      const mystery = mysteries[i];
      if (!mystery) continue;
      const title = (mystery as { title: string }).title;
      const scripture = (mystery as { scripture: string }).scripture;
      const fruit = (mystery as { fruit: string }).fruit;
      addAsset(
        assets,
        `/audio/crown/${locale}/mystery-${i + 1}.mp3`,
        `${title}\n\n${scripture}\n\n${crownUi[locale].fruit}: ${fruit}`,
        locale
      );
    }
  }

  // Examination intro and complete
  for (const locale of APP_LOCALES) {
    const strings = UI_STRINGS[locale];
    addAsset(
      assets,
      `/audio/exam/${locale}/intro.mp3`,
      `${strings["exam.intro"]}\n\n${strings["exam.quote"]} — ${strings["exam.quote_author"]}`,
      locale
    );
    addAsset(
      assets,
      `/audio/exam/${locale}/complete.mp3`,
      `${strings["exam.complete_text"]}\n\n${strings["exam.complete_prayer"]}`,
      locale
    );

    // Also generate every question phrase for optional future static references.
    const pool = locale === "en"
      ? EXAMINATION_QUESTIONS
      : EXAMINATION_I18N[locale]?.questions || [];
    pool.forEach((q, idx) => {
      addAsset(
        assets,
        `/audio/exam/${locale}/question-${idx + 1}.mp3`,
        q.question,
        locale
      );
    });
  }

  // About page full narration
  const enAbout = getAboutEnglish();
  for (const locale of APP_LOCALES) {
    const about = locale === "en" ? enAbout : ABOUT_I18N[locale];
    const narration = [
      about.intro1,
      about.intro2,
      `${about.paterTitle}. ${about.paterDesc}`,
      `${getDailyTotalLabel(locale)}: 76 Paters.`,
      `${about.howTitle}. ${about.howFullDay}: ${about.howFullDayDesc}`,
      `${about.howBusy}: ${about.howBusyDesc}`,
      `${about.howMissed}: ${about.howMissedDesc}`,
      `${about.crownTitle}. ${about.crownDesc}`,
      `${about.stationsTitle}. ${about.stationsDesc}`,
      about.sourcesTitle,
      about.paxFooter,
      about.builtWith,
    ].join("\n\n");

    addAsset(assets, `/audio/about/${locale}/full.mp3`, narration, locale);
  }

  // Hours
  for (const locale of APP_LOCALES) {
    for (const hour of HOURS) {
      const localized = HOURS_I18N[locale]?.[hour.id] || HOURS_I18N.en[hour.id];
      addAsset(
        assets,
        `/audio/hours/${locale}/${hour.id}.mp3`,
        `${localized.name}. ${localized.description}`,
        locale
      );
    }
  }

  // Calendar feast descriptions
  for (const locale of APP_LOCALES) {
    for (const feast of FRANCISCAN_FEASTS) {
      const key = `${String(feast.month).padStart(2, "0")}-${String(feast.day).padStart(2, "0")}`;
      const translated = locale === "en"
        ? { name: feast.name, description: feast.description }
        : CALENDAR_I18N?.[locale]?.[key] || { name: feast.name, description: feast.description };
      addAsset(
        assets,
        `/audio/calendar/${locale}/${key}.mp3`,
        `${translated.name}\n\n${translated.description}`,
        locale
      );
    }
  }

  return [...assets.values()].sort((a, b) => a.filePath.localeCompare(b.filePath));
}

async function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  try {
    const raw = await fs.readFile(envPath, "utf8");
    const lines = raw.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // no-op
  }
}

async function requestAudio(text: string, locale: Locale): Promise<ArrayBuffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error("Missing ELEVENLABS_API_KEY");

  const payload: Record<string, unknown> = {
    text,
    model_id: DEFAULT_MODEL_ID,
    voice_settings: {
      stability: 0.45,
      similarity_boost: 0.75,
      style: 0.15,
      use_speaker_boost: true,
    },
  };

  const languageCode = LANGUAGE_CODES[locale];
  if (languageCode && locale !== "latin") payload.language_code = languageCode;

  const maxAttempts = 4;
  let attempt = 0;
  while (attempt < maxAttempts) {
    attempt += 1;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${DEFAULT_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) return response.arrayBuffer();

    const details = await response.text();
    if (response.status === 429 && attempt < maxAttempts) {
      const waitMs = attempt * 2000;
      console.warn(`Rate limited; waiting ${waitMs}ms before retry (${attempt}/${maxAttempts})`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      continue;
    }

    throw new Error(`ElevenLabs error ${response.status}: ${details.slice(0, 300)}`);
  }

  throw new Error("Failed after retries");
}

async function ensureDir(filePath: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function run() {
  await loadEnvLocal();

  const allAssets = buildAssets();
  const assets = matchFilter
    ? allAssets.filter((asset) => asset.filePath.includes(matchFilter))
    : allAssets;
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    console.error("ELEVENLABS_API_KEY is missing. Set it in .env.local.");
    process.exit(1);
  }

  console.log(`Planned assets: ${assets.length}`);
  if (matchFilter) console.log(`Match filter: ${matchFilter}`);
  console.log(`Concurrency: ${CONCURRENCY}`);

  let generated = 0;
  let skipped = 0;

  let cursor = 0;

  const worker = async (workerId: number) => {
    while (true) {
      const index = cursor++;
      if (index >= assets.length) return;

      const asset = assets[index];
      const absolutePath = path.join(PUBLIC_DIR, asset.filePath);

      if (!force) {
        try {
          await fs.access(absolutePath);
          skipped += 1;
          if ((index + 1) % 25 === 0) {
            console.log(`Progress ${index + 1}/${assets.length} (generated: ${generated}, skipped: ${skipped})`);
          }
          continue;
        } catch {
          // generate missing file
        }
      }

      await ensureDir(absolutePath);
      const audio = await requestAudio(asset.text, asset.locale);
      await fs.writeFile(absolutePath, Buffer.from(audio));
      generated += 1;
      console.log(`[w${workerId}] Generated ${index + 1}/${assets.length}: ${asset.filePath}`);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1)));

  console.log(`Done. Generated: ${generated}, skipped: ${skipped}, total: ${assets.length}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
