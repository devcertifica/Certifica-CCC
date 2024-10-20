import { SearchIcon } from "@/components/icons/icons";
import { FarmDataType, farmData } from "@/constants/data";
import { slugify } from "@/constants/utils";
import { Link } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeIndexStyles, searchResultStyles } from "./styles";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [farms, setFarms] = useState(farmData);
  const [filterFarm, setFilterFarm] = useState<FarmDataType[]>(farmData);

  console.log(decodeURI(filterFarm[0].name));

  const handleSearch = (query: string) => {
    setSearchValue(query);
    if (!query) {
      setFilterFarm(farmData);
      return;
    }
    const results = farms.filter((farm) => {
      return farm.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilterFarm(results);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}
    >
      {/* Search Bar */}
      <View style={homeIndexStyles.container}>
        <View style={homeIndexStyles.searchBarWrapper}>
          <TextInput
            placeholder="Search Farm"
            style={homeIndexStyles.searchInput}
            value={searchValue}
            onChangeText={handleSearch}
            // onSubmitEditing={(event) => {
            //   handleSearch(event.nativeEvent.text);
            // }}
          />
          <View style={homeIndexStyles.searchIcon}>
            <Pressable onPress={() => handleSearch(searchValue)}>
              <SearchIcon />
            </Pressable>
          </View>
        </View>
      </View>

      {/* SearchList */}
      <View style={searchResultStyles.container}>
        <FlatList
          style={searchResultStyles.searchResultWrapper}
          data={filterFarm}
          contentContainerStyle={{ rowGap: 10 }}
          renderItem={({ item }) => (
            <Link
              href={`/${slugify(item.name)}/details`}
              style={searchResultStyles.flatTile}
            >
              <View style={searchResultStyles.linkContent}>
                <Text>{item.name}</Text>
              </View>
            </Link>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
