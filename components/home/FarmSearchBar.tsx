// components/SearchBar.tsx
import { SearchIcon } from "@/components/icons/icons";
import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { homeIndexStyles } from "./styles";

interface FarmSearchBar {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: (query: string) => void;
}

const FarmSearchBar: React.FC<FarmSearchBar> = ({
  searchValue,
  setSearchValue,
  onSearch,
}) => {
  return (
    <View style={homeIndexStyles.searchBarWrapper}>
      <TextInput
        placeholder="Search Farm"
        style={homeIndexStyles.searchInput}
        value={searchValue}
        onChangeText={setSearchValue}
        onSubmitEditing={() => onSearch(searchValue)}
      />
      <View style={homeIndexStyles.searchIcon}>
        <Pressable onPress={() => onSearch(searchValue)}>
          <SearchIcon />
        </Pressable>
      </View>
    </View>
  );
};

export default FarmSearchBar;
