import { StyleSheet } from "react-native";

export const homeIndexStyles = StyleSheet.create({
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

export const searchResultStyles = StyleSheet.create({
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
    flexGrow: 1,
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
  },
  linkContent: {
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row", // In case you want to add more content beside Text
    justifyContent: "center", // Center the content
    alignItems: "center",
  },
});
