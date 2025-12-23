// screens/FavoritesScreen.tsx
// @ts-nocheck

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import LoryaneRotatingIcon from "../components/LoryaneRotatingIcon";
import SecondaryButton from "../components/ui/buttons/SecondaryButton";
import BaseCard from "../components/ui/cards/BaseCard";
import DailyElementsRow from "../components/ui/elements/DailyElementsRow";

import type { Theme } from "../constants/theme";
import {
  getErrorColor,
  getLoryaneTheme,
  getThemeForMonth,
} from "../constants/theme";

export default function FavoritesScreen() {
  const theme = getLoryaneTheme("light");
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const migrateOldFavorites = async (oldList: any[]) => {
    let changed = false;

    const updated = oldList.map((fav) => {
      if (fav.dateSaved && fav.day && fav.monthNumber && fav.year) return fav;

      changed = true;

      const monthNumber = fav.month
        ? parseInt(fav.month.substring(0, 2))
        : new Date().getMonth() + 1;

      const day = fav.day || new Date().getDate();
      const d = new Date(2025, monthNumber - 1, day);

      return {
        ...fav,
        day,
        monthNumber,
        year: 2025,
        dateSaved: d.toISOString(),
      };
    });

    if (changed) {
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    }

    return updated;
  };

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      const data = stored ? JSON.parse(stored) : [];
      const migrated = await migrateOldFavorites(data);
      setFavorites(migrated);
    } catch (err) {
      console.error("❌ Erreur chargement favoris :", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (index: number) => {
    const updated = [...favorites];
    updated.splice(index, 1);
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
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
        <Text style={{ color: "#3f2f28" }}>Chargement des favoris...</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={[styles.centered, { paddingHorizontal: 20 }]}>
        <Text style={styles.pageTitle}>⭐ Mes rituels favoris</Text>
        <Text style={styles.emptyText}>Aucun favori pour le moment.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>⭐ Mes rituels favoris</Text>

      {favorites.map((item, idx) => {
        const themeMonth = getThemeForMonth(item.monthNumber);

        const date = new Date(item.dateSaved).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        return (
          <BaseCard key={idx} borderColor={themeMonth.primary}>
            <Text style={styles.date}>{date}</Text>

            <Text style={styles.message}>“{item.message}”</Text>

            <DailyElementsRow
              stone={item.stone}
              essential_oil={item.essential_oil}
              symbol={item.symbol}
            />

            <SecondaryButton
              label="RETIRER"
              onPress={() => removeFavorite(idx)}
              style={{ marginTop: 14 }}
            />
          </BaseCard>
        );
      })}

      <View style={styles.iconWrapper}>
        <LoryaneRotatingIcon />
      </View>

      <SecondaryButton
        label="🗑️ Supprimer tous les favoris"
        onPress={clearFavorites}
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
}

// ===================================================================
// 🎨 STYLES — SCREEN ONLY
// ===================================================================
const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },

    pageTitle: {
      fontSize: 26,
      fontWeight: "700",
      textAlign: "center",
      color: theme.primary,
      marginBottom: 25,
      marginTop: 40,
    },

    emptyText: {
      color: getErrorColor("light"),
      fontSize: 16,
      fontWeight: "500",
      textAlign: "center",
    },

    date: {
      fontSize: 13,
      marginBottom: 8,
      textTransform: "capitalize",
      color: "#3f2f28",
    },

    message: {
      fontSize: 16,
      fontStyle: "italic",
      marginBottom: 12,
      lineHeight: 22,
      color: "#3f2f28",
    },

    iconWrapper: {
      alignItems: "center",
      marginVertical: 40,
    },
  });