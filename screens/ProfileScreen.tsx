// screens/ProfileScreen.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
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

        {/* 🅰️ BLOC A — INFOS USER */}
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

          <TouchableOpacity style={styles.secondaryBtn}>
            <ThemedText style={styles.secondaryBtnText}>
              Modifier mes informations
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryBtn, { marginTop: 12 }]}
            onPress={() => nav.navigate("Auth" as never)}
          >
            <ThemedText style={[styles.primaryBtnText, { color: "#aa755d" }]}>
              Créer un compte / Se connecter
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* 🅱️ BLOC B — ABONNEMENT */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Statut d’abonnement</ThemedText>

          {user.subscription === "freemium" ? (
            <>
              <ThemedText style={styles.statusFree}>
                ✦ Freemium — accès limité
              </ThemedText>

              <ThemedText style={styles.subscriptionText}>
                Pour aller plus loin, activez Loryane+.
              </ThemedText>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => nav.navigate("Subscription" as never)}
              >
                <ThemedText style={[styles.primaryBtnText, { color: "#aa755d" }]}>
                  ⭐ Activer Loryane+
                </ThemedText>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <ThemedText style={styles.statusPlus}>✨ Loryane+ — accès complet</ThemedText>
              <ThemedText style={styles.subscriptionText}>
                Merci pour votre soutien 🕊️  
                Votre abonnement est actif.
              </ThemedText>
            </>
          )}
        </ThemedView>

        {/* 🅲 BLOC C — RÉGLEMENTAIRE */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Informations légales</ThemedText>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => nav.navigate("Legal" as never)}
          >
            <ThemedText style={styles.linkText}>
              Mentions légales & RGPD
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => nav.navigate("Confidentiality" as never)}
          >
            <ThemedText style={styles.linkText}>
              Politique de confidentialité
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => nav.navigate("DataPolicy" as never)}
          >
            <ThemedText style={styles.linkText}>
              Données personnelles
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => nav.navigate("CGU" as never)}
          >
            <ThemedText style={styles.linkText}>
              Conditions d’utilisation (CGU)
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => nav.navigate("CGV" as never)}
          >
            <ThemedText style={styles.linkText}>
              Conditions de vente (CGV)
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => nav.navigate("Billing" as never)}
          >
            <ThemedText style={styles.linkText}>
              Facturation & remboursement
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* 🅳 BOUTON — À PROPOS DE LORYANE */}
        <TouchableOpacity
          style={styles.aboutBtn}
          onPress={() => nav.navigate("Apropos" as never)}
        >
          <ThemedText style={styles.aboutIcon}>✦</ThemedText>
          <ThemedText style={styles.aboutText}>À propos de Loryane</ThemedText>
        </TouchableOpacity>

        {/* 🅴 BLOC D — Loryane ESSENTIELLE */}
        <TouchableOpacity style={styles.aboutBtn} onPress={() => setModalVisible(true)}>
          <ThemedText style={styles.aboutIcon}>✦</ThemedText>
          <ThemedText style={styles.aboutText}>Loryane Essentielle</ThemedText>
        </TouchableOpacity>
      </ScrollView>

      {/* MODALE */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <ThemedText style={styles.modalTitle}>Disponible prochainement ✨</ThemedText>

            <ThemedText style={styles.modalText}>
              La version Loryane Essentielle sera bientôt intégrée dans l’app.
            </ThemedText>

            <TouchableOpacity
              style={[styles.primaryBtn, { marginTop: 16 }]}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText style={styles.primaryBtnText}>Fermer</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

export default ProfileScreen;

// ------------------------------------------------------
// STYLES (inchangés)
// ------------------------------------------------------
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
    alignSelf: "center",
  },

  avatarInitial: { fontSize: 30, color: "#aa755d", fontWeight: "600" },

  userName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3f2f28",
    marginTop: 14,
    textAlign: "center",
  },

  userEmail: {
    fontSize: 14,
    color: "#6c5448",
    textAlign: "center",
    marginTop: 4,
    opacity: 0.8,
  },

  connectionStatus: {
    marginTop: 6,
    fontSize: 14,
    color: "#aa755d",
    fontWeight: "600",
    textAlign: "center",
    opacity: 0.9,
  },

  primaryBtn: {
    backgroundColor: "#fff5f0",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d6b98c",
    alignItems: "center",
    marginTop: 12,
  },

  primaryBtnText: { fontWeight: "600", color: "#3f2f28", fontSize: 15 },

  secondaryBtn: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d6b98c55",
    backgroundColor: "transparent",
  },

  secondaryBtnText: {
    fontSize: 14,
    color: "#aa755d",
    textAlign: "center",
    fontWeight: "500",
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#3f2f28",
    marginBottom: 10,
    textAlign: "center",
  },

  statusFree: { fontSize: 15, fontWeight: "600", color: "#aa755d", textAlign: "center" },

  statusPlus: { fontSize: 15, fontWeight: "700", color: "#d6b98c", textAlign: "center" },

  subscriptionText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    color: "#3f2f28",
    lineHeight: 20,
  },

  linkBtn: { paddingVertical: 10 },

  linkText: { color: "#3f2f28", fontSize: 15, textAlign: "center" },

  aboutBtn: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 22,
    backgroundColor: "#fff5f0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d6b98c",
  },

  aboutIcon: { fontSize: 18, color: "#d6b98c", marginRight: 8 },

  aboutText: { fontSize: 16, fontWeight: "600", color: "#3f2f28" },

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
  },

  modalTitle: { fontSize: 18, color: "#3f2f28", fontWeight: "700" },

  modalText: { marginTop: 12, fontSize: 15, color: "#3f2f28", textAlign: "center" },
});