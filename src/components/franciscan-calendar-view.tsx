"use client";

import { useState } from "react";
import { Calendar, Star, Crown, Cross } from "lucide-react";
import {
  FRANCISCAN_FEASTS,
  getTodayFeast,
  getUpcomingFeasts,
  type FranciscanFeast,
} from "@/lib/franciscan-calendar";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const RANK_STYLES = {
  solemnity: "border-amber-400 bg-amber-50 dark:bg-amber-950/30",
  feast: "border-franciscan/50 bg-franciscan-light",
  memorial: "border-border",
  optional: "border-border",
} as const;

const RANK_ICONS = {
  solemnity: <Crown className="w-3.5 h-3.5 text-amber-600" />,
  feast: <Star className="w-3.5 h-3.5 text-franciscan" />,
  memorial: <Cross className="w-3.5 h-3.5 text-muted-foreground" />,
  optional: <Calendar className="w-3.5 h-3.5 text-muted-foreground" />,
};

const RANK_LABELS: Record<string, Record<string, string>> = {
  en: { solemnity: "Solemnity", feast: "Feast", memorial: "Memorial", optional: "Optional Memorial" },
  es: { solemnity: "Solemnidad", feast: "Fiesta", memorial: "Memorial", optional: "Memorial Opcional" },
  it: { solemnity: "Solennità", feast: "Festa", memorial: "Memoria", optional: "Memoria Facoltativa" },
  fr: { solemnity: "Solennité", feast: "Fête", memorial: "Mémoire", optional: "Mémoire Facultative" },
  zh: { solemnity: "庆日", feast: "庆节", memorial: "纪念日", optional: "自由纪念日" },
};

const UI: Record<string, Record<string, string>> = {
  en: { todayFeast: "Today\u2019s Franciscan Feast", upcoming: "Upcoming", fullCalendar: "Full Calendar", feasts: "feasts in the Franciscan Proper Calendar" },
  es: { todayFeast: "Fiesta Franciscana de Hoy", upcoming: "Próximas", fullCalendar: "Calendario Completo", feasts: "fiestas en el Calendario Propio Franciscano" },
  it: { todayFeast: "Festa Francescana di Oggi", upcoming: "Prossime", fullCalendar: "Calendario Completo", feasts: "feste nel Calendario Proprio Francescano" },
  fr: { todayFeast: "Fête Franciscaine du Jour", upcoming: "À venir", fullCalendar: "Calendrier Complet", feasts: "fêtes dans le Calendrier Propre Franciscain" },
  zh: { todayFeast: "今日方济各庆节", upcoming: "即将到来", fullCalendar: "完整日历", feasts: "方济各专属日历中的庆节" },
};

function getMonthName(locale: string, month: number): string {
  return new Date(2024, month - 1, 1).toLocaleDateString(locale, { month: "long" });
}

function getMonthAbbr(locale: string, month: number): string {
  return new Date(2024, month - 1, 1).toLocaleDateString(locale, { month: "short" });
}

type CalendarView = "upcoming" | "full";

export function FranciscanCalendarView() {
  const { locale } = useI18n();
  const [view, setView] = useState<CalendarView>("upcoming");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const todayFeast = getTodayFeast();
  const upcoming = getUpcomingFeasts(8);
  const u = UI[locale] || UI.en;
  const ranks = RANK_LABELS[locale] || RANK_LABELS.en;

  const feastKey = (f: FranciscanFeast) => `${f.month}-${f.day}`;

  return (
    <div className="space-y-4">
      {/* Today's feast banner */}
      {todayFeast && (
        <div className="bg-franciscan text-franciscan-foreground rounded-xl p-4">
          <p className="text-xs opacity-80 uppercase tracking-wide">
            {u.todayFeast}
          </p>
          <p className="text-lg font-bold mt-1">{todayFeast.name}</p>
          <p className="text-sm opacity-80 mt-1">{todayFeast.description}</p>
        </div>
      )}

      {/* View toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView("upcoming")}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium transition-colors",
            view === "upcoming"
              ? "bg-franciscan text-franciscan-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent"
          )}
        >
          {u.upcoming}
        </button>
        <button
          onClick={() => setView("full")}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium transition-colors",
            view === "full"
              ? "bg-franciscan text-franciscan-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent"
          )}
        >
          {u.fullCalendar}
        </button>
      </div>

      {/* Upcoming view */}
      {view === "upcoming" && (
        <div className="space-y-2">
          {upcoming.map((f) => (
            <FeastCard
              key={feastKey(f)}
              feast={f}
              locale={locale}
              ranks={ranks}
              expanded={expandedId === feastKey(f)}
              onToggle={() =>
                setExpandedId(expandedId === feastKey(f) ? null : feastKey(f))
              }
            />
          ))}
        </div>
      )}

      {/* Full calendar grouped by month */}
      {view === "full" &&
        Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
          const feasts = FRANCISCAN_FEASTS.filter((f) => f.month === month);
          if (feasts.length === 0) return null;
          return (
            <div key={month} className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {getMonthName(locale, month)}
              </h3>
              {feasts.map((f) => (
                <FeastCard
                  key={feastKey(f)}
                  feast={f}
                  locale={locale}
                  ranks={ranks}
                  expanded={expandedId === feastKey(f)}
                  onToggle={() =>
                    setExpandedId(
                      expandedId === feastKey(f) ? null : feastKey(f)
                    )
                  }
                />
              ))}
            </div>
          );
        })}

      <p className="text-xs text-muted-foreground text-center">
        {FRANCISCAN_FEASTS.length} {u.feasts}
      </p>
    </div>
  );
}

function FeastCard({
  feast,
  locale,
  ranks,
  expanded,
  onToggle,
}: {
  feast: FranciscanFeast;
  locale: string;
  ranks: Record<string, string>;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full text-left bg-card rounded-lg border p-3 transition-colors hover:border-franciscan/40",
        RANK_STYLES[feast.rank]
      )}
    >
      <div className="flex items-start gap-2">
        <div className="mt-0.5">{RANK_ICONS[feast.rank]}</div>
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-medium text-sm text-foreground">{feast.name}</p>
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {getMonthAbbr(locale, feast.month)} {feast.day}
            </p>
          </div>
          <p className="text-xs text-muted-foreground capitalize">{ranks[feast.rank] || feast.rank}</p>
          {expanded && (
            <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
              {feast.description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
