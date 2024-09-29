import { TComponentData } from "@/constants/types";
import { useActiveField } from "@/context/lde-editor-context";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const textInputStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginVertical: 5,
    flexGrow: 1,
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
    top: 10,
    right: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 20,
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

  const handleEdit = () => {
    setActiveId(id);
    inputRef.current?.focus();
  };

  const handleOnFocus = () => {
    setActiveId(id);
  };

  const handleSave = () => {
    // TODO: api call if necessary
    setActiveId(null);
  };

  // TODO: automatic deletion on empty text block
  const handleOnBlur = () => {
    console.log("OnBlur called => ", text);
    if (text.trim() === "") {
      handleTextRemove(id);

      // Confirm user to keep editing or delete the empty text
      /*  browser not supported  
   Alert.alert(
        "Empty Text",
        "This input will be deleted. Are you sure you want to delete it?",
        [
          {
            text: "Cancel",
            onPress: () => inputRef.current?.focus(), // Keep the focus on cancel
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => handleTextRemove(id), // Remove the text if confirmed
          },
        ],
        { cancelable: false }
      ); */
    } else {
      setActiveId(null); // Clear the active ID if text is not empty
    }
  };

  return (
    <View style={[textInputStyles.container]}>
      {/* <Text>{id}</Text> */}
      <View style={{ position: "relative" }}>
        <TextInput
          onBlur={() => {
            setActiveId(null);
            console.log("height => ", height);
          }}
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
          placeholderTextColor={"gray"}
          value={text}
          onChangeText={setText}
        />

        <View style={textInputStyles.buttonContainer}>
          {activeId === id ? (
            <Pressable onPress={handleEdit}>
              <MaterialIcons name="done" size={20} color="green" />
            </Pressable>
          ) : (
            <Pressable onPress={handleEdit}>
              <Feather name="edit-3" size={20} color="black" />
            </Pressable>
          )}

          <View style={textInputStyles.spacer} />
          <Pressable onPress={() => handleTextRemove(id)}>
            <MaterialIcons name="delete-outline" size={20} color="red" />
          </Pressable>
        </View>
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
