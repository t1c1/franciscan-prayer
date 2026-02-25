"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Cross, RotateCcw, Check } from "lucide-react";
import { STATIONS, STATIONS_PRAYERS, STATIONS_I18N } from "@/lib/stations";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ListenButton } from "@/components/listen-button";

type StationsView = "intro" | "praying" | "complete";

// Chinese uses "第X处" format instead of "Station X"
function stationLabel(locale: string, t: (key: string) => string, num: number) {
  if (locale === "zh") return `第${num}处`;
  return `${t("stations.station")} ${num}`;
}

function stationOfLabel(locale: string, t: (key: string) => string, num: number, total: number) {
  if (locale === "zh") return `第${num}处 / ${total}处`;
  return `${t("stations.station")} ${num} ${t("stations.of")} ${total}`;
}

export function StationsOfTheCross() {
  const { locale, t } = useI18n();
  const [view, setView] = useState<StationsView>("intro");
  const [current, setCurrent] = useState(0);
  const i18nStations = locale !== "en" && STATIONS_I18N[locale] ? STATIONS_I18N[locale] : null;
  const introListenText = [t("stations.intro"), STATIONS_PRAYERS.opening].filter(Boolean).join("\n\n");

  if (view === "intro") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          {t("stations.intro")}
        </p>
        <ListenButton
          text={introListenText}
          locale={locale}
          audioSrc={`/audio/stations/${locale}/intro.mp3`}
        />

        <div className="bg-franciscan-light rounded-lg p-4 text-center">
          <p className="text-sm text-foreground/80 italic whitespace-pre-line">
            {STATIONS_PRAYERS.opening}
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic whitespace-pre-line">
            {STATIONS_PRAYERS.openingLatin}
          </p>
        </div>

        <div className="space-y-2">
          {STATIONS.map((s, i) => (
            <div key={s.number} className="bg-card rounded-lg border border-border p-3">
              <p className="text-xs text-franciscan font-medium">
                {stationLabel(locale, t, s.number)}
              </p>
              <p className="text-sm font-medium text-foreground">
                {i18nStations ? i18nStations[i].title : s.title}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setView("praying"); setCurrent(0); }}
          className="w-full bg-franciscan text-franciscan-foreground rounded-xl p-4 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Cross className="w-4 h-4" /> {t("stations.begin")}
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
          <h3 className="text-xl font-bold text-foreground">{t("stations.complete")}</h3>
          <p className="text-sm text-foreground/80 mt-3 leading-relaxed">
            {STATIONS_PRAYERS.closing}
          </p>
          <ListenButton
            text={STATIONS_PRAYERS.closing}
            locale={locale}
            audioSrc={`/audio/stations/${locale}/closing.mp3`}
            className="mt-3"
          />
        </div>
        <button
          onClick={() => { setView("intro"); setCurrent(0); }}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> {t("stations.start_over")}
        </button>
      </div>
    );
  }

  const station = STATIONS[current];
  const i18nStation = i18nStations ? i18nStations[current] : null;
  const stationListenText = [
    i18nStation ? i18nStation.title : station.title,
    i18nStation ? i18nStation.scripture : station.scripture,
    i18nStation ? i18nStation.meditation : station.meditation,
    STATIONS_PRAYERS.stationResponse,
    t("stations.pray_instruction"),
  ]
    .filter(Boolean)
    .join("\n\n");

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
            {stationOfLabel(locale, t, station.number, 14)}
          </p>
          <h3 className="text-lg font-bold text-foreground mt-1">
            {i18nStation ? i18nStation.title : station.title}
          </h3>
          <p className="text-xs text-muted-foreground italic mt-1">{station.titleLatin}</p>
        </div>

        <ListenButton
          text={stationListenText}
          locale={locale}
          audioSrc={`/audio/stations/${locale}/station-${station.number}.mp3`}
        />

        <div className="bg-franciscan-light rounded-lg p-3 text-center">
          <p className="text-xs text-foreground/70 italic">{STATIONS_PRAYERS.opening}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">{t("stations.scripture")}</p>
          <p className="text-sm text-foreground/80 italic leading-relaxed">
            {i18nStation ? i18nStation.scripture : station.scripture}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">{t("stations.meditation")}</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {i18nStation ? i18nStation.meditation : station.meditation}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-3 text-center">
          <p className="text-sm text-foreground/80 italic">{STATIONS_PRAYERS.stationResponse}</p>
          <p className="text-xs text-muted-foreground italic mt-1">{STATIONS_PRAYERS.stationResponseLatin}</p>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          {t("stations.pray_instruction")}
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
          <ChevronLeft className="w-4 h-4" /> {t("stations.previous")}
        </button>

        <span className="text-xs text-muted-foreground tabular-nums">
          {current + 1} / 14
        </span>

        {current < 13 ? (
          <button
            onClick={() => setCurrent(current + 1)}
            className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-franciscan text-franciscan-foreground hover:opacity-90 transition-opacity"
          >
            {t("stations.next")} <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setView("complete")}
            className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-franciscan text-franciscan-foreground hover:opacity-90 transition-opacity"
          >
            {t("stations.finish")} <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
