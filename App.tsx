import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { ActivityIndicator, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {

   // 🔔 Notifications
  useEffect(() => {
    // Comportement par défaut
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true, // ✅ requis par iOS
        shouldShowList: true,   // ✅ requis par iOS
      }),
    });

    (async () => {
      // Demande de permission
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission de notifications refusée");
        return;
      }

      // ✅ Android : créer un channel (sinon pas d’affichage)
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("daily", {
          name: "Daily Reminders",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
      // 🔁 Dev: éviter les doublons à chaque reload
      await Notifications.cancelAllScheduledNotificationsAsync();

      // 🕐 Planifier un rappel quotidien à 09:00
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🌞 Orelys Ritual Mind",
          body: "Votre rituel du jour est prêt à être découvert.",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR, // ✅ typage explicite attendu
          hour: 9,
          minute: 0,
          repeats: true,
          // Channel Android
          channelId: Platform.OS === "android" ? "daily" : undefined,
        },
      });
    })();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer
        fallback={<ActivityIndicator size="large" />}
        onStateChange={(state) => {
          console.log('New state:', state);
        }}
      >
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
    );
    }