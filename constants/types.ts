import { SharedValue } from "react-native-reanimated";

export type TItem = {
  id: number;
  type: "text" | "foto" | "audio";
  content: string; // Url for Image or Audio, Description for text
};

export type TListItem = {
  item: TItem;
  isDragging: SharedValue<number>;
  draggedItemId: SharedValue<NullableNumber>;
  currentSongPositions: SharedValue<TSongPositions>;
};

export type TSongPositions = {
  [key: number]: {
    updatedIndex: number;
    updatedTop: number;
  };
};

export type NullableNumber = null | number;

export type TComponentData = {
  id: string;
  type: "text" | "audio" | "foto";
  content: string;
};
