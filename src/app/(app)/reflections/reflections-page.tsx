"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Quote, CalendarHeart } from "lucide-react";
import { getDailyReflection, getReflectionHeadline, getReflectionUI } from "@/lib/daily-reflection";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const COLOR_STYLES: Record<string, { card: string; text: string }> = {
  green: {
    card: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800",
    text: "text-green-700 dark:text-green-400",
  },
  purple: {
    card: "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800",
    text: "text-purple-700 dark:text-purple-400",
  },
  white: {
    card: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
    text: "text-amber-700 dark:text-amber-400",
  },
};

export default function ReflectionsPage() {
  const { locale } = useI18n();
  const reflection = getDailyReflection(locale);
  const headline = getReflectionHeadline(locale);
  const ui = getReflectionUI(locale);
  const colors = COLOR_STYLES[reflection.seasonColor] || COLOR_STYLES.green;

  return (
    <div className="space-y-3">
      <Link href="/" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">
        {ui["page.back"]}
      </Link>

      {/* Season header */}
      <div className={cn("rounded-xl border p-4", colors.card)}>
        <p className={cn("text-[10px] uppercase tracking-wide font-medium", colors.text)}>
          {ui["page.season"]}
        </p>
        <h1 className="text-lg font-bold text-foreground mt-0.5">{headline}</h1>
        <p className="text-xs text-muted-foreground mt-1">
          {reflection.season} &middot; {reflection.seasonTheme}
        </p>
      </div>

      {/* Feast card (conditional) */}
      {reflection.feast && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <CalendarHeart className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-amber-700 dark:text-amber-400 uppercase tracking-wide font-medium">
                {ui["page.feast"]}
              </p>
              <p className="text-xs font-semibold text-foreground mt-0.5">
                {reflection.feast.name}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                {reflection.feast.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rule of 1223 */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-franciscan shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
              {ui["page.from_rule"]}
            </p>
            <p className="text-xs font-semibold text-foreground">
              {ui["page.chapter"]} {reflection.ruleChapter}: {reflection.ruleTitle}
            </p>
          </div>
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed">
          {reflection.ruleFullText}
        </p>
      </div>

      {/* Reflection prompt */}
      <div className={cn("rounded-xl border p-4", colors.card)}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className={cn("w-4 h-4 shrink-0", colors.text)} />
          <p className={cn("text-[10px] uppercase tracking-wide font-medium", colors.text)}>
            {ui["page.reflect"]}
          </p>
        </div>
        <p className="text-sm text-foreground italic leading-relaxed">
          {reflection.reflectionPrompt}
        </p>
        <p className="text-[10px] text-muted-foreground mt-2">
          {reflection.reflectionCategory}
        </p>
      </div>

      {/* Franciscan quote */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Quote className="w-4 h-4 text-franciscan shrink-0" />
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
            {ui["page.wisdom"]}
          </p>
        </div>
        <p className="text-xs text-foreground/80 italic leading-relaxed">
          &ldquo;{reflection.quote.text}&rdquo;
        </p>
        <p className="text-[10px] text-muted-foreground mt-1.5">
          — {reflection.quote.author}
          {reflection.quote.source && <span className="italic">, {reflection.quote.source}</span>}
        </p>
      </div>
    </div>
  );
}
