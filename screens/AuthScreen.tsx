// screens/AuthScreen.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
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

export default function AuthScreen() {
  const theme = getLoryaneTheme("light");
  const nav = useNavigation();
  const route = useRoute<any>();

  const mode = route.params?.mode || "auth";

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (mode === "edit") {
          const stored = await AsyncStorage.getItem("user");

          if (!stored) {
            Alert.alert("Accès refusé", "Vous devez être connecté.");
            nav.goBack();
            return;
          }

          const parsed = JSON.parse(stored);

          setPseudo(parsed.pseudo || "");
          setEmail(parsed.email || "");
          setOriginalEmail(parsed.email || "");
        }
      } catch {
        console.log("Erreur prefill user");
      }
    };

    loadUser();
  }, [mode]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userFound = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!userFound) {
        Alert.alert("Erreur", "Email ou mot de passe incorrect.");
        return;
      }

      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          email: userFound.email,
          pseudo: userFound.pseudo || email.split("@")[0],
        })
      );

      Alert.alert("Connexion", "Connexion réussie.");
      nav.goBack();
    } catch {
      Alert.alert("Erreur", "Impossible de se connecter.");
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const existing = users.find((u: any) => u.email === email);

      if (existing) {
        Alert.alert("Erreur", "Un compte existe déjà avec cet email.");
        return;
      }

      const finalPseudo = pseudo || email.split("@")[0];

      const newUser = {
        email,
        password,
        pseudo: finalPseudo,
      };

      const updatedUsers = [...users, newUser];

      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          email,
          pseudo: finalPseudo,
        })
      );

      Alert.alert("Inscription", "Compte créé.");
      nav.goBack();
    } catch {
      Alert.alert("Erreur", "Impossible de créer le compte.");
    }
  };

  const handleUpdate = async () => {
    if (!pseudo || !email) {
      Alert.alert("Erreur", "Veuillez remplir les champs.");
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem("users");
      let users = storedUsers ? JSON.parse(storedUsers) : [];

      const index = users.findIndex(
        (u: any) => u.email === originalEmail
      );

      if (index === -1) {
        Alert.alert("Erreur", "Utilisateur introuvable.");
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
        JSON.stringify({
          email,
          pseudo,
        })
      );

      Alert.alert("Profil", "Informations mises à jour.");
      nav.goBack();
    } catch {
      Alert.alert("Erreur", "Impossible de mettre à jour.");
    }
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
            try {
              const storedUsers = await AsyncStorage.getItem("users");
              let users = storedUsers ? JSON.parse(storedUsers) : [];

              const updatedUsers = users.filter(
                (u: any) => u.email !== originalEmail
              );

              await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
              await AsyncStorage.removeItem("user");

              Alert.alert("Compte supprimé");
              nav.navigate("ProfilMain" as never);
            } catch {
              Alert.alert("Erreur", "Impossible de supprimer le compte.");
            }
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
            {mode === "edit"
              ? "Modifier mon profil"
              : "Connexion / Inscription"}
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
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {mode !== "edit" && (
            <TextInput
              placeholder="Mot de passe"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
          )}

          <PrimaryButton
            label={mode === "edit" ? "Mettre à jour" : "Se connecter"}
            onPress={mode === "edit" ? handleUpdate : handleLogin}
            size="md"
          />

          {mode !== "edit" && (
            <SecondaryButton
              label="Créer un compte"
              onPress={handleRegister}
            />
          )}

          {mode === "edit" && (
            <>
              <SecondaryButton
                label="Annuler"
                onPress={() => nav.goBack()}
              />

              <SecondaryButton
                label="Supprimer mon compte"
                onPress={handleDeleteAccount}
              />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "stretch",
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d6b98c",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
  },
});