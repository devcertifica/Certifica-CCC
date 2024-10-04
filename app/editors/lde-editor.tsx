import AnimatedList from "@/components/AnimatedList";
import { useActiveField } from "@/context/lde-editor-context";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { launchImageLibrary } from "react-native-image-picker";
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

  const [recording, setRecording] = useState(false);

  const [audioDuration, setAudioDuration] = useState(0);

  const audioRecorderPlayerRef = useRef(new AudioRecorderPlayer()).current;

  const handleLongPressStart = async () => {
    console.log("Long Press Start");
    const path = `${uuid.v4()}.mp3`;
    setRecording(true);

    try {
      const result = await audioRecorderPlayerRef.startRecorder(path);
      console.log("Recording started: ", result);
      audioRecorderPlayerRef.addRecordBackListener((e) => {
        setAudioDuration(Math.floor(e.currentPosition / 1000));
        return;
      });
    } catch (error) {
      console.log("Error starting recording: ", error);
    }
  };

  const handleReleaseStop = async () => {
    console.log("Release Stop");
    const generateId = uuid.v4().toString();
    setRecording(false);
    try {
      const result = await audioRecorderPlayerRef.stopRecorder();
      audioRecorderPlayerRef.removeRecordBackListener();
      console.log("Recording stopped: ", result);

      setInputData((prev) => [
        ...prev,
        {
          id: generateId,
          idx: inputData.length + 1,
          type: "audio",
          content: result,
          height: 50,
          duration: audioDuration,
        },
      ]);
    } catch (error) {
      console.log("Error stopping recording: ", error);
    }
  };

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

  const handleAddFoto = () => {
    const generateId = uuid.v4().toString();

    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 1,
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];

          setInputData((prev) => [
            ...prev,
            {
              id: generateId,
              idx: inputData.length + 1,
              type: "foto",
              content: selectedImage.uri ?? "",
              height: selectedImage.height,
            },
          ]);
        }
      }
    );
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
            onLongPress={handleLongPressStart}
            onPressOut={handleReleaseStop}
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
