"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check, Heart } from "lucide-react";
import { getTonightExamination } from "@/lib/examination";
import { cn } from "@/lib/utils";

export function ExaminationOfConscience({ onClose }: { onClose: () => void }) {
  const questions = getTonightExamination();
  const [step, setStep] = useState(-1); // -1 = intro
  const [reflections, setReflections] = useState<Record<number, boolean>>({});

  const totalSteps = questions.length;

  if (step === -1) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 space-y-4 text-center">
        <Heart className="w-10 h-10 text-franciscan mx-auto" />
        <h3 className="text-lg font-semibold text-foreground">
          Examination of Conscience
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In the tradition of St. Francis, take a few moments to review your day
          with honesty and gentleness. God is merciful — this is not about guilt
          but about growing closer to Him.
        </p>
        <p className="text-xs text-muted-foreground italic">
          &ldquo;Let us begin again, for up to now we have done nothing.&rdquo;
          — St. Francis
        </p>
        <button
          onClick={() => setStep(0)}
          className="w-full bg-franciscan text-franciscan-foreground rounded-lg py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Begin Examination
        </button>
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>
    );
  }

  if (step >= totalSteps) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 space-y-4 text-center">
        <Check className="w-10 h-10 text-franciscan mx-auto" />
        <h3 className="text-lg font-semibold text-foreground">
          Examination Complete
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Thank God for His mercy. Entrust your failings to His grace and rest
          in His peace. Tomorrow is a new day to begin again.
        </p>
        <p className="text-sm text-foreground/80 italic mt-2">
          Lord, into Your hands I commend my spirit.<br />
          Watch over me as I sleep, and raise me up<br />
          to serve You with renewed love tomorrow.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-franciscan text-franciscan-foreground rounded-lg py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Amen — Continue to Compline
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
          {step + 1} of {totalSteps}
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
          Yes, I did well
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
          I can grow here
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <button
          onClick={() => setStep(step - 1)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={() => setStep(step + 1)}
          className="flex items-center gap-1 text-sm text-franciscan font-medium hover:opacity-80 transition-opacity"
        >
          {step === totalSteps - 1 ? "Finish" : "Next"} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
