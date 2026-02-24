"use client";

import { useState, useCallback } from "react";
import { Check, ChevronRight, RotateCcw } from "lucide-react";
import { CROWN_MYSTERIES, CROWN_INSTRUCTIONS } from "@/lib/franciscan-crown";
import { cn } from "@/lib/utils";

type CrownView = "intro" | "praying";

export function FranciscanCrown() {
  const [view, setView] = useState<CrownView>("intro");
  const [currentMystery, setCurrentMystery] = useState(0);
  const [aveCount, setAveCount] = useState(0);
  const [paterDone, setPaterDone] = useState(false);
  const [completedMysteries, setCompletedMysteries] = useState<number[]>([]);

  const mystery = CROWN_MYSTERIES[currentMystery];
  const isFinished = completedMysteries.length === 7;

  const handleTap = useCallback(() => {
    if (!paterDone) {
      setPaterDone(true);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(20);
      }
      return;
    }

    const next = aveCount + 1;
    setAveCount(next);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }

    if (next >= 10) {
      setCompletedMysteries((prev) => [...prev, currentMystery]);
      if (currentMystery < 6) {
        setCurrentMystery(currentMystery + 1);
        setAveCount(0);
        setPaterDone(false);
      }
    }
  }, [aveCount, paterDone, currentMystery]);

  const handleReset = () => {
    setCurrentMystery(0);
    setAveCount(0);
    setPaterDone(false);
    setCompletedMysteries([]);
    setView("intro");
  };

  if (view === "intro") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
          {CROWN_INSTRUCTIONS.en}
        </p>

        <div className="space-y-2">
          {CROWN_MYSTERIES.map((m, i) => (
            <div
              key={i}
              className="bg-card rounded-lg border border-border p-3"
            >
              <p className="text-xs text-franciscan font-medium">
                {m.number}. {m.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Fruit: {m.fruit}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setView("praying")}
          className="w-full bg-franciscan text-franciscan-foreground rounded-xl p-4 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          Begin the Crown <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Praying view
  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 px-4">
        <div className="w-20 h-20 rounded-full bg-franciscan text-franciscan-foreground flex items-center justify-center">
          <Check className="w-10 h-10" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground">
            Crown Complete!
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            7 decades &middot; 72 Hail Marys
          </p>
          <p className="text-xs text-muted-foreground mt-1 italic">
            Now pray 1 Our Father, 1 Hail Mary, and 1 Glory Be for the Holy Father.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4">
      {/* Mystery info */}
      <div className="text-center max-w-sm">
        <p className="text-xs text-franciscan font-medium uppercase tracking-wide">
          {mystery.number}th Joy &middot; Decade {currentMystery + 1} of 7
        </p>
        <h3 className="text-lg font-bold text-foreground mt-1">
          {mystery.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          {mystery.scripture}
        </p>
        <p className="text-xs text-franciscan mt-1 italic">
          Fruit: {mystery.fruit}
        </p>
      </div>

      {/* Counter */}
      <button
        onClick={handleTap}
        className={cn(
          "tap-target w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-200 shadow-lg",
          "bg-card text-card-foreground border-2 border-franciscan/30 hover:border-franciscan active:scale-95 active:bg-franciscan-light"
        )}
      >
        {!paterDone ? (
          <span className="text-sm font-medium text-center px-4">
            Tap for<br />Our Father
          </span>
        ) : (
          <>
            <span className="text-4xl font-bold tabular-nums">{aveCount}</span>
            <span className="text-xs text-muted-foreground mt-1">
              of 10 Hail Marys
            </span>
          </>
        )}
      </button>

      {/* Progress dots */}
      <div className="flex gap-2">
        {CROWN_MYSTERIES.map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              completedMysteries.includes(i)
                ? "bg-franciscan"
                : i === currentMystery
                ? "bg-franciscan/40 ring-2 ring-franciscan"
                : "bg-muted"
            )}
          />
        ))}
      </div>

      <button
        onClick={handleReset}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <RotateCcw className="w-3 h-3" /> Start Over
      </button>
    </div>
  );
}
