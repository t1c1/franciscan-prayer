export type SpeechLocale = "latin" | "en" | "es" | "it" | "fr" | "zh";

const MARKERS: Record<SpeechLocale, { versicle: string; response: string }> = {
  latin: { versicle: "Versiculus", response: "Responsum" },
  en: { versicle: "Versicle", response: "Response" },
  es: { versicle: "Versículo", response: "Respuesta" },
  it: { versicle: "Versetto", response: "Risposta" },
  fr: { versicle: "Verset", response: "Réponse" },
  zh: { versicle: "领", response: "应" },
};

function expandCallResponseMarkers(text: string, locale: SpeechLocale): string {
  const labels = MARKERS[locale];
  let normalized = text;

  if (locale === "zh") {
    // Keep Chinese call/response labels stable for TTS.
    normalized = normalized.replace(/(^|\n)\s*领[：:]\s*/g, "$1领：");
    normalized = normalized.replace(/(^|\n)\s*应[：:]\s*/g, "$1应：");
    return normalized;
  }

  normalized = normalized.replace(/(^|\n)\s*V\.\s*/g, `$1${labels.versicle}: `);
  normalized = normalized.replace(/(^|\n)\s*R\.\s*/g, `$1${labels.response}: `);
  normalized = normalized.replace(/(^|\n)\s*℣\s*/g, `$1${labels.versicle}: `);
  normalized = normalized.replace(/(^|\n)\s*℟\s*/g, `$1${labels.response}: `);
  return normalized;
}

export function normalizeTextForSpeech(text: string, locale: SpeechLocale): string {
  return expandCallResponseMarkers(text, locale)
    .replace(/\r\n?/g, "\n")
    .replace(/…+/g, ". ")
    .replace(/\.{3,}/g, ". ")
    .replace(/\s+/g, " ")
    .trim();
}
