import { Color_Pallete, SONG_HEIGHT } from "@/constants/constants";
import { SONGS } from "@/constants/data";
import {
  NullableNumber,
  TComponentItem,
  TSongPositions,
} from "@/constants/types";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { AddAudio, AddComponent, AddFoto, AddText } from "./InsertComponents";
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

const AnimatedList = ({ components }: { components: TComponentItem[] }) => {
  const currentSongPositions = useSharedValue<TSongPositions>(
    getInitialPositions()
  );

  //used to know if drag is happening or not
  const isDragging = useSharedValue<0 | 1>(0);

  //this will hold id for item which user started dragging
  const draggedItemId = useSharedValue<NullableNumber>(null);

  const renderItem = (item: TComponentItem) => {
    console.log(item);

    switch (item.type) {
      case "text":
        return item.node;
      case "foto":
        return <AddFoto></AddFoto>;
      case "audio":
        return <AddAudio></AddAudio>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.listContainer}>
      <ScrollView contentContainerStyle={{ height: 4 * SONG_HEIGHT }}>
        {components.map((el, index) => {
          return <View key={index}>{renderItem(el)}</View>;
        })}

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
