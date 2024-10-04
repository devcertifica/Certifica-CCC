import { TComponentData } from "@/constants/types";
import { useActiveField } from "@/context/lde-editor-context";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./AnimatedList";

const textInputStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginVertical: 5,
    flexGrow: 1,
  },

  input: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    overflow: "hidden",
  },
  buttonContainer: {
    position: "absolute",
    top: 10,
    right: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 20,
  },
  spacer: {
    width: 15,
  },
});

export type TAddText = {
  id: string;
  handleTextRemove: (id: string) => void;
};

export const AddText = ({ id, handleTextRemove }: TAddText) => {
  const { activeId, setActiveId, inputData, setInputData } = useActiveField();

  // Get the current component's data(content and height) from inputData
  const { content, height } = inputData.find((item) => item.id === id) || {
    content: "",
    height: 40,
  };

  const inputRef = useRef<TextInput>(null);

  const handleEdit = () => {
    setActiveId(id);
    inputRef.current?.focus();
  };

  const handleOnFocus = () => {
    setActiveId(id);
  };

  const handleSave = () => {
    // TODO: API call if necessary
    setActiveId(null);
  };

  // TODO: automatic deletion on empty text block
  const handleOnBlur = () => {
    console.log("OnBlur called => ", content);
    if (content.trim() === "") {
      handleTextRemove(id);
    } else {
      setActiveId(null); // Clear the active ID if text is not empty
    }
  };

  const handleTextChange = (newText: string) => {
    // Update the content in inputData for the specific component
    setInputData((prevInputData) =>
      prevInputData.map((item) =>
        item.id === id ? { ...item, content: newText } : item
      )
    );
  };

  const handleHeightChange = (newHeight: number) => {
    // Update the height in inputData for the specific component
    setInputData((prevInputData) =>
      prevInputData.map((item) =>
        item.id === id ? { ...item, height: newHeight } : item
      )
    );
  };

  return (
    <View style={[textInputStyles.container]}>
      <View style={{ position: "relative" }}>
        <TextInput
          onBlur={handleOnBlur}
          ref={inputRef}
          autoFocus={activeId === id}
          style={[textInputStyles.input, { height }]}
          selection={{ start: content.length, end: content.length }}
          onFocus={handleOnFocus}
          multiline={true}
          editable={activeId === id}
          scrollEnabled={false}
          onContentSizeChange={(event) => {
            const newHeight = event.nativeEvent.contentSize.height;
            if (newHeight !== height) {
              handleHeightChange(newHeight);
            }
          }}
          placeholder="Type here..."
          placeholderTextColor={"gray"}
          value={content}
          onChangeText={handleTextChange}
        />

        <View style={textInputStyles.buttonContainer}>
          {activeId === id ? (
            <Pressable onPress={handleEdit}>
              <MaterialIcons name="done" size={20} color="green" />
            </Pressable>
          ) : (
            <Pressable onPress={handleEdit}>
              <Feather name="edit-3" size={20} color="black" />
            </Pressable>
          )}

          <View style={textInputStyles.spacer} />
          <Pressable onPress={() => handleTextRemove(id)}>
            <MaterialIcons name="delete-outline" size={20} color="red" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export const AddAudio = () => {
  return (
    <View>
      <Text>Audio</Text>
    </View>
  );
};

const fotoStyles = StyleSheet.create({
  container: {
    width: "100%", // Make sure the container takes full width
  },
  image: {
    resizeMode: "contain", // Keep aspect ratio while fitting in the container
    width: "100%", // Make the image fit the container width
  },
});

export const AddFoto = ({ id }: { id: string }) => {
  const { inputData } = useActiveField();

  const { content, height } = inputData.find((item) => item.id === id) || {
    content: "",
    height: 500,
  };

  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    if (content) {
      // Fetch the image dimensions to calculate the aspect ratio
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

  if (!content) return null; // Return null if no image is available

  return (
    <View style={fotoStyles.container}>
      {imageAspectRatio ? (
        <Image
          source={{ uri: content }}
          style={[
            fotoStyles.image,
            { aspectRatio: imageAspectRatio }, // Dynamically set aspect ratio
          ]}
        />
      ) : (
        <View style={{ height: height, backgroundColor: "#ECECEC" }} />
      )}
    </View>
  );
};
