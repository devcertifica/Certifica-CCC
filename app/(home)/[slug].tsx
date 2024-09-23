import EditorButton from "@/components/editor-buttons";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";

type RouteParams = {
  slug: string;
};
const FarmDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { slug } = route.params as RouteParams;

  useEffect(() => {
    const decodedSlug = decodeURIComponent(slug);
    navigation.setOptions({ headerTitle: decodedSlug });
  }, []);

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
      }}
    >
      <FarmListItem></FarmListItem>
      <FarmListItem></FarmListItem>
      <FarmListItem></FarmListItem>
      <FarmListItem></FarmListItem>
    </View>
  );
};

export default FarmDetailsPage;

// !TODO:  Separate Components

export const FarmListItem = () => {
  const router = useRouter();
  return (
    <View style={styles.listTileWrapper}>
      <View style={styles.listTile}>
        {/*  */}
        <View style={styles.titleRow}>
          <Text style={{ fontSize: 16, fontWeight: "700", marginRight: 10 }}>
            1.1.1.1
          </Text>
          <FeatherIcon
            name="list"
            size={22}
            style={{ marginTop: 1 }}
          ></FeatherIcon>
        </View>

        <View style={styles.actionRow}>
          <EditorButton
            secondary
            title="Open LDE"
            onPress={() => {
              router.push("/editors/lde-editor");
            }}
          ></EditorButton>
          <View style={{ width: 10 }}></View>
          <EditorButton title="Open FOE" onPress={() => {}}></EditorButton>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <AntDesignIcon name="closecircleo" size={22}></AntDesignIcon>
        </View>

        {/*  */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listTileWrapper: {
    marginBottom: 15,
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: "#FAF9F6",
    paddingHorizontal: 15,
    paddingVertical: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listTile: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 78,
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
  },
});
