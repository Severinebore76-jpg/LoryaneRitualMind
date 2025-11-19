// screens/PremiumScreen.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { getLoryaneTheme } from "../constants/theme";

const PremiumScreen: React.FC = () => {
  const theme = getLoryaneTheme("light");
  const nav = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const accent = "#aa755d";
  const cardBg = "#f7efe8";

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TITRE / HERO */}
        <ThemedText type="title" style={[styles.title, { color: theme.primary }]}>
          Loryane+
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Un espace intérieur, rien que pour toi.
        </ThemedText>

        {/* BLOC STORY / PROMESSE */}
        <ThemedView style={[styles.heroCard, { backgroundColor: cardBg }]}>
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

        {/* BLOC AVANTAGES CLÉS */}
        <ThemedView style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText style={styles.sectionTitle}>
            Ce que Loryane+ débloque
          </ThemedText>

          <View style={styles.bulletRow}>
            <ThemedText style={styles.bulletIcon}>✦</ThemedText>
            <ThemedText style={styles.bulletText}>
              Rituels audio-guidés pour t’accompagner pas à pas.
            </ThemedText>
          </View>

          <View style={styles.bulletRow}>
            <ThemedText style={styles.bulletIcon}>✦</ThemedText>
            <ThemedText style={styles.bulletText}>
              Accès complet aux archives : 365 jours de messages & rituels.
            </ThemedText>
          </View>

          <View style={styles.bulletRow}>
            <ThemedText style={styles.bulletIcon}>✦</ThemedText>
            <ThemedText style={styles.bulletText}>
              Favoris synchronisés entre tes appareils.
            </ThemedText>
          </View>

          <View style={styles.bulletRow}>
            <ThemedText style={styles.bulletIcon}>✦</ThemedText>
            <ThemedText style={styles.bulletText}>
              Rappels personnalisés pour ancrer ton rituel dans le quotidien.
            </ThemedText>
          </View>

          <View style={styles.bulletRow}>
            <ThemedText style={styles.bulletIcon}>✦</ThemedText>
            <ThemedText style={styles.bulletText}>
              Thèmes visuels premium, pour une ambiance encore plus enveloppante.
            </ThemedText>
          </View>
        </ThemedView>

        {/* BLOC OFFRES / PLANS */}
        <ThemedView style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText style={styles.sectionTitle}>
            Choisis ton rythme
          </ThemedText>

          {/* Plan mensuel */}
          <ThemedView style={[styles.planCard, styles.planCardPrimary]}>
            <ThemedText style={styles.planLabel}>Formule mensuelle</ThemedText>
            <ThemedText style={styles.planPrice}>9,90 € / mois</ThemedText>
            <ThemedText style={styles.planNote}>
              Accès illimité, sans engagement.
            </ThemedText>
          </ThemedView>

          {/* Plan annuel */}
          <ThemedView style={styles.planCard}>
            <ThemedText style={styles.planLabel}>Formule annuelle</ThemedText>
            <ThemedText style={styles.planPrice}>94,90 € / an</ThemedText>
            <ThemedText style={styles.planBadge}>
              ✨ Économies sur l’année
            </ThemedText>
          </ThemedView>

          <ThemedText style={styles.legalNote}>
            Le paiement sécurisé sera géré via Stripe / App Store en phase suivante.
          </ThemedText>
        </ThemedView>

        {/* CTA PRINCIPAL */}
        <TouchableOpacity
          style={[styles.ctaButton, { borderColor: accent }]}
          onPress={() => setModalVisible(true)}
        >
          <ThemedText style={[styles.ctaText, { color: accent }]}>
            ⭐ Devenir membre Loryane+
          </ThemedText>
        </TouchableOpacity>

        {/* CTA SECONDAIRE */}
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => nav.goBack()}
        >
          <ThemedText style={styles.secondaryBtnText}>
            Continuer en mode Free
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>

      {/* MODALE PLACEHOLDER PAIEMENT */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ThemedText style={styles.modalTitle}>
              Bientôt disponible ✨
            </ThemedText>

            <ThemedText style={styles.modalText}>
              L’activation de Loryane+ se fera ici, via un paiement sécurisé
              (Stripe / App Store) dans la prochaine sous-phase de développement.
            </ThemedText>

            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText style={styles.modalBtnText}>
                Compris
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

export default PremiumScreen;

// ------------------------------------------------------
// STYLES
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
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3f2f28",
    marginBottom: 8,
    textAlign: "left",
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
    marginTop: 4,
  },

  card: {
    width: "94%",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#d6b98c55",
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3f2f28",
    marginBottom: 14,
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletIcon: {
    width: 20,
    marginTop: 2,
    fontSize: 13,
    color: "#d6b98c",
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: "#3f2f28",
    lineHeight: 20,
  },

  planCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d6b98c44",
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  planCardPrimary: {
    borderColor: "#aa755d",
    backgroundColor: "#fff5f0",
  },
  planLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3f2f28",
  },
  planPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#aa755d",
    marginTop: 4,
  },
  planNote: {
    fontSize: 13,
    color: "#6c5448",
    marginTop: 4,
  },
  planBadge: {
    fontSize: 13,
    color: "#aa755d",
    marginTop: 4,
  },

  legalNote: {
    fontSize: 11,
    color: "#8a7162",
    marginTop: 10,
  },

  ctaButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 999,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    minWidth: "70%",
    backgroundColor: "#fff5f0",
  },
  ctaText: {
    fontSize: 15,
    fontWeight: "700",
  },

  secondaryBtn: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: "center",
  },
  secondaryBtnText: {
    fontSize: 14,
    color: "#6c5448",
    textDecorationLine: "underline",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "82%",
    backgroundColor: "#fff5f0",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d6b98c",
    paddingVertical: 22,
    paddingHorizontal: 18,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#3f2f28",
    textAlign: "center",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: "#3f2f28",
    textAlign: "center",
    lineHeight: 20,
  },
  modalBtn: {
    marginTop: 16,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#aa755d",
    backgroundColor: "#fff5f0",
  },
  modalBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#aa755d",
  },
});