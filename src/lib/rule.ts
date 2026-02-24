export interface RuleChapter {
  chapter: number;
  title: string;
  titleLatin: string;
  text: string;
  textLatin: string;
}

// The Regula Bullata (1223) — Rule of St. Francis, approved by Pope Honorius III
export const RULE_CHAPTERS: RuleChapter[] = [
  {
    chapter: 1,
    title: "In the Name of the Lord!",
    titleLatin: "In Nomine Domini!",
    text: "The Rule and life of the Friars Minor is this, namely, to observe the Holy Gospel of our Lord Jesus Christ by living in obedience, without property, and in chastity. Brother Francis promises obedience and reverence to the Lord Pope Honorius and to his canonically elected successors and to the Roman Church. And let the other friars be bound to obey Brother Francis and his successors.",
    textLatin: "Regula et vita Minorum Fratrum haec est, scilicet Domini nostri Jesu Christi sanctum Evangelium observare vivendo in obedientia, sine proprio et in castitate. Frater Franciscus promittit obedientiam et reverentiam domino papae Honorio ac successoribus ejus canonice intrantibus et Ecclesiae Romanae. Et alii fratres teneantur fratri Francisco et ejus successoribus obedire.",
  },
  {
    chapter: 2,
    title: "Of Those Who Wish to Take Up This Life",
    titleLatin: "De His Qui Volunt Vitam Istam Accipere",
    text: "If anyone wishes to take up this life and comes to our friars, let them send him to their provincial ministers, to whom alone and to no others is permission granted to receive friars. Let the ministers examine him carefully concerning the Catholic faith and the sacraments of the Church. And if he believes all these things and is willing to profess them faithfully and to observe them firmly to the end; and if he has no wife, or if he has one and she has already entered a monastery, or if she has given him permission with the authority of the diocesan bishop, having already made a vow of continence, and if his wife is of such an age that no suspicion can arise about her — let the ministers speak to him the words of the holy Gospel, that he should go and sell all that he has and take care to give it to the poor.",
    textLatin: "Si qui voluerint hanc vitam accipere et venerint ad fratres nostros, mittant eos ad suos ministros provinciales, quibus solummodo et non aliis recipiendi fratres licentia concedatur.",
  },
  {
    chapter: 3,
    title: "Of the Divine Office and Fasting",
    titleLatin: "De Divino Officio et Jejunio",
    text: "The clerical friars shall perform the Divine Office according to the rite of the holy Roman Church, except for the Psalter, for which reason they may have breviaries. The lay friars, however, shall say twenty-four Our Fathers for Matins; for Lauds, five; for Prime, Terce, Sext, and None, for each of these, seven; for Vespers, twelve; for Compline, seven; and let them pray for the dead.",
    textLatin: "Clerici faciant divinum officium secundum ordinem sanctae Romanae Ecclesiae excepto psalterio, ex quo habere poterunt breviaria. Laici vero dicant viginti quatuor Pater noster pro matutino; pro laudibus quinque; pro prima, tertia, sexta, nona, pro qualibet istarum septem; pro vesperis autem duodecim; pro completorio septem; et orent pro defunctis.",
  },
  {
    chapter: 4,
    title: "That the Friars Should Not Receive Money",
    titleLatin: "Quod Fratres Non Recipiant Pecuniam",
    text: "I firmly command all the friars by no means to receive coins or money, either personally or through an intermediary. Nevertheless, let the ministers and custodians alone take special care through their spiritual friends to provide for the needs of the sick and for clothing the other friars, according to places and times and cold climates, as they shall judge necessary; saving always that, as has been said, they do not receive coins or money.",
    textLatin: "Praecipio firmiter fratribus universis, ut nullo modo denarios vel pecuniam recipiant per se vel per interpositam personam.",
  },
  {
    chapter: 5,
    title: "Of the Manner of Working",
    titleLatin: "De Modo Laborandi",
    text: "Those friars to whom the Lord has given the grace of working should work faithfully and devoutly, in such a way that, while avoiding idleness, the enemy of the soul, they do not extinguish the spirit of holy prayer and devotion, to which all other temporal things should be subordinate. As payment for their labor they may receive whatever is necessary for their bodily needs and those of their brothers, but not coins or money, and this with humility, as befits servants of God and followers of most holy poverty.",
    textLatin: "Fratres illi, quibus gratiam dedit Dominus laborandi, laborent fideliter et devote.",
  },
  {
    chapter: 6,
    title: "That the Friars Should Appropriate Nothing",
    titleLatin: "Quod Nihil Approprient Sibi Fratres",
    text: "Let the friars appropriate nothing to themselves, neither a house, nor a place, nor anything. And as pilgrims and strangers in this world, serving the Lord in poverty and humility, let them go confidently in quest of alms, nor should they feel ashamed, because the Lord made himself poor for us in this world. This is that summit of the most high poverty which has made you, my most beloved brothers, heirs and kings of the kingdom of heaven: poor in goods but exalted in virtue.",
    textLatin: "Fratres nihil sibi approprient nec domum nec locum nec aliquam rem. Et tamquam peregrini et advenae in hoc saeculo in paupertate et humilitate Domino famulantes vadant pro eleemosyna confidenter.",
  },
  {
    chapter: 10,
    title: "Of the Admonition and Correction of the Friars",
    titleLatin: "De Admonitione et Correctione Fratrum",
    text: "The friars who are ministers and servants of the other friars should visit and admonish their brothers and humbly and charitably correct them, not commanding them anything that is against their soul and our Rule. The friars who are subject, however, should remember that for God's sake they have given up their own wills. Wherefore I firmly command them to obey their ministers in all things which they have promised the Lord to observe and which are not against their soul or our Rule.",
    textLatin: "Fratres, qui sunt ministri et servi aliorum fratrum, visitent et moneant fratres suos et humiliter et caritative corrigant eos.",
  },
  {
    chapter: 12,
    title: "Of Those Going Among the Saracens",
    titleLatin: "De Euntibus Inter Saracenos",
    text: "Whoever among the friars shall wish by divine inspiration to go among the Saracens and other nonbelievers, let them ask permission from their provincial ministers. The ministers, however, should give permission only to those whom they judge fit to be sent. Furthermore, I command the ministers by obedience to petition the Lord Pope for one of the cardinals of the Holy Roman Church, who would be the governor, protector, and corrector of this fraternity, so that, always subject and submissive at the feet of the same Holy Church and steadfast in the Catholic faith, we may observe poverty and humility and the Holy Gospel of our Lord Jesus Christ, which we have firmly promised.",
    textLatin: "Quicumque fratrum divina inspiratione voluerint ire inter Saracenos et alios infideles petant inde licentiam a suis ministris provincialibus.",
  },
];

export function getDailyChapter(): RuleChapter {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return RULE_CHAPTERS[dayOfYear % RULE_CHAPTERS.length];
}
