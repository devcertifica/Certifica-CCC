// src/components/ButtonGroup.tsx
import { BACKDROP_COLOR, HEIGHT, OVERDRAG } from "@/constants/constants";
import { formatSeconds } from "@/constants/utils";
import { useActiveField } from "@/context/lde-editor-context";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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

  sheetVisible: {
    // backgroundColor: "white",
    padding: 16,
    height: HEIGHT,
    width: "100%",
    position: "absolute",
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  sheetButton: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 60,
    width: "50%",
    marginBottom: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
    zIndex: 1,
  },
});

const ButtonGroup = () => {
  const {
    handleAddText,
    handleAddFotoFromGallery,
    handleLongPressStart,
    handleReleaseStop,
    isRecording,
    recordingDuration,
    openSheet,
  } = useActiveField();

  return (
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
          onPress={openSheet}
          aria-label="Add Photo"
        >
          <Text style={styles.buttonText}>Foto</Text>
        </Pressable>

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

        <Pressable
          style={styles.button}
          onPress={() => {
            alert("Save");
          }}
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
  );
};

export default ButtonGroup;
