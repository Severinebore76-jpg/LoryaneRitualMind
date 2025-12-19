// screens/HistoryScreen.tsx
// @ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { ThemedView } from "../components/themed-view";
import { scale, verticalScale } from "../constants/layout";
import { getLoryaneTheme, getThemeForMonth } from "../constants/theme";
import { typography } from "../constants/typography";

import SymbolDisplay from "../components/SymbolDisplay";
import { SYMBOLS_MAP } from "../constants/symbols";

export default function HistoryScreen() {
  const theme = getLoryaneTheme("light");
  const themeMonth = getThemeForMonth(); // ⭐ pour avoir la même couleur que Méditation du Mois

  const [history, setHistory] = useState([]);

  // ----------------------------------------------------------
  // CHARGEMENT HISTORIQUE
  // ----------------------------------------------------------
  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem("ritualHistory");
      const parsed = data ? JSON.parse(data) : [];

      const sorted = parsed.sort(
        (a, b) =>
          new Date(b.dateSaved).getTime() -
          new Date(a.dateSaved).getTime()
      );

      setHistory(sorted.slice(0, 7));
    } catch (err) {
      console.log("Erreur historique :", err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: theme.background }
      ]}
    >
      {/* ⭐ Titre toujours présent + couleur identique à Méditation du mois */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          textAlign: "center",
          marginTop: 40,
          marginBottom: 10,
          color: themeMonth.primary // ⭐ cohérence totale
        }}
      >
        🕰 Historique
      </Text>

      {/* Sous-titre */}
      <Text
  style={{
    marginTop: 4,
    color: theme.text, // ⭐ plus foncé et lisible
    opacity: 0.8,      // ⭐ léger adoucissement pour le rendu luxe
    fontSize: 15,
    fontWeight: "500",
  }}
>
  Tes 7 derniers rituels
</Text>

      {/* État vide */}
      {history.length === 0 && (
        <Text
          style={{
            marginTop: 30,
            color: theme.text,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Aucun rituel sauvegardé pour le moment.
        </Text>
      )}

      {/* LISTE */}
      <ScrollView
        style={{
          width: "100%",
          marginTop: 30,
        }}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {history.map((ritual, index) => (
          <View
            key={index}
            style={[
              styles.card,
              {
                borderColor: themeMonth.primary,
                backgroundColor: "#f7efe8",
              },
            ]}
          >
            {/* Date */}
            <Text
              style={[
                styles.date,
                { color: themeMonth.primary },
              ]}
            >
              {ritual.day}{" "}
              {ritual.month
                .replace(/^\d+_/, "")
                .replace(/_/g, " ")}{" "}
              2026
            </Text>

            {/* Message */}
            <Text style={styles.message}>
              “{ritual.message}”
            </Text>

            {/* Éléments visuels */}
            <View style={styles.elementsRow}>
              {/* Pierre */}
              {ritual.stone && (
                <View style={styles.elementItem}>
                  <Image
                    source={require("../assets/symbols/symbol_crystal.png")}
                    style={styles.elementIcon}
                  />
                  <Text style={styles.elementText}>
                    {ritual.stone}
                  </Text>
                </View>
              )}

              {/* Huile essentielle */}
              {ritual.essential_oil && (
                <View style={styles.elementItem}>
                  <Image
                    source={require("../assets/symbols/symbol_oil.png")}
                    style={styles.elementIcon}
                  />
                  <Text style={styles.elementText}>
                    {ritual.essential_oil}
                  </Text>
                </View>
              )}

              {/* Symbole luxe */}
              {ritual.symbol &&
                SYMBOLS_MAP[ritual.symbol] && (
                  <SymbolDisplay symbol={ritual.symbol} />
                )}
            </View>

            {/* Rituel détaillé */}
            <Text
              style={[
                styles.label,
                { color: themeMonth.primary },
              ]}
            >
              Rituel :
            </Text>

            <Text style={styles.ritualText}>
              {ritual.ritual}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

// ----------------------------------------------------------
// STYLES
// ----------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    paddingTop: 10,
  },

  card: {
    borderWidth: 1,
    borderRadius: scale(14),
    padding: scale(16),
    marginBottom: verticalScale(20),
    width: "100%",
    shadowOpacity: 0.1,
  },

  date: {
    fontSize: typography.size.md,
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "capitalize",
  },

  message: {
    fontSize: typography.size.md,
    fontStyle: "italic",
    marginBottom: 14,
    color: "#3f2f28",
    lineHeight: 22,
  },

  elementsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },

  elementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  elementIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },

  elementText: {
    fontSize: typography.size.sm,
    color: "#3f2f28",
    fontWeight: "500",
  },

  label: {
    fontWeight: "600",
    marginBottom: 4,
    fontSize: typography.size.md,
  },

  ritualText: {
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.relaxed,
    color: "#3f2f28",
  },
});