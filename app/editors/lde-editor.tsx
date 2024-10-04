import AnimatedList from "@/components/AnimatedList";
import { useActiveField } from "@/context/lde-editor-context";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import uuid from "react-native-uuid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#ECECEC",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});

const LdeEditor = () => {
  const { activeId, setActiveId, inputData, setInputData } = useActiveField();

  const handleRemoveId = (id: string) => {
    setInputData(
      inputData.filter((el) => {
        return el.id !== id;
      })
    );
  };

  const handleAddText = () => {
    const generateId = uuid.v4().toString();
    setActiveId(generateId);
    console.log("activeId => ", activeId);
    setInputData((prev) => [
      ...prev,
      {
        id: generateId,
        idx: inputData.length + 1,
        type: "text",
        content: "",
        height: 40,
      },
    ]);
  };

  const handleAddFoto = async () => {
    const generateId = uuid.v4().toString();

    // Ask for permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setInputData((prev) => [
        ...prev,
        {
          id: generateId,
          idx: inputData.length + 1,
          type: "foto",
          content: result.assets[0].uri,
          height: result.assets[0].height,
        },
      ]);
    }
  };

  const handleAddSave = () => {
    alert("Save");
  };

  const handleCancel = () => {
    alert("Cancel");
  };

  return (
    <View style={{ height: "100%" }}>
      <AnimatedList handleRemoveId={handleRemoveId}></AnimatedList>

      {/* ButtonGroup */}

      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <Pressable
            style={styles.button}
            onPress={handleAddText}
            aria-label="Add Text"
          >
            <Text style={styles.buttonText}>Text</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            // onLongPress={handleLongPressStart}
            // onPressOut={handleReleaseStop}
            aria-label="Add Audio"
          >
            <Text style={styles.buttonText}>Audio</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleAddFoto}
            aria-label="Add Photo"
          >
            <Text style={styles.buttonText}>Foto</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleAddSave}
            aria-label="Save"
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleCancel}
            aria-label="Cancel"
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>

      {/*  */}
    </View>
  );
};

export default LdeEditor;
