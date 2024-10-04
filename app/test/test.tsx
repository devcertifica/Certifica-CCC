import useAudio from "@/hooks/useAudio"; // Import your custom hook
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import * as Progress from "react-native-progress";

const formatSeconds = (seconds: number) => {
  const MM = Math.floor(seconds / 60);
  const SS = Math.floor(seconds % 60);
  return [MM, SS].map((num) => num.toString().padStart(2, "0")).join(":");
};

const VoiceMessageRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [soundURI, setSoundURI] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0); // State to track recording duration
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Interval ID to clear timer

  // Handle playback using the useAudio hook
  const { position, status, duration, sound } = useAudio({
    uri: soundURI ? soundURI : "",
    shouldPlay: false, // Manually control play state
    shouldLoop: false,
    updateIntervals: 1000,
    startPosition: 0,
  });

  // Request microphone permission
  const requestPermissions = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access microphone is required!");
      return false;
    }
    setPermissionGranted(true);
    return true;
  };

  // Start recording and timer
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

  // Stop recording and clear timer
  const handleReleaseStop = async () => {
    console.log("Stopping recording...");
    setIsRecording(false);
    if (intervalId) {
      clearInterval(intervalId); // Clear the timer
      setIntervalId(null); // Reset interval ID
    }
    setRecordingDuration(0); // Reset the recording duration

    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log("Recording saved at:", uri);
        setSoundURI(uri); // Use the recorded URI for playback
      }
    } catch (error) {
      console.log("Error stopping recording:", error);
    }
  };

  const handlePlayback = async () => {
    if (sound) {
      try {
        await sound.playAsync();
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
  };

  const handleStopPlayback = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
    }
  };

  const { width } = useWindowDimensions();
  const barWidth = width * 0.8;

  return (
    <View style={styles.container}>
      {/* Recording UI */}
      <Text>
        {isRecording
          ? `Recording... ${formatSeconds(recordingDuration)}`
          : "Hold to record"}
      </Text>
      <Pressable
        style={styles.recordButton}
        onLongPress={handleLongPressStart} // Start recording on long press
        onPressOut={handleReleaseStop} // Stop recording on release
      >
        <Text style={styles.buttonText}>🎙️ Hold to Record</Text>
      </Pressable>

      {/* Playback UI */}
      {soundURI && (
        <View>
          <Text>
            Playback: {position}s / {duration}s
          </Text>
          <Pressable style={styles.playButton} onPress={handlePlayback}>
            <Text style={styles.buttonText}>▶️ Play Recording</Text>
          </Pressable>
          <View style={[styles.player, { width: barWidth }]}>
            <Text>Sound status:{status}</Text>
            <Progress.Bar
              progress={position / duration || 0}
              width={barWidth}
              color="green"
            />
            <View style={styles.timeContainer}>
              <Text>{formatSeconds(position)}</Text>
              <Text>{formatSeconds(duration)}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  player: {
    alignItems: "center",
    alignSelf: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 5,
  },
  recordButton: {
    backgroundColor: "#ECECEC",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  playButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    elevation: 5,
    marginTop: 20,
  },
  stopButton: {
    backgroundColor: "#F44336",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default VoiceMessageRecorder;
