// Franciscan Examination of Conscience for Compline
// Based on Franciscan spirituality: poverty, humility, fraternity, creation, peace

export interface ExaminationQuestion {
  category: string;
  question: string;
}

export const EXAMINATION_CATEGORIES = [
  "Poverty & Simplicity",
  "Humility & Obedience",
  "Fraternity & Charity",
  "Care for Creation",
  "Peace & Reconciliation",
  "Prayer & Faithfulness",
];

export const EXAMINATION_QUESTIONS: ExaminationQuestion[] = [
  // Poverty & Simplicity
  { category: "Poverty & Simplicity", question: "Did I cling to material possessions today, or did I hold them lightly as gifts from God?" },
  { category: "Poverty & Simplicity", question: "Was I generous with what I have, sharing with those in need?" },
  { category: "Poverty & Simplicity", question: "Did I allow desires for wealth or comfort to distract me from following Christ?" },
  { category: "Poverty & Simplicity", question: "Did I live simply today, or did I seek more than what I need?" },

  // Humility & Obedience
  { category: "Humility & Obedience", question: "Did I seek my own glory today, or did I give credit to God and others?" },
  { category: "Humility & Obedience", question: "Was I willing to serve others, even in humble or hidden ways?" },
  { category: "Humility & Obedience", question: "Did I accept correction or criticism with grace?" },
  { category: "Humility & Obedience", question: "Did I try to control or dominate others rather than serve them?" },

  // Fraternity & Charity
  { category: "Fraternity & Charity", question: "Did I treat every person I met today as a brother or sister in Christ?" },
  { category: "Fraternity & Charity", question: "Did I speak ill of anyone, gossip, or judge others?" },
  { category: "Fraternity & Charity", question: "Was I patient and kind with those who are difficult to love?" },
  { category: "Fraternity & Charity", question: "Did I reach out to someone who was lonely, sick, or suffering?" },

  // Care for Creation
  { category: "Care for Creation", question: "Did I show reverence for God's creation today — Brother Sun, Sister Moon, Mother Earth?" },
  { category: "Care for Creation", question: "Did I waste food, water, or resources that others lack?" },
  { category: "Care for Creation", question: "Did I take time to praise God for the beauty of the world around me?" },

  // Peace & Reconciliation
  { category: "Peace & Reconciliation", question: "Did I sow peace or division in my words and actions today?" },
  { category: "Peace & Reconciliation", question: "Is there anyone I need to forgive or ask forgiveness from?" },
  { category: "Peace & Reconciliation", question: "Did I respond to anger or frustration with gentleness?" },
  { category: "Peace & Reconciliation", question: "Did I carry resentment or bitterness in my heart today?" },

  // Prayer & Faithfulness
  { category: "Prayer & Faithfulness", question: "Did I make time for prayer and silence today, or was I consumed by busyness?" },
  { category: "Prayer & Faithfulness", question: "Did I listen for God's voice in the events of this day?" },
  { category: "Prayer & Faithfulness", question: "Did I offer my work, joys, and sufferings to God?" },
  { category: "Prayer & Faithfulness", question: "Did I trust in God's providence, or did I give in to worry and anxiety?" },
];

