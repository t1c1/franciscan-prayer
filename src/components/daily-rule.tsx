"use client";

import { useState } from "react";
import { getDailyChapter, RULE_CHAPTERS } from "@/lib/rule";
import { cn } from "@/lib/utils";

export function DailyRule() {
  const [showLatin, setShowLatin] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const daily = getDailyChapter();
  const chapters = showAll ? RULE_CHAPTERS : [daily];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {showAll ? "The Regula Bullata (1223)" : "Today's Reading from the Rule"}
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
            {showLatin ? "Latin" : "English"}
          </button>
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-accent transition-colors"
          >
            {showAll ? "Today Only" : "Full Rule"}
          </button>
        </div>
      </div>

      {chapters.map((chapter) => (
        <div
          key={chapter.chapter}
          className="bg-card rounded-lg border border-border p-4"
        >
          <p className="text-xs text-franciscan font-medium uppercase tracking-wide mb-1">
            Chapter {chapter.chapter}
          </p>
          <h3 className="font-semibold text-foreground">
            {showLatin ? chapter.titleLatin : chapter.title}
          </h3>
          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
            {showLatin ? chapter.textLatin : chapter.text}
          </p>
        </div>
      ))}

      <p className="text-xs text-muted-foreground text-center italic">
        The Rule of the Friars Minor, confirmed by Pope Honorius III, November 29, 1223
      </p>
    </div>
  );
}
