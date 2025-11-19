// screens/CGV/SubscriptionPolicyScreen.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function SubscriptionPolicyScreen() {
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
          Conditions Générales de Vente & Abonnement Loryane+
        </ThemedText>

        {/* 1 — Objet */}
        <ThemedText style={styles.sectionTitle}>1. Objet</ThemedText>
        <ThemedText style={styles.text}>
          Les présentes Conditions Générales de Vente (CGV) encadrent l’abonnement
          Loryane+ permettant d'accéder aux contenus et fonctionnalités Premium de
          l’application Loryane Ritual Mind.
        </ThemedText>

        {/* 2 — Services Premium */}
        <ThemedText style={styles.sectionTitle}>2. Contenus & Services Premium</ThemedText>
        <ThemedText style={styles.text}>
          L’abonnement Loryane+ donne accès notamment à :
          {"\n"}• rituels complets & approfondis{"\n"}
          • méditations audio-guidées{"\n"}
          • historique complet{"\n"}
          • favoris synchronisés{"\n"}
          • rappels personnalisés{"\n"}
          • thèmes visuels{"\n"}
          • et tout futur contenu Premium
          {"\n"}{"\n"}
          Loryane Ritual Mind peut faire évoluer ces services à tout moment.
        </ThemedText>

        {/* 3 — Prix */}
        <ThemedText style={styles.sectionTitle}>3. Prix</ThemedText>
        <ThemedText style={styles.text}>
          Les formules d’abonnement disponibles sont les suivantes :
          {"\n"}• Mensuel : 9,90 €{"\n"}
          • Trimestriel : 24,90 €{"\n"}
          • Annuel : 94,90 €
          {"\n"}{"\n"}
          Les prix peuvent varier selon la devise et les taxes locales.
        </ThemedText>

        {/* 4 — Paiement */}
        <ThemedText style={styles.sectionTitle}>4. Paiement</ThemedText>
        <ThemedText style={styles.text}>
          Le paiement est géré par les plateformes officielles :
          {"\n"}• Apple App Store{"\n"}
          • Google Play Store{"\n"}
          • ou Stripe (si activé)
          {"\n"}{"\n"}
          Aucune donnée bancaire n’est stockée par Loryane Ritual Mind.
        </ThemedText>

        {/* 5 — Renouvellement */}
        <ThemedText style={styles.sectionTitle}>5. Renouvellement automatique</ThemedText>
        <ThemedText style={styles.text}>
          Les abonnements sont reconduits automatiquement.
          {"\n"}{"\n"}
          Tu peux annuler le renouvellement à tout moment depuis ton espace Apple /
          Google. L’accès Premium reste actif jusqu’à la fin de la période en cours.
        </ThemedText>

        {/* 6 — Résiliation */}
        <ThemedText style={styles.sectionTitle}>6. Résiliation</ThemedText>
        <ThemedText style={styles.text}>
          La résiliation ne donne lieu à aucun remboursement partiel.
          {"\n"}{"\n"}
          En cas de problème technique majeur, tu peux contacter :
          {"\n"}📧 support@loryane.com
        </ThemedText>

        {/* 7 — Modifications */}
        <ThemedText style={styles.sectionTitle}>7. Modifications des CGV</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind peut modifier les présentes CGV. Toute modification
          sera annoncée avant son entrée en vigueur.
        </ThemedText>

        {/* 8 — Droit applicable */}
        <ThemedText style={styles.sectionTitle}>8. Droit applicable</ThemedText>
        <ThemedText style={styles.text}>
          Les présentes CGV sont soumises au droit français.
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
    marginTop: 6,
    fontSize: 15,
    lineHeight: 21,
    color: "#3f2f28",
  },
});