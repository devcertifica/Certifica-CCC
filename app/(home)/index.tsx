// screens/HomePage.tsx
import FarmList from "@/components/home/FarmList";
import FarmSearchBar from "@/components/home/FarmSearchBar";
import { homeIndexStyles } from "@/components/home/styles";
import { FarmDataType, farmData } from "@/constants/data";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterFarm, setFilterFarm] = useState<FarmDataType[]>(farmData);

  const handleSearch = (query: string) => {
    setSearchValue(query);
    if (!query) {
      setFilterFarm(farmData);
      return;
    }
    const results = farmData.filter((farm) =>
      farm.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilterFarm(results);
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: insets.bottom + 100,
      }}
    >
      {/* SearchBar Component */}
      <View style={homeIndexStyles.container}>
        <FarmSearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={handleSearch}
        />
      </View>
      {/* FarmList Component */}
      <FarmList farms={filterFarm} />
      {/* </SafeAreaView> */}
    </View>
  );
};

export default HomePage;
