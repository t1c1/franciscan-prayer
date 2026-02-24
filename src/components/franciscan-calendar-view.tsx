"use client";

import { useState } from "react";
import { Calendar, Star, Crown, Cross } from "lucide-react";
import {
  FRANCISCAN_FEASTS,
  getTodayFeast,
  getUpcomingFeasts,
  type FranciscanFeast,
} from "@/lib/franciscan-calendar";
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

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type CalendarView = "upcoming" | "full";

export function FranciscanCalendarView() {
  const [view, setView] = useState<CalendarView>("upcoming");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const todayFeast = getTodayFeast();
  const upcoming = getUpcomingFeasts(8);

  const feastKey = (f: FranciscanFeast) => `${f.month}-${f.day}`;

  return (
    <div className="space-y-4">
      {/* Today's feast banner */}
      {todayFeast && (
        <div className="bg-franciscan text-franciscan-foreground rounded-xl p-4">
          <p className="text-xs opacity-80 uppercase tracking-wide">
            Today&apos;s Franciscan Feast
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
          Upcoming
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
          Full Calendar
        </button>
      </div>

      {/* Upcoming view */}
      {view === "upcoming" && (
        <div className="space-y-2">
          {upcoming.map((f) => (
            <FeastCard
              key={feastKey(f)}
              feast={f}
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
                {MONTH_NAMES[month - 1]}
              </h3>
              {feasts.map((f) => (
                <FeastCard
                  key={feastKey(f)}
                  feast={f}
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
        {FRANCISCAN_FEASTS.length} feasts in the Franciscan Proper Calendar
      </p>
    </div>
  );
}

function FeastCard({
  feast,
  expanded,
  onToggle,
}: {
  feast: FranciscanFeast;
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
              {MONTH_NAMES[feast.month - 1].slice(0, 3)} {feast.day}
            </p>
          </div>
          <p className="text-xs text-muted-foreground capitalize">{feast.rank}</p>
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
