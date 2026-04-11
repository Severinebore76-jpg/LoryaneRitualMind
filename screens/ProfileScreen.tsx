// screens/ProfileScreen.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";

import ScreenContainer from "../components/layout/ScreenContainer"; // ✅ AJOUT

import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";

import PrimaryButton from "../components/ui/buttons/PrimaryButton";
import SecondaryButton from "../components/ui/buttons/SecondaryButton";

import { getLoryaneTheme } from "../constants/theme";

// ✅ TYPE USER PROPRE
type User = {
  name?: string;
  pseudo?: string;
  email: string | null;
  subscription: string;
};

const ProfileScreen: React.FC = () => {
  const theme = getLoryaneTheme("light");
  const nav = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState<User>({
    name: "Utilisateur invité",
    pseudo: undefined,
    email: null,
    subscription: "freemium",
  });

  // ✅ Recharge à chaque retour écran
  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        try {
          const storedUser = await AsyncStorage.getItem("user");

          if (storedUser) {
            const parsed = JSON.parse(storedUser);

            setUser({
              name: parsed.name,
              pseudo: parsed.pseudo,
              email: parsed.email,
              subscription: "freemium",
            });
          } else {
            setUser({
              name: "Utilisateur invité",
              pseudo: undefined,
              email: null,
              subscription: "freemium",
            });
          }
        } catch {
          console.log("Erreur chargement user");
        }
      };

      loadUser();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");

    setUser({
      name: "Utilisateur invité",
      pseudo: undefined,
      email: null,
      subscription: "freemium",
    });
  };

  return (
    <ScreenContainer>
      <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
            alignItems: "center",
            paddingTop: 10, // ✅ REMPLACE insets.top + 10 (géré par ScreenContainer)
          }}
        >
          <ThemedText type="title" style={{ color: theme.primary }}>
            Profil
          </ThemedText>

          {/* ======================= USER ======================= */}
          <ThemedView style={styles.card}>
            <ThemedView style={styles.avatar}>
              <ThemedText style={styles.avatarInitial}>
                {(user.pseudo || user.name || "U").charAt(0)}
              </ThemedText>
            </ThemedView>

            <ThemedText style={styles.userName}>
              {user.pseudo || user.name || "Utilisateur"}
            </ThemedText>

            <ThemedText style={styles.userEmail}>
              {user.email ?? "Aucune adresse enregistrée"}
            </ThemedText>

            <ThemedText style={styles.connectionStatus}>
              {user.email ? "Connectée" : "Non connectée"}
            </ThemedText>

            <SecondaryButton
              label="Modifier mes informations"
              onPress={() => {
                if (!user.email) {
                  (nav as any).navigate("Auth");
                } else {
                  (nav as any).navigate("EditProfile");
                }
              }}
              style={{ marginTop: 12 }}
            />

            {!user.email && (
              <PrimaryButton
                label="Créer un compte / Se connecter"
                onPress={() => (nav as any).navigate("Auth")}
                size="md"
              />
            )}

            {user.email && (
              <SecondaryButton
                label="Se déconnecter"
                onPress={handleLogout}
              />
            )}
          </ThemedView>

          {/* ======================= ABONNEMENT ======================= */}
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

          {/* ======================= LEGAL ======================= */}
          <ThemedView style={styles.card}>
            <ThemedText style={styles.cardTitle}>
              Informations légales
            </ThemedText>

            <SecondaryButton label="Mentions légales & RGPD" onPress={() => nav.navigate("Legal" as never)} />
            <SecondaryButton label="Politique de confidentialité" onPress={() => nav.navigate("Confidentiality" as never)} />
            <SecondaryButton label="Données personnelles" onPress={() => nav.navigate("DataPolicy" as never)} />
            <SecondaryButton label="Conditions d’utilisation (CGU)" onPress={() => nav.navigate("CGU" as never)} />
            <SecondaryButton label="Conditions de vente (CGV)" onPress={() => nav.navigate("CGV" as never)} />
            <SecondaryButton label="Facturation & remboursement" onPress={() => nav.navigate("Billing" as never)} />
          </ThemedView>

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

        {/* MODAL */}
        <Modal transparent animationType="fade" visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <ThemedText style={styles.modalTitle}>
                Disponible prochainement ✨
              </ThemedText>

              <ThemedText style={styles.modalText}>
                La version Loryane Essentielle sera bientôt intégrée dans l’app.
              </ThemedText>

              <PrimaryButton
                label="Fermer"
                onPress={() => setModalVisible(false)}
                size="sm"
              />
            </View>
          </View>
        </Modal>
      </ThemedView>
    </ScreenContainer>
  );
};

export default ProfileScreen;

// STYLES INCHANGÉS
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

  avatarInitial: {
    fontSize: 30,
    lineHeight: 30,
    color: "#aa755d",
    fontWeight: "600",
  },

  userName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3f2f28",
    marginTop: 8,
  },

  userEmail: { fontSize: 14, color: "#6c5448" },
  connectionStatus: { fontSize: 14, color: "#aa755d", fontWeight: "600" },

  cardTitle: { fontSize: 17, fontWeight: "700", color: "#3f2f28" },
  statusFree: { fontSize: 15, fontWeight: "600", color: "#aa755d" },
  statusPlus: { fontSize: 15, fontWeight: "700", color: "#d6b98c" },
  subscriptionText: { fontSize: 14, color: "#3f2f28" },

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
  modalText: { fontSize: 15, color: "#3f2f28" },
});