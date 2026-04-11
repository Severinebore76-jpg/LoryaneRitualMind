// screens/EditProfileScreen.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import ScreenContainer from "../components/layout/ScreenContainer"; // ✅ AJOUT

import PrimaryButton from "../components/ui/buttons/PrimaryButton";
import SecondaryButton from "../components/ui/buttons/SecondaryButton";
import { getLoryaneTheme } from "../constants/theme";

export default function EditProfileScreen() {
  const theme = getLoryaneTheme("light");
  const nav = useNavigation();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("user");

      if (!stored) {
        Alert.alert("Accès refusé");
        nav.goBack();
        return;
      }

      const parsed = JSON.parse(stored);

      setPseudo(parsed.pseudo || "");
      setEmail(parsed.email || "");
      setOriginalEmail(parsed.email || "");
    };

    loadUser();
  }, []);

  const handleUpdate = async () => {
    if (!pseudo || !email) {
      Alert.alert("Erreur", "Champs requis");
      return;
    }

    const storedUsers = await AsyncStorage.getItem("users");
    let users = storedUsers ? JSON.parse(storedUsers) : [];

    const index = users.findIndex(
      (u: any) => u.email === originalEmail
    );

    if (index === -1) {
      Alert.alert("Erreur", "Utilisateur introuvable");
      return;
    }

    users[index] = {
      ...users[index],
      pseudo,
      email,
    };

    await AsyncStorage.setItem("users", JSON.stringify(users));

    await AsyncStorage.setItem(
      "user",
      JSON.stringify({ email, pseudo })
    );

    Alert.alert("Profil mis à jour");
    nav.goBack();
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Supprimer le compte",
      "Cette action est irréversible. Voulez-vous continuer ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            const storedUsers = await AsyncStorage.getItem("users");
            let users = storedUsers ? JSON.parse(storedUsers) : [];

            const updatedUsers = users.filter(
              (u: any) => u.email !== originalEmail
            );

            await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
            await AsyncStorage.removeItem("user");

            Alert.alert("Compte supprimé");
            nav.navigate("ProfilMain" as never);
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text style={[styles.title, { color: theme.primary }]}>
            Modifier mon profil
          </Text>

          <TextInput
            placeholder="Pseudo"
            placeholderTextColor="#aaa"
            value={pseudo}
            onChangeText={setPseudo}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <PrimaryButton
            label="Enregistrer"
            onPress={handleUpdate}
            size="md"
          />

          <SecondaryButton
            label="Annuler"
            onPress={() => nav.goBack()}
            style={styles.secondaryFixed}
          />

          <SecondaryButton
            label="Supprimer mon compte"
            onPress={handleDeleteAccount}
            style={styles.secondaryFixed}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

// =========================
// STYLES (INCHANGÉS)
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 16,
  },

  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d6b98c",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#fff5f0",
    color: "#3f2f28",
    fontSize: 15,
  },

  secondaryFixed: {
    marginTop: 12,
    borderColor: "#d6b98c",
    backgroundColor: "#f7efe8",
  },
});