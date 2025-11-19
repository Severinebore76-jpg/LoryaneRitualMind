// screens/CGV/SubscriptionPolicyScreenEN.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function SubscriptionPolicyScreenEN() {
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
          Terms & Conditions – Loryane+ Subscription
        </ThemedText>

        {/* 1 — Purpose */}
        <ThemedText style={styles.sectionTitle}>1. Purpose</ThemedText>
        <ThemedText style={styles.text}>
          These Terms & Conditions govern the Loryane+ subscription, giving access
          to premium content and features within the Loryane Ritual Mind app.
        </ThemedText>

        {/* 2 — Premium Services */}
        <ThemedText style={styles.sectionTitle}>2. Premium Content & Services</ThemedText>
        <ThemedText style={styles.text}>
          The Loryane+ subscription grants access to:{"\n"}
          • full & advanced rituals{"\n"}
          • guided audio meditations{"\n"}
          • full history{"\n"}
          • synchronized favorites{"\n"}
          • personalized reminders{"\n"}
          • visual themes{"\n"}
          • and all future Premium content{"\n"}{"\n"}
          Loryane Ritual Mind may update or expand these services at any time.
        </ThemedText>

        {/* 3 — Pricing */}
        <ThemedText style={styles.sectionTitle}>3. Pricing</ThemedText>
        <ThemedText style={styles.text}>
          Available subscription plans:{"\n"}
          • Monthly: €9.90{"\n"}
          • Quarterly: €24.90{"\n"}
          • Yearly: €94.90{"\n"}{"\n"}
          Prices may vary based on country, currency and applicable taxes.
        </ThemedText>

        {/* 4 — Payment */}
        <ThemedText style={styles.sectionTitle}>4. Payment</ThemedText>
        <ThemedText style={styles.text}>
          Payments are processed securely via:{"\n"}
          • Apple App Store{"\n"}
          • Google Play Store{"\n"}
          • or Stripe (if activated){"\n"}{"\n"}
          Loryane Ritual Mind never stores your payment or banking information.
        </ThemedText>

        {/* 5 — Auto-renewal */}
        <ThemedText style={styles.sectionTitle}>5. Auto-Renewal</ThemedText>
        <ThemedText style={styles.text}>
          Subscriptions renew automatically at the end of each period.
          {"\n"}{"\n"}
          You may disable auto-renewal at any time from your Apple / Google account.
          Premium access remains active until the end of the paid period.
        </ThemedText>

        {/* 6 — Cancellation */}
        <ThemedText style={styles.sectionTitle}>6. Cancellation</ThemedText>
        <ThemedText style={styles.text}>
          Cancellation does not trigger any partial refund for time remaining.
          {"\n"}{"\n"}
          In case of a major technical issue preventing the use of your subscription,
          you may contact:{"\n"}📧 support@loryane.com
        </ThemedText>

        {/* 7 — Modifications */}
        <ThemedText style={styles.sectionTitle}>7. Changes to the Terms</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind may update these Terms & Conditions at any time.
          Users will be notified before changes take effect.
        </ThemedText>

        {/* 8 — Governing Law */}
        <ThemedText style={styles.sectionTitle}>8. Governing Law</ThemedText>
        <ThemedText style={styles.text}>
          These Terms & Conditions are governed by French law.
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
    lineHeight: 21,
    color: "#3f2f28",
  },
});