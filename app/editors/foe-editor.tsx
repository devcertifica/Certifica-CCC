import AnimatedList from "@/components/AnimatedList";
import ButtonsGroup from "@/components/ButtonsGroup/ButtonsGroup";
import React from "react";
import { View } from "react-native";

const FoeEditor = () => {
  const handleAddText = () => {
    console.log("Handle TextInput");
  };

  const handleAddAudio = () => {
    console.log("Handle Audio");
  };

  const handleAddFoto = () => {
    console.log("Handle Photo");
  };

  const handleAddSave = () => {
    console.log("Hanlde Save");
  };

  const handleCancel = () => {
    console.log("Handle Cancel");
  };

  return (
    <View style={{ height: "100%" }}>
      <AnimatedList></AnimatedList>
      <ButtonsGroup
        handleAddText={handleAddText}
        handleAddAudio={handleAddAudio}
        handleAddFoto={handleAddFoto}
        handleAddSave={handleAddSave}
        handleCancel={handleCancel}
      />
    </View>
  );
};

export default FoeEditor;
