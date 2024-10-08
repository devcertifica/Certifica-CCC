import { Platform } from "react-native";

export const forIOS = (ios: any, rest: any) => {
  return Platform.OS === "ios" ? ios : rest;
};

export const formatSeconds = (seconds: number) => {
  const MM = Math.floor(seconds / 60);
  const SS = Math.floor(seconds % 60);
  return [MM, SS].map((num) => num.toString().padStart(2, "0")).join(":");
};
