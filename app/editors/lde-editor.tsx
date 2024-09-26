import AnimatedList from "@/components/AnimatedList";
import { AddText } from "@/components/InsertComponents";
import { TComponentData } from "@/constants/types";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import uuid from "react-native-uuid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // or 'center' based on desired layout
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
    elevation: 2, // Shadow effect for Android
    shadowColor: "#000", // Shadow effect for iOS
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
  const [inputData, setInputData] = useState<TComponentData[]>([]);

  const handleTextRemove = (id: string) => {
    setInputData(
      inputData.filter((el) => {
        return el.id !== id;
      })
    );
  };

  const handleAddText = () => {
    setInputData((prev) => [
      ...prev,
      {
        id: uuid.v4().toString(),
        type: "text",
        content: "",
      },
    ]);
  };

  const handleAddFoto = () => {
    setInputData((prev) => [
      ...prev,
      {
        id: uuid.v4().toString(),
        type: "foto",
        content: "",
      },
    ]);
  };

  const handleAddAudio = () => {
    setInputData((prev) => [
      ...prev,
      {
        id: uuid.v4().toString(),
        type: "audio",
        content: "",
      },
    ]);
  };

  const handleAddSave = () => {
    alert("Save");
  };

  const handleCancel = () => {
    alert("Cancel");
  };

  return (
    <View style={{ height: "100%" }}>
      <AnimatedList
        inputData={inputData}
        handleTextRemove={handleTextRemove}
      ></AnimatedList>

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
            onPress={handleAddAudio}
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
