import { getLiturgicalInfo } from "@/lib/readings";
import { getTodayFeast, CALENDAR_I18N } from "@/lib/franciscan-calendar";
import { getDailyChapter, RULE_CHAPTERS, RULE_I18N } from "@/lib/rule";
import { EXAMINATION_QUESTIONS, EXAMINATION_I18N, EXAMINATION_CATEGORIES } from "@/lib/examination";
import { QUOTES, QUOTES_I18N } from "@/lib/franciscan-quotes";

export interface DailyReflection {
  season: string;
  seasonColor: string;
  seasonTheme: string;
  feast: { name: string; description: string } | null;
  ruleChapter: number;
  ruleTitle: string;
  ruleFullText: string;
  reflectionPrompt: string;
  reflectionCategory: string;
  quote: { text: string; author: string; source?: string };
}

// Map liturgical season → Franciscan theme
const SEASON_THEME_MAP: Record<string, string[]> = {
  "Advent": ["Prayer & Faithfulness"],
  "Christmas": ["Fraternity & Charity"],
  "Lent": ["Poverty & Simplicity", "Humility & Obedience"],
  "Easter": ["Peace & Reconciliation"],
  "Ordinary Time": ["Care for Creation", "Prayer & Faithfulness"],
};

function getDayOfYear(): number {
  const now = new Date();
  return Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
}

export function getDailyReflection(locale: string): DailyReflection {
  const dayOfYear = getDayOfYear();
  const { season, color: seasonColor } = getLiturgicalInfo();

  // Season theme
  const themes = SEASON_THEME_MAP[season] || SEASON_THEME_MAP["Ordinary Time"];
  const seasonTheme = themes[dayOfYear % themes.length];

  // Feast (nullable)
  const todayFeast = getTodayFeast();
  let feast: DailyReflection["feast"] = null;
  if (todayFeast) {
    const fKey = `${String(todayFeast.month).padStart(2, "0")}-${String(todayFeast.day).padStart(2, "0")}`;
    const fi = (locale !== "en" && CALENDAR_I18N?.[locale]?.[fKey]) || { name: todayFeast.name, description: todayFeast.description };
    feast = fi;
  }

  // Rule chapter
  const enChapter = getDailyChapter();
  const localizedRule = locale !== "en" ? RULE_I18N[locale] : undefined;
  const ruleIdx = dayOfYear % RULE_CHAPTERS.length;
  const localizedChapter = localizedRule ? localizedRule[ruleIdx] : undefined;
  const ruleTitle = localizedChapter?.title || enChapter.title;
  const ruleFullText = localizedChapter?.text || enChapter.text;

  // Reflection prompt: filter by season theme, offset to avoid collision with nightly examination
  const localizedExam = locale !== "en" ? EXAMINATION_I18N[locale] : undefined;
  const questions = localizedExam ? localizedExam.questions : EXAMINATION_QUESTIONS;
  const enCategories = EXAMINATION_QUESTIONS.map((q) => q.category);
  const filtered = questions.filter((_, i) => enCategories[i] === seasonTheme);
  const seasonCharSum = season.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  const promptIdx = (dayOfYear + seasonCharSum) % (filtered.length || 1);
  const selectedPrompt = filtered[promptIdx] || questions[dayOfYear % questions.length];

  // Category label — find matching English category index, then map to localized
  const enCatIndex = EXAMINATION_CATEGORIES.indexOf(seasonTheme);
  const reflectionCategory = localizedExam?.categories?.[enCatIndex] || selectedPrompt.category;

  // Quote: offset 17 from homepage daily quote to ensure different selection
  const quoteIdx = (dayOfYear + 17) % QUOTES.length;
  const localizedQuotes = locale !== "en" ? QUOTES_I18N[locale] : undefined;
  const quote = localizedQuotes ? localizedQuotes[quoteIdx % localizedQuotes.length] : QUOTES[quoteIdx];

  return {
    season,
    seasonColor,
    seasonTheme: getLocalizedTheme(locale, seasonTheme),
    feast,
    ruleChapter: enChapter.chapter,
    ruleTitle,
    ruleFullText,
    reflectionPrompt: selectedPrompt.question,
    reflectionCategory,
    quote,
  };
}

function getLocalizedTheme(locale: string, enTheme: string): string {
  const THEME_I18N: Record<string, Record<string, string>> = {
    es: {
      "Prayer & Faithfulness": "Oración y Fidelidad",
      "Fraternity & Charity": "Fraternidad y Caridad",
      "Poverty & Simplicity": "Pobreza y Sencillez",
      "Humility & Obedience": "Humildad y Obediencia",
      "Peace & Reconciliation": "Paz y Reconciliación",
      "Care for Creation": "Cuidado de la Creación",
    },
    it: {
      "Prayer & Faithfulness": "Preghiera e Fedeltà",
      "Fraternity & Charity": "Fraternità e Carità",
      "Poverty & Simplicity": "Povertà e Semplicità",
      "Humility & Obedience": "Umiltà e Obbedienza",
      "Peace & Reconciliation": "Pace e Riconciliazione",
      "Care for Creation": "Cura del Creato",
    },
    fr: {
      "Prayer & Faithfulness": "Prière et Fidélité",
      "Fraternity & Charity": "Fraternité et Charité",
      "Poverty & Simplicity": "Pauvreté et Simplicité",
      "Humility & Obedience": "Humilité et Obéissance",
      "Peace & Reconciliation": "Paix et Réconciliation",
      "Care for Creation": "Soin de la Création",
    },
    zh: {
      "Prayer & Faithfulness": "祈祷与忠信",
      "Fraternity & Charity": "手足之情与仁爱",
      "Poverty & Simplicity": "贫穷与简朴",
      "Humility & Obedience": "谦逊与服从",
      "Peace & Reconciliation": "和平与修和",
      "Care for Creation": "爱护受造界",
    },
  };
  return THEME_I18N[locale]?.[enTheme] || enTheme;
}

