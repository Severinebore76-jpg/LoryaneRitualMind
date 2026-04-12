// components/ui/elements/DailyElementsRow.tsx
// @ts-nocheck
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { scale, verticalScale } from "../../../constants/layout";
import { typography } from "../../../constants/typography";
import SymbolDisplay from "../../SymbolDisplay";

type Props = {
  stone?: string | null;
  essential_oil?: string | null;
  symbol?: string | null;
};

/**
 * Ligne homogène Pierre / Huile / Symbole
 * - affichage uniquement
 * - aucune logique métier
 * - délégation du symbole à SymbolDisplay
 */
export default function DailyElementsRow({
  stone,
  essential_oil,
  symbol,
}: Props) {
  if (!stone && !essential_oil && !symbol) return null;

  return (
    <View style={styles.row}>
      {stone && (
        <View style={styles.item}>
          <Image
            source={require("../../../assets/symbols/symbol_crystal.png")}
            style={styles.icon}
          />
          <Text style={styles.text} numberOfLines={1}>
            {stone}
          </Text>
        </View>
      )}

      {essential_oil && (
        <View style={styles.item}>
          <Image
            source={require("../../../assets/symbols/symbol_oil.png")}
            style={styles.icon}
          />
          <Text style={styles.text} numberOfLines={1}>
            {essential_oil}
          </Text>
        </View>
      )}

      {symbol && (
        <View style={styles.item}>
          <SymbolDisplay symbol={symbol} size={22} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(6),
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4, // 🔥 ESPACE CONTRÔLÉ entre éléments
    maxWidth: "28%", // 🔥 LIMITE CHAQUE BLOC
    justifyContent: "center",
  },

  icon: {
    width: scale(20),
    height: scale(20),
  },

  text: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.primary,
    fontWeight: "400",
    color: "#3f2f28",
  },

});