import { formatSeconds } from "@/constants/utils";
import { TabData, useFoeEditor } from "@/context/foe-editor-context";
import { useLdeEditor } from "@/context/lde-editor-context";
import useAudio from "@/hooks/useAudio";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

export const AddAudio = ({
  id,
  activeTabName,
}: {
  id: string;
  activeTabName: keyof TabData | "lde";
}) => {
  const {
    tabData,
    activeId: foeActiveId,
    setActiveId: setFoeActiveId,
    deleteInputDataById: deleteFoeDataById,
  } = useFoeEditor();
  const {
    inputData,
    activeId: ldeActiveId,
    setActiveId: setLdeActiveId,
    deleteInputDataById: deleteLdeDataById,
  } = useLdeEditor();

  // Determine the correct data source and methods
  const dataSource =
    activeTabName === "lde" ? inputData : tabData[activeTabName];
  const deleteInputDataById =
    activeTabName === "lde" ? deleteLdeDataById : deleteFoeDataById;
  const activeId = activeTabName === "lde" ? ldeActiveId : foeActiveId;
  const setActiveId = activeTabName === "lde" ? setLdeActiveId : setFoeActiveId;

  const data = dataSource.find((el) => el.id === id);

  const { position, status, duration, sound } = useAudio({
    uri: data?.content || "",
    shouldPlay: false,
    shouldLoop: false,
    updateIntervals: 1000,
    startPosition: 0,
  });

  const handlePlayback = async () => {
    if (!sound) return;
    try {
      if (status === "isPlaying") {
        await sound.pauseAsync();
        setActiveId(null);
      } else {
        // Check if another audio is playing and pause it
        if (activeId && activeId !== id) {
          if (sound) {
            await sound.pauseAsync();
          }
        }

        // If the current audio has already finished, reset its position
        if (position >= duration) {
          await sound.setPositionAsync(0);
        }

        // Play the audio and set the activeId to the current one
        await sound.playAsync();
        setActiveId(id); // Mark this audio as active
      }
    } catch (error) {
      console.error("Error playing or resetting sound:", error);
    }
  };

  return (
    <View style={audioStyles.wrapper}>
      <View style={audioStyles.container}>
        {data?.content && (
          <View style={audioStyles.playButton}>
            <Pressable onPress={handlePlayback}>
              {status === "isPlaying" ? (
                <FontAwesome5 name="pause" size={18} color="black" />
              ) : (
                <FontAwesome5 name="play" size={18} color="black" />
              )}
            </Pressable>
            <View style={{ width: 10 }}></View>
            <View style={{ flex: 1 }}>
              <Progress.Bar
                progress={position / duration || 0}
                height={2}
                borderColor="#00000050"
                color="black"
                width={null}
              />
            </View>
            <View style={{ width: 10 }}></View>
            <View style={audioStyles.timeContainer}>
              {status === "isPlaying" ? (
                <Text>{formatSeconds(duration - position)}</Text>
              ) : (
                <Text>{formatSeconds(duration)}</Text>
              )}
            </View>
          </View>
        )}
      </View>

      <View style={{ marginRight: 25 }}>
        <Pressable
          onPress={() => deleteInputDataById(id)}
          style={{
            padding: 7,
            backgroundColor: "#00000025",
            borderRadius: 20,
          }}
        >
          <MaterialIcons name="delete-outline" size={20} color="red" />
        </Pressable>
      </View>
    </View>
  );
};

const audioStyles = StyleSheet.create({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    marginVertical: 5,
    width: "50%",
    marginHorizontal: 10,
  },

  playButton: {
    paddingVertical: 10,
    paddingLeft: 18,
    paddingRight: 10,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00000020",
  },

  timeContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
});
