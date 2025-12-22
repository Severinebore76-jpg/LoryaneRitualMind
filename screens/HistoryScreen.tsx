// screens/HistoryScreen.tsx
// @ts-nocheck

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import { ThemedView } from "../components/themed-view";
import BaseCard from "../components/ui/cards/BaseCard";
import DailyElementsRow from "../components/ui/elements/DailyElementsRow";

import { getLoryaneTheme, getThemeForMonth } from "../constants/theme";
import { typography } from "../constants/typography";

export default function HistoryScreen() {
  const theme = getLoryaneTheme("light");
  const themeMonth = getThemeForMonth();
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem("ritualHistory");
    const parsed = data ? JSON.parse(data) : [];

    const sorted = parsed.sort(
      (a, b) =>
        new Date(b.dateSaved).getTime() -
        new Date(a.dateSaved).getTime()
    );

    setHistory(sorted.slice(0, 7));
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: themeMonth.primary }]}>
        🕰 Historique
      </Text>

      <Text style={styles.subtitle}>Tes 7 derniers rituels</Text>

      {history.length === 0 && (
        <Text style={styles.empty}>
          Aucun rituel sauvegardé pour le moment.
        </Text>
      )}

      <ScrollView
        style={{ width: "100%", marginTop: 30 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {history.map((ritual, index) => (
          <BaseCard
            key={index}
            borderColor={themeMonth.primary}
          >
            <Text style={[styles.date, { color: themeMonth.primary }]}>
              {ritual.day}{" "}
              {ritual.month.replace(/^\d+_/, "").replace(/_/g, " ")} 2026
            </Text>

            <Text style={styles.message}>“{ritual.message}”</Text>

            <DailyElementsRow
              stone={ritual.stone}
              essential_oil={ritual.essential_oil}
              symbol={ritual.symbol}
            />

            <Text style={[styles.label, { color: themeMonth.primary }]}>
              Rituel :
            </Text>

            <Text style={styles.ritualText}>{ritual.ritual}</Text>
          </BaseCard>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

// ----------------------------------------------------------
// STYLES (SCREEN ONLY)
// ----------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    paddingTop: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    opacity: 0.8,
    fontWeight: "500",
    color: "#3f2f28",
  },

  empty: {
    marginTop: 30,
    fontSize: 16,
    color: "#3f2f28",
    textAlign: "center",
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