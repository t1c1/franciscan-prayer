export interface FranciscanQuote {
  text: string;
  author: string;
  source?: string;
}

const QUOTES: FranciscanQuote[] = [
  // St. Francis of Assisi
  { text: "Lord, make me an instrument of your peace. Where there is hatred, let me sow love.", author: "St. Francis of Assisi", source: "Prayer of St. Francis" },
  { text: "Start by doing what is necessary; then do what is possible; and suddenly you are doing the impossible.", author: "St. Francis of Assisi" },
  { text: "For it is in giving that we receive.", author: "St. Francis of Assisi", source: "Prayer of St. Francis" },
  { text: "Preach the Gospel at all times. When necessary, use words.", author: "St. Francis of Assisi" },
  { text: "All the darkness in the world cannot extinguish the light of a single candle.", author: "St. Francis of Assisi" },
  { text: "Where there is charity and wisdom, there is neither fear nor ignorance.", author: "St. Francis of Assisi", source: "Admonitions XXVII" },
  { text: "If God can work through me, He can work through anyone.", author: "St. Francis of Assisi" },
  { text: "Be praised, my Lord, through all your creatures, especially through my lord Brother Sun.", author: "St. Francis of Assisi", source: "Canticle of the Sun" },
  { text: "Above all the grace and the gifts that Christ gives to His beloved is that of overcoming self.", author: "St. Francis of Assisi" },
  { text: "Remember that when you leave this earth, you can take with you nothing that you have received — only what you have given.", author: "St. Francis of Assisi" },
  { text: "While you are proclaiming peace with your lips, be careful to have it even more fully in your heart.", author: "St. Francis of Assisi" },
  { text: "It is no use walking anywhere to preach unless our walking is our preaching.", author: "St. Francis of Assisi" },
  { text: "Blessed is the servant who loves his brother as much when he is sick and useless as when he is well and can be of service.", author: "St. Francis of Assisi", source: "Admonitions XXIV" },
  { text: "The deeds you do may be the only sermon some persons will hear today.", author: "St. Francis of Assisi" },
  { text: "Hold back nothing of yourselves for yourselves, so that He who gives Himself totally to you may receive you totally.", author: "St. Francis of Assisi", source: "Letter to the Entire Order" },

  // St. Clare of Assisi
  { text: "Love that cannot suffer is not worthy of that name.", author: "St. Clare of Assisi" },
  { text: "We become what we love and who we love shapes what we become.", author: "St. Clare of Assisi" },
  { text: "Go forth in peace, for you have followed the good road. Go forth without fear, for He who created you has made you holy.", author: "St. Clare of Assisi" },
  { text: "Place your mind before the mirror of eternity! Place your soul in the brilliance of glory!", author: "St. Clare of Assisi", source: "Third Letter to Agnes of Prague" },
  { text: "Gaze upon Him, consider Him, contemplate Him, as you desire to imitate Him.", author: "St. Clare of Assisi", source: "Second Letter to Agnes of Prague" },

  // St. Bonaventure
  { text: "In beautiful things St. Francis saw Beauty itself, and through His vestiges imprinted on creation he followed his Beloved everywhere.", author: "St. Bonaventure", source: "Major Life of St. Francis" },
  { text: "If you learn everything except Christ, you learn nothing. If you learn nothing except Christ, you learn everything.", author: "St. Bonaventure" },
  { text: "The perfection of a religious man is to do common things in a perfect manner.", author: "St. Bonaventure" },

  // St. Anthony of Padua
  { text: "Actions speak louder than words; let your words teach and your actions speak.", author: "St. Anthony of Padua" },
  { text: "The life of the body is the soul; the life of the soul is God.", author: "St. Anthony of Padua" },
  { text: "Attribute to God every good that you have received. If you take credit for something that does not belong to you, you will be guilty of theft.", author: "St. Anthony of Padua" },

  // St. Padre Pio
  { text: "Pray, hope, and don't worry. Worry is useless. God is merciful and will hear your prayer.", author: "St. Padre Pio" },
  { text: "The life of a Christian is nothing but a perpetual struggle against self.", author: "St. Padre Pio" },
  { text: "Prayer is the best weapon we have; it is the key to God's heart.", author: "St. Padre Pio" },

  // St. Maximilian Kolbe (Conventual Franciscan)
  { text: "No one in the world can change Truth. What we can do and should do is to seek truth and to serve it when we have found it.", author: "St. Maximilian Kolbe" },
  { text: "The most deadly poison of our time is indifference.", author: "St. Maximilian Kolbe" },

  // Bl. John Duns Scotus (Franciscan theologian)
  { text: "God, in His most free act of loving, does not love necessarily anything other than Himself.", author: "Bl. John Duns Scotus", source: "Ordinatio" },

  // St. Elizabeth of Hungary (Secular Franciscan)
  { text: "How could I bear a crown of gold when the Lord bears a crown of thorns and bears it for me?", author: "St. Elizabeth of Hungary" },

  // St. Joseph of Cupertino
  { text: "O God, I offer Thee my liberty, my memory, my understanding, and my will.", author: "St. Joseph of Cupertino" },

  // Franciscan traditional
  { text: "Pax et Bonum — Peace and All Good.", author: "Franciscan greeting" },
  { text: "Let us begin again, for up to now we have done nothing.", author: "St. Francis of Assisi" },
  { text: "Lord, grant me the treasure of sublime poverty.", author: "St. Francis of Assisi" },
];

export function getDailyQuote(): FranciscanQuote {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return QUOTES[dayOfYear % QUOTES.length];
}

export function getRandomQuote(): FranciscanQuote {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}
