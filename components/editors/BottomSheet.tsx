// This is the bottom sheet component for either camera or gallery in image choosing
// src/components/BottomSheet.tsx
import { BACKDROP_COLOR, HEIGHT, OVERDRAG } from "@/constants/constants";
import { useActiveField } from "@/context/lde-editor-context";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const BottomSheet = () => {
  const {
    sheetVisible,
    closeSheet,
    handleAddFotoFromCamera,
    handleAddFotoFromGallery,
    animatedBackdropStyle,
    animatedStyle,
  } = useActiveField();

  if (!sheetVisible) return null;

  return (
    <>
      <Pressable style={styles.backdrop} onPress={closeSheet}>
        <Animated.View style={[styles.backdrop, animatedBackdropStyle]} />
      </Pressable>
      <Animated.View style={[styles.sheetVisible, animatedStyle]}>
        <Pressable
          onPress={() => handleAddFotoFromCamera()}
          style={styles.sheetButton}
        >
          <Text>Camera</Text>
        </Pressable>
        <Pressable
          onPress={() => handleAddFotoFromGallery()}
          style={styles.sheetButton}
        >
          <Text>Gallery</Text>
        </Pressable>
        <View style={{ height: 75 }}></View>
      </Animated.View>
    </>
  );
};

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

export default BottomSheet;
