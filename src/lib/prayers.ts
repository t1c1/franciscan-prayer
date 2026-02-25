export interface Hour {
  id: string;
  name: string;
  latinName: string;
  paterCount: number;
  description: string;
  typicalTime: string;
}

export const HOURS: Hour[] = [
  { id: "matins", name: "Matins", latinName: "Matutinum", paterCount: 24, description: "The Night Office — prayer in the deep watches", typicalTime: "During the night or early morning" },
  { id: "lauds", name: "Lauds", latinName: "Laudes", paterCount: 5, description: "Morning praise — greeting the new day with God", typicalTime: "Dawn / Early morning" },
  { id: "prime", name: "Prime", latinName: "Prima", paterCount: 7, description: "The First Hour — dedicating the day's work to God", typicalTime: "~6:00 AM" },
  { id: "terce", name: "Terce", latinName: "Tertia", paterCount: 7, description: "The Third Hour — when the Holy Spirit descended at Pentecost", typicalTime: "~9:00 AM" },
  { id: "sext", name: "Sext", latinName: "Sexta", paterCount: 7, description: "The Sixth Hour — midday, when Christ was crucified", typicalTime: "~12:00 PM" },
  { id: "none", name: "None", latinName: "Nona", paterCount: 7, description: "The Ninth Hour — when Christ died on the Cross", typicalTime: "~3:00 PM" },
  { id: "vespers", name: "Vespers", latinName: "Vesperae", paterCount: 12, description: "Evening prayer — giving thanks for the day", typicalTime: "~6:00 PM" },
  { id: "compline", name: "Compline", latinName: "Completorium", paterCount: 7, description: "Night prayer — commending oneself to God before sleep", typicalTime: "Before bed" },
];

export const TOTAL_DAILY_PATERS = HOURS.reduce((sum, h) => sum + h.paterCount, 0); // 76

export interface PrayerText {
  id: string;
  title: string;
  titles: Record<string, string>;
  latin: string;
  en: string;
  es: string;
  it: string;
  fr: string;
  zh: string;
}

