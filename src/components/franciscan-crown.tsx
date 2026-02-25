"use client";

import { useState, useCallback } from "react";
import { Check, ChevronRight, RotateCcw } from "lucide-react";
import { CROWN_MYSTERIES, CROWN_INSTRUCTIONS, CROWN_I18N } from "@/lib/franciscan-crown";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ListenButton } from "@/components/listen-button";

type CrownView = "intro" | "praying";

function joyLabel(locale: string, t: (key: string) => string, num: number, current: number) {
  if (locale === "zh") return `第${num}端喜乐 · 第${current + 1}端 / 7端`;
  return `${num}${locale === "fr" ? "e" : "th"} ${t("crown.joy")} \u00b7 ${t("crown.decade")} ${current + 1} ${t("crown.of")} 7`;
}

export function FranciscanCrown() {
  const { locale, t } = useI18n();
  const [view, setView] = useState<CrownView>("intro");
  const [currentMystery, setCurrentMystery] = useState(0);
  const [aveCount, setAveCount] = useState(0);
  const [paterDone, setPaterDone] = useState(false);
  const [completedMysteries, setCompletedMysteries] = useState<number[]>([]);

  const mystery = CROWN_MYSTERIES[currentMystery];
  const isFinished = completedMysteries.length === 7;
  const i18nMysteries = locale !== "en" && CROWN_I18N[locale] ? CROWN_I18N[locale] : null;
  const instructions = CROWN_INSTRUCTIONS[locale as keyof typeof CROWN_INSTRUCTIONS] || CROWN_INSTRUCTIONS.en;

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
          {instructions}
        </p>
        <ListenButton
          text={instructions}
          locale={locale}
          audioSrc={`/audio/crown/${locale}/intro.mp3`}
        />

        <div className="space-y-2">
          {CROWN_MYSTERIES.map((m, i) => {
            const locM = i18nMysteries ? i18nMysteries[i] : null;
            return (
              <div
                key={i}
                className="bg-card rounded-lg border border-border p-3"
              >
                <p className="text-xs text-franciscan font-medium">
                  {m.number}. {locM ? locM.title : m.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("crown.fruit")}: {locM ? locM.fruit : m.fruit}
                </p>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setView("praying")}
          className="w-full bg-franciscan text-franciscan-foreground rounded-xl p-4 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {t("crown.begin")} <ChevronRight className="w-4 h-4" />
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
            {t("crown.complete")}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {t("crown.decades")} &middot; {t("crown.hail_marys")}
          </p>
          <p className="text-xs text-muted-foreground mt-1 italic">
            {t("crown.closing_instruction")}
          </p>
          <ListenButton
            text={t("crown.closing_instruction")}
            locale={locale}
            audioSrc={`/audio/crown/${locale}/complete.mp3`}
            className="mt-3 mx-auto"
          />
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> {t("crown.start_over")}
        </button>
      </div>
    );
  }

  const locMystery = i18nMysteries ? i18nMysteries[currentMystery] : null;
  const mysteryListenText = [
    locMystery ? locMystery.title : mystery.title,
    locMystery ? locMystery.scripture : mystery.scripture,
    `${t("crown.fruit")}: ${locMystery ? locMystery.fruit : mystery.fruit}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4">
      {/* Mystery info */}
      <div className="text-center max-w-sm">
        <p className="text-xs text-franciscan font-medium uppercase tracking-wide">
          {joyLabel(locale, t, mystery.number, currentMystery)}
        </p>
        <h3 className="text-lg font-bold text-foreground mt-1">
          {locMystery ? locMystery.title : mystery.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          {locMystery ? locMystery.scripture : mystery.scripture}
        </p>
        <p className="text-xs text-franciscan mt-1 italic">
          {t("crown.fruit")}: {locMystery ? locMystery.fruit : mystery.fruit}
        </p>
        <ListenButton
          text={mysteryListenText}
          locale={locale}
          audioSrc={`/audio/crown/${locale}/mystery-${currentMystery + 1}.mp3`}
          className="mt-3 mx-auto"
        />
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
          <span className="text-sm font-medium text-center px-4 whitespace-pre-line">
            {t("crown.tap_our_father")}
          </span>
        ) : (
          <>
            <span className="text-4xl font-bold tabular-nums">{aveCount}</span>
            <span className="text-xs text-muted-foreground mt-1">
              {t("crown.of_hail_marys")}
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
        <RotateCcw className="w-3 h-3" /> {t("crown.start_over")}
      </button>
    </div>
  );
}
