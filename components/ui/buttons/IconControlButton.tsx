// components/ui/controls/IconControlButton.tsx
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { scale } from "../../../constants/layout";

type Variant = "ghost" | "outlined" | "filled";
type Size = "sm" | "md" | "lg";

type Props = {
  onPress: () => void;
  children: React.ReactNode; // une icône (SVG component) ou un <Text> etc.
  variant?: Variant;
  size?: Size;
  style?: ViewStyle;
  disabled?: boolean;
};

export default function IconControlButton({
  onPress,
  children,
  variant = "outlined",
  size = "md",
  style,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        styles[size],
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(16),
  },

  sm: {
    width: scale(48),
    height: scale(48),
  },

  md: {
    width: scale(56),
    height: scale(56),
  },

  lg: {
    width: scale(64),
    height: scale(64),
  },

  ghost: {
    backgroundColor: "transparent",
  },

  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1.8,
    borderColor: "#d6b98c",
  },

  filled: {
    backgroundColor: "#fff5f0",
    borderWidth: 1.8,
    borderColor: "#d6b98c",
  },

  disabled: {
    opacity: 0.5,
  },
});