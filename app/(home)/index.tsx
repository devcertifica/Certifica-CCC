import { SearchIcon } from "@/components/icons/icons";
import { FarmDataType, farmData } from "@/constants/data";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [farms, setFarms] = useState(farmData);
  const [filterFarm, setFilterFarm] = useState<FarmDataType[]>(farmData);

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
      <View style={styles.container}>
        <View style={styles.searchBarWrapper}>
          <TextInput
            placeholder="Search Farm"
            style={styles.searchInput}
            value={searchValue}
            onChangeText={handleSearch}
            // onSubmitEditing={(event) => {
            //   handleSearch(event.nativeEvent.text);
            // }}
          />
          <View style={styles.searchIcon}>
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
            <Link href={`/${item.name}`} style={searchResultStyles.flatTile}>
              <View style={searchResultStyles.flatTile}>
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarWrapper: {
    width: "80%",
    height: 45,
    backgroundColor: "#FAF9F6",
    borderRadius: 24,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchIcon: {
    width: 24,
    height: 24,
    color: "black",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FAF9F6",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 24,
    // @ts-ignore
    outlineStyle: "none",
  },
});

const searchResultStyles = StyleSheet.create({
  container: {
    marginTop: 25,
    width: "100%",
    height: "65%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchResultWrapper: {
    height: "100%",
    width: "80%",
  },
  flatTile: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    // shadowColor: "#171717",
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    backgroundColor: "#FAF9F6",
  },
});
