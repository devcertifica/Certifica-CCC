import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "./ListItem";

const textInputStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    marginTop: 10,
    // outlineStyle: "none",
  },
  input: {
    borderWidth: 0,
    padding: 10,
    fontSize: 16,
    // outlineStyle: "none",
  },
});

export const AddComponent = () => {
  return (
    <View>
      <Text>Add Component</Text>
    </View>
  );
};

export const AddText = () => {
  const [text, setText] = useState<string>("");
  const [height, setHeight] = useState(40);

  return (
    <View style={textInputStyles.container}>
      <TextInput
        style={[textInputStyles.input, { height }]}
        multiline={true}
        onContentSizeChange={(event) => {
          setHeight(event.nativeEvent.contentSize.height);
        }}
        placeholder="Type here..."
      />
    </View>
  );
};

export const AddAudio = () => {
  return (
    <View>
      <Text>Audio</Text>
    </View>
  );
};

export const AddFoto = () => {
  return (
    <View>
      <Text>Foto</Text>
    </View>
  );
};
