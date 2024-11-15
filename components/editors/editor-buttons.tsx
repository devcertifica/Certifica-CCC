// import React from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";

// type TEditorButton = {
//   onPress?: () => void;
//   title: string;
//   secondary?: boolean;
// };

// const editorButtonStyle = StyleSheet.create({
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: "black",
//   },

//   secondary: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,

//     borderWidth: 1,
//     borderColor: "black",
//     backgroundColor: "transparent",
//   },
// text: {
//   fontSize: 14,
//   lineHeight: 18,
//   fontWeight: "bold",
//   letterSpacing: 0.25,
//   color: "white",
// },

// textSecondary: {
//   fontSize: 14,
//   lineHeight: 18,
//   fontWeight: "bold",
//   letterSpacing: 0.25,
//   color: "black",
// },
// });

// const EditorButton = (props: TEditorButton) => {
//   const { onPress, title = "Save", secondary = false } = props;
//   return (
//     <Pressable
//       style={secondary ? editorButtonStyle.secondary : editorButtonStyle.button}
//       onPress={onPress}
//     >
//       <Text
//         style={
//           secondary ? editorButtonStyle.textSecondary : editorButtonStyle.text
//         }
//       >
//         {title}
//       </Text>
//     </Pressable>
//   );
// };

// export default EditorButton;

import { ThemeColors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
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
    paddingVertical: 4,
    borderTopWidth: 1,
    borderColor: ThemeColors.paleBlack,
  },

  secondary: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderColor: ThemeColors.paleBlack,
    backgroundColor: ThemeColors.offWhite,
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
