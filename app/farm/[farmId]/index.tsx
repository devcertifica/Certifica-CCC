import { FarmVersionListItem } from "@/components/home/FarmVersionListItem";
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
          `http://localhost:8080/farm/${farmId}/seasons`
        );
        console.log("Farm Details Page => ", response.data.seasons);
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
            <View>
              <Text>Season {season.id}</Text>
            </View>
          </Link>
        );
      })}
    </View>
  );
};

export default FarmDetailsPage;
