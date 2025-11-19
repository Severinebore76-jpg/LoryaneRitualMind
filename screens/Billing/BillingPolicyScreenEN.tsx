// screens/Billing/BillingPolicyScreenEN.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function BillingPolicyScreenEN() {
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
          Billing & Refund Policy
        </ThemedText>

        {/* 1 — Payment Processing */}
        <ThemedText style={styles.sectionTitle}>1. Payment Processing</ThemedText>
        <ThemedText style={styles.text}>
          Payments are securely processed via official platforms 
          (Apple App Store, Google Play Store) or through an external 
          payment provider (such as Stripe) when activated.{"\n"}{"\n"}
          Your payment information is never stored within the application.
        </ThemedText>

        {/* 2 — Billing */}
        <ThemedText style={styles.sectionTitle}>2. Billing</ThemedText>
        <ThemedText style={styles.text}>
          For purchases made through Apple or Google, invoices are available 
          directly in your App Store / Play Store account.{"\n"}{"\n"}
          For payments processed through an external provider, a confirmation 
          email may be sent to the email address linked to your account.
        </ThemedText>

        {/* 3 — Right of Withdrawal */}
        <ThemedText style={styles.sectionTitle}>3. Right of Withdrawal</ThemedText>
        <ThemedText style={styles.text}>
          For in-app purchases made via mobile stores, the withdrawal and refund 
          policies are governed by Apple and Google's respective conditions.{"\n"}{"\n"}
          Please consult their policies to obtain detailed information.
        </ThemedText>

        {/* 4 — Refund Policy */}
        <ThemedText style={styles.sectionTitle}>4. Refund Policy</ThemedText>
        <ThemedText style={styles.text}>
          As a general rule:{"\n"}
          • no partial refunds are issued for ongoing subscription periods{"\n"}
          • any refund request regarding Apple / Google purchases must be 
          submitted directly to the relevant store{"\n"}{"\n"}
          In case of a major bug or confirmed technical issue preventing the use 
          of your subscription, you may contact us for review.
        </ThemedText>

        {/* 5 — Taxes & Currencies */}
        <ThemedText style={styles.sectionTitle}>5. Taxes & Currencies</ThemedText>
        <ThemedText style={styles.text}>
          Prices may vary depending on the country, currency, and applicable taxes.{"\n"}
          The final amount billed is the one shown on the store's payment 
          confirmation page.
        </ThemedText>

        {/* 6 — Contact */}
        <ThemedText style={styles.sectionTitle}>6. Contact</ThemedText>
        <ThemedText style={styles.text}>
          For any billing or payment inquiry:{"\n"}
          📧 support@loryane.com
        </ThemedText>

        <ThemedText
          style={[
            styles.text,
            { marginTop: 40, textAlign: "center", opacity: 0.6 },
          ]}
        >
          Last update: {new Date().getFullYear()}
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