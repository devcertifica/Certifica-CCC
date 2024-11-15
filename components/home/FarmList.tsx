// components/FarmList.tsx
import { TFarm } from "@/constants/data";
import React from "react";
import { FlatList, View } from "react-native";
import FarmItem from "./FarmItem";
import { searchResultStyles } from "./styles";

interface FarmListProps {
  farms: TFarm[];
}

const FarmList: React.FC<FarmListProps> = ({ farms }) => {
  return (
    <View style={searchResultStyles.container}>
      <FlatList
        style={searchResultStyles.searchResultWrapper}
        data={farms}
        contentContainerStyle={{ rowGap: 10 }}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <FarmItem key={item.id} farm={item} />}
      />
    </View>
  );
};

export default FarmList;
