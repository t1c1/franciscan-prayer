"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Locale = "en" | "es" | "it" | "fr" | "zh";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  it: "Italiano",
  fr: "Français",
  zh: "中文",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  it: "IT",
  fr: "FR",
  zh: "中",
};

const STORAGE_KEY = "fp_locale";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
});

export function useI18n() {
  return useContext(I18nContext);
}

export function useT() {
  const { t } = useContext(I18nContext);
  return t;
}

export function useLocale() {
  const { locale, setLocale } = useContext(I18nContext);
  return { locale, setLocale };
}

// Lazy-loaded translation modules
let translations: Record<Locale, Record<string, string>> | null = null;

async function loadTranslations(): Promise<Record<Locale, Record<string, string>>> {
  if (translations) return translations;
  const { UI_STRINGS } = await import("./ui-strings");
  translations = UI_STRINGS;
  return translations;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [strings, setStrings] = useState<Record<string, string>>({});

  useEffect(() => {
    // Detect saved locale or browser language
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && saved in LOCALE_LABELS) {
      setLocaleState(saved);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      const detected = (["en", "es", "it", "fr", "zh"].includes(browserLang) ? browserLang : "en") as Locale;
      setLocaleState(detected);
    }
  }, []);

  useEffect(() => {
    loadTranslations().then((t) => {
      setStrings(t[locale] || t.en);
    });
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const t = (key: string): string => {
    return strings[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
