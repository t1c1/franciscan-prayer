export type NumberWordLocale = "latin" | "en" | "es" | "it" | "fr" | "zh";

const SMALL_NUMBER_WORDS: Record<NumberWordLocale, Record<string, string>> = {
  en: {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "10": "ten",
  },
  es: {
    "1": "uno",
    "2": "dos",
    "3": "tres",
    "4": "cuatro",
    "5": "cinco",
    "6": "seis",
    "7": "siete",
    "8": "ocho",
    "9": "nueve",
    "10": "diez",
  },
  it: {
    "1": "uno",
    "2": "due",
    "3": "tre",
    "4": "quattro",
    "5": "cinque",
    "6": "sei",
    "7": "sette",
    "8": "otto",
    "9": "nove",
    "10": "dieci",
  },
  fr: {
    "1": "un",
    "2": "deux",
    "3": "trois",
    "4": "quatre",
    "5": "cinq",
    "6": "six",
    "7": "sept",
    "8": "huit",
    "9": "neuf",
    "10": "dix",
  },
  zh: {
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "七",
    "8": "八",
    "9": "九",
    "10": "十",
  },
  latin: {
    "1": "unus",
    "2": "duo",
    "3": "tres",
    "4": "quattuor",
    "5": "quinque",
    "6": "sex",
    "7": "septem",
    "8": "octo",
    "9": "novem",
    "10": "decem",
  },
};

function isDigit(char: string | undefined): boolean {
  return !!char && char >= "0" && char <= "9";
}

function isCompositeNumberBoundary(text: string, start: number, end: number): boolean {
  const prev = text[start - 1];
  const prevPrev = text[start - 2];
  const next = text[end];
  const nextNext = text[end + 1];

  // Keep numeric compounds unchanged: 1:26, 6:00, 10-03, 3/4, 2.5
  if ((next === ":" || next === "/" || next === "-" || next === ".") && isDigit(nextNext)) return true;
  if ((prev === ":" || prev === "/" || prev === "-" || prev === ".") && isDigit(prevPrev)) return true;

  return false;
}

export function spellOutSmallNumbers(text: string, locale: NumberWordLocale): string {
  const words = SMALL_NUMBER_WORDS[locale];
  return text.replace(/\b(10|[1-9])\b/g, (match, _group, offset: number, source: string) => {
    if (isCompositeNumberBoundary(source, offset, offset + match.length)) {
      return match;
    }
    return words[match] || match;
  });
}
