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

export type TBaseComponentData = {
  id: string;
  idx: number;
  content: string;
  height: number | undefined;
};

export type TTextData = TBaseComponentData & {
  type: "text";
};

export type TFotoData = TBaseComponentData & {
  type: "foto";
};

export type TAudioData = TBaseComponentData & {
  type: "audio";
  duration: number; // This field is only present when the type is audio
};

export type TComponentData = TTextData | TFotoData | TAudioData;
