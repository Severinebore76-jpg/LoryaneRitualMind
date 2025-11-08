import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

export default function RitualScreen() {
  const [ritual, setRitual] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodayRitual = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://192.168.0.22:5050/api/rituals/today");
      if (!res.ok) throw new Error("Échec de la récupération du rituel");
      const data = await res.json();
      setRitual(data.ritual);
    } catch (err: any) {
      setError(err.message ?? "Erreur inconnue");
    } finally {
      setLoading(false);
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

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );
  }

  if (!ritual) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Aucun rituel trouvé pour aujourd’hui.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>✨ Rituel du jour</Text>

      <View style={styles.card}>
        <Text style={styles.day}>Jour {ritual.day}</Text>

        <Text style={styles.message}>{ritual.message}</Text>

        <View style={styles.ritualBox}>
          <Text style={styles.ritualLabel}>Rituel :</Text>
          <Text style={styles.ritualText}>{ritual.ritual}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.item}>💎 Pierre : <Text style={styles.itemValue}>{ritual.stone}</Text></Text>
          <Text style={styles.item}>🌿 Huile : <Text style={styles.itemValue}>{ritual.essential_oil}</Text></Text>
        </View>

        <Text style={styles.symbol}>{ritual.symbol}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A0A" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" },
  loadingText: { color: "#fff", marginTop: 10 },
  errorText: { color: "#ff6b6b", textAlign: "center", fontSize: 16, padding: 20 },
  title: { color: "#c6a56f", fontSize: 24, fontWeight: "600", marginBottom: 16, textAlign: "center" },
  card: {
    backgroundColor: "#121212",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  day: { color: "#bbb", fontSize: 14, marginBottom: 6, textAlign: "center" },
  message: {
    color: "#fff",
    fontSize: 18,
    fontStyle: "italic",
    marginVertical: 12,
    textAlign: "center",
  },
  ritualBox: { backgroundColor: "#1b1b1b", borderRadius: 10, padding: 14, marginTop: 8 },
  ritualLabel: { color: "#c6a56f", fontWeight: "600", marginBottom: 4 },
  ritualText: { color: "#fff", fontSize: 15, lineHeight: 22 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  item: { color: "#bbb", fontSize: 14 },
  itemValue: { color: "#fff", fontWeight: "600" },
  symbol: { fontSize: 32, textAlign: "center", marginTop: 20, color: "#c6a56f" },
});