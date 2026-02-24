"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check, Heart } from "lucide-react";
import { getTonightExamination, EXAMINATION_I18N } from "@/lib/examination";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ExaminationOfConscience({ onClose }: { onClose: () => void }) {
  const { locale, t } = useI18n();
  const enQuestions = getTonightExamination();
  const i18nData = EXAMINATION_I18N[locale];
  const questions = i18nData
    ? getTonightExaminationI18n(i18nData, enQuestions)
    : enQuestions;
  const [step, setStep] = useState(-1); // -1 = intro
  const [reflections, setReflections] = useState<Record<number, boolean>>({});

  const totalSteps = questions.length;

  if (step === -1) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 space-y-4 text-center">
        <Heart className="w-10 h-10 text-franciscan mx-auto" />
        <h3 className="text-lg font-semibold text-foreground">
          {t("exam.title")}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("exam.intro")}
        </p>
        <p className="text-xs text-muted-foreground italic">
          &ldquo;Let us begin again, for up to now we have done nothing.&rdquo;
          — St. Francis
        </p>
        <button
          onClick={() => setStep(0)}
          className="w-full bg-franciscan text-franciscan-foreground rounded-lg py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {t("exam.begin")}
        </button>
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {t("exam.skip")}
        </button>
      </div>
    );
  }

  if (step >= totalSteps) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 space-y-4 text-center">
        <Check className="w-10 h-10 text-franciscan mx-auto" />
        <h3 className="text-lg font-semibold text-foreground">
          {t("exam.complete_title")}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("exam.complete_text")}
        </p>
        <p className="text-sm text-foreground/80 italic mt-2">
          {t("exam.complete_prayer")}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-franciscan text-franciscan-foreground rounded-lg py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {t("exam.amen")}
        </button>
      </div>
    );
  }

  const question = questions[step];

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {step + 1} {t("counter.of")} {totalSteps}
        </span>
        <span className="text-xs font-medium text-franciscan">
          {question.category}
        </span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-franciscan rounded-full transition-all duration-300"
          style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Question */}
      <p className="text-foreground leading-relaxed text-center py-4 min-h-[80px] flex items-center justify-center">
        {question.question}
      </p>

      {/* Reflection toggle */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setReflections({ ...reflections, [step]: true })}
          className={cn(
            "px-4 py-2 rounded-lg text-sm transition-colors",
            reflections[step] === true
              ? "bg-franciscan text-franciscan-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          {t("exam.yes")}
        </button>
        <button
          onClick={() => setReflections({ ...reflections, [step]: false })}
          className={cn(
            "px-4 py-2 rounded-lg text-sm transition-colors",
            reflections[step] === false
              ? "bg-franciscan text-franciscan-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          {t("exam.grow")}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <button
          onClick={() => setStep(step - 1)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> {t("exam.back")}
        </button>
        <button
          onClick={() => setStep(step + 1)}
          className="flex items-center gap-1 text-sm text-franciscan font-medium hover:opacity-80 transition-opacity"
        >
          {step === totalSteps - 1 ? t("exam.finish") : t("exam.next")} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/** Pick the same question indices from the i18n questions set */
function getTonightExaminationI18n(
  i18nData: { categories: string[]; questions: { category: string; question: string }[] },
  enQuestions: { category: string; question: string }[]
) {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const result: { category: string; question: string }[] = [];
  for (let i = 0; i < i18nData.categories.length; i++) {
    const cat = i18nData.categories[i];
    const catQuestions = i18nData.questions.filter((q) => q.category === cat);
    if (catQuestions.length === 0) {
      result.push(enQuestions[i] || { category: cat, question: "" });
      continue;
    }
    const idx = (dayOfYear + i) % catQuestions.length;
    result.push(catQuestions[idx]);
  }
  return result;
}
