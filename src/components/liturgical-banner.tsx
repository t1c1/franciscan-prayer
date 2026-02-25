"use client";

import { useState, useEffect } from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { fetchTodayLiturgical, type LitCalDay } from "@/lib/litcal";
import { getTodayUSCCBUrl } from "@/lib/readings";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const COLOR_STYLES: Record<string, string> = {
  green: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800",
  purple: "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800",
  white: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
  red: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800",
  rose: "bg-pink-50 border-pink-200 dark:bg-pink-950/30 dark:border-pink-800",
  black: "bg-neutral-100 border-neutral-300 dark:bg-neutral-900/30 dark:border-neutral-700",
};

const COLOR_DOT: Record<string, string> = {
  green: "bg-green-500",
  purple: "bg-purple-500",
  white: "bg-amber-300 border border-amber-400",
  red: "bg-red-500",
  rose: "bg-pink-400",
  black: "bg-neutral-700",
};

export function LiturgicalBanner() {
  const { locale, t } = useI18n();
  const [day, setDay] = useState<LitCalDay | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchTodayLiturgical(locale).then((value) => {
      if (!cancelled) setDay(value);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (!day) return null;

  const psalmPrefix = t("banner.psalm");

  return (
    <div className={cn("rounded-xl border p-4 space-y-2", COLOR_STYLES[day.color] || COLOR_STYLES.green)}>
      <div className="flex items-start gap-2">
        <div className={cn("w-3 h-3 rounded-full mt-1 shrink-0", COLOR_DOT[day.color] || COLOR_DOT.green)} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground leading-tight">{day.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {day.season && <>{day.season} &middot; </>}
            {day.grade}
            {day.isHolyDay && <span className="ml-1 font-medium text-red-600 dark:text-red-400">&middot; {t("banner.holy_day")}</span>}
          </p>
        </div>
      </div>

      {day.readings && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {day.readings.first_reading && (
            <span><BookOpen className="w-3 h-3 inline mr-0.5" />{day.readings.first_reading}</span>
          )}
          {day.readings.psalm && <span>{psalmPrefix}{day.readings.psalm}</span>}
          {day.readings.second_reading && <span>{day.readings.second_reading}</span>}
          {day.readings.gospel && <span className="font-medium">{day.readings.gospel}</span>}
        </div>
      )}

      <a
        href={getTodayUSCCBUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => { e.preventDefault(); window.open(getTodayUSCCBUrl(), "_blank", "noopener,noreferrer"); }}
        className="inline-flex items-center gap-1 text-xs text-franciscan hover:underline"
      >
        <ExternalLink className="w-3 h-3" /> {t("banner.read_usccb")}
      </a>
    </div>
  );
}
