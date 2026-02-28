"use client";

import Link from "next/link";
import { getDailyReflection, getReflectionHeadline, getReflectionUI } from "@/lib/daily-reflection";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const COLOR_STYLES: Record<string, string> = {
  green: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800",
  purple: "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800",
  white: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
};

export function ReflectionCard() {
  const { locale } = useI18n();
  const reflection = getDailyReflection(locale);
  const headline = getReflectionHeadline(locale);
  const ui = getReflectionUI(locale);

  return (
    <Link
      href="/reflections"
      className={cn(
        "block w-full rounded-xl border p-3.5 text-left hover:opacity-90 transition-opacity",
        COLOR_STYLES[reflection.seasonColor] || COLOR_STYLES.green,
      )}
    >
      <p className="text-[11px] uppercase tracking-wide font-medium text-muted-foreground">
        {ui["card.label"]}
      </p>
      <p className="text-sm font-semibold text-foreground mt-0.5">{headline}</p>
      <p className="text-sm text-foreground/80 italic mt-1.5 line-clamp-3 leading-relaxed">
        &ldquo;{reflection.quote.text}&rdquo;
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        — {reflection.quote.author}
      </p>
      <p className="text-xs text-franciscan font-medium mt-1.5">
        {ui["card.read_more"]}
      </p>
    </Link>
  );
}
