import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { scale, verticalScale } from "../../../constants/layout";

type Variant = "default" | "soft" | "outlined";

type BaseCardProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  borderColor?: string;
  backgroundColor?: string;
  variant?: Variant;
};

export default function BaseCard({
  children,
  style,
  borderColor = "#d6b98c",
  backgroundColor,
  variant = "default",
}: BaseCardProps) {
  return (
    <View
      style={[
        styles.base,
        styles[variant],
        { borderColor },
        backgroundColor ? { backgroundColor } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    borderRadius: scale(14),
    borderWidth: 1,
    padding: scale(16),
    marginBottom: verticalScale(20),

    // Ombre douce (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // Ombre Android
    elevation: 3,
  },

  default: {
    backgroundColor: "rgba(255, 245, 240, 0.85)",
  },

  soft: {
    backgroundColor: "#F6F2EC",
  },

  outlined: {
    backgroundColor: "transparent",
  },
});