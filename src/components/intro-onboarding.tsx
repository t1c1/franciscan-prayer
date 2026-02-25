"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Clock, Heart, Globe } from "lucide-react";
import { useI18n, LOCALE_LABELS, type Locale } from "@/lib/i18n";
import { trackOnboardingCompleted, trackOnboardingStepViewed, trackOnboardingSkipped } from "@/lib/analytics";

const STORAGE_KEY = "fp_onboarding_done";

export function useIntroOnboarding() {
  const [state, setState] = useState<"loading" | "show" | "dismissed">("loading");

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY) === "true";
    setState(done ? "dismissed" : "show");
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setState("dismissed");
  };

  return { state, dismiss };
}

interface Step {
  icon: React.ReactNode;
  titleKey: string;
  bodyKey: string;
}

const STEPS: Step[] = [
  {
    icon: <div className="text-4xl">☦️</div>,
    titleKey: "onboarding.step1_title",
    bodyKey: "onboarding.step1_body",
  },
  {
    icon: <Clock className="w-12 h-12 text-franciscan" />,
    titleKey: "onboarding.step2_title",
    bodyKey: "onboarding.step2_body",
  },
  {
    icon: <Heart className="w-12 h-12 text-franciscan" />,
    titleKey: "onboarding.step3_title",
    bodyKey: "onboarding.step3_body",
  },
];

export function IntroOnboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    if (step > 0 && step <= STEPS.length) {
      trackOnboardingStepViewed(step);
    }
  }, [step]);

  const handleFinish = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    trackOnboardingCompleted();
    onComplete();
  };

  const handleSkip = () => {
    trackOnboardingSkipped(step);
    handleFinish();
  };

  const handleNext = () => {
    if (step >= STEPS.length) {
      handleFinish();
    } else {
      setStep(step + 1);
    }
  };

  // Language picker on step 0
  if (step === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <Globe className="w-12 h-12 text-franciscan mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">
          {t("onboarding.lang_title")}
        </h2>
        <div className="grid grid-cols-1 gap-2 w-full max-w-xs mt-4">
          {(Object.keys(LOCALE_LABELS) as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${locale === l ? "bg-franciscan text-franciscan-foreground" : "bg-card border border-border text-foreground hover:border-franciscan/40"}`}
            >
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            trackOnboardingStepViewed(0);
            setStep(1);
          }}
          className="mt-6 flex items-center gap-1 text-franciscan font-medium text-sm hover:opacity-80 transition-opacity"
        >
          {t("onboarding.continue")} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const s = STEPS[step - 1];
  const isLast = step >= STEPS.length;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div 
        key={`icon-${step}`}
        className="mb-6"
        style={{ animation: "fadeInUp 0.4s ease-out forwards", opacity: 0 }}
      >
        {s.icon}
      </div>
      <h2 
        key={`title-${step}`}
        className="text-xl font-bold text-foreground mb-3"
        style={{ animation: "fadeInUp 0.4s ease-out 0.1s forwards", opacity: 0 }}
      >
        {t(s.titleKey)}
      </h2>
      <p 
        key={`body-${step}`}
        className="text-sm text-muted-foreground leading-relaxed max-w-sm"
        style={{ animation: "fadeInUp 0.4s ease-out 0.2s forwards", opacity: 0 }}
      >
        {t(s.bodyKey)}
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${i === step - 1 ? "bg-franciscan" : "bg-muted"}`}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSkip}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {t("onboarding.skip")}
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-1 bg-franciscan text-franciscan-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {isLast ? t("onboarding.start") : t("onboarding.next")}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
