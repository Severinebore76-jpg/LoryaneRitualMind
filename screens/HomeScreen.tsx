// screens/HomeScreen.tsx
// @ts-nocheck
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { scale, verticalScale } from "../constants/layout";
import { getLoryaneTheme } from "../constants/theme";
import { typography } from "../constants/typography";

import SymbolDisplay from "../components/SymbolDisplay";
import PrimaryButton from "../components/ui/buttons/PrimaryButton";
import { SYMBOLS_MAP } from "../constants/symbols";

export default function HomeScreen() {
  const theme = getLoryaneTheme("light");
  const nav = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const quoteAnim = useRef(new Animated.Value(0)).current;
  const quoteAnimY = useRef(new Animated.Value(10)).current;

  const [dailyMessage, setDailyMessage] = useState({
    message: null,
    stone: null,
    essential_oil: null,
    symbol: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    fetchMessage();
  }, []);

  useEffect(() => {
    if (!loading) {
      Animated.parallel([
        Animated.timing(quoteAnim, {
          toValue: 1,
          duration: 1000,
          delay: 150,
          useNativeDriver: true,
        }),
        Animated.timing(quoteAnimY, {
          toValue: 0,
          duration: 1000,
          delay: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading]);

  const fetchMessage = async () => {
    try {
      const res = await fetch("http://192.168.0.22:5050/api/messages/today");
      const data = await res.json();

      setDailyMessage({
        message: data.message || "Le calme est la clé de l’alignement.",
        stone: data.stone || null,
        essential_oil: data.essential_oil || null,
        symbol: data.symbol || null,
      });
    } catch {
      setDailyMessage({
        message: "Le calme est la clé de l’alignement.",
        stone: null,
        essential_oil: null,
        symbol: null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* LOGO */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/logo_loryane.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: theme.primary }]}>
          Loryane Ritual Mind
        </Text>
      </Animated.View>

      {/* MESSAGE DU JOUR */}
      <View style={styles.quoteBox}>
        {loading ? (
          <ActivityIndicator color={theme.primary} />
        ) : (
          <Animated.View
            style={{
              opacity: quoteAnim,
              transform: [{ translateY: quoteAnimY }],
              alignItems: "center",
            }}
          >
            <Text style={styles.separator}>──────── ✦ ────────</Text>

            <Text style={[styles.quote, { color: theme.text }]}>
              “{dailyMessage.message}”
            </Text>

            <Text style={styles.separator}>──────── ✦ ────────</Text>

            <View style={styles.elementsRow}>
              {dailyMessage.stone && (
                <View style={styles.elementItem}>
                  <Image
                    source={require("../assets/symbols/symbol_crystal.png")}
                    style={styles.elementIcon}
                  />
                  <Text style={styles.elementText}>{dailyMessage.stone}</Text>
                </View>
              )}

              {dailyMessage.essential_oil && (
                <View style={styles.elementItem}>
                  <Image
                    source={require("../assets/symbols/symbol_oil.png")}
                    style={styles.elementIcon}
                  />
                  <Text style={styles.elementText}>
                    {dailyMessage.essential_oil}
                  </Text>
                </View>
              )}

              {dailyMessage.symbol && SYMBOLS_MAP[dailyMessage.symbol] && (
                <SymbolDisplay symbol={dailyMessage.symbol} />
              )}
            </View>
          </Animated.View>
        )}
      </View>

      {/* ACTION */}
      <View style={styles.actions}>
        <PrimaryButton
          label="Découvrir le rituel du jour"
          icon="✨"
          onPress={() => nav.navigate("Rituel")}
          size="md"
        />
      </View>

      <Text style={styles.footer}>🕊️ Prendre un instant pour soi 🕊️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  logo: {
    width: scale(125),
    height: verticalScale(125),
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    fontFamily: typography.fontFamily.primary,
    textAlign: "center",
  },
  quoteBox: {
    marginTop: 25,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  quote: {
    fontStyle: "italic",
    fontSize: typography.size.md,
    textAlign: "center",
    lineHeight: typography.lineHeight.relaxed,
    fontFamily: typography.fontFamily.secondary,
    marginVertical: 12,
  },
  separator: {
    fontSize: 14,
    color: "#d6b98c",
    marginVertical: 6,
  },

  // (DailyElementsRow viendra ensuite — là on touche pas)
  elementsRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  elementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  elementIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  elementText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.primary,
    color: "#3f2f28",
  },

  actions: {
    marginTop: verticalScale(35),
    width: "80%",
    alignItems: "center",
  },
  footer: {
    fontSize: typography.size.sm,
    marginTop: verticalScale(60),
    fontStyle: "italic",
    color: "#3f2f28",
    textAlign: "center",
  },
});