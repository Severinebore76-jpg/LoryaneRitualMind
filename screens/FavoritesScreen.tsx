// screens/FavoritesScreen.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OrelysRotatingIcon from "../components/OrelysRotatingIcon";
import type { Theme } from "../constants/theme";
import { getErrorColor, getOrelysTheme, getThemeForMonth } from "../constants/theme";

export default function FavoritesScreen() {
  const theme = getOrelysTheme("light");
  const styles = makeStyles(theme);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      const data = stored ? JSON.parse(stored) : [];
      setFavorites(data);
    } catch (err) {
      console.error("❌ Erreur chargement favoris :", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (index: number) => {
    try {
      const updated = [...favorites];
      updated.splice(index, 1);
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(updated);
    } catch (err) {
      console.error("Erreur suppression favori :", err);
    }
  };

  const clearFavorites = async () => {
    Alert.alert("Confirmation", "Supprimer tous les favoris ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("favorites");
          setFavorites([]);
        },
      },
    ]);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "#fff" }}>Chargement des favoris...</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
      <Text style={{ color: getErrorColor("light"), fontSize: 16, fontWeight: "500" }}>
  </Text>
</View>
    );
  }

  // ✅ Rendu principal
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>⭐ Mes rituels favoris</Text>

      {favorites.map((item, idx) => {
        const theme = getThemeForMonth(
          Number(item.month?.substring(0, 2)) || new Date(item.dateSaved).getMonth() + 1
        );

        return (
          <View key={idx} style={[styles.card, { borderColor: theme.primary }]}>
            <Text style={[styles.date, { color: theme.accent }]}>
              {new Date(item.dateSaved).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>

            <Text style={[styles.message, { color: theme.primary }]}>{item.message}</Text>

            <Text style={styles.details}>
              💎 {item.stone} | 🌿 {item.essential_oil} | {item.symbol}
            </Text>

            <TouchableOpacity onPress={() => removeFavorite(idx)} style={styles.removeBtn}>
              <Text style={styles.removeText}>Retirer</Text>
            </TouchableOpacity>
          </View>
        );
      })}
        <View style={styles.iconWrapper}>
          <OrelysRotatingIcon />
        </View>

      <TouchableOpacity onPress={clearFavorites} style={styles.clearBtn}>
        <Text style={styles.clearText}>🗑️ Supprimer tous les favoris</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background },
    title: { color: theme.primary, fontSize: 22, fontWeight: "600", textAlign: "center", marginBottom: 20 },
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.primary,
    },
    date: { fontSize: 13, marginBottom: 8, textTransform: "capitalize", color: theme.accent },
    message: { fontSize: 16, fontStyle: "italic", marginBottom: 8, color: theme.text },
    details: { color: theme.text, fontSize: 13, marginBottom: 8 },
    removeBtn: {
      backgroundColor: theme.accent,
      borderRadius: 6,
      paddingVertical: 6,
      alignItems: "center",
    },
    removeText: { color: "#c6a56f", fontWeight: "600" },
    
    iconWrapper: { 
      alignItems: "center", 
      marginVertical: 30,
    },
    
    clearBtn: {
      marginTop: 20,
      backgroundColor: theme.primary,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
    },
    clearText: { color: "#c6a56f", fontWeight: "600" },
  });