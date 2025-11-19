// screens/Data/DataPolicyScreenEN.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function DataPolicyScreenEN() {
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
          Data & GDPR Policy
        </ThemedText>

        {/* 1 — Controller */}
        <ThemedText style={styles.sectionTitle}>
          1. Data Controller
        </ThemedText>
        <ThemedText style={styles.text}>
          The data controller is:{"\n"}
          Séverine BORÉ — Creator of the Loryane universe.{"\n"}
          📧 contact: support@loryane.com
        </ThemedText>

        {/* 2 — Data types */}
        <ThemedText style={styles.sectionTitle}>2. Data Collected</ThemedText>
        <ThemedText style={styles.text}>
          Depending on your use of the app, the following categories may be processed:
          {"\n"}• app usage data (ritual history, favorites){"\n"}
          • preferences (theme, notifications){"\n"}
          • account data (email) — only if an account system is enabled{"\n"}
          • billing data — handled directly by stores or payment providers
        </ThemedText>

        {/* 3 — Legal basis */}
        <ThemedText style={styles.sectionTitle}>3. Legal Basis</ThemedText>
        <ThemedText style={styles.text}>
          Processing is based on:
          {"\n"}• performance of the contract (terms / subscription){"\n"}
          • your consent (notifications, newsletters){"\n"}
          • legitimate interest (app improvement, security)
        </ThemedText>

        {/* 4 — Purpose */}
        <ThemedText style={styles.sectionTitle}>4. Purpose of Processing</ThemedText>
        <ThemedText style={styles.text}>
          Data is used to:
          {"\n"}• provide app services{"\n"}
          • personalize your experience{"\n"}
          • manage your Loryane+ subscription{"\n"}
          • ensure security & technical maintenance{"\n"}
          • meet legal and accounting obligations
        </ThemedText>

        {/* 5 — Storage */}
        <ThemedText style={styles.sectionTitle}>
          5. Storage & Retention
        </ThemedText>
        <ThemedText style={styles.text}>
          Local data (history, favorites, preferences) is stored exclusively on your device.
          {"\n"}{"\n"}
          Any account or subscription-related data is stored on secure servers
          (hosting provider / payment processor).
          {"\n"}{"\n"}
          Retention periods are limited to what is strictly necessary and may be detailed later
          in the FAQ or official documentation.
        </ThemedText>

        {/* 6 — Sharing */}
        <ThemedText style={styles.sectionTitle}>6. Sharing with Third Parties</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind does not sell your data.
          {"\n"}{"\n"}
          Limited sharing may occur with:
          {"\n"}• App stores (Apple / Google) for purchase management{"\n"}
          • payment providers{"\n"}
          • hosting providers, for technical purposes only
        </ThemedText>

        {/* 7 — Rights */}
        <ThemedText style={styles.sectionTitle}>7. Your Rights</ThemedText>
        <ThemedText style={styles.text}>
          In accordance with GDPR, you have the right to:
          {"\n"}• access{"\n"}
          • rectification{"\n"}
          • erasure{"\n"}
          • restriction{"\n"}
          • portability{"\n"}
          • objection{"\n"}{"\n"}
          You may exercise these rights by writing to: support@loryane.com
        </ThemedText>

        {/* 8 — Security */}
        <ThemedText style={styles.sectionTitle}>8. Data Security</ThemedText>
        <ThemedText style={styles.text}>
          Reasonable technical and organisational measures are implemented to
          protect data against loss, unauthorized access, or misuse.
          {"\n"}{"\n"}
          However, no system can guarantee absolute security on the Internet.
        </ThemedText>

        {/* 9 — Updates */}
        <ThemedText style={styles.sectionTitle}>
          9. Updates to this Policy
        </ThemedText>
        <ThemedText style={styles.text}>
          This policy may be updated based on app evolution, legal requirements,
          or adjustments to internal data-processing practices.
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