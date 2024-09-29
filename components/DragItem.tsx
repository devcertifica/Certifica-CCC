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
      <Animated.View style={[]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default DragItem;

const styles = StyleSheet.create({});
