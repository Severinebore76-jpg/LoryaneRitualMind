// components/ui/buttons/SecondaryButton.tsx
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { scale, verticalScale } from "../../../constants/layout";
import { typography } from "../../../constants/typography";

type SecondaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export default function SecondaryButton({
  label,
  onPress,
  style,
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    borderColor: "#d6b98c",
    borderWidth: 1,
    borderRadius: scale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.primary,
    fontWeight: "500",
    letterSpacing: 0.3,
    color: "#3f2f28",
    textAlign: "center",
  },
});