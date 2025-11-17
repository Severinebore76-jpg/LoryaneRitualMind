import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";

const ProfileScreen: React.FC = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profil & À propos</ThemedText>

      <ThemedText style={styles.paragraph}>
        Ici tu afficheras :
      </ThemedText>

      <ThemedText style={styles.item}>
        • les infos de l’utilisateur (nom, e-mail…)
      </ThemedText>
      <ThemedText style={styles.item}>
        • le statut d’abonnement (Freemium / Orelys+)
      </ThemedText>
      <ThemedText style={styles.item}>
        • un lien vers Orelys Essentielle / mentions légales / RGPD
      </ThemedText>

      <ThemedText style={styles.note}>
        (Placeholder pour l’instant — on branchera l’auth et l’état d’abonnement
        quand on attaquera la partie backend utilisateur.)
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  paragraph: {
    marginTop: 16,
    marginBottom: 8,
  },
  item: {
    marginTop: 4,
  },
  note: {
    marginTop: 24,
    textAlign: "center",
    opacity: 0.7,
  },
});

export default ProfileScreen;