import { FarmVersionListItem } from "@/components/home/FarmVersionListItem";
import { API_BASE_URL } from "@/constants/api";
import { ThemeColors } from "@/constants/Colors";
import { TFarm } from "@/constants/data";
import { slugify } from "@/constants/utils";
import axios from "axios";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  seasonContainer: {
    flexGrow: 1,
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: ThemeColors.offWhite,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
  },
});

const FarmDetailsPage = () => {
  const { farmId, name } = useLocalSearchParams();

  const [seasons, setSeasons] = useState<TFarm[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/farm/${farmId}/seasons`
        );
        setSeasons(response.data.seasons);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
      }}
    >
      {seasons.map((season, index) => {
        return (
          <Link
            href={`/farm/${farmId}/season/${season.id}`}
            key={index}
            style={styles.seasonContainer}
          >
            <Text>Season {season.id}</Text>
          </Link>
        );
      })}
    </View>
  );
};

export default FarmDetailsPage;
