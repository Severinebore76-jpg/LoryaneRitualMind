// screens/CGUScreen.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { getLoryaneTheme } from "../../constants/theme";

export default function CGUScreen() {
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
          Conditions Générales d’Utilisation
        </ThemedText>

        {/* 1 — Objet */}
        <ThemedText style={styles.sectionTitle}>1. Objet de l’application</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind est une application mobile de bien-être proposant des
          rituels guidés, messages quotidiens et contenus inspirationnels.
          {"\n"}{"\n"}
          L’utilisation de l’application implique l’acceptation pleine et entière des
          présentes Conditions Générales d’Utilisation (CGU).
        </ThemedText>

        {/* 2 — Accès & disponibilité */}
        <ThemedText style={styles.sectionTitle}>2. Accès au service</ThemedText>
        <ThemedText style={styles.text}>
          L’application est accessible 7j/7 et 24h/24, sauf interruption programmée ou
          non pour maintenance, mise à jour ou cas de force majeure.
          {"\n"}{"\n"}
          L’éditeur ne peut être tenu responsable d’une indisponibilité
          temporaire du service.
        </ThemedText>

        {/* 3 — Compte utilisateur */}
        <ThemedText style={styles.sectionTitle}>3. Compte utilisateur</ThemedText>
        <ThemedText style={styles.text}>
          Certaines fonctionnalités (synchronisation, abonnement Loryane+, etc.)
          nécessitent la création d’un compte.
          {"\n"}{"\n"}
          Tu t’engages à fournir des informations exactes et à jour, et à ne pas
          usurper l’identité d’un tiers.
        </ThemedText>

        {/* 4 — Usage autorisé */}
        <ThemedText style={styles.sectionTitle}>4. Usage autorisé de l’application</ThemedText>
        <ThemedText style={styles.text}>
          Loryane Ritual Mind est destinée à un usage personnel et non commercial.
          {"\n"}{"\n"}
          Tu t’engages à ne pas :
          {"\n"}• détourner les contenus{"\n"}• tenter de contourner les protections
          techniques{"\n"}• utiliser l’app à des fins illégales, diffamatoires ou nuisibles
        </ThemedText>

        {/* 5 — Propriété intellectuelle */}
        <ThemedText style={styles.sectionTitle}>5. Propriété intellectuelle</ThemedText>
        <ThemedText style={styles.text}>
          Tous les contenus (textes, rituels, audios, visuels, identité graphique)
          sont protégés par le droit d’auteur.
          {"\n"}{"\n"}
          Toute reproduction, diffusion ou exploitation sans autorisation écrite
          est interdite.
        </ThemedText>

        {/* 6 — Santé & responsabilité */}
        <ThemedText style={styles.sectionTitle}>6. Santé et limitation de responsabilité</ThemedText>
        <ThemedText style={styles.text}>
          Les contenus proposés ont une finalité de bien-être et d’inspiration.
          {"\n"}{"\n"}
          Ils ne constituent en aucun cas un conseil médical, psychologique ou
          thérapeutique.
          {"\n"}{"\n"}
          Pour toute difficulté de santé physique ou mentale, consulte un
          professionnel qualifié.
        </ThemedText>

        {/* 7 — Modifications de l’app */}
        <ThemedText style={styles.sectionTitle}>7. Évolutions de l’application</ThemedText>
        <ThemedText style={styles.text}>
          L’éditeur se réserve le droit de modifier, mettre à jour ou suspendre tout
          ou partie des fonctionnalités, à tout moment.
        </ThemedText>

        {/* 8 — Durée / résiliation */}
        <ThemedText style={styles.sectionTitle}>8. Durée & résiliation</ThemedText>
        <ThemedText style={styles.text}>
          Les présentes CGU s’appliquent pendant toute la durée d’utilisation de
          l’application.
          {"\n"}{"\n"}
          L’éditeur peut suspendre ou résilier l’accès en cas d’usage frauduleux,
          de non-respect des présentes conditions ou d’abus manifeste.
        </ThemedText>

        {/* 9 — Droit applicable */}
        <ThemedText style={styles.sectionTitle}>9. Droit applicable</ThemedText>
        <ThemedText style={styles.text}>
          Les présentes CGU sont soumises au droit français.{"\n"}
          En cas de litige, et à défaut de résolution amiable, les tribunaux
          français seront seuls compétents.
        </ThemedText>

        <ThemedText
          style={[
            styles.text,
            { marginTop: 40, textAlign: "center", opacity: 0.6 },
          ]}
        >
          Dernière mise à jour : {new Date().getFullYear()}
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