export const EXAMINATION_I18N: Record<string, { categories: string[]; questions: { category: string; question: string }[] }> = {
  es: {
    categories: [
      "Pobreza y Sencillez",
      "Humildad y Obediencia",
      "Fraternidad y Caridad",
      "Cuidado de la Creación",
      "Paz y Reconciliación",
      "Oración y Fidelidad",
    ],
    questions: [
      // Pobreza y Sencillez
      { category: "Pobreza y Sencillez", question: "¿Me aferré a las posesiones materiales hoy, o las sostuve con ligereza como dones de Dios?" },
      { category: "Pobreza y Sencillez", question: "¿Fui generoso con lo que tengo, compartiendo con los necesitados?" },
      { category: "Pobreza y Sencillez", question: "¿Permití que los deseos de riqueza o comodidad me distrajeran de seguir a Cristo?" },
      { category: "Pobreza y Sencillez", question: "¿Viví con sencillez hoy, o busqué más de lo que necesito?" },
      // Humildad y Obediencia
      { category: "Humildad y Obediencia", question: "¿Busqué mi propia gloria hoy, o di el mérito a Dios y a los demás?" },
      { category: "Humildad y Obediencia", question: "¿Estuve dispuesto a servir a otros, incluso de maneras humildes u ocultas?" },
      { category: "Humildad y Obediencia", question: "¿Acepté la corrección o la crítica con gracia?" },
      { category: "Humildad y Obediencia", question: "¿Intenté controlar o dominar a otros en lugar de servirles?" },
      // Fraternidad y Caridad
      { category: "Fraternidad y Caridad", question: "¿Traté a cada persona que encontré hoy como un hermano o hermana en Cristo?" },
      { category: "Fraternidad y Caridad", question: "¿Hablé mal de alguien, murmuré o juzgué a otros?" },
      { category: "Fraternidad y Caridad", question: "¿Fui paciente y amable con aquellos que son difíciles de amar?" },
      { category: "Fraternidad y Caridad", question: "¿Me acerqué a alguien que estaba solo, enfermo o sufriendo?" },
      // Cuidado de la Creación
      { category: "Cuidado de la Creación", question: "¿Mostré reverencia por la creación de Dios hoy — el Hermano Sol, la Hermana Luna, la Madre Tierra?" },
      { category: "Cuidado de la Creación", question: "¿Desperdicié alimentos, agua o recursos que otros carecen?" },
      { category: "Cuidado de la Creación", question: "¿Me tomé tiempo para alabar a Dios por la belleza del mundo que me rodea?" },
      // Paz y Reconciliación
      { category: "Paz y Reconciliación", question: "¿Sembré paz o división con mis palabras y acciones hoy?" },
      { category: "Paz y Reconciliación", question: "¿Hay alguien a quien necesito perdonar o a quien pedir perdón?" },
      { category: "Paz y Reconciliación", question: "¿Respondí a la ira o la frustración con mansedumbre?" },
      { category: "Paz y Reconciliación", question: "¿Cargué resentimiento o amargura en mi corazón hoy?" },
      // Oración y Fidelidad
      { category: "Oración y Fidelidad", question: "¿Dediqué tiempo a la oración y al silencio hoy, o fui consumido por las ocupaciones?" },
      { category: "Oración y Fidelidad", question: "¿Escuché la voz de Dios en los acontecimientos de este día?" },
      { category: "Oración y Fidelidad", question: "¿Ofrecí mi trabajo, alegrías y sufrimientos a Dios?" },
      { category: "Oración y Fidelidad", question: "¿Confié en la providencia de Dios, o me dejé llevar por la preocupación y la ansiedad?" },
    ],
  },
  it: {
    categories: [
      "Povertà e Semplicità",
      "Umiltà e Obbedienza",
      "Fraternità e Carità",
      "Cura del Creato",
      "Pace e Riconciliazione",
      "Preghiera e Fedeltà",
    ],
    questions: [
      // Povertà e Semplicità
      { category: "Povertà e Semplicità", question: "Mi sono aggrappato ai beni materiali oggi, o li ho tenuti con leggerezza come doni di Dio?" },
      { category: "Povertà e Semplicità", question: "Sono stato generoso con quello che ho, condividendo con chi è nel bisogno?" },
      { category: "Povertà e Semplicità", question: "Ho permesso che i desideri di ricchezza o comodità mi distraessero dal seguire Cristo?" },
      { category: "Povertà e Semplicità", question: "Ho vissuto con semplicità oggi, o ho cercato più di ciò di cui ho bisogno?" },
      // Umiltà e Obbedienza
      { category: "Umiltà e Obbedienza", question: "Ho cercato la mia gloria oggi, o ho dato il merito a Dio e agli altri?" },
      { category: "Umiltà e Obbedienza", question: "Sono stato disposto a servire gli altri, anche in modi umili o nascosti?" },
      { category: "Umiltà e Obbedienza", question: "Ho accettato la correzione o la critica con grazia?" },
      { category: "Umiltà e Obbedienza", question: "Ho cercato di controllare o dominare gli altri piuttosto che servirli?" },
      // Fraternità e Carità
      { category: "Fraternità e Carità", question: "Ho trattato ogni persona che ho incontrato oggi come un fratello o una sorella in Cristo?" },
      { category: "Fraternità e Carità", question: "Ho parlato male di qualcuno, spettegolato o giudicato gli altri?" },
      { category: "Fraternità e Carità", question: "Sono stato paziente e gentile con coloro che sono difficili da amare?" },
      { category: "Fraternità e Carità", question: "Mi sono avvicinato a qualcuno che era solo, malato o sofferente?" },
      // Cura del Creato
      { category: "Cura del Creato", question: "Ho mostrato riverenza per la creazione di Dio oggi — Fratello Sole, Sorella Luna, Madre Terra?" },
      { category: "Cura del Creato", question: "Ho sprecato cibo, acqua o risorse che altri non hanno?" },
      { category: "Cura del Creato", question: "Mi sono preso il tempo per lodare Dio per la bellezza del mondo intorno a me?" },
      // Pace e Riconciliazione
      { category: "Pace e Riconciliazione", question: "Ho seminato pace o divisione con le mie parole e azioni oggi?" },
      { category: "Pace e Riconciliazione", question: "C'è qualcuno che devo perdonare o a cui chiedere perdono?" },
      { category: "Pace e Riconciliazione", question: "Ho risposto alla rabbia o alla frustrazione con mitezza?" },
      { category: "Pace e Riconciliazione", question: "Ho portato rancore o amarezza nel mio cuore oggi?" },
      // Preghiera e Fedeltà
      { category: "Preghiera e Fedeltà", question: "Ho dedicato tempo alla preghiera e al silenzio oggi, o sono stato consumato dagli impegni?" },
      { category: "Preghiera e Fedeltà", question: "Ho ascoltato la voce di Dio negli eventi di questa giornata?" },
      { category: "Preghiera e Fedeltà", question: "Ho offerto il mio lavoro, le gioie e le sofferenze a Dio?" },
      { category: "Preghiera e Fedeltà", question: "Ho confidato nella provvidenza di Dio, o mi sono lasciato prendere dalla preoccupazione e dall'ansia?" },
    ],
  },
  fr: {
    categories: [
      "Pauvreté et Simplicité",
      "Humilité et Obéissance",
      "Fraternité et Charité",
      "Soin de la Création",
      "Paix et Réconciliation",
      "Prière et Fidélité",
    ],
    questions: [
      // Pauvreté et Simplicité
      { category: "Pauvreté et Simplicité", question: "Me suis-je accroché aux biens matériels aujourd'hui, ou les ai-je tenus avec légèreté comme des dons de Dieu ?" },
      { category: "Pauvreté et Simplicité", question: "Ai-je été généreux avec ce que j'ai, partageant avec ceux qui sont dans le besoin ?" },
      { category: "Pauvreté et Simplicité", question: "Ai-je laissé les désirs de richesse ou de confort me détourner de suivre le Christ ?" },
      { category: "Pauvreté et Simplicité", question: "Ai-je vécu simplement aujourd'hui, ou ai-je cherché plus que ce dont j'ai besoin ?" },
      // Humilité et Obéissance
      { category: "Humilité et Obéissance", question: "Ai-je cherché ma propre gloire aujourd'hui, ou ai-je rendu mérite à Dieu et aux autres ?" },
      { category: "Humilité et Obéissance", question: "Étais-je disposé à servir les autres, même de manières humbles ou cachées ?" },
      { category: "Humilité et Obéissance", question: "Ai-je accepté la correction ou la critique avec grâce ?" },
      { category: "Humilité et Obéissance", question: "Ai-je essayé de contrôler ou de dominer les autres plutôt que de les servir ?" },
      // Fraternité et Charité
      { category: "Fraternité et Charité", question: "Ai-je traité chaque personne rencontrée aujourd'hui comme un frère ou une sœur dans le Christ ?" },
      { category: "Fraternité et Charité", question: "Ai-je dit du mal de quelqu'un, fait des commérages ou jugé les autres ?" },
      { category: "Fraternité et Charité", question: "Ai-je été patient et bienveillant avec ceux qui sont difficiles à aimer ?" },
      { category: "Fraternité et Charité", question: "Ai-je tendu la main à quelqu'un qui était seul, malade ou souffrant ?" },
      // Soin de la Création
      { category: "Soin de la Création", question: "Ai-je montré de la révérence pour la création de Dieu aujourd'hui — Frère Soleil, Sœur Lune, Mère Terre ?" },
      { category: "Soin de la Création", question: "Ai-je gaspillé de la nourriture, de l'eau ou des ressources que d'autres n'ont pas ?" },
      { category: "Soin de la Création", question: "Ai-je pris le temps de louer Dieu pour la beauté du monde qui m'entoure ?" },
      // Paix et Réconciliation
      { category: "Paix et Réconciliation", question: "Ai-je semé la paix ou la division dans mes paroles et mes actions aujourd'hui ?" },
      { category: "Paix et Réconciliation", question: "Y a-t-il quelqu'un à qui je dois pardonner ou demander pardon ?" },
      { category: "Paix et Réconciliation", question: "Ai-je répondu à la colère ou à la frustration avec douceur ?" },
      { category: "Paix et Réconciliation", question: "Ai-je porté de la rancœur ou de l'amertume dans mon cœur aujourd'hui ?" },
      // Prière et Fidélité
      { category: "Prière et Fidélité", question: "Ai-je consacré du temps à la prière et au silence aujourd'hui, ou ai-je été absorbé par les occupations ?" },
      { category: "Prière et Fidélité", question: "Ai-je écouté la voix de Dieu dans les événements de cette journée ?" },
      { category: "Prière et Fidélité", question: "Ai-je offert mon travail, mes joies et mes souffrances à Dieu ?" },
      { category: "Prière et Fidélité", question: "Ai-je fait confiance à la providence de Dieu, ou me suis-je laissé aller à l'inquiétude et à l'anxiété ?" },
    ],
  },
  zh: {
    categories: [
      "贫穷与简朴",
      "谦逊与服从",
      "手足之情与仁爱",
      "爱护受造界",
      "和平与修和",
      "祈祷与忠信",
    ],
    questions: [
      // 贫穷与简朴
      { category: "贫穷与简朴", question: "今天我是否执着于物质财产，还是将它们视为天主的恩赐而轻轻持有？" },
      { category: "贫穷与简朴", question: "我是否慷慨地分享我所拥有的，帮助有需要的人？" },
      { category: "贫穷与简朴", question: "我是否让对财富或舒适的渴望使我偏离了追随基督的道路？" },
      { category: "贫穷与简朴", question: "今天我是否过着简朴的生活，还是寻求超过我所需要的？" },
      // 谦逊与服从
      { category: "谦逊与服从", question: "今天我是否追求自己的荣耀，还是将功劳归于天主和他人？" },
      { category: "谦逊与服从", question: "我是否愿意服务他人，即使是以谦卑或隐秘的方式？" },
      { category: "谦逊与服从", question: "我是否以恩宠之心接受了纠正或批评？" },
      { category: "谦逊与服从", question: "我是否试图控制或支配他人，而非服务他们？" },
      // 手足之情与仁爱
      { category: "手足之情与仁爱", question: "今天我是否将遇到的每一个人都视为在基督内的兄弟姐妹？" },
      { category: "手足之情与仁爱", question: "我是否说了别人的坏话、散布流言或论断他人？" },
      { category: "手足之情与仁爱", question: "我是否对那些难以去爱的人保持了耐心和善良？" },
      { category: "手足之情与仁爱", question: "我是否关怀了孤独的、生病的或正在受苦的人？" },
      // 爱护受造界
      { category: "爱护受造界", question: "今天我是否对天主的受造物表达了敬意——太阳弟兄、月亮姐妹、大地母亲？" },
      { category: "爱护受造界", question: "我是否浪费了他人所缺乏的食物、水或资源？" },
      { category: "爱护受造界", question: "我是否花时间为周围世界的美好而赞美天主？" },
      // 和平与修和
      { category: "和平与修和", question: "今天我的言行是播种了和平还是分裂？" },
      { category: "和平与修和", question: "是否有人需要我去宽恕，或我需要向谁请求宽恕？" },
      { category: "和平与修和", question: "面对愤怒或挫折时，我是否以温良回应？" },
      { category: "和平与修和", question: "今天我心中是否怀有怨恨或苦毒？" },
      // 祈祷与忠信
      { category: "祈祷与忠信", question: "今天我是否腾出时间祈祷和静默，还是被繁忙所吞没？" },
      { category: "祈祷与忠信", question: "在今天的事件中，我是否聆听了天主的声音？" },
      { category: "祈祷与忠信", question: "我是否将我的工作、喜乐和痛苦奉献给了天主？" },
      { category: "祈祷与忠信", question: "我是否信赖了天主的眷顾，还是陷入了忧虑和焦躁？" },
    ],
  },
};

