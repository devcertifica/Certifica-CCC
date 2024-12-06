import { formatSeconds } from "@/constants/utils";
import { useLdeEditor } from "@/context/lde-editor-context";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ButtonGroup = () => {
  const {
    handleAddText,
    handleAddFotoFromGallery,
    handleLongPressStart,
    handleReleaseStop,
    isRecording,
    recordingDuration,
    openSheet,
  } = useLdeEditor();

  return (
    <View style={ButtonGroupStyles.container}>
      <View style={ButtonGroupStyles.buttonGroup}>
        <Pressable
          style={ButtonGroupStyles.button}
          onPress={handleAddText}
          aria-label="Add Text"
        >
          <Text style={ButtonGroupStyles.buttonText}>Text</Text>
        </Pressable>

        <Pressable
          style={ButtonGroupStyles.button}
          onPress={openSheet}
          aria-label="Add Photo"
        >
          <Text style={ButtonGroupStyles.buttonText}>Foto</Text>
        </Pressable>

        {
          <Pressable
            style={ButtonGroupStyles.button}
            onLongPress={handleLongPressStart}
            onPressOut={handleReleaseStop}
            aria-label="Add Audio"
          >
            <Text style={ButtonGroupStyles.buttonText}>
              {isRecording
                ? `Recording... ${formatSeconds(recordingDuration)}`
                : "Hold To Record"}
            </Text>
          </Pressable>
        }

        <Pressable
          style={ButtonGroupStyles.button}
          onPress={() => {
            alert("Save");
          }}
          aria-label="Save"
        >
          <Text style={ButtonGroupStyles.buttonText}>Save</Text>
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

export const ButtonGroupStyles = StyleSheet.create({
  container: {},
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
