import { Platform, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

const CustomBlurView = () => {
  const tint = useColorScheme();
  return (
    <BlurView
      tint={Platform.select({
        android: tint === "light" ? "default" : "dark",
        ios: "prominent",
      })}
      experimentalBlurMethod={"dimezisBlurView"}
      intensity={100}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

export default CustomBlurView;
