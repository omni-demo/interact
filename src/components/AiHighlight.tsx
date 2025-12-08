import { ReactNode } from "react";
import { useAiConsoleMode } from "@/context/AiConsoleModeContext";
import { Badge } from "./ui/badge";

type AiHighlightProps = {
  children: ReactNode;
  className?: string;
  showBadge?: boolean;
};

export const AiHighlight = ({ children, className = "", showBadge = false }: AiHighlightProps) => {
  const { isAiConsoleMode } = useAiConsoleMode();

  const highlightClasses = isAiConsoleMode
    ? "ring-2 ring-blue-400/60 ring-offset-2 ring-offset-background shadow-lg shadow-blue-200/50 dark:shadow-blue-900/30"
    : "";

  return (
    <div className={`relative ${className} transition-all duration-200 ${highlightClasses}`}>
      {children}
      {isAiConsoleMode && showBadge && (
        <Badge 
          variant="secondary" 
          className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 shadow-md"
        >
          AI
        </Badge>
      )}
    </div>
  );
};
