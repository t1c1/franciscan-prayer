"use client";

import { useState } from "react";
import { PRAYERS, LANGUAGE_LABELS, type Language } from "@/lib/prayers";
import { MORE_PRAYERS } from "@/lib/more-prayers";
import { cn } from "@/lib/utils";

export function PrayerTextViewer() {
  const [lang, setLang] = useState<Language>("en");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Language selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(Object.keys(LANGUAGE_LABELS) as Language[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors",
              lang === l
                ? "bg-franciscan text-franciscan-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            {LANGUAGE_LABELS[l]}
          </button>
        ))}
      </div>

      {/* Prayer cards */}
      {[...PRAYERS, ...MORE_PRAYERS].map((prayer) => {
        const text = prayer[lang];
        if (!text) return null;
        const isExpanded = expandedId === prayer.id;

        return (
          <button
            key={prayer.id}
            onClick={() => setExpandedId(isExpanded ? null : prayer.id)}
            className="w-full text-left bg-card rounded-lg border border-border p-4 hover:border-franciscan/40 transition-colors"
          >
            <h3 className="font-semibold text-foreground">{prayer.title}</h3>
            {isExpanded ? (
              <p className="mt-3 text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                {text}
              </p>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground truncate">
                {text.split("\n")[0]}...
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
