import { FarmVersionListItem } from "@/components/home/FarmVersionListItem";
import { TLaw } from "@/constants/data";
import { useFarmData } from "@/context/farm-data-context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

const LawsPage = () => {
  const { laws, setLaws } = useFarmData();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/season/1/laws`);

      const sortedLaws = response.data.laws.sort(
        (a: TLaw, b: TLaw) => b.id - a.id
      );
      // console.log(laws);
      setLaws(sortedLaws);
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={laws}
        keyExtractor={(item) => item.number.toString()} // Ensure keys are strings
        renderItem={({ item }) => <FarmVersionListItem law={item} />}
      />
    </View>
  );
};

export default LawsPage;

const styles = StyleSheet.create({});
