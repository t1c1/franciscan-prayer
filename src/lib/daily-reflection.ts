import { getLiturgicalInfo } from "@/lib/readings";
import { getTodayFeast, CALENDAR_I18N } from "@/lib/franciscan-calendar";
import { getDailyChapter, RULE_CHAPTERS, RULE_I18N } from "@/lib/rule";
import { EXAMINATION_QUESTIONS, EXAMINATION_I18N } from "@/lib/examination";
import { QUOTES_I18N } from "@/lib/franciscan-quotes";

// Re-export the English quotes array for offset selection
const QUOTES_EN = [
  { text: "Lord, make me an instrument of your peace. Where there is hatred, let me sow love.", author: "St. Francis of Assisi", source: "Prayer of St. Francis" },
  { text: "Start by doing what is necessary; then do what is possible; and suddenly you are doing the impossible.", author: "St. Francis of Assisi" },
  { text: "For it is in giving that we receive.", author: "St. Francis of Assisi", source: "Prayer of St. Francis" },
  { text: "Preach the Gospel at all times. When necessary, use words.", author: "St. Francis of Assisi" },
  { text: "All the darkness in the world cannot extinguish the light of a single candle.", author: "St. Francis of Assisi" },
  { text: "Where there is charity and wisdom, there is neither fear nor ignorance.", author: "St. Francis of Assisi", source: "Admonitions XXVII" },
  { text: "If God can work through me, He can work through anyone.", author: "St. Francis of Assisi" },
  { text: "Be praised, my Lord, through all your creatures, especially through my lord Brother Sun.", author: "St. Francis of Assisi", source: "Canticle of the Sun" },
  { text: "Above all the grace and the gifts that Christ gives to His beloved is that of overcoming self.", author: "St. Francis of Assisi" },
  { text: "Remember that when you leave this earth, you can take with you nothing that you have received — only what you have given.", author: "St. Francis of Assisi" },
  { text: "While you are proclaiming peace with your lips, be careful to have it even more fully in your heart.", author: "St. Francis of Assisi" },
  { text: "It is no use walking anywhere to preach unless our walking is our preaching.", author: "St. Francis of Assisi" },
  { text: "Blessed is the servant who loves his brother as much when he is sick and useless as when he is well and can be of service.", author: "St. Francis of Assisi", source: "Admonitions XXIV" },
  { text: "The deeds you do may be the only sermon some persons will hear today.", author: "St. Francis of Assisi" },
  { text: "Hold back nothing of yourselves for yourselves, so that He who gives Himself totally to you may receive you totally.", author: "St. Francis of Assisi", source: "Letter to the Entire Order" },
  { text: "Love that cannot suffer is not worthy of that name.", author: "St. Clare of Assisi" },
  { text: "We become what we love and who we love shapes what we become.", author: "St. Clare of Assisi" },
  { text: "Go forth in peace, for you have followed the good road. Go forth without fear, for He who created you has made you holy.", author: "St. Clare of Assisi" },
  { text: "Place your mind before the mirror of eternity! Place your soul in the brilliance of glory!", author: "St. Clare of Assisi", source: "Third Letter to Agnes of Prague" },
  { text: "Gaze upon Him, consider Him, contemplate Him, as you desire to imitate Him.", author: "St. Clare of Assisi", source: "Second Letter to Agnes of Prague" },
  { text: "In beautiful things St. Francis saw Beauty itself, and through His vestiges imprinted on creation he followed his Beloved everywhere.", author: "St. Bonaventure", source: "Major Life of St. Francis" },
  { text: "If you learn everything except Christ, you learn nothing. If you learn nothing except Christ, you learn everything.", author: "St. Bonaventure" },
  { text: "The perfection of a religious man is to do common things in a perfect manner.", author: "St. Bonaventure" },
  { text: "Actions speak louder than words; let your words teach and your actions speak.", author: "St. Anthony of Padua" },
  { text: "The life of the body is the soul; the life of the soul is God.", author: "St. Anthony of Padua" },
  { text: "Attribute to God every good that you have received. If you take credit for something that does not belong to you, you will be guilty of theft.", author: "St. Anthony of Padua" },
  { text: "Pray, hope, and don't worry. Worry is useless. God is merciful and will hear your prayer.", author: "St. Padre Pio" },
  { text: "The life of a Christian is nothing but a perpetual struggle against self.", author: "St. Padre Pio" },
  { text: "Prayer is the best weapon we have; it is the key to God's heart.", author: "St. Padre Pio" },
  { text: "No one in the world can change Truth. What we can do and should do is to seek truth and to serve it when we have found it.", author: "St. Maximilian Kolbe" },
  { text: "The most deadly poison of our time is indifference.", author: "St. Maximilian Kolbe" },
  { text: "God, in His most free act of loving, does not love necessarily anything other than Himself.", author: "Bl. John Duns Scotus", source: "Ordinatio" },
  { text: "How could I bear a crown of gold when the Lord bears a crown of thorns and bears it for me?", author: "St. Elizabeth of Hungary" },
  { text: "O God, I offer Thee my liberty, my memory, my understanding, and my will.", author: "St. Joseph of Cupertino" },
  { text: "Pax et Bonum — Peace and All Good.", author: "Franciscan greeting" },
  { text: "Let us begin again, for up to now we have done nothing.", author: "St. Francis of Assisi" },
  { text: "Lord, grant me the treasure of sublime poverty.", author: "St. Francis of Assisi" },
] as const;

