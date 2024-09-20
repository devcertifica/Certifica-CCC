import AnimatedList from "@/components/AnimatedList";
import ButtonsGroup from "@/components/ButtonsGroup/ButtonsGroup";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: "auto",
    height: 50,
    backgroundColor: "cyan",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
