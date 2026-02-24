"use client";

import { useState, useCallback, useEffect } from "react";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Hour } from "@/lib/prayers";

interface PrayerCounterProps {
  hour: Hour;
  onComplete: () => void;
  onBack: () => void;
}

function getStorageKey(hourId: string): string {
  const today = new Date().toISOString().split("T")[0];
  return `fp_count_${hourId}_${today}`;
}

export function PrayerCounter({ hour, onComplete, onBack }: PrayerCounterProps) {
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(getStorageKey(hour.id));
    if (saved) {
      const n = parseInt(saved, 10);
      setCount(n);
      if (n >= hour.paterCount) setCompleted(true);
    }
  }, [hour.id, hour.paterCount]);

  const handleTap = useCallback(() => {
    if (completed) return;
    const next = count + 1;
    setCount(next);
    localStorage.setItem(getStorageKey(hour.id), String(next));

    // Haptic feedback
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(15);
    }

    if (next >= hour.paterCount) {
      setCompleted(true);
      // Save completion
      const completionsKey = `fp_completions_${new Date().toISOString().split("T")[0]}`;
      const completions = JSON.parse(localStorage.getItem(completionsKey) || "[]");
      if (!completions.includes(hour.id)) {
        completions.push(hour.id);
        localStorage.setItem(completionsKey, JSON.stringify(completions));
      }
      setTimeout(onComplete, 600);
    }
  }, [count, completed, hour, onComplete]);

  const handleReset = useCallback(() => {
    setCount(0);
    setCompleted(false);
    localStorage.removeItem(getStorageKey(hour.id));
  }, [hour.id]);

  const progress = Math.min((count / hour.paterCount) * 100, 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4">
      <button
        onClick={onBack}
        className="self-start text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back
      </button>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground">{hour.name}</h2>
        <p className="text-sm text-muted-foreground italic">{hour.latinName}</p>
        <p className="text-xs text-muted-foreground mt-1">{hour.typicalTime}</p>
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-xs">
        {hour.description}
      </p>

      {/* The big tap target */}
      <button
        onClick={handleTap}
        disabled={completed}
        className={cn(
          "tap-target w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-200 shadow-lg",
          completed
            ? "bg-franciscan text-franciscan-foreground scale-95"
            : "bg-card text-card-foreground border-2 border-franciscan/30 hover:border-franciscan active:scale-95 active:bg-franciscan-light"
        )}
      >
        {completed ? (
          <Check className="w-16 h-16" />
        ) : (
          <>
            <span className="text-5xl font-bold tabular-nums">{count}</span>
            <span className="text-sm text-muted-foreground mt-1">
              of {hour.paterCount}
            </span>
          </>
        )}
      </button>

      {/* Progress bar */}
      <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-franciscan rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        {completed ? "Completed — Deo Gratias!" : "Tap to count each Pater Noster"}
      </p>

      {count > 0 && !completed && (
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      )}
    </div>
  );
}
