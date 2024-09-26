import { TComponentData } from "@/constants/types";
import { useActiveField } from "@/context/lde-editor-context";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
  },

  input: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    overflow: "hidden",
  },
  buttonContainer: {
    position: "absolute",
    top: 9,
    right: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  const { activeId, setActiveId, inputData, setInputData } = useActiveField();

  const [text, setText] = useState<string>("");
  const [height, setHeight] = useState(40);

  const inputRef = useRef<TextInput>(null);

  const handleSave = () => {
    if (text.trim() === "") {
      handleTextRemove(id);
    }

    setActiveId(null);
  };
  const handleEdit = () => {
    setActiveId(id);
    inputRef.current?.focus();
  };

  const handleOnFocus = () => {
    console.log("OnFocus is called");
    setActiveId(id);
  };

  return (
    <View style={textInputStyles.container}>
      <View style={{ position: "relative" }}>
        <TextInput
          ref={inputRef}
          autoFocus={activeId === id}
          style={[textInputStyles.input, { height }]}
          selection={{ start: text.length, end: text.length }}
          onFocus={() => handleOnFocus()}
          multiline={true}
          editable={activeId === id}
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
        {activeId === id ? (
          <View style={textInputStyles.buttonContainer}>
            <Pressable onPress={handleEdit}>
              <Feather name="edit-3" size={20} color="black" />
            </Pressable>
            <View style={textInputStyles.spacer} />
            <Pressable onPress={() => handleTextRemove(id)}>
              <MaterialIcons name="delete-outline" size={20} color="black" />
            </Pressable>
            {/* <Button
              color="red"
              title="Remove"
              onPress={() => handleTextRemove(id)}
            />
            <View style={textInputStyles.spacer} />
            <Button title="Save" onPress={handleSave} /> */}
          </View>
        ) : (
          <Pressable
            style={textInputStyles.buttonContainer}
            onPress={handleEdit}
          >
            <Feather name="edit-3" size={20} color="black" />
          </Pressable>
        )}
      </View>
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
