import DragItem from "@/components/editors/DragItem";
import { AddAudio } from "@/components/FoeEditorComponents/AddAudio";
import { AddFoto } from "@/components/FoeEditorComponents/AddFoto";
import { AddText } from "@/components/FoeEditorComponents/AddText";
import { TComponentData } from "@/constants/types";
import { TabData, useFoeEditor } from "@/context/foe-editor-context";
import { useIsFocused, useNavigationState } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

const FoeEditorTabView = ({ name }: { name: keyof TabData }) => {
  const { setActiveTabName, activeTabName } = useFoeEditor();

  const index = useNavigationState((state) => state.index);

  useEffect(() => {
    switch (index) {
      case 0:
        setActiveTabName("observation");
        break;
      case 1:
        setActiveTabName("action");
        break;
      case 2:
        setActiveTabName("deadline");
        break;
      case 3:
        setActiveTabName("responsible");
        break;
    }
  }, [index]);

  const { tabData } = useFoeEditor();

  const renderItem = (data: TComponentData) => {
    switch (data.type) {
      case "text":
        return (
          <AddText id={data.id} key={data.id} activeTabName={name}></AddText>
        );
      case "audio":
        return (
          <AddAudio id={data.id} key={data.id} activeTabName={name}></AddAudio>
        );
      case "foto":
        return (
          <AddFoto key={data.id} id={data.id} activeTabName={name}></AddFoto>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ height: "auto" }}>
        {tabData[name].map((data, index) => {
          return (
            <DragItem key={data.id} item={data}>
              {renderItem(data)}
            </DragItem>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FoeEditorTabView;
