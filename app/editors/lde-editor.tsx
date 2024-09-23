import AnimatedList from "@/components/AnimatedList";
import ButtonsGroup from "@/components/ButtonsGroup/ButtonsGroup";
import { AddText } from "@/components/InsertComponents";
import { TComponentItem } from "@/constants/types";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

const FoeEditor = () => {
  const [components, setComponents] = useState<TComponentItem[]>([]);

  const handleAddText = () => {
    setComponents((prev) => [
      ...prev,
      { type: "text", node: <AddText></AddText> },
    ]);
    console.log("Handle TextInput");
  };

  const handleAddAudio = () => {
    setComponents((prev) => [
      ...prev,
      { type: "audio", node: <Text>Audio</Text> },
    ]);
    console.log("Handle Audio");
  };

  const handleAddFoto = () => {
    setComponents((prev) => [
      ...prev,
      { type: "foto", node: <Text>Foto</Text> },
    ]);
  };

  const handleAddSave = () => {
    alert("Save");
  };

  const handleCancel = () => {
    alert("Cancel");
  };

  return (
    <View style={{ height: "100%" }}>
      <AnimatedList components={components}></AnimatedList>
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
