// components/icons/StopIcon.tsx
import React from "react";
import Svg, { Rect } from "react-native-svg";

export const StopIcon = ({ size = 26 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="7"
      y="7"
      width="10"
      height="10"
      fill="#6B4A3A"
      stroke="#C5A572"
      strokeWidth="1.4"
      rx="2"
    />
  </Svg>
);