export const PRAYERS: PrayerText[] = [
  {
    id: "pater-noster",
    title: "Our Father",
    titles: { en: "Our Father", es: "Padre Nuestro", it: "Padre Nostro", fr: "Notre Père", zh: "天主经" },
    latin: "Pater noster, qui es in caelis,\nsanctificetur nomen tuum.\nAdveniat regnum tuum.\nFiat voluntas tua, sicut in caelo et in terra.\nPanem nostrum quotidianum da nobis hodie,\net dimitte nobis debita nostra,\nsicut et nos dimittimus debitoribus nostris.\nEt ne nos inducas in tentationem,\nsed libera nos a malo.\nAmen.",
    en: "Our Father, who art in heaven,\nhallowed be thy name.\nThy kingdom come.\nThy will be done, on earth as it is in heaven.\nGive us this day our daily bread,\nand forgive us our trespasses,\nas we forgive those who trespass against us.\nAnd lead us not into temptation,\nbut deliver us from evil.\nAmen.",
    es: "Padre nuestro, que estás en el cielo,\nsantificado sea tu nombre.\nVenga a nosotros tu reino.\nHágase tu voluntad en la tierra como en el cielo.\nDanos hoy nuestro pan de cada día,\nperdona nuestras ofensas,\ncomo también nosotros perdonamos a los que nos ofenden.\nNo nos dejes caer en la tentación,\ny líbranos del mal.\nAmén.",
    it: "Padre nostro, che sei nei cieli,\nsia santificato il tuo nome.\nVenga il tuo regno.\nSia fatta la tua volontà, come in cielo così in terra.\nDacci oggi il nostro pane quotidiano,\ne rimetti a noi i nostri debiti,\ncome anche noi li rimettiamo ai nostri debitori.\nE non abbandonarci alla tentazione,\nma liberaci dal male.\nAmen.",
    fr: "Notre Père, qui es aux cieux,\nque ton nom soit sanctifié.\nQue ton règne vienne.\nQue ta volonté soit faite sur la terre comme au ciel.\nDonne-nous aujourd'hui notre pain de ce jour.\nPardonne-nous nos offenses,\ncomme nous pardonnons aussi à ceux qui nous ont offensés.\nEt ne nous laisse pas entrer en tentation,\nmais délivre-nous du mal.\nAmen.",
    zh: "我们的天父，愿你的名受显扬，\n愿你的国来临，\n愿你的旨意奉行在人间，如同在天上。\n求你今天赏给我们日用的食粮，\n求你宽恕我们的罪过，\n如同我们宽恕别人一样。\n不要让我们陷于诱惑，\n但救我们免于凶恶。\n阿们。",
  },
  {
    id: "ave-maria",
    title: "Hail Mary",
    titles: { en: "Hail Mary", es: "Ave María", it: "Ave Maria", fr: "Je vous salue Marie", zh: "圣母经" },
    latin: "Ave Maria, gratia plena,\nDominus tecum.\nBenedicta tu in mulieribus,\net benedictus fructus ventris tui, Iesus.\nSancta Maria, Mater Dei,\nora pro nobis peccatoribus,\nnunc, et in hora mortis nostrae.\nAmen.",
    en: "Hail Mary, full of grace,\nthe Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow, and at the hour of our death.\nAmen.",
    es: "Dios te salve, María, llena eres de gracia,\nel Señor es contigo.\nBendita tú eres entre todas las mujeres,\ny bendito es el fruto de tu vientre, Jesús.\nSanta María, Madre de Dios,\nruega por nosotros, pecadores,\nahora y en la hora de nuestra muerte.\nAmén.",
    it: "Ave Maria, piena di grazia,\nil Signore è con te.\nTu sei benedetta fra le donne,\ne benedetto è il frutto del tuo seno, Gesù.\nSanta Maria, Madre di Dio,\nprega per noi peccatori,\nadesso e nell'ora della nostra morte.\nAmen.",
    fr: "Je vous salue, Marie, pleine de grâce,\nle Seigneur est avec vous.\nVous êtes bénie entre toutes les femmes,\net Jésus, le fruit de vos entrailles, est béni.\nSainte Marie, Mère de Dieu,\npriez pour nous, pauvres pécheurs,\nmaintenant et à l'heure de notre mort.\nAmen.",
    zh: "万福玛利亚，你充满圣宠，\n主与你同在。\n你在妇女中受赞颂，\n你的亲子耶稣同受赞颂。\n天主圣母玛利亚，\n求你现在和我们临终时，\n为我们罪人祈求天主。\n阿们。",
  },
  {
    id: "gloria-patri",
    title: "Glory Be",
    titles: { en: "Glory Be", es: "Gloria", it: "Gloria", fr: "Gloire au Père", zh: "圣三光荣经" },
    latin: "Gloria Patri, et Filio, et Spiritui Sancto.\nSicut erat in principio, et nunc, et semper,\net in saecula saeculorum.\nAmen.",
    en: "Glory be to the Father, and to the Son, and to the Holy Spirit.\nAs it was in the beginning, is now, and ever shall be,\nworld without end.\nAmen.",
    es: "Gloria al Padre, y al Hijo, y al Espíritu Santo.\nComo era en el principio, ahora y siempre,\npor los siglos de los siglos.\nAmén.",
    it: "Gloria al Padre, al Figlio e allo Spirito Santo.\nCom'era nel principio, ora e sempre,\nnei secoli dei secoli.\nAmen.",
    fr: "Gloire au Père, et au Fils, et au Saint-Esprit.\nComme il était au commencement, maintenant et toujours,\npour les siècles des siècles.\nAmen.",
    zh: "光荣归于父、及子、及圣神。\n起初如何，今日亦然，\n直到永远。\n阿们。",
  },
  {
    id: "prayer-of-st-francis",
    title: "Prayer of St. Francis",
    titles: { en: "Prayer of St. Francis", es: "Oración de San Francisco", it: "Preghiera di San Francesco", fr: "Prière de Saint François", zh: "圣方济各祷词" },
    latin: "",
    en: "Lord, make me an instrument of your peace:\nwhere there is hatred, let me sow love;\nwhere there is injury, pardon;\nwhere there is doubt, faith;\nwhere there is despair, hope;\nwhere there is darkness, light;\nwhere there is sadness, joy.\n\nO divine Master, grant that I may not so much seek\nto be consoled as to console,\nto be understood as to understand,\nto be loved as to love.\nFor it is in giving that we receive,\nit is in pardoning that we are pardoned,\nand it is in dying that we are born to eternal life.\nAmen.",
    es: "Señor, hazme un instrumento de tu paz:\ndonde haya odio, ponga yo amor;\ndonde haya ofensa, ponga yo perdón;\ndonde haya duda, ponga yo fe;\ndonde haya desesperación, ponga yo esperanza;\ndonde haya tinieblas, ponga yo luz;\ndonde haya tristeza, ponga yo alegría.\n\nOh, divino Maestro, concédeme\nque no busque tanto ser consolado como consolar,\nser comprendido como comprender,\nser amado como amar.\nPorque dando es como se recibe,\nperdonando es como se es perdonado,\ny muriendo es como se nace a la vida eterna.\nAmén.",
    it: "Signore, fa' di me uno strumento della tua pace:\ndove è odio, fa' ch'io porti l'amore;\ndove è offesa, ch'io porti il perdono;\ndove è dubbio, ch'io porti la fede;\ndove è disperazione, ch'io porti la speranza;\ndove è tenebra, ch'io porti la luce;\ndove è tristezza, ch'io porti la gioia.\n\nO divino Maestro, fa' ch'io non cerchi tanto\ndi essere consolato quanto di consolare,\ndi essere compreso quanto di comprendere,\ndi essere amato quanto di amare.\nPoiché è dando che si riceve,\nperdonando che si è perdonati,\nmorendo che si risuscita alla vita eterna.\nAmen.",
    fr: "Seigneur, fais de moi un instrument de ta paix :\nlà où il y a de la haine, que je mette l'amour ;\nlà où il y a l'offense, que je mette le pardon ;\nlà où il y a le doute, que je mette la foi ;\nlà où il y a le désespoir, que je mette l'espérance ;\nlà où il y a les ténèbres, que je mette ta lumière ;\nlà où il y a la tristesse, que je mette la joie.\n\nÔ Maître, que je ne cherche pas tant\nà être consolé qu'à consoler,\nà être compris qu'à comprendre,\nà être aimé qu'à aimer.\nCar c'est en donnant qu'on reçoit,\nc'est en pardonnant qu'on est pardonné,\nc'est en mourant qu'on ressuscite à la vie éternelle.\nAmen.",
    zh: "主啊，使我作你和平的工具：\n在有仇恨的地方，让我播种仁爱；\n在有伤害的地方，让我播种宽恕；\n在有怀疑的地方，让我播种信心；\n在有绝望的地方，让我播种希望；\n在有黑暗的地方，让我播种光明；\n在有悲伤的地方，让我播种喜乐。\n\n神圣的主啊，求你让我\n不求安慰，但去安慰；\n不求理解，但去理解；\n不求被爱，但去爱人。\n因为在给予中，我们有所收获；\n在宽恕中，我们得到宽恕；\n在死亡中，我们获得永生。\n阿们。",
  },
  {
    id: "canticle-of-the-sun",
    title: "Canticle of the Sun",
    titles: { en: "Canticle of the Sun", es: "Cántico del Sol", it: "Cantico delle Creature", fr: "Cantique du Soleil", zh: "太阳颂" },
    latin: "",
    en: "Most High, all-powerful, all-good Lord,\nAll praise is yours, all glory, all honor, and all blessing.\nTo you, alone, Most High, do they belong.\nNo mortal lips are worthy to pronounce your name.\n\nBe praised, my Lord, through all your creatures,\nespecially through my lord Brother Sun,\nwho brings the day; and you give light through him.\nAnd he is beautiful and radiant in all his splendor!\nOf you, Most High, he bears the likeness.\n\nBe praised, my Lord, through Sister Moon and the stars;\nin the heavens you have made them bright, precious and beautiful.\n\nBe praised, my Lord, through Brothers Wind and Air,\nand clouds and storms, and all the weather,\nthrough which you give your creatures sustenance.\n\nBe praised, my Lord, through Sister Water;\nshe is very useful, and humble, and precious, and pure.\n\nBe praised, my Lord, through Brother Fire,\nthrough whom you brighten the night.\nHe is beautiful and cheerful, and powerful and strong.\n\nBe praised, my Lord, through our sister Mother Earth,\nwho feeds us and rules us,\nand produces various fruits with colored flowers and herbs.\n\nPraise and bless my Lord, and give thanks,\nand serve him with great humility.",
    es: "Altísimo, omnipotente, buen Señor,\ntuyas son las alabanzas, la gloria y el honor y toda bendición.\nA ti solo, Altísimo, te convienen,\ny ningún hombre es digno de hacer de ti mención.\n\nLoado seas, mi Señor, con todas tus criaturas,\nespecialmente el señor hermano Sol,\nel cual es día, y por el cual nos alumbras.\nY él es bello y radiante con gran esplendor,\nde ti, Altísimo, lleva significación.\n\nLoado seas, mi Señor, por la hermana Luna y las estrellas,\nen el cielo las has formado luminosas, preciosas y bellas.\n\nLoado seas, mi Señor, por el hermano Viento,\ny por el aire, y el nublado, y el sereno, y todo tiempo,\npor el cual a tus criaturas das sustento.\n\nLoado seas, mi Señor, por la hermana Agua,\nla cual es muy útil, y humilde, y preciosa, y casta.\n\nLoado seas, mi Señor, por el hermano Fuego,\npor el cual alumbras la noche,\ny él es bello, y alegre, y robusto, y fuerte.\n\nLoado seas, mi Señor, por nuestra hermana la madre Tierra,\nla cual nos sustenta y gobierna,\ny produce diversos frutos con coloridas flores y hierbas.\n\nAlabad y bendecid a mi Señor,\ny dadle gracias y servidle con gran humildad.",
    it: "Altissimu, onnipotente, bon Signore,\ntue so' le laude, la gloria e l'honore et onne benedictione.\nAd te solo, Altissimo, se konfane,\net nullu homo ène dignu te mentovare.\n\nLaudato sie, mi' Signore, cum tucte le tue creature,\nspetialmente messor lo frate sole,\nlo qual è iorno, et allumini noi per lui.\nEt ellu è bellu e radiante cum grande splendore,\nde te, Altissimo, porta significatione.\n\nLaudato si', mi' Signore, per sora luna e le stelle,\nin celu l'ài formate clarite et pretiose et belle.\n\nLaudato si', mi' Signore, per frate vento\net per aere et nubilo et sereno et onne tempo,\nper lo quale a le tue creature dài sustentamento.\n\nLaudato si', mi' Signore, per sor'aqua,\nla quale è multo utile et humile et pretiosa et casta.\n\nLaudato si', mi' Signore, per frate focu,\nper lo quale ennallumini la nocte,\ned ello è bello et iocundo et robustoso et forte.\n\nLaudato si', mi' Signore, per sora nostra matre terra,\nla quale ne sustenta et governa,\net produce diversi fructi con coloriti flori et herba.\n\nLaudate et benedicete mi' Signore\net ringratiate et serviateli cum grande humilitate.",
    fr: "Très-Haut, tout-puissant et bon Seigneur,\nà toi louange, gloire, honneur, et toute bénédiction.\nÀ toi seul, Très-Haut, ils conviennent,\net aucun homme n'est digne de te nommer.\n\nLoué sois-tu, mon Seigneur, avec toutes tes créatures,\nspécialement messire frère Soleil,\npar qui tu nous donnes le jour et la lumière.\nIl est beau, rayonnant d'une grande splendeur,\net de toi, Très-Haut, il est le symbole.\n\nLoué sois-tu, mon Seigneur, pour sœur Lune et les étoiles :\ndans le ciel tu les as formées claires, précieuses et belles.\n\nLoué sois-tu, mon Seigneur, pour frère Vent,\net pour l'air et pour les nuages, pour l'azur calme et tous les temps,\npar lesquels tu donnes soutien à tes créatures.\n\nLoué sois-tu, mon Seigneur, pour sœur Eau,\nqui est très utile et humble, précieuse et chaste.\n\nLoué sois-tu, mon Seigneur, pour frère Feu,\npar qui tu éclaires la nuit :\nil est beau et joyeux, indomptable et fort.\n\nLoué sois-tu, mon Seigneur, pour sœur notre mère la Terre,\nqui nous nourrit et nous soutient,\net produit les fruits divers avec les fleurs colorées et l'herbe.\n\nLouez et bénissez mon Seigneur,\nrendez-lui grâce et servez-le en toute humilité.",
    zh: "至高、全能、美善的主，\n一切赞颂、光荣、尊崇和祝福都归于你。\n至高者，唯有你堪当，\n无人配称呼你的圣名。\n\n我的主，愿你因你所造的万物而受赞美，\n尤其因太阳兄弟，\n他带来白昼，你藉他赐给我们光明。\n他是美丽的，光芒四射，充满灿烂的光辉，\n至高者啊，他是你的肖像。\n\n我的主，愿你因月亮姊妹和星辰而受赞美，\n你在天上造了她们，明亮、珍贵又美丽。\n\n我的主，愿你因风兄弟而受赞美，\n因空气、云彩、晴天和各种天气，\n你藉此供养你的受造物。\n\n我的主，愿你因水姊妹而受赞美，\n她非常有用，谦卑，珍贵又纯洁。\n\n我的主，愿你因火兄弟而受赞美，\n你藉他照亮黑夜，\n他美丽、欢乐、强壮有力。\n\n我的主，愿你因我们的姊妹大地母亲而受赞美，\n她养育支撑我们，\n生产各种果实、彩色的花朵和草木。\n\n赞美称颂我的主，\n感谢他，以极大的谦卑事奉他。",
  },
];