const EXAMINATION_AUDIO_LOCALES = ["en", "es", "it", "fr", "zh"] as const;
const EXAMINATION_AUDIO_INDEX: Record<string, Record<string, number>> = {
  en: Object.fromEntries(
    EXAMINATION_QUESTIONS.map((q, index) => [q.question, index + 1])
  ),
  es: Object.fromEntries(
    (EXAMINATION_I18N.es?.questions || []).map((q, index) => [q.question, index + 1])
  ),
  it: Object.fromEntries(
    (EXAMINATION_I18N.it?.questions || []).map((q, index) => [q.question, index + 1])
  ),
  fr: Object.fromEntries(
    (EXAMINATION_I18N.fr?.questions || []).map((q, index) => [q.question, index + 1])
  ),
  zh: Object.fromEntries(
    (EXAMINATION_I18N.zh?.questions || []).map((q, index) => [q.question, index + 1])
  ),
};

export function getExaminationQuestionAudioSrc(locale: string, question: string): string | null {
  const normalizedLocale = EXAMINATION_AUDIO_LOCALES.includes(locale as typeof EXAMINATION_AUDIO_LOCALES[number])
    ? locale
    : "en";
  const index = EXAMINATION_AUDIO_INDEX[normalizedLocale]?.[question];
  if (!index) return null;
  return `/audio/exam/${normalizedLocale}/question-${index}.mp3`;
}

/** Get tonight's examination questions — 5 questions rotating by day */
export function getTonightExamination(): ExaminationQuestion[] {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const questions: ExaminationQuestion[] = [];
  // Pick one from each category, rotating through
  for (let i = 0; i < EXAMINATION_CATEGORIES.length; i++) {
    const catQuestions = EXAMINATION_QUESTIONS.filter(
      (q) => q.category === EXAMINATION_CATEGORIES[i]
    );
    const idx = (dayOfYear + i) % catQuestions.length;
    questions.push(catQuestions[idx]);
  }
  return questions;
}
