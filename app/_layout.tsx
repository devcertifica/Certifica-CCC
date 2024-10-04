import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { ActiveFieldProvider } from "@/context/lde-editor-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ActiveFieldProvider>
            <ThemeProvider value={DefaultTheme}>
              <Stack>
                <Stack.Screen
                  name="(home)/index"
                  options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                  name="editors/lde-editor"
                  options={{ headerTitle: "LDE", headerShown: true }}
                ></Stack.Screen>

                <Stack.Screen
                  name="test/test"
                  options={{ headerTitle: "Test Page", headerShown: true }}
                ></Stack.Screen>
              </Stack>
            </ThemeProvider>
          </ActiveFieldProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
