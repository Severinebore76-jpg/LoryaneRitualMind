// screens/PremiumScreen.tsx
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";

import SecondaryButton from "../components/ui/buttons/SecondaryButton";

import { getLoryaneTheme } from "../constants/theme";

const PremiumScreen: React.FC = () => {
  const theme = getLoryaneTheme("light");
  const nav = useNavigation();

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TITRE */}
        <ThemedText type="title" style={[styles.title, { color: theme.primary }]}>
          Loryane+
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Un espace intérieur, rien que pour toi.
        </ThemedText>

        {/* PROMESSE */}
        <ThemedView style={styles.heroCard}>
          <ThemedText style={styles.heroTitle}>
            Quand le rituel devient un refuge
          </ThemedText>

          <ThemedText style={styles.heroText}>
            Loryane+ transforme ton rituel en véritable rendez-vous avec toi-même :
            audios guidés, archives complètes, favoris sauvegardés, ambiance sur mesure.
          </ThemedText>

          <ThemedText style={styles.heroHint}>
            Sans engagement. Tu peux arrêter à tout moment.
          </ThemedText>
        </ThemedView>

        {/* AVANTAGES */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.sectionTitle}>
            Ce que Loryane+ débloque
          </ThemedText>

          <ThemedText style={styles.bullet}>✦ Rituels audio-guidés</ThemedText>
          <ThemedText style={styles.bullet}>✦ Accès aux archives complètes</ThemedText>
          <ThemedText style={styles.bullet}>✦ Favoris synchronisés</ThemedText>
          <ThemedText style={styles.bullet}>✦ Rappels personnalisés</ThemedText>
          <ThemedText style={styles.bullet}>✦ Ambiances premium</ThemedText>
        </ThemedView>

        {/* OFFRES — CTA */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.sectionTitle}>
            Choisis ton rythme
          </ThemedText>

          <SecondaryButton
            label="Formule mensuelle — 9,90 € / mois"
            onPress={() => {}}
          />

          <SecondaryButton
            label="Formule annuelle — 94,90 € / an"
            onPress={() => {}}
          />

          <ThemedText style={styles.legalNote}>
            Le paiement sécurisé sera activé ultérieurement.
          </ThemedText>
        </ThemedView>

        {/* SORTIE */}
        <SecondaryButton
          label="Continuer en mode Free"
          onPress={() => nav.goBack()}
          style={{ marginTop: 30 }}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default PremiumScreen;

// ------------------------------------------------------
// STYLES — STRUCTURE SEULEMENT
// ------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  scrollContent: {
    paddingBottom: 40,
    alignItems: "center",
  },

  title: {
    marginTop: 40,
    marginBottom: 4,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#6c5448",
    marginBottom: 20,
  },

  heroCard: {
    width: "94%",
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#d6b98c66",
    backgroundColor: "#f7efe8",
    marginBottom: 20,
  },

  heroTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3f2f28",
    marginBottom: 8,
  },

  heroText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#3f2f28",
    marginBottom: 10,
  },

  heroHint: {
    fontSize: 13,
    color: "#aa755d",
  },

  card: {
    width: "94%",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#d6b98c55",
    backgroundColor: "#f7efe8",
    marginTop: 18,
    gap: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3f2f28",
    marginBottom: 6,
  },

  bullet: {
    fontSize: 14,
    color: "#3f2f28",
  },

  legalNote: {
    fontSize: 11,
    color: "#8a7162",
    marginTop: 10,
  },
});