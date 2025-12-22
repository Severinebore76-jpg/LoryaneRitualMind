// components/SymbolDisplay.tsx
// @ts-nocheck
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { SYMBOL_LABELS } from "../constants/symbol_labels";
import { SYMBOLS_MAP } from "../constants/symbols";
import { typography } from "../constants/typography";

type Props = {
  symbol: string;
  size?: number;
  color?: string;
};

export default function SymbolDisplay({
  symbol,
  size = 22,
  color = "#3f2f28",
}: Props) {
  if (!symbol || !SYMBOLS_MAP[symbol]) return null;

  return (
    <View style={styles.container}>
      <Image
        source={SYMBOLS_MAP[symbol]}
        style={{ width: size, height: size }}
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
  label: {
    fontSize: typography.size.sm,
    fontWeight: "400",
  },
});