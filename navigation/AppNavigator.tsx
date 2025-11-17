import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Moon, Orbit, Scroll, Star, User } from "lucide-react-native";
import React from "react";
import { getOrelysTheme } from "../constants/theme";
import FavoritesScreen from "../screens/FavoritesScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import MeditationScreen from "../screens/MeditationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RitualScreen from "../screens/RitualScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const theme = getOrelysTheme("light");

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade", // ✅ transition douce entre onglets

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
      {/* 🏠 ACCUEIL */}
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Home size={26} color={color} strokeWidth={1.3} />
          ),
          tabBarLabel: "Accueil",
        }}
      />

      {/* 🕯️ RITUEL */}
      <Tab.Screen
        name="Rituel"
        component={RitualScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Orbit size={24} color={color} strokeWidth={1.2} />
          ),
          tabBarLabel: "Rituel",
        }}
      />

      {/* 🌙 MÉDITATION DU MOIS */}
      <Tab.Screen
        name="Méditation"
        component={MeditationScreen}
        options={{
          tabBarIcon: ({ color }) => <Moon size={26} color={color} />,
        }}
      />

      {/* ⭐ FAVORIS */}
      <Tab.Screen
        name="Favoris"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Star size={26} color={color} strokeWidth={1.3} />
          ),
          tabBarLabel: "Favoris",
        }}
      />
        {/* 📜 HISTORIQUE */}
      <Tab.Screen
        name="Historique"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => <Scroll size={26} color={color} />,
        }}
      />

      {/* 👤 PROFIL */}
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User size={26} color={color} />,
        }}
      />

    </Tab.Navigator>
  );
}