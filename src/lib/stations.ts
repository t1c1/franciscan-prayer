export interface Station {
  number: number;
  title: string;
  titleLatin: string;
  scripture: string;
  meditation: string;
}

// The 14 Stations of the Cross — a Franciscan devotion
// The Franciscans are custodians of the Holy Land and popularized this devotion
export const STATIONS: Station[] = [
  {
    number: 1,
    title: "Jesus is condemned to death",
    titleLatin: "Iesus damnatur ad mortem",
    scripture: "Pilate said to them, 'Then what shall I do with Jesus called Christ?' They all said, 'Let him be crucified!' (Matthew 27:22)",
    meditation: "Lord Jesus, you stood silent before Pilate while the crowd screamed for your death. You accepted an unjust sentence so that we might be freed from the sentence of sin. Help us accept the crosses that come our way without bitterness or complaint.",
  },
  {
    number: 2,
    title: "Jesus carries His Cross",
    titleLatin: "Iesus crucem suam baiulat",
    scripture: "And carrying the cross himself, he went out to what is called the Place of the Skull, in Hebrew, Golgotha. (John 19:17)",
    meditation: "Lord, you embraced the heavy wood of the Cross with love, not reluctance. St. Francis loved the Cross so much it was imprinted on his body. Help us carry our daily crosses with the same Franciscan joy.",
  },
  {
    number: 3,
    title: "Jesus falls the first time",
    titleLatin: "Iesus primum cadit",
    scripture: "He was spurned and avoided by people, a man of suffering, accustomed to infirmity. (Isaiah 53:3)",
    meditation: "Lord, the weight of all our sins pressed you into the dirt. Even you, the All-Powerful, fell under this weight. When we fall into sin, give us the grace to rise again and continue forward.",
  },
  {
    number: 4,
    title: "Jesus meets His Mother",
    titleLatin: "Iesus Matrem suam obviam habet",
    scripture: "Simeon said to Mary, 'And you yourself a sword will pierce so that the thoughts of many hearts may be revealed.' (Luke 2:35)",
    meditation: "Mary, your heart was pierced seeing your Son suffer. You did not turn away but accompanied Him in love. Intercede for all mothers and fathers who suffer watching their children endure hardship.",
  },
  {
    number: 5,
    title: "Simon of Cyrene helps Jesus carry the Cross",
    titleLatin: "Simon Cyrenaeus crucem Iesu portat",
    scripture: "They pressed into service a passer-by, Simon, a Cyrenian, to carry his cross. (Mark 15:21)",
    meditation: "Lord, Simon did not choose this burden — it was thrust upon him. Yet in carrying your Cross, he received a grace beyond measure. Open our eyes to see that every act of service, even unwelcome ones, is a share in your redemptive work.",
  },
  {
    number: 6,
    title: "Veronica wipes the face of Jesus",
    titleLatin: "Veronica faciem Iesu detergit",
    scripture: "I seek your face, Lord; do not hide your face from me. (Psalm 27:8-9)",
    meditation: "Veronica pushed through the hostile crowd to offer a simple act of mercy — wiping your bloodied face. Lord, give us her courage to offer comfort to the suffering, even when the world mocks such tenderness.",
  },
  {
    number: 7,
    title: "Jesus falls the second time",
    titleLatin: "Iesus iterum cadit",
    scripture: "Come to me, all you who labor and are burdened, and I will give you rest. (Matthew 11:28)",
    meditation: "Lord, you fell a second time under the weight of our repeated sins. Yet you rose again. Help us who struggle with the same sins over and over to never despair of your mercy, but always to rise and continue toward you.",
  },
  {
    number: 8,
    title: "Jesus meets the women of Jerusalem",
    titleLatin: "Iesus feminas Ierusalem alloquitur",
    scripture: "Jesus turned to them and said, 'Daughters of Jerusalem, do not weep for me; weep instead for yourselves and for your children.' (Luke 23:28)",
    meditation: "Lord, even in your agony you thought of others. You warned the weeping women of the suffering to come. Give us the grace to think beyond our own pain and pray for those who do not yet know your love.",
  },
  {
    number: 9,
    title: "Jesus falls the third time",
    titleLatin: "Iesus tertium cadit",
    scripture: "The Lord is close to the brokenhearted; and those who are crushed in spirit he saves. (Psalm 34:19)",
    meditation: "Three falls, Lord — and three times you rose. You show us that holiness is not the absence of falling, but the perseverance to get up again. With St. Francis we pray: Lord, help us to begin again, for until now we have done nothing.",
  },
  {
    number: 10,
    title: "Jesus is stripped of His garments",
    titleLatin: "Iesus vestibus suis exuitur",
    scripture: "They divided his garments among them by casting lots. (Matthew 27:35)",
    meditation: "Lord, you were stripped of everything — even your dignity. St. Francis stripped himself of his fine clothes before the bishop, choosing poverty and God alone. Help us let go of our attachments so that we may be clothed only in your grace.",
  },
  {
    number: 11,
    title: "Jesus is nailed to the Cross",
    titleLatin: "Iesus cruci affigitur",
    scripture: "When they came to the place called the Skull, they crucified him there. Jesus said, 'Father, forgive them, they know not what they do.' (Luke 23:33-34)",
    meditation: "Lord, the nails pierced your hands and feet — the very hands that healed the sick and the feet that walked among the poor. From the Cross you forgave. Give us the grace to forgive those who hurt us, even when it costs us everything.",
  },
  {
    number: 12,
    title: "Jesus dies on the Cross",
    titleLatin: "Iesus in cruce moritur",
    scripture: "Jesus cried out in a loud voice, 'Father, into your hands I commend my spirit'; and when he had said this he breathed his last. (Luke 23:46)",
    meditation: "The hour of None — the ninth hour — when you gave your life for the world. This is the hour the Franciscan prays 7 Our Fathers in your memory. We adore you, O Christ, and we praise you, because by your holy Cross you have redeemed the world.",
  },
  {
    number: 13,
    title: "Jesus is taken down from the Cross",
    titleLatin: "Iesus de cruce deponitur",
    scripture: "Joseph of Arimathea, a distinguished member of the council, came and courageously went to Pilate and asked for the body of Jesus. (Mark 15:43)",
    meditation: "Mary held her dead Son in her arms — the same arms that held him as a baby in Bethlehem. Lord, when we experience loss and grief, let us remember that even death cannot separate us from your love.",
  },
  {
    number: 14,
    title: "Jesus is laid in the tomb",
    titleLatin: "Iesus in sepulcro ponitur",
    scripture: "They took the body of Jesus and bound it with burial cloths along with the spices, according to the Jewish burial custom. (John 19:40)",
    meditation: "Lord, the tomb was not the end. From this darkness came the light of Resurrection. When we face the darkest moments of our lives, when all seems lost, remind us that you are the God who brings life from death, hope from despair, joy from mourning.",
  },
];

