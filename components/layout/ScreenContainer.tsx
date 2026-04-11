// components/layout/ScreenContainer.tsx

import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLoryaneTheme } from "../../constants/theme";

type Props = {
  children: ReactNode;
};

export default function ScreenContainer({ children }: Props) {
  const theme = getLoryaneTheme("light");

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top", "left", "right"]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});