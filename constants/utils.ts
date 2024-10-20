import { Platform } from "react-native";

export const forIOS = (ios: any, rest: any) => {
  return Platform.OS === "ios" ? ios : rest;
};

export const formatSeconds = (seconds: number) => {
  const MM = Math.floor(seconds / 60);
  const SS = Math.floor(seconds % 60);
  return [MM, SS].map((num) => num.toString().padStart(2, "0")).join(":");
};

export const slugify = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-"); // Replace spaces with hyphens and convert to lowercase
};

export const deslugify = (slug: string) => {
  // Convert hyphenated slug back to original format with spaces and capitalized words
  return slug
    .split("-") // Split by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join back with spaces
};
