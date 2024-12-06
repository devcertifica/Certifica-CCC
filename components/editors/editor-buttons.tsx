import { ThemeColors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TEditorButton = {
  onPress?: () => void;
  title: string;
  secondary?: boolean;
};

const editorButtonStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 8,
    borderTopWidth: 2,
    borderColor: ThemeColors.black10,
    borderRightWidth: 2,
  },

  secondary: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 8,
    borderTopWidth: 2,
    borderColor: ThemeColors.black10,
    // backgroundColor: ThemeColors.offWhite,
    borderRightWidth: 0,
    borderBottomEndRadius: 4, // to remove the overflowing angle
  },

  text: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: ThemeColors.black,
  },

  textSecondary: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: ThemeColors.bgBlack,
  },
});

const EditorButton = (props: TEditorButton) => {
  const { onPress, title = "Save", secondary = false } = props;
  return (
    <Pressable
      style={[
        editorButtonStyle.button,
        secondary && editorButtonStyle.secondary,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          editorButtonStyle.text,
          secondary && editorButtonStyle.textSecondary,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default EditorButton;
