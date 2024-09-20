import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TButtonsGroup = {
  handleAddText: () => void;
  handleAddAudio: () => void;
  handleAddFoto: () => void;
  handleAddSave: () => void;
  handleCancel: () => void;
};

const ButtonsGroup = ({
  handleAddText,
  handleAddAudio,
  handleAddFoto,
  handleAddSave,
  handleCancel,
}: TButtonsGroup) => {
  console.log({
    handleAddText,
    handleAddAudio,
    handleAddFoto,
    handleAddSave,
    handleCancel,
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddText}
          accessibilityLabel="Add Text"
          accessible={true}
        >
          <Text style={styles.buttonText}>Text</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddAudio}
          accessibilityLabel="Add Audio"
          accessible={true}
        >
          <Text style={styles.buttonText}>Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddFoto}
          accessibilityLabel="Add Photo"
          accessible={true}
        >
          <Text style={styles.buttonText}>Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddSave}
          accessibilityLabel="Save"
          accessible={true}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCancel}
          accessibilityLabel="Cancel"
          accessible={true}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtonsGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // or 'center' based on desired layout
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
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
