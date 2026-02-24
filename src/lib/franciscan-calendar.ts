export interface FranciscanFeast {
  month: number;
  day: number;
  name: string;
  rank: "solemnity" | "feast" | "memorial" | "optional";
  description: string;
}

export const FRANCISCAN_FEASTS: FranciscanFeast[] = [
  // January
  { month: 1, day: 16, name: "Sts. Berard and Companions", rank: "memorial", description: "First Franciscan martyrs, killed in Morocco in 1220. Their martyrdom inspired St. Anthony of Padua to join the Franciscans." },

  // February
  { month: 2, day: 7, name: "Bl. Giles Mary of St. Joseph", rank: "optional", description: "Franciscan lay brother known for his simplicity and devotion to the Blessed Sacrament." },

  // March
  { month: 3, day: 24, name: "St. Didacus of Cadiz", rank: "optional", description: "Capuchin friar and popular preacher in 18th-century Spain." },

  // April
  { month: 4, day: 3, name: "St. Benedict the Moor", rank: "optional", description: "Son of African slaves in Sicily, Franciscan lay brother known for his humility and miracles." },
  { month: 4, day: 16, name: "St. Bernadette Soubirous", rank: "optional", description: "Visionary of Lourdes who later became a religious sister. Connected to the Franciscan family." },
  { month: 4, day: 24, name: "St. Fidelis of Sigmaringen", rank: "feast", description: "Capuchin friar and the first martyr of the Congregation for the Propagation of the Faith." },
  { month: 4, day: 28, name: "St. Louis Mary Grignion de Montfort", rank: "optional", description: "Priest who founded the Company of Mary, associated with the Franciscan Third Order." },

  // May
  { month: 5, day: 16, name: "St. Margaret of Cortona", rank: "memorial", description: "Penitent and Franciscan tertiary. Patron saint of the falsely accused and reformed prostitutes." },
  { month: 5, day: 17, name: "St. Paschal Baylon", rank: "memorial", description: "Franciscan lay brother, patron of Eucharistic congresses and devotions." },
  { month: 5, day: 20, name: "St. Bernardine of Siena", rank: "feast", description: "Great Franciscan preacher who popularized devotion to the Holy Name of Jesus (IHS)." },
  { month: 5, day: 28, name: "St. Mary Ann of Jesus de Paredes", rank: "optional", description: "Known as 'the Lily of Quito,' a Franciscan tertiary and the first canonized saint of Ecuador." },
  { month: 5, day: 30, name: "St. Felix of Cantalice", rank: "optional", description: "Capuchin lay brother known as 'Brother Deo Gratias' for his constant thanksgiving." },

  // June
  { month: 6, day: 12, name: "Bl. Jolenta of Poland", rank: "optional", description: "Princess and Poor Clare who gave away her wealth to serve the poor." },
  { month: 6, day: 13, name: "St. Anthony of Padua", rank: "feast", description: "Doctor of the Church, patron saint of lost things. One of the most beloved Franciscan saints." },

  // July
  { month: 7, day: 8, name: "Sts. Gregory Grassi and Companions", rank: "memorial", description: "Franciscan missionaries martyred during the Boxer Rebellion in China (1900)." },
  { month: 7, day: 9, name: "St. Nicholas Pick and Companions", rank: "memorial", description: "The Martyrs of Gorkum — 19 religious and secular priests killed by Calvinists in 1572." },
  { month: 7, day: 12, name: "Sts. Clementine and Companions", rank: "optional", description: "Poor Clares martyred during the French Revolution in 1794." },
  { month: 7, day: 15, name: "St. Bonaventure", rank: "feast", description: "Doctor of the Church, Minister General of the Order, known as the 'Seraphic Doctor.'" },
  { month: 7, day: 21, name: "St. Lawrence of Brindisi", rank: "optional", description: "Capuchin friar, Doctor of the Church, who spoke 8 languages and was a brilliant preacher." },
  { month: 7, day: 24, name: "Bl. Louise of Savoy", rank: "optional", description: "Princess who became a Poor Clare after her husband's death." },

  // August
  { month: 8, day: 2, name: "Our Lady of the Angels of the Portiuncula", rank: "feast", description: "The Portiuncula Indulgence, granted to St. Francis by Christ. The little church where the Order was born." },
  { month: 8, day: 7, name: "Sts. Agathangelus and Cassian", rank: "optional", description: "Capuchin martyrs in Ethiopia." },
  { month: 8, day: 8, name: "The Holy Father Dominic", rank: "optional", description: "Founder of the Dominicans, friend and contemporary of St. Francis." },
  { month: 8, day: 11, name: "St. Clare of Assisi", rank: "feast", description: "Foundress of the Poor Clares. She left everything to follow Christ in the way of St. Francis." },
  { month: 8, day: 14, name: "St. Maximilian Kolbe", rank: "memorial", description: "Conventual Franciscan who gave his life for a fellow prisoner at Auschwitz." },
  { month: 8, day: 19, name: "St. Louis of Toulouse", rank: "memorial", description: "Franciscan bishop who renounced the crown of Naples for religious life." },
  { month: 8, day: 25, name: "St. Louis IX, King of France", rank: "optional", description: "Patron of the Secular Franciscan Order. Model of Christian kingship and justice." },

  // September
  { month: 9, day: 17, name: "Impression of the Sacred Stigmata", rank: "feast", description: "St. Francis received the Sacred Stigmata on Mount La Verna in 1224 — the first known stigmatic in Church history." },
  { month: 9, day: 20, name: "Martyrs of Japan", rank: "optional", description: "Six Franciscan friars and 17 Franciscan tertiaries among the 26 Martyrs crucified at Nagasaki in 1597." },
  { month: 9, day: 23, name: "St. Padre Pio of Pietrelcina", rank: "memorial", description: "Capuchin stigmatist, confessor, and mystic. One of the most popular saints of the 20th century." },

  // October
  { month: 10, day: 3, name: "Transitus of Our Holy Father Francis", rank: "solemnity", description: "The eve of St. Francis's death (October 3, 1226). Celebrated with the solemn Transitus ceremony." },
  { month: 10, day: 4, name: "Our Holy Father St. Francis of Assisi", rank: "solemnity", description: "The Seraphic Father, founder of the three Franciscan Orders. Patron saint of ecology and animals." },
  { month: 10, day: 6, name: "St. Mary Frances of the Five Wounds", rank: "optional", description: "Franciscan tertiary and mystic who bore the invisible stigmata." },
  { month: 10, day: 10, name: "St. Daniel and Companions", rank: "memorial", description: "Seven Franciscan friars martyred at Ceuta, Morocco, in 1227." },
  { month: 10, day: 11, name: "St. John XXIII", rank: "optional", description: "The 'Good Pope,' secular Franciscan who convened the Second Vatican Council." },
  { month: 10, day: 22, name: "St. John Paul II", rank: "optional", description: "Pope closely connected with Franciscan spirituality, canonized Padre Pio and many Franciscan saints." },
  { month: 10, day: 23, name: "St. John of Capistrano", rank: "memorial", description: "Franciscan friar, preacher, and reformer. Patron saint of military chaplains." },

  // November
  { month: 11, day: 4, name: "Commemoration of All the Deceased of the Seraphic Order", rank: "memorial", description: "All Souls for the Franciscan family — prayer for all deceased friars, sisters, and tertiaries." },
  { month: 11, day: 14, name: "Bl. Nicolaus Steno", rank: "optional", description: "Danish scientist-turned-bishop who became a Franciscan tertiary." },
  { month: 11, day: 17, name: "St. Elizabeth of Hungary", rank: "feast", description: "Princess, wife, mother, Franciscan tertiary. Patron of the Secular Franciscan Order." },
  { month: 11, day: 24, name: "Martyrs of Vietnam", rank: "optional", description: "Franciscan priests and brothers among the 117 Martyrs of Vietnam." },
  { month: 11, day: 26, name: "Bl. Solanus Casey", rank: "optional", description: "Capuchin friar and porter known for healing and counsel at St. Bonaventure Monastery, Detroit." },
  { month: 11, day: 28, name: "St. James of the Marche", rank: "optional", description: "Franciscan friar, reformer, preacher, and legate." },
  { month: 11, day: 29, name: "All Saints of the Seraphic Order", rank: "feast", description: "Celebration of all canonized and beatified members of the Franciscan family." },

  // December
  { month: 12, day: 8, name: "Immaculate Conception of the BVM", rank: "solemnity", description: "The Franciscan Order championed this dogma for centuries before its definition in 1854. Bl. Duns Scotus was its greatest theological defender." },
];

export function getTodayFeast(): FranciscanFeast | null {
  const now = new Date();
  return (
    FRANCISCAN_FEASTS.find(
      (f) => f.month === now.getMonth() + 1 && f.day === now.getDate()
    ) ?? null
  );
}

export function getUpcomingFeasts(count: number = 5): FranciscanFeast[] {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // Sort feasts by how soon they are from today
  const withDistance = FRANCISCAN_FEASTS.map((f) => {
    let daysUntil = (f.month - month) * 30 + (f.day - day);
    if (daysUntil < 0) daysUntil += 365;
    return { ...f, daysUntil };
  });

  withDistance.sort((a, b) => a.daysUntil - b.daysUntil);
  return withDistance.slice(0, count);
}
