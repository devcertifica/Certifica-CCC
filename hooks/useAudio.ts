import {
  Audio,
  AVPlaybackStatus,
  AVPlaybackStatusError,
  AVPlaybackStatusSuccess,
} from "expo-av";
import { useCallback, useEffect, useState } from "react";

type UseAudioProps = {
  uri: string | { uri: string }; // URI can be a string or an object with a uri field
  shouldPlay?: boolean;
  onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void;
  updateIntervals?: number;
  startPosition?: number;
  shouldLoop?: boolean;
};

type StatusType =
  | "isLoading"
  | "isBuffering"
  | "isPlaying"
  | "finished"
  | "error"
  | "isLooping"; // 'finished' instead of 'didJustFinish'

const msToSeconds = (num: number) => Math.round(num / 1000);

// Remove 'didJustFinish' from this array
const STATUSES = ["isBuffering", "isPlaying", "isLooping"] as const;

// Map playback status to StatusType
const getStatus = (playbackEvent: AVPlaybackStatusSuccess): StatusType => {
  if (playbackEvent.didJustFinish) return "finished"; // Explicitly handle 'didJustFinish'
  const status = STATUSES.find((status) => playbackEvent[status] === true);
  return status ?? "isLoading"; // Default to 'isLoading' if no other status matches
};

export default function useAudio({
  uri,
  shouldPlay = false,
  onPlaybackStatusUpdate,
  updateIntervals = 1000,
  startPosition = 0,
  shouldLoop = false,
}: UseAudioProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [position, setPosition] = useState<number>(0);
  const [status, setStatus] = useState<StatusType>("isLoading");
  const [duration, setDuration] = useState<number>(0);

  // Handle playback status updates
  const handlePlaybackStatusChange = useCallback(
    (playbackEvent: AVPlaybackStatus) => {
      if (playbackEvent.isLoaded) {
        setStatus(getStatus(playbackEvent as AVPlaybackStatusSuccess)); // Use getStatus to derive playback status

        setPosition(msToSeconds(playbackEvent.positionMillis));

        if (playbackEvent.durationMillis) {
          setDuration(msToSeconds(playbackEvent.durationMillis));
        }

        if (onPlaybackStatusUpdate) {
          onPlaybackStatusUpdate(playbackEvent);
        }
      } else if ("error" in playbackEvent) {
        const errorEvent = playbackEvent as AVPlaybackStatusError;
        console.log(`Error: ${errorEvent.error}`);
        setStatus("error");
      }
    },
    [onPlaybackStatusUpdate]
  );

  // Unload sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Load sound on initial load or uri change
  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound, status } = await Audio.Sound.createAsync(
          typeof uri === "string" ? { uri } : uri,
          {
            shouldPlay,
            progressUpdateIntervalMillis: updateIntervals, // Update progress every second
            positionMillis: startPosition,
            isLooping: shouldLoop,
            volume: 1,
          },
          handlePlaybackStatusChange
        );
        setSound(sound);
        if (status.isLoaded) {
          setDuration(msToSeconds(status.durationMillis || 0));
        }
      } catch (err) {
        console.log("Error loading sound:", err);
        setStatus("error");
      }
    };

    if (uri) {
      loadSound();
    }
  }, [
    uri,
    handlePlaybackStatusChange,
    shouldLoop,
    shouldPlay,
    startPosition,
    updateIntervals,
  ]);

  // Set up an interval to update the position manually every second
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (sound && status === "isPlaying") {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && !status.isBuffering) {
          setPosition(msToSeconds(status.positionMillis || 0));
        }
      }, 1000); // Update every second
    }

    // Clear interval when the component unmounts or when playback stops
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sound, status]);

  return { position, status, duration, sound };
}
