import { useRef, useEffect, useCallback } from "react";
import { useAppContext } from "../AppContext";

export const useAudioRecorder = () => {
  const {
    deviceState,
    setDeviceState,
    setRecordingTime,
    setAudioUrl,
    setSimulationMode,
  } = useAppContext();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startTimer = useCallback(() => {
    setRecordingTime(0);
    timerRef.current = window.setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  }, [setRecordingTime]);

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleStartRecording = async () => {
    setAudioUrl(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setDeviceState("recording");
      setSimulationMode(false);
      startTimer();
    } catch (err) {
      console.warn("Microphone access denied. Simulating recording.", err);
      // Fallback to simulation mode if permissions fail
      setDeviceState("recording");
      setSimulationMode(true);
      startTimer();
    }
  };

  const handleStopRecording = () => {
    if (deviceState === "recording") {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      stopTimer();
      setDeviceState("idle");
    } else if (deviceState === "playing") {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      stopTimer();
      setDeviceState("idle");
    }
  };

  const handlePlayAudio = (url: string | null, simulationMode: boolean) => {
    if (deviceState === "recording") return;
    
    if (simulationMode) {
      setDeviceState("playing");
      startTimer();
      // Simulate playback for 5 seconds
      setTimeout(() => {
        setDeviceState("idle");
        stopTimer();
      }, 5000);
      return;
    }

    if (url) {
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => {
        setDeviceState("idle");
        stopTimer();
      };
      
      audio.play();
      setDeviceState("playing");
      startTimer();
    }
  };

  useEffect(() => {
    return () => {
      stopTimer();
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    };
  }, [stopTimer]);

  return {
    handleStartRecording,
    handleStopRecording,
    handlePlayAudio
  };
};