const TOTAL_QUOTES = QUOTES_EN.length; // 37

export interface DailyReflection {
  season: string;
  seasonColor: string;
  seasonTheme: string;
  feast: { name: string; description: string } | null;
  ruleChapter: number;
  ruleTitle: string;
  ruleExcerpt: string;
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

function getExcerpt(text: string, maxLen = 150): string {
  if (text.length <= maxLen) return text;
  // Find sentence boundary near maxLen
  const truncated = text.slice(0, maxLen);
  const lastPeriod = truncated.lastIndexOf(".");
  if (lastPeriod > 80) return truncated.slice(0, lastPeriod + 1);
  return truncated.trimEnd() + "…";
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
  const localizedRule = locale !== "en" && RULE_I18N[locale];
  const ruleIdx = dayOfYear % RULE_CHAPTERS.length;
  const localizedChapter = localizedRule ? localizedRule[ruleIdx] : null;
  const ruleTitle = localizedChapter?.title || enChapter.title;
  const ruleFullText = localizedChapter?.text || enChapter.text;
  const ruleExcerpt = getExcerpt(ruleFullText);

  // Reflection prompt: filter by season theme, offset to avoid collision with nightly examination
  const enQuestions = EXAMINATION_QUESTIONS;
  const localizedExam = locale !== "en" ? EXAMINATION_I18N[locale] : undefined;
  const questions = localizedExam ? localizedExam.questions : enQuestions;
  const enCategories = enQuestions.map((q) => q.category);
  // Map localized categories back to English for filtering
  const filtered = questions.filter((_, i) => enCategories[i] === seasonTheme);
  const seasonCharSum = season.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  const promptIdx = (dayOfYear + seasonCharSum) % (filtered.length || 1);
  const selectedPrompt = filtered[promptIdx] || questions[dayOfYear % questions.length];

  // Category label
  const localizedCategories = localizedExam?.categories;
  const enCatIdx = EXAMINATION_QUESTIONS.findIndex((q) => q.question === selectedPrompt.question || q.category === selectedPrompt.category);
  const reflectionCategory = localizedCategories
    ? (localizedCategories[EXAMINATION_QUESTIONS.findIndex((q) => q.category === (enCatIdx >= 0 ? EXAMINATION_QUESTIONS[enCatIdx].category : selectedPrompt.category))] || selectedPrompt.category)
    : selectedPrompt.category;

  // Quote: offset 17 from homepage daily quote to ensure different selection
  const quoteIdx = (dayOfYear + 17) % TOTAL_QUOTES;
  const localizedQuotes = locale !== "en" && QUOTES_I18N[locale];
  const quote = localizedQuotes ? localizedQuotes[quoteIdx % localizedQuotes.length] : QUOTES_EN[quoteIdx];

  // Localize season theme
  const seasonThemeLocalized = getLocalizedTheme(locale, seasonTheme);

  return {
    season,
    seasonColor,
    seasonTheme: seasonThemeLocalized,
    feast,
    ruleChapter: enChapter.chapter,
    ruleTitle,
    ruleExcerpt,
    ruleFullText,
    reflectionPrompt: selectedPrompt.question,
    reflectionCategory,
    quote: { text: quote.text, author: quote.author, source: "source" in quote ? quote.source : undefined },
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
  },
};

export function getReflectionUI(locale: string): Record<string, string> {
  return REFLECTION_UI[locale] || REFLECTION_UI.en;
}
