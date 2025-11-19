// screens/AboutScreen.tsx
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { getLoryaneTheme } from "../constants/theme";

export default function AboutScreen() {
  const theme = getLoryaneTheme("light");

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >

        {/* VISUEL PREMIUM — Icône dorée */}
        <View style={styles.headerIconBox}>
          <ThemedText style={styles.headerIcon}>✦</ThemedText>
        </View>

        {/* TITRE */}
        <ThemedText
          type="title"
          style={{
            color: theme.primary,
            textAlign: "center",
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          À propos de Loryane
        </ThemedText>

        {/* INTRO */}
        <ThemedText style={styles.paragraph}>
          Loryane Ritual Mind est une application dédiée au bien-être intérieur.
          Elle vous accompagne chaque jour avec des rituels simples, élégants et 
          profondément apaisants. Une bulle intime pour respirer, ralentir, et se 
          reconnecter à votre essentiel.
        </ThemedText>

        <ThemedText style={styles.paragraph}>
          L’univers Loryane repose sur une approche premium, sensible et intuitive :
          couleurs crème, dorures subtiles, symboles énergétiques et atmosphère méditative.
        </ThemedText>

        {/* SECTION — CRÉATRICE */}
        <View style={styles.block}>
          <ThemedText style={styles.subtitle}>Créatrice — Séverine BORÉ</ThemedText>
          <ThemedText style={styles.content}>
            Artiste, autrice et passionnée de bien-être holistique, 
            Séverine BORÉ a imaginé Loryane comme une expérience complète 
            alliant douceur, intention et sens.  
            {"\n\n"}À travers ses mots, ses rituels et son univers sensible, 
            elle vous invite à éveiller votre monde intérieur avec simplicité et élégance.
          </ThemedText>
        </View>

        {/* SECTION — MISSION */}
        <View style={styles.block}>
          <ThemedText style={styles.subtitle}>Notre mission</ThemedText>
          <ThemedText style={styles.content}>
            Vous guider vers une routine apaisée et alignée.  
            Quelques minutes par jour suffisent pour restructurer votre espace intérieur, 
            renforcer votre ancrage et cultiver votre harmonie personnelle.
          </ThemedText>
        </View>

        {/* SECTION — UNIVERS */}
        <View style={styles.block}>
          <ThemedText style={styles.subtitle}>Un univers premium</ThemedText>
          <ThemedText style={styles.content}>
            Loryane s’inspire du luxe naturel : matières organiques, 
            palette beige poudré, dorures élégantes et rythmes doux.  
            Chaque élément visuel a été pensé pour créer une expérience 
            sensorielle raffinée et apaisante.
          </ThemedText>
        </View>

        {/* SECTION — LORYANE ESSENTIELLE */}
        <View style={styles.block}>
          <ThemedText style={styles.subtitle}>Loryane Essentielle</ThemedText>
          <ThemedText style={styles.content}>
            La version physique de l’univers Loryane est Loryane Essentielle : pierres naturelles,
            huiles essentielles, rituels imprimés, coffrets bien-être et créations artisanales.  
            Une extension du digital vers une expérience tangible et holistique.
          </ThemedText>
        </View>

        {/* SECTION — PHILOSOPHIE */}
        <View style={styles.block}>
          <ThemedText style={styles.subtitle}>Philosophie</ThemedText>
          <ThemedText style={styles.content}>
            Un bien-être moderne, déculpabilisé, non intrusif.  
            Ici, pas de performance — seulement un espace sûr, 
            doux et accessible, pour vous écouter et avancer à votre rythme.
          </ThemedText>
        </View>

        {/* ⚠️ OBLIGATION APPLE : Avertissement santé */}
        <View style={[styles.block, { backgroundColor: "#fffaf7" }]}>
          <ThemedText style={[styles.subtitle, { color: "#aa755d" }]}>
            Important
          </ThemedText>
          <ThemedText style={[styles.content, { fontSize: 14 }]}>
            Loryane Ritual Mind propose des contenus bien-être et inspirationnels.  
            Cette application ne fournit aucun diagnostic médical et ne remplace en 
            aucun cas un avis professionnel (médical, psychologique ou thérapeutique).
          </ThemedText>
        </View>

      </ScrollView>
    </ThemedView>
  );
}

// ------------------------------------------------------
// STYLES
// ------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 30,
  },

  headerIconBox: {
    alignItems: "center",
    marginBottom: 8,
  },

  headerIcon: {
    fontSize: 34,
    color: "#d6b98c",
    opacity: 0.85,
  },

  paragraph: {
    color: "#3f2f28",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 18,
    opacity: 0.9,
  },

  block: {
    marginTop: 28,
    padding: 20,
    backgroundColor: "#fff5f0",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d6b98c",
  },

  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3f2f28",
    marginBottom: 8,
  },

  content: {
    fontSize: 15,
    color: "#3f2f28",
    lineHeight: 21,
  },
});