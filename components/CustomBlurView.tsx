import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

const CustomBlurView = () => {
  const colorScheme = useColorScheme();
  return (
    <BlurView
      tint={"prominent"}
      intensity={80}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

export default CustomBlurView;

const styles = StyleSheet.create({});
