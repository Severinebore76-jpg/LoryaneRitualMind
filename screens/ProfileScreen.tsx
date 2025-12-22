// screens/ProfileScreen.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";

import PrimaryButton from "../components/ui/buttons/PrimaryButton";
import SecondaryButton from "../components/ui/buttons/SecondaryButton";

import { getLoryaneTheme } from "../constants/theme";

const ProfileScreen: React.FC = () => {
  const theme = getLoryaneTheme("light");
  const nav = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const user = {
    name: "Utilisateur invité",
    email: null,
    subscription: "freemium",
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, alignItems: "center" }}
      >
        {/* TITRE */}
        <ThemedText type="title" style={{ color: theme.primary, marginTop: 40 }}>
          Profil
        </ThemedText>

        {/* =======================
            BLOC A — UTILISATEUR
        ======================= */}
        <ThemedView style={styles.card}>
          <ThemedView style={styles.avatar}>
            <ThemedText style={styles.avatarInitial}>
              {user.name.charAt(0)}
            </ThemedText>
          </ThemedView>

          <ThemedText style={styles.userName}>{user.name}</ThemedText>

          <ThemedText style={styles.userEmail}>
            {user.email ?? "Aucune adresse enregistrée"}
          </ThemedText>

          <ThemedText style={styles.connectionStatus}>
            {user.email ? "Connectée" : "Non connectée"}
          </ThemedText>

          {/* SECONDARY — réglage */}
          <SecondaryButton
            label="Modifier mes informations"
            onPress={() => {}}
            style={{ marginTop: 12 }}
          />

          {/* PRIMARY — CTA */}
          <PrimaryButton
            label="Créer un compte / Se connecter"
            onPress={() => nav.navigate("Auth" as never)}
            size="md"
          />
        </ThemedView>

        {/* =======================
            BLOC B — ABONNEMENT
        ======================= */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>
            Statut d’abonnement
          </ThemedText>

          {user.subscription === "freemium" ? (
            <>
              <ThemedText style={styles.statusFree}>
                ✦ Freemium — accès limité
              </ThemedText>

              <ThemedText style={styles.subscriptionText}>
                Pour aller plus loin, activez Loryane+.
              </ThemedText>

              {/* PRIMARY — CTA */}
              <PrimaryButton
                label="Activer Loryane+"
                onPress={() => nav.navigate("Subscription" as never)}
                size="md"
              />
            </>
          ) : (
            <>
              <ThemedText style={styles.statusPlus}>
                ✨ Loryane+ — accès complet
              </ThemedText>
              <ThemedText style={styles.subscriptionText}>
                Merci pour votre soutien 🕊️  
                Votre abonnement est actif.
              </ThemedText>
            </>
          )}
        </ThemedView>

        {/* =======================
            BLOC C — LÉGAL (SECONDARY)
        ======================= */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>
            Informations légales
          </ThemedText>

          <SecondaryButton
            label="Mentions légales & RGPD"
            onPress={() => nav.navigate("Legal" as never)}
          />

          <SecondaryButton
            label="Politique de confidentialité"
            onPress={() => nav.navigate("Confidentiality" as never)}
          />

          <SecondaryButton
            label="Données personnelles"
            onPress={() => nav.navigate("DataPolicy" as never)}
          />

          <SecondaryButton
            label="Conditions d’utilisation (CGU)"
            onPress={() => nav.navigate("CGU" as never)}
          />

          <SecondaryButton
            label="Conditions de vente (CGV)"
            onPress={() => nav.navigate("CGV" as never)}
          />

          <SecondaryButton
            label="Facturation & remboursement"
            onPress={() => nav.navigate("Billing" as never)}
          />
        </ThemedView>

        {/* =======================
            CTA MARQUE — PRIMARY
        ======================= */}
        <PrimaryButton
          label="À propos de Loryane"
          onPress={() => nav.navigate("Apropos" as never)}
          size="md"
        />

        <PrimaryButton
          label="Loryane Essentielle"
          onPress={() => setModalVisible(true)}
          size="md"
        />
      </ScrollView>

      {/* =======================
            MODALE
        ======================= */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ThemedText style={styles.modalTitle}>
              Disponible prochainement ✨
            </ThemedText>

            <ThemedText style={styles.modalText}>
              La version Loryane Essentielle sera bientôt intégrée dans l’app.
            </ThemedText>

            {/* PRIMARY — fermeture */}
            <PrimaryButton
              label="Fermer"
              onPress={() => setModalVisible(false)}
              size="sm"
            />
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

export default ProfileScreen;

/* =======================
   STYLES — STRUCTURE SEULEMENT
======================= */
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },

  card: {
    width: "90%",
    marginTop: 26,
    paddingVertical: 22,
    paddingHorizontal: 18,
    backgroundColor: "#f7efe8",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d6b98c55",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 40,
    backgroundColor: "#fff5f0",
    borderWidth: 1,
    borderColor: "#dec5a5",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarInitial: { fontSize: 30, color: "#aa755d", fontWeight: "600" },

  userName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3f2f28",
    marginTop: 8,
    textAlign: "center",
  },

  userEmail: {
    fontSize: 14,
    color: "#6c5448",
    textAlign: "center",
    opacity: 0.8,
  },

  connectionStatus: {
    fontSize: 14,
    color: "#aa755d",
    fontWeight: "600",
    textAlign: "center",
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#3f2f28",
    textAlign: "center",
  },

  statusFree: {
    fontSize: 15,
    fontWeight: "600",
    color: "#aa755d",
    textAlign: "center",
  },

  statusPlus: {
    fontSize: 15,
    fontWeight: "700",
    color: "#d6b98c",
    textAlign: "center",
  },

  subscriptionText: {
    textAlign: "center",
    fontSize: 14,
    color: "#3f2f28",
    lineHeight: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff5f0",
    padding: 26,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d6b98c",
    alignItems: "center",
    gap: 14,
  },

  modalTitle: { fontSize: 18, color: "#3f2f28", fontWeight: "700" },

  modalText: { fontSize: 15, color: "#3f2f28", textAlign: "center" },
});