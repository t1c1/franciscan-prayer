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

export const STATIONS_PRAYERS = {
  opening: "We adore you, O Christ, and we praise you.\nBecause by your holy Cross you have redeemed the world.",
  openingLatin: "Adoramus te, Christe, et benedicimus tibi.\nQuia per sanctam crucem tuam redemisti mundum.",
  closing: "Lord Jesus Christ, your passion and death is the sacrifice that unites earth and heaven and reconciles all people to you. May we who have faithfully reflected on these mysteries follow in your steps and so come to share your glory in heaven, where you live and reign with the Father and the Holy Spirit, one God, for ever and ever. Amen.",
  stationResponse: "Lord Jesus, crucified, have mercy on us.",
  stationResponseLatin: "Iesu, crucifixe, miserere nobis.",
};
