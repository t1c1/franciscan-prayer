export interface CrownMystery {
  number: number;
  title: string;
  scripture: string;
  fruit: string;
}

// The Franciscan Crown Rosary — 7 Decades for the 7 Joys of Mary
export const CROWN_MYSTERIES: CrownMystery[] = [
  {
    number: 1,
    title: "The Annunciation",
    scripture: "The Angel Gabriel was sent by God to a town called Nazareth, to a virgin betrothed to a man named Joseph. The angel said to her: 'Rejoice, full of grace, the Lord is with you.' (Luke 1:26-28)",
    fruit: "Humility",
  },
  {
    number: 2,
    title: "The Visitation",
    scripture: "Mary set out and went with haste to a town in the hill country of Judea, where she entered the house of Zechariah and greeted Elizabeth. When Elizabeth heard Mary's greeting, the child leaped in her womb. (Luke 1:39-42)",
    fruit: "Charity toward neighbor",
  },
  {
    number: 3,
    title: "The Nativity of Our Lord",
    scripture: "She gave birth to her firstborn son and wrapped him in swaddling clothes, and laid him in a manger, because there was no room for them in the inn. (Luke 2:6-7)",
    fruit: "Poverty of spirit & detachment",
  },
  {
    number: 4,
    title: "The Adoration of the Magi",
    scripture: "On entering the house, they saw the child with Mary his mother; and they knelt down and paid him homage. Then, opening their treasure chests, they offered him gifts of gold, frankincense, and myrrh. (Matthew 2:11)",
    fruit: "Worship of Christ",
  },
  {
    number: 5,
    title: "The Finding of the Child Jesus in the Temple",
    scripture: "After three days they found him in the temple, sitting among the teachers, listening to them and asking them questions. And all who heard him were amazed at his understanding and his answers. (Luke 2:46-47)",
    fruit: "True joy in finding Christ",
  },
  {
    number: 6,
    title: "The Resurrection",
    scripture: "He is not here; he has been raised. Remember how he told you, while he was still in Galilee, that the Son of Man must be handed over to sinners, and be crucified, and on the third day rise again. (Luke 24:6-7)",
    fruit: "Faith",
  },
  {
    number: 7,
    title: "The Assumption & Coronation of the Blessed Virgin Mary",
    scripture: "A great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars. (Revelation 12:1)",
    fruit: "Grace of a happy death & union with Christ",
  },
];

