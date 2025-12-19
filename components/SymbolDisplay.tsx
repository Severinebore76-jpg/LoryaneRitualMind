// components/SymbolDisplay.tsx
// @ts-nocheck
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SYMBOL_LABELS } from "../constants/symbol_labels";
import { SYMBOLS_MAP } from "../constants/symbols";
import { typography } from "../constants/typography";

export default function SymbolDisplay({ symbol, size = 26, color = "#3f2f28" }) {
  if (!symbol || !SYMBOLS_MAP[symbol]) return null;

  return (
    <View style={styles.container}>
      <Image
        source={SYMBOLS_MAP[symbol]}
        style={[styles.icon, { width: size, height: size }]}
        resizeMode="contain"
      />
      <Text style={[styles.label, { color }]}>
        {SYMBOL_LABELS[symbol]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  icon: {
    width: 26,
    height: 26,
  },
  label: {
  fontSize: typography.size.md,
  fontWeight: "500",
},
});