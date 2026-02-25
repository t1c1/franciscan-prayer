"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { PRAYERS, LANGUAGE_LABELS, type Language } from "@/lib/prayers";
import { MORE_PRAYERS } from "@/lib/more-prayers";
import { cn } from "@/lib/utils";
import { trackPrayerExpanded, trackPrayerFavorited } from "@/lib/analytics";
import { ListenButton } from "@/components/listen-button";

const FAVORITES_KEY = "fp_favorite_prayers";

function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

function toggleFavorite(id: string): string[] {
  const current = getFavorites();
  const next = current.includes(id)
    ? current.filter((f) => f !== id)
    : [id, ...current];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}

export function PrayerTextViewer() {
  const [lang, setLang] = useState<Language>("en");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const allPrayers = [...PRAYERS, ...MORE_PRAYERS];

  // Sort: favorites first, then original order
  const sorted = [...allPrayers].sort((a, b) => {
    const aFav = favorites.includes(a.id) ? 0 : 1;
    const bFav = favorites.includes(b.id) ? 0 : 1;
    if (aFav !== bFav) return aFav - bFav;
    return allPrayers.indexOf(a) - allPrayers.indexOf(b);
  });

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const next = toggleFavorite(id);
    setFavorites(next);
    trackPrayerFavorited(id, next.includes(id));
  };

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
      {sorted.map((prayer) => {
        const text = prayer[lang];
        if (!text) return null;
        const isExpanded = expandedId === prayer.id;
        const isFav = favorites.includes(prayer.id);
        const toggleExpanded = () => {
          const next = isExpanded ? null : prayer.id;
          setExpandedId(next);
          if (next) trackPrayerExpanded(next);
        };

        return (
          <div
            key={prayer.id}
            className="bg-card rounded-lg border border-border hover:border-franciscan/40 transition-colors"
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={toggleExpanded}
                  className="text-left flex-1"
                >
                  <h3 className="font-semibold text-foreground">{prayer.title}</h3>
                </button>
                <button
                  type="button"
                  onClick={(e) => handleToggleFavorite(e, prayer.id)}
                  className={cn(
                    "shrink-0 p-1 rounded-full transition-colors",
                    isFav ? "text-franciscan" : "text-muted-foreground/30 hover:text-muted-foreground"
                  )}
                  aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                  <Star className={cn("w-4 h-4", isFav && "fill-current")} />
                </button>
              </div>
              {isExpanded ? (
                <div className="mt-3 space-y-3">
                  <ListenButton text={text} locale={lang} />
                  <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                    {text}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={toggleExpanded}
                  className="mt-1 w-full text-left text-sm text-muted-foreground truncate"
                >
                  {text.split("\n")[0]}...
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
