// /constants/meditationAssets.ts
// 📦 Mapping centralisé des assets pour la Méditation du mois

// —————————————————————————————
// 🌄 IMAGES (JPEG)
// —————————————————————————————
export const meditationImages = {
  1: require("../assets/meditations/images/meditation-01-janvier.jpg"),
  2: require("../assets/meditations/images/meditation-02-fevrier.jpg"),
  3: require("../assets/meditations/images/meditation-03-mars.jpg"),
  4: require("../assets/meditations/images/meditation-04-avril.jpg"),
  5: require("../assets/meditations/images/meditation-05-mai.jpg"),
  6: require("../assets/meditations/images/meditation-06-juin.jpg"),
  7: require("../assets/meditations/images/meditation-07-juillet.jpg"),
  8: require("../assets/meditations/images/meditation-08-aout.jpg"),
  9: require("../assets/meditations/images/meditation-09-septembre.jpg"),
  10: require("../assets/meditations/images/meditation-10-octobre.jpg"),
  11: require("../assets/meditations/images/meditation-11-novembre.jpg"),
  12: require("../assets/meditations/images/meditation-12-decembre.jpg"),
};

// —————————————————————————————
// 🎧 AUDIOS (MP3)
// —————————————————————————————
export const meditationAudios = {
  1: require("../assets/meditations/audio/01_Janvier.mp3"),
  2: require("../assets/meditations/audio/02_Fevrier.mp3"),
  3: require("../assets/meditations/audio/03_Mars.mp3"),
  4: require("../assets/meditations/audio/04_Avril.mp3"),
  5: require("../assets/meditations/audio/05_Mai.mp3"),
  6: require("../assets/meditations/audio/06_Juin.mp3"),
  7: require("../assets/meditations/audio/07_Juillet.mp3"),
  8: require("../assets/meditations/audio/08_Aout.mp3"),
  9: require("../assets/meditations/audio/09_Septembre.mp3"),
  10: require("../assets/meditations/audio/10_Octobre.mp3"),
  11: require("../assets/meditations/audio/11_Novembre.mp3"),
  12: require("../assets/meditations/audio/12_Decembre.mp3"),
};

// —————————————————————————————
// 📜 TEXTES (Markdown)
// —————————————————————————————
export const meditationTexts = {
  1: require("../assets/meditations/texts/01_Janvier_Renaissance.json"),
  2: require("../assets/meditations/texts/02_Fevrier_Douceur_et_Amour.json"),
  3: require("../assets/meditations/texts/03_Mars_Confiance.json"),
  4: require("../assets/meditations/texts/04_Avril_Lacher-Prise.json"),
  5: require("../assets/meditations/texts/05_Mai_Vitalite.json"),
  6: require("../assets/meditations/texts/06_Juin_Lumiere.json"),
  7: require("../assets/meditations/texts/07_Juillet_Serenite.json"),
  8: require("../assets/meditations/texts/08_Aout_Alignement.json"),
  9: require("../assets/meditations/texts/09_Septembre_Transformation.json"),
  10: require("../assets/meditations/texts/10_Octobre_Introspection.json"),
  11: require("../assets/meditations/texts/11_Novembre_Guerison.json"),
  12: require("../assets/meditations/texts/12_Decembre_Gratitude.json"),
};

// —————————————————————————————
// ✨ ÉNERGIES DU MOIS
// —————————————————————————————
export const meditationEnergies = {
  1: "Purification, clarté mentale, redémarrage",
  2: "Amour de soi, douceur émotionnelle",
  3: "Vitalité, fraîcheur, renouveau",
  4: "Sérénité, équilibre, recentrage",
  5: "Éveil sensoriel, sensualité, abondance",
  6: "Confiance, libération, intuition",
  7: "Dynamisme, clarté intérieure, ancrage",
  8: "Paix intérieure, stabilité, apaisement",
  9: "Force tranquille, protection, endurance",
  10: "Créativité, chaleur, énergie du cœur",
  11: "Guérison, respiration, clarté d’esprit",
  12: "Protection, régénération, lumière intérieure",
};

// —————————————————————————————
// 🔗 PACK GLOBAL — pour un accès simple dans MeditationScreen
// —————————————————————————————
export const meditationData = {
  1: {
    image: meditationImages[1],
    audio: meditationAudios[1],
    text: meditationTexts[1],
    energy: meditationEnergies[1],
  },
  2: {
    image: meditationImages[2],
    audio: meditationAudios[2],
    text: meditationTexts[2],
    energy: meditationEnergies[2],
  },
  3: {
    image: meditationImages[3],
    audio: meditationAudios[3],
    text: meditationTexts[3],
    energy: meditationEnergies[3],
  },
  4: {
    image: meditationImages[4],
    audio: meditationAudios[4],
    text: meditationTexts[4],
    energy: meditationEnergies[4],
  },
  5: {
    image: meditationImages[5],
    audio: meditationAudios[5],
    text: meditationTexts[5],
    energy: meditationEnergies[5],
  },
  6: {
    image: meditationImages[6],
    audio: meditationAudios[6],
    text: meditationTexts[6],
    energy: meditationEnergies[6],
  },
  7: {
    image: meditationImages[7],
    audio: meditationAudios[7],
    text: meditationTexts[7],
    energy: meditationEnergies[7],
  },
  8: {
    image: meditationImages[8],
    audio: meditationAudios[8],
    text: meditationTexts[8],
    energy: meditationEnergies[8],
  },
  9: {
    image: meditationImages[9],
    audio: meditationAudios[9],
    text: meditationTexts[9],
    energy: meditationEnergies[9],
  },
  10: {
    image: meditationImages[10],
    audio: meditationAudios[10],
    text: meditationTexts[10],
    energy: meditationEnergies[10],
  },
  11: {
    image: meditationImages[11],
    audio: meditationAudios[11],
    text: meditationTexts[11],
    energy: meditationEnergies[11],
  },
  12: {
    image: meditationImages[12],
    audio: meditationAudios[12],
    text: meditationTexts[12],
    energy: meditationEnergies[12],
  },
};