export type Language = "latin" | "en" | "es" | "it" | "fr" | "zh";

export const LANGUAGE_LABELS: Record<Language, string> = {
  latin: "Latin",
  en: "English",
  es: "Español",
  it: "Italiano",
  fr: "Français",
  zh: "中文",
};

// Translated Hour names and descriptions
export type HourTranslations = Record<string, { name: string; description: string; typicalTime: string }>;

export const HOURS_I18N: Record<string, HourTranslations> = {
  en: {
    matins: { name: "Matins", description: "The Night Office — prayer in the deep watches", typicalTime: "During the night or early morning" },
    lauds: { name: "Lauds", description: "Morning praise — greeting the new day with God", typicalTime: "Dawn / Early morning" },
    prime: { name: "Prime", description: "The First Hour — dedicating the day's work to God", typicalTime: "~6:00 AM" },
    terce: { name: "Terce", description: "The Third Hour — when the Holy Spirit descended at Pentecost", typicalTime: "~9:00 AM" },
    sext: { name: "Sext", description: "The Sixth Hour — midday, when Christ was crucified", typicalTime: "~12:00 PM" },
    none: { name: "None", description: "The Ninth Hour — when Christ died on the Cross", typicalTime: "~3:00 PM" },
    vespers: { name: "Vespers", description: "Evening prayer — giving thanks for the day", typicalTime: "~6:00 PM" },
    compline: { name: "Compline", description: "Night prayer — commending oneself to God before sleep", typicalTime: "Before bed" },
  },
  es: {
    matins: { name: "Maitines", description: "El Oficio Nocturno — oración en las vigilias de la noche", typicalTime: "Durante la noche o temprano" },
    lauds: { name: "Laudes", description: "Alabanza matutina — saludando el nuevo día con Dios", typicalTime: "Amanecer" },
    prime: { name: "Prima", description: "La Primera Hora — dedicando el trabajo del día a Dios", typicalTime: "~6:00" },
    terce: { name: "Tercia", description: "La Tercera Hora — cuando el Espíritu Santo descendió en Pentecostés", typicalTime: "~9:00" },
    sext: { name: "Sexta", description: "La Sexta Hora — mediodía, cuando Cristo fue crucificado", typicalTime: "~12:00" },
    none: { name: "Nona", description: "La Novena Hora — cuando Cristo murió en la Cruz", typicalTime: "~15:00" },
    vespers: { name: "Vísperas", description: "Oración vespertina — dando gracias por el día", typicalTime: "~18:00" },
    compline: { name: "Completas", description: "Oración nocturna — encomendándose a Dios antes de dormir", typicalTime: "Antes de dormir" },
  },
  it: {
    matins: { name: "Mattutino", description: "L'Ufficio Notturno — preghiera nelle veglie della notte", typicalTime: "Durante la notte o mattina presto" },
    lauds: { name: "Lodi", description: "Lode mattutina — accogliendo il nuovo giorno con Dio", typicalTime: "All'alba" },
    prime: { name: "Prima", description: "La Prima Ora — dedicando il lavoro della giornata a Dio", typicalTime: "~6:00" },
    terce: { name: "Terza", description: "La Terza Ora — quando lo Spirito Santo discese a Pentecoste", typicalTime: "~9:00" },
    sext: { name: "Sesta", description: "La Sesta Ora — mezzogiorno, quando Cristo fu crocifisso", typicalTime: "~12:00" },
    none: { name: "Nona", description: "La Nona Ora — quando Cristo morì sulla Croce", typicalTime: "~15:00" },
    vespers: { name: "Vespri", description: "Preghiera serale — rendendo grazie per la giornata", typicalTime: "~18:00" },
    compline: { name: "Compieta", description: "Preghiera notturna — affidandosi a Dio prima del sonno", typicalTime: "Prima di dormire" },
  },
  fr: {
    matins: { name: "Matines", description: "L'Office de Nuit — prière dans les veilles de la nuit", typicalTime: "Pendant la nuit ou tôt le matin" },
    lauds: { name: "Laudes", description: "Louange du matin — accueillant le nouveau jour avec Dieu", typicalTime: "À l'aube" },
    prime: { name: "Prime", description: "La Première Heure — dédiant le travail du jour à Dieu", typicalTime: "~6h00" },
    terce: { name: "Tierce", description: "La Troisième Heure — quand l'Esprit Saint descendit à la Pentecôte", typicalTime: "~9h00" },
    sext: { name: "Sexte", description: "La Sixième Heure — midi, quand le Christ fut crucifié", typicalTime: "~12h00" },
    none: { name: "None", description: "La Neuvième Heure — quand le Christ mourut sur la Croix", typicalTime: "~15h00" },
    vespers: { name: "Vêpres", description: "Prière du soir — rendant grâce pour la journée", typicalTime: "~18h00" },
    compline: { name: "Complies", description: "Prière de la nuit — se confiant à Dieu avant le sommeil", typicalTime: "Avant le coucher" },
  },
  zh: {
    matins: { name: "夜祷", description: "夜间礼仪 — 在深夜守望中祈祷", typicalTime: "夜间或清晨" },
    lauds: { name: "晨祷", description: "晨间赞美 — 以天主迎接新的一天", typicalTime: "黎明" },
    prime: { name: "第一时辰", description: "第一时辰 — 将当日工作奉献给天主", typicalTime: "~早上6:00" },
    terce: { name: "第三时辰", description: "第三时辰 — 圣神在五旬节降临的时刻", typicalTime: "~上午9:00" },
    sext: { name: "第六时辰", description: "第六时辰 — 正午，基督被钉十字架的时刻", typicalTime: "~中午12:00" },
    none: { name: "第九时辰", description: "第九时辰 — 基督在十字架上死亡的时刻", typicalTime: "~下午3:00" },
    vespers: { name: "晚祷", description: "晚间祈祷 — 为这一天感恩", typicalTime: "~下午6:00" },
    compline: { name: "夜课", description: "睡前祈祷 — 在入睡前将自己托付给天主", typicalTime: "睡前" },
  },
};
