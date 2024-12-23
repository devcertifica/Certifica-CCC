import { TComponentData } from "@/constants/ui-props-types";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useState } from "react";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import uuid from "react-native-uuid";

export type TabData = {
  observation: TComponentData[];
  action: TComponentData[];
  deadline: TComponentData[];
  responsible: TComponentData[];
};

// Define the props for the ActiveFieldContext
type FoeEditorContextProps = {
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  tabData: TabData;
  setTabData: React.Dispatch<React.SetStateAction<TabData>>;
  activeTabName: keyof TabData;
  setActiveTabName: React.Dispatch<React.SetStateAction<keyof TabData>>;
  updateTextData: (id: string, content: string, height: number) => void;
  addInputData: (newItem: TComponentData) => void;
  deleteInputDataById: (id: string) => void;
  handleAddText: () => void;
  handleAddFotoFromGallery: () => Promise<void>;
  handleAddFotoFromCamera: () => Promise<void>;
  handleLongPressStart: () => Promise<void>;
  handleReleaseStop: () => Promise<void>;
  isRecording: boolean;
  recordingDuration: number;
  sheetVisible: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  animatedStyle: any;
  animatedBackdropStyle: any;
};

export const HEIGHT = 125;
export const OVERDRAG = 20;
export const BACKDROP_COLOR = "rgba(0, 0, 0, 0.3)";

// Create context
export const FoeEditorContext = React.createContext<
  FoeEditorContextProps | undefined
>(undefined);

// Context provider to manage all editor-related state and logic
export const FoeEditorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State for active field
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTabName, setActiveTabName] =
    useState<keyof TabData>("observation");
  const [tabData, setTabData] = useState<TabData>({
    observation: [],
    action: [],
    deadline: [],
    responsible: [],
  });

  // State for audio recording
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Bottom sheet visibility state
  const [sheetVisible, setSheetVisible] = useState<boolean>(false);

  // Function to update text data in the input field
  const updateTextData = (id: string, content: string, height: number) => {
    setTabData((prevData) => ({
      ...prevData,
      [activeTabName]: prevData[activeTabName].map((item) =>
        item.id === id && item.type === "text"
          ? { ...item, content, height }
          : item
      ),
    }));
  };

  // Function to add new data to inputData
  const addInputData = (newItem: TComponentData) => {
    setTabData((prevData) => ({
      ...prevData,
      [activeTabName]: [...prevData[activeTabName], newItem],
    }));
  };

  const deleteInputDataById = (id: string) => {
    setTabData((prevData) => ({
      ...prevData,
      [activeTabName]: prevData[activeTabName].filter((item) => item.id !== id),
    }));
  };

  // Handle adding a text component
  const handleAddText = () => {
    const generateId = uuid.v4().toString();
    setActiveId(generateId);
    addInputData({
      id: generateId,
      idx: tabData[activeTabName].length + 1,
      type: "text",
      content: "",
      height: 40,
    });
  };

  // Function to handle adding a photo from the gallery
  const handleAddFotoFromGallery = async () => {
    const generateId = uuid.v4().toString();
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    closeSheet();

    if (!result.canceled) {
      addInputData({
        id: generateId,
        idx: tabData[activeTabName].length + 1,
        type: "foto",
        content: result.assets[0].uri,
        height: result.assets[0].height,
      });
    }
  };

  // Function to handle adding a photo from the camera
  const handleAddFotoFromCamera = async () => {
    const generateId = uuid.v4().toString();
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    closeSheet();

    if (!result.canceled) {
      addInputData({
        id: generateId,
        idx: tabData[activeTabName].length + 1,
        type: "foto",
        content: result.assets[0].uri,
        height: result.assets[0].height,
      });
    }
  };

  // Request permissions for audio recording
  const requestPermissions = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access microphone is required!");
      return false;
    }
    return true;
  };

  // Start recording audio
  const handleLongPressStart = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      // Set audio mode to allow recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync({
        android: {
          extension: ".m4a",
          outputFormat: 2, // MPEG_4 format
          audioEncoder: 3, // AAC encoder
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".m4a",
          audioQuality: 127, // High-quality audio
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: "audio/webm", // Set mimeType for web platform
          bitsPerSecond: 128000,
        },
      });
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);

      const id = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    } catch (err) {
      console.log("Error starting recording: ", err);
    }
  };

  // Stop recording audio
  const handleReleaseStop = async () => {
    setIsRecording(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const generateId = uuid.v4().toString();
      setActiveId(generateId);
      addInputData({
        id: generateId,
        idx: tabData[activeTabName].length + 1,
        type: "audio",
        content: uri || "",
        duration: recordingDuration,
        height: 100,
      });
    }
    setRecordingDuration(0);
  };

  const openSheet = () => {
    setSheetVisible(true);
    backdropOpacity.value = withTiming(1, { duration: 150 });
    translateY.value = withTiming(0, { duration: 200 });
  };

  const closeSheet = () => {
    setSheetVisible(false);
    translateY.value = withTiming(HEIGHT, { duration: 200 }, () => {
      backdropOpacity.value = withTiming(0, { duration: 150 });
      runOnJS(setSheetVisible)(false);
    });
  };

  const translateY = useSharedValue(HEIGHT);
  const backdropOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value,
    };
  });

  // Provide all state and functions via context
  return (
    <FoeEditorContext.Provider
      value={{
        activeId,
        setActiveId,
        tabData,
        setTabData,
        updateTextData,
        activeTabName,
        setActiveTabName,
        addInputData,
        deleteInputDataById,
        handleAddText,
        handleAddFotoFromGallery,
        handleAddFotoFromCamera,
        handleLongPressStart,
        handleReleaseStop,
        isRecording,
        recordingDuration,
        sheetVisible,
        openSheet,
        closeSheet,
        animatedStyle,
        animatedBackdropStyle,
      }}
    >
      {children}
    </FoeEditorContext.Provider>
  );
};

// Custom hook to access the context
export const useFoeEditor = () => {
  const context = useContext(FoeEditorContext);
  if (!context) {
    throw new Error("useFoeEditor must be used within an FoeEditorProvider");
  }
  return context;
};
