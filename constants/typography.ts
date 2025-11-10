// constants/typography.ts
import { moderateScale, verticalScale } from "./layout";

export const typography = {
  fontFamily: {
    primary: "System", // ou une police personnalisée si tu veux
    secondary: "System",
  },

  size: {
    xs: moderateScale(12),
    sm: moderateScale(14),
    md: moderateScale(16),
    lg: moderateScale(20),
    xl: moderateScale(24),
    xxl: moderateScale(30),
  },

  lineHeight: {
    tight: verticalScale(16),
    normal: verticalScale(20),
    relaxed: verticalScale(24),
    spacious: verticalScale(28),
  },

  weight: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};