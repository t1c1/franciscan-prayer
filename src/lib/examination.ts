// Franciscan Examination of Conscience for Compline
// Based on Franciscan spirituality: poverty, humility, fraternity, creation, peace

export interface ExaminationQuestion {
  category: string;
  question: string;
}

export const EXAMINATION_CATEGORIES = [
  "Poverty & Simplicity",
  "Humility & Obedience",
  "Fraternity & Charity",
  "Care for Creation",
  "Peace & Reconciliation",
  "Prayer & Faithfulness",
];

export const EXAMINATION_QUESTIONS: ExaminationQuestion[] = [
  // Poverty & Simplicity
  { category: "Poverty & Simplicity", question: "Did I cling to material possessions today, or did I hold them lightly as gifts from God?" },
  { category: "Poverty & Simplicity", question: "Was I generous with what I have, sharing with those in need?" },
  { category: "Poverty & Simplicity", question: "Did I allow desires for wealth or comfort to distract me from following Christ?" },
  { category: "Poverty & Simplicity", question: "Did I live simply today, or did I seek more than what I need?" },

  // Humility & Obedience
  { category: "Humility & Obedience", question: "Did I seek my own glory today, or did I give credit to God and others?" },
  { category: "Humility & Obedience", question: "Was I willing to serve others, even in humble or hidden ways?" },
  { category: "Humility & Obedience", question: "Did I accept correction or criticism with grace?" },
  { category: "Humility & Obedience", question: "Did I try to control or dominate others rather than serve them?" },

  // Fraternity & Charity
  { category: "Fraternity & Charity", question: "Did I treat every person I met today as a brother or sister in Christ?" },
  { category: "Fraternity & Charity", question: "Did I speak ill of anyone, gossip, or judge others?" },
  { category: "Fraternity & Charity", question: "Was I patient and kind with those who are difficult to love?" },
  { category: "Fraternity & Charity", question: "Did I reach out to someone who was lonely, sick, or suffering?" },

  // Care for Creation
  { category: "Care for Creation", question: "Did I show reverence for God's creation today — Brother Sun, Sister Moon, Mother Earth?" },
  { category: "Care for Creation", question: "Did I waste food, water, or resources that others lack?" },
  { category: "Care for Creation", question: "Did I take time to praise God for the beauty of the world around me?" },

  // Peace & Reconciliation
  { category: "Peace & Reconciliation", question: "Did I sow peace or division in my words and actions today?" },
  { category: "Peace & Reconciliation", question: "Is there anyone I need to forgive or ask forgiveness from?" },
  { category: "Peace & Reconciliation", question: "Did I respond to anger or frustration with gentleness?" },
  { category: "Peace & Reconciliation", question: "Did I carry resentment or bitterness in my heart today?" },

  // Prayer & Faithfulness
  { category: "Prayer & Faithfulness", question: "Did I make time for prayer and silence today, or was I consumed by busyness?" },
  { category: "Prayer & Faithfulness", question: "Did I listen for God's voice in the events of this day?" },
  { category: "Prayer & Faithfulness", question: "Did I offer my work, joys, and sufferings to God?" },
  { category: "Prayer & Faithfulness", question: "Did I trust in God's providence, or did I give in to worry and anxiety?" },
];

/** Get tonight's examination questions — 5 questions rotating by day */
export function getTonightExamination(): ExaminationQuestion[] {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const questions: ExaminationQuestion[] = [];
  // Pick one from each category, rotating through
  for (let i = 0; i < EXAMINATION_CATEGORIES.length; i++) {
    const catQuestions = EXAMINATION_QUESTIONS.filter(
      (q) => q.category === EXAMINATION_CATEGORIES[i]
    );
    const idx = (dayOfYear + i) % catQuestions.length;
    questions.push(catQuestions[idx]);
  }
  return questions;
}
