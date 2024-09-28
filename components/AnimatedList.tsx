import { Color_Pallete, SONG_HEIGHT } from "@/constants/constants";
import { SONGS } from "@/constants/data";
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

export const getInitialPositions = (): TInputPosition => {
  let songPositions: TInputPosition = {};
  for (let i = 0; i < SONGS.length; i++) {
    songPositions[i] = {
      updatedIndex: i,
      updatedTop: i * SONG_HEIGHT,
    };
  }

  return songPositions;
};

type TAnimatedList = {
  handleTextRemove: (id: string) => void;
};

const AnimatedList = ({ handleTextRemove }: TAnimatedList) => {
  const { inputData } = useActiveField();

  const currentSongPositions = useSharedValue<TInputPosition>(
    getInitialPositions()
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
            handleTextRemove={handleTextRemove}
            key={data.id}
          ></AddText>
        );
      case "foto":
        return <AddFoto key={data.id}></AddFoto>;
      case "audio":
        return <AddAudio key={data.id}></AddAudio>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.listContainer}>
      <ScrollView contentContainerStyle={{ height: 4 * SONG_HEIGHT }}>
        {inputData.map((data, index) => {
          return (
            <DragItem
              key={data.id}
              item={data}
              isDragging={isDragging}
              draggedItemId={draggedItemId}
              currentSongPositions={currentSongPositions}
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
