import { FarmVersionListItem } from "@/components/home/FarmVersionListItem";
import { TLaw } from "@/constants/data";
import { useFarmData } from "@/context/farm-data-context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const LawsPage = () => {
  const { laws, setLaws } = useFarmData();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/season/1/laws`);

      console.log(response.data.laws);

      const sortedLaws = response.data.laws.sort(
        (a: TLaw, b: TLaw) => b.id - a.id
      );

      setLaws(sortedLaws);
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: "auto" }}>
        {laws.map((law) => {
          return <FarmVersionListItem key={law.number} law={law} />;
        })}
      </ScrollView>
    </View>
  );
};

export default LawsPage;

const styles = StyleSheet.create({});
