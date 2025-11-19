import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Moon, Orbit, Scroll, Star, User } from "lucide-react-native";
import React from "react";

import { getLoryaneTheme } from "../constants/theme";

// Écrans standards
import AboutScreen from "../screens/AboutScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import MeditationScreen from "../screens/MeditationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RitualScreen from "../screens/RitualScreen";

// Écrans juridiques (FR uniquement)
import BillingPolicyScreen from "../screens/Billing/BillingPolicyScreen";
import CGUScreen from "../screens/CGU/CGUScreen";
import SubscriptionPolicyScreen from "../screens/CGV/SubscriptionPolicyScreen";
import ConfidentialityScreen from "../screens/Confidentiality/ConfidentialityScreen";
import DataPolicyScreen from "../screens/Data/DataPolicyScreen";
import LegalScreen from "../screens/Legal/LegalScreen";

// Écran Premium
import PremiumScreen from "../screens/PremiumScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// -------------------------------
// 📌 STACK PROFIL
// -------------------------------
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilMain"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      {/* ⚖️ Juridique */}
      <Stack.Screen
        name="Apropos"
        component={AboutScreen}
        options={{ title: "À propos de Loryane", headerShown: true }}
      />

      <Stack.Screen
        name="Legal"
        component={LegalScreen}
        options={{ title: "Mentions légales", headerShown: true }}
      />

      <Stack.Screen
        name="Confidentiality"
        component={ConfidentialityScreen}
        options={{ title: "Politique de confidentialité", headerShown: true }}
      />

      <Stack.Screen
        name="DataPolicy"
        component={DataPolicyScreen}
        options={{ title: "Données & RGPD", headerShown: true }}
      />

      <Stack.Screen
        name="CGU"
        component={CGUScreen}
        options={{ title: "Conditions d’utilisation", headerShown: true }}
      />

      <Stack.Screen
        name="CGV"
        component={SubscriptionPolicyScreen}
        options={{ title: "CGV & Abonnement", headerShown: true }}
      />

      <Stack.Screen
        name="Billing"
        component={BillingPolicyScreen}
        options={{ title: "Facturation & Remboursement", headerShown: true }}
      />

      {/* ⭐ Premium */}
      <Stack.Screen
        name="Subscription"
        component={PremiumScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// -------------------------------
// 📌 TAB PRINCIPALE
// -------------------------------
export default function AppNavigator() {
  const theme = getLoryaneTheme("light");

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.accent,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopWidth: 0,
          height: 90,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 6,
          elevation: 3,
        },
        tabBarLabelStyle: {
          color: theme.text,
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Home size={26} color={color} strokeWidth={1.3} />
          ),
        }}
      />

      <Tab.Screen
        name="Rituel"
        component={RitualScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Orbit size={24} color={color} strokeWidth={1.2} />
          ),
        }}
      />

      <Tab.Screen
        name="Méditation"
        component={MeditationScreen}
        options={{
          tabBarIcon: ({ color }) => <Moon size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="Favoris"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Star size={26} color={color} strokeWidth={1.3} />
          ),
        }}
      />

      <Tab.Screen
        name="Historique"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => <Scroll size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="Profil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => <User size={26} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}