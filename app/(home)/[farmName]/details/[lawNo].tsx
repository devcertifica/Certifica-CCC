import { ThemeColors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LawDetails = () => {
  const { lawNo } = useLocalSearchParams();

  return (
    <View style={LawDetailsStyle.container}>
      <View style={{ marginBottom: 30, gap: 5 }}>
        <Text style={LawDetailsStyle.headerTitle}>Type: Core</Text>
        <Text style={LawDetailsStyle.headerTitle}>#{lawNo}</Text>
        <Text style={LawDetailsStyle.headerTitle}>Requirement:</Text>
      </View>

      <View style={LawDetailsStyle.paragraphContainer}>
        <Text style={LawDetailsStyle.paragraph}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          laborum illum qui impedit.
        </Text>

        <Text style={LawDetailsStyle.paragraph}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore,
          excepturi sunt. Magni laudantium, expedita ad nobis debitis sit ullam
          nemo quam deserunt enim quae rerum odit in ipsum numquam ipsam? Illo
          minus cumque laborum laudantium sequi blanditiis eum exercitationem
          saepe molestias quo fuga enim aspernatur quibusdam explicabo, optio ad
          autem.
        </Text>
      </View>
    </View>
  );
};

export default LawDetails;

const LawDetailsStyle = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: ThemeColors.offWhite,
    flex: 1,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  paragraphContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
