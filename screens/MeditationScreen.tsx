// screens/MeditationScreen.tsx
// @ts-nocheck
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import ScreenContainer from "../components/layout/ScreenContainer"; // ✅ AJOUT

import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import BaseCard from "../components/ui/cards/BaseCard";

import {
  meditationAudios,
  meditationImages,
  meditationTexts,
} from "../constants/meditationAssets";

import { energiesByMonth } from "../constants/meditationEnergies";
import { getLoryaneTheme, getThemeForMonth } from "../constants/theme";

// SVG icons
import { PauseIcon } from "../components/icons/PauseIcon";
import { PlayIcon } from "../components/icons/PlayIcon";
import { StopIcon } from "../components/icons/StopIcon";

const MeditationScreen: React.FC = () => {
  const theme = getLoryaneTheme("light");

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

  // TEXTE
  useEffect(() => {
    try {
      if (monthlyTextFile && monthlyTextFile.text) {
        setMeditationText(monthlyTextFile.text);
      } else {
        setMeditationText("Texte indisponible pour le moment.");
      }
    } catch {
      setMeditationText("Texte indisponible pour le moment.");
    }
  }, [monthlyTextFile]);

  // AUDIO
  const playMeditation = async () => {
    try {
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(monthlyAudio);
        soundRef.current = sound;
      }
      await soundRef.current.playAsync();
      setAudioStatus("playing");
    } catch { }
  };

  const pauseMeditation = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
        setAudioStatus("paused");
      }
    } catch { }
  };

  const stopMeditation = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        setAudioStatus("stopped");
      }
    } catch { }
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.background }}
        contentContainerStyle={{
          paddingBottom: 70,
          paddingTop: 10, // ✅ remplace ton insets.top
        }}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView
          style={[styles.container, { backgroundColor: theme.background }]}
        >
          {/* TITRE */}
          <ThemedText
            type="title"
            style={[
              styles.title,
              {
                color: theme.primary,
                marginTop: 10, // ✅ conservé (ton équilibre visuel)
              },
            ]}
          >
            Méditation de {monthlyEnergy.name}
          </ThemedText>

          {/* IMAGE */}
          <View
            style={[
              styles.imageWrapper,
              { borderColor: monthlyTheme.accent },
            ]}
          >
            <Image source={monthlyImage} style={styles.image} />
          </View>

          {/* AUDIO */}
          <View style={[styles.card, { borderColor: monthlyTheme.primary }]}>
            <ThemedText
              style={[styles.cardTitle, { color: monthlyTheme.primary }]}
            >
              🎧 Méditation audio
            </ThemedText>

            <View
              style={[
                styles.controlsRow,
                { borderColor: monthlyTheme.primary },
              ]}
            >
              <TouchableOpacity
                onPress={
                  audioStatus === "playing"
                    ? pauseMeditation
                    : playMeditation
                }
                activeOpacity={0.8}
                style={[
                  styles.iconBtn,
                  { borderColor: monthlyTheme.primary },
                ]}
              >
                {audioStatus === "playing" ? (
                  <PauseIcon size={26} />
                ) : (
                  <PlayIcon size={26} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={stopMeditation}
                activeOpacity={0.8}
                style={[
                  styles.iconBtn,
                  { borderColor: monthlyTheme.primary },
                ]}
              >
                <StopIcon size={26} />
              </TouchableOpacity>
            </View>
          </View>

          {/* ENERGIES */}
          <BaseCard borderColor={monthlyTheme.primary}>
            <ThemedText
              style={[styles.cardTitle, { color: monthlyTheme.primary }]}
            >
              ✨ Énergies du mois
            </ThemedText>

            <ThemedText style={[styles.bodyText, { color: theme.text }]}>
              {monthlyEnergy.description}
            </ThemedText>
          </BaseCard>

          {/* TEXTE */}
          <BaseCard borderColor={monthlyTheme.primary}>
            <ThemedText
              style={[styles.cardTitle, { color: monthlyTheme.primary }]}
            >
              🕊️ Texte de la méditation
            </ThemedText>

            <ThemedText style={[styles.bodyText, { color: theme.text }]}>
              {meditationText}
            </ThemedText>
          </BaseCard>
        </ThemedView>
      </ScrollView>
    </ScreenContainer>
  );
};

export default MeditationScreen;

// STYLES INCHANGÉS
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 22,
  },

  title: {
    marginBottom: 18,
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },

  imageWrapper: {
    width: 230,
    height: 230,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 22,
    borderWidth: 2,
    backgroundColor: "#f4e7e3",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  card: {
    width: "100%",
    backgroundColor: "#f4e7e3",
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  bodyText: {
    fontSize: 15,
    lineHeight: 22,
  },

  controlsRow: {
    width: "100%",
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },

  iconBtn: {
    width: 62,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    backgroundColor: "rgba(255,245,240,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
});