// Season headlines for the reflections page
const REFLECTION_HEADLINES: Record<string, Record<string, string>> = {
  en: {
    "Advent": "Preparing the Way",
    "Christmas": "The Word Made Flesh",
    "Lent": "The Path of Penance",
    "Easter": "Alleluia! He is Risen!",
    "Ordinary Time": "Walking with Francis",
  },
  es: {
    "Advent": "Preparando el Camino",
    "Christmas": "El Verbo se Hizo Carne",
    "Lent": "El Camino de la Penitencia",
    "Easter": "¡Aleluya! ¡Ha Resucitado!",
    "Ordinary Time": "Caminando con Francisco",
  },
  it: {
    "Advent": "Preparando la Via",
    "Christmas": "Il Verbo si è Fatto Carne",
    "Lent": "Il Cammino della Penitenza",
    "Easter": "Alleluia! È Risorto!",
    "Ordinary Time": "Camminando con Francesco",
  },
  fr: {
    "Advent": "Préparer le Chemin",
    "Christmas": "Le Verbe s'est Fait Chair",
    "Lent": "Le Chemin de la Pénitence",
    "Easter": "Alléluia ! Il est Ressuscité !",
    "Ordinary Time": "Marcher avec François",
  },
  zh: {
    "Advent": "预备道路",
    "Christmas": "圣言成了血肉",
    "Lent": "悔改之路",
    "Easter": "阿肋路亚！祂复活了！",
    "Ordinary Time": "与方济各同行",
  },
};

export function getReflectionHeadline(locale: string): string {
  const { season } = getLiturgicalInfo();
  return REFLECTION_HEADLINES[locale]?.[season] || REFLECTION_HEADLINES.en[season] || "Daily Reflection";
}

// UI strings for cards and pages
const REFLECTION_UI: Record<string, Record<string, string>> = {
  en: {
    "card.label": "Today's Reflection",
    "card.read_more": "Read more →",
    "page.title": "Daily Reflection",
    "page.season": "Season",
    "page.feast": "Franciscan Feast",
    "page.from_rule": "From the Rule of 1223",
    "page.chapter": "Chapter",
    "page.reflect": "Reflect",
    "page.wisdom": "Franciscan Wisdom",
    "page.back": "← Back to Home",
    "nav.label": "Reflections",
  },
  es: {
    "card.label": "Reflexión del Día",
    "card.read_more": "Leer más →",
    "page.title": "Reflexión Diaria",
    "page.season": "Tiempo litúrgico",
    "page.feast": "Fiesta Franciscana",
    "page.from_rule": "De la Regla de 1223",
    "page.chapter": "Capítulo",
    "page.reflect": "Reflexionar",
    "page.wisdom": "Sabiduría Franciscana",
    "page.back": "← Volver al Inicio",
    "nav.label": "Reflexiones",
  },
  it: {
    "card.label": "Riflessione del Giorno",
    "card.read_more": "Leggi di più →",
    "page.title": "Riflessione Quotidiana",
    "page.season": "Tempo liturgico",
    "page.feast": "Festa Francescana",
    "page.from_rule": "Dalla Regola del 1223",
    "page.chapter": "Capitolo",
    "page.reflect": "Riflettere",
    "page.wisdom": "Saggezza Francescana",
    "page.back": "← Torna alla Home",
    "nav.label": "Riflessioni",
  },
  fr: {
    "card.label": "Réflexion du Jour",
    "card.read_more": "Lire la suite →",
    "page.title": "Réflexion Quotidienne",
    "page.season": "Temps liturgique",
    "page.feast": "Fête Franciscaine",
    "page.from_rule": "De la Règle de 1223",
    "page.chapter": "Chapitre",
    "page.reflect": "Réfléchir",
    "page.wisdom": "Sagesse Franciscaine",
    "page.back": "← Retour à l'Accueil",
    "nav.label": "Réflexions",
  },
  zh: {
    "card.label": "今日省思",
    "card.read_more": "阅读更多 →",
    "page.title": "每日省思",
    "page.season": "礼仪季节",
    "page.feast": "方济各庆节",
    "page.from_rule": "选自1223年会规",
    "page.chapter": "第…章",
    "page.reflect": "默想",
    "page.wisdom": "方济各智慧",
    "page.back": "← 返回首页",
    "nav.label": "省思",
  },
};

export function getReflectionUI(locale: string): Record<string, string> {
  return REFLECTION_UI[locale] || REFLECTION_UI.en;
}
