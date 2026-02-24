"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Cross, RotateCcw, Check } from "lucide-react";
import { STATIONS, STATIONS_PRAYERS } from "@/lib/stations";
import { cn } from "@/lib/utils";

type StationsView = "intro" | "praying" | "complete";

export function StationsOfTheCross() {
  const [view, setView] = useState<StationsView>("intro");
  const [current, setCurrent] = useState(0);

  if (view === "intro") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          The Stations of the Cross is a Franciscan devotion. The Franciscans, as custodians
          of the Holy Land, popularized this meditation on Christ&apos;s Passion. Walk with Jesus
          from His condemnation to His burial through 14 stations of prayer.
        </p>

        <div className="bg-franciscan-light rounded-lg p-4 text-center">
          <p className="text-sm text-foreground/80 italic whitespace-pre-line">
            {STATIONS_PRAYERS.opening}
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic whitespace-pre-line">
            {STATIONS_PRAYERS.openingLatin}
          </p>
        </div>

        <div className="space-y-2">
          {STATIONS.map((s) => (
            <div key={s.number} className="bg-card rounded-lg border border-border p-3">
              <p className="text-xs text-franciscan font-medium">
                Station {s.number}
              </p>
              <p className="text-sm font-medium text-foreground">{s.title}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setView("praying"); setCurrent(0); }}
          className="w-full bg-franciscan text-franciscan-foreground rounded-xl p-4 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Cross className="w-4 h-4" /> Begin the Way of the Cross
        </button>
      </div>
    );
  }

  if (view === "complete") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 px-4">
        <div className="w-20 h-20 rounded-full bg-franciscan text-franciscan-foreground flex items-center justify-center">
          <Check className="w-10 h-10" />
        </div>
        <div className="text-center max-w-sm">
          <h3 className="text-xl font-bold text-foreground">Way of the Cross Complete</h3>
          <p className="text-sm text-foreground/80 mt-3 leading-relaxed">
            {STATIONS_PRAYERS.closing}
          </p>
        </div>
        <button
          onClick={() => { setView("intro"); setCurrent(0); }}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Start Over
        </button>
      </div>
    );
  }

  const station = STATIONS[current];

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex gap-1">
        {STATIONS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= current ? "bg-franciscan" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Station content */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <div className="text-center">
          <p className="text-xs text-franciscan font-medium uppercase tracking-wide">
            Station {station.number} of 14
          </p>
          <h3 className="text-lg font-bold text-foreground mt-1">{station.title}</h3>
          <p className="text-xs text-muted-foreground italic mt-1">{station.titleLatin}</p>
        </div>

        <div className="bg-franciscan-light rounded-lg p-3 text-center">
          <p className="text-xs text-foreground/70 italic">{STATIONS_PRAYERS.opening}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Scripture</p>
          <p className="text-sm text-foreground/80 italic leading-relaxed">{station.scripture}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Meditation</p>
          <p className="text-sm text-foreground/80 leading-relaxed">{station.meditation}</p>
        </div>

        <div className="bg-muted rounded-lg p-3 text-center">
          <p className="text-sm text-foreground/80 italic">{STATIONS_PRAYERS.stationResponse}</p>
          <p className="text-xs text-muted-foreground italic mt-1">{STATIONS_PRAYERS.stationResponseLatin}</p>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Pray 1 Our Father, 1 Hail Mary, 1 Glory Be
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className={cn(
            "flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors",
            current === 0
              ? "text-muted-foreground opacity-40"
              : "text-foreground hover:bg-accent"
          )}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <span className="text-xs text-muted-foreground tabular-nums">
          {current + 1} / 14
        </span>

        {current < 13 ? (
          <button
            onClick={() => setCurrent(current + 1)}
            className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-franciscan text-franciscan-foreground hover:opacity-90 transition-opacity"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setView("complete")}
            className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-franciscan text-franciscan-foreground hover:opacity-90 transition-opacity"
          >
            Finish <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
