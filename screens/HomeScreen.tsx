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
  TouchableOpacity,
  View
} from "react-native";
import { moderateScale, scale, verticalScale } from "../constants/layout";
import { getOrelysTheme } from "../constants/theme";
import { typography } from "../constants/typography";

// 🆕 MAP DES SYMBOLS
import { SYMBOLS_MAP } from "../constants/symbols";

// 🆕 Composant symbole + label
import SymbolDisplay from "../components/SymbolDisplay";

export default function HomeScreen() {
  const theme = getOrelysTheme("light");
  const nav = useNavigation();

  // -------------------------------------------------------
  // ANIMATIONS
  // -------------------------------------------------------
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const quoteAnim = useRef(new Animated.Value(0)).current;
  const quoteAnimY = useRef(new Animated.Value(10)).current;

  // -------------------------------------------------------
  // STATE
  // -------------------------------------------------------
  const [dailyMessage, setDailyMessage] = useState({
    message: null,
    stone: null,
    essential_oil: null,
    symbol: null,
  });
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------------
  // ANIMATION D’ENTRÉE
  // -------------------------------------------------------
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

  // -------------------------------------------------------
  // ANIMATION DU TEXTE
  // -------------------------------------------------------
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

  // -------------------------------------------------------
  // FETCH MESSAGE DU JOUR
  // -------------------------------------------------------
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

    } catch (err) {
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

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* LOGO ANIMÉ */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/logo_orelys.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={[styles.title, { color: theme.text }]}>
          Orelys Ritual Mind
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
            {/* Séparateurs */}
            <Text style={styles.separator}>──────── ✦ ────────</Text>

            {/* Citation */}
            <Text style={[styles.quote, { color: theme.text }]}>
              “{dailyMessage.message}”
            </Text>

            <Text style={styles.separator}>──────── ✦ ────────</Text>

            {/* Ligne des éléments */}
            <View style={styles.elementsRow}>

              {/* PIERRE */}
              {dailyMessage.stone && (
                <View style={styles.elementItem}>
                  <Image
                    source={require("../assets/symbols/symbol_crystal.png")}
                    style={styles.elementIcon}
                  />
                  <Text style={styles.elementText}>{dailyMessage.stone}</Text>
                </View>
              )}

              {/* HUILE */}
              {dailyMessage.essential_oil && (
                <View style={styles.elementItem}>
                  <Image
                    source={require("../assets/symbols/symbol_oil.png")}
                    style={styles.elementIcon}
                  />
                  <Text style={styles.elementText}>{dailyMessage.essential_oil}</Text>
                </View>
              )}

              {/* SYMBOLE + LABEL */}
              {dailyMessage.symbol && SYMBOLS_MAP[dailyMessage.symbol] && (
                <SymbolDisplay symbol={dailyMessage.symbol} />
              )}

            </View>
          </Animated.View>
        )}
      </View>

      {/* BOUTON RITUEL DU JOUR */}
      <View style={styles.actions}>
  <TouchableOpacity
  onPress={() => nav.navigate("Rituel" as never)}
  style={styles.creamButton}
>
  <View style={styles.buttonContent}>
    <Text style={styles.buttonIcon}>✨</Text>
    <Text style={styles.creamButtonText}>Découvrir le rituel du jour</Text>
  </View>
</TouchableOpacity>
</View>

      {/* FOOTER */}
      <Text style={styles.footer}>🕊️ Prendre un instant pour soi 🕊️</Text>
    </View>
  );
}

// -------------------------------------------------------
// STYLES
// -------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  logo: {
    width: scale(160),
    height: verticalScale(160),
    marginBottom: verticalScale(10),
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
  emojiTop: {
    fontSize: moderateScale(22),
    marginBottom: 8,
  },
  footer: {
    fontSize: typography.size.sm,
    marginTop: verticalScale(60),
    fontStyle: "italic",
    color: "#3f2f28",
    textAlign: "center",
  },
  creamButton: {
  backgroundColor: "#f7efe8", // crème doux
  paddingVertical: 14,
  paddingHorizontal: 28,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#d6b98c", // doré clair
  marginTop: verticalScale(20),
  zIndex: 10,
  position: "relative",

  // Effet premium
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3,
  alignSelf: "center",
},
creamButtonText: {
  fontSize: typography.size.md,
  fontFamily: typography.fontFamily.primary,
  color: "#aa755dff",
  textAlign: "center",
  fontWeight: "600",
  letterSpacing: 0.3,
},
buttonContent: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
},

buttonIcon: {
  fontSize: 20,
},
});