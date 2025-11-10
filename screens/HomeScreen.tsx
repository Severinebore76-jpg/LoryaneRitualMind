// @ts-nocheck
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Button,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "../constants/layout";
import { typography } from "../constants/typography";

// import du thème global clair
import { getOrelysTheme } from "../constants/theme";

// ✅ Typage explicite des styles
type Styles = {
  container: ViewStyle;
  logo: ImageStyle;
  title: TextStyle;
  quoteBox: ViewStyle;
  quote: TextStyle;
  actions: ViewStyle;
  emojiTop: TextStyle;
  footer: TextStyle;
};

export default function HomeScreen() {
  const theme = getOrelysTheme("light");
  const nav = useNavigation();

    // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const quoteAnim = useRef(new Animated.Value(0)).current;
  const quoteAnimY = useRef(new Animated.Value(10)).current;

  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 🔹 Animation d’entrée globale (logo + échelle)
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

    fetchQuote();
  }, []);

  // 🔹 Animation de fondu + translation sur la citation
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

  const fetchQuote = async () => {
    try {
      const res = await fetch("http://192.168.0.22:5050/api/messages/today");
      const data = await res.json();
      setQuote(data.message || "Le calme est la clé de l’alignement.");
    } catch (err) {
      setQuote("Le calme est la clé de l’alignement.");
    } finally {
      setLoading(false);
    }
  };
  return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Logo animé */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/logo_orelys.png")} // ton logo ici
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: theme.text }]}>Orelys Ritual Mind</Text>
      </Animated.View>

      {/* Citation du jour */}
      <View style={styles.quoteBox}>
        {loading ? (
          <ActivityIndicator color={theme.primary} /> /* 🆕 couleur dynamique */
        ) : (
      <Animated.Text
  style={[
    styles.quote,
    {
      color: theme.text,
      opacity: quoteAnim,
      transform: [{ translateY: quoteAnimY }],
    },
  ]}
>
  “{quote}”
</Animated.Text>       )}
       </View>

      {/* Bouton principal avec emoji ✨ au-dessus */}
      <View style={styles.actions}>
        <Text style={styles.emojiTop}>✨</Text>
        <Button
          title="Découvrir le rituel du jour"
          color={theme.primary}
          onPress={() => nav.navigate("Rituel" as never)}
        />
      </View>

      {/* Texte de bas de page */}
       <Text style={styles.footer}>🕊️ Prends un instant pour toi 🕊️</Text>
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
  logo: { width: scale (160), height: verticalScale (160), marginBottom: verticalScale (10) },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    fontFamily: typography.fontFamily.primary,
    textAlign: "center",
    color: "#3f2f28",
  },
  quoteBox: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  quote: {
    fontStyle: "italic",
    fontSize: typography.size.md,
    textAlign: "center",
    lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.secondary,
  },
  actions: {
    marginTop: verticalScale (35),
    width: "80%",
    alignItems: "center",
  },
  emojiTop: {
    fontSize: moderateScale (22),
    marginBottom: 8, // espace entre ✨ et le bouton
  },
  footer: {
    fontSize: typography.size.sm,
    marginTop: verticalScale (60),
    fontStyle: "italic",
    color: "#3f2f28",
    textAlign: "center",
  },
});