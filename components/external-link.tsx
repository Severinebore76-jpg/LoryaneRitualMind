// components/external-link.tsx
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Linking, Platform, Pressable, StyleSheet, Text } from "react-native";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function ExternalLink({ href, children }: ExternalLinkProps) {
  const handlePress = async () => {
    try {
      if (Platform.OS === "web") {
        // Sur le web : ouvre dans l’onglet du navigateur
        await Linking.openURL(href);
      } else {
        // Sur iOS / Android : ouvre en in-app browser (équivalent à avant)
        await WebBrowser.openBrowserAsync(href, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
        });
      }
    } catch (error) {
      console.warn("Impossible d'ouvrir l’URL :", href, error);
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.link}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    opacity: 0.9,
  },
  text: {
    color: "#c9a46a", // doré doux Orelys
    textDecorationLine: "underline",
  },
});