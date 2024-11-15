import { ThemeColors } from "@/constants/Colors";
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
    backgroundColor: ThemeColors.offWhite,
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
    backgroundColor: ThemeColors.offWhite,
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
    height: "100%",
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
    backgroundColor: ThemeColors.offWhite,
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

export const farmVersionStyle = StyleSheet.create({
  listTileWrapper: {
    marginVertical: 7.5,
    // shadowColor: "#171717",
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    backgroundColor: "white",
    // backgroundColor: "red",
    marginHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: ThemeColors.paleBlack,
    overflow: "hidden",
  },
  listTile: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 78,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnGroups: {
    display: "flex",
    flexDirection: "row",
  },
  actionRow: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    width: "100%",
  },
});
