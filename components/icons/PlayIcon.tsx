// components/icons/PlayIcon.tsx
import React from "react";
import Svg, { Path } from "react-native-svg";

export const PlayIcon = ({ size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 5 L19 12 L8 19 Z"
      fill="#6B4A3A"
      stroke="#C5A572"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </Svg>
);