// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function OrelysRotatingIcon() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinAnim.start();
    return () => spinAnim.stop();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.wrapper}>
      <Animated.Image
        source={require("../assets/images/icone_orelys.png")}
        resizeMode="contain"
        style={[
          styles.icon,
          {
            transform: [{ rotateY: spin }], // rotation sur soi-même (axe miroir)
            backfaceVisibility: "visible",   // évite le masquage iOS
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible", // corrige les coupures sur iOS
  },
  icon: {
    width: 200,
    height: 200,
  },
});