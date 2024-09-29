import { SharedValue } from "react-native-reanimated";

export type TItem = {
  id: number;
  type: "text" | "foto" | "audio";
  content: string; // Url for Image or Audio, Description for text
};

export type TListItem = {
  item: TComponentData;
  isDragging: SharedValue<number>;
  draggedItemId: SharedValue<NullableNumber>;
  currentInputPositions: SharedValue<TInputPosition>;
  children: React.ReactNode;
};

export type TInputPosition = {
  [key: number]: {
    updatedIndex: number;
    updatedTop: number;
  };
};

export type NullableNumber = null | number;

export type TComponentData = {
  id: string;
  idx: number;
  type: "text" | "audio" | "foto";
  content: string;
};
