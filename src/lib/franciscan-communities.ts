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
