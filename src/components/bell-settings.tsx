"use client";

import { useState } from "react";
import { RotateCcw, Volume2 } from "lucide-react";
import {
  playBell, loadBellSettings, saveBellSettings,
  BELL_DEFAULTS, BELL_FREQUENCY_RANGE, BELL_DURATION_RANGE, BELL_INTERVAL_RANGE,
  type BellSettings,
} from "@/lib/audio";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const PRESETS: { label: string; hz: number }[] = [
  { label: "C4", hz: 262 },
  { label: "A4", hz: 440 },
  { label: "C5 ☦", hz: 528 },
  { label: "E5", hz: 659 },
  { label: "A5", hz: 880 },
];

export function BellSettingsCard() {
  const { t } = useI18n();
  const [settings, setSettings] = useState<BellSettings>(loadBellSettings);

  const update = (partial: Partial<BellSettings>) => {
    const next = { ...settings, ...partial };
    setSettings(next);
    saveBellSettings(next);
  };

  const reset = () => {
    setSettings(BELL_DEFAULTS);
    saveBellSettings(BELL_DEFAULTS);
  };

  const preview = () => playBell(settings);

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{t("settings.bell")}</p>
          <p className="text-xs text-muted-foreground mt-1">{t("settings.bell_desc")}</p>
        </div>
        <button
          onClick={preview}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full bg-franciscan-light text-franciscan hover:opacity-80 transition-opacity"
        >
          <Volume2 className="w-3 h-3" /> {t("settings.bell_preview")}
        </button>
      </div>

      {/* Frequency */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground">{t("settings.bell_frequency")}</label>
          <span className="text-xs text-muted-foreground tabular-nums">{settings.frequency} Hz</span>
        </div>
        <input
          type="range"
          min={BELL_FREQUENCY_RANGE.min}
          max={BELL_FREQUENCY_RANGE.max}
          step={BELL_FREQUENCY_RANGE.step}
          value={settings.frequency}
          onChange={(e) => update({ frequency: Number(e.target.value) })}
          className="w-full accent-[hsl(var(--franciscan))] h-2"
        />
        <div className="flex gap-1.5 mt-1">
          {PRESETS.map((p) => (
            <button
              key={p.hz}
              onClick={() => update({ frequency: p.hz })}
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full transition-colors",
                settings.frequency === p.hz
                  ? "bg-franciscan-light text-franciscan font-medium"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground">{t("settings.bell_duration")}</label>
          <span className="text-xs text-muted-foreground tabular-nums">{settings.duration}s</span>
        </div>
        <input
          type="range"
          min={BELL_DURATION_RANGE.min}
          max={BELL_DURATION_RANGE.max}
          step={BELL_DURATION_RANGE.step}
          value={settings.duration}
          onChange={(e) => update({ duration: Number(e.target.value) })}
          className="w-full accent-[hsl(var(--franciscan))] h-2"
        />
      </div>

      {/* Interval */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground">{t("settings.bell_interval")}</label>
          <span className="text-xs text-muted-foreground tabular-nums">{settings.interval}s</span>
        </div>
        <input
          type="range"
          min={BELL_INTERVAL_RANGE.min}
          max={BELL_INTERVAL_RANGE.max}
          step={BELL_INTERVAL_RANGE.step}
          value={settings.interval}
          onChange={(e) => update({ interval: Number(e.target.value) })}
          className="w-full accent-[hsl(var(--franciscan))] h-2"
        />
      </div>

      {/* Reset */}
      <div className="mt-3 flex justify-end">
        <button
          onClick={reset}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> {t("settings.bell_reset")}
        </button>
      </div>
    </div>
  );
}
