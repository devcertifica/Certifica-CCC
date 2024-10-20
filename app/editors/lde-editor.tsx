import AnimatedList from "@/components/editors/AnimatedList";
import BottomSheet from "@/components/editors/BottomSheet";
import ButtonGroup from "@/components/editors/ButtonsGroup";
import React from "react";
import { View } from "react-native";

const LdeEditor = () => {
  return (
    <View style={{ height: "100%" }}>
      <AnimatedList />
      <ButtonGroup />
      <BottomSheet />
    </View>
  );
};

export default LdeEditor;
