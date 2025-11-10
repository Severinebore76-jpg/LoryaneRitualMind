// —————————————————————————————————————————————————————————————
// 🎨 Orelys Ritual Mind — Système de thèmes globaux et mensuels
// Description : définit la palette visuelle pour chaque mois
// + les variantes globales clair/sombre (univers Orelys).
// —————————————————————————————————————————————————————————————

// constants/theme.ts
export type Theme = {
  primary: string;      // Couleur principale (boutons, accents)
  accent: string;       // Ton secondaire (liens, détails)
  background: string;   // Fond global
  card: string;         // Fond des cartes et blocs
  text: string;         // Couleur du texte principal
  surface: string;        // Couleur de surface additionnelle
  error: string;
  buttonText?: string;
  textOnPrimary: string; // Texte lisible sur fond primary
  textOnAccent: string;  // Texte lisible sur fond accent
};

const themesByMonth: Record<number, Theme> = {
  1: { primary: "#c6a56f", accent: "#a68a55", background: "#0A0A0A", card: "#121212", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Janvier — Or doux
  2: { primary: "#d68b8b", accent: "#b46b6b", background: "#0A0A0A", card: "#151111", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Février — Rose vintage
  3: { primary: "#9fc69f", accent: "#7fa77f", background: "#0A0A0A", card: "#111512", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Mars — Vert mousse
  4: { primary: "#bda6e0", accent: "#9c82cb", background: "#0A0A0A", card: "#141017", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Avril — Lavande
  5: { primary: "#c2a468", accent: "#9b844f", background: "#0A0A0A", card: "#1a150f", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Mai — Miel doré
  6: { primary: "#a3c6d9", accent: "#7faec4", background: "#0A0A0A", card: "#101417", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Juin — Bleu clair
  7: { primary: "#d0a890", accent: "#b2856a", background: "#0A0A0A", card: "#171210", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Juillet — Terre cuivrée
  8: { primary: "#e2c489", accent: "#c9a76b", background: "#0A0A0A", card: "#18140d", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Août — Sable chaud
  9: { primary: "#b4b46f", accent: "#999955", background: "#0A0A0A", card: "#14140c", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Septembre — Olive
  10:{ primary: "#c47c4a", accent: "#a4623a", background: "#0A0A0A", card: "#1a100c", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Octobre — Ambre
  11:{ primary: "#8b9ac6", accent: "#6a7aa7", background: "#0A0A0A", card: "#0f1116", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Novembre — Bleu nuit
  12:{ primary: "#d9c8a3", accent: "#bda97f", background: "#0A0A0A", card: "#1a1813", surface: "#191919", text: "#ffffff", error: "#E57373", textOnPrimary: "#F6F2EC", textOnAccent: "#EDE8E2" }, // Décembre — Neige dorée
};

// ✨ Thème clair global Orelys Ritual Mind
export const orelysLightTheme: Theme = {
  primary: "#a48989",     // ton rose terreux chic (accent principal)
  accent: "#c9b1b1",      // beige rosé doux
  background: "#dccfcf",  // fond clair poudré
  card: "#ece8e8",        // fond des cartes et blocs
  surface: "#F1E9E6",  // surface additionnelle douce
  text: "#241718",        // brun aubergine (texte principal)
  error: "#B94A48",
  buttonText: "#FFFFFF",
  textOnPrimary: "#F6F2EC",
  textOnAccent: "#3C2F2F",
};

// 🌙 Thème sombre Orelys Ritual Mind
export const orelysDarkTheme: Theme = {
  primary: "#c9b1b1",     // beige rosé moyen
  accent: "#a48989",      // vieux rose chaud
  background: "#241718",  // brun profond
  card: "#2E1F21",        // version plus claire du fond
  surface: "#2E2E2E",  // surface additionnelle neutre
  text: "#EDE8E2",        // ivoire rosé doux
  error: "#FF6B6B",
  buttonText: "#FFFFFF",
  textOnPrimary: "#1A0F0F",
  textOnAccent: "#1C1212",
};

// Fonction pour récupérer le thème du mois courant
export const getThemeForMonth = (month = new Date().getMonth() + 1): Theme => {
  return themesByMonth[month] || themesByMonth[1];
};

// 🩰 Thème global Orelys — clair & foncé
export const getOrelysTheme = (mode: "light" | "dark" = "light"): Theme => {
  return mode === "dark" ? orelysDarkTheme : orelysLightTheme;
};
export const getErrorColor = (mode: "light" | "dark" = "light") =>
  mode === "dark" ? "#FF6B6B" : "#B94A48";