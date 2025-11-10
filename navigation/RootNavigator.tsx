// navigation/RootNavigator.tsx
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import RitualScreen from "../screens/RitualScreen";

// Placeholder screens à créer (vides pour l’instant)
import { Text, View } from "react-native";
function HistoryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" }}>
      <Text style={{ color: "#fff" }}>📜 Historique à venir</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" }}>
      <Text style={{ color: "#fff" }}>👤 Profil en construction</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Accueil"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#0A0A0A",
            borderTopColor: "#222",
            height: 60,
          },
          tabBarActiveTintColor: "#c6a56f",
          tabBarInactiveTintColor: "#888",
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "ellipse";
            if (route.name === "Accueil") iconName = "home-outline";
            else if (route.name === "Rituel") iconName = "flame-outline";
            else if (route.name === "Favoris") iconName = "star-outline";
            else if (route.name === "Historique") iconName = "book-outline";
            else if (route.name === "Profil") iconName = "person-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Rituel" component={RitualScreen} />
        <Tab.Screen name="Favoris" component={FavoritesScreen} />
        <Tab.Screen name="Historique" component={HistoryScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}