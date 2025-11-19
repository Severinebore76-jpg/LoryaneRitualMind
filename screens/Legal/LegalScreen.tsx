// screens/LegalScreen.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function LegalScreen() {
  const theme = getLoryaneTheme("light");

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* TITRE */}
        <ThemedText
          type="title"
          style={{
            color: theme.primary,
            marginBottom: 20,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Mentions légales & RGPD
        </ThemedText>

        {/* 1. ÉDITEUR */}
        <ThemedText style={styles.sectionTitle}>Éditeur de l’application</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind — application bien-être et rituels guidés.{"\n"}
          Création & direction : Séverine BORÉ{"\n"}
          Adresse : 177 B rue Pelisserie, 84700 Sorgues, France{"\n"}
          Contact : support@loryane.com
        </ThemedText>

        {/* 2. RESPONSABLE DU CONTENU */}
        <ThemedText style={styles.sectionTitle}>Responsable du contenu</ThemedText>
        <ThemedText style={styles.text}>
          Séverine BORÉ — Créatrice de l’univers Loryane.{"\n"}
          L’ensemble des textes, rituels, messages quotidiens, visuels et éléments graphiques est original et protégé.
        </ThemedText>

        {/* 3. HÉBERGEMENT */}
        <ThemedText style={styles.sectionTitle}>Hébergement</ThemedText>
        <ThemedText style={styles.text}>
          L’application utilise un backend hébergé via un service tiers (serveur privé ou cloud).{"\n"}
          Les informations complètes seront mises à jour lors de la mise en production.
        </ThemedText>

        {/* 4. PROPRIÉTÉ INTELLECTUELLE */}
        <ThemedText style={styles.sectionTitle}>Propriété intellectuelle</ThemedText>
        <ThemedText style={styles.text}>
          Tous les contenus de l’application (textes, UI, rituels, symboles, identité graphique, photos, audios)
          sont protégés par les lois françaises et internationales.{"\n"}
          Toute reproduction totale ou partielle est interdite sans autorisation écrite.
        </ThemedText>

        {/* 5. DONNÉES PERSONNELLES & RGPD */}
        <ThemedText style={styles.sectionTitle}>Données personnelles (RGPD)</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind respecte la réglementation européenne (RGPD).{"\n"}
          En mode actuel (sans création de compte), aucune donnée personnelle n’est collectée ou envoyée à un tiers.
        </ThemedText>

        {/* Sous-partie — Données collectées */}
        <ThemedText style={styles.sectionTitleSmall}>Données collectées</ThemedText>
        <ThemedText style={styles.text}>
          • Historique des rituels (stocké uniquement sur ton appareil){"\n"}
          • Favoris (stockés localement){"\n"}
          • Aucun partage de données{"\n"}
          • Aucun suivi publicitaire{"\n"}
          • Pas d’inscription obligatoire
        </ThemedText>

        {/* Sous-partie — Finalité */}
        <ThemedText style={styles.sectionTitleSmall}>Finalité</ThemedText>
        <ThemedText style={styles.text}>
          Ces données servent uniquement à améliorer ton expérience personnelle.
        </ThemedText>

        {/* Sous-partie — Droits */}
        <ThemedText style={styles.sectionTitleSmall}>Droits utilisateur</ThemedText>
        <ThemedText style={styles.text}>
          Conformément au RGPD, tu peux demander :{"\n"}
          • l’accès{"\n"}
          • la rectification{"\n"}
          • la suppression{"\n"}
          • la portabilité{"\n"}
          • ou t’opposer au traitement{"\n"}
          Contact : support@loryane.com
        </ThemedText>

        {/* 6. COOKIES */}
        <ThemedText style={styles.sectionTitle}>Cookies & trackers</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind n’utilise aucun cookie, tracker publicitaire ou outil d’analyse intrusive.
        </ThemedText>

        {/* 7. LIMITATION DE RESPONSABILITÉ */}
        <ThemedText style={styles.sectionTitle}>Limitation de responsabilité</ThemedText>
        <ThemedText style={styles.text}>
          Les rituels et messages proposés ont une finalité bien-être et inspirationnelle.{"\n"}
          Ils ne remplacent en aucun cas un avis médical ou thérapeutique.
        </ThemedText>

        {/* 8. CONTACT */}
        <ThemedText style={styles.sectionTitle}>Contact</ThemedText>
        <ThemedText style={styles.text}>
          Pour toute question liée à la protection des données :{"\n"}
          📧 support@loryane.com
        </ThemedText>

        <ThemedText style={[styles.text, { marginTop: 40, textAlign: "center", opacity: 0.6 }]}>
          Dernière mise à jour : {new Date().getFullYear()}
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 26 },
  sectionTitle: { marginTop: 24, fontSize: 17, fontWeight: "600", color: "#3f2f28" },
  sectionTitleSmall: { marginTop: 14, fontSize: 15, fontWeight: "600", color: "#3f2f28" },
  text: { marginTop: 6, fontSize: 15, color: "#3f2f28", lineHeight: 21 },
});