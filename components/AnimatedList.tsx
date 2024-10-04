import {
  NullableNumber,
  TComponentData,
  TInputPosition,
} from "@/constants/types";
import { useActiveField } from "@/context/lde-editor-context";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import DragItem from "./DragItem";
import { AddAudio, AddFoto, AddText } from "./InsertComponents";

export const getInitialPositions = (
  inputData: TComponentData[]
): TInputPosition => {
  let inputPosition: TInputPosition = {};

  for (let i = 0; i < inputData.length; i++) {
    const item = inputData[i];

    if (item && typeof item.height === "number") {
      inputPosition[i] = {
        updatedIndex: i,
        updatedTop: i * item.height,
      };
    }
  }

  return inputPosition;
};

type TAnimatedList = {
  handleRemoveId: (id: string) => void;
};

const AnimatedList = ({ handleRemoveId }: TAnimatedList) => {
  const { inputData } = useActiveField();

  const currentInputPositions = useSharedValue<TInputPosition>(
    getInitialPositions(inputData)
  );

  //used to know if drag is happening or not
  const isDragging = useSharedValue<0 | 1>(0);

  //this will hold id for item which user started dragging
  const draggedItemId = useSharedValue<NullableNumber>(null);

  const renderItem = (data: TComponentData) => {
    switch (data.type) {
      case "text":
        return (
          <AddText
            id={data.id}
            handleRemoveId={handleRemoveId}
            key={data.id}
          ></AddText>
        );

      case "audio":
        return <AddAudio key={data.id}></AddAudio>;
      case "foto":
        return (
          <AddFoto
            key={data.id}
            id={data.id}
            handleRemoveId={handleRemoveId}
          ></AddFoto>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.listContainer}>
      <ScrollView contentContainerStyle={{ height: "auto" }}>
        {inputData.map((data, index) => {
          return (
            <DragItem
              key={data.id}
              item={data}
              isDragging={isDragging}
              draggedItemId={draggedItemId}
              currentInputPositions={currentInputPositions}
            >
              {renderItem(data)}
            </DragItem>
          );
        })}

        {/* {inputData.map(renderItem)} */}
      </ScrollView>
    </View>
  );
};

export default AnimatedList;

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "white",
    height: "90%",
  },
});

/* {SONGS.map((song) => (
          <ListItem
            item={song}
            key={song.id}
            isDragging={isDragging}
            draggedItemId={draggedItemId}
            currentSongPositions={currentSongPositions}
          />
        ))} */
