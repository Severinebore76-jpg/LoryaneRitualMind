import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";

// RevenueCat
import Purchases from "react-native-purchases";

// Handler notifications 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [isPremium, setIsPremium] = useState<boolean | null>(null);

  // 🔥 FONCTION UNIQUE DE VÉRIFICATION
  const checkPremium = useCallback(async () => {
    try {
      // -----------------------------
      // 1️⃣ RÉCUP USER
      // -----------------------------
      const userString = await AsyncStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      const userEmail = user?.email?.trim().toLowerCase();

      // -----------------------------
      // 2️⃣ INIT REVENUECAT
      // -----------------------------
      await Purchases.configure({
        apiKey: Platform.OS === "ios"
          ? "appl_peHYzKTulrvkHZZtudWzTCEzQrH"
          : "appl_peHYzKTulrvkHZZtudWzTCEzQrH",
      });

      // -----------------------------
      // 3️⃣ SI PAS CONNECTÉ → BLOQUÉ DIRECT
      // -----------------------------
      if (!userEmail) {
        setIsPremium(false);
        return;
      }

      // -----------------------------
      // 4️⃣ LOGIN REVENUECAT
      // -----------------------------
      await Purchases.logIn(userEmail);

      const customerInfo = await Purchases.getCustomerInfo();

      const isActive =
        customerInfo.entitlements.active["Loryane Ritual Mind Pro"] !== undefined;

      // -----------------------------
      // 5️⃣ ADMIN SÉCURISÉ
      // -----------------------------
      const ADMIN_EMAIL = "severinebore@icloud.com";
      const isAdmin = userEmail === ADMIN_EMAIL;

      // -----------------------------
      // 6️⃣ RÉSULTAT FINAL
      // -----------------------------
      const isPremiumUser = isActive || isAdmin;

      setIsPremium(isPremiumUser);

    } catch (e) {
      console.log("RevenueCat error:", e);

      // 🔒 sécurité stricte
      setIsPremium(false);
    }
  }, []);

  // -----------------------------
  // 🔥 INIT AU LANCEMENT
  // -----------------------------
  useEffect(() => {
    checkPremium();
  }, [checkPremium]);

  // -----------------------------
  // 🔥 ÉCOUTE CHANGEMENT USER
  // (évite le "r")
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      checkPremium();
    }, 1500); // léger polling (simple et fiable)

    return () => clearInterval(interval);
  }, [checkPremium]);

  // -----------------------------
  // Notifications
  // -----------------------------
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        console.log("NOTIF START");

        const { status } = await Notifications.requestPermissionsAsync();

        console.log("STATUS:", status);

        if (status !== "granted") return;

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Ton message du jour est prêt ✨",
            body: "Prends un moment pour toi aujourd’hui.",
          },
          trigger: {
            hour: 9,
            minute: 0,
            repeats: true,
          } as any,
        });

        console.log("NOTIF PROGRAMMÉE");

      } catch (e) {
        console.log("Notification error:", e);
      }
    };

    setupNotifications();
  }, []);

  // -----------------------------
  // Loader
  // -----------------------------
  if (isPremium === null) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        fallback={<ActivityIndicator size="large" />}
        onStateChange={(state) => {
          console.log("New state:", state);
        }}
      >
        <AppNavigator isPremium={isPremium} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}