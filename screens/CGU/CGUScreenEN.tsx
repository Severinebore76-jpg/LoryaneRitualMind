import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function CGUScreenEN() {
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
          Terms of Use
        </ThemedText>

        {/* 1 — Purpose */}
        <ThemedText style={styles.sectionTitle}>1. Purpose of the Application</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind is a wellbeing mobile application offering guided rituals,
          daily messages and inspirational content.{"\n"}{"\n"}
          Using the application implies full acceptance of these Terms of Use.
        </ThemedText>

        {/* 2 — Access & availability */}
        <ThemedText style={styles.sectionTitle}>2. Access to the Service</ThemedText>
        <ThemedText style={styles.text}>
          The application is available 24/7, except during scheduled or unscheduled 
          maintenance, updates or in cases of force majeure.{"\n"}{"\n"}
          The publisher cannot be held responsible for temporary unavailability.
        </ThemedText>

        {/* 3 — User account */}
        <ThemedText style={styles.sectionTitle}>3. User Account</ThemedText>
        <ThemedText style={styles.text}>
          Some features (sync, Loryane+ subscription, etc.) require the creation 
          of a user account.{"\n"}{"\n"}
          You agree to provide accurate and up-to-date information and not impersonate anyone.
        </ThemedText>

        {/* 4 — Authorized use */}
        <ThemedText style={styles.sectionTitle}>4. Authorized Use</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind is intended for personal and non-commercial use.{"\n"}{"\n"}
          You agree not to:{"\n"}
          • misuse or extract content{"\n"}
          • attempt to bypass technical protections{"\n"}
          • use the app for illegal, harmful or defamatory purposes
        </ThemedText>

        {/* 5 — Intellectual property */}
        <ThemedText style={styles.sectionTitle}>5. Intellectual Property</ThemedText>
        <ThemedText style={styles.text}>
          All content (texts, rituals, audios, visuals, graphic identity) is protected 
          under copyright law.{"\n"}{"\n"}
          Any reproduction, distribution or exploitation without written permission 
          is strictly prohibited.
        </ThemedText>

        {/* 6 — Health & liability */}
        <ThemedText style={styles.sectionTitle}>6. Health Disclaimer & Liability</ThemedText>
        <ThemedText style={styles.text}>
          The content provided serves wellbeing and inspirational purposes.{"\n"}{"\n"}
          It does not constitute medical, psychological or therapeutic advice.{"\n"}{"\n"}
          For any physical or mental health concerns, please consult a qualified professional.
        </ThemedText>

        {/* 7 — App modifications */}
        <ThemedText style={styles.sectionTitle}>7. App Changes</ThemedText>
        <ThemedText style={styles.text}>
          The publisher reserves the right to modify, update or suspend certain
          features at any time.
        </ThemedText>

        {/* 8 — Duration / termination */}
        <ThemedText style={styles.sectionTitle}>8. Duration & Termination</ThemedText>
        <ThemedText style={styles.text}>
          These Terms apply throughout the entire use of the application.{"\n"}{"\n"}
          The publisher may suspend or terminate access in cases of fraud, violation 
          of these conditions or abusive behavior.
        </ThemedText>

        {/* 9 — Governing law */}
        <ThemedText style={styles.sectionTitle}>9. Governing Law</ThemedText>
        <ThemedText style={styles.text}>
          These Terms of Use are governed by French law.{"\n"}
          In case of dispute, and failing amicable resolution, French courts will 
          have exclusive jurisdiction.
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