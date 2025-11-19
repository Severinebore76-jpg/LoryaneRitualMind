// screens/BillingPolicyScreen.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function BillingPolicyScreen() {
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
          Facturation & remboursement
        </ThemedText>

        {/* 1 — Traitement des paiements */}
        <ThemedText style={styles.sectionTitle}>
          1. Traitement des paiements
        </ThemedText>
        <ThemedText style={styles.text}>
          Les paiements sont traités de manière sécurisée via les plateformes
          officielles (Apple App Store, Google Play Store) ou via un prestataire
          de paiement externe (par exemple : Stripe) lorsque cela sera activé.
          {"\n"}{"\n"}
          Tes coordonnées bancaires ne sont jamais stockées dans l’application.
        </ThemedText>

        {/* 2 — Facturation */}
        <ThemedText style={styles.sectionTitle}>2. Facturation</ThemedText>
        <ThemedText style={styles.text}>
          En cas d’achat via Apple ou Google, la facture est disponible directement
          dans ton compte App Store / Play Store.
          {"\n"}{"\n"}
          En cas de paiement via un prestataire externe, une confirmation de paiement
          pourra être envoyée à l’adresse email rattachée à ton compte.
        </ThemedText>

        {/* 3 — Droit de rétractation */}
        <ThemedText style={styles.sectionTitle}>
          3. Droit de rétractation
        </ThemedText>
        <ThemedText style={styles.text}>
          Pour les achats effectués via les stores, la gestion du droit de
          rétractation et des remboursements est encadrée par les conditions
          d’Apple et de Google.
          {"\n"}{"\n"}
          Tu peux consulter directement leurs politiques respectives pour connaître
          les modalités précises.
        </ThemedText>

        {/* 4 — Remboursement */}
        <ThemedText style={styles.sectionTitle}>4. Remboursement</ThemedText>
        <ThemedText style={styles.text}>
          En règle générale :
          {"\n"}• aucun remboursement partiel de période entamée n’est effectué{"\n"}
          • toute demande de remboursement liée à un achat via Apple / Google doit
          être adressée au store concerné
          {"\n"}{"\n"}
          En cas de bug majeur ou problème technique avéré empêchant l’usage de
          l’abonnement, tu peux nous contacter afin que nous examinions ta situation.
        </ThemedText>

        {/* 5 — Frais & taxes */}
        <ThemedText style={styles.sectionTitle}>5. Taxes & devises</ThemedText>
        <ThemedText style={styles.text}>
          Les montants peuvent varier selon le pays, la devise et les taxes en vigueur.
          Le prix effectivement facturé est celui affiché sur la page de confirmation
          de paiement du store.
        </ThemedText>

        {/* 6 — Contact */}
        <ThemedText style={styles.sectionTitle}>6. Contact</ThemedText>
        <ThemedText style={styles.text}>
          Pour toute question liée à la facturation ou à un paiement :{"\n"}
          📧 support@loryane.com
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