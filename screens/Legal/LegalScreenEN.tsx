// screens/LegalScreenEN.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function LegalScreenEN() {
  const theme = getLoryaneTheme("light");

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* TITLE */}
        <ThemedText
          type="title"
          style={{
            color: theme.primary,
            textAlign: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          Legal Notice
        </ThemedText>

        {/* 1 — PUBLISHER */}
        <ThemedText style={styles.sectionTitle}>1. Application Publisher</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind — wellbeing, guided rituals and inspiring content application.{"\n"}
          Creator & publisher: Séverine BORÉ{"\n"}
          Address: 177 B rue Pelisserie, 84700 Sorgues, France{"\n"}
          Contact: support@loryane.com
        </ThemedText>

        {/* 2 — CONTENT MANAGER */}
        <ThemedText style={styles.sectionTitle}>2. Content Manager</ThemedText>
        <ThemedText style={styles.text}>
          Séverine BORÉ — founder of the Loryane universe.{"\n"}
          All texts, rituals, daily messages, symbols, visuals, audios and graphic elements are protected.
        </ThemedText>

        {/* 3 — HOSTING */}
        <ThemedText style={styles.sectionTitle}>3. Hosting & Backend</ThemedText>
        <ThemedText style={styles.text}>
          The application relies on a private backend hosted on a secure cloud server.{"\n"}
          Final hosting details will be updated once the application is in production.
        </ThemedText>

        {/* 4 — INTELLECTUAL PROPERTY */}
        <ThemedText style={styles.sectionTitle}>4. Intellectual Property</ThemedText>
        <ThemedText style={styles.text}>
          All content within Loryane Ritual Mind is protected under French and international laws.{"\n"}
          Any reproduction, modification or distribution without written authorization is strictly prohibited.
        </ThemedText>

        {/* 5 — PERSONAL DATA (SUMMARY) */}
        <ThemedText style={styles.sectionTitle}>5. Personal Data</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind strictly complies with GDPR regulations.{"\n"}
          No personal data is collected without explicit consent.{"\n"}
          All local data (favorites, history, preferences) remains stored exclusively on your device.
        </ThemedText>

        {/* REFERENCES TO FULL POLICIES */}
        <ThemedText style={styles.text}>
          Full related documents can be found in the dedicated sections:{"\n"}
          • Privacy Policy{"\n"}
          • Data & GDPR Policy{"\n"}
          • Terms of Use (CGU){"\n"}
          • Subscription Terms (CGV){"\n"}
          • Billing & Refund Policy
        </ThemedText>

        {/* 6 — COOKIES */}
        <ThemedText style={styles.sectionTitle}>6. Cookies & Trackers</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind does not use cookies, advertising trackers or intrusive analytics tools.
        </ThemedText>

        {/* 7 — LIABILITY */}
        <ThemedText style={styles.sectionTitle}>7. Limitation of Liability</ThemedText>
        <ThemedText style={styles.text}>
          All content has a wellbeing and inspirational purpose.{"\n"}
          It is not intended to replace medical, psychological or therapeutic advice.
        </ThemedText>

        {/* 8 — CONTACT */}
        <ThemedText style={styles.sectionTitle}>8. Contact</ThemedText>
        <ThemedText style={styles.text}>
          📧 support@loryane.com{"\n"}
          For any questions regarding data protection, your GDPR rights or usage conditions.
        </ThemedText>

        <ThemedText
          style={[
            styles.text,
            { marginTop: 40, opacity: 0.6, textAlign: "center" },
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