"use client";

import { useState } from "react";
import { ChevronRight, Clock, Heart, Globe } from "lucide-react";
import { useI18n, LOCALE_LABELS, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "fp_onboarding_done";

export function useOnboarding() {
  if (typeof window === "undefined") return { showOnboarding: false, dismiss: () => {} };
  const done = localStorage.getItem(STORAGE_KEY) === "true";
  const dismiss = () => localStorage.setItem(STORAGE_KEY, "true");
  return { showOnboarding: !done, dismiss };
}

interface Step {
  icon: React.ReactNode;
  title: Record<string, string>;
  body: Record<string, string>;
}

const STEPS: Step[] = [
  {
    icon: <div className="text-4xl">☦️</div>,
    title: {
      en: "Welcome to Franciscan Prayer",
      es: "Bienvenido a Oración Franciscana",
      it: "Benvenuto in Preghiera Francescana",
      fr: "Bienvenue dans Prière Franciscaine",
      zh: "欢迎使用方济各祈祷",
    },
    body: {
      en: "Pray as a Franciscan every day — whether you are a friar, a sister, a secular Franciscan, or anyone drawn to the spirituality of St. Francis.",
      es: "Reza como franciscano cada día — ya seas fraile, hermana, franciscano seglar, o cualquiera atraído por la espiritualidad de San Francisco.",
      it: "Prega come un francescano ogni giorno — che tu sia un frate, una suora, un francescano secolare, o chiunque attratto dalla spiritualità di San Francesco.",
      fr: "Priez comme un franciscain chaque jour — que vous soyez frère, sœur, franciscain séculier, ou toute personne attirée par la spiritualité de Saint François.",
      zh: "每天像方济各会士一样祈祷——无论你是修士、修女、在俗方济各会员，还是被亚西西圣方济各的灵修吸引的任何人。",
    },
  },
  {
    icon: <Clock className="w-12 h-12 text-franciscan" />,
    title: {
      en: "The Original Pater Count",
      es: "El Recuento Original del Padrenuestro",
      it: "Il Conteggio Originale del Pater",
      fr: "Le Décompte Original du Pater",
      zh: "原始天主经计数",
    },
    body: {
      en: "The Rule of St. Francis (1223) prescribes 76 Our Fathers per day across 8 canonical hours. Tap to count each prayer — the app tracks your progress and streaks.",
      es: "La Regla de San Francisco (1223) prescribe 76 Padrenuestros por día en 8 horas canónicas. Toca para contar cada oración — la app rastrea tu progreso y rachas.",
      it: "La Regola di San Francesco (1223) prescrive 76 Pater Noster al giorno nelle 8 ore canoniche. Tocca per contare ogni preghiera — l'app tiene traccia del tuo progresso.",
      fr: "La Règle de Saint François (1223) prescrit 76 Notre Père par jour sur 8 heures canoniques. Appuyez pour compter chaque prière — l'app suit votre progression.",
      zh: "圣方济各会规（1223年）规定每天在8个时辰中诵念76遍天主经。点击计数每遍祈祷——应用会追踪你的进度和连续天数。",
    },
  },
  {
    icon: <Heart className="w-12 h-12 text-franciscan" />,
    title: {
      en: "Rich Franciscan Tradition",
      es: "Rica Tradición Franciscana",
      it: "Ricca Tradizione Francescana",
      fr: "Riche Tradition Franciscaine",
      zh: "丰富的方济各传统",
    },
    body: {
      en: "Explore the Franciscan Crown Rosary, Stations of the Cross, 13 prayers in 6 languages, the Rule, daily quotes from Franciscan saints, and an examination of conscience for Compline.",
      es: "Explora la Corona Franciscana, el Viacrucis, 13 oraciones en 6 idiomas, la Regla, citas diarias de santos franciscanos, y un examen de conciencia para Completas.",
      it: "Esplora la Corona Francescana, la Via Crucis, 13 preghiere in 6 lingue, la Regola, citazioni quotidiane di santi francescani, e un esame di coscienza per la Compieta.",
      fr: "Explorez la Couronne Franciscaine, le Chemin de Croix, 13 prières en 6 langues, la Règle, des citations quotidiennes de saints franciscains, et un examen de conscience pour les Complies.",
      zh: "探索方济各玫瑰经、苦路十四处、6种语言的13篇祈祷、会规、方济各圣人每日名言，以及夜课省察。",
    },
  },
];

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const { locale, setLocale } = useI18n();

  const handleFinish = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    onComplete();
  };

  // Language picker on step 0
  if (step === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <Globe className="w-12 h-12 text-franciscan mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">
          {locale === "zh" ? "选择你的语言" : locale === "es" ? "Elige tu idioma" : locale === "it" ? "Scegli la tua lingua" : locale === "fr" ? "Choisissez votre langue" : "Choose Your Language"}
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
          onClick={() => setStep(1)}
          className="mt-6 flex items-center gap-1 text-franciscan font-medium text-sm hover:opacity-80 transition-opacity"
        >
          {locale === "zh" ? "继续" : locale === "es" ? "Continuar" : locale === "it" ? "Continua" : locale === "fr" ? "Continuer" : "Continue"} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const s = STEPS[step - 1];
  const isLast = step >= STEPS.length;

  if (isLast) {
    handleFinish();
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6">{s.icon}</div>
      <h2 className="text-xl font-bold text-foreground mb-3">
        {s.title[locale] || s.title.en}
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
        {s.body[locale] || s.body.en}
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
          onClick={handleFinish}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {locale === "zh" ? "跳过" : locale === "es" ? "Omitir" : locale === "it" ? "Salta" : locale === "fr" ? "Passer" : "Skip"}
        </button>
        <button
          onClick={() => setStep(step + 1)}
          className="flex items-center gap-1 bg-franciscan text-franciscan-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {step >= STEPS.length
            ? (locale === "zh" ? "开始祈祷" : locale === "es" ? "Comenzar" : locale === "it" ? "Inizia" : locale === "fr" ? "Commencer" : "Start Praying")
            : (locale === "zh" ? "下一步" : locale === "es" ? "Siguiente" : locale === "it" ? "Avanti" : locale === "fr" ? "Suivant" : "Next")
          }
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
