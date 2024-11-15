import { ThemeColors } from "@/constants/Colors";
import { deslugify } from "@/constants/utils";
import { FarmDataProvider } from "@/context/farm-data-context";
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
          <FarmDataProvider>
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
                    name="index"
                    options={{
                      headerShown: true,
                      headerTitle: "Welcome Certifica 👋",
                      headerTitleAlign: "center",
                    }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="farm/[farmId]/index"
                    options={({ route }) => {
                      const { name, farmId } = route.params as {
                        farmId: number;
                        name: string;
                      };
                      return {
                        headerBackTitleVisible: true,
                        headerTitle: deslugify(name),
                        headerShown: true,
                      };
                    }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="farm/[farmId]/season/[seasonId]/index"
                    options={({ route }) => {
                      const { seasonId } = route.params as { seasonId: string };
                      return {
                        headerBackTitleVisible: false,
                        headerTitleAlign: "center",
                        headerTitle: `Season - ${seasonId}`,
                        headerShown: true,
                      };
                    }}
                  />
                  <Stack.Screen
                    name="farm/[farmId]/season/[seasonId]/law/[lawNo]"
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
                </Stack>
              </FoeEditorProvider>
            </LdeEditorProvider>
          </FarmDataProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
