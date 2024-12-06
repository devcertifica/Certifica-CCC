import { TabData, useFoeEditor } from "@/context/foe-editor-context";
import { useLdeEditor } from "@/context/lde-editor-context";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useRef } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  UIManager,
  View,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const AddText = ({
  id,
  activeTabName,
}: {
  id: string;
  activeTabName: keyof TabData | "lde";
}) => {
  const {
    tabData,
    activeId: foeActiveId,
    setActiveId: setFoeActiveId,
    updateTextData: updateFoeTextData,
    deleteInputDataById: deleteFoeDataById,
  } = useFoeEditor();

  const {
    inputData,
    activeId: ldeActiveId,
    setActiveId: setLdeActiveId,
    updateTextData: updateLdeTextData,
    deleteInputDataById: deleteLdeDataById,
  } = useLdeEditor();

  // Select the appropriate data and functions based on `activeTabName`
  const isLde = activeTabName === "lde";
  const dataSource = isLde ? inputData : tabData[activeTabName];
  const activeId = isLde ? ldeActiveId : foeActiveId;
  const setActiveId = isLde ? setLdeActiveId : setFoeActiveId;
  const updateTextData = isLde ? updateLdeTextData : updateFoeTextData;
  const deleteInputDataById = isLde ? deleteLdeDataById : deleteFoeDataById;

  // Find the data item based on `id`
  const { content, height = 40 } = dataSource.find(
    (item) => item.id === id
  ) || {
    content: "",
    height: 40,
  };

  const inputRef = useRef<TextInput>(null);

  const handleEdit = () => {
    setActiveId(id);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleOnFocus = () => {
    setActiveId(id);
  };

  const handleSave = () => {
    setActiveId(null);
  };

  const handleOnBlur = () => {
    if (content.trim() === "") {
      deleteInputDataById(id);
    } else {
      setActiveId(null);
    }
  };

  const handleTextChange = (newText: string) => {
    updateTextData(id, newText, height);
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
            { minHeight: Math.max(40, height) },
            { color: "black" },
          ]}
          onFocus={handleOnFocus}
          multiline={true}
          editable={activeId === id}
          scrollEnabled={false}
          placeholder="Type here..."
          placeholderTextColor={"gray"}
          value={content}
          onChangeText={handleTextChange}
        />

        <View style={textInputStyles.buttonContainer}>
          {activeId === id ? (
            <Pressable onPress={handleSave} style={textInputStyles.floatingBtn}>
              <MaterialIcons name="done" size={20} color="green" />
            </Pressable>
          ) : (
            <Pressable onPress={handleEdit} style={textInputStyles.floatingBtn}>
              <Feather name="edit-2" size={16} color="black" />
            </Pressable>
          )}

          <Pressable
            onPress={() => deleteInputDataById(id)}
            style={textInputStyles.floatingBtn}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={20}
              color="black"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const textInputStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 5,
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  buttonContainer: {
    position: "absolute",
    right: 15,
    top: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    maxHeight: 40,
  },

  spacer: {
    width: 20,
  },

  input: {
    paddingVertical: 10,
  },

  inputWrapper: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#00000020",
    borderRadius: 8,
  },

  floatingBtn: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
