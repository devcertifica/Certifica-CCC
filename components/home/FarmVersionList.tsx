import EditorButton from "@/components/editors/editor-buttons";
import { farmVersionStyle } from "@/components/home/styles";
import { slugify } from "@/constants/utils";
import { useRoute } from "@react-navigation/native";
import {
  Link,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";

export const FarmVersionListItem = () => {
  const { farmName } = useLocalSearchParams();
  console.log(farmName);
  const version = "1.1.1.1";

  const router = useRouter();
  return (
    <View style={farmVersionStyle.listTileWrapper}>
      <View style={farmVersionStyle.listTile}>
        <View style={farmVersionStyle.titleRow}>
          <Text style={{ fontSize: 16, fontWeight: "700", marginRight: 5 }}>
            {version}
          </Text>
          <Link href={`/${farmName}/details/${version}`} style={{ padding: 5 }}>
            <FeatherIcon
              name="list"
              size={22}
              style={{ marginTop: 1 }}
            ></FeatherIcon>
          </Link>
        </View>

        <View style={farmVersionStyle.actionRow}>
          <EditorButton
            secondary
            title="Open LDE"
            onPress={() => {
              router.push("/editors/lde-editor");
            }}
          ></EditorButton>
          <View style={{ width: 10 }}></View>
          <EditorButton
            title="Open FOE"
            onPress={() => {
              router.push("/editors/foe-editor");
            }}
          ></EditorButton>
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
