import { FarmVersionListItem } from "@/components/home/FarmVersionListItem";
import { API_BASE_URL } from "@/constants/api";
import { TLaw } from "@/constants/data";
import { useFarmData } from "@/context/farm-data-context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

const LawsPage = () => {
  const { laws, setLaws } = useFarmData();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_BASE_URL}/season/1/laws`);

      const sortedLaws = response.data.laws.sort(
        (a: TLaw, b: TLaw) => b.id - a.id
      );
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
