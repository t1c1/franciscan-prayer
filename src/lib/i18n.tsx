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
const SUPPORTED: Locale[] = ["en", "es", "it", "fr", "zh"];

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
  const [ready, setReady] = useState(false);

  // Detect locale on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && SUPPORTED.includes(saved)) {
      setLocaleState(saved);
    } else {
      const browserLang = navigator.language.slice(0, 2) as Locale;
      const detected = SUPPORTED.includes(browserLang) ? browserLang : "en";
      setLocaleState(detected);
      localStorage.setItem(STORAGE_KEY, detected);
    }
    setReady(true);
  }, []);

  // Listen for cloud locale sync from auth-context
  useEffect(() => {
    const handler = (e: Event) => {
      const locale = (e as CustomEvent).detail as Locale;
      if (SUPPORTED.includes(locale)) {
        setLocaleState(locale);
      }
    };
    window.addEventListener("fp-locale-sync", handler);
    return () => window.removeEventListener("fp-locale-sync", handler);
  }, []);

  // Load translation strings when locale changes
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

  if (!ready) return null;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
