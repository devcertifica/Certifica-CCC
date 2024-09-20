import AnimatedList from "@/components/AnimatedList";
import ButtonsGroup from "@/components/ButtonsGroup/ButtonsGroup";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FoeEditor from "./foe-editor";

const EditorScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FoeEditor />
    </SafeAreaView>
  );
};

export default EditorScreen;
