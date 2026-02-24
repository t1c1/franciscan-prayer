"use client";

import { useState } from "react";
import { getDailyChapter, RULE_CHAPTERS, RULE_I18N } from "@/lib/rule";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const UI: Record<string, Record<string, string>> = {
  en: {
    todayReading: "Today's Reading from the Rule",
    regulaBullata: "The Regula Bullata (1223)",
    latin: "Latin",
    english: "English",
    todayOnly: "Today Only",
    fullRule: "Full Rule",
    chapter: "Chapter",
    footer: "The Rule of the Friars Minor, confirmed by Pope Honorius III, November 29, 1223",
  },
  es: {
    todayReading: "Lectura de Hoy de la Regla",
    regulaBullata: "La Regula Bullata (1223)",
    latin: "Latín",
    english: "Español",
    todayOnly: "Solo Hoy",
    fullRule: "Regla Completa",
    chapter: "Capítulo",
    footer: "La Regla de los Hermanos Menores, confirmada por el Papa Honorio III, 29 de noviembre de 1223",
  },
  it: {
    todayReading: "Lettura di Oggi dalla Regola",
    regulaBullata: "La Regula Bullata (1223)",
    latin: "Latino",
    english: "Italiano",
    todayOnly: "Solo Oggi",
    fullRule: "Regola Completa",
    chapter: "Capitolo",
    footer: "La Regola dei Frati Minori, confermata da Papa Onorio III, 29 novembre 1223",
  },
  fr: {
    todayReading: "Lecture du Jour de la Règle",
    regulaBullata: "La Regula Bullata (1223)",
    latin: "Latin",
    english: "Français",
    todayOnly: "Aujourd'hui",
    fullRule: "Règle Complète",
    chapter: "Chapitre",
    footer: "La Règle des Frères Mineurs, confirmée par le Pape Honorius III, le 29 novembre 1223",
  },
  zh: {
    todayReading: "今日会规选读",
    regulaBullata: "《敕准会规》(1223)",
    latin: "拉丁文",
    english: "中文",
    todayOnly: "仅今日",
    fullRule: "全部会规",
    chapter: "第",
    footer: "小兄弟会会规，教宗何诺理三世确认于1223年11月29日",
  },
};

function chapterLabel(locale: string, num: number) {
  const u = UI[locale] || UI.en;
  if (locale === "zh") return `${u.chapter}${num}章`;
  return `${u.chapter} ${num}`;
}

export function DailyRule() {
  const { locale } = useI18n();
  const [showLatin, setShowLatin] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const daily = getDailyChapter();
  const chapters = showAll ? RULE_CHAPTERS : [daily];
  const u = UI[locale] || UI.en;
  const i18nChapters = locale !== "en" && RULE_I18N[locale] ? RULE_I18N[locale] : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {showAll ? u.regulaBullata : u.todayReading}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowLatin(!showLatin)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors",
              showLatin
                ? "bg-franciscan text-franciscan-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            {showLatin ? u.latin : u.english}
          </button>
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-accent transition-colors"
          >
            {showAll ? u.todayOnly : u.fullRule}
          </button>
        </div>
      </div>

      {chapters.map((chapter) => {
        const chapterIdx = RULE_CHAPTERS.indexOf(chapter);
        const i18nChapter = i18nChapters && chapterIdx >= 0 ? i18nChapters[chapterIdx] : null;

        // When showing Latin, always use Latin text
        // Otherwise use translated text if available, else English
        const displayTitle = showLatin
          ? chapter.titleLatin
          : (i18nChapter ? i18nChapter.title : chapter.title);
        const displayText = showLatin
          ? chapter.textLatin
          : (i18nChapter ? i18nChapter.text : chapter.text);

        return (
          <div
            key={chapter.chapter}
            className="bg-card rounded-lg border border-border p-4"
          >
            <p className="text-xs text-franciscan font-medium uppercase tracking-wide mb-1">
              {chapterLabel(locale, chapter.chapter)}
            </p>
            <h3 className="font-semibold text-foreground">
              {displayTitle}
            </h3>
            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
              {displayText}
            </p>
          </div>
        );
      })}

      <p className="text-xs text-muted-foreground text-center italic">
        {u.footer}
      </p>
    </div>
  );
}
