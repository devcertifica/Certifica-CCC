import { Color_Pallete, SONG_HEIGHT } from "@/constants/constants";
import { SONGS } from "@/constants/data";
import {
  NullableNumber,
  TComponentData,
  TSongPositions,
} from "@/constants/types";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { AddAudio, AddFoto, AddText } from "./InsertComponents";
import ListItem from "./ListItem";

export const getInitialPositions = (): TSongPositions => {
  let songPositions: TSongPositions = {};
  for (let i = 0; i < SONGS.length; i++) {
    songPositions[i] = {
      updatedIndex: i,
      updatedTop: i * SONG_HEIGHT,
    };
  }

  return songPositions;
};

type TAnimatedList = {
  inputData: TComponentData[];
  handleTextRemove: (id: string) => void;
};

const AnimatedList = ({ inputData, handleTextRemove }: TAnimatedList) => {
  const currentSongPositions = useSharedValue<TSongPositions>(
    getInitialPositions()
  );

  //used to know if drag is happening or not
  const isDragging = useSharedValue<0 | 1>(0);

  //this will hold id for item which user started dragging
  const draggedItemId = useSharedValue<NullableNumber>(null);

  const renderItem = (data: TComponentData) => {
    console.log(data);

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
        {inputData.map(renderItem)}

        {/* {SONGS.map((song) => (
          <ListItem
            item={song}
            key={song.id}
            isDragging={isDragging}
            draggedItemId={draggedItemId}
            currentSongPositions={currentSongPositions}
          />
        ))} */}
      </ScrollView>
    </View>
  );
};

export default AnimatedList;

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Color_Pallete.metal_black,
    height: "90%",
  },
});
