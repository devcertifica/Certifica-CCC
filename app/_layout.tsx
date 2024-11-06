import { ThemeColors } from "@/constants/Colors";
import { deslugify } from "@/constants/utils";
import { FoeEditorProvider } from "@/context/foe-editor-context";
import { LdeEditorProvider } from "@/context/lde-editor-context";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <LdeEditorProvider>
            <FoeEditorProvider>
              <Stack
                screenOptions={{
                  statusBarTranslucent: false,
                  contentStyle: { backgroundColor: ThemeColors.primaryWhite },
                  headerTintColor: "black",
                }}
              >
                <Stack.Screen
                  name="(home)/index"
                  options={{
                    headerShown: true,
                    headerTitle: "Welcome Certifica 👋",
                    headerTitleAlign: "center",
                  }}
                ></Stack.Screen>

                <Stack.Screen
                  name="(home)/[farmName]/details/index"
                  options={({ route }) => {
                    const { farmName } = route.params as { farmName: string };
                    return {
                      headerBackTitleVisible: false,
                      headerTitle: deslugify(farmName),
                      headerShown: true,
                    };
                  }}
                ></Stack.Screen>

                <Stack.Screen
                  name="(home)/[farmName]/details/[lawNo]"
                  options={({ route }) => {
                    const { lawNo } = route.params as { lawNo: string };
                    return {
                      headerBackTitleVisible: false,
                      headerTitle: lawNo,
                      headerShown: true,
                    };
                  }}
                ></Stack.Screen>

                <Stack.Screen
                  name="editors/lde-editor"
                  options={{
                    headerShown: true,
                    headerTitle: "LDE-Editor",
                  }}
                ></Stack.Screen>

                <Stack.Screen
                  name="editors/foe-editor/(tabs)"
                  options={{
                    headerShown: true,
                    headerTitle: "FOE-Editor",
                  }}
                ></Stack.Screen>

                <Stack.Screen
                  name="test/test"
                  options={{ headerTitle: "Test Page", headerShown: true }}
                ></Stack.Screen>
              </Stack>
            </FoeEditorProvider>
          </LdeEditorProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
