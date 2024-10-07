import { useActiveField } from "@/context/lde-editor-context";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  UIManager,
  View,
} from "react-native";
import { TAddComponent } from "../../constants/types";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const textInputStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginVertical: 5,
    flexGrow: 1,
  },

  input: {},

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

  inputWrapper: {
    position: "relative",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
  },
});

/* 

<View style={{ 
  flex: 1, 
  justifyContent: 'center', 
  alignItems: 'center' 
}}>
  <View style={{
    height: 100, 
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'black',
    marginHorizontal: 30,

    justifyContent: 'center',
  }}>
    <TextInput
      style={{

      }}
    />
  </View>
</View>

*/

export const AddText = ({ id, handleRemoveId }: TAddComponent) => {
  const minHeight = Platform.OS === "ios" ? 20 : 40;

  const [height, setHeight] = useState<number>(minHeight);
  const [content, setContent] = useState<string>("");
  const { activeId, setActiveId, inputData, setInputData } = useActiveField();

  const inputRef = useRef<TextInput>(null);

  const handleEdit = () => {
    setActiveId(id);
  };

  const handleOnFocus = () => {
    setActiveId(id);
  };

  const handleSave = () => {
    setActiveId(null);
  };

  const handleOnBlur = () => {
    console.log("OnBlur is trigger");
    if (content.trim() === "") {
      handleRemoveId(id);
    } else {
      setActiveId(null);
    }
  };

  useEffect(() => {
    console.log("Refresh on height changes");
  }, [height]);

  const handleTextChange = (newText: string) => {
    setContent(newText);
    // setInputData((prevInputData) =>
    //   prevInputData.map((item) =>
    //     item.id === id ? { ...item, content: newText } : item
    //   )
    // );
  };

  return (
    <View style={[textInputStyles.container]}>
      <View style={textInputStyles.inputWrapper}>
        <TextInput
          autoCorrect={false}
          onBlur={handleOnBlur}
          ref={inputRef}
          autoFocus={activeId === id}
          style={[
            textInputStyles.input,
            { height: Math.max(minHeight, height) },
          ]}
          onFocus={handleOnFocus}
          multiline={true}
          editable={activeId === id}
          scrollEnabled={true}
          onContentSizeChange={(event) => {
            const newHeight =
              Platform.OS === "ios"
                ? event.nativeEvent.contentSize.height + 19
                : event.nativeEvent.contentSize.height;

            if (newHeight !== height) {
              setHeight(newHeight);
            }
          }}
          placeholder="Type here..."
          placeholderTextColor={"gray"}
          value={content}
          onChangeText={handleTextChange}
        />

        <View style={textInputStyles.buttonContainer}>
          {activeId === id ? (
            <Pressable onPress={handleSave}>
              <MaterialIcons name="done" size={20} color="green" />
            </Pressable>
          ) : (
            <Pressable onPress={handleEdit}>
              <Feather name="edit-3" size={20} color="black" />
            </Pressable>
          )}

          <View style={textInputStyles.spacer} />
          <Pressable onPress={() => handleRemoveId(id)}>
            <MaterialIcons name="delete-outline" size={20} color="red" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
