// components/icons/PauseIcon.tsx
import React from "react";
import Svg, { Rect } from "react-native-svg";

export const PauseIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="7" y="5" width="4" height="14" fill="#6B4A3A" stroke="#C5A572" strokeWidth="1.4" />
    <Rect x="13" y="5" width="4" height="14" fill="#6B4A3A" stroke="#C5A572" strokeWidth="1.4" />
  </Svg>
);