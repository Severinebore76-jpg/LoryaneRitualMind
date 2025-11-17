// /constants/meditationEnergies.ts

export const energiesByMonth = {
  1: {
    name: "Janvier",
    description: "Purification, clarté mentale, redémarrage",
  },
  2: {
    name: "Février",
    description: "Amour de soi, douceur émotionnelle",
  },
  3: {
    name: "Mars",
    description: "Vitalité, fraîcheur, renouveau",
  },
  4: {
    name: "Avril",
    description: "Sérénité, équilibre, recentrage",
  },
  5: {
    name: "Mai",
    description: "Éveil sensoriel, sensualité, abondance",
  },
  6: {
    name: "Juin",
    description: "Confiance, libération, intuition",
  },
  7: {
    name: "Juillet",
    description: "Dynamisme, clarté intérieure, ancrage",
  },
  8: {
    name: "Août",
    description: "Paix intérieure, stabilité, apaisement",
  },
  9: {
    name: "Septembre",
    description: "Force tranquille, protection, endurance",
  },
  10: {
    name: "Octobre",
    description: "Créativité, chaleur, énergie du cœur",
  },
  11: {
    name: "Novembre",
    description: "Guérison, respiration, clarté d’esprit",
  },
  12: {
    name: "Décembre",
    description: "Protection, régénération, lumière intérieure",
  },
} as const;

export type EnergyMonth = keyof typeof energiesByMonth;
