"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Check, RotateCcw, Timer, Pause, Play } from "lucide-react";
import { cn, getLocalDateString } from "@/lib/utils";
import { playTap, playBell, playCompletionChime, loadBellSettings } from "@/lib/audio";
import { useI18n } from "@/lib/i18n";
import { HOURS_I18N, PRAYERS, type Hour } from "@/lib/prayers";
import { trackHourCompleted } from "@/lib/analytics";
import { ListenButton } from "@/components/listen-button";

interface PrayerCounterProps {
  hour: Hour;
  onComplete: () => void;
  onBack: () => void;
}

function getStorageKey(hourId: string): string {
  const today = getLocalDateString();
  return `fp_count_${hourId}_${today}`;
}

export function PrayerCounter({ hour, onComplete, onBack }: PrayerCounterProps) {
  const { locale, t } = useI18n();
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Pacing timer state — interval loaded from bell settings
  const bellSettings = loadBellSettings();
  const [pacingActive, setPacingActive] = useState(false);
  const [pacingPaused, setPacingPaused] = useState(false);
  const [paceSeconds, setPaceSeconds] = useState(bellSettings.interval);
  const [timeLeft, setTimeLeft] = useState(0);
  const pacingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(getStorageKey(hour.id));
    if (saved) {
      const n = parseInt(saved, 10);
      setCount(n);
      if (n >= hour.paterCount) setCompleted(true);
    }
    // Restore sound preference
    const soundPref = localStorage.getItem("fp_sound_enabled");
    if (soundPref === "false") setSoundEnabled(false);
  }, [hour.id, hour.paterCount]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (pacingRef.current) clearInterval(pacingRef.current);
    };
  }, []);

  const advanceCount = useCallback(() => {
    if (completed) return;
    const next = count + 1;
    setCount(next);
    localStorage.setItem(getStorageKey(hour.id), String(next));

    if (soundEnabled) playTap();
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(15);
    }

    if (next >= hour.paterCount) {
      setCompleted(true);
      if (soundEnabled) playCompletionChime();
      if (pacingRef.current) {
        clearInterval(pacingRef.current);
        pacingRef.current = null;
      }
      setPacingActive(false);
      const completionsKey = `fp_completions_${getLocalDateString()}`;
      const completions = JSON.parse(localStorage.getItem(completionsKey) || "[]");
      if (!completions.includes(hour.id)) {
        completions.push(hour.id);
        localStorage.setItem(completionsKey, JSON.stringify(completions));
      }
      trackHourCompleted(hour.id, hour.paterCount);
      setTimeout(onComplete, 800);
    }
  }, [count, completed, hour, onComplete, soundEnabled]);

  const handleTap = useCallback(() => {
    if (pacingActive) return; // In pacing mode, taps are auto
    advanceCount();
  }, [pacingActive, advanceCount]);

  const startPacing = useCallback(() => {
    if (completed) return;
    setPacingActive(true);
    setPacingPaused(false);
    setTimeLeft(paceSeconds);

    if (pacingRef.current) clearInterval(pacingRef.current);
    pacingRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return paceSeconds; // Reset timer — advance happens in effect
        }
        return prev - 1;
      });
    }, 1000);
  }, [completed, paceSeconds]);

  // Handle timer reaching zero — advance count and play bell
  useEffect(() => {
    if (!pacingActive || pacingPaused || completed) return;
    if (timeLeft === paceSeconds && count > 0) {
      // Timer just reset — means we completed an interval
    }
  }, [timeLeft, pacingActive, pacingPaused, completed, paceSeconds, count]);

  // Proper pacing: use a single interval that ticks every second
  useEffect(() => {
    if (!pacingActive || pacingPaused || completed) return;

    if (pacingRef.current) clearInterval(pacingRef.current);
    let remaining = timeLeft || paceSeconds;

    pacingRef.current = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        remaining = paceSeconds;
        setTimeLeft(paceSeconds);
        // Play bell and advance
        if (soundEnabled) playBell();
        advanceCount();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => {
      if (pacingRef.current) clearInterval(pacingRef.current);
    };
    // We intentionally only re-run when these change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pacingActive, pacingPaused, completed, paceSeconds, soundEnabled]);

  const togglePacing = () => {
    if (pacingActive) {
      if (pacingRef.current) clearInterval(pacingRef.current);
      pacingRef.current = null;
      setPacingActive(false);
      setPacingPaused(false);
      setTimeLeft(0);
    } else {
      startPacing();
    }
  };

  const togglePause = () => {
    if (pacingPaused) {
      setPacingPaused(false);
    } else {
      if (pacingRef.current) clearInterval(pacingRef.current);
      pacingRef.current = null;
      setPacingPaused(true);
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("fp_sound_enabled", String(next));
  };

  const handleReset = useCallback(() => {
    setCount(0);
    setCompleted(false);
    setPacingActive(false);
    setPacingPaused(false);
    setTimeLeft(0);
    if (pacingRef.current) clearInterval(pacingRef.current);
    pacingRef.current = null;
    localStorage.removeItem(getStorageKey(hour.id));
  }, [hour.id]);

  const progress = Math.min((count / hour.paterCount) * 100, 100);
  const paterNoster = PRAYERS.find(p => p.id === "pater-noster")!;
  const gloriaPatri = PRAYERS.find(p => p.id === "gloria-patri")!;
  const requiem = PRAYERS.find(p => p.id === "requiem-aeternam")!;
  const hourI18n = HOURS_I18N[locale]?.[hour.id] || HOURS_I18N.en[hour.id];
  const hourName = hourI18n?.name || hour.name;
  const hourDesc = hourI18n?.description || hour.description;
  const hourTime = hourI18n?.typicalTime || hour.typicalTime;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4">
      <div className="self-start flex items-center justify-between w-full">
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; {t("home.back")}
        </button>
        <button
          onClick={toggleSound}
          className={cn(
            "text-xs px-2 py-1 rounded-full transition-colors",
            soundEnabled
              ? "bg-franciscan-light text-franciscan"
              : "bg-muted text-muted-foreground"
          )}
        >
          {soundEnabled ? t("app.sound_on") : t("app.sound_off")}
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground">{hourName}</h2>
        <p className="text-sm text-muted-foreground italic">{hour.latinName}</p>
        <p className="text-xs text-muted-foreground mt-1">{hourTime}</p>
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-xs">
        {hourDesc}
      </p>
      <ListenButton
        text={`${hourName}. ${hourDesc}`}
        locale={locale}
        audioSrc={`/audio/hours/${locale}/${hour.id}.mp3`}
      />

      {/* Our Father prayer text - collapsible */}
      <details className="w-full max-w-xs">
        <summary className="text-sm text-franciscan cursor-pointer font-medium text-center">
          {paterNoster.titles[locale] || paterNoster.title}
        </summary>
        <p className="mt-2 text-sm text-foreground/80 whitespace-pre-line leading-relaxed bg-card rounded-lg border border-border p-3">
          {paterNoster[locale] || paterNoster.en}
        </p>
      </details>

      {/* Gloria Patri / Requiem reminder */}
      <p className="text-xs text-muted-foreground italic text-center max-w-xs">
        {hour.id === "dead"
          ? t("counter.requiem_reminder")
          : t("counter.gloria_reminder")}
      </p>

      {/* Gloria Patri / Requiem - collapsible */}
      <details className="w-full max-w-xs">
        <summary className="text-xs text-franciscan/70 cursor-pointer text-center">
          {hour.id === "dead"
            ? (requiem.titles[locale] || requiem.title)
            : (gloriaPatri.titles[locale] || gloriaPatri.title)}
        </summary>
        <p className="mt-2 text-xs text-foreground/70 whitespace-pre-line leading-relaxed bg-card rounded-lg border border-border p-3">
          {hour.id === "dead"
            ? (requiem[locale] || requiem.en)
            : (gloriaPatri[locale] || gloriaPatri.en)}
        </p>
      </details>

      {/* The big tap target */}
      <button
        onClick={handleTap}
        disabled={completed || pacingActive}
        className={cn(
          "tap-target w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-200 shadow-lg relative",
          completed
            ? "bg-franciscan text-franciscan-foreground scale-95"
            : pacingActive
              ? "bg-card text-card-foreground border-2 border-franciscan"
              : "bg-card text-card-foreground border-2 border-franciscan/30 hover:border-franciscan active:scale-95 active:bg-franciscan-light"
        )}
      >
        {completed ? (
          <Check className="w-16 h-16" />
        ) : (
          <>
            <span className="text-5xl font-bold tabular-nums">{count}</span>
            <span className="text-sm text-muted-foreground mt-1">
              {t("counter.of")} {hour.paterCount}
            </span>
            {pacingActive && !pacingPaused && (
              <span className="text-xs text-franciscan mt-2 tabular-nums">
                {timeLeft}s
              </span>
            )}
            {pacingActive && pacingPaused && (
              <span className="text-xs text-muted-foreground mt-2">
                {t("counter.pause").toLowerCase()}
              </span>
            )}
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
        {completed
          ? t("counter.completed")
          : pacingActive
            ? t("counter.pacing")
            : t("counter.tap")}
      </p>

      {/* Pacing controls */}
      {!completed && (
        <div className="flex items-center gap-3">
          <button
            onClick={togglePacing}
            className={cn(
              "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors",
              pacingActive
                ? "bg-franciscan text-franciscan-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Timer className="w-3.5 h-3.5" />
            {pacingActive ? t("counter.stop_timer") : t("counter.timer")}
          </button>

          {pacingActive && (
            <button
              onClick={togglePause}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              {pacingPaused ? (
                <><Play className="w-3 h-3" /> {t("counter.resume")}</>
              ) : (
                <><Pause className="w-3 h-3" /> {t("counter.pause")}</>
              )}
            </button>
          )}

          {!pacingActive && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPaceSeconds(Math.max(5, paceSeconds - 5))}
                className="text-xs w-6 h-6 rounded-full bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center"
              >
                &minus;
              </button>
              <span className="text-xs font-medium text-franciscan tabular-nums min-w-[32px] text-center">
                {paceSeconds}s
              </span>
              <button
                onClick={() => setPaceSeconds(Math.min(120, paceSeconds + 5))}
                className="text-xs w-6 h-6 rounded-full bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center"
              >
                +
              </button>
            </div>
          )}
        </div>
      )}

      {count > 0 && !completed && !pacingActive && (
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> {t("counter.reset")}
        </button>
      )}
    </div>
  );
}
