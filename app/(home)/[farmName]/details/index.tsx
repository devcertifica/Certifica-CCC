import { FarmVersionListItem } from "@/components/home/FarmVersionList";
import React from "react";
import { View } from "react-native";

const FarmDetailsPage = () => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
      }}
    >
      <FarmVersionListItem></FarmVersionListItem>
    </View>
  );
};

export default FarmDetailsPage;
