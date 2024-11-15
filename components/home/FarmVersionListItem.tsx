import EditorButton from "@/components/editors/editor-buttons";
import { farmVersionStyle } from "@/components/home/styles";
import { ThemeColors } from "@/constants/Colors";
import { TLaw } from "@/constants/data";
import axios from "axios";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";

export const FarmVersionListItem = ({ law }: { law: TLaw }) => {
  const { farmId, seasonId } = useLocalSearchParams();

  const router = useRouter();
  return (
    <View style={farmVersionStyle.listTileWrapper}>
      <View style={farmVersionStyle.listTile}>
        <View style={farmVersionStyle.titleRow}>
          <Link
            href={{
              pathname: "/farm/[farmId]/season/[seasonId]/law/[lawNo]",
              params: {
                farmId: farmId.toString(),
                seasonId: seasonId.toString(),
                lawNo: law.number,
              },
            }}
            style={{ padding: 5, paddingBottom: 1, width: 40 }}
          >
            <FeatherIcon
              name="list"
              size={22}
              style={{ marginTop: 1 }}
            ></FeatherIcon>
          </Link>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              marginRight: 5,
            }}
          >
            {law.number}
          </Text>
        </View>

        {/* <View style={farmVersionStyle.actionRow}>
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
        </View> */}

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
      </View>

      <View style={farmVersionStyle.actionRow}>
        <EditorButton
          title="LDE"
          onPress={() => {
            router.push("/editors/lde-editor");
          }}
        ></EditorButton>
        <View
          style={{ width: 1, backgroundColor: ThemeColors.paleBlack }}
        ></View>
        <EditorButton
          secondary
          title="FOE"
          onPress={() => {
            router.push("/editors/foe-editor");
          }}
        ></EditorButton>
      </View>
    </View>
  );
};
