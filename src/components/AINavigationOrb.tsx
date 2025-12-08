import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Home, Folder, Calendar, FileText, BarChart3, Settings, Globe, Move, Users, Network } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { useAiConsoleMode } from "@/context/AiConsoleModeContext";

interface Position {
  x: number;
  y: number;
}

interface NavigationSuggestion {
  label: string;
  path: string;
  icon: any;
  description: string;
}

export function AINavigationOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NavigationSuggestion[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [longPressActive, setLongPressActive] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 50, y: 90 }); // percent from left and top
  const inputRef = useRef<HTMLInputElement>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const { isAiConsoleMode } = useAiConsoleMode();

  const allNavigationOptions: NavigationSuggestion[] = [
    { label: "Home Dashboard", path: "/", icon: Home, description: "View your main dashboard and overview" },
    { label: "Research Console", path: "/research-console", icon: Globe, description: "Explore cultural insights and research tools" },
    { label: "Research Console Detail", path: "/research-console/detail", icon: FileText, description: "Deep dive into research insights" },
    { label: "Audience Console", path: "/audience-console", icon: Users, description: "Build and analyze audiences" },
    { label: "Taxonomy Unifier", path: "/taxonomy-unifier", icon: Network, description: "Standardize and unify marketing taxonomy" },
    { label: "Plan Detail", path: "/plan", icon: Calendar, description: "View detailed campaign plans" },
    { label: "Events", path: "/events", icon: Calendar, description: "Monitor and process MarketBrief events" },
    { label: "Brief Mapper", path: "/briefs/1/map", icon: FileText, description: "Map briefs to Workfront projects" },
    { label: "Projects", path: "/projects", icon: Folder, description: "Browse all your projects" },
    { label: "Analytics", path: "/analytics", icon: BarChart3, description: "View performance metrics and reports" },
    { label: "Settings", path: "/settings", icon: Settings, description: "Manage your preferences and account" },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem("ai-orb-position");
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    longPressTimerRef.current = setTimeout(() => {
      setLongPressActive(true);
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }, 500); // 500ms long press
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    longPressTimerRef.current = setTimeout(() => {
      setLongPressActive(true);
      setIsDragging(true);
      dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    }, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    if (!isDragging && longPressActive) {
      setIsOpen(!isOpen);
    }
    setIsDragging(false);
    setLongPressActive(false);
    dragStartRef.current = null;
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    if (!isDragging && longPressActive) {
      setIsOpen(!isOpen);
    }
    setIsDragging(false);
    setLongPressActive(false);
    dragStartRef.current = null;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && dragStartRef.current) {
      const newX = (e.clientX / window.innerWidth) * 100;
      const newY = (e.clientY / window.innerHeight) * 100;

      // Constrain to screen bounds (with some padding)
      const constrainedX = Math.max(5, Math.min(95, newX));
      const constrainedY = Math.max(5, Math.min(95, newY));

      setPosition({ x: constrainedX, y: constrainedY });
      localStorage.setItem("ai-orb-position", JSON.stringify({ x: constrainedX, y: constrainedY }));
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && dragStartRef.current) {
      const touch = e.touches[0];
      const newX = (touch.clientX / window.innerWidth) * 100;
      const newY = (touch.clientY / window.innerHeight) * 100;

      // Constrain to screen bounds (with some padding)
      const constrainedX = Math.max(5, Math.min(95, newX));
      const constrainedY = Math.max(5, Math.min(95, newY));

      setPosition({ x: constrainedX, y: constrainedY });
      localStorage.setItem("ai-orb-position", JSON.stringify({ x: constrainedX, y: constrainedY }));
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging]);

  const handleQuery = (searchQuery: string) => {
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    setIsThinking(true);

    // Simulate AI processing
    setTimeout(() => {
      const filtered = allNavigationOptions.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSuggestions(filtered);
      setIsThinking(false);
    }, 300);
  };

  const handleNavigate = (path: string) => {
    window.location.href = path;
    setIsOpen(false);
    setQuery("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (label: string) => {
    setQuery(label);
    handleQuery(label);
  };

  const quickActions = [
    "Research Console",
    "View events",
    "Open brief mapper",
    "Go to dashboard",
  ];

  return (
    <>
      {/* AI Orb Button */}
      <div
        className={`fixed z-50 transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
          } ${isAiConsoleMode ? 'ring-4 ring-blue-400/60 ring-offset-4 ring-offset-background rounded-full' : ''}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => !longPressActive && setIsOpen(!isOpen)}
          className="relative group"
        >
          {/* Outer glow ring */}
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg transition-opacity duration-1000 animate-[pulse_3s_ease-in-out_infinite] ${isAiConsoleMode ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
            } ${isDragging ? 'opacity-100' : ''}`} />

          {/* Orb */}
          <div className={`relative w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl transform transition-transform animate-[pulse_4s_ease-in-out_infinite] ${isDragging ? 'scale-125' : 'group-hover:scale-110'
            }`}>
            {longPressActive && isDragging ? (
              <Move className="h-7 w-7 text-white" />
            ) : (
              <Sparkles className="h-7 w-7 text-white animate-[pulse_2.5s_ease-in-out_infinite]" />
            )}
          </div>

          {/* Breathing ring animation */}
          <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-[ping_4s_ease-in-out_infinite]" />
        </button>

        {/* Drag Hint */}
        {longPressActive && !isDragging && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap animate-in fade-in duration-200">
            Drag to reposition
          </div>
        )}
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[500px] z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl shadow-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Navigation Assistant</h3>
                    <p className="text-xs text-white/80">Ask me where you want to go</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => handleQuery(e.target.value)}
                  placeholder="Where would you like to go?"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && suggestions.length > 0) {
                      handleNavigate(suggestions[0].path);
                    }
                  }}
                />
                <Button
                  size="icon"
                  disabled={!query.trim()}
                  onClick={() => {
                    if (suggestions.length > 0) {
                      handleNavigate(suggestions[0].path);
                    }
                  }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <ScrollArea className="h-[320px] p-4">
              {isThinking && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Thinking...</p>
                  </div>
                </div>
              )}

              {!query && !isThinking && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-3 text-muted-foreground">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action) => (
                        <button
                          key={action}
                          onClick={() => handleSuggestionClick(action)}
                          className="text-left p-3 rounded-lg border hover:bg-secondary transition-colors text-sm"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-3 text-muted-foreground">All Sections</p>
                    <div className="space-y-2">
                      {allNavigationOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.path}
                            onClick={() => handleNavigate(option.path)}
                            className="w-full flex items-start gap-3 p-3 rounded-lg border hover:bg-secondary transition-colors text-left"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{option.label}</p>
                              <p className="text-xs text-muted-foreground">{option.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {query && !isThinking && suggestions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {suggestions.length} result{suggestions.length !== 1 ? "s" : ""} found
                    </Badge>
                  </div>
                  {suggestions.map((suggestion) => {
                    const Icon = suggestion.icon;
                    return (
                      <button
                        key={suggestion.path}
                        onClick={() => handleNavigate(suggestion.path)}
                        className="w-full flex items-start gap-3 p-3 rounded-lg border border-primary/50 bg-primary/5 hover:bg-primary/10 transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{suggestion.label}</p>
                          <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {query && !isThinking && suggestions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-3">
                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium mb-1">No matches found</p>
                  <p className="text-sm text-muted-foreground">
                    Try searching for "dashboard", "events", or "settings"
                  </p>
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            <div className="p-3 border-t bg-secondary/30 text-center">
              <p className="text-xs text-muted-foreground">
                Powered by AI • Press Enter to navigate to top result
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
