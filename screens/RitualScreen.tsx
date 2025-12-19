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
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoryaneRotatingIcon from "../components/LoryaneRotatingIcon";
import { scale, verticalScale } from "../constants/layout";
import { plantesMensuelles } from "../constants/plantes";
import { getErrorColor, getLoryaneTheme } from "../constants/theme";
import { typography } from "../constants/typography";
import { normalizeMonthKey } from "../utils/normalizeMonthKey";

import SymbolDisplay from "../components/SymbolDisplay";
import { SYMBOLS_MAP } from "../constants/symbols";

export default function RitualScreen() {
  const route = useRoute();
  const fromFavorites = route.params?.fromFavorites || false;
  const favoriteData = route.params?.favorite || null;

  const [ritual, setRitual] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthFile, setMonthFile] = useState<string | null>(null);

  const theme = getLoryaneTheme("light");

  const formatDate2026 = () => {
    const d = new Date();
    const day = d.toLocaleDateString("fr-FR", { day: "numeric" });
    const month = d.toLocaleDateString("fr-FR", { month: "long" });
    return `${day} ${month} 2026`;
  };

  // FAVORIS — chargement
  const loadFavoriteRitual = () => {
    setRitual(favoriteData);
    setMonthFile(favoriteData.month || null);
    setLoading(false);
  };

  // NORMAL — API
  const loadTodayRitual = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://192.168.0.16:5050/api/rituals/today");

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

      const alreadySaved = favorites.some(
        (fav: any) =>
          fav.day === ritual.day &&
          fav.monthNumber === parseInt(monthFile.substring(0, 2))
      );

      if (alreadySaved) {
        Alert.alert("⭐ Déjà enregistré", "Ce rituel est déjà dans vos favoris.");
        return;
      }

      const monthNumber = parseInt(monthFile.substring(0, 2));

      favorites.push({
        ...ritual,
        month: monthFile,
        monthNumber,
        day: ritual.day,
        dateSaved: new Date().toISOString(),
      });

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      Alert.alert("✨ Ajouté", "Ce rituel a été ajouté à vos favoris !");
    } catch {
      Alert.alert("Erreur", "Impossible d’ajouter ce rituel aux favoris.");
    }
  };

  useEffect(() => {
    if (fromFavorites && favoriteData) {
      loadFavoriteRitual();
    } else {
      loadTodayRitual();
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#c6a56f" />
        <Text style={styles.loadingText}>Chargement du rituel...</Text>
      </View>
    );
  }

  if (error || !ritual) {
    return (
      <View style={styles.centered}>
        <Text style={[styles.errorText, { color: getErrorColor("light") }]}>
          ⚠️ {error ?? "Aucun rituel disponible."}
        </Text>
      </View>
    );
  }

  const monthKey = normalizeMonthKey(monthFile);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 100,
          alignItems: "center",
        }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={{ fontSize: 22, marginBottom: 4 }}>✨</Text>

          <Text style={[styles.title, { color: theme.primary }]}>
            Rituel du jour
          </Text>

          <Text style={[styles.subtitle, { color: "#3f2f28", marginTop: 2 }]}>
            {formatDate2026()}
          </Text>
        </View>

        {/* CARTE */}
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

          {/* RITUEL */}
          <View
            style={[
              styles.ritualBox,
              { backgroundColor: "#efe6e0", borderColor: theme.accent },
            ]}
          >
            <Text style={[styles.ritualLabel, { color: "#3f2f28" }]}>Rituel :</Text>
            <Text style={[styles.ritualText, { color: "#3f2f28" }]}>
              {ritual.ritual}
            </Text>
          </View>

          {/* ÉLÉMENTS */}
          <View style={styles.elementsRow}>
            {ritual.stone && (
              <View style={styles.elementItem}>
                <Image
                  source={require("../assets/symbols/symbol_crystal.png")}
                  style={styles.elementIcon}
                />
                <Text style={styles.elementText}>{ritual.stone}</Text>
              </View>
            )}

            {ritual.essential_oil && (
              <View style={styles.elementItem}>
                <Image
                  source={require("../assets/symbols/symbol_oil.png")}
                  style={styles.elementIcon}
                />
                <Text style={styles.elementText}>{ritual.essential_oil}</Text>
              </View>
            )}

            {ritual.symbol && SYMBOLS_MAP[ritual.symbol] && (
              <SymbolDisplay symbol={ritual.symbol} />
            )}
          </View>

          <TouchableOpacity
            onPress={addToFavorites}
            activeOpacity={0.8}
            style={[styles.favoriteBtn, { backgroundColor: theme.accent }]}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              ⭐ Ajouter aux favoris
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// STYLES (inchangés)
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: verticalScale(10) },
  errorText: {
    textAlign: "center",
    fontSize: typography.size.md,
  },
  header: {
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
  },
  subtitle: { fontSize: typography.size.md },
  card: {
    borderRadius: scale(16),
    padding: scale(18),
    borderWidth: 1,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(40),
    backgroundColor: "rgba(255, 245, 240, 0.85)",
    position: "relative",
    overflow: "hidden",
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
    fontSize: typography.size.lg,
    fontStyle: "italic",
    lineHeight: typography.lineHeight.spacious,
    textAlign: "center",
    marginVertical: verticalScale(30),
  },
  iconWrapper: {
    alignItems: "center",
    marginVertical: verticalScale(-60),
  },
  ritualBox: {
    borderRadius: scale(10),
    padding: scale(14),
    marginTop: verticalScale(8),
    borderWidth: 1,
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
  elementsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: verticalScale(20),
  },
  elementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  elementIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  elementText: {
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.primary,
    fontWeight: "500",
    color: "#3f2f28",
  },
  favoriteBtn: {
    marginTop: verticalScale(20),
    borderRadius: scale(8),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    alignSelf: "center",
  },
});