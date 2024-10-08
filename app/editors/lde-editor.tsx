import AnimatedList from "@/components/AnimatedList";
import { formatSeconds } from "@/constants/utils";
import { useActiveField } from "@/context/lde-editor-context";
import useAudio from "@/hooks/useAudio";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

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

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [soundURI, setSoundURI] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number>(0); // State to track recording duration
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Interval ID to clear timer

  const { position, status, duration, sound } = useAudio({
    uri: soundURI ? soundURI : "",
    shouldPlay: false, // Manually control play state
    shouldLoop: false,
    updateIntervals: 1000,
    startPosition: 0,
  });

  const removeById = (id: string) => {
    setInputData(
      inputData.filter((el) => {
        return el.id !== id;
      })
    );
  };

  const handleAddText = () => {
    const generateId = uuid.v4().toString();
    setActiveId(generateId);
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

  const requestPermissions = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access microphone is required!");
      return false;
    }
    setPermissionGranted(true);
    // Set the audio mode to enable recording on iOS
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true, // Allow recording in silent mode
        staysActiveInBackground: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.log("Error setting audio mode:", error);
      return false;
    }
    return true;
  };

  const handleLongPressStart = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      console.log("Starting recording...");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync({
        android: {
          extension: ".m4a",
          outputFormat: 2, // MPEG_4 format
          audioEncoder: 3, // AAC encoder
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".m4a",
          audioQuality: 127, // High-quality audio
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: "audio/webm", // Set mimeType for web platform
          bitsPerSecond: 128000,
        },
      });
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);

      // Start the timer to update recording duration every second
      const id = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    } catch (err) {
      console.log("Error starting recording: ", err);
    }
  };

  const handleReleaseStop = async () => {
    console.log("Stopping recording...");
    setIsRecording(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log("Recording saved at:", uri);
        setSoundURI(uri);

        // Store the audio in inputData
        const generateId = uuid.v4().toString();
        setActiveId(generateId);
        setInputData((prev) => [
          ...prev,
          {
            id: generateId,
            idx: inputData.length + 1,
            type: "audio",
            content: uri || "",
            duration: recordingDuration,
            height: 100,
          },
        ]);
      }
    } catch (error) {
      console.log("Error stopping recording:", error);
    }

    setRecordingDuration(0); // Reset the recording duration after saving
  };

  return (
    <View style={{ height: "100%" }}>
      <AnimatedList removeById={removeById}></AnimatedList>

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
            onPress={handleAddFoto}
            aria-label="Add Photo"
          >
            <Text style={styles.buttonText}>Foto</Text>
          </Pressable>

          {/*  */}

          {
            <Pressable
              style={styles.button}
              onLongPress={handleLongPressStart}
              onPressOut={handleReleaseStop}
              aria-label="Add Audio"
            >
              <Text style={styles.buttonText}>
                {isRecording
                  ? `Recording... ${formatSeconds(recordingDuration)}`
                  : "Hold To Record"}
              </Text>
            </Pressable>
          }

          {/*  */}

          <Pressable
            style={styles.button}
            onPress={handleAddSave}
            aria-label="Save"
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          {/* <Pressable 
            style={styles.button}
            onPress={handleCancel}
            aria-label="Cancel"
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable> */}
        </View>
      </View>

      {/*  */}
    </View>
  );
};

export default LdeEditor;
