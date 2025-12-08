import { useAiConsoleMode } from "@/context/AiConsoleModeContext";

export const AiConsoleToggle = () => {
  const { isAiConsoleMode, toggleAiConsoleMode } = useAiConsoleMode();

  return (
    <button
      type="button"
      onClick={toggleAiConsoleMode}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
        "transition-colors duration-150",
        isAiConsoleMode
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
          : "border-border bg-background text-muted-foreground hover:border-border/80"
      ].join(" ")}
      aria-pressed={isAiConsoleMode}
      aria-label="Toggle AI Console Mode"
    >
      <span
        className={[
          "h-2 w-2 rounded-full transition-colors",
          isAiConsoleMode ? "bg-blue-500" : "bg-muted-foreground/40"
        ].join(" ")}
      />
      <span>AI Mode</span>
    </button>
  );
};