export const STATIONS_I18N: Record<string, { title: string; scripture: string; meditation: string }[]> = {
  es: [
    {
      title: "Jesús es condenado a muerte",
      scripture: "Pilato les dijo: '¿Qué haré entonces con Jesús, llamado el Cristo?' Todos dijeron: '¡Sea crucificado!' (Mateo 27:22)",
      meditation: "Señor Jesús, permaneciste en silencio ante Pilato mientras la multitud gritaba pidiendo tu muerte. Aceptaste una sentencia injusta para que pudiéramos ser liberados de la sentencia del pecado. Ayúdanos a aceptar las cruces que nos llegan sin amargura ni queja.",
    },
    {
      title: "Jesús carga con su Cruz",
      scripture: "Y cargando él mismo con la cruz, salió hacia el lugar llamado de la Calavera, en hebreo Gólgota. (Juan 19:17)",
      meditation: "Señor, abrazaste la pesada madera de la Cruz con amor, no con resistencia. San Francisco amó tanto la Cruz que quedó impresa en su cuerpo. Ayúdanos a llevar nuestras cruces diarias con la misma alegría franciscana.",
    },
    {
      title: "Jesús cae por primera vez",
      scripture: "Fue despreciado y rechazado por los hombres, varón de dolores, experimentado en el sufrimiento. (Isaías 53:3)",
      meditation: "Señor, el peso de todos nuestros pecados te derribó al suelo. Incluso tú, el Todopoderoso, caíste bajo este peso. Cuando caigamos en pecado, danos la gracia de levantarnos y seguir adelante.",
    },
    {
      title: "Jesús encuentra a su Madre",
      scripture: "Simeón dijo a María: 'Y a ti misma una espada te atravesará el alma, para que queden al descubierto las intenciones de muchos corazones.' (Lucas 2:35)",
      meditation: "María, tu corazón fue traspasado al ver sufrir a tu Hijo. No te apartaste sino que lo acompañaste con amor. Intercede por todas las madres y padres que sufren viendo a sus hijos padecer dificultades.",
    },
    {
      title: "Simón de Cirene ayuda a Jesús a llevar la Cruz",
      scripture: "Obligaron a un tal Simón de Cirene, que pasaba por allí, a que llevara la cruz. (Marcos 15:21)",
      meditation: "Señor, Simón no eligió esta carga — le fue impuesta. Sin embargo, al llevar tu Cruz, recibió una gracia inconmensurable. Abre nuestros ojos para ver que todo acto de servicio, incluso los no deseados, es una participación en tu obra redentora.",
    },
    {
      title: "La Verónica limpia el rostro de Jesús",
      scripture: "Busco tu rostro, Señor; no me escondas tu rostro. (Salmo 27:8-9)",
      meditation: "La Verónica se abrió paso entre la multitud hostil para ofrecer un simple acto de misericordia: limpiar tu rostro ensangrentado. Señor, danos su valentía para consolar a los que sufren, aunque el mundo se burle de tal ternura.",
    },
    {
      title: "Jesús cae por segunda vez",
      scripture: "Vengan a mí todos los que están fatigados y agobiados, y yo los aliviaré. (Mateo 11:28)",
      meditation: "Señor, caíste por segunda vez bajo el peso de nuestros pecados repetidos. Sin embargo, te levantaste de nuevo. Ayúdanos a los que luchamos con los mismos pecados una y otra vez a nunca desesperar de tu misericordia, sino a levantarnos siempre y seguir hacia ti.",
    },
    {
      title: "Jesús encuentra a las mujeres de Jerusalén",
      scripture: "Jesús se volvió hacia ellas y les dijo: 'Hijas de Jerusalén, no lloren por mí; lloren más bien por ustedes y por sus hijos.' (Lucas 23:28)",
      meditation: "Señor, incluso en tu agonía pensaste en los demás. Advertiste a las mujeres que lloraban sobre el sufrimiento venidero. Danos la gracia de pensar más allá de nuestro propio dolor y orar por quienes aún no conocen tu amor.",
    },
    {
      title: "Jesús cae por tercera vez",
      scripture: "El Señor está cerca de los que tienen el corazón quebrantado; y salva a los de espíritu abatido. (Salmo 34:19)",
      meditation: "Tres caídas, Señor — y tres veces te levantaste. Nos muestras que la santidad no es la ausencia de caídas, sino la perseverancia para levantarse de nuevo. Con San Francisco oramos: Señor, ayúdanos a comenzar de nuevo, porque hasta ahora no hemos hecho nada.",
    },
    {
      title: "Jesús es despojado de sus vestiduras",
      scripture: "Se repartieron sus vestidos echando suertes. (Mateo 27:35)",
      meditation: "Señor, fuiste despojado de todo — incluso de tu dignidad. San Francisco se despojó de sus ropas finas ante el obispo, eligiendo la pobreza y solo a Dios. Ayúdanos a soltar nuestros apegos para que podamos vestirnos solo de tu gracia.",
    },
    {
      title: "Jesús es clavado en la Cruz",
      scripture: "Cuando llegaron al lugar llamado la Calavera, lo crucificaron allí. Jesús dijo: 'Padre, perdónalos, porque no saben lo que hacen.' (Lucas 23:33-34)",
      meditation: "Señor, los clavos traspasaron tus manos y pies — las mismas manos que sanaban enfermos y los pies que caminaron entre los pobres. Desde la Cruz perdonaste. Danos la gracia de perdonar a quienes nos hieren, aunque nos cueste todo.",
    },
    {
      title: "Jesús muere en la Cruz",
      scripture: "Jesús clamó con voz fuerte: 'Padre, en tus manos encomiendo mi espíritu'; y dicho esto, expiró. (Lucas 23:46)",
      meditation: "La hora de Nona — la hora novena — cuando entregaste tu vida por el mundo. Es la hora en que el franciscano reza 7 Padrenuestros en tu memoria. Te adoramos, oh Cristo, y te bendecimos, porque por tu santa Cruz redimiste al mundo.",
    },
    {
      title: "Jesús es bajado de la Cruz",
      scripture: "José de Arimatea, miembro distinguido del consejo, fue valientemente a Pilato y pidió el cuerpo de Jesús. (Marcos 15:43)",
      meditation: "María sostuvo a su Hijo muerto en sus brazos — los mismos brazos que lo acunaron de niño en Belén. Señor, cuando experimentemos pérdida y dolor, que recordemos que ni siquiera la muerte puede separarnos de tu amor.",
    },
    {
      title: "Jesús es colocado en el sepulcro",
      scripture: "Tomaron el cuerpo de Jesús y lo envolvieron en lienzos con especias aromáticas, según la costumbre judía de sepultar. (Juan 19:40)",
      meditation: "Señor, el sepulcro no fue el final. De esta oscuridad surgió la luz de la Resurrección. Cuando enfrentemos los momentos más oscuros de nuestra vida, cuando todo parezca perdido, recuérdanos que tú eres el Dios que saca vida de la muerte, esperanza de la desesperación, alegría del luto.",
    },
  ],
  it: [
    {
      title: "Gesù è condannato a morte",
      scripture: "Pilato disse loro: 'Che farò dunque di Gesù chiamato il Cristo?' Tutti risposero: 'Sia crocifisso!' (Matteo 27:22)",
      meditation: "Signore Gesù, sei rimasto in silenzio davanti a Pilato mentre la folla gridava per la tua morte. Hai accettato una sentenza ingiusta affinché noi fossimo liberati dalla condanna del peccato. Aiutaci ad accettare le croci che ci vengono senza amarezza né lamento.",
    },
    {
      title: "Gesù porta la sua Croce",
      scripture: "Portando la croce da sé, uscì verso il luogo detto del Cranio, in ebraico Gòlgota. (Giovanni 19:17)",
      meditation: "Signore, hai abbracciato il pesante legno della Croce con amore, non con riluttanza. San Francesco amò tanto la Croce che fu impressa sul suo corpo. Aiutaci a portare le nostre croci quotidiane con la stessa gioia francescana.",
    },
    {
      title: "Gesù cade la prima volta",
      scripture: "Disprezzato e reietto dagli uomini, uomo dei dolori, avvezzo alla sofferenza. (Isaia 53:3)",
      meditation: "Signore, il peso di tutti i nostri peccati ti ha gettato nella polvere. Anche tu, l'Onnipotente, sei caduto sotto questo peso. Quando cadiamo nel peccato, donaci la grazia di rialzarci e continuare ad andare avanti.",
    },
    {
      title: "Gesù incontra sua Madre",
      scripture: "Simeone disse a Maria: 'E anche a te una spada trafiggerà l'anima, affinché siano svelati i pensieri di molti cuori.' (Luca 2:35)",
      meditation: "Maria, il tuo cuore è stato trafitto vedendo soffrire tuo Figlio. Non ti sei voltata dall'altra parte ma lo hai accompagnato con amore. Intercedi per tutte le madri e i padri che soffrono vedendo i loro figli attraversare le difficoltà.",
    },
    {
      title: "Simone di Cirene aiuta Gesù a portare la Croce",
      scripture: "Costrinsero un passante, un certo Simone di Cirene, a portare la sua croce. (Marco 15:21)",
      meditation: "Signore, Simone non scelse questo peso — gli fu imposto. Eppure, portando la tua Croce, ricevette una grazia incommensurabile. Apri i nostri occhi per vedere che ogni atto di servizio, anche quelli indesiderati, è partecipazione alla tua opera redentrice.",
    },
    {
      title: "La Veronica asciuga il volto di Gesù",
      scripture: "Cerco il tuo volto, Signore; non nascondermi il tuo volto. (Salmo 27:8-9)",
      meditation: "La Veronica si fece largo tra la folla ostile per offrire un semplice atto di misericordia: asciugare il tuo volto insanguinato. Signore, donaci il suo coraggio di offrire conforto a chi soffre, anche quando il mondo deride tale tenerezza.",
    },
    {
      title: "Gesù cade la seconda volta",
      scripture: "Venite a me, voi tutti che siete affaticati e oppressi, e io vi darò sollievo. (Matteo 11:28)",
      meditation: "Signore, sei caduto una seconda volta sotto il peso dei nostri peccati ripetuti. Eppure ti sei rialzato. Aiutaci, noi che lottiamo con gli stessi peccati ancora e ancora, a non disperare mai della tua misericordia, ma a rialzarci sempre e continuare verso di te.",
    },
    {
      title: "Gesù incontra le donne di Gerusalemme",
      scripture: "Gesù si voltò verso di loro e disse: 'Figlie di Gerusalemme, non piangete per me; piangete piuttosto per voi stesse e per i vostri figli.' (Luca 23:28)",
      meditation: "Signore, anche nella tua agonia pensavi agli altri. Hai avvertito le donne piangenti della sofferenza a venire. Donaci la grazia di pensare oltre il nostro dolore e pregare per coloro che non conoscono ancora il tuo amore.",
    },
    {
      title: "Gesù cade la terza volta",
      scripture: "Il Signore è vicino a chi ha il cuore spezzato; e salva gli spiriti affranti. (Salmo 34:19)",
      meditation: "Tre cadute, Signore — e tre volte ti sei rialzato. Ci mostri che la santità non è l'assenza di cadute, ma la perseveranza nel rialzarsi. Con San Francesco preghiamo: Signore, aiutaci a ricominciare, perché finora non abbiamo fatto nulla.",
    },
    {
      title: "Gesù è spogliato delle sue vesti",
      scripture: "Si divisero le sue vesti tirandole a sorte. (Matteo 27:35)",
      meditation: "Signore, sei stato spogliato di tutto — persino della tua dignità. San Francesco si spogliò dei suoi abiti preziosi davanti al vescovo, scegliendo la povertà e solo Dio. Aiutaci a lasciar andare i nostri attaccamenti affinché possiamo essere rivestiti solo della tua grazia.",
    },
    {
      title: "Gesù è inchiodato alla Croce",
      scripture: "Quando giunsero al luogo detto Cranio, lo crocifissero là. Gesù disse: 'Padre, perdona loro perché non sanno quello che fanno.' (Luca 23:33-34)",
      meditation: "Signore, i chiodi trafissero le tue mani e i tuoi piedi — le stesse mani che guarivano i malati e i piedi che camminavano tra i poveri. Dalla Croce hai perdonato. Donaci la grazia di perdonare coloro che ci feriscono, anche quando ci costa tutto.",
    },
    {
      title: "Gesù muore sulla Croce",
      scripture: "Gesù gridò a gran voce: 'Padre, nelle tue mani consegno il mio spirito'; e detto questo, spirò. (Luca 23:46)",
      meditation: "L'ora di Nona — la nona ora — quando hai dato la tua vita per il mondo. È l'ora in cui il francescano prega 7 Padre Nostro in tua memoria. Ti adoriamo, o Cristo, e ti benediciamo, perché con la tua santa Croce hai redento il mondo.",
    },
    {
      title: "Gesù è deposto dalla Croce",
      scripture: "Giuseppe d'Arimatea, membro autorevole del consiglio, andò coraggiosamente da Pilato e chiese il corpo di Gesù. (Marco 15:43)",
      meditation: "Maria tenne il Figlio morto tra le sue braccia — le stesse braccia che lo avevano cullato da bambino a Betlemme. Signore, quando sperimentiamo la perdita e il dolore, ricordaci che neppure la morte può separarci dal tuo amore.",
    },
    {
      title: "Gesù è posto nel sepolcro",
      scripture: "Presero il corpo di Gesù e lo avvolsero in bende con aromi, secondo il costume funebre giudaico. (Giovanni 19:40)",
      meditation: "Signore, il sepolcro non era la fine. Da questa oscurità è venuta la luce della Risurrezione. Quando affrontiamo i momenti più bui della nostra vita, quando tutto sembra perduto, ricordaci che tu sei il Dio che trae vita dalla morte, speranza dalla disperazione, gioia dal lutto.",
    },
  ],
  fr: [
    {
      title: "Jésus est condamné à mort",
      scripture: "Pilate leur dit : 'Que ferai-je donc de Jésus appelé Christ ?' Tous répondirent : 'Qu'il soit crucifié !' (Matthieu 27:22)",
      meditation: "Seigneur Jésus, tu es resté silencieux devant Pilate tandis que la foule criait pour ta mort. Tu as accepté une sentence injuste afin que nous soyons libérés de la condamnation du péché. Aide-nous à accepter les croix qui nous arrivent sans amertume ni plainte.",
    },
    {
      title: "Jésus porte sa Croix",
      scripture: "Portant lui-même sa croix, il sortit vers le lieu dit du Crâne, en hébreu Golgotha. (Jean 19:17)",
      meditation: "Seigneur, tu as embrassé le bois lourd de la Croix avec amour, non avec réticence. Saint François aimait tant la Croix qu'elle fut imprimée sur son corps. Aide-nous à porter nos croix quotidiennes avec la même joie franciscaine.",
    },
    {
      title: "Jésus tombe pour la première fois",
      scripture: "Méprisé et rejeté des hommes, homme de douleurs, habitué à la souffrance. (Isaïe 53:3)",
      meditation: "Seigneur, le poids de tous nos péchés t'a jeté dans la poussière. Même toi, le Tout-Puissant, tu es tombé sous ce poids. Quand nous tombons dans le péché, donne-nous la grâce de nous relever et de continuer à avancer.",
    },
    {
      title: "Jésus rencontre sa Mère",
      scripture: "Siméon dit à Marie : 'Et toi-même, un glaive te transpercera l'âme, afin que soient révélées les pensées de beaucoup de cœurs.' (Luc 2:35)",
      meditation: "Marie, ton cœur fut transpercé en voyant souffrir ton Fils. Tu ne t'es pas détournée mais tu l'as accompagné avec amour. Intercède pour toutes les mères et tous les pères qui souffrent en voyant leurs enfants endurer l'épreuve.",
    },
    {
      title: "Simon de Cyrène aide Jésus à porter sa Croix",
      scripture: "Ils réquisitionnèrent un passant, Simon de Cyrène, pour porter sa croix. (Marc 15:21)",
      meditation: "Seigneur, Simon n'a pas choisi ce fardeau — il lui fut imposé. Pourtant, en portant ta Croix, il reçut une grâce incommensurable. Ouvre nos yeux pour voir que tout acte de service, même ceux qui ne sont pas désirés, est une participation à ton œuvre rédemptrice.",
    },
    {
      title: "Véronique essuie le visage de Jésus",
      scripture: "Je cherche ton visage, Seigneur ; ne me cache pas ton visage. (Psaume 27:8-9)",
      meditation: "Véronique s'est frayé un chemin à travers la foule hostile pour offrir un simple acte de miséricorde : essuyer ton visage ensanglanté. Seigneur, donne-nous son courage d'offrir du réconfort à ceux qui souffrent, même quand le monde se moque d'une telle tendresse.",
    },
    {
      title: "Jésus tombe pour la deuxième fois",
      scripture: "Venez à moi, vous tous qui peinez et ployez sous le fardeau, et moi je vous donnerai le repos. (Matthieu 11:28)",
      meditation: "Seigneur, tu es tombé une deuxième fois sous le poids de nos péchés répétés. Pourtant tu t'es relevé. Aide-nous, nous qui luttons avec les mêmes péchés encore et encore, à ne jamais désespérer de ta miséricorde, mais à nous relever toujours et à continuer vers toi.",
    },
    {
      title: "Jésus rencontre les femmes de Jérusalem",
      scripture: "Jésus se tourna vers elles et dit : 'Filles de Jérusalem, ne pleurez pas sur moi ; pleurez plutôt sur vous-mêmes et sur vos enfants.' (Luc 23:28)",
      meditation: "Seigneur, même dans ton agonie tu pensais aux autres. Tu as averti les femmes en pleurs de la souffrance à venir. Donne-nous la grâce de penser au-delà de notre propre douleur et de prier pour ceux qui ne connaissent pas encore ton amour.",
    },
    {
      title: "Jésus tombe pour la troisième fois",
      scripture: "Le Seigneur est proche de ceux qui ont le cœur brisé ; il sauve ceux dont l'esprit est abattu. (Psaume 34:19)",
      meditation: "Trois chutes, Seigneur — et trois fois tu t'es relevé. Tu nous montres que la sainteté n'est pas l'absence de chutes, mais la persévérance à se relever. Avec saint François nous prions : Seigneur, aide-nous à recommencer, car jusqu'à présent nous n'avons rien fait.",
    },
    {
      title: "Jésus est dépouillé de ses vêtements",
      scripture: "Ils se partagèrent ses vêtements en tirant au sort. (Matthieu 27:35)",
      meditation: "Seigneur, tu as été dépouillé de tout — même de ta dignité. Saint François se dépouilla de ses beaux vêtements devant l'évêque, choisissant la pauvreté et Dieu seul. Aide-nous à nous défaire de nos attachements pour que nous soyons revêtus uniquement de ta grâce.",
    },
    {
      title: "Jésus est cloué sur la Croix",
      scripture: "Lorsqu'ils arrivèrent au lieu dit le Crâne, ils le crucifièrent là. Jésus dit : 'Père, pardonne-leur, car ils ne savent pas ce qu'ils font.' (Luc 23:33-34)",
      meditation: "Seigneur, les clous ont percé tes mains et tes pieds — les mêmes mains qui guérissaient les malades et les pieds qui marchaient parmi les pauvres. De la Croix tu as pardonné. Donne-nous la grâce de pardonner à ceux qui nous blessent, même quand cela nous coûte tout.",
    },
    {
      title: "Jésus meurt sur la Croix",
      scripture: "Jésus cria d'une voix forte : 'Père, entre tes mains je remets mon esprit' ; et en disant cela, il expira. (Luc 23:46)",
      meditation: "L'heure de None — la neuvième heure — quand tu as donné ta vie pour le monde. C'est l'heure où le franciscain prie 7 Notre Père en ta mémoire. Nous t'adorons, ô Christ, et nous te bénissons, car par ta sainte Croix tu as racheté le monde.",
    },
    {
      title: "Jésus est descendu de la Croix",
      scripture: "Joseph d'Arimathie, membre éminent du conseil, alla courageusement trouver Pilate et demanda le corps de Jésus. (Marc 15:43)",
      meditation: "Marie a tenu son Fils mort dans ses bras — les mêmes bras qui le berçaient enfant à Bethléem. Seigneur, quand nous connaissons la perte et le deuil, rappelle-nous que même la mort ne peut nous séparer de ton amour.",
    },
    {
      title: "Jésus est mis au tombeau",
      scripture: "Ils prirent le corps de Jésus et l'enveloppèrent de linges avec des aromates, selon la coutume funéraire juive. (Jean 19:40)",
      meditation: "Seigneur, le tombeau n'était pas la fin. De ces ténèbres est venue la lumière de la Résurrection. Quand nous affrontons les moments les plus sombres de notre vie, quand tout semble perdu, rappelle-nous que tu es le Dieu qui fait naître la vie de la mort, l'espérance du désespoir, la joie du deuil.",
    },
  ],
  zh: [
    {
      title: "耶稣被判死刑",
      scripture: "比拉多对他们说：'那么，我对那称为基督的耶稣怎么办呢？'众人都说：'把他钉在十字架上！'（玛窦福音 27:22）",
      meditation: "主耶稣，当群众叫喊着要你死的时候，你在比拉多面前默然无语。你接受了不义的判决，好使我们脱免罪的刑罚。帮助我们毫无怨恨地接受生活中的十字架。",
    },
    {
      title: "耶稣背负十字架",
      scripture: "耶稣自己背着十字架，出来到了一个名叫髑髅的地方，希伯来语叫哥尔哥达。（若望福音 19:17）",
      meditation: "主，你以爱而非勉强拥抱了十字架的重木。圣方济各如此热爱十字架，以致十字架的印记刻在了他的身体上。帮助我们以同样的方济各喜乐背负日常的十字架。",
    },
    {
      title: "耶稣第一次跌倒",
      scripture: "他被藐视，被人遗弃，是个多苦的人，常经忧患。（依撒意亚先知书 53:3）",
      meditation: "主，我们一切罪过的重量将你压倒在地。连你这全能者也在这重压下跌倒了。当我们陷入罪恶时，赐给我们再次站起来继续前行的恩宠。",
    },
    {
      title: "耶稣路遇圣母",
      scripture: "西默盎对玛利亚说：'你自己的灵魂要被利剑刺透，为叫许多人心中的思念显露出来。'（路加福音 2:35）",
      meditation: "玛利亚，看到你的儿子受苦，你的心被刺透了。你没有转身离去，而是以爱陪伴着他。请为所有看着孩子受苦的父母代祷。",
    },
    {
      title: "西门帮耶稣背十字架",
      scripture: "他们强迫一个路过的人——基勒乃人西满——背耶稣的十字架。（马尔谷福音 15:21）",
      meditation: "主，西满没有选择这个重担——它被强加于他。然而在背负你的十字架时，他领受了无量的恩宠。打开我们的眼睛，看到每一个服务的行为，即使是不情愿的，都是分担你救赎工程的机会。",
    },
    {
      title: "韦罗尼加为耶稣拭面",
      scripture: "我寻求你的面容，上主；求你不要向我掩面。（圣咏 27:8-9）",
      meditation: "韦罗尼加冲过充满敌意的人群，献上简单的慈悲之举——擦拭你血迹斑斑的面容。主，赐给我们她的勇气，去安慰受苦的人，即使世界嘲笑这样的温柔。",
    },
    {
      title: "耶稣第二次跌倒",
      scripture: "凡劳苦和负重担的人，你们都到我这里来，我要使你们安息。（玛窦福音 11:28）",
      meditation: "主，你在我们重复犯罪的重压下第二次跌倒了。然而你再次站起来了。帮助我们这些反复与同样罪过挣扎的人，永远不要对你的慈悲绝望，而是始终站起来，继续走向你。",
    },
    {
      title: "耶稣劝慰耶路撒冷的妇女",
      scripture: "耶稣转身对她们说：'耶路撒冷的女子们，不要为我哭泣；应当为自己和你们的孩子哭泣。'（路加福音 23:28）",
      meditation: "主，即使在你的痛苦中，你仍想着别人。你警告哭泣的妇女们将要来临的苦难。赐给我们超越自身痛苦的恩宠，为那些尚未认识你的爱的人祈祷。",
    },
    {
      title: "耶稣第三次跌倒",
      scripture: "上主亲近心灵破碎的人；他拯救精神沮丧的人。（圣咏 34:19）",
      meditation: "三次跌倒，主——三次你站了起来。你告诉我们，圣德不是不跌倒，而是坚持再次站起来。我们与圣方济各一起祈祷：主，帮助我们重新开始，因为到现在我们什么也没有做。",
    },
    {
      title: "耶稣被剥去衣服",
      scripture: "他们抽签分了他的衣服。（玛窦福音 27:35）",
      meditation: "主，你被剥去一切——甚至你的尊严。圣方济各在主教面前脱去了华贵的衣裳，选择了贫穷和唯一的天主。帮助我们放下执着，使我们只穿上你恩宠的外衣。",
    },
    {
      title: "耶稣被钉在十字架上",
      scripture: "当他们到了那名叫髑髅的地方，就在那里把他钉在十字架上。耶稣说：'父啊，宽赦他们吧，因为他们不知道自己在做什么。'（路加福音 23:33-34）",
      meditation: "主，钉子刺穿了你的手和脚——那曾经治愈病人的手和行走于穷人中的脚。你从十字架上宽恕了。赐给我们宽恕伤害我们的人的恩宠，即使它让我们付出一切。",
    },
    {
      title: "耶稣死在十字架上",
      scripture: "耶稣大声呼喊说：'父啊，我把我的灵魂交在你手中'；说了这话，便断了气。（路加福音 23:46）",
      meditation: "日课第九时辰——午后三点——你为世界献出了生命。这是方济各会士诵念七遍天主经纪念你的时辰。我们朝拜你，基督，我们赞美你，因为你以你的十字圣架救赎了普世。",
    },
    {
      title: "耶稣从十字架上被卸下",
      scripture: "阿黎玛特雅的若瑟，一位德高望重的议员，鼓起勇气到比拉多那里要求领取耶稣的遗体。（马尔谷福音 15:43）",
      meditation: "玛利亚把死去的儿子抱在怀里——正如她在白冷城怀抱婴孩时的双臂。主，当我们经历失去与悲伤时，让我们记得即使死亡也不能使我们与你的爱隔绝。",
    },
    {
      title: "耶稣被安葬在坟墓里",
      scripture: "他们取下耶稣的遗体，照犹太人丧葬的习俗，用殓布和香料包裹好了。（若望福音 19:40）",
      meditation: "主，坟墓不是终点。从这黑暗中涌出了复活的光芒。当我们面对生命中最黑暗的时刻，当一切似乎都失去了，请提醒我们：你是从死亡中带来生命、从绝望中带来希望、从悲伤中带来喜乐的天主。",
    },
  ],
};

export const STATIONS_PRAYERS = {
  opening: "We adore you, O Christ, and we praise you.\nBecause by your holy Cross you have redeemed the world.",
  openingLatin: "Adoramus te, Christe, et benedicimus tibi.\nQuia per sanctam crucem tuam redemisti mundum.",
  closing: "Lord Jesus Christ, your passion and death is the sacrifice that unites earth and heaven and reconciles all people to you. May we who have faithfully reflected on these mysteries follow in your steps and so come to share your glory in heaven, where you live and reign with the Father and the Holy Spirit, one God, for ever and ever. Amen.",
  stationResponse: "Lord Jesus, crucified, have mercy on us.",
  stationResponseLatin: "Iesu, crucifixe, miserere nobis.",
};
