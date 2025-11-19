// screens/DataPolicyScreen.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function DataPolicyScreen() {
  const theme = getLoryaneTheme("light");

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText
          type="title"
          style={{
            color: theme.primary,
            textAlign: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          Politique Données & RGPD
        </ThemedText>

        {/* 1 — Responsable */}
        <ThemedText style={styles.sectionTitle}>
          1. Responsable du traitement
        </ThemedText>
        <ThemedText style={styles.text}>
          Le responsable du traitement des données personnelles est :{"\n"}
          Séverine BORÉ — Créatrice de l’univers Loryane.{"\n"}
          📧 contact : support@loryane.com
        </ThemedText>

        {/* 2 — Types de données */}
        <ThemedText style={styles.sectionTitle}>2. Données collectées</ThemedText>
        <ThemedText style={styles.text}>
          Selon ton usage de l’app, les catégories de données suivantes peuvent
          être traitées :
          {"\n"}• données d’usage de l’app (historique de rituels, favoris){"\n"}
          • préférences (thème visuel, notifications){"\n"}
          • données de compte (email) — uniquement en mode connecté{"\n"}
          • données de facturation — gérées par les stores ou prestataires de paiement
        </ThemedText>

        {/* 3 — Base légale */}
        <ThemedText style={styles.sectionTitle}>3. Base légale</ThemedText>
        <ThemedText style={styles.text}>
          Les traitements sont fondés sur :
          {"\n"}• l’exécution du contrat (CGU / abonnement){"\n"}
          • ton consentement (notifications, newsletters, etc.){"\n"}
          • l’intérêt légitime (amélioration de l’app, sécurité)
        </ThemedText>

        {/* 4 — Finalités */}
        <ThemedText style={styles.sectionTitle}>4. Finalités du traitement</ThemedText>
        <ThemedText style={styles.text}>
          Les données sont utilisées pour :
          {"\n"}• fournir les services de l’app{"\n"}
          • personnaliser ton expérience{"\n"}
          • gérer ton abonnement Loryane+{"\n"}
          • assurer la sécurité et la maintenance technique{"\n"}
          • respecter les obligations légales et comptables
        </ThemedText>

        {/* 5 — Localisation des données */}
        <ThemedText style={styles.sectionTitle}>
          5. Localisation & conservation
        </ThemedText>
        <ThemedText style={styles.text}>
          Les données locales (historique, favoris, préférences) sont stockées
          uniquement sur ton appareil.
          {"\n"}{"\n"}
          Les éventuelles données de compte ou d’abonnement sont stockées sur des
          serveurs sécurisés (hébergeur / prestataire de paiement).
          {"\n"}{"\n"}
          Les durées de conservation sont limitées au strict nécessaire et pourront
          être précisées dans la FAQ ou la documentation associée.
        </ThemedText>

        {/* 6 — Partage */}
        <ThemedText style={styles.sectionTitle}>6. Partage avec des tiers</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind ne vend pas tes données.
          {"\n"}{"\n"}
          Un partage limité peut avoir lieu avec :
          {"\n"}• les stores (Apple / Google) pour la gestion des achats{"\n"}
          • les prestataires de paiement{"\n"}
          • l’hébergeur de la plateforme, à des fins purement techniques
        </ThemedText>

        {/* 7 — Tes droits */}
        <ThemedText style={styles.sectionTitle}>7. Tes droits</ThemedText>
        <ThemedText style={styles.text}>
          Conformément au RGPD, tu disposes des droits suivants :
          {"\n"}• droit d’accès{"\n"}
          • droit de rectification{"\n"}
          • droit d’effacement{"\n"}
          • droit à la limitation{"\n"}
          • droit à la portabilité{"\n"}
          • droit d’opposition
          {"\n"}{"\n"}
          Tu peux exercer ces droits en écrivant à : support@loryane.com
        </ThemedText>

        {/* 8 — Sécurité */}
        <ThemedText style={styles.sectionTitle}>8. Sécurité des données</ThemedText>
        <ThemedText style={styles.text}>
          Des mesures techniques et organisationnelles raisonnables sont mises en
          place pour protéger les données contre la perte, l’accès non autorisé ou
          l’utilisation abusive.
          {"\n"}{"\n"}
          La sécurité totale ne peut toutefois pas être garantie sur Internet.
        </ThemedText>

        {/* 9 — Mise à jour */}
        <ThemedText style={styles.sectionTitle}>
          9. Mise à jour de la présente politique
        </ThemedText>
        <ThemedText style={styles.text}>
          Cette politique pourra être mise à jour en fonction de l’évolution de
          l’application, des obligations légales ou de la politique de traitement
          des données.
        </ThemedText>

        <ThemedText
          style={[
            styles.text,
            { marginTop: 40, textAlign: "center", opacity: 0.6 },
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
    marginTop: 6,
    fontSize: 15,
    color: "#3f2f28",
    lineHeight: 21,
  },
});