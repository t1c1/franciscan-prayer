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

export const CALENDAR_I18N: Record<string, Record<string, { name: string; description: string }>> = {
  es: {
    "01-16": { name: "Santos Berardo y Compañeros", description: "Primeros mártires franciscanos, asesinados en Marruecos en 1220. Su martirio inspiró a San Antonio de Padua a unirse a los franciscanos." },
    "02-07": { name: "Beato Gil María de San José", description: "Hermano lego franciscano conocido por su sencillez y devoción al Santísimo Sacramento." },
    "03-24": { name: "San Diego José de Cádiz", description: "Fraile capuchino y predicador popular en la España del siglo XVIII." },
    "04-03": { name: "San Benito el Africano", description: "Hijo de esclavos africanos en Sicilia, hermano lego franciscano conocido por su humildad y milagros." },
    "04-16": { name: "Santa Bernardita Soubirous", description: "Vidente de Lourdes que luego se hizo religiosa. Vinculada a la familia franciscana." },
    "04-24": { name: "San Fidel de Sigmaringen", description: "Fraile capuchino y primer mártir de la Congregación para la Propagación de la Fe." },
    "04-28": { name: "San Luis María Grignion de Montfort", description: "Sacerdote fundador de la Compañía de María, asociado a la Tercera Orden Franciscana." },
    "05-16": { name: "Santa Margarita de Cortona", description: "Penitente y terciaria franciscana. Patrona de los falsamente acusados y de las arrepentidas." },
    "05-17": { name: "San Pascual Bailón", description: "Hermano lego franciscano, patrón de los congresos y devociones eucarísticas." },
    "05-20": { name: "San Bernardino de Siena", description: "Gran predicador franciscano que popularizó la devoción al Santísimo Nombre de Jesús (IHS)." },
    "05-28": { name: "Santa Mariana de Jesús de Paredes", description: "Conocida como 'la Azucena de Quito', terciaria franciscana y primera santa canonizada de Ecuador." },
    "05-30": { name: "San Félix de Cantalicio", description: "Hermano lego capuchino conocido como 'Hermano Deo Gratias' por su constante acción de gracias." },
    "06-12": { name: "Beata Jolenta de Polonia", description: "Princesa y clarisa que donó todos sus bienes para servir a los pobres." },
    "06-13": { name: "San Antonio de Padua", description: "Doctor de la Iglesia, patrón de los objetos perdidos. Uno de los santos franciscanos más queridos." },
    "07-08": { name: "Santos Gregorio Grassi y Compañeros", description: "Misioneros franciscanos martirizados durante la Rebelión de los Bóxers en China (1900)." },
    "07-09": { name: "San Nicolás Pick y Compañeros", description: "Mártires de Gorkum: 19 religiosos y sacerdotes seculares asesinados por calvinistas en 1572." },
    "07-12": { name: "Santas Clementina y Compañeras", description: "Clarisas martirizadas durante la Revolución Francesa en 1794." },
    "07-15": { name: "San Buenaventura", description: "Doctor de la Iglesia, Ministro General de la Orden, conocido como el 'Doctor Seráfico'." },
    "07-21": { name: "San Lorenzo de Bríndisi", description: "Fraile capuchino, Doctor de la Iglesia, hablaba 8 idiomas y fue un predicador brillante." },
    "07-24": { name: "Beata Luisa de Saboya", description: "Princesa que se hizo clarisa tras la muerte de su esposo." },
    "08-02": { name: "Nuestra Señora de los Ángeles de la Porciúncula", description: "La Indulgencia de la Porciúncula, concedida a San Francisco por Cristo. La pequeña iglesia donde nació la Orden." },
    "08-07": { name: "Santos Agatángelo y Casiano", description: "Mártires capuchinos en Etiopía." },
    "08-08": { name: "El Santo Padre Domingo", description: "Fundador de los dominicos, amigo y contemporáneo de San Francisco." },
    "08-11": { name: "Santa Clara de Asís", description: "Fundadora de las Clarisas. Lo dejó todo para seguir a Cristo según el ejemplo de San Francisco." },
    "08-14": { name: "San Maximiliano Kolbe", description: "Franciscano conventual que dio su vida por un compañero prisionero en Auschwitz." },
    "08-19": { name: "San Luis de Tolosa", description: "Obispo franciscano que renunció a la corona de Nápoles por la vida religiosa." },
    "08-25": { name: "San Luis IX, Rey de Francia", description: "Patrón de la Orden Franciscana Seglar. Modelo de realeza cristiana y justicia." },
    "09-17": { name: "Impresión de los Sagrados Estigmas", description: "San Francisco recibió los Sagrados Estigmas en el Monte Alverna en 1224, siendo el primer estigmatizado conocido en la historia de la Iglesia." },
    "09-20": { name: "Mártires del Japón", description: "Seis frailes franciscanos y 17 terciarios franciscanos entre los 26 mártires crucificados en Nagasaki en 1597." },
    "09-23": { name: "San Padre Pío de Pietrelcina", description: "Capuchino estigmatizado, confesor y místico. Uno de los santos más populares del siglo XX." },
    "10-03": { name: "Tránsito de Nuestro Santo Padre Francisco", description: "Víspera de la muerte de San Francisco (3 de octubre de 1226). Se celebra con la solemne ceremonia del Tránsito." },
    "10-04": { name: "Nuestro Santo Padre San Francisco de Asís", description: "El Padre Seráfico, fundador de las tres Órdenes Franciscanas. Patrón de la ecología y los animales." },
    "10-06": { name: "Santa María Francisca de las Cinco Llagas", description: "Terciaria franciscana y mística que llevó los estigmas invisibles." },
    "10-10": { name: "San Daniel y Compañeros", description: "Siete frailes franciscanos martirizados en Ceuta, Marruecos, en 1227." },
    "10-11": { name: "San Juan XXIII", description: "El 'Papa Bueno', franciscano seglar que convocó el Concilio Vaticano II." },
    "10-22": { name: "San Juan Pablo II", description: "Papa estrechamente vinculado a la espiritualidad franciscana, canonizó al Padre Pío y a muchos santos franciscanos." },
    "10-23": { name: "San Juan de Capistrano", description: "Fraile franciscano, predicador y reformador. Patrón de los capellanes militares." },
    "11-04": { name: "Conmemoración de Todos los Difuntos de la Orden Seráfica", description: "Día de los Fieles Difuntos de la familia franciscana: oración por todos los frailes, religiosas y terciarios fallecidos." },
    "11-14": { name: "Beato Nicolás Steno", description: "Científico y obispo danés que se hizo terciario franciscano." },
    "11-17": { name: "Santa Isabel de Hungría", description: "Princesa, esposa, madre y terciaria franciscana. Patrona de la Orden Franciscana Seglar." },
    "11-24": { name: "Mártires de Vietnam", description: "Sacerdotes y hermanos franciscanos entre los 117 Mártires de Vietnam." },
    "11-26": { name: "Beato Solanus Casey", description: "Fraile capuchino y portero conocido por sus curaciones y consejos en el Monasterio de San Buenaventura, Detroit." },
    "11-28": { name: "San Jaime de la Marca", description: "Fraile franciscano, reformador, predicador y legado." },
    "11-29": { name: "Todos los Santos de la Orden Seráfica", description: "Celebración de todos los miembros canonizados y beatificados de la familia franciscana." },
    "12-08": { name: "Inmaculada Concepción de la Santísima Virgen María", description: "La Orden Franciscana defendió este dogma durante siglos antes de su definición en 1854. El Beato Duns Escoto fue su mayor defensor teológico." },
  },
  it: {
    "01-16": { name: "Santi Berardo e Compagni", description: "Primi martiri francescani, uccisi in Marocco nel 1220. Il loro martirio ispirò Sant'Antonio di Padova a unirsi ai francescani." },
    "02-07": { name: "Beato Egidio Maria di San Giuseppe", description: "Fratello laico francescano noto per la sua semplicità e devozione al Santissimo Sacramento." },
    "03-24": { name: "San Diego Giuseppe da Cadice", description: "Frate cappuccino e predicatore popolare nella Spagna del Settecento." },
    "04-03": { name: "San Benedetto il Moro", description: "Figlio di schiavi africani in Sicilia, fratello laico francescano noto per la sua umiltà e i suoi miracoli." },
    "04-16": { name: "Santa Bernardetta Soubirous", description: "Veggente di Lourdes che divenne poi religiosa. Legata alla famiglia francescana." },
    "04-24": { name: "San Fedele da Sigmaringen", description: "Frate cappuccino e primo martire della Congregazione di Propaganda Fide." },
    "04-28": { name: "San Luigi Maria Grignion de Montfort", description: "Sacerdote fondatore della Compagnia di Maria, associato al Terz'Ordine Francescano." },
    "05-16": { name: "Santa Margherita da Cortona", description: "Penitente e terziaria francescana. Patrona dei falsamente accusati e delle peccatrici pentite." },
    "05-17": { name: "San Pasquale Baylon", description: "Fratello laico francescano, patrono dei congressi e delle devozioni eucaristiche." },
    "05-20": { name: "San Bernardino da Siena", description: "Grande predicatore francescano che diffuse la devozione al Santissimo Nome di Gesù (IHS)." },
    "05-28": { name: "Santa Marianna di Gesù de Paredes", description: "Nota come 'il Giglio di Quito', terziaria francescana e prima santa canonizzata dell'Ecuador." },
    "05-30": { name: "San Felice da Cantalice", description: "Fratello laico cappuccino noto come 'Fra Deo Gratias' per il suo costante ringraziamento." },
    "06-12": { name: "Beata Iolanda di Polonia", description: "Principessa e clarissa che donò tutti i suoi beni per servire i poveri." },
    "06-13": { name: "Sant'Antonio di Padova", description: "Dottore della Chiesa, patrono delle cose smarrite. Uno dei santi francescani più amati." },
    "07-08": { name: "Santi Gregorio Grassi e Compagni", description: "Missionari francescani martirizzati durante la Rivolta dei Boxer in Cina (1900)." },
    "07-09": { name: "San Nicola Pick e Compagni", description: "Martiri di Gorcum: 19 religiosi e sacerdoti secolari uccisi dai calvinisti nel 1572." },
    "07-12": { name: "Sante Clementina e Compagne", description: "Clarisse martirizzate durante la Rivoluzione francese nel 1794." },
    "07-15": { name: "San Bonaventura", description: "Dottore della Chiesa, Ministro Generale dell'Ordine, noto come il 'Dottore Serafico'." },
    "07-21": { name: "San Lorenzo da Brindisi", description: "Frate cappuccino, Dottore della Chiesa, parlava 8 lingue ed era un brillante predicatore." },
    "07-24": { name: "Beata Luisa di Savoia", description: "Principessa che divenne clarissa dopo la morte del marito." },
    "08-02": { name: "Nostra Signora degli Angeli della Porziuncola", description: "L'Indulgenza della Porziuncola, concessa a San Francesco da Cristo. La piccola chiesa dove nacque l'Ordine." },
    "08-07": { name: "Santi Agatangelo e Cassiano", description: "Martiri cappuccini in Etiopia." },
    "08-08": { name: "Il Santo Padre Domenico", description: "Fondatore dei domenicani, amico e contemporaneo di San Francesco." },
    "08-11": { name: "Santa Chiara d'Assisi", description: "Fondatrice delle Clarisse. Lasciò tutto per seguire Cristo sulla via di San Francesco." },
    "08-14": { name: "San Massimiliano Kolbe", description: "Francescano conventuale che diede la vita per un compagno di prigionia ad Auschwitz." },
    "08-19": { name: "San Ludovico di Tolosa", description: "Vescovo francescano che rinunciò alla corona di Napoli per la vita religiosa." },
    "08-25": { name: "San Luigi IX, Re di Francia", description: "Patrono dell'Ordine Francescano Secolare. Modello di regalità cristiana e giustizia." },
    "09-17": { name: "Impressione delle Sacre Stimmate", description: "San Francesco ricevette le Sacre Stimmate sul Monte della Verna nel 1224, primo stigmatizzato conosciuto nella storia della Chiesa." },
    "09-20": { name: "Martiri del Giappone", description: "Sei frati francescani e 17 terziari francescani tra i 26 martiri crocifissi a Nagasaki nel 1597." },
    "09-23": { name: "San Padre Pio da Pietrelcina", description: "Cappuccino stigmatizzato, confessore e mistico. Uno dei santi più popolari del XX secolo." },
    "10-03": { name: "Transito del Nostro Santo Padre Francesco", description: "Vigilia della morte di San Francesco (3 ottobre 1226). Si celebra con la solenne cerimonia del Transito." },
    "10-04": { name: "Il Nostro Santo Padre San Francesco d'Assisi", description: "Il Padre Serafico, fondatore dei tre Ordini Francescani. Patrono dell'ecologia e degli animali." },
    "10-06": { name: "Santa Maria Francesca delle Cinque Piaghe", description: "Terziaria francescana e mistica che portò le stimmate invisibili." },
    "10-10": { name: "San Daniele e Compagni", description: "Sette frati francescani martirizzati a Ceuta, Marocco, nel 1227." },
    "10-11": { name: "San Giovanni XXIII", description: "Il 'Papa Buono', francescano secolare che convocò il Concilio Vaticano II." },
    "10-22": { name: "San Giovanni Paolo II", description: "Papa strettamente legato alla spiritualità francescana, canonizzò Padre Pio e molti santi francescani." },
    "10-23": { name: "San Giovanni da Capestrano", description: "Frate francescano, predicatore e riformatore. Patrono dei cappellani militari." },
    "11-04": { name: "Commemorazione di Tutti i Defunti dell'Ordine Serafico", description: "Suffragio per la famiglia francescana: preghiera per tutti i frati, suore e terziari defunti." },
    "11-14": { name: "Beato Niccolò Stenone", description: "Scienziato e vescovo danese che divenne terziario francescano." },
    "11-17": { name: "Santa Elisabetta d'Ungheria", description: "Principessa, sposa, madre e terziaria francescana. Patrona dell'Ordine Francescano Secolare." },
    "11-24": { name: "Martiri del Vietnam", description: "Sacerdoti e fratelli francescani tra i 117 Martiri del Vietnam." },
    "11-26": { name: "Beato Solano Casey", description: "Frate cappuccino e portinaio noto per guarigioni e consiglio al Monastero di San Bonaventura, Detroit." },
    "11-28": { name: "San Giacomo della Marca", description: "Frate francescano, riformatore, predicatore e legato." },
    "11-29": { name: "Tutti i Santi dell'Ordine Serafico", description: "Celebrazione di tutti i membri canonizzati e beatificati della famiglia francescana." },
    "12-08": { name: "Immacolata Concezione della Beata Vergine Maria", description: "L'Ordine Francescano difese questo dogma per secoli prima della sua definizione nel 1854. Il Beato Duns Scoto ne fu il più grande difensore teologico." },
  },
  fr: {
    "01-16": { name: "Saints Bérard et Compagnons", description: "Premiers martyrs franciscains, tués au Maroc en 1220. Leur martyre inspira saint Antoine de Padoue à rejoindre les franciscains." },
    "02-07": { name: "Bienheureux Gilles Marie de Saint-Joseph", description: "Frère lai franciscain connu pour sa simplicité et sa dévotion au Saint-Sacrement." },
    "03-24": { name: "Saint Didace Joseph de Cadix", description: "Frère capucin et prédicateur populaire dans l'Espagne du XVIIIe siècle." },
    "04-03": { name: "Saint Benoît le Maure", description: "Fils d'esclaves africains en Sicile, frère lai franciscain connu pour son humilité et ses miracles." },
    "04-16": { name: "Sainte Bernadette Soubirous", description: "Voyante de Lourdes devenue religieuse. Liée à la famille franciscaine." },
    "04-24": { name: "Saint Fidèle de Sigmaringen", description: "Frère capucin et premier martyr de la Congrégation pour la Propagation de la Foi." },
    "04-28": { name: "Saint Louis-Marie Grignion de Montfort", description: "Prêtre fondateur de la Compagnie de Marie, associé au Tiers-Ordre Franciscain." },
    "05-16": { name: "Sainte Marguerite de Cortone", description: "Pénitente et tertiaire franciscaine. Patronne des faussement accusés et des pécheresses repenties." },
    "05-17": { name: "Saint Pascal Baylon", description: "Frère lai franciscain, patron des congrès et dévotions eucharistiques." },
    "05-20": { name: "Saint Bernardin de Sienne", description: "Grand prédicateur franciscain qui popularisa la dévotion au Saint Nom de Jésus (IHS)." },
    "05-28": { name: "Sainte Marianne de Jésus de Paredes", description: "Connue comme 'le Lys de Quito', tertiaire franciscaine et première sainte canonisée de l'Équateur." },
    "05-30": { name: "Saint Félix de Cantalice", description: "Frère lai capucin surnommé 'Frère Deo Gratias' pour son action de grâce perpétuelle." },
    "06-12": { name: "Bienheureuse Yolande de Pologne", description: "Princesse et clarissse qui donna tous ses biens pour servir les pauvres." },
    "06-13": { name: "Saint Antoine de Padoue", description: "Docteur de l'Église, patron des objets perdus. L'un des saints franciscains les plus aimés." },
    "07-08": { name: "Saints Grégoire Grassi et Compagnons", description: "Missionnaires franciscains martyrisés pendant la révolte des Boxers en Chine (1900)." },
    "07-09": { name: "Saint Nicolas Pick et Compagnons", description: "Martyrs de Gorkum : 19 religieux et prêtres séculiers tués par les calvinistes en 1572." },
    "07-12": { name: "Saintes Clémentine et Compagnes", description: "Clarisses martyrisées pendant la Révolution française en 1794." },
    "07-15": { name: "Saint Bonaventure", description: "Docteur de l'Église, Ministre Général de l'Ordre, connu comme le 'Docteur Séraphique'." },
    "07-21": { name: "Saint Laurent de Brindes", description: "Frère capucin, Docteur de l'Église, parlait 8 langues et fut un brillant prédicateur." },
    "07-24": { name: "Bienheureuse Louise de Savoie", description: "Princesse devenue clarisse après la mort de son époux." },
    "08-02": { name: "Notre-Dame des Anges de la Portioncule", description: "L'Indulgence de la Portioncule, accordée à saint François par le Christ. La petite église où l'Ordre est né." },
    "08-07": { name: "Saints Agathange et Cassien", description: "Martyrs capucins en Éthiopie." },
    "08-08": { name: "Le Saint Père Dominique", description: "Fondateur des dominicains, ami et contemporain de saint François." },
    "08-11": { name: "Sainte Claire d'Assise", description: "Fondatrice des Clarisses. Elle quitta tout pour suivre le Christ à la manière de saint François." },
    "08-14": { name: "Saint Maximilien Kolbe", description: "Franciscain conventuel qui donna sa vie pour un compagnon de captivité à Auschwitz." },
    "08-19": { name: "Saint Louis de Toulouse", description: "Évêque franciscain qui renonça à la couronne de Naples pour la vie religieuse." },
    "08-25": { name: "Saint Louis IX, Roi de France", description: "Patron de l'Ordre Franciscain Séculier. Modèle de royauté chrétienne et de justice." },
    "09-17": { name: "Impression des Sacrés Stigmates", description: "Saint François reçut les Sacrés Stigmates au Mont Alverne en 1224, premier stigmatisé connu dans l'histoire de l'Église." },
    "09-20": { name: "Martyrs du Japon", description: "Six frères franciscains et 17 tertiaires franciscains parmi les 26 martyrs crucifiés à Nagasaki en 1597." },
    "09-23": { name: "Saint Padre Pio de Pietrelcina", description: "Capucin stigmatisé, confesseur et mystique. L'un des saints les plus populaires du XXe siècle." },
    "10-03": { name: "Transitus de Notre Saint Père François", description: "Veille de la mort de saint François (3 octobre 1226). Célébré avec la cérémonie solennelle du Transitus." },
    "10-04": { name: "Notre Saint Père Saint François d'Assise", description: "Le Père Séraphique, fondateur des trois Ordres Franciscains. Patron de l'écologie et des animaux." },
    "10-06": { name: "Sainte Marie-Françoise des Cinq-Plaies", description: "Tertiaire franciscaine et mystique qui porta les stigmates invisibles." },
    "10-10": { name: "Saint Daniel et Compagnons", description: "Sept frères franciscains martyrisés à Ceuta, au Maroc, en 1227." },
    "10-11": { name: "Saint Jean XXIII", description: "Le 'Bon Pape', franciscain séculier qui convoqua le concile Vatican II." },
    "10-22": { name: "Saint Jean-Paul II", description: "Pape étroitement lié à la spiritualité franciscaine, il canonisa Padre Pio et de nombreux saints franciscains." },
    "10-23": { name: "Saint Jean de Capistran", description: "Frère franciscain, prédicateur et réformateur. Patron des aumôniers militaires." },
    "11-04": { name: "Commémoration de Tous les Défunts de l'Ordre Séraphique", description: "Jour des défunts de la famille franciscaine : prière pour tous les frères, sœurs et tertiaires décédés." },
    "11-14": { name: "Bienheureux Nicolas Sténon", description: "Scientifique et évêque danois devenu tertiaire franciscain." },
    "11-17": { name: "Sainte Élisabeth de Hongrie", description: "Princesse, épouse, mère et tertiaire franciscaine. Patronne de l'Ordre Franciscain Séculier." },
    "11-24": { name: "Martyrs du Vietnam", description: "Prêtres et frères franciscains parmi les 117 Martyrs du Vietnam." },
    "11-26": { name: "Bienheureux Solanus Casey", description: "Frère capucin et portier connu pour ses guérisons et ses conseils au monastère Saint-Bonaventure de Detroit." },
    "11-28": { name: "Saint Jacques de la Marche", description: "Frère franciscain, réformateur, prédicateur et légat." },
    "11-29": { name: "Tous les Saints de l'Ordre Séraphique", description: "Célébration de tous les membres canonisés et béatifiés de la famille franciscaine." },
    "12-08": { name: "Immaculée Conception de la Bienheureuse Vierge Marie", description: "L'Ordre Franciscain défendit ce dogme pendant des siècles avant sa définition en 1854. Le Bienheureux Duns Scot en fut le plus grand défenseur théologique." },
  },
  zh: {
    "01-16": { name: "圣伯纳德及同伴殉道者", description: "方济各会首批殉道者，1220年在摩洛哥殉道。他们的殉道激励了圣安多尼加入方济各会。" },
    "02-07": { name: "真福圣若瑟的吉尔斯·玛利亚", description: "方济各会平信徒修士，以纯朴和对圣体圣事的虔敬著称。" },
    "03-24": { name: "圣加的斯的迪达古", description: "十八世纪西班牙的嘉布遣会会士和著名传教士。" },
    "04-03": { name: "圣本笃·摩尔", description: "西西里非洲奴隶之子，方济各会平信徒修士，以谦逊和奇迹著称。" },
    "04-16": { name: "圣女伯尔纳德", description: "露德圣母显现的见证者，后成为修女。与方济各大家庭有关。" },
    "04-24": { name: "圣斐德理", description: "嘉布遣会会士，传信部首位殉道者。" },
    "04-28": { name: "圣路易·玛利亚·格利尼翁·德·孟福", description: "圣母会创始人司铎，与方济各第三会有联系。" },
    "05-16": { name: "圣女玛加利大·科尔托纳", description: "悔罪者和方济各第三会会员。被诬告者和悔改者的主保。" },
    "05-17": { name: "圣巴斯卦·巴依隆", description: "方济各会平信徒修士，圣体大会和圣体敬礼的主保。" },
    "05-20": { name: "圣伯纳定·锡耶纳", description: "伟大的方济各会传教士，推广了对耶稣圣名（IHS）的敬礼。" },
    "05-28": { name: "圣女玛利亚·安娜·德·帕雷德斯", description: "被誉为'基多百合'，方济各第三会会员，厄瓜多尔首位封圣的圣人。" },
    "05-30": { name: "圣斐理斯·坎塔利切", description: "嘉布遣会平信徒修士，因常说'感谢天主'而被称为'感恩修士'。" },
    "06-12": { name: "真福波兰的约兰达", description: "公主和贫穷修女，捐出全部财产服务穷人。" },
    "06-13": { name: "圣安多尼·帕多瓦", description: "教会圣师，失物主保。最受敬爱的方济各会圣人之一。" },
    "07-08": { name: "圣额我略·格拉西及同伴殉道者", description: "1900年在中国义和团运动中殉道的方济各会传教士。" },
    "07-09": { name: "圣尼各老·皮克及同伴殉道者", description: "高尔库姆殉道者——1572年被加尔文派杀害的19位修会人士和教区司铎。" },
    "07-12": { name: "圣女克莱门蒂纳及同伴殉道者", description: "1794年法国大革命中殉道的贫穷修女。" },
    "07-15": { name: "圣文德", description: "教会圣师，修会总会长，被称为'天使博士'。" },
    "07-21": { name: "圣老楞佐·布林迪西", description: "嘉布遣会会士，教会圣师，精通八种语言，杰出的传教士。" },
    "07-24": { name: "真福萨伏依的路易丝", description: "丈夫去世后成为贫穷修女的公主。" },
    "08-02": { name: "天使之后宝尊堂圣母", description: "基督赐予圣方济各的宝尊堂大赦。修会诞生的小教堂。" },
    "08-07": { name: "圣阿加塔安杰洛与圣加西安", description: "在埃塞俄比亚殉道的嘉布遣会会士。" },
    "08-08": { name: "圣父道明", description: "道明会创始人，圣方济各的朋友和同时代人。" },
    "08-11": { name: "圣女佳兰", description: "贫穷修女会创始人。她舍弃一切，追随圣方济各的道路效法基督。" },
    "08-14": { name: "圣马西米利安·高比", description: "方济各住院会会士，在奥斯维辛集中营替一位狱友献出生命。" },
    "08-19": { name: "圣路易·图卢兹", description: "方济各会主教，放弃那不勒斯王位选择修道生活。" },
    "08-25": { name: "圣路易九世·法国国王", description: "方济各在俗会主保。基督徒君王和正义的典范。" },
    "09-17": { name: "圣印五伤", description: "圣方济各于1224年在拉韦尔纳山上领受了圣印五伤，是教会历史上已知的第一位受五伤者。" },
    "09-20": { name: "日本殉道者", description: "1597年在长崎被钉十字架的26位殉道者中，有六位方济各会会士和17位方济各第三会会员。" },
    "09-23": { name: "圣庇护神父", description: "嘉布遣会五伤圣人、告解神师和神秘家。二十世纪最受欢迎的圣人之一。" },
    "10-03": { name: "会祖圣方济各善终纪念", description: "圣方济各逝世前夕（1226年10月3日）。以隆重的善终礼仪庆祝。" },
    "10-04": { name: "会祖圣方济各·亚西西", description: "炽爱天父，方济各三会的创始人。生态和动物的主保。" },
    "10-06": { name: "圣女五伤的玛利亚·方济加", description: "方济各第三会会员和神秘家，身负隐形五伤。" },
    "10-10": { name: "圣达尼尔及同伴殉道者", description: "1227年在摩洛哥休达殉道的七位方济各会会士。" },
    "10-11": { name: "圣若望二十三世", description: "'善良的教宗'，方济各在俗会会员，召开了梵蒂冈第二次大公会议。" },
    "10-22": { name: "圣若望保禄二世", description: "与方济各灵修密切相关的教宗，封圣了庇护神父和众多方济各会圣人。" },
    "10-23": { name: "圣若望·加彼当", description: "方济各会会士、传教士和改革者。军队随营司铎的主保。" },
    "11-04": { name: "天使修会已亡诸信者纪念日", description: "方济各大家庭的追思日——为所有已故会士、修女和第三会会员祈祷。" },
    "11-14": { name: "真福尼古拉·斯坦诺", description: "丹麦科学家兼主教，后成为方济各第三会会员。" },
    "11-17": { name: "圣女依撒伯尔·匈牙利", description: "公主、妻子、母亲和方济各第三会会员。方济各在俗会主保。" },
    "11-24": { name: "越南殉道者", description: "117位越南殉道者中的方济各会司铎和修士。" },
    "11-26": { name: "真福索拉诺·凯西", description: "嘉布遣会会士和守门人，以在底特律圣文德隐修院的治愈和劝导著称。" },
    "11-28": { name: "圣雅各伯·马尔凯", description: "方济各会会士、改革者、传教士和教廷特使。" },
    "11-29": { name: "天使修会诸圣节", description: "庆祝方济各大家庭中所有列圣列品的成员。" },
    "12-08": { name: "圣母无染原罪瞻礼", description: "方济各会在1854年信理定义之前数世纪一直捍卫此信条。真福邓斯·司各脱是其最伟大的神学辩护者。" },
  },
};
