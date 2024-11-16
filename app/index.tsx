// screens/HomePage.tsx
import FarmList from "@/components/home/FarmList";
import FarmSearchBar from "@/components/home/FarmSearchBar";
import { homeIndexStyles } from "@/components/home/styles";
import { TFarm } from "@/constants/data";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterFarm, setFilterFarm] = useState<TFarm[]>([]);
  const [originFarm, setOriginFarm] = useState<TFarm[]>([]);
  const handleSearch = (query: string) => {
    setSearchValue(query);
    if (!query) {
      setFilterFarm(originFarm);
      return;
    }
    const results = originFarm.filter((farm) =>
      farm.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilterFarm(results);
  };

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/consultant/1/farms"
        );
        setFilterFarm(response.data.farms);
        setOriginFarm(response.data.farms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
