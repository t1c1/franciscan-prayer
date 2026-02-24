export interface FranciscanCommunity {
  name: string;
  abbreviation: string;
  type: "male" | "female" | "secular";
  description: string;
  website?: string;
  foundedYear?: number;
}

export const FRANCISCAN_FAMILIES: FranciscanCommunity[] = [
  // First Order — Male Religious
  {
    name: "Order of Friars Minor",
    abbreviation: "O.F.M.",
    type: "male",
    description: "The original Franciscan order founded by St. Francis of Assisi in 1209. Known for poverty, preaching, and mission work worldwide.",
    website: "https://ofm.org",
    foundedYear: 1209,
  },
  {
    name: "Order of Friars Minor Conventual",
    abbreviation: "O.F.M. Conv.",
    type: "male",
    description: "Conventual Franciscans emphasize community life, intellectual formation, and parish ministry alongside Franciscan poverty.",
    website: "https://ofmconv.net",
    foundedYear: 1209,
  },
  {
    name: "Order of Friars Minor Capuchin",
    abbreviation: "O.F.M. Cap.",
    type: "male",
    description: "Capuchins arose in the 16th century seeking a stricter observance of St. Francis's Rule. Known for beards, brown habits with pointed hoods, and popular preaching.",
    website: "https://ofmcap.org",
    foundedYear: 1525,
  },
  {
    name: "Third Order Regular of St. Francis",
    abbreviation: "T.O.R.",
    type: "male",
    description: "Religious men living the Rule of the Third Order under vows. Active in education, parishes, and social ministry.",
    website: "https://torfranciscans.org",
    foundedYear: 1447,
  },
  {
    name: "Franciscan Friars of the Renewal",
    abbreviation: "C.F.R.",
    type: "male",
    description: "Founded in 1987 in the South Bronx. Committed to radical poverty, evangelization, and service to the poor and homeless.",
    website: "https://franciscanfriars.com",
    foundedYear: 1987,
  },
  {
    name: "Franciscan Friars of the Atonement",
    abbreviation: "S.A.",
    type: "male",
    description: "Founded at Graymoor, NY. Devoted to Christian unity, ecumenism, and the Week of Prayer for Christian Unity.",
    website: "https://atonementfriars.org",
    foundedYear: 1898,
  },
  {
    name: "Franciscan Friars of the Immaculate",
    abbreviation: "F.I.",
    type: "male",
    description: "Founded in 1970, combining Franciscan spirituality with Marian devotion, especially to the Immaculate Conception.",
    foundedYear: 1970,
  },
  // Second Order — Poor Clares
  {
    name: "Order of Saint Clare (Poor Clares)",
    abbreviation: "O.S.C.",
    type: "female",
    description: "Contemplative order founded by St. Clare of Assisi in 1212 under the guidance of St. Francis. Devoted to prayer, poverty, and enclosure.",
    website: "https://poorclares.org",
    foundedYear: 1212,
  },
  {
    name: "Poor Clare Colettines",
    abbreviation: "P.C.C.",
    type: "female",
    description: "Reformed branch of the Poor Clares following the strict observance of St. Colette of Corbie (15th century).",
    foundedYear: 1410,
  },
  {
    name: "Capuchin Poor Clares",
    abbreviation: "O.S.C. Cap.",
    type: "female",
    description: "Contemplative branch following the Capuchin reform, combining the Rule of St. Clare with Capuchin austerity.",
    foundedYear: 1538,
  },
  // Third Order — Secular
  {
    name: "Secular Franciscan Order",
    abbreviation: "O.F.S.",
    type: "secular",
    description: "Lay men and women who follow St. Francis in their everyday lives — in families, workplaces, and parishes. Formerly called the Third Order Secular.",
    website: "https://secularfranciscansusa.org",
    foundedYear: 1221,
  },
  {
    name: "Franciscan Youth (YouFra)",
    abbreviation: "YouFra",
    type: "secular",
    description: "Young people ages 14-30 discerning the Franciscan way of life. Connected to the Secular Franciscan Order.",
    foundedYear: 1958,
  },
];

