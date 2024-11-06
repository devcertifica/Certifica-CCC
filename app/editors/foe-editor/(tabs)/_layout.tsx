import FoeEditorBottomSheet from "@/components/FoeEditorComponents/FoeEditorBottomSheet";
import FoeEditorButtonGroup from "@/components/FoeEditorComponents/FoeEditorButtonGroup";
import { FoeEditorProvider, useFoeEditor } from "@/context/foe-editor-context";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import {
  ParamListBase,
  TabNavigationState,
  useNavigationState,
} from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import React, { useEffect } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  const { setActiveTabName } = useFoeEditor();
  return (
    <View style={styles.container}>
      <MaterialTopTabs
        screenOptions={{
          tabBarAndroidRipple: { color: "#00000020" },
          swipeEnabled: Platform.OS === "web" ? false : true,
          animationEnabled: false,
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: 120,
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            textTransform: "capitalize",
          },
          tabBarIndicatorStyle: { backgroundColor: "black" },
        }}
      >
        <MaterialTopTabs.Screen
          name="index"
          options={{ title: "Observation" }}
          listeners={{
            tabPress: (e) => {
              setActiveTabName("observation");
            },
          }}
        />
        <MaterialTopTabs.Screen
          name="Action"
          options={{ title: "Action" }}
          listeners={{
            tabPress: (e) => {
              setActiveTabName("action");
            },
          }}
        />
        <MaterialTopTabs.Screen
          name="Deadline"
          options={{ title: "Deadline" }}
          listeners={{
            tabPress: (e) => {
              setActiveTabName("deadline");
            },
          }}
        />
        <MaterialTopTabs.Screen
          name="Responsible"
          options={{ title: "Responsible" }}
          listeners={{
            tabPress: (e) => {
              setActiveTabName("responsible");
            },
          }}
        />
      </MaterialTopTabs>

      <FoeEditorButtonGroup />
      <FoeEditorBottomSheet />
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomPanel: {
    height: 75,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  panelText: {
    fontSize: 16,
    color: "black",
  },
  button: {
    borderRadius: 5,
    width: "auto",
    height: 40,
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    paddingVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
