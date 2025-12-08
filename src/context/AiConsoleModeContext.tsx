import { createContext, useContext, useState, ReactNode } from "react";

type AiConsoleModeContextValue = {
  isAiConsoleMode: boolean;
  toggleAiConsoleMode: () => void;
};

const AiConsoleModeContext = createContext<AiConsoleModeContextValue | undefined>(
  undefined
);

export const AiConsoleModeProvider = ({ children }: { children: ReactNode }) => {
  const [isAiConsoleMode, setIsAiConsoleMode] = useState(false);

  const toggleAiConsoleMode = () => {
    setIsAiConsoleMode(prev => !prev);
  };

  return (
    <AiConsoleModeContext.Provider value={{ isAiConsoleMode, toggleAiConsoleMode }}>
      {children}
    </AiConsoleModeContext.Provider>
  );
};

export const useAiConsoleMode = () => {
  const ctx = useContext(AiConsoleModeContext);
  if (!ctx) {
    throw new Error("useAiConsoleMode must be used within AiConsoleModeProvider");
  }
  return ctx;
};
