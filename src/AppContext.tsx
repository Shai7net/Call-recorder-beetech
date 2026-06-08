import { createContext, useContext, useState, ReactNode } from "react";
import { Language, translations } from "./i18n";

type DeviceState = "off" | "idle" | "recording" | "playing";

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  deviceState: DeviceState;
  setDeviceState: React.Dispatch<React.SetStateAction<DeviceState>>;
  recordingTime: number;
  setRecordingTime: React.Dispatch<React.SetStateAction<number>>;
  audioUrl: string | null;
  setAudioUrl: (url: string | null) => void;
  simulationMode: boolean;
  setSimulationMode: (mode: boolean) => void;
  activeHotspot: string | null;
  setActiveHotspot: (hotspot: string | null) => void;
  tutorialMode: boolean;
  setTutorialMode: (tutorialMode: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("he");
  const [deviceState, setDeviceState] = useState<DeviceState>("off");
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [simulationMode, setSimulationMode] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [tutorialMode, setTutorialMode] = useState(true);

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        deviceState,
        setDeviceState,
        recordingTime,
        setRecordingTime,
        audioUrl,
        setAudioUrl,
        simulationMode,
        setSimulationMode,
        activeHotspot,
        setActiveHotspot,
        tutorialMode,
        setTutorialMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
