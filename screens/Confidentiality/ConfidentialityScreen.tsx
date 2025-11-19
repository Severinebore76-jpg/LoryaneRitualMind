import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function ConfidentialityScreen() {
  const theme = getLoryaneTheme("light");

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* TITRE */}
        <ThemedText
          type="title"
          style={{
            color: theme.primary,
            textAlign: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          Politique de confidentialité
        </ThemedText>

        {/* INTRO */}
        <ThemedText style={styles.text}>
          Loryane Ritual Mind accorde une importance essentielle à la confidentialité
          et au respect de ton espace personnel.{"\n"}
          L’application a été conçue pour limiter la collecte de données,
          assurer une utilisation sereine et garder toutes tes informations sous ton contrôle.
        </ThemedText>

        {/* DONNÉES NON COLLECTÉES */}
        <ThemedText style={styles.sectionTitle}>Données non collectées</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind ne collecte pas :{"\n"}
          • ton identité (nom, email, numéro de téléphone){"\n"}
          • tes activités sur d’autres sites ou applications{"\n"}
          • d’informations personnelles permettant de te suivre ou t’identifier{"\n"}
          • aucune donnée à des fins publicitaires ou commerciales
        </ThemedText>

        {/* DONNÉES LOCALES */}
        <ThemedText style={styles.sectionTitle}>Données stockées localement</ThemedText>
        <ThemedText style={styles.text}>
          Certaines informations sont conservées uniquement sur ton appareil :{"\n"}
          • favoris{"\n"}
          • historique des rituels{"\n"}
          • préférences visuelles (thème, options){"\n"}
          Ces données ne quittent jamais ton appareil.
        </ThemedText>

        {/* CONNECTIVITÉ SERVEUR */}
        <ThemedText style={styles.sectionTitle}>Connexion au serveur</ThemedText>
        <ThemedText style={styles.text}>
          L’application se connecte parfois à un serveur privé afin de récupérer
          certains contenus (ex : rituels du jour).{"\n"}
          Aucune donnée personnelle n’est transmise au serveur.
        </ThemedText>

        {/* UTILISATION DES DONNÉES */}
        <ThemedText style={styles.sectionTitle}>Utilisation des données</ThemedText>
        <ThemedText style={styles.text}>
          Les données locales servent uniquement à améliorer ton expérience :
          retrouver un rituel passé, gérer tes favoris ou conserver tes réglages.
        </ThemedText>

        {/* DROITS UTILISATEUR */}
        <ThemedText style={styles.sectionTitle}>
          Tes droits (RGPD)
        </ThemedText>
        <ThemedText style={styles.text}>
          Conformément au RGPD, tu peux demander :{"\n"}
          • l’accès à tes données{"\n"}
          • leur modification{"\n"}
          • leur suppression{"\n"}
          • leur portabilité{"\n"}
          Il suffit de nous contacter.
        </ThemedText>

        {/* CONTACT */}
        <ThemedText style={styles.sectionTitle}>Contact</ThemedText>
        <ThemedText style={styles.text}>
          Pour toute question concernant la confidentialité :{"\n"}
          📧 support@loryane.com
        </ThemedText>

        <ThemedText
          style={[
            styles.text,
            { marginTop: 40, opacity: 0.6, textAlign: "center" },
          ]}
        >
          Dernière mise à jour : {new Date().getFullYear()}
        </ThemedText>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 26 },
  sectionTitle: {
    marginTop: 24,
    fontSize: 17,
    fontWeight: "600",
    color: "#3f2f28",
  },
  text: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
    color: "#3f2f28",
  },
});