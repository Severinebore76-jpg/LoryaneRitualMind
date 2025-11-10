// navigation/BottomTabs.tsx
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import RitualScreen from "../screens/RitualScreen";

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" }}>
      <Text style={{ color: "#fff" }}>👤 Profil en construction</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Accueil"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0A0A0A",
          borderTopColor: "#222",
          height: 60,
        },
        tabBarActiveTintColor: "#c9a46a",
        tabBarInactiveTintColor: "#777",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "ellipse";
          if (route.name === "Accueil") iconName = "home-outline";
          else if (route.name === "Rituel") iconName = "flame-outline";
          else if (route.name === "Historique") iconName = "book-outline";
          else if (route.name === "Profil") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Rituel" component={RitualScreen} />
      <Tab.Screen name="Historique" component={HistoryScreen} />
    </Tab.Navigator>
  );
}