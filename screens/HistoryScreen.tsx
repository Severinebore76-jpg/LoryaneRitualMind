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
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { scale, verticalScale } from "../constants/layout";
import { getOrelysTheme } from "../constants/theme";
import { typography } from "../constants/typography";

// Icônes luxe
import { SYMBOLS_MAP } from "../constants/symbols";

// 🆕 Composant symbole + label
import SymbolDisplay from "../components/SymbolDisplay";

export default function HistoryScreen() {
  const theme = getOrelysTheme("light");
  const [history, setHistory] = useState([]);

  // ----------------------------------------------------------
  // CHARGEMENT HISTORIQUE
  // ----------------------------------------------------------
  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem("ritualHistory");
      const parsed = data ? JSON.parse(data) : [];

      const sorted = parsed.sort(
        (a, b) => new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime()
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
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      
      <ThemedText type="title" style={{ color: theme.text }}>
        🕰 Historique
      </ThemedText>

      <ThemedText style={{ marginTop: 8, color: theme.accent }}>
        Tes 7 derniers rituels
      </ThemedText>

      {history.length === 0 && (
        <ThemedText style={{ marginTop: 30, color: theme.text }}>
          Aucun rituel sauvegardé pour le moment.
        </ThemedText>
      )}

      <ScrollView
        style={{ width: "100%", marginTop: 30 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {history.map((ritual, index) => (
          <View
            key={index}
            style={[
              styles.card,
              {
                borderColor: theme.primary,
                backgroundColor: "#f7efe8"
              },
            ]}
          >

            {/* Date */}
            <Text style={[styles.date, { color: theme.primary }]}>
              {ritual.day} {ritual.month.replace(/^\d+_/, "").replace(/_/g, " ")} 2026
            </Text>

            {/* Message */}
            <Text style={styles.message}>“{ritual.message}”</Text>

            {/* ÉLÉMENTS LUXE */}
            <View style={styles.elementsRow}>

              {/* Pierre */}
              {ritual.stone && (
                <View style={styles.elementItem}>
                  <Image
                    source={require("../assets/symbols/symbol_crystal.png")}
                    style={styles.elementIcon}
                  />
                  <Text style={styles.elementText}>{ritual.stone}</Text>
                </View>
              )}

              {/* Huile essentielle */}
              {ritual.essential_oil && (
                <View style={styles.elementItem}>
                  <Image
                    source={require("../assets/symbols/symbol_oil.png")}
                    style={styles.elementIcon}
                  />
                  <Text style={styles.elementText}>{ritual.essential_oil}</Text>
                </View>
              )}

              {/* 🆕 Symbole + label */}
              {ritual.symbol && SYMBOLS_MAP[ritual.symbol] && (
                <SymbolDisplay symbol={ritual.symbol} />
              )}
            </View>

            {/* Rituel */}
            <Text style={[styles.label, { color: theme.primary }]}>Rituel :</Text>
            <Text style={styles.ritualText}>{ritual.ritual}</Text>
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
    paddingTop: verticalScale(20),
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
  },

  message: {
    fontSize: typography.size.md,
    fontStyle: "italic",
    marginBottom: 14,
    color: "#3f2f28",
  },

  elementsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
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