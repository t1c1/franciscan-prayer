import { PRAYERS, HOURS, HOURS_I18N } from "../src/lib/prayers";
import { MORE_PRAYERS } from "../src/lib/more-prayers";
import { RULE_CHAPTERS, RULE_I18N } from "../src/lib/rule";
import { STATIONS, STATIONS_I18N } from "../src/lib/stations";
import { CROWN_MYSTERIES, CROWN_I18N } from "../src/lib/franciscan-crown";
import {
  EXAMINATION_CATEGORIES,
  EXAMINATION_QUESTIONS,
  EXAMINATION_I18N,
} from "../src/lib/examination";
import { ABOUT_I18N } from "../src/lib/about-i18n";
import { FRANCISCAN_FEASTS, CALENDAR_I18N } from "../src/lib/franciscan-calendar";
import { QUOTES, QUOTES_I18N } from "../src/lib/franciscan-quotes";

const APP_LOCALES = ["es", "it", "fr", "zh"] as const;
const PRAYER_LOCALES = ["latin", "en", ...APP_LOCALES] as const;

const failures: string[] = [];
const warnings: string[] = [];

function fail(message: string) {
  failures.push(message);
}

function warn(message: string) {
  warnings.push(message);
}

function isNonEmpty(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function assertNonEmpty(value: unknown, context: string) {
  if (!isNonEmpty(value)) fail(context);
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function feastKey(month: number, day: number): string {
  return `${pad(month)}-${pad(day)}`;
}

function verifyHoursI18n() {
  for (const locale of APP_LOCALES) {
    const translated = HOURS_I18N[locale];
    if (!translated) {
      fail(`hours: missing locale '${locale}'`);
      continue;
    }
    for (const hour of HOURS) {
      const item = translated[hour.id];
      if (!item) {
        fail(`hours.${locale}: missing hour '${hour.id}'`);
        continue;
      }
      assertNonEmpty(item.name, `hours.${locale}.${hour.id}.name is empty`);
      assertNonEmpty(item.description, `hours.${locale}.${hour.id}.description is empty`);
      assertNonEmpty(item.typicalTime, `hours.${locale}.${hour.id}.typicalTime is empty`);
    }
  }
}

function verifyPrayerI18n() {
  const allPrayers = [...PRAYERS, ...MORE_PRAYERS];

  for (const prayer of allPrayers) {
    assertNonEmpty(prayer.id, "prayers: found entry with empty id");
    assertNonEmpty(prayer.title, `prayers.${prayer.id}.title is empty`);

    for (const locale of APP_LOCALES) {
      assertNonEmpty(
        prayer.titles[locale],
        `prayers.${prayer.id}.titles.${locale} is empty`,
      );
    }
    assertNonEmpty(prayer.titles.en, `prayers.${prayer.id}.titles.en is empty`);

    for (const locale of PRAYER_LOCALES) {
      assertNonEmpty(
        prayer[locale],
        `prayers.${prayer.id}.${locale} is empty`,
      );
    }
  }
}

function verifyRuleI18n() {
  for (const locale of APP_LOCALES) {
    const translated = RULE_I18N[locale];
    if (!translated) {
      fail(`rule: missing locale '${locale}'`);
      continue;
    }
    if (translated.length !== RULE_CHAPTERS.length) {
      fail(
        `rule.${locale}: expected ${RULE_CHAPTERS.length} chapters, found ${translated.length}`,
      );
    }

    for (let i = 0; i < RULE_CHAPTERS.length; i += 1) {
      const item = translated[i];
      if (!item) {
        fail(`rule.${locale}[${i}] is missing`);
        continue;
      }
      assertNonEmpty(item.title, `rule.${locale}[${i}].title is empty`);
      assertNonEmpty(item.text, `rule.${locale}[${i}].text is empty`);
    }
  }
}

function verifyStationsI18n() {
  for (const locale of APP_LOCALES) {
    const translated = STATIONS_I18N[locale];
    if (!translated) {
      fail(`stations: missing locale '${locale}'`);
      continue;
    }
    if (translated.length !== STATIONS.length) {
      fail(
        `stations.${locale}: expected ${STATIONS.length} entries, found ${translated.length}`,
      );
    }

    for (let i = 0; i < STATIONS.length; i += 1) {
      const item = translated[i];
      if (!item) {
        fail(`stations.${locale}[${i}] is missing`);
        continue;
      }
      assertNonEmpty(item.title, `stations.${locale}[${i}].title is empty`);
      assertNonEmpty(item.scripture, `stations.${locale}[${i}].scripture is empty`);
      assertNonEmpty(item.meditation, `stations.${locale}[${i}].meditation is empty`);
    }
  }
}

function verifyCrownI18n() {
  for (const locale of APP_LOCALES) {
    const translated = CROWN_I18N[locale];
    if (!translated) {
      fail(`crown: missing locale '${locale}'`);
      continue;
    }
    if (translated.length !== CROWN_MYSTERIES.length) {
      fail(
        `crown.${locale}: expected ${CROWN_MYSTERIES.length} mysteries, found ${translated.length}`,
      );
    }

    for (let i = 0; i < CROWN_MYSTERIES.length; i += 1) {
      const item = translated[i];
      if (!item) {
        fail(`crown.${locale}[${i}] is missing`);
        continue;
      }
      assertNonEmpty(item.title, `crown.${locale}[${i}].title is empty`);
      assertNonEmpty(item.scripture, `crown.${locale}[${i}].scripture is empty`);
      assertNonEmpty(item.fruit, `crown.${locale}[${i}].fruit is empty`);
    }
  }
}

function verifyExaminationI18n() {
  for (const locale of APP_LOCALES) {
    const translated = EXAMINATION_I18N[locale];
    if (!translated) {
      fail(`examination: missing locale '${locale}'`);
      continue;
    }

    if (translated.categories.length !== EXAMINATION_CATEGORIES.length) {
      fail(
        `examination.${locale}: expected ${EXAMINATION_CATEGORIES.length} categories, found ${translated.categories.length}`,
      );
    }
    if (translated.questions.length !== EXAMINATION_QUESTIONS.length) {
      fail(
        `examination.${locale}: expected ${EXAMINATION_QUESTIONS.length} questions, found ${translated.questions.length}`,
      );
    }

    const categorySet = new Set(translated.categories);
    for (let i = 0; i < translated.questions.length; i += 1) {
      const item = translated.questions[i];
      assertNonEmpty(item.category, `examination.${locale}.questions[${i}].category is empty`);
      assertNonEmpty(item.question, `examination.${locale}.questions[${i}].question is empty`);
      if (!categorySet.has(item.category)) {
        fail(
          `examination.${locale}.questions[${i}].category '${item.category}' is not declared in categories`,
        );
      }
    }
  }
}

function verifyAboutI18n() {
  const expectedKeys = Object.keys(ABOUT_I18N.es);
  for (const locale of APP_LOCALES) {
    const translated = ABOUT_I18N[locale];
    if (!translated) {
      fail(`about: missing locale '${locale}'`);
      continue;
    }
    for (const key of expectedKeys) {
      assertNonEmpty(
        translated[key as keyof typeof translated],
        `about.${locale}.${key} is empty`,
      );
    }

    for (const key of Object.keys(translated)) {
      if (!expectedKeys.includes(key)) {
        warn(`about.${locale}.${key} exists but is not in expected key set`);
      }
    }
  }
}

function verifyCalendarI18n() {
  const expectedKeys = new Set(
    FRANCISCAN_FEASTS.map((feast) => feastKey(feast.month, feast.day)),
  );

  for (const locale of APP_LOCALES) {
    const translated = CALENDAR_I18N[locale];
    if (!translated) {
      fail(`calendar: missing locale '${locale}'`);
      continue;
    }

    for (const key of expectedKeys) {
      const item = translated[key];
      if (!item) {
        fail(`calendar.${locale}.${key} is missing`);
        continue;
      }
      assertNonEmpty(item.name, `calendar.${locale}.${key}.name is empty`);
      assertNonEmpty(item.description, `calendar.${locale}.${key}.description is empty`);
    }

    for (const key of Object.keys(translated)) {
      if (!expectedKeys.has(key)) {
        warn(`calendar.${locale}.${key} has no matching feast date`);
      }
    }
  }
}

function verifyQuoteI18n() {
  for (const locale of APP_LOCALES) {
    const translated = QUOTES_I18N[locale];
    if (!translated) {
      fail(`quotes: missing locale '${locale}'`);
      continue;
    }
    if (translated.length !== QUOTES.length) {
      fail(`quotes.${locale}: expected ${QUOTES.length} entries, found ${translated.length}`);
    }

    let exactEnglishCount = 0;
    for (let i = 0; i < QUOTES.length; i += 1) {
      const source = QUOTES[i];
      const item = translated[i];
      if (!item) {
        fail(`quotes.${locale}[${i}] is missing`);
        continue;
      }
      assertNonEmpty(item.text, `quotes.${locale}[${i}].text is empty`);
      assertNonEmpty(item.author, `quotes.${locale}[${i}].author is empty`);
      if (source.source && !isNonEmpty(item.source)) {
        fail(`quotes.${locale}[${i}].source is empty but source exists in English`);
      }
      if (item.text === source.text) exactEnglishCount += 1;
    }

    if (exactEnglishCount > 2) {
      warn(
        `quotes.${locale}: ${exactEnglishCount} entries exactly match English text; review for potential untranslated content`,
      );
    }
  }
}

function main() {
  verifyHoursI18n();
  verifyPrayerI18n();
  verifyRuleI18n();
  verifyStationsI18n();
  verifyCrownI18n();
  verifyExaminationI18n();
  verifyAboutI18n();
  verifyCalendarI18n();
  verifyQuoteI18n();

  for (const message of warnings) {
    console.warn(`warn ${message}`);
  }

  if (failures.length > 0) {
    for (const message of failures) {
      console.error(`fail ${message}`);
    }
    console.error(`\nFAILED: ${failures.length} translation-content checks failed.`);
    process.exit(1);
  }

  console.log("PASSED: translation-content checks passed.");
  console.log(`checked locales: ${APP_LOCALES.join(", ")}`);
  console.log(
    `datasets: hours, prayers, rule, stations, crown, examination, about, calendar, quotes`,
  );
}

main();
