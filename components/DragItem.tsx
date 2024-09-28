import { TListItem } from "@/constants/types";
import { useGesture } from "@/hooks/useGesture";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const DragItem = ({
  item,
  isDragging,
  draggedItemId,
  currentSongPositions,
  children,
}: TListItem) => {
  const { animatedStyles, gesture } = useGesture(
    item,
    isDragging,
    draggedItemId,
    currentSongPositions
  );

  console.log("animatedStyles => ", animatedStyles);
  console.log("gesture => ", gesture);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default DragItem;

const styles = StyleSheet.create({});
