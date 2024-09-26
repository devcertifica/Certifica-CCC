import Feather from "@expo/vector-icons/Feather";
import React, { useRef, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const textInputStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    position: "relative",
  },
  editButton: {
    position: "absolute",
    top: 20,
    right: 25,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    overflow: "hidden",
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  spacer: {
    width: 15,
  },
});

export type TAddText = {
  id: string;
  handleTextRemove: (id: string) => void;
};

export const AddText = ({ id, handleTextRemove }: TAddText) => {
  const [text, setText] = useState<string>("");
  const [height, setHeight] = useState(40);
  const [isEditing, setIsEditing] = useState(true);

  const inputRef = useRef<TextInput>(null);

  const handleSave = () => {
    if (text.trim() === "") {
      handleTextRemove(id);
    }
    setIsEditing(false);
  };
  const handleEdit = () => {
    setIsEditing(true);
    inputRef.current?.focus();
  };

  return (
    <View style={textInputStyles.container}>
      <TextInput
        ref={inputRef}
        autoFocus={true}
        style={[
          textInputStyles.input,
          { height },
          !isEditing && { pointerEvents: "none" },
        ]}
        multiline={true}
        readOnly={!isEditing}
        scrollEnabled={false}
        onContentSizeChange={(event) => {
          const newHeight = event.nativeEvent.contentSize.height;
          if (newHeight !== height) {
            setHeight(newHeight);
          }
        }}
        placeholder="Type here..."
        value={text}
        onChangeText={setText}
      />
      {isEditing ? (
        <View style={textInputStyles.buttonContainer}>
          <Button
            color="red"
            title="Remove"
            onPress={() => handleTextRemove(id)}
          />
          <View style={textInputStyles.spacer} />
          <Button title="Save" onPress={handleSave} />
        </View>
      ) : (
        <Pressable style={textInputStyles.editButton} onPress={handleEdit}>
          <Feather name="edit-3" size={20} color="black" />
        </Pressable>
      )}
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
