import { formatSeconds } from "@/constants/utils";
import { useLdeEditor } from "@/context/lde-editor-context";
import useAudio from "@/hooks/useAudio";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const audioStyles = StyleSheet.create({
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
export const AddAudio = ({ id }: { id: string }) => {
  const { inputData, activeId, setActiveId } = useLdeEditor();

  const data = inputData.find((el) => el.id === id);

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
  );
};

const fotoStyles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  image: {
    resizeMode: "contain",
    width: "100%",
  },
  buttonsGroup: {
    position: "absolute",
    top: 25,
    right: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },
  buttonContainer: {
    backgroundColor: "#FFFFFF50",
    padding: 10,
    borderRadius: 20,
  },
});
export const AddFoto = ({ id }: { id: string }) => {
  const { inputData, deleteInputDataById } = useLdeEditor();

  const { content, height } = inputData.find((item) => item.id === id) || {
    content: "",
    height: 500,
  };

  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    if (content) {
      Image.getSize(
        content,
        (width, height) => {
          setImageAspectRatio(width / height);
        },
        (error) => {
          console.log("Error fetching image dimensions: ", error);
        }
      );
    }
  }, [content]);

  if (!content) return null;

  return (
    <View style={fotoStyles.container}>
      {imageAspectRatio ? (
        <Image
          source={{ uri: content }}
          style={[fotoStyles.image, { aspectRatio: imageAspectRatio }]}
        />
      ) : (
        <View style={{ height: height, backgroundColor: "#ECECEC" }} />
      )}

      <View style={fotoStyles.buttonsGroup}>
        <View style={fotoStyles.buttonContainer}>
          <Pressable onPress={() => deleteInputDataById(id)}>
            <MaterialIcons name="delete-outline" size={20} color="red" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