export const CROWN_INSTRUCTIONS = {
  en: `The Franciscan Crown Rosary (also called the Seraphic Rosary) consists of 7 decades, each honoring one of the Seven Joys of the Blessed Virgin Mary.

How to pray:
1. Begin with the Sign of the Cross
2. For each of the 7 mysteries, pray 1 Our Father and 10 Hail Marys
3. After the 7 decades (70 Hail Marys), add 2 more Hail Marys to reach 72 — honoring the traditional years of Our Lady's earthly life
4. Conclude with 1 Our Father, 1 Hail Mary, and 1 Glory Be for the intentions of the Holy Father

Total: 7 Our Fathers + 72 Hail Marys + closing prayers`,

  es: `La Corona Franciscana (también llamada Rosario Seráfico) consiste en 7 decenas, cada una honrando uno de los Siete Gozos de la Santísima Virgen María.

Cómo rezar:
1. Comience con la Señal de la Cruz
2. Para cada uno de los 7 misterios, rece 1 Padre Nuestro y 10 Ave Marías
3. Después de las 7 decenas (70 Ave Marías), añada 2 Ave Marías más para llegar a 72 — honrando los años tradicionales de la vida terrenal de Nuestra Señora
4. Concluya con 1 Padre Nuestro, 1 Ave María y 1 Gloria al Padre por las intenciones del Santo Padre

Total: 7 Padre Nuestros + 72 Ave Marías + oraciones finales`,

  it: `La Corona Francescana (detta anche Rosario Serafico) consiste di 7 decine, ciascuna in onore di una delle Sette Gioie della Beata Vergine Maria.

Come pregare:
1. Inizia con il Segno della Croce
2. Per ognuno dei 7 misteri, prega 1 Padre Nostro e 10 Ave Maria
3. Dopo le 7 decine (70 Ave Maria), aggiungi altre 2 Ave Maria per raggiungere 72 — in onore degli anni tradizionali della vita terrena di Nostra Signora
4. Concludi con 1 Padre Nostro, 1 Ave Maria e 1 Gloria al Padre per le intenzioni del Santo Padre

Totale: 7 Padre Nostro + 72 Ave Maria + preghiere finali`,

  fr: `La Couronne Franciscaine (également appelée Rosaire Séraphique) se compose de 7 dizaines, chacune honorant l'une des Sept Joies de la Bienheureuse Vierge Marie.

Comment prier :
1. Commencez par le Signe de la Croix
2. Pour chacun des 7 mystères, priez 1 Notre Père et 10 Je vous salue Marie
3. Après les 7 dizaines (70 Je vous salue Marie), ajoutez 2 Je vous salue Marie supplémentaires pour atteindre 72 — en l'honneur des années traditionnelles de la vie terrestre de Notre Dame
4. Concluez avec 1 Notre Père, 1 Je vous salue Marie et 1 Gloire au Père aux intentions du Saint-Père

Total : 7 Notre Père + 72 Je vous salue Marie + prières de conclusion`,

  zh: `方济各圣冠玫瑰经（又称炽爱天神玫瑰经）由七端组成，每一端敬礼圣母玛利亚的七件喜乐之一。

诵念方法：
1. 以十字圣号开始
2. 每一端诵念天主经一遍和圣母经十遍
3. 七端完毕后（共七十遍圣母经），再加念两遍圣母经，凑成七十二遍——纪念圣母在世的传统年岁
4. 最后以天主经一遍、圣母经一遍、圣三光荣颂一遍，为教宗的意向祈祷作结

总计：天主经七遍 + 圣母经七十二遍 + 结束祈祷`,
};

