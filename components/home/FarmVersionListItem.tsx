import EditorButton from "@/components/editors/editor-buttons";
import { farmVersionStyle } from "@/components/home/styles";
import { ThemeColors } from "@/constants/Colors";
import { TLaw } from "@/constants/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

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
            style={{ marginHorizontal: 5 }}
          >
            <Feather name="list" size={24} color="black" />
          </Link>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            {law.number}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <AntDesign name="closecircleo" size={24} color="black" />
        </View>
      </View>

      <View style={farmVersionStyle.actionRow}>
        <EditorButton
          title="LDE"
          onPress={() => {
            router.push("/editors/lde-editor");
          }}
        ></EditorButton>
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
