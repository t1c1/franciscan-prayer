import type { Locale } from "./i18n";

interface AboutStrings {
  intro1: string;
  intro2: string;
  paterTitle: string;
  paterDesc: string;
  howTitle: string;
  howFullDay: string;
  howFullDayDesc: string;
  howBusy: string;
  howBusyDesc: string;
  howMissed: string;
  howMissedDesc: string;
  crownTitle: string;
  crownDesc: string;
  stationsTitle: string;
  stationsDesc: string;
  sourcesTitle: string;
  paxFooter: string;
  builtWith: string;
}

export const ABOUT_I18N: Record<Exclude<Locale, "en">, AboutStrings> = {
  es: {
    intro1:
      "Oración Franciscana te ayuda a rezar como franciscano cada día, ya seas fraile, hermana, franciscano seglar o cualquier persona atraída por la espiritualidad de San Francisco de Asís.",
    intro2:
      "Esta aplicación ofrece dos formas de rezar la Liturgia de las Horas: el Recuento Original del Padrenuestro (76 Padrenuestros por día) para quienes no pueden recitar el Oficio completo, y enlaces a la Liturgia de las Horas completa en DivineOffice.org.",
    paterTitle: "El Recuento Original del Padrenuestro",
    paterDesc:
      "El Capítulo III de la Regla de San Francisco (1223) prescribe que los hermanos laicos que no saben leer el Salterio deben rezar Padrenuestros en cada hora canónica. La distribución exacta es:",
    howTitle: "Cómo Usar Esta Aplicación",
    howFullDay: "Día Completo (recomendado)",
    howFullDayDesc:
      "Reza cada Hora a su tiempo canónico a lo largo del día. La aplicación sugiere la siguiente Hora según la hora del día y la destaca en la pantalla principal.",
    howBusy: "Modo Padre Ocupado",
    howBusyDesc:
      "Concéntrate en Laudes (mañana), Vísperas (tarde) y Completas (noche). Estas tres son las Horas más importantes y solo toman unos minutos cada una.",
    howMissed: "Si Te Pierdes una Hora",
    howMissedDesc:
      'Simplemente continúa con la siguiente. "Si te perdiste Tercia, continúa con Sexta." No hay culpa en la oración franciscana — solo gracia y gozo al volver.',
    crownTitle: "La Corona Franciscana",
    crownDesc:
      "También llamada Rosario Seráfico, la Corona consiste en 7 decenas (no 5) en honor a los Siete Gozos de la Santísima Virgen María. Fue revelada a un joven novicio franciscano en 1422. El total es 72 Avemarías — una por cada año de vida terrenal de Nuestra Señora según la tradición.",
    stationsTitle: "El Viacrucis",
    stationsDesc:
      "Las Estaciones son un regalo franciscano a la Iglesia. Como custodios de Tierra Santa desde 1217, los franciscanos crearon esta devoción para que quienes no pudieran peregrinar a Jerusalén pudieran caminar espiritualmente la Vía Dolorosa. Las 14 estaciones fueron establecidas formalmente por el Papa Clemente XII en 1731 y confiadas a la Orden Franciscana.",
    sourcesTitle: "Fuentes y Créditos",
    paxFooter: "Pax et Bonum",
    builtWith: "Hecho con amor para la mayor gloria de Dios",
  },
  it: {
    intro1:
      "Preghiera Francescana ti aiuta a pregare come un francescano ogni giorno, che tu sia un frate, una suora, un francescano secolare o chiunque attratto dalla spiritualità di San Francesco d'Assisi.",
    intro2:
      "Questa app offre due modi per pregare la Liturgia delle Ore: il Conteggio Originale dei Pater (76 Pater Noster al giorno) per chi non può recitare l'Ufficio completo, e collegamenti alla Liturgia delle Ore completa su DivineOffice.org.",
    paterTitle: "Il Conteggio Originale dei Pater",
    paterDesc:
      "Il Capitolo III della Regola di San Francesco (1223) prescrive che i fratelli laici che non sanno leggere il Salterio preghino Pater Noster a ogni ora canonica. La distribuzione esatta è:",
    howTitle: "Come Usare Questa App",
    howFullDay: "Giornata Completa (consigliato)",
    howFullDayDesc:
      "Prega ogni Ora al suo tempo canonico durante la giornata. L'app suggerisce l'Ora successiva in base all'orario e la evidenzia nella schermata principale.",
    howBusy: "Modalità Genitore Impegnato",
    howBusyDesc:
      "Concentrati su Lodi (mattina), Vespri (sera) e Compieta (prima di dormire). Queste tre sono le Ore più importanti e richiedono solo pochi minuti ciascuna.",
    howMissed: "Se Perdi un'Ora",
    howMissedDesc:
      "Continua semplicemente con la successiva. \"Se hai perso Terza, continua con Sesta.\" Non c'è senso di colpa nella preghiera francescana — solo grazia e gioia nel ritornare.",
    crownTitle: "La Corona Francescana",
    crownDesc:
      "Chiamata anche Rosario Serafico, la Corona consiste in 7 decine (non 5) in onore dei Sette Gaudi della Beata Vergine Maria. Fu rivelata a un giovane novizio francescano nel 1422. Il totale è 72 Ave Maria — una per ogni anno di vita terrena di Nostra Signora secondo la tradizione.",
    stationsTitle: "La Via Crucis",
    stationsDesc:
      "Le Stazioni sono un dono francescano alla Chiesa. Come custodi della Terra Santa dal 1217, i francescani crearono questa devozione affinché chi non poteva pellegrinare a Gerusalemme potesse camminare spiritualmente la Via Dolorosa. Le 14 stazioni furono formalmente stabilite da Papa Clemente XII nel 1731 e affidate all'Ordine Francescano.",
    sourcesTitle: "Fonti e Crediti",
    paxFooter: "Pax et Bonum",
    builtWith: "Realizzata con amore per la maggior gloria di Dio",
  },
  fr: {
    intro1:
      "Prière Franciscaine vous aide à prier en franciscain chaque jour, que vous soyez frère, sœur, franciscain séculier ou toute personne attirée par la spiritualité de saint François d'Assise.",
    intro2:
      "Cette application propose deux façons de prier la Liturgie des Heures : le Décompte Original du Pater (76 Notre Père par jour) pour ceux qui ne peuvent réciter l'Office complet, et des liens vers la Liturgie des Heures complète sur DivineOffice.org.",
    paterTitle: "Le Décompte Original du Pater",
    paterDesc:
      "Le Chapitre III de la Règle de saint François (1223) prescrit que les frères laïcs qui ne savent pas lire le Psautier doivent prier des Notre Père à chaque heure canonique. La répartition exacte est :",
    howTitle: "Comment Utiliser Cette Application",
    howFullDay: "Journée Complète (recommandé)",
    howFullDayDesc:
      "Priez chaque Heure à son temps canonique tout au long de la journée. L'application suggère l'Heure suivante selon l'heure du jour et la met en évidence sur l'écran d'accueil.",
    howBusy: "Mode Parent Occupé",
    howBusyDesc:
      "Concentrez-vous sur Laudes (matin), Vêpres (soir) et Complies (coucher). Ces trois Heures sont les plus importantes et ne prennent que quelques minutes chacune.",
    howMissed: "Si Vous Manquez une Heure",
    howMissedDesc:
      "Continuez simplement avec la suivante. \u00ab Si vous avez manqué Tierce, continuez avec Sexte. \u00bb Il n'y a pas de culpabilité dans la prière franciscaine \u2014 seulement la grâce et la joie du retour.",
    crownTitle: "La Couronne Franciscaine",
    crownDesc:
      "Aussi appelée Rosaire Séraphique, la Couronne se compose de 7 dizaines (et non 5) en l'honneur des Sept Joies de la Bienheureuse Vierge Marie. Elle fut révélée à un jeune novice franciscain en 1422. Le total est de 72 Je vous salue Marie \u2014 un pour chaque année de la vie terrestre de Notre Dame selon la tradition.",
    stationsTitle: "Le Chemin de Croix",
    stationsDesc:
      "Les Stations sont un don franciscain à l'Église. En tant que gardiens de la Terre Sainte depuis 1217, les franciscains ont créé cette dévotion pour que ceux qui ne pouvaient pas se rendre en pèlerinage à Jérusalem puissent parcourir spirituellement la Via Dolorosa. Les 14 stations furent officiellement établies par le pape Clément XII en 1731 et confiées à l'Ordre Franciscain.",
    sourcesTitle: "Sources et Crédits",
    paxFooter: "Pax et Bonum",
    builtWith: "Conçue avec amour pour la plus grande gloire de Dieu",
  },
  zh: {
    intro1:
      "方济各祈祷帮助你每天以方济各的方式祈祷，无论你是修士、修女、在俗方济各会员，还是任何被亚西西圣方济各灵修所吸引的人。",
    intro2:
      "本应用提供两种日课祈祷方式：原始天主经计数（每天76遍天主经），适用于无法诵念完整日课的人；以及DivineOffice.org上完整日课经的链接。",
    paterTitle: "原始天主经计数",
    paterDesc:
      "圣方济各会规（1223年）第三章规定，不识字的平信徒兄弟应在每个时辰祈祷天主经。具体分配如下：",
    howTitle: "如何使用本应用",
    howFullDay: "全天模式（推荐）",
    howFullDayDesc:
      "在一天中按照时辰祈祷每个时辰经。应用会根据当前时间建议下一个时辰，并在主屏幕上突出显示。",
    howBusy: "忙碌父母模式",
    howBusyDesc:
      "专注于晨祷（早晨）、晚祷（傍晚）和夜祷（睡前）。这三个是最重要的时辰，每个只需几分钟。",
    howMissed: "如果错过了一个时辰",
    howMissedDesc:
      "只需继续下一个。\u201C如果错过了午前经，就继续午时经。\u201D方济各祈祷中没有罪咎感\u2014\u2014只有回归时的恩典与喜乐。",
    crownTitle: "方济各玫瑰经冠",
    crownDesc:
      "又称炽天使玫瑰经，冠冕由7端（而非5端）组成，纪念圣母玛利亚的七乐。1422年由一位年轻的方济各初学修士获得启示。共72遍圣母经——按传统对应圣母在世年数。",
    stationsTitle: "苦路十四处",
    stationsDesc:
      "苦路是方济各会给教会的礼物。自1217年起担任圣地守护者的方济各会士创造了这一敬礼，使无法前往耶路撒冷朝圣的人能在灵性上行走苦路。14处苦路由教宗克莱孟十二世于1731年正式确立，并委托给方济各修会。",
    sourcesTitle: "来源与致谢",
    paxFooter: "和平与美善",
    builtWith: "为天主的更大光荣，以爱构建",
  },
};
