import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Orbit, Star } from "lucide-react-native";
import React from "react";
import { getOrelysTheme } from "../constants/theme";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import RitualScreen from "../screens/RitualScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const theme = getOrelysTheme("light");

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        
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
          tabBarIcon: ({ color }) => ( <Orbit size={24} color={color} strokeWidth={1.2} /> ),
          tabBarLabel: "Rituel",
        }}
      />
       {/* ⭐ FAVORIS */}
       <Tab.Screen
        name="Favoris"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => ( <Star size={26} color={color} strokeWidth={1.3} /> ),
          tabBarLabel: "Favoris",
        }}
      />
    </Tab.Navigator>
  );
}