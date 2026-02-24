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

export const RULE_I18N: Record<string, { title: string; text: string }[]> = {
  es: [
    {
      title: "¡En el nombre del Señor!",
      text: "La regla y vida de los Hermanos Menores es ésta, a saber: guardar el santo Evangelio de nuestro Señor Jesucristo, viviendo en obediencia, sin propio y en castidad. El hermano Francisco promete obediencia y reverencia al señor papa Honorio y a sus sucesores canónicamente elegidos y a la Iglesia Romana. Y los otros hermanos estén obligados a obedecer al hermano Francisco y a sus sucesores.",
    },
    {
      title: "De aquellos que quieren tomar esta vida",
      text: "Si algunos quieren tomar esta vida y vienen a nuestros hermanos, envíenlos a sus ministros provinciales, a quienes solamente y no a otros se concede licencia de recibir hermanos. Los ministros examínenlos diligentemente sobre la fe católica y los sacramentos de la Iglesia. Y si creen todas estas cosas y las quieren profesar fielmente y observarlas firmemente hasta el fin; y si no tienen esposas, o si las tienen y ya entraron en un monasterio, o si les dieron permiso con la autoridad del obispo diocesano, habiendo ya hecho voto de continencia, y si sus esposas son de tal edad que no pueda surgir sospecha — díganles las palabras del santo Evangelio, que vayan y vendan todo lo que tienen y procuren darlo a los pobres.",
    },
    {
      title: "Del Oficio Divino y del ayuno",
      text: "Los hermanos clérigos recen el Oficio Divino según el rito de la santa Iglesia Romana, excepto el Salterio, por lo cual podrán tener breviarios. Los hermanos legos, en cambio, digan veinticuatro Padrenuestros por maitines; por laudes, cinco; por prima, tercia, sexta y nona, por cada una de éstas, siete; por vísperas, doce; por completas, siete; y oren por los difuntos.",
    },
    {
      title: "Que los hermanos no reciban dinero",
      text: "Mando firmemente a todos los hermanos que de ningún modo reciban dineros o pecunia, ni por sí mismos ni por persona interpuesta. Sin embargo, los ministros y custodios sean los únicos que provean solícitamente, por medio de amigos espirituales, a las necesidades de los enfermos y al vestido de los otros hermanos, según los lugares y tiempos y frías regiones, como vieren que conviene a la necesidad; salvo siempre que, como se ha dicho, no reciban dineros o pecunia.",
    },
    {
      title: "Del modo de trabajar",
      text: "Los hermanos a quienes el Señor ha dado la gracia de trabajar, trabajen fiel y devotamente, de tal suerte que, evitando el ocio, enemigo del alma, no apaguen el espíritu de la santa oración y devoción, al cual las demás cosas temporales deben servir. Como remuneración del trabajo pueden recibir todo lo necesario para el sustento corporal propio y de sus hermanos, pero no dineros o pecunia, y esto con humildad, como conviene a siervos de Dios y seguidores de la santísima pobreza.",
    },
    {
      title: "Que los hermanos no se apropien de nada",
      text: "Los hermanos no se apropien de nada, ni casa, ni lugar, ni cosa alguna. Y como peregrinos y forasteros en este mundo, sirviendo al Señor en pobreza y humildad, vayan por limosna con confianza, y no deben avergonzarse, porque el Señor se hizo pobre por nosotros en este mundo. Ésta es aquella cumbre de la altísima pobreza, que os ha constituido, hermanos míos carísimos, herederos y reyes del reino de los cielos: pobres en cosas, pero exaltados en virtud.",
    },
    {
      title: "De la amonestación y corrección de los hermanos",
      text: "Los hermanos que son ministros y siervos de los otros hermanos, visiten y amonesten a sus hermanos y corríjanlos humilde y caritativamente, no mandándoles nada que vaya contra su alma y nuestra Regla. Los hermanos que están sometidos, recuerden que por Dios han renunciado a sus propias voluntades. Por lo cual les mando firmemente que obedezcan a sus ministros en todo lo que prometieron al Señor observar y no es contrario al alma ni a nuestra Regla.",
    },
    {
      title: "De los que van entre los sarracenos",
      text: "Todos aquellos hermanos que, por divina inspiración, quieran ir entre los sarracenos y otros infieles, pidan para ello licencia a sus ministros provinciales. Los ministros, por su parte, no concedan licencia sino a aquellos que juzguen idóneos para ser enviados. Además, mando por obediencia a los ministros que pidan al señor Papa uno de los cardenales de la santa Iglesia Romana, que sea gobernador, protector y corrector de esta fraternidad, para que, siempre sumisos y sujetos a los pies de la misma santa Iglesia y firmes en la fe católica, observemos la pobreza y la humildad y el santo Evangelio de nuestro Señor Jesucristo, que firmemente hemos prometido.",
    },
  ],
  it: [
    {
      title: "Nel nome del Signore!",
      text: "La regola e la vita dei Frati Minori è questa, cioè osservare il santo Vangelo del Signore nostro Gesù Cristo, vivendo in obbedienza, senza nulla di proprio e in castità. Frate Francesco promette obbedienza e reverenza al signor papa Onorio e ai suoi successori canonicamente eletti e alla Chiesa Romana. E gli altri frati siano tenuti a obbedire a frate Francesco e ai suoi successori.",
    },
    {
      title: "Di coloro che vogliono prendere questa vita",
      text: "Se alcuni vorranno prendere questa vita e verranno dai nostri frati, questi li mandino ai loro ministri provinciali, ai quali soltanto e non ad altri sia concessa la facoltà di ricevere i frati. I ministri poi li esaminino diligentemente intorno alla fede cattolica e ai sacramenti della Chiesa. E se credono tutte queste cose e le vogliono professare fedelmente e osservarle fermamente sino alla fine; e se non hanno moglie, o se l'hanno e la moglie è già entrata in monastero, o se essa ha dato il permesso con l'autorità del vescovo diocesano, avendo già fatto voto di continenza, e se la moglie è di tale età che non possa sorgere sospetto — dicano loro le parole del santo Vangelo, che vadano e vendano tutto quello che hanno e procurino di darlo ai poveri.",
    },
    {
      title: "Dell'Ufficio Divino e del digiuno",
      text: "I frati chierici recitino l'Ufficio Divino secondo il rito della santa Chiesa Romana, eccetto il Salterio, per il quale potranno avere dei breviari. I frati laici, invece, dicano ventiquattro Padre nostro per il mattutino; per le lodi, cinque; per prima, terza, sesta e nona, per ciascuna di queste, sette; per i vespri, dodici; per la compieta, sette; e preghino per i defunti.",
    },
    {
      title: "Che i frati non ricevano denaro",
      text: "Comando fermamente a tutti i frati che in nessun modo ricevano denari o pecunia, né per sé né per interposta persona. Tuttavia, i ministri e i custodi siano i soli a provvedere sollecitamente, per mezzo di amici spirituali, alle necessità dei malati e al vestire degli altri frati, secondo i luoghi e i tempi e le fredde regioni, come vedranno convenire alla necessità; salvo sempre che, come è stato detto, non ricevano denari o pecunia.",
    },
    {
      title: "Del modo di lavorare",
      text: "I frati ai quali il Signore ha dato la grazia di lavorare, lavorino fedelmente e devotamente, in modo tale che, evitando l'ozio, nemico dell'anima, non spengano lo spirito della santa orazione e devozione, al quale tutte le altre cose temporali devono servire. Come ricompensa del lavoro possano ricevere tutto ciò che è necessario al sostentamento proprio e dei fratelli, eccetto denari o pecunia, e questo con umiltà, come conviene a servi di Dio e seguaci della santissima povertà.",
    },
    {
      title: "Che i frati non si approprino di nulla",
      text: "I frati non si approprino di nulla, né casa, né luogo, né alcuna cosa. E come pellegrini e forestieri in questo mondo, servendo il Signore in povertà e umiltà, vadano per l'elemosina con fiducia, né devono vergognarsi, perché il Signore si è fatto povero per noi in questo mondo. Questa è quella celsitudine dell'altissima povertà, che ha costituito voi, fratelli miei carissimi, eredi e re del regno dei cieli: poveri di cose, ma esaltati in virtù.",
    },
    {
      title: "Dell'ammonizione e della correzione dei frati",
      text: "I frati che sono ministri e servi degli altri frati, visitino e ammoniscano i loro fratelli e li correggano umilmente e caritatevolmente, non comandando loro nulla che sia contro la loro anima e la nostra Regola. I frati che sono sottoposti, poi, ricordino che per Dio hanno rinunciato alle proprie volontà. Per cui comando loro fermamente che obbediscano ai loro ministri in tutto ciò che hanno promesso al Signore di osservare e non è contrario all'anima e alla nostra Regola.",
    },
    {
      title: "Di coloro che vanno tra i saraceni",
      text: "Tutti quei frati che, per divina ispirazione, vorranno andare fra i saraceni e gli altri infedeli, ne chiedano il permesso ai loro ministri provinciali. I ministri, poi, non concedano la licenza se non a quelli che giudicheranno idonei ad essere mandati. Inoltre, per obbedienza, impongo ai ministri che chiedano al signor Papa uno dei cardinali della santa Chiesa Romana, che sia governatore, protettore e correttore di questa fraternità, affinché, sempre sudditi e soggetti ai piedi della medesima santa Chiesa e stabili nella fede cattolica, osserviamo la povertà e l'umiltà e il santo Vangelo del Signore nostro Gesù Cristo, che fermamente abbiamo promesso.",
    },
  ],
  fr: [
    {
      title: "Au nom du Seigneur !",
      text: "La règle et la vie des Frères Mineurs est celle-ci, à savoir : observer le saint Évangile de notre Seigneur Jésus-Christ en vivant dans l'obéissance, sans rien en propre et dans la chasteté. Frère François promet obéissance et révérence au seigneur pape Honorius et à ses successeurs canoniquement élus et à l'Église Romaine. Et les autres frères seront tenus d'obéir à frère François et à ses successeurs.",
    },
    {
      title: "De ceux qui veulent embrasser cette vie",
      text: "Si quelques-uns veulent embrasser cette vie et viennent à nos frères, que ceux-ci les envoient à leurs ministres provinciaux, auxquels seuls et non à d'autres est accordée la permission de recevoir des frères. Que les ministres les examinent avec soin sur la foi catholique et les sacrements de l'Église. Et s'ils croient toutes ces choses et veulent les professer fidèlement et les observer fermement jusqu'à la fin ; et s'ils n'ont pas d'épouse, ou si elle est déjà entrée au monastère, ou si elle leur a donné la permission avec l'autorité de l'évêque diocésain, ayant déjà fait vœu de continence, et si l'épouse est d'un tel âge qu'aucun soupçon ne puisse naître — qu'on leur dise les paroles du saint Évangile, qu'ils aillent et vendent tout ce qu'ils ont et tâchent de le donner aux pauvres.",
    },
    {
      title: "De l'Office Divin et du jeûne",
      text: "Les frères clercs réciteront l'Office Divin selon le rite de la sainte Église Romaine, excepté le Psautier, pour quoi ils pourront avoir des bréviaires. Les frères laïcs, cependant, diront vingt-quatre Pater noster pour matines ; pour laudes, cinq ; pour prime, tierce, sexte et none, pour chacune de celles-ci, sept ; pour vêpres, douze ; pour complies, sept ; et qu'ils prient pour les défunts.",
    },
    {
      title: "Que les frères ne reçoivent pas d'argent",
      text: "Je commande fermement à tous les frères de ne recevoir en aucune manière des deniers ou de l'argent, ni par eux-mêmes ni par personne interposée. Toutefois, que les ministres et les custodes soient les seuls à pourvoir avec sollicitude, par des amis spirituels, aux nécessités des malades et au vêtement des autres frères, selon les lieux, les temps et les froids climats, comme ils verront que la nécessité l'exige ; sauf toujours que, comme il a été dit, ils ne reçoivent ni deniers ni argent.",
    },
    {
      title: "De la manière de travailler",
      text: "Les frères à qui le Seigneur a fait la grâce de travailler, qu'ils travaillent fidèlement et dévotement, de telle sorte que, évitant l'oisiveté, ennemie de l'âme, ils n'éteignent pas l'esprit de la sainte oraison et dévotion, auquel toutes les autres choses temporelles doivent être subordonnées. Comme rétribution de leur travail, ils pourront recevoir tout ce qui est nécessaire aux besoins corporels pour eux et pour leurs frères, mais pas des deniers ou de l'argent, et cela avec humilité, comme il convient à des serviteurs de Dieu et des adeptes de la très sainte pauvreté.",
    },
    {
      title: "Que les frères ne s'approprient rien",
      text: "Que les frères ne s'approprient rien, ni maison, ni lieu, ni quoi que ce soit. Et comme des pèlerins et des étrangers en ce monde, servant le Seigneur dans la pauvreté et l'humilité, qu'ils aillent quêter l'aumône avec confiance, et ils ne doivent pas en avoir honte, car le Seigneur s'est fait pauvre pour nous en ce monde. C'est là cette cime de la très haute pauvreté qui vous a faits, mes frères très chers, héritiers et rois du royaume des cieux : pauvres en biens, mais élevés en vertu.",
    },
    {
      title: "De l'admonition et de la correction des frères",
      text: "Les frères qui sont ministres et serviteurs des autres frères, qu'ils visitent et admonestent leurs frères et les corrigent humblement et charitablement, ne leur commandant rien qui soit contre leur âme et notre Règle. Les frères qui sont soumis, cependant, qu'ils se souviennent que pour Dieu ils ont renoncé à leurs propres volontés. C'est pourquoi je leur commande fermement d'obéir à leurs ministres en tout ce qu'ils ont promis au Seigneur d'observer et qui n'est pas contraire à l'âme ni à notre Règle.",
    },
    {
      title: "De ceux qui vont parmi les sarrasins",
      text: "Tous ceux des frères qui, par inspiration divine, voudront aller parmi les sarrasins et autres infidèles, qu'ils en demandent la permission à leurs ministres provinciaux. Les ministres, de leur côté, ne donnent la permission qu'à ceux qu'ils jugeront aptes à être envoyés. En outre, je commande par obéissance aux ministres de demander au seigneur Pape l'un des cardinaux de la sainte Église Romaine, qui serait le gouverneur, le protecteur et le correcteur de cette fraternité, afin que, toujours soumis et prosternés aux pieds de cette même sainte Église et fermes dans la foi catholique, nous observions la pauvreté et l'humilité et le saint Évangile de notre Seigneur Jésus-Christ, que nous avons fermement promis.",
    },
  ],
  zh: [
    {
      title: "因主之名！",
      text: "小兄弟会的规则与生活乃是：遵守我们的主耶稳基督的神圣福音，生活在服从中，不占有任何财物，并守贞洁。方济各弟兄许诺服从和尊敬教宗何诺理及其合法选出的继承者和罗马教会。其余弟兄们也应服从方济各弟兄及其继承者。",
    },
    {
      title: "论愿意接受此生活的人",
      text: "若有人愿意接受此种生活而来到我们弟兄中间，弟兄们应将他送往省会长那里，因为只有省会长，而非其他人，才有接纳弟兄的权力。会长们应仔细考查他关于天主教信仰和教会圣事的认识。若他相信这一切，并愿意忠实地宣信和坚定地遵守到底；若他没有妻子，或者妻子已进入修院，或者妻子在教区主教的准许下已做了守贞的誓愿，且妻子的年龄不致引起怀疑——则当向他宣读神圣福音的话，即他应去变卖所有的一切并设法施舍给穷人。",
    },
    {
      title: "论日课经和斋戒",
      text: "神职弟兄应按照罗马圣教会的礼仪念日课经，但圣咏除外，为此他们可以拥有日课经本。平信徒弟兄则念二十四遍天主经代替晨祷；赞美经五遍；第一时辰、第三时辰、第六时辰和第九时辰各七遍；晚祷十二遍；夜祷七遍；并为亡者祈祷。",
    },
    {
      title: "弟兄们不应接受金钱",
      text: "我严格命令所有弟兄绝不可以自己或通过中间人接受银钱或金钱。但会长和监护人应是唯一通过属灵友人殷勤照料病者需要和其他弟兄衣着的人，要根据地方、时间和寒冷气候的不同，视需要而行；但始终要遵守的是，如上所述，不得接受银钱或金钱。",
    },
    {
      title: "论工作方式",
      text: "那些天主赐予工作恩宠的弟兄，应忠实而虔诚地工作，这样既可避免灵魂的仇敌——懒惰，又不致熄灭神圣祈祷和虔敬的精神，因为一切世俗之事都应服务于此。作为劳动的报酬，他们可以接受自身和弟兄们身体所需的一切，但不可接受银钱或金钱，且应以谦卑的态度接受，如同天主的仆人和至圣贫穷的追随者所应有的那样。",
    },
    {
      title: "弟兄们不应据有任何东西",
      text: "弟兄们不应据有任何东西为己有，无论是房屋、地方或任何事物。他们应如同在此世上的旅客和异乡人，在贫穷和谦卑中服事上主，并信赖地外出募捐，也不应以此为耻，因为主在此世上为我们成了贫穷的。这就是至高贫穷的巅峰，它已使你们，我最亲爱的弟兄们，成为天国的继承者和君王：在财物上贫穷，但在德行上崇高。",
    },
    {
      title: "论对弟兄们的劝勉和纠正",
      text: "身为会长和仆人的弟兄们，应探访和劝勉他们的弟兄，以谦卑和爱德纠正他们，不得命令他们做任何违反灵魂和我们会规的事。而服从的弟兄们应记住，他们为了天主已舍弃了自己的意志。因此，我严格命令他们在一切他们向上主许诺遵守的、不违反灵魂和我们会规的事上服从会长。",
    },
    {
      title: "论前往撒拉森人中间的弟兄",
      text: "凡弟兄中有蒙天主默启愿意前往撒拉森人和其他非信徒中间的，应向各自的省会长请求准许。会长们只准许那些他们认为适合被派遣的弟兄。此外，我以服从之名命令会长们请求教宗委派一位罗马圣教会的枢机主教，作为本兄弟会的治理者、保护者和纠正者，使我们始终顺服于圣教会脚下，坚守天主教信仰，遵守贫穷和谦卑以及我们的主耶稳基督的神圣福音——这是我们所坚定许诺的。",
    },
  ],
};

export function getDailyChapter(): RuleChapter {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return RULE_CHAPTERS[dayOfYear % RULE_CHAPTERS.length];
}
