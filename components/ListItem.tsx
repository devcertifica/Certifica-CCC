import { TItem, TListItem } from "@/constants/types";
import { useGesture } from "@/hooks/useGesture";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Color_Pallete, SONG_HEIGHT } from "../constants/constants";

const ListItem = ({
  item,
  isDragging,
  draggedItemId,
  currentSongPositions,
}: TListItem) => {
  const { animatedStyles, gesture } = useGesture(
    item,
    isDragging,
    draggedItemId,
    currentSongPositions
  );

  return (
    <Animated.View key={item.id} style={[styles.itemContainer, animatedStyles]}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={{
            uri: item.,
          }}
          style={styles.image}
          borderRadius={8}
        /> */}
      </View>
      <View style={styles.descriptionContainer}>
        {/* <Text style={styles.description1}>{item.title}</Text>
        <Text style={styles.description2}>{item.singer}</Text> */}
      </View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.draggerContainer}>
          <View style={[styles.dragger, styles.marginBottom]} />
          <View style={[styles.dragger, styles.marginBottom]} />
          <View style={styles.dragger} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default ListItem;

export const styles = StyleSheet.create({
  itemContainer: {
    height: SONG_HEIGHT,
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    backgroundColor: Color_Pallete.crystal_white,
  },
  imageContainer: {
    height: SONG_HEIGHT,
    width: "20%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  descriptionContainer: {
    width: "60%",
    justifyContent: "space-evenly",
  },
  description1: {
    fontSize: 18,
    fontWeight: "bold",
    color: Color_Pallete.crystal_white,
  },
  description2: { color: Color_Pallete.silver_storm },
  draggerContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  marginBottom: {
    marginBottom: 5,
  },
  dragger: {
    width: "30%",
    height: 2,
    backgroundColor: Color_Pallete.crystal_white,
  },
  image: {
    height: SONG_HEIGHT - 20,
    width: "97%",
  },
});
