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
};
