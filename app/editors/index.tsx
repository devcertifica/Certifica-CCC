import AnimatedList from "@/components/AnimatedList";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LdeEditor from "./lde-editor";

const EditorScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LdeEditor />
    </SafeAreaView>
  );
};

export default EditorScreen;
