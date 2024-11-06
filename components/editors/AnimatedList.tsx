import {
  NullableNumber,
  TComponentData,
  TInputPosition,
} from "@/constants/types";
import { useLdeEditor } from "@/context/lde-editor-context";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AddAudio } from "../InsertComponents/AddAudio";
import { AddFoto } from "../InsertComponents/AddFoto";
import { AddText } from "../InsertComponents/AddText";
import DragItem from "./DragItem";

const AnimatedList = () => {
  const { inputData } = useLdeEditor();

  const renderItem = (data: TComponentData) => {
    switch (data.type) {
      case "text":
        return <AddText id={data.id} key={data.id}></AddText>;
      case "audio":
        return <AddAudio id={data.id} key={data.id}></AddAudio>;
      case "foto":
        return <AddFoto key={data.id} id={data.id}></AddFoto>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.listContainer}>
      <ScrollView contentContainerStyle={{ height: "auto" }}>
        {inputData.map((data, index) => {
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

export default AnimatedList;

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "white",
    flex: 1,
  },
});