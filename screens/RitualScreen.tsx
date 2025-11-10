// @ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrelysRotatingIcon from "../components/OrelysRotatingIcon";
import { moderateScale, scale, verticalScale } from "../constants/layout";
import { getErrorColor, getOrelysTheme } from "../constants/theme";
import { typography } from "../constants/typography";

export default function RitualScreen() {
  const [ritual, setRitual] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthFile, setMonthFile] = useState<string | null>(null);
  const theme = getOrelysTheme("light");

  const formatDate2026 = () => {
    const d = new Date();
    const day = d.toLocaleDateString("fr-FR", { day: "numeric" });
    const month = d.toLocaleDateString("fr-FR", { month: "long" });
    return `${day} ${month} 2026`;
  };

  const loadTodayRitual = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://192.168.0.22:5050/api/rituals/today");
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
        (fav: any) => fav.day === ritual.day && fav.month === monthFile
      );
      if (alreadySaved) {
        Alert.alert("⭐ Déjà enregistré", "Ce rituel est déjà dans vos favoris.");
        return;
      }
      favorites.push({
        ...ritual,
        month: monthFile,
        dateAdded: new Date().toISOString(),
      });
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      Alert.alert("✨ Ajouté", "Ce rituel a été ajouté à vos favoris !");
    } catch {
      Alert.alert("Erreur", "Impossible d’ajouter ce rituel aux favoris.");
    }
  };

  useEffect(() => {
    loadTodayRitual();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#c6a56f" />
        <Text style={styles.loadingText}>Chargement du rituel du jour...</Text>
      </View>
    );
  }

  if (error || !ritual) {
    return (
      <View style={styles.centered}>
        <Text style={[styles.errorText, { color: getErrorColor("light") }]}>
          ⚠️ {error ?? "Aucun rituel disponible pour aujourd’hui."}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={{ fontSize: 22, marginBottom: 4 }}>✨</Text>
          <Text style={[styles.title, { color: theme.primary }]}>
            Rituel du jour
          </Text>
          <Text style={[styles.subtitle, { color: "#3f2f28", marginTop: 2 }]}>
            {formatDate2026()}
          </Text>
          {monthFile && (
            <Text style={[styles.subtitle, { color: "#3f2f28" }]}>
              {monthFile.replace(/^\d+_/, "").replace(/_/g, " ")}
            </Text>
          )}
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.primary },
          ]}
        >
          <Text style={[styles.message, { color: theme.primary }]}>
            {ritual.message}
          </Text>

          <View style={[styles.iconWrapper, { overflow: "visible" }]}>
            <OrelysRotatingIcon />
          </View>

          <View
            style={[
              styles.ritualBox,
              { backgroundColor: "#efe6e0", borderColor: theme.accent },
            ]}
          >
            <Text style={[styles.ritualLabel, { color: "#3f2f28" }]}>
              Rituel :
            </Text>
            <Text style={[styles.ritualText, { color: "#3f2f28" }]}>
              {ritual.ritual}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.item, { color: "#3f2f28" }]}>
              💎 Pierre :{" "}
              <Text style={[styles.itemValue, { color: theme.primary }]}>
                {ritual.stone}
              </Text>
            </Text>
            <Text style={[styles.item, { color: "#3f2f28" }]}>
              🌿 Huile :{" "}
              <Text style={[styles.itemValue, { color: theme.primary }]}>
                {ritual.essential_oil}
              </Text>
            </Text>
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

          <Text style={[styles.symbol, { color: theme.primary }]}>
            {ritual.symbol}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: verticalScale(10) },
  errorText: { textAlign: "center", fontSize: typography.size.md },
  header: { alignItems: "center", justifyContent: "center", marginBottom: verticalScale(10) },
  title: { fontSize: typography.size.xl, fontWeight: typography.weight.semibold, textAlign: "center" },
  subtitle: { fontSize: typography.size.md, textAlign: "center" },
  card: { borderRadius: scale(16), padding: scale(18), shadowOpacity: 0.3, elevation: 4, borderWidth: 1, marginTop: verticalScale(20), marginBottom: verticalScale(40) },
  message: { fontSize: typography.size.lg, fontStyle: "italic", lineHeight: typography.lineHeight.spacious, textAlign: "center", marginBottom: verticalScale(30), marginTop: verticalScale(20) },
  iconWrapper: { alignItems: "center", marginVertical: verticalScale(4) },
  ritualBox: { borderRadius: scale(10), padding: scale(14), marginTop: verticalScale(8), borderWidth: 1 },
  ritualLabel: { fontWeight: "600", marginBottom: verticalScale(4), fontSize: typography.size.md },
  ritualText: { fontSize: typography.size.md, lineHeight: typography.lineHeight.relaxed },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: verticalScale(12) },
  item: { fontSize: typography.size.sm },
  itemValue: { fontWeight: "600" },
  symbol: { fontSize: moderateScale(30), textAlign: "center", marginTop: verticalScale(16) },
  favoriteBtn: { marginTop: verticalScale(30), borderRadius: scale(8), paddingVertical: verticalScale(12), paddingHorizontal: scale(24), alignSelf: "center" },
  scrollContent: { flexGrow: 1, justifyContent: "flex-start", alignItems: "center", paddingHorizontal: scale(20), paddingTop: verticalScale(40), paddingBottom: verticalScale(80) },
});