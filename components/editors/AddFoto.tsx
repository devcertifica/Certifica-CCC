import { formatSeconds } from "@/constants/utils";
import { TabData, useFoeEditor } from "@/context/foe-editor-context";
import { useLdeEditor } from "@/context/lde-editor-context";
import useAudio from "@/hooks/useAudio";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

export const AddFoto = ({
  id,
  activeTabName,
}: {
  id: string;
  activeTabName: keyof TabData | "lde";
}) => {
  const { tabData, deleteInputDataById: deleteFoeDataById } = useFoeEditor();
  const { inputData, deleteInputDataById: deleteLdeDataById } = useLdeEditor();

  // Select data and delete function based on `activeTabName`
  const dataSource =
    activeTabName === "lde" ? inputData : tabData[activeTabName];
  const deleteInputDataById =
    activeTabName === "lde" ? deleteLdeDataById : deleteFoeDataById;

  // Find item by id in the selected data source
  const { content, height } = dataSource.find((item) => item.id === id) || {
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
