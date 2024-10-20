import { FarmVersionListItem } from "@/components/home/FarmVersionList";
import { deslugify } from "@/constants/utils";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const FarmDetailsPage = () => {
  const navigation = useNavigation();
  const { "farm-version": farmName } = useLocalSearchParams();

  useEffect(() => {
    if (farmName) {
      const deSlugFarmName = deslugify(farmName as string);
      navigation.setOptions({ headerTitle: deSlugFarmName });
    }
  }, [farmName, navigation]);

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
