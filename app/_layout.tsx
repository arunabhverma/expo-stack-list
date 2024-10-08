import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerLargeTitle: true,
            headerTransparent: true,
            title: "Groups",
            headerTitleStyle: {
              color: colorScheme === "dark" ? "black" : "white",
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
