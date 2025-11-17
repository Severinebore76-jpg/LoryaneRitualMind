// —————————————————————————————————————————————————————————————
// 🎨 Orelys Ritual Mind — Système de thèmes globaux et mensuels
// Description : définit la palette visuelle pour chaque mois
// + les variantes globales clair/sombre (univers Orelys).
// —————————————————————————————————————————————————————————————

export type Theme = {
  primary: string;       // Couleur principale (boutons, accents)
  accent: string;        // Ton secondaire
  background: string;    // Fond global
  card: string;          // Fond des cartes
  text: string;          // Couleur du texte principal
  surface: string;       // Couleur de surface
  error: string;
  buttonText?: string;
  textOnPrimary: string; // Texte lisible sur fond primary
  textOnAccent: string;  // Texte lisible sur fond accent
};

// ————————————————————————————————————
// 🎨 THÈMES MENSUELS
// ————————————————————————————————————
const themesByMonth: Record<number, Theme> = {
  1: { primary: "#a48989", accent: "#c9b1b1", background: "#dccfcf", card: "#ece8e8", surface: "#F1E9E6", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" }, 
  2: { primary: "#b08d8d", accent: "#d6bcbc", background: "#dccfcf", card: "#f0e9e9", surface: "#F6EDED", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
  3: { primary: "#c7a58f", accent: "#d8bda9", background: "#dccfcf", card: "#f1ebe7", surface: "#F6EFEA", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
  4: { primary: "#cfb7a5", accent: "#e3d0c2", background: "#dccfcf", card: "#f3eeeb", surface: "#FAF6F4", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
  5: { primary: "#c5a07c", accent: "#dec2a3", background: "#dccfcf", card: "#f3ede8", surface: "#F8F2ED", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
  6: { primary: "#bfa493", accent: "#d7c4b6", background: "#dccfcf", card: "#f2ece9", surface: "#F8F3F1", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
  7: { primary: "#c29b88", accent: "#ddbdaa", background: "#dccfcf", card: "#f4eeeb", surface: "#FBF6F4", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
  8: { primary: "#d4b08f", accent: "#e8cdb3", background: "#dccfcf", card: "#f6efea", surface: "#FDF7F2", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
  9: { primary: "#c7aa9a", accent: "#e1c9bd", background: "#dccfcf", card: "#f7f1ed", surface: "#FCF7F4", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
  10:{ primary: "#c89a7c", accent: "#e0bca3", background: "#dccfcf", card: "#f5ede8", surface: "#FBF3EF", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
  11:{ primary: "#b79986", accent: "#d0b6a9", background: "#dccfcf", card: "#f3ece9", surface: "#F9F3F1", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
  12:{ primary: "#d3bfa9", accent: "#e8d9c9", background: "#dccfcf", card: "#f6f0ea", surface: "#FDF7F2", text: "#241718", error: "#B94A48", textOnPrimary: "#FFFFFF", textOnAccent: "#3C2F2F" },
};

// ————————————————————————————————————
// ✨ THÈME CLAIR GLOBAL
// ————————————————————————————————————
export const orelysLightTheme: Theme = {
  primary: "#a48989",
  accent: "#c9b1b1",
  background: "#dccfcf",
  card: "#ece8e8",
  surface: "#F1E9E6",
  text: "#241718",
  error: "#B94A48",
  buttonText: "#FFFFFF",
  textOnPrimary: "#F6F2EC",
  textOnAccent: "#3C2F2F",
};

// ————————————————————————————————————
// 🌙 THÈME SOMBRE GLOBAL
// ————————————————————————————————————
export const orelysDarkTheme: Theme = {
  primary: "#c9b1b1",
  accent: "#a48989",
  background: "#241718",
  card: "#2E1F21",
  surface: "#2E2E2E",
  text: "#EDE8E2",
  error: "#FF6B6B",
  buttonText: "#FFFFFF",
  textOnPrimary: "#1A0F0F",
  textOnAccent: "#1C1212",
};

// ————————————————————————————————————
// 🔧 Fonctions utilitaires
// ————————————————————————————————————
export const getThemeForMonth = (month = new Date().getMonth() + 1): Theme => {
  return themesByMonth[month] || themesByMonth[1];
};

export const getOrelysTheme = (mode: "light" | "dark" = "light"): Theme => {
  return mode === "dark" ? orelysDarkTheme : orelysLightTheme;
};

export const getErrorColor = (mode: "light" | "dark" = "light") =>
  mode === "dark" ? "#FF6B6B" : "#B94A48";

// ————————————————————————————————————
// 🎨 Compatibilité pour useThemeColor()
// ————————————————————————————————————
export const Colors = {
  light: {
    primary: orelysLightTheme.primary,
    accent: orelysLightTheme.accent,
    background: orelysLightTheme.background,
    card: orelysLightTheme.card,
    surface: orelysLightTheme.surface,
    text: orelysLightTheme.text,
    error: orelysLightTheme.error,
    textOnPrimary: orelysLightTheme.textOnPrimary,
    textOnAccent: orelysLightTheme.textOnAccent,
  },

  dark: {
    primary: orelysDarkTheme.primary,
    accent: orelysDarkTheme.accent,
    background: orelysDarkTheme.background,
    card: orelysDarkTheme.card,
    surface: orelysDarkTheme.surface,
    text: orelysDarkTheme.text,
    error: orelysDarkTheme.error,
    textOnPrimary: orelysDarkTheme.textOnPrimary,
    textOnAccent: orelysDarkTheme.textOnAccent,
  },
} as const;