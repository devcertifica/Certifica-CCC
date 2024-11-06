import { TListItem } from "@/constants/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DragItem = ({ item, children }: TListItem) => {
  return (
    <View>
      <View style={[]}>{children}</View>
    </View>
  );
};

export default DragItem;

const styles = StyleSheet.create({});
