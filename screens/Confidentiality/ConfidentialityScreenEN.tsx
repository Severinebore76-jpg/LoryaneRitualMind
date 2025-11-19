import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function ConfidentialityScreenEN() {
  const theme = getLoryaneTheme("light");

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <ThemedText
          type="title"
          style={{ color: theme.primary, marginTop: 40, textAlign: "center", marginBottom: 20 }}
        >
          Privacy Policy
        </ThemedText>

        {/* INTRO */}
        <ThemedText style={styles.text}>
          Loryane Ritual Mind is committed to protecting your privacy.
          The app is designed to minimize data collection and ensure
          a calm and secure user experience.
        </ThemedText>

        {/* DATA NOT COLLECTED */}
        <ThemedText style={styles.sectionTitle}>Data We Do Not Collect</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind does not collect:{"\n"}
          • your identity (name, email, phone number){"\n"}
          • your activity on other apps or websites{"\n"}
          • any personal information enabling tracking or profiling{"\n"}
          • any data for advertising or commercial purposes
        </ThemedText>

        {/* LOCAL DATA */}
        <ThemedText style={styles.sectionTitle}>Data Stored Locally</ThemedText>
        <ThemedText style={styles.text}>
          Some features rely exclusively on local storage. This data never leaves your device:{"\n"}
          • favorites{"\n"}
          • ritual history{"\n"}
          • visual preferences (theme, options)
        </ThemedText>

        {/* SERVER CONNECTION */}
        <ThemedText style={styles.sectionTitle}>Server Connection</ThemedText>
        <ThemedText style={styles.text}>
          The app may connect to a private server to retrieve content
          such as the daily ritual.{"\n"}
          No personal data is transmitted to the server.
        </ThemedText>

        {/* PURPOSE */}
        <ThemedText style={styles.sectionTitle}>Purpose of Data Use</ThemedText>
        <ThemedText style={styles.text}>
          Local data is used only to enhance your personal experience:
          accessing past rituals, managing favorites, or saving your preferences.
        </ThemedText>

        {/* USER RIGHTS */}
        <ThemedText style={styles.sectionTitle}>Your Rights (GDPR)</ThemedText>
        <ThemedText style={styles.text}>
          Under GDPR, you may request:{"\n"}
          • access{"\n"}
          • modification{"\n"}
          • deletion{"\n"}
          • portability{"\n"}
          You may contact us at any time.
        </ThemedText>

        {/* CONTACT */}
        <ThemedText style={styles.sectionTitle}>Contact</ThemedText>
        <ThemedText style={styles.text}>
          For any privacy-related inquiries:{"\n"}
          📧 support@loryane.com
        </ThemedText>

        <ThemedText
          style={[styles.text, { marginTop: 40, textAlign: "center", opacity: 0.6 }]}
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