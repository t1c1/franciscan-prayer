"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check, Heart } from "lucide-react";
import { getTonightExamination, EXAMINATION_I18N, getExaminationQuestionAudioSrc } from "@/lib/examination";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ListenButton } from "@/components/listen-button";

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
      <div className="bg-card rounded-xl border border-border p-4 space-y-3 text-center">
        <Heart className="w-8 h-8 text-franciscan mx-auto" />
        <h3 className="text-base font-semibold text-foreground">
          {t("exam.title")}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("exam.intro")}
        </p>
        <p className="text-[10px] text-muted-foreground italic">
          &ldquo;{t("exam.quote")}&rdquo;
          — {t("exam.quote_author")}
        </p>
        <ListenButton
          text={`${t("exam.intro")}\n\n${t("exam.quote")} — ${t("exam.quote_author")}`}
          locale={locale}
          audioSrc={`/audio/exam/${locale}/intro.mp3`}
          className="mx-auto"
        />
        <button
          onClick={() => setStep(0)}
          className="w-full bg-franciscan text-franciscan-foreground rounded-lg py-2.5 text-xs font-medium hover:opacity-90 transition-opacity"
        >
          {t("exam.begin")}
        </button>
        <button
          onClick={onClose}
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          {t("exam.skip")}
        </button>
      </div>
    );
  }

  if (step >= totalSteps) {
    return (
      <div className="bg-card rounded-xl border border-border p-4 space-y-3 text-center">
        <Check className="w-8 h-8 text-franciscan mx-auto" />
        <h3 className="text-base font-semibold text-foreground">
          {t("exam.complete_title")}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("exam.complete_text")}
        </p>
        <p className="text-xs text-foreground/80 italic mt-1">
          {t("exam.complete_prayer")}
        </p>
        <ListenButton
          text={`${t("exam.complete_text")}\n\n${t("exam.complete_prayer")}`}
          locale={locale}
          audioSrc={`/audio/exam/${locale}/complete.mp3`}
          className="mx-auto"
        />
        <button
          onClick={onClose}
          className="w-full bg-franciscan text-franciscan-foreground rounded-lg py-2.5 text-xs font-medium hover:opacity-90 transition-opacity"
        >
          {t("exam.amen")}
        </button>
      </div>
    );
  }

  const question = questions[step];
  const questionAudioSrc = getExaminationQuestionAudioSrc(locale, question.question);

  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
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
      <p className="text-sm text-foreground leading-relaxed text-center py-3 min-h-[60px] flex items-center justify-center">
        {question.question}
      </p>

      <div className="flex justify-center">
        <ListenButton
          text={question.question}
          locale={locale}
          audioSrc={questionAudioSrc || undefined}
        />
      </div>

      {/* Reflection toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setReflections({ ...reflections, [step]: true })}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs transition-colors",
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
            "px-3 py-1.5 rounded-lg text-xs transition-colors",
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
