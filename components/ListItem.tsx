import { TItem, TListItem } from "@/constants/types";
import { useGesture } from "@/hooks/useGesture";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Color_Pallete, HEIGHT } from "../constants/constants";

const ListItem = ({
  item,
  isDragging,
  draggedItemId,
  currentInputPositions,
  children,
}: TListItem) => {
  const { animatedStyles, gesture } = useGesture(
    item,
    isDragging,
    draggedItemId,
    currentInputPositions
  );

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.itemContainer, animatedStyles]}>
        {children}

        <Animated.View style={styles.draggerContainer}>
          <View style={[styles.dragger, styles.marginBottom]} />
          <View style={[styles.dragger, styles.marginBottom]} />
          <View style={styles.dragger} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ListItem;

export const styles = StyleSheet.create({
  itemContainer: {
    height: HEIGHT,
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    backgroundColor: Color_Pallete.crystal_white,
  },

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
    height: HEIGHT - 20,
    width: "97%",
  },
});
