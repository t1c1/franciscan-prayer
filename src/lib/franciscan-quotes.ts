export interface FranciscanQuote {
  text: string;
  author: string;
  source?: string;
}

export const QUOTES: FranciscanQuote[] = [
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

export const QUOTES_I18N: Record<string, { text: string; author: string; source?: string }[]> = {
  es: [
    // San Francisco de Asís
    { text: "Señor, haz de mí un instrumento de tu paz. Donde haya odio, que yo siembre amor.", author: "San Francisco de Asís", source: "Oración de San Francisco" },
    { text: "Comienza haciendo lo necesario; después haz lo posible; y de pronto estarás haciendo lo imposible.", author: "San Francisco de Asís" },
    { text: "Porque es dando como recibimos.", author: "San Francisco de Asís", source: "Oración de San Francisco" },
    { text: "Predica el Evangelio en todo momento. Cuando sea necesario, usa palabras.", author: "San Francisco de Asís" },
    { text: "Toda la oscuridad del mundo no puede apagar la luz de una sola vela.", author: "San Francisco de Asís" },
    { text: "Donde hay caridad y sabiduría, no hay temor ni ignorancia.", author: "San Francisco de Asís", source: "Admoniciones XXVII" },
    { text: "Si Dios puede obrar a través de mí, puede obrar a través de cualquiera.", author: "San Francisco de Asís" },
    { text: "Alabado seas, mi Señor, por todas tus criaturas, especialmente por el señor Hermano Sol.", author: "San Francisco de Asís", source: "Cántico de las Criaturas" },
    { text: "Sobre todas las gracias y dones que Cristo da a sus amados está el de vencerse a sí mismo.", author: "San Francisco de Asís" },
    { text: "Recuerda que cuando dejes esta tierra, no podrás llevarte nada de lo que has recibido — solo lo que has dado.", author: "San Francisco de Asís" },
    { text: "Mientras proclamas la paz con tus labios, cuida de tenerla aún más plenamente en tu corazón.", author: "San Francisco de Asís" },
    { text: "De nada sirve caminar a ningún lugar a predicar si nuestro caminar no es nuestra predicación.", author: "San Francisco de Asís" },
    { text: "Bienaventurado el siervo que ama a su hermano tanto cuando está enfermo e inútil como cuando está sano y puede serle de provecho.", author: "San Francisco de Asís", source: "Admoniciones XXIV" },
    { text: "Las obras que haces pueden ser el único sermón que algunas personas escuchen hoy.", author: "San Francisco de Asís" },
    { text: "No guardéis nada de vosotros para vosotros, para que Aquel que se entrega totalmente a vosotros os reciba totalmente.", author: "San Francisco de Asís", source: "Carta a toda la Orden" },
    // Santa Clara de Asís
    { text: "El amor que no puede sufrir no es digno de tal nombre.", author: "Santa Clara de Asís" },
    { text: "Nos convertimos en lo que amamos y a quien amamos moldea lo que llegamos a ser.", author: "Santa Clara de Asís" },
    { text: "Ve en paz, porque has seguido el buen camino. Ve sin temor, pues quien te creó te ha hecho santa.", author: "Santa Clara de Asís" },
    { text: "¡Pon tu mente ante el espejo de la eternidad! ¡Pon tu alma en el esplendor de la gloria!", author: "Santa Clara de Asís", source: "Tercera Carta a Inés de Praga" },
    { text: "Míralo, considéralo, contempla-lo, deseando imitarlo.", author: "Santa Clara de Asís", source: "Segunda Carta a Inés de Praga" },
    // San Buenaventura
    { text: "En las cosas bellas, San Francisco veía la Belleza misma, y a través de sus vestigios impresos en la creación seguía a su Amado a todas partes.", author: "San Buenaventura", source: "Leyenda Mayor de San Francisco" },
    { text: "Si aprendes todo excepto a Cristo, no aprendes nada. Si no aprendes nada excepto a Cristo, lo aprendes todo.", author: "San Buenaventura" },
    { text: "La perfección de un religioso es hacer las cosas comunes de manera perfecta.", author: "San Buenaventura" },
    // San Antonio de Padua
    { text: "Las acciones hablan más fuerte que las palabras; que tus palabras enseñen y tus acciones hablen.", author: "San Antonio de Padua" },
    { text: "La vida del cuerpo es el alma; la vida del alma es Dios.", author: "San Antonio de Padua" },
    { text: "Atribuye a Dios todo bien que hayas recibido. Si te atribuyes algo que no te pertenece, serás culpable de robo.", author: "San Antonio de Padua" },
    // San Padre Pío
    { text: "Reza, espera y no te preocupes. La preocupación es inútil. Dios es misericordioso y escuchará tu oración.", author: "San Padre Pío" },
    { text: "La vida de un cristiano no es más que una lucha perpetua contra sí mismo.", author: "San Padre Pío" },
    { text: "La oración es la mejor arma que tenemos; es la llave del corazón de Dios.", author: "San Padre Pío" },
    // San Maximiliano Kolbe
    { text: "Nadie en el mundo puede cambiar la Verdad. Lo que podemos y debemos hacer es buscar la verdad y servirla cuando la hayamos encontrado.", author: "San Maximiliano Kolbe" },
    { text: "El veneno más mortal de nuestro tiempo es la indiferencia.", author: "San Maximiliano Kolbe" },
    // Beato Juan Duns Escoto
    { text: "Dios, en su acto más libre de amar, no ama necesariamente nada fuera de Sí mismo.", author: "Beato Juan Duns Escoto", source: "Ordinatio" },
    // Santa Isabel de Hungría
    { text: "¿Cómo podría llevar una corona de oro cuando el Señor lleva una corona de espinas, y la lleva por mí?", author: "Santa Isabel de Hungría" },
    // San José de Cupertino
    { text: "Oh Dios, te ofrezco mi libertad, mi memoria, mi entendimiento y mi voluntad.", author: "San José de Cupertino" },
    // Franciscano tradicional
    { text: "Pax et Bonum — Paz y Bien.", author: "Saludo franciscano" },
    { text: "Comencemos de nuevo, porque hasta ahora no hemos hecho nada.", author: "San Francisco de Asís" },
    { text: "Señor, concédeme el tesoro de la sublime pobreza.", author: "San Francisco de Asís" },
  ],
  it: [
    // San Francesco d'Assisi
    { text: "Signore, fa' di me uno strumento della tua pace. Dove è odio, fa' ch'io porti l'amore.", author: "San Francesco d'Assisi", source: "Preghiera di San Francesco" },
    { text: "Comincia col fare il necessario; poi fai ciò che è possibile; e all'improvviso ti ritrovi a fare l'impossibile.", author: "San Francesco d'Assisi" },
    { text: "Perché è dando che si riceve.", author: "San Francesco d'Assisi", source: "Preghiera di San Francesco" },
    { text: "Predica il Vangelo in ogni momento. Se necessario, usa le parole.", author: "San Francesco d'Assisi" },
    { text: "Tutta l'oscurità del mondo non può spegnere la luce di una singola candela.", author: "San Francesco d'Assisi" },
    { text: "Dove c'è carità e sapienza, ivi non è né timore né ignoranza.", author: "San Francesco d'Assisi", source: "Ammonizioni XXVII" },
    { text: "Se Dio può operare attraverso di me, può operare attraverso chiunque.", author: "San Francesco d'Assisi" },
    { text: "Laudato si', mi' Signore, per tutte le tue creature, specialmente per messor lo frate Sole.", author: "San Francesco d'Assisi", source: "Cantico delle Creature" },
    { text: "Sopra tutte le grazie e i doni che Cristo dà ai suoi amati c'è quello di vincere sé stessi.", author: "San Francesco d'Assisi" },
    { text: "Ricorda che quando lascerai questa terra, non potrai portare con te nulla di ciò che hai ricevuto — solo ciò che hai donato.", author: "San Francesco d'Assisi" },
    { text: "Mentre annunci la pace con le labbra, abbi cura di averla ancor più pienamente nel cuore.", author: "San Francesco d'Assisi" },
    { text: "È inutile camminare per andare a predicare se il nostro camminare non è la nostra predicazione.", author: "San Francesco d'Assisi" },
    { text: "Beato quel servo che ama il suo fratello tanto quando è malato e inutile quanto quando è sano e può essergli di utilità.", author: "San Francesco d'Assisi", source: "Ammonizioni XXIV" },
    { text: "Le opere che compi possono essere l'unica predica che alcune persone ascolteranno oggi.", author: "San Francesco d'Assisi" },
    { text: "Non trattenete nulla di voi per voi, affinché Colui che si dona totalmente a voi vi riceva totalmente.", author: "San Francesco d'Assisi", source: "Lettera a tutto l'Ordine" },
    // Santa Chiara d'Assisi
    { text: "L'amore che non può soffrire non è degno di questo nome.", author: "Santa Chiara d'Assisi" },
    { text: "Diventiamo ciò che amiamo e chi amiamo plasma ciò che diventiamo.", author: "Santa Chiara d'Assisi" },
    { text: "Va' in pace, perché hai seguito la buona strada. Va' senza timore, perché Colui che ti ha creata ti ha fatta santa.", author: "Santa Chiara d'Assisi" },
    { text: "Poni la tua mente davanti allo specchio dell'eternità! Poni la tua anima nello splendore della gloria!", author: "Santa Chiara d'Assisi", source: "Terza Lettera ad Agnese di Praga" },
    { text: "Miralo, consideralo, contemplalo, desiderando di imitarlo.", author: "Santa Chiara d'Assisi", source: "Seconda Lettera ad Agnese di Praga" },
    // San Bonaventura
    { text: "Nelle cose belle San Francesco vedeva la Bellezza stessa, e attraverso le sue vestigia impresse nella creazione seguiva il suo Amato ovunque.", author: "San Bonaventura", source: "Leggenda Maggiore di San Francesco" },
    { text: "Se impari tutto tranne Cristo, non impari nulla. Se non impari nulla tranne Cristo, impari tutto.", author: "San Bonaventura" },
    { text: "La perfezione di un religioso è fare le cose comuni in modo perfetto.", author: "San Bonaventura" },
    // Sant'Antonio di Padova
    { text: "Le azioni parlano più forte delle parole; che le tue parole insegnino e le tue azioni parlino.", author: "Sant'Antonio di Padova" },
    { text: "La vita del corpo è l'anima; la vita dell'anima è Dio.", author: "Sant'Antonio di Padova" },
    { text: "Attribuisci a Dio ogni bene che hai ricevuto. Se ti attribuisci qualcosa che non ti appartiene, sarai colpevole di furto.", author: "Sant'Antonio di Padova" },
    // San Padre Pio
    { text: "Prega, spera e non preoccuparti. La preoccupazione è inutile. Dio è misericordioso e ascolterà la tua preghiera.", author: "San Padre Pio" },
    { text: "La vita di un cristiano non è altro che una lotta perpetua contro sé stesso.", author: "San Padre Pio" },
    { text: "La preghiera è l'arma migliore che abbiamo; è la chiave del cuore di Dio.", author: "San Padre Pio" },
    // San Massimiliano Kolbe
    { text: "Nessuno al mondo può cambiare la Verità. Ciò che possiamo e dobbiamo fare è cercare la verità e servirla quando l'abbiamo trovata.", author: "San Massimiliano Kolbe" },
    { text: "Il veleno più mortale del nostro tempo è l'indifferenza.", author: "San Massimiliano Kolbe" },
    // Beato Giovanni Duns Scoto
    { text: "Dio, nel suo atto più libero di amare, non ama necessariamente nulla al di fuori di Sé stesso.", author: "Beato Giovanni Duns Scoto", source: "Ordinatio" },
    // Santa Elisabetta d'Ungheria
    { text: "Come potrei portare una corona d'oro quando il Signore porta una corona di spine, e la porta per me?", author: "Santa Elisabetta d'Ungheria" },
    // San Giuseppe da Copertino
    { text: "O Dio, ti offro la mia libertà, la mia memoria, la mia intelligenza e la mia volontà.", author: "San Giuseppe da Copertino" },
    // Francescano tradizionale
    { text: "Pax et Bonum — Pace e Bene.", author: "Saluto francescano" },
    { text: "Ricominciamo da capo, perché finora non abbiamo fatto nulla.", author: "San Francesco d'Assisi" },
    { text: "Signore, concedimi il tesoro della sublime povertà.", author: "San Francesco d'Assisi" },
  ],
  fr: [
    // Saint François d'Assise
    { text: "Seigneur, fais de moi un instrument de ta paix. Là où est la haine, que je mette l'amour.", author: "Saint François d'Assise", source: "Prière de Saint François" },
    { text: "Commence par faire le nécessaire ; puis fais le possible ; et soudain tu fais l'impossible.", author: "Saint François d'Assise" },
    { text: "Car c'est en donnant que l'on reçoit.", author: "Saint François d'Assise", source: "Prière de Saint François" },
    { text: "Prêche l'Évangile en tout temps. Si nécessaire, utilise des paroles.", author: "Saint François d'Assise" },
    { text: "Toute l'obscurité du monde ne peut éteindre la lumière d'une seule bougie.", author: "Saint François d'Assise" },
    { text: "Là où il y a charité et sagesse, il n'y a ni crainte ni ignorance.", author: "Saint François d'Assise", source: "Admonitions XXVII" },
    { text: "Si Dieu peut agir à travers moi, il peut agir à travers n'importe qui.", author: "Saint François d'Assise" },
    { text: "Loué sois-tu, mon Seigneur, pour toutes tes créatures, spécialement messire frère Soleil.", author: "Saint François d'Assise", source: "Cantique des Créatures" },
    { text: "Au-dessus de toutes les grâces et les dons que le Christ donne à ses bien-aimés est celui de se vaincre soi-même.", author: "Saint François d'Assise" },
    { text: "Souviens-toi que lorsque tu quitteras cette terre, tu ne pourras rien emporter de ce que tu as reçu — seulement ce que tu as donné.", author: "Saint François d'Assise" },
    { text: "Tandis que tu proclames la paix par tes lèvres, veille à l'avoir encore plus pleinement dans ton cœur.", author: "Saint François d'Assise" },
    { text: "Il ne sert à rien de marcher pour aller prêcher si notre marche n'est pas notre prédication.", author: "Saint François d'Assise" },
    { text: "Bienheureux le serviteur qui aime son frère autant quand il est malade et inutile que quand il est bien portant et peut lui être utile.", author: "Saint François d'Assise", source: "Admonitions XXIV" },
    { text: "Les actes que tu accomplis peuvent être le seul sermon que certaines personnes entendront aujourd'hui.", author: "Saint François d'Assise" },
    { text: "Ne gardez rien de vous pour vous-mêmes, afin que Celui qui se donne totalement à vous puisse vous recevoir totalement.", author: "Saint François d'Assise", source: "Lettre à tout l'Ordre" },
    // Sainte Claire d'Assise
    { text: "L'amour qui ne peut souffrir n'est pas digne de ce nom.", author: "Sainte Claire d'Assise" },
    { text: "Nous devenons ce que nous aimons et qui nous aimons façonne ce que nous devenons.", author: "Sainte Claire d'Assise" },
    { text: "Va en paix, car tu as suivi le bon chemin. Va sans crainte, car Celui qui t'a créée t'a faite sainte.", author: "Sainte Claire d'Assise" },
    { text: "Place ton esprit devant le miroir de l'éternité ! Place ton âme dans la splendeur de la gloire !", author: "Sainte Claire d'Assise", source: "Troisième Lettre à Agnès de Prague" },
    { text: "Regarde-le, considère-le, contemple-le, dans le désir de l'imiter.", author: "Sainte Claire d'Assise", source: "Deuxième Lettre à Agnès de Prague" },
    // Saint Bonaventure
    { text: "Dans les belles choses, Saint François voyait la Beauté même, et à travers ses vestiges imprimés dans la création, il suivait son Bien-Aimé partout.", author: "Saint Bonaventure", source: "Légende Majeure de Saint François" },
    { text: "Si tu apprends tout sauf le Christ, tu n'apprends rien. Si tu n'apprends rien sauf le Christ, tu apprends tout.", author: "Saint Bonaventure" },
    { text: "La perfection d'un religieux est de faire les choses communes d'une manière parfaite.", author: "Saint Bonaventure" },
    // Saint Antoine de Padoue
    { text: "Les actions parlent plus fort que les paroles ; que tes paroles enseignent et tes actions parlent.", author: "Saint Antoine de Padoue" },
    { text: "La vie du corps est l'âme ; la vie de l'âme est Dieu.", author: "Saint Antoine de Padoue" },
    { text: "Attribue à Dieu tout bien que tu as reçu. Si tu t'attribues ce qui ne t'appartient pas, tu seras coupable de vol.", author: "Saint Antoine de Padoue" },
    // Saint Padre Pio
    { text: "Prie, espère et ne t'inquiète pas. L'inquiétude est inutile. Dieu est miséricordieux et entendra ta prière.", author: "Saint Padre Pio" },
    { text: "La vie d'un chrétien n'est rien d'autre qu'une lutte perpétuelle contre soi-même.", author: "Saint Padre Pio" },
    { text: "La prière est la meilleure arme que nous ayons ; c'est la clé du cœur de Dieu.", author: "Saint Padre Pio" },
    // Saint Maximilien Kolbe
    { text: "Personne au monde ne peut changer la Vérité. Ce que nous pouvons et devons faire, c'est chercher la vérité et la servir quand nous l'avons trouvée.", author: "Saint Maximilien Kolbe" },
    { text: "Le poison le plus mortel de notre temps est l'indifférence.", author: "Saint Maximilien Kolbe" },
    // Bienheureux Jean Duns Scot
    { text: "Dieu, dans son acte le plus libre d'aimer, n'aime pas nécessairement quoi que ce soit en dehors de Lui-même.", author: "Bienheureux Jean Duns Scot", source: "Ordinatio" },
    // Sainte Élisabeth de Hongrie
    { text: "Comment pourrais-je porter une couronne d'or quand le Seigneur porte une couronne d'épines, et la porte pour moi ?", author: "Sainte Élisabeth de Hongrie" },
    // Saint Joseph de Cupertino
    { text: "Ô Dieu, je t'offre ma liberté, ma mémoire, mon entendement et ma volonté.", author: "Saint Joseph de Cupertino" },
    // Franciscain traditionnel
    { text: "Pax et Bonum — Paix et Bien.", author: "Salutation franciscaine" },
    { text: "Recommençons, car jusqu'à présent nous n'avons rien fait.", author: "Saint François d'Assise" },
    { text: "Seigneur, accorde-moi le trésor de la sublime pauvreté.", author: "Saint François d'Assise" },
  ],
  zh: [
    // 亚西西的圣方济各
    { text: "主啊，使我成为祢和平的工具。在有仇恨的地方，让我播下爱。", author: "亚西西的圣方济各", source: "圣方济各和平祷词" },
    { text: "先做必要之事，再做可能之事，然后你会突然发现自己在做不可能之事。", author: "亚西西的圣方济各" },
    { text: "因为在给予中，我们才有所收获。", author: "亚西西的圣方济各", source: "圣方济各和平祷词" },
    { text: "时时宣讲福音。必要时，使用言语。", author: "亚西西的圣方济各" },
    { text: "世间所有的黑暗都无法熄灭一支蜡烛的光。", author: "亚西西的圣方济各" },
    { text: "哪里有仁爱和智慧，哪里就没有恐惧和无知。", author: "亚西西的圣方济各", source: "劝谕第二十七篇" },
    { text: "若天主能藉着我做工，祂就能藉着任何人做工。", author: "亚西西的圣方济各" },
    { text: "我主，愿祢因祢一切受造物而受赞美，特别是因太阳弟兄。", author: "亚西西的圣方济各", source: "造物赞歌" },
    { text: "基督赐给祂所爱之人的一切恩宠和恩赐中，最崇高的是战胜自我。", author: "亚西西的圣方济各" },
    { text: "记住，当你离开这个世界时，你无法带走你所接受的一切——只能带走你所给予的。", author: "亚西西的圣方济各" },
    { text: "当你用嘴唇宣讲和平时，要更加注意在心中拥有和平。", author: "亚西西的圣方济各" },
    { text: "若我们的行走本身不是宣讲，那么走到任何地方去宣讲都是无用的。", author: "亚西西的圣方济各" },
    { text: "有福的仆人，在弟兄生病无用时与健康能效劳时，同样爱他。", author: "亚西西的圣方济各", source: "劝谕第二十四篇" },
    { text: "你所做的事可能是某些人今天听到的唯一一篇讲道。", author: "亚西西的圣方济各" },
    { text: "不要为自己保留任何东西，好让那完全交付自己给你们的，也能完全接纳你们。", author: "亚西西的圣方济各", source: "致全修会书" },
    // 亚西西的圣佳兰
    { text: "不能承受苦难的爱不配称为爱。", author: "亚西西的圣佳兰" },
    { text: "我们成为我们所爱的，而我们所爱的人塑造了我们所成为的。", author: "亚西西的圣佳兰" },
    { text: "平安地去吧，因为你已走上正路。无惧地去吧，因为创造你的那位已使你成圣。", author: "亚西西的圣佳兰" },
    { text: "将你的心灵置于永恒的明镜前！将你的灵魂置于光荣的辉煌中！", author: "亚西西的圣佳兰", source: "致布拉格依搦斯第三封信" },
    { text: "注视祂，思念祂，默观祂，渴望效法祂。", author: "亚西西的圣佳兰", source: "致布拉格依搦斯第二封信" },
    // 圣文德
    { text: "在美丽的事物中，圣方济各看见了美本身，并透过印刻在受造界中的痕迹，处处追随他的挚爱。", author: "圣文德", source: "圣方济各大传" },
    { text: "若你学了一切却不认识基督，你什么都没学到。若你只认识基督而无其他，你便学到了一切。", author: "圣文德" },
    { text: "修道人的完美在于以完美的方式做平凡之事。", author: "圣文德" },
    // 帕多瓦的圣安多尼
    { text: "行动比言语更有力；让你的言语教导，让你的行动说话。", author: "帕多瓦的圣安多尼" },
    { text: "身体的生命是灵魂；灵魂的生命是天主。", author: "帕多瓦的圣安多尼" },
    { text: "将你所领受的一切善归于天主。若你将不属于你的据为己有，你便犯了偷盗之罪。", author: "帕多瓦的圣安多尼" },
    // 圣庇护神父
    { text: "祈祷、希望，不要忧虑。忧虑是无益的。天主是慈悲的，祂会垂听你的祈祷。", author: "圣庇护神父" },
    { text: "基督徒的生活不过是一场与自我的永恒斗争。", author: "圣庇护神父" },
    { text: "祈祷是我们拥有的最好武器；它是打开天主之心的钥匙。", author: "圣庇护神父" },
    // 圣高隆倍
    { text: "世上没有人能改变真理。我们能做且应做的，是寻求真理，并在找到真理时服务真理。", author: "圣高隆倍" },
    { text: "我们时代最致命的毒药是冷漠。", author: "圣高隆倍" },
    // 真福董思高
    { text: "天主在其最自由的爱的行动中，并不必然地爱祂自身以外的任何事物。", author: "真福董思高", source: "论著集" },
    // 匈牙利的圣依撒伯尔
    { text: "当主为我戴着荆棘冠冕时，我怎能戴着金冠？", author: "匈牙利的圣依撒伯尔" },
    // 古柏蒂诺的圣若瑟
    { text: "天主啊，我将我的自由、记忆、理智和意志奉献给祢。", author: "古柏蒂诺的圣若瑟" },
    // 方济各传统
    { text: "Pax et Bonum——和平与美善。", author: "方济各会问候语" },
    { text: "让我们重新开始，因为到目前为止我们什么都没有做。", author: "亚西西的圣方济各" },
    { text: "主啊，赐予我崇高贫穷的宝藏。", author: "亚西西的圣方济各" },
  ],
};

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
