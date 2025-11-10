// ✅ components/AnimatedIcon.tsx
// ———————————————————————————————————————————
// Icônes de la barre de navigation principale (Accueil, Rituel, Favoris)
// ———————————————————————————————————————————

import { Home, Star } from "lucide-react-native";
import React from "react";
import { Image } from "react-native";
import { getOrelysTheme } from "../constants/theme";

type IconProps = {
  name: "home" | "ritual" | "favorites";
  focused: boolean;
};

export default function AnimatedIcon({ name, focused }: IconProps) {
  const theme = getOrelysTheme("light");
  const color = focused ? theme.primary : theme.accent;

  switch (name) {
    case "home":
      // 🏠 Maison dorée minimaliste
      return <Home size={28} color={color} strokeWidth={1.3} />;

    case "ritual":
      // 🔮 Cristal Orelys statique, teinte harmonisée
      return (
        <Image
          source={require("../assets/images/Icone Orelys.png")}
          style={{
            width: 42,
            height: 42,
            tintColor: color, // applique la couleur dorée sans altérer ton design
          }}
          resizeMode="contain"
        />
      );

    case "favorites":
      // ⭐ Icône favoris (étoile fine)
      return <Star size={28} color={color} strokeWidth={1.2} />;

    default:
      return null;
  }
}