export const CROWN_I18N: Record<string, { title: string; scripture: string; fruit: string }[]> = {
  es: [
    {
      title: "La Anunciación",
      scripture: "El ángel Gabriel fue enviado por Dios a una ciudad de Galilea llamada Nazaret, a una virgen desposada con un hombre llamado José. El ángel le dijo: 'Alégrate, llena de gracia, el Señor está contigo.' (Lucas 1:26-28)",
      fruit: "Humildad",
    },
    {
      title: "La Visitación",
      scripture: "María se puso en camino y fue con prontitud a una ciudad de la montaña de Judá, donde entró en casa de Zacarías y saludó a Isabel. Cuando Isabel oyó el saludo de María, el niño saltó en su seno. (Lucas 1:39-42)",
      fruit: "Caridad con el prójimo",
    },
    {
      title: "La Natividad de Nuestro Señor",
      scripture: "Dio a luz a su hijo primogénito y lo envolvió en pañales, y lo acostó en un pesebre, porque no había lugar para ellos en la posada. (Lucas 2:6-7)",
      fruit: "Pobreza de espíritu y desapego",
    },
    {
      title: "La Adoración de los Magos",
      scripture: "Al entrar en la casa, vieron al niño con María su madre, y postrándose le adoraron. Luego, abriendo sus cofres, le ofrecieron regalos de oro, incienso y mirra. (Mateo 2:11)",
      fruit: "Adoración a Cristo",
    },
    {
      title: "El Hallazgo del Niño Jesús en el Templo",
      scripture: "Al cabo de tres días lo encontraron en el templo, sentado en medio de los doctores, escuchándoles y haciéndoles preguntas. Todos los que le oían estaban asombrados de su inteligencia y de sus respuestas. (Lucas 2:46-47)",
      fruit: "Verdadera alegría al encontrar a Cristo",
    },
    {
      title: "La Resurrección",
      scripture: "No está aquí; ha resucitado. Recuerden cómo les habló estando aún en Galilea, diciendo que el Hijo del Hombre debía ser entregado en manos de los pecadores, ser crucificado, y al tercer día resucitar. (Lucas 24:6-7)",
      fruit: "Fe",
    },
    {
      title: "La Asunción y Coronación de la Santísima Virgen María",
      scripture: "Apareció una gran señal en el cielo: una mujer vestida del sol, con la luna bajo sus pies, y sobre su cabeza una corona de doce estrellas. (Apocalipsis 12:1)",
      fruit: "Gracia de una buena muerte y unión con Cristo",
    },
  ],
  it: [
    {
      title: "L'Annunciazione",
      scripture: "L'angelo Gabriele fu mandato da Dio in una città della Galilea chiamata Nazaret, a una vergine promessa sposa di un uomo chiamato Giuseppe. L'angelo le disse: 'Rallégrati, piena di grazia, il Signore è con te.' (Luca 1:26-28)",
      fruit: "Umiltà",
    },
    {
      title: "La Visitazione",
      scripture: "Maria si mise in viaggio e andò in fretta verso una città di Giuda nella regione montuosa, dove entrò nella casa di Zaccaria e salutò Elisabetta. Quando Elisabetta udì il saluto di Maria, il bambino le sussultò nel grembo. (Luca 1:39-42)",
      fruit: "Carità verso il prossimo",
    },
    {
      title: "La Natività del Signore",
      scripture: "Diede alla luce il suo figlio primogenito, lo avvolse in fasce e lo depose in una mangiatoia, perché per loro non c'era posto nell'albergo. (Luca 2:6-7)",
      fruit: "Povertà di spirito e distacco",
    },
    {
      title: "L'Adorazione dei Magi",
      scripture: "Entrati nella casa, videro il bambino con Maria sua madre, e prostratisi lo adorarono. Poi, aperti i loro scrigni, gli offrirono in dono oro, incenso e mirra. (Matteo 2:11)",
      fruit: "Adorazione di Cristo",
    },
    {
      title: "Il Ritrovamento di Gesù Bambino nel Tempio",
      scripture: "Dopo tre giorni lo trovarono nel tempio, seduto in mezzo ai dottori, mentre li ascoltava e li interrogava. Tutti quelli che l'udivano erano pieni di stupore per la sua intelligenza e le sue risposte. (Luca 2:46-47)",
      fruit: "Vera gioia nel trovare Cristo",
    },
    {
      title: "La Risurrezione",
      scripture: "Non è qui; è risorto. Ricordate come vi parlò quando era ancora in Galilea, dicendo che il Figlio dell'uomo doveva essere consegnato nelle mani dei peccatori, essere crocifisso, e il terzo giorno risorgere. (Luca 24:6-7)",
      fruit: "Fede",
    },
    {
      title: "L'Assunzione e l'Incoronazione della Beata Vergine Maria",
      scripture: "Nel cielo apparve un segno grandioso: una donna vestita di sole, con la luna sotto i suoi piedi, e sul suo capo una corona di dodici stelle. (Apocalisse 12:1)",
      fruit: "Grazia di una buona morte e unione con Cristo",
    },
  ],
  fr: [
    {
      title: "L'Annonciation",
      scripture: "L'ange Gabriel fut envoyé par Dieu dans une ville de Galilée appelée Nazareth, à une vierge fiancée à un homme nommé Joseph. L'ange lui dit : 'Réjouis-toi, comblée de grâce, le Seigneur est avec toi.' (Luc 1:26-28)",
      fruit: "Humilité",
    },
    {
      title: "La Visitation",
      scripture: "Marie se mit en route et se rendit en hâte vers une ville de la montagne de Juda, où elle entra dans la maison de Zacharie et salua Élisabeth. Quand Élisabeth entendit la salutation de Marie, l'enfant tressaillit dans son sein. (Luc 1:39-42)",
      fruit: "Charité envers le prochain",
    },
    {
      title: "La Nativité de Notre Seigneur",
      scripture: "Elle mit au monde son fils premier-né, l'enveloppa de langes et le coucha dans une crèche, parce qu'il n'y avait pas de place pour eux dans la salle. (Luc 2:6-7)",
      fruit: "Pauvreté d'esprit et détachement",
    },
    {
      title: "L'Adoration des Mages",
      scripture: "En entrant dans la maison, ils virent l'enfant avec Marie sa mère ; et, se prosternant, ils lui rendirent hommage. Puis, ouvrant leurs coffrets, ils lui offrirent en présent de l'or, de l'encens et de la myrrhe. (Matthieu 2:11)",
      fruit: "Adoration du Christ",
    },
    {
      title: "Le Recouvrement de l'Enfant Jésus au Temple",
      scripture: "Au bout de trois jours, ils le trouvèrent dans le temple, assis au milieu des docteurs, les écoutant et les interrogeant. Tous ceux qui l'entendaient étaient stupéfaits de son intelligence et de ses réponses. (Luc 2:46-47)",
      fruit: "Vraie joie de retrouver le Christ",
    },
    {
      title: "La Résurrection",
      scripture: "Il n'est pas ici ; il est ressuscité. Rappelez-vous ce qu'il vous a dit quand il était encore en Galilée : il faut que le Fils de l'homme soit livré aux mains des pécheurs, qu'il soit crucifié, et qu'il ressuscite le troisième jour. (Luc 24:6-7)",
      fruit: "Foi",
    },
    {
      title: "L'Assomption et le Couronnement de la Bienheureuse Vierge Marie",
      scripture: "Un grand signe apparut dans le ciel : une femme revêtue du soleil, la lune sous ses pieds, et sur sa tête une couronne de douze étoiles. (Apocalypse 12:1)",
      fruit: "Grâce d'une bonne mort et union avec le Christ",
    },
  ],
  zh: [
    {
      title: "天使报喜",
      scripture: "天主派遣天使加俾额尔到加里肋亚一座名叫纳匝肋的城去，到一位与名叫若瑟的男子订了婚的童贞女那里。天使对她说：'万福，充满恩宠者，上主与你同在。'（路加福音 1:26-28）",
      fruit: "谦逊",
    },
    {
      title: "圣母往见圣妇依撒伯尔",
      scripture: "玛利亚起身，急忙往山区犹大的一座城去，进了匝加利亚的家，问候了依撒伯尔。依撒伯尔一听到玛利亚问安，胎儿就在她腹中跳跃。（路加福音 1:39-42）",
      fruit: "爱德",
    },
    {
      title: "吾主耶稣诞生",
      scripture: "她生了头胎男儿，用襁褓裹起，放在马槽里，因为在客栈中为他们没有地方。（路加福音 2:6-7）",
      fruit: "神贫与超脱",
    },
    {
      title: "三王来朝",
      scripture: "他们进了屋内，看见婴儿和他的母亲玛利亚，遂俯伏朝拜了他。然后打开自己的宝匣，给他奉献了礼物，即黄金、乳香和没药。（玛窦福音 2:11）",
      fruit: "朝拜基督",
    },
    {
      title: "耶稣在圣殿中被寻获",
      scripture: "过了三天，他们在圣殿里找到了他，坐在经师中间，一面听他们，一面问他们。凡听见他的人，都对他的聪明和应对惊奇不已。（路加福音 2:46-47）",
      fruit: "寻获基督的真喜乐",
    },
    {
      title: "耶稣复活",
      scripture: "他不在这里了；他已经复活了。你们应当记得他还在加里肋亚时怎样告诉过你们，说人子必须被交于罪人之手，被钉在十字架上，并且第三天要复活。（路加福音 24:6-7）",
      fruit: "信德",
    },
    {
      title: "圣母蒙召升天与加冕",
      scripture: "天上出现了一个大异兆：有一个女人，身披太阳，脚踏月亮，头戴十二颗星的荣冠。（默示录 12:1）",
      fruit: "善终之恩与和基督结合",
    },
  ],
};
