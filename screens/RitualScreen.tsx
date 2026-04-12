// screens/RitualScreen.tsx
// @ts-nocheck

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ScreenContainer from "../components/layout/ScreenContainer"; // ✅ NEW

import LoryaneRotatingIcon from "../components/LoryaneRotatingIcon";
import PrimaryButton from "../components/ui/buttons/PrimaryButton";
import BaseCard from "../components/ui/cards/BaseCard";
import DailyElementsRow from "../components/ui/elements/DailyElementsRow";

import { scale, verticalScale } from "../constants/layout";
import { plantesMensuelles } from "../constants/plantes";
import { getErrorColor, getLoryaneTheme } from "../constants/theme";
import { typography } from "../constants/typography";
import { normalizeMonthKey } from "../utils/normalizeMonthKey";

export default function RitualScreen() {
  const route = useRoute();
  const fromFavorites = route.params?.fromFavorites || false;
  const favoriteData = route.params?.favorite || null;

  const [ritual, setRitual] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthFile, setMonthFile] = useState<string | null>(null);

  const theme = getLoryaneTheme("light");

  const formatDate = () => {
    const d = new Date();
    const day = d.toLocaleDateString("fr-FR", { day: "numeric" });
    const month = d.toLocaleDateString("fr-FR", { month: "long" });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const loadFavoriteRitual = () => {
    setRitual(favoriteData);
    setMonthFile(favoriteData.month || null);
    setLoading(false);
  };

  const loadTodayRitual = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://192.168.0.38:5050/api/rituals/today");
      if (!res.ok) throw new Error("Échec de la récupération du rituel");

      const data = await res.json();
      setRitual(data.ritual);
      setMonthFile(data.month);

      await saveRitualToHistory(data);
    } catch (err: any) {
      setError(err.message ?? "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const saveRitualToHistory = async (data: any) => {
    try {
      const existing = await AsyncStorage.getItem("ritualHistory");
      const history = existing ? JSON.parse(existing) : [];

      const exists = history.some(
        (r: any) => r.day === data.ritual.day && r.month === data.month
      );

      if (!exists) {
        const updated = [
          ...history,
          {
            ...data.ritual,
            month: data.month,
            monthNumber: parseInt(data.month.substring(0, 2)),
            day: data.ritual.day,
            dateSaved: new Date().toISOString(),
          },
        ];
        await AsyncStorage.setItem("ritualHistory", JSON.stringify(updated));
      }
    } catch {
      Alert.alert("Erreur", "Impossible de sauvegarder le rituel localement.");
    }
  };

  const addToFavorites = async () => {
    try {
      if (!ritual) return;

      const existingFavorites = await AsyncStorage.getItem("favorites");
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      const monthNumber = parseInt(monthFile.substring(0, 2));
      const year = new Date().getFullYear();

      const alreadySaved = favorites.some(
        (fav: any) =>
          fav.day === ritual.day &&
          fav.monthNumber === monthNumber &&
          fav.year === year
      );

      if (alreadySaved) {
        Alert.alert("⭐ Déjà enregistré", "Ce rituel est déjà dans vos favoris.");
        return;
      }

      favorites.push({
        ...ritual,
        month: monthFile,
        monthNumber,
        day: ritual.day,
        year,
        dateSaved: new Date().toISOString(),
      });

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      Alert.alert("✨ Ajouté", "Ce rituel a été ajouté à vos favoris !");
    } catch {
      Alert.alert("Erreur", "Impossible d’ajouter ce rituel aux favoris.");
    }
  };

  useEffect(() => {
    if (fromFavorites && favoriteData) loadFavoriteRitual();
    else loadTodayRitual();
  }, []);

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#c6a56f" />
          <Text style={styles.loadingText}>Chargement du rituel...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !ritual) {
    return (
      <ScreenContainer>
        <View style={styles.centered}>
          <Text style={[styles.errorText, { color: getErrorColor("light") }]}>
            ⚠️ {error ?? "Aucun rituel disponible."}
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  const monthKey = normalizeMonthKey(monthFile);

  return (
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 60,
          alignItems: "center",
        }}
      >
        <View style={styles.header}>
          <Text style={{ fontSize: 22, marginBottom: 4 }}>✨</Text>

          <Text style={[styles.title, { color: theme.primary }]}>
            Rituel du jour
          </Text>

          <Text style={[styles.subtitle, { color: theme.primary }]}>
            {formatDate()}
          </Text>
        </View>

        <View style={[styles.card, { borderColor: theme.primary }]}>
          <Image
            source={plantesMensuelles[monthKey] || plantesMensuelles.default}
            style={styles.cardBackground}
          />

          <Text style={[styles.message, { color: theme.primary }]}>
            {ritual.message}
          </Text>

          <View style={[styles.iconWrapper, { height: 220 }]}>
            <View pointerEvents="none">
              <LoryaneRotatingIcon />
            </View>
          </View>

          <BaseCard
            borderColor={theme.accent}
            style={[styles.ritualBoxOverrides, { backgroundColor: "#f4e7e3" }]}
          >
            <Text style={[styles.ritualLabel, { color: "#3f2f28" }]}>
              Rituel :
            </Text>

            <Text style={[styles.ritualText, { color: "#3f2f28" }]}>
              {ritual.ritual}
            </Text>
          </BaseCard>

          <DailyElementsRow
            stone={ritual.stone}
            essential_oil={ritual.essential_oil}
            symbol={ritual.symbol}
          />
        </View>
        <View style={{ marginTop: verticalScale(30) }}>
          <PrimaryButton
            label="Ajouter aux favoris"
            icon="⭐"
            size="md"
            onPress={addToFavorites}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: verticalScale(10) },
  errorText: { textAlign: "center", fontSize: typography.size.md },

  header: {
    alignItems: "center",
    marginBottom: verticalScale(10),
  },

  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
  },

  subtitle: {
    fontSize: typography.size.md,
  },

  card: {
    borderRadius: scale(20),
    padding: scale(18),
    borderWidth: 1,
    marginTop: verticalScale(40),
    marginBottom: verticalScale(40),
    backgroundColor: "rgba(255, 245, 240, 0.85)",
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },

  cardBackground: {
    position: "absolute",
    top: 0,
    width: "120%",
    height: "120%",
    resizeMode: "cover",
    opacity: 1,
    zIndex: -1,
    transform: [{ scale: 1.05 }],
  },

  message: {
    fontSize: typography.size.md,
    fontStyle: "italic",
    lineHeight: typography.lineHeight.spacious,
    textAlign: "center",
    marginVertical: verticalScale(30),
  },

  iconWrapper: {
    alignItems: "center",
    marginVertical: verticalScale(-60),
  },

  ritualBoxOverrides: {
    borderRadius: scale(10),
    padding: scale(14),
    marginTop: verticalScale(8),
    shadowOpacity: 0,
    elevation: 0,
  },

  ritualLabel: {
    fontWeight: "600",
    marginBottom: verticalScale(4),
    fontSize: typography.size.md,
  },

  ritualText: {
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.relaxed,
  },
});