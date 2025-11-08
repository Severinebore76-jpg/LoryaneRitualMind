// screens/HomeScreen.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const nav = useNavigation();
  const [loading, setLoading] = useState(false);
  const [apiOk, setApiOk] = useState<null | { ok: boolean; message?: string }>(null);

  const testApi = async () => {
    try {
      setLoading(true);
      // iOS Simulator → localhost = ta machine (OK).
      // Si tu passes sur iPhone physique : remplace par l’IP de ton Mac, ex: http://192.168.0.xx:5050
      const res = await fetch("http://192.168.0.22:5050/api/test");
      const data = await res.json();
      setApiOk({ ok: true, message: data?.message ?? "OK" });
    } catch (e: any) {
      setApiOk({ ok: false, message: e?.message ?? "Erreur" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accueil — Orelys Ritual Mind</Text>

      {loading && <ActivityIndicator size="small" />}

      {apiOk && (
        <View style={[styles.badge, apiOk.ok ? styles.badgeOk : styles.badgeKo]}>
          <Text style={styles.badgeText}>
            API {apiOk.ok ? "OK" : "KO"} {apiOk.message ? `— ${apiOk.message}` : ""}
          </Text>
        </View>
      )}

      <View style={styles.row}>
        <Button title="Aller au Rituel" onPress={() => nav.navigate("Rituel" as never)} />
        <View style={{ width: 12 }} />
        <Button title="Voir l'historique" onPress={() => nav.navigate("Historique" as never)} />
      </View>

      <View style={{ height: 16 }} />
      <Button title="Re-tester l’API" onPress={testApi} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A0A", padding: 20, alignItems: "center", justifyContent: "center" },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "600", marginBottom: 16, textAlign: "center" },
  row: { flexDirection: "row", marginTop: 8 },
  badge: { marginTop: 12, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  badgeOk: { backgroundColor: "#1f6f43" },
  badgeKo: { backgroundColor: "#7a1f1f" },
  badgeText: { color: "#FFFFFF", fontSize: 13 },
});