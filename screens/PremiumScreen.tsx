// screens/PremiumScreen.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import Purchases from "react-native-purchases";

import ScreenContainer from "../components/layout/ScreenContainer";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import SecondaryButton from "../components/ui/buttons/SecondaryButton";
import { getLoryaneTheme } from "../constants/theme";

const ENTITLEMENT_ID = "Loryane Ritual Mind Pro";

const PremiumScreen: React.FC = () => {
  const theme = getLoryaneTheme("light");
  const nav = useNavigation<any>();

  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔌 FETCH OFFERS REVENUECAT
  useEffect(() => {
    const loadOffers = async () => {
      try {
        const offerings = await Purchases.getOfferings();

        console.log("🔥 OFFERINGS FULL:", JSON.stringify(offerings, null, 2));

        if (!offerings.current) {
          console.log("❌ current = null");
        } else {
          console.log("✅ packages:", offerings.current.availablePackages.length);
          setPackages(offerings.current.availablePackages);
        }

      } catch (e) {
        console.log("💥 ERREUR RevenueCat:", e);
      }
    };

    loadOffers();
  }, []);

  // 💳 ACHAT
  const handleSubscribe = async (type: "monthly" | "yearly") => {
    try {
      const pack =
        type === "monthly"
          ? packages.find((p) => p.product.identifier === "loryane.premium.monthly")
          : packages.find((p) => p.product.identifier === "loryane.premium.yearly");

      if (!pack) {
        Alert.alert("Erreur", "Offre indisponible.");
        return;
      }

      const { customerInfo } = await Purchases.purchasePackage(pack);

      const isActive =
        customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;

      if (isActive) {
        nav.reset({
          index: 0,
          routes: [{ name: "Accueil" }],
        });

        Alert.alert("Succès", "Abonnement activé !");
      }

    } catch (e: any) {
      if (!e.userCancelled) {
        console.log("Erreur achat:", e);
        Alert.alert("Erreur", "Paiement échoué.");
      }
    }
  };

  // 🔄 RESTORE
  const handleRestore = async () => {
    try {
      const customerInfo = await Purchases.restorePurchases();

      const isActive =
        customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;

      if (isActive) {
        nav.reset({
          index: 0,
          routes: [{ name: "Accueil" }],
        });

        Alert.alert("Succès", "Achats restaurés !");
      } else {
        Alert.alert("Info", "Aucun abonnement actif.");
      }

    } catch (e) {
      console.log("Erreur restore:", e);
      Alert.alert("Erreur", "Impossible de restaurer.");
    }
  };

  // 💰 PRIX (fiable RevenueCat)
  const monthly = packages.find(
    (p) => p.product.identifier === "loryane.premium.monthly"
  );

  const yearly = packages.find(
    (p) => p.product.identifier === "loryane.premium.yearly"
  );

  const monthlyPrice = monthly?.product?.priceString || "...";
  const yearlyPrice = yearly?.product?.priceString || "...";

  return (
    <ScreenContainer>
      <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: 10 }
          ]}
        >
          <ThemedText
            type="title"
            style={[
              styles.title,
              {
                color: theme.primary,
                marginTop: 10
              }
            ]}
          >
            Loryane+
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Un espace intérieur, rien que pour toi.
          </ThemedText>

          <ThemedView style={styles.heroCard}>
            <ThemedText style={styles.heroTitle}>
              Quand le rituel devient un refuge
            </ThemedText>

            <ThemedText style={styles.heroText}>
              Loryane+ transforme ton rituel en véritable rendez-vous avec toi-même :
              audios guidés, archives complètes, favoris sauvegardés, ambiance sur mesure.
            </ThemedText>

            <ThemedText style={styles.heroHint}>
              Sans engagement. Tu peux arrêter à tout moment.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.card}>
            <ThemedText style={styles.sectionTitle}>
              Ce que Loryane+ débloque
            </ThemedText>

            <ThemedText style={styles.bullet}>✦ Rituels audio-guidés</ThemedText>
            <ThemedText style={styles.bullet}>✦ Accès aux archives complètes</ThemedText>
            <ThemedText style={styles.bullet}>✦ Favoris synchronisés</ThemedText>
            <ThemedText style={styles.bullet}>✦ Rappels personnalisés</ThemedText>
            <ThemedText style={styles.bullet}>✦ Ambiances premium</ThemedText>
          </ThemedView>

          <ThemedView style={styles.card}>
            <ThemedText style={styles.sectionTitle}>
              Choisis ton rythme
            </ThemedText>

            <SecondaryButton
              label={`Formule mensuelle — ${monthlyPrice} / mois`}
              onPress={() => handleSubscribe("monthly")}
            />

            <SecondaryButton
              label={`Formule annuelle — ${yearlyPrice} / an`}
              onPress={() => handleSubscribe("yearly")}
            />

            <ThemedText style={styles.legalNote}>
              Paiement sécurisé via Apple. Annulable à tout moment.
            </ThemedText>

            <SecondaryButton
              label="Restaurer mes achats"
              onPress={handleRestore}
            />
          </ThemedView>

          <SecondaryButton
            label="Continuer en mode Free"
            onPress={() => nav.goBack()}
            style={{ marginTop: 30 }}
          />
        </ScrollView>
      </ThemedView>
    </ScreenContainer>
  );
};

export default PremiumScreen;

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  scrollContent: {
    paddingBottom: 40,
    alignItems: "center",
  },

  title: {
    marginBottom: 4,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#6c5448",
    marginBottom: 20,
  },

  heroCard: {
    width: "94%",
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#d6b98c66",
    backgroundColor: "#f7efe8",
    marginBottom: 20,
  },

  heroTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3f2f28",
    marginBottom: 8,
  },

  heroText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#3f2f28",
    marginBottom: 10,
  },

  heroHint: {
    fontSize: 13,
    color: "#aa755d",
  },

  card: {
    width: "94%",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#d6b98c55",
    backgroundColor: "#f7efe8",
    marginTop: 18,
    gap: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3f2f28",
    marginBottom: 6,
  },

  bullet: {
    fontSize: 14,
    color: "#3f2f28",
  },

  legalNote: {
    fontSize: 11,
    color: "#8a7162",
    marginTop: 10,
  },
});