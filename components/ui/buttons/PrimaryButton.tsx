// components/ui/buttons/PrimaryButton.tsx
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { scale, verticalScale } from "../../../constants/layout";
import { typography } from "../../../constants/typography";

type ButtonSize = "sm" | "md" | "lg";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  icon?: string;
  size?: ButtonSize;
};

export default function PrimaryButton({
  label,
  onPress,
  icon,
  size = "md",
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.button, styles[size]]}
    >
      <View style={styles.content}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f7efe8",
    borderColor: "#d6b98c",
    borderWidth: 1,
    borderRadius: 14,
    alignSelf: "center",
  },

  sm: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(18),
  },

  md: {
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(28),
  },

  lg: {
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(36),
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
  },

  icon: {
    fontSize: 20,
  },

  text: {
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.primary,
    fontWeight: "600",
    letterSpacing: 0.3,
    color: "#aa755d",
    textAlign: "center",
  },
});