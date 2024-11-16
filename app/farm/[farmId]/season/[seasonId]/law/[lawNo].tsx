import { ThemeColors } from "@/constants/Colors";
import { TLaw } from "@/constants/data";
import { useFarmData } from "@/context/farm-data-context";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const LawDetails = () => {
  const { lawNo } = useLocalSearchParams();
  const { laws } = useFarmData();

  const [selectedLaw, setSelectedLaw] = useState<TLaw>();

  useEffect(() => {
    setSelectedLaw(laws.find((law) => law.number.match(lawNo.toString())));
  }, [lawNo]);

  return (
    <View style={LawDetailsStyle.container}>
      <View style={{ marginBottom: 30, gap: 5 }}>
        <Text style={LawDetailsStyle.headerTitle}>Type: Core</Text>
        <Text style={LawDetailsStyle.headerTitle}>#{lawNo}</Text>
        <Text style={LawDetailsStyle.headerTitle}>Requirement:</Text>
      </View>

      <View style={LawDetailsStyle.paragraphContainer}>
        <Text style={LawDetailsStyle.paragraph}>
          {selectedLaw?.requirement}
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
    textAlign: "justify",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
