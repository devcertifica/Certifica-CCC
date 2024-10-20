import { farmVersionStyle } from "@/app/(home)/styles";
import EditorButton from "@/components/editor-buttons";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";

export const FarmVersionListItem = () => {
  const router = useRouter();
  return (
    <View style={farmVersionStyle.listTileWrapper}>
      <View style={farmVersionStyle.listTile}>
        {/*  */}
        <View style={farmVersionStyle.titleRow}>
          <Text style={{ fontSize: 16, fontWeight: "700", marginRight: 10 }}>
            1.1.1.1
          </Text>
          <FeatherIcon
            name="list"
            size={22}
            style={{ marginTop: 1 }}
          ></FeatherIcon>
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
