// components/FarmItem.tsx
import { TFarm } from "@/constants/data";
import { deslugify, slugify } from "@/constants/utils";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { searchResultStyles } from "./styles";

interface FarmItemProps {
  farm: TFarm;
}

const FarmItem: React.FC<FarmItemProps> = ({ farm }) => {
  return (
    <Link
      href={{
        pathname: "/farm/[farmId]",
        params: { farmId: farm.id, name: slugify(farm.name) },
      }}
      style={searchResultStyles.flatTile}
    >
      <View style={searchResultStyles.linkContent}>
        <Text>{farm.name}</Text>
      </View>
    </Link>
  );
};

export default FarmItem;