export const ORDER_TYPE_LABELS = {
  male: "First Order & Male Religious",
  female: "Second Order & Female Religious",
  secular: "Third Order & Secular",
} as const;

export const COMMUNITIES_I18N: Record<string, Record<string, { name: string; description: string }>> = {
  es: {
    "O.F.M.": {
      name: "Orden de Frailes Menores",
      description: "La orden franciscana original fundada por San Francisco de Asís en 1209. Conocida por la pobreza, la predicación y la obra misionera en todo el mundo.",
    },
    "O.F.M. Conv.": {
      name: "Orden de Frailes Menores Conventuales",
      description: "Los franciscanos conventuales enfatizan la vida comunitaria, la formación intelectual y el ministerio parroquial junto con la pobreza franciscana.",
    },
    "O.F.M. Cap.": {
      name: "Orden de Frailes Menores Capuchinos",
      description: "Los capuchinos surgieron en el siglo XVI buscando una observancia más estricta de la Regla de San Francisco. Conocidos por sus barbas, hábitos marrones con capuchas puntiagudas y la predicación popular.",
    },
    "T.O.R.": {
      name: "Tercera Orden Regular de San Francisco",
      description: "Religiosos que viven la Regla de la Tercera Orden bajo votos. Activos en educación, parroquias y ministerio social.",
    },
    "C.F.R.": {
      name: "Frailes Franciscanos de la Renovación",
      description: "Fundados en 1987 en el South Bronx. Comprometidos con la pobreza radical, la evangelización y el servicio a los pobres y sin hogar.",
    },
    "S.A.": {
      name: "Frailes Franciscanos de la Expiación",
      description: "Fundados en Graymoor, Nueva York. Dedicados a la unidad cristiana, el ecumenismo y la Semana de Oración por la Unidad de los Cristianos.",
    },
    "F.I.": {
      name: "Frailes Franciscanos de la Inmaculada",
      description: "Fundados en 1970, combinan la espiritualidad franciscana con la devoción mariana, especialmente a la Inmaculada Concepción.",
    },
    "O.S.C.": {
      name: "Orden de Santa Clara (Clarisas)",
      description: "Orden contemplativa fundada por Santa Clara de Asís en 1212 bajo la guía de San Francisco. Dedicadas a la oración, la pobreza y la clausura.",
    },
    "P.C.C.": {
      name: "Clarisas Coletinas",
      description: "Rama reformada de las Clarisas que sigue la estricta observancia de Santa Coleta de Corbie (siglo XV).",
    },
    "O.S.C. Cap.": {
      name: "Clarisas Capuchinas",
      description: "Rama contemplativa que sigue la reforma capuchina, combinando la Regla de Santa Clara con la austeridad capuchina.",
    },
    "O.F.S.": {
      name: "Orden Franciscana Seglar",
      description: "Hombres y mujeres laicos que siguen a San Francisco en su vida cotidiana — en familias, lugares de trabajo y parroquias. Anteriormente llamada Tercera Orden Seglar.",
    },
    "YouFra": {
      name: "Juventud Franciscana (JuFra)",
      description: "Jóvenes de 14 a 30 años que disciernen el camino de vida franciscano. Vinculados a la Orden Franciscana Seglar.",
    },
  },
  it: {
    "O.F.M.": {
      name: "Ordine dei Frati Minori",
      description: "L'ordine francescano originale fondato da San Francesco d'Assisi nel 1209. Conosciuto per la povertà, la predicazione e l'opera missionaria in tutto il mondo.",
    },
    "O.F.M. Conv.": {
      name: "Ordine dei Frati Minori Conventuali",
      description: "I francescani conventuali enfatizzano la vita comunitaria, la formazione intellettuale e il ministero parrocchiale insieme alla povertà francescana.",
    },
    "O.F.M. Cap.": {
      name: "Ordine dei Frati Minori Cappuccini",
      description: "I cappuccini sorsero nel XVI secolo cercando un'osservanza più stretta della Regola di San Francesco. Conosciuti per le barbe, gli abiti marroni con cappucci a punta e la predicazione popolare.",
    },
    "T.O.R.": {
      name: "Terz'Ordine Regolare di San Francesco",
      description: "Religiosi che vivono la Regola del Terz'Ordine sotto voti. Attivi nell'educazione, nelle parrocchie e nel ministero sociale.",
    },
    "C.F.R.": {
      name: "Frati Francescani del Rinnovamento",
      description: "Fondati nel 1987 nel South Bronx. Impegnati nella povertà radicale, nell'evangelizzazione e nel servizio ai poveri e ai senzatetto.",
    },
    "S.A.": {
      name: "Frati Francescani dell'Atonement",
      description: "Fondati a Graymoor, New York. Dedicati all'unità cristiana, all'ecumenismo e alla Settimana di Preghiera per l'Unità dei Cristiani.",
    },
    "F.I.": {
      name: "Frati Francescani dell'Immacolata",
      description: "Fondati nel 1970, combinano la spiritualità francescana con la devozione mariana, specialmente all'Immacolata Concezione.",
    },
    "O.S.C.": {
      name: "Ordine di Santa Chiara (Clarisse)",
      description: "Ordine contemplativo fondato da Santa Chiara d'Assisi nel 1212 sotto la guida di San Francesco. Dedicate alla preghiera, alla povertà e alla clausura.",
    },
    "P.C.C.": {
      name: "Clarisse Colettine",
      description: "Ramo riformato delle Clarisse che segue la stretta osservanza di Santa Coletta di Corbie (XV secolo).",
    },
    "O.S.C. Cap.": {
      name: "Clarisse Cappuccine",
      description: "Ramo contemplativo che segue la riforma cappuccina, combinando la Regola di Santa Chiara con l'austerità cappuccina.",
    },
    "O.F.S.": {
      name: "Ordine Francescano Secolare",
      description: "Uomini e donne laici che seguono San Francesco nella vita quotidiana — in famiglia, sul lavoro e in parrocchia. Precedentemente chiamato Terz'Ordine Secolare.",
    },
    "YouFra": {
      name: "Gioventù Francescana (GiFra)",
      description: "Giovani dai 14 ai 30 anni in discernimento della via di vita francescana. Collegati all'Ordine Francescano Secolare.",
    },
  },
  fr: {
    "O.F.M.": {
      name: "Ordre des Frères Mineurs",
      description: "L'ordre franciscain originel fondé par saint François d'Assise en 1209. Connu pour la pauvreté, la prédication et l'œuvre missionnaire dans le monde entier.",
    },
    "O.F.M. Conv.": {
      name: "Ordre des Frères Mineurs Conventuels",
      description: "Les franciscains conventuels mettent l'accent sur la vie communautaire, la formation intellectuelle et le ministère paroissial aux côtés de la pauvreté franciscaine.",
    },
    "O.F.M. Cap.": {
      name: "Ordre des Frères Mineurs Capucins",
      description: "Les capucins sont apparus au XVIe siècle en cherchant une observance plus stricte de la Règle de saint François. Connus pour leurs barbes, leurs habits bruns à capuchons pointus et la prédication populaire.",
    },
    "T.O.R.": {
      name: "Tiers-Ordre Régulier de Saint-François",
      description: "Religieux vivant la Règle du Tiers-Ordre sous des vœux. Actifs dans l'éducation, les paroisses et le ministère social.",
    },
    "C.F.R.": {
      name: "Frères Franciscains du Renouveau",
      description: "Fondés en 1987 dans le South Bronx. Engagés dans la pauvreté radicale, l'évangélisation et le service aux pauvres et aux sans-abri.",
    },
    "S.A.": {
      name: "Frères Franciscains de l'Atonement",
      description: "Fondés à Graymoor, New York. Dévoués à l'unité chrétienne, à l'œcuménisme et à la Semaine de Prière pour l'Unité des Chrétiens.",
    },
    "F.I.": {
      name: "Frères Franciscains de l'Immaculée",
      description: "Fondés en 1970, ils allient la spiritualité franciscaine à la dévotion mariale, en particulier à l'Immaculée Conception.",
    },
    "O.S.C.": {
      name: "Ordre de Sainte-Claire (Clarisses)",
      description: "Ordre contemplatif fondé par sainte Claire d'Assise en 1212 sous la direction de saint François. Consacrées à la prière, à la pauvreté et à la clôture.",
    },
    "P.C.C.": {
      name: "Clarisses Colettines",
      description: "Branche réformée des Clarisses suivant l'observance stricte de sainte Colette de Corbie (XVe siècle).",
    },
    "O.S.C. Cap.": {
      name: "Clarisses Capucines",
      description: "Branche contemplative suivant la réforme capucine, combinant la Règle de sainte Claire avec l'austérité capucine.",
    },
    "O.F.S.": {
      name: "Ordre Franciscain Séculier",
      description: "Hommes et femmes laïcs qui suivent saint François dans leur vie quotidienne — en famille, au travail et en paroisse. Anciennement appelé Tiers-Ordre Séculier.",
    },
    "YouFra": {
      name: "Jeunesse Franciscaine (JeFra)",
      description: "Jeunes de 14 à 30 ans en discernement de la voie de vie franciscaine. Rattachés à l'Ordre Franciscain Séculier.",
    },
  },
  zh: {
    "O.F.M.": {
      name: "小兄弟会",
      description: "由亚西西的圣方济各于1209年创立的方济各原始修会。以贫穷、宣讲和全球传教事业而闻名。",
    },
    "O.F.M. Conv.": {
      name: "方济各住院会",
      description: "方济各住院会士强调团体生活、知识培育和堂区牧职，同时坚持方济各的贫穷精神。",
    },
    "O.F.M. Cap.": {
      name: "嘉布遣方济各会",
      description: "嘉布遣会士兴起于十六世纪，寻求更严格地遵守圣方济各的会规。以蓄须、棕色会衣配尖头风帽以及通俗宣讲而闻名。",
    },
    "T.O.R.": {
      name: "方济各第三会正规支派",
      description: "以发愿方式生活第三会会规的男修会会士。活跃于教育、堂区和社会服务。",
    },
    "C.F.R.": {
      name: "方济各革新兄弟会",
      description: "1987年在南布朗克斯区创立。致力于彻底的贫穷、福传以及服务穷人和无家可归者。",
    },
    "S.A.": {
      name: "方济各赎罪修士会",
      description: "创立于纽约州灰山。致力于基督徒合一、普世教会运动以及基督徒合一祈祷周。",
    },
    "F.I.": {
      name: "方济各无玷圣母修士会",
      description: "1970年创立，将方济各灵修与圣母敬礼相结合，尤其敬礼无染原罪圣母。",
    },
    "O.S.C.": {
      name: "圣佳兰修女会（贫穷佳兰会）",
      description: "1212年由亚西西的圣佳兰在圣方济各指导下创立的隐修会。专注于祈祷、贫穷和隐修。",
    },
    "P.C.C.": {
      name: "高莱德贫穷佳兰会",
      description: "贫穷佳兰会的改革支派，遵循科尔比的圣高莱德（十五世纪）的严格会规。",
    },
    "O.S.C. Cap.": {
      name: "嘉布遣贫穷佳兰会",
      description: "遵循嘉布遣改革的隐修支派，将圣佳兰会规与嘉布遣的刻苦精神相结合。",
    },
    "O.F.S.": {
      name: "方济各在俗修会",
      description: "在日常生活中追随圣方济各的平信徒男女——在家庭、工作和堂区中实践方济各精神。前称第三会在俗支派。",
    },
    "YouFra": {
      name: "方济各青年（青方）",
      description: "14至30岁的青年，辨别方济各的生活道路。隶属于方济各在俗修会。",
    },
  },
};
