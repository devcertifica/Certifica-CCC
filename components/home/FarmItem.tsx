// components/FarmItem.tsx
import { slugify } from "@/constants/utils";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { searchResultStyles } from "./styles";

interface FarmItemProps {
  name: string;
}

const FarmItem: React.FC<FarmItemProps> = ({ name }) => {
  return (
    <Link
      href={`/${slugify(name)}/details`}
      style={searchResultStyles.flatTile}
    >
      <View style={searchResultStyles.linkContent}>
        <Text>{name}</Text>
      </View>
    </Link>
  );
};

export default FarmItem;
