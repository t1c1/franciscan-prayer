export type SpeechLocale = "latin" | "en" | "es" | "it" | "fr" | "zh";

function stripCallResponseMarkers(text: string): string {
  let normalized = text;

  // Remove liturgical call/response markers so TTS reads natural prayer lines.
  normalized = normalized.replace(/(^|\n)\s*(V\.|R\.|℣|℟)\s*/g, "$1");
  normalized = normalized.replace(/(^|\n)\s*(Versicle|Response|Versiculus|Responsum|Versículo|Respuesta|Versetto|Risposta|Verset|Réponse)\s*[:：]\s*/gi, "$1");
  normalized = normalized.replace(/(^|\n)\s*(领|應|应)\s*[:：]\s*/g, "$1");
  return normalized;
}

export function normalizeTextForSpeech(text: string, _locale: SpeechLocale): string {
  void _locale;
  return stripCallResponseMarkers(text)
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{2,}/g, ". ")
    .replace(/\n/g, ", ")
    .replace(/…+/g, ". ")
    .replace(/\.{3,}/g, ". ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;!?])/g, "$1")
    .trim();
}
