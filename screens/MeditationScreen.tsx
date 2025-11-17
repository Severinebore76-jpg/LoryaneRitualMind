import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";

import {
  meditationAudios,
  meditationImages,
  meditationTexts,
} from "../constants/meditationAssets";

import { energiesByMonth } from "../constants/meditationEnergies";
import { getOrelysTheme, getThemeForMonth } from "../constants/theme";

// ⭐ IMPORTS SVG PREMIUM
import { PauseIcon } from "../components/icons/PauseIcon";
import { PlayIcon } from "../components/icons/PlayIcon";
import { StopIcon } from "../components/icons/StopIcon";

const MeditationScreen: React.FC = () => {
  const theme = getOrelysTheme("light");

  const month = (new Date().getMonth() + 1) as keyof typeof meditationImages;

  const monthlyImage = meditationImages[month];
  const monthlyAudio = meditationAudios[month];
  const monthlyTextFile = meditationTexts[month];
  const monthlyEnergy = energiesByMonth[month];
  const monthlyTheme = getThemeForMonth(month);

  const soundRef = useRef<Audio.Sound | null>(null);

  const [meditationText, setMeditationText] = useState<string>("");
  const [audioStatus, setAudioStatus] =
    useState<"stopped" | "playing" | "paused">("stopped");

  // ⭐ Lecture JSON
  useEffect(() => {
    try {
      if (monthlyTextFile && monthlyTextFile.text) {
        setMeditationText(monthlyTextFile.text);
      } else {
        setMeditationText("Texte indisponible pour le moment.");
      }
    } catch (e) {
      setMeditationText("Texte indisponible pour le moment.");
    }
  }, [monthlyTextFile]);

  // ---------------- AUDIO ----------------
  const playMeditation = async () => {
    try {
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(monthlyAudio);
        soundRef.current = sound;
      }
      await soundRef.current.playAsync();
      setAudioStatus("playing");
    } catch {}
  };

  const pauseMeditation = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
        setAudioStatus("paused");
      }
    } catch {}
  };

  const stopMeditation = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        setAudioStatus("stopped");
      }
    } catch {}
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ paddingBottom: 60, backgroundColor: theme.background }}
    >
      <ThemedView style={[styles.container, { backgroundColor: theme.background, flex: 1 }]}>
        
        <ThemedText type="title" style={[styles.title, { color: monthlyTheme.primary }]}>
          Méditation de {monthlyEnergy.name}
        </ThemedText>

        <View style={[styles.imageWrapper, { borderColor: monthlyTheme.accent }]}>
          <Image source={monthlyImage} style={styles.image} />
        </View>

        {/* ⭐ CARD PREMIUM POUR LA MÉDITATION AUDIO */}
        <View style={[styles.audioCard, { borderColor: monthlyTheme.primary }]}>
          <ThemedText style={[styles.audioTitle, { color: monthlyTheme.primary }]}>
            🎧 Méditation audio
          </ThemedText>

          <View style={[styles.audioBar, { borderColor: monthlyTheme.primary }]}>
            <TouchableOpacity
              onPress={audioStatus === "playing" ? pauseMeditation : playMeditation}
            >
              {audioStatus === "playing" ? (
                <PauseIcon size={28} />
              ) : (
                <PlayIcon size={28} />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={stopMeditation}>
              <StopIcon size={28} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ⭐ CARD PREMIUM POUR ÉNERGIES DU MOIS */}
        <View
          style={[
            styles.energyBox,
            {
              backgroundColor: "#F6F2EC",
              borderColor: monthlyTheme.primary,
            },
          ]}
        >
          <ThemedText style={[styles.energyTitle, { color: monthlyTheme.primary }]}>
            ✨ Énergies du mois
          </ThemedText>

          <ThemedText style={[styles.energyText, { color: theme.text }]}>
            {monthlyEnergy.description}
          </ThemedText>
        </View>

        {/* ⭐ CARD PREMIUM TEXTE DE LA MÉDITATION */}
        <View
          style={[
            styles.textInnerCard,
            { borderColor: monthlyTheme.primary }
          ]}
        >
          <ThemedText style={[styles.textTitle, { color: monthlyTheme.primary }]}>
            🕊️ Texte de la méditation
          </ThemedText>

          <ThemedText style={[styles.textContent, { color: theme.text }]}>
            {meditationText}
          </ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
};

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  title: {
    marginBottom: 20,
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },

  imageWrapper: {
    width: 220,
    height: 220,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 30,
    borderWidth: 2,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  // —— CARD AUDIO PREMIUM ——
  audioCard: {
    width: "100%",
    backgroundColor: "#F6F2EC",
    borderRadius: 16,
    borderWidth: 1.8,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 28,
    shadowColor: "#C5A572",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },

  audioTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  // ⭐ NOUVELLE BARRE RECTANGULAIRE
  audioBar: {
    width: 230,
    height: 60,
    borderWidth: 1.8,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 6,
  },

  // —— CARD PREMIUM ÉNERGIES ——
  energyBox: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 28,
  },

  energyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  energyText: {
    fontSize: 15,
    lineHeight: 22,
  },

  // —— CARD PREMIUM TEXTE ——
  textInnerCard: {
    backgroundColor: "#F6F2EC",
    borderRadius: 16,
    borderWidth: 1.8,
    padding: 18,
    shadowColor: "#C5A572",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  textTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  textContent: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default MeditationScreen;