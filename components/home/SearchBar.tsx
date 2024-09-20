import { SearchIcon } from "@/components/icons/icons";
import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface SearchBarProps extends TextInputProps {
  placeholder?: string;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>((props, ref) => {
  return (
    <View style={styles.searchBarWrapper}>
      <TextInput
        ref={ref}
        placeholder={props.placeholder}
        style={styles.searchInput}
        {...props}
      />
      <View style={styles.searchIcon}>
        <SearchIcon />
      </View>
    </View>
  );
});

export default SearchBar;

const styles = StyleSheet.create({
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
    outlineStyle: "none",
  },
});
