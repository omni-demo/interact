import { useState, useEffect } from "react";
import { Search, Clock, Folder, FileText, X } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface QuickSwitcherProps {
  onClose: () => void;
}

interface SearchResult {
  id: string;
  type: "project" | "campaign" | "brief" | "task";
  title: string;
  subtitle?: string;
  path: string;
  recent?: boolean;
}

export function QuickSwitcher({ onClose }: QuickSwitcherProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Mock search results
  const allResults: SearchResult[] = [
    {
      id: "1",
      type: "campaign",
      title: "Q4 Product Launch",
      subtitle: "Marketing Campaign",
      path: "/campaigns/q4-product-launch",
      recent: true,
    },
    {
      id: "2",
      type: "campaign",
      title: "Holiday Marketing Campaign",
      subtitle: "Marketing Campaign",
      path: "/campaigns/holiday-marketing",
      recent: true,
    },
    {
      id: "3",
      type: "brief",
      title: "Spring 2026 Product Refresh",
      subtitle: "Market Brief",
      path: "/briefs/spring-2026-refresh",
      recent: false,
    },
    {
      id: "4",
      type: "project",
      title: "Brand Refresh Initiative",
      subtitle: "Workfront Project",
      path: "/projects/brand-refresh",
      recent: true,
    },
    {
      id: "5",
      type: "task",
      title: "Review creative assets",
      subtitle: "Q4 Product Launch",
      path: "/tasks/review-creative-assets",
      recent: false,
    },
  ];

  useEffect(() => {
    if (query.trim() === "") {
      setResults(allResults.filter(r => r.recent));
    } else {
      const filtered = allResults.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        navigateToResult(results[selectedIndex]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [results, selectedIndex]);

  const navigateToResult = (result: SearchResult) => {
    console.log("Navigate to:", result.path);
    onClose();
  };

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "campaign":
        return <Folder className="h-4 w-4" />;
      case "project":
        return <Folder className="h-4 w-4" />;
      case "brief":
        return <FileText className="h-4 w-4" />;
      case "task":
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: SearchResult["type"]) => {
    const colors = {
      campaign: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      project: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      brief: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      task: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
    return colors[type];
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search campaigns, projects, briefs, tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 text-base"
            autoFocus
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs text-muted-foreground"
          >
            ESC
          </Button>
        </div>

        {/* Results */}
        <ScrollArea className="max-h-[400px]">
          {results.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {query ? "No results found" : "Start typing to search"}
              </p>
            </div>
          ) : (
            <div className="p-2">
              {query === "" && (
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Recent
                </div>
              )}
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
                    index === selectedIndex
                      ? "bg-secondary"
                      : "hover:bg-secondary/50"
                  )}
                  onClick={() => navigateToResult(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm mb-0.5">{result.title}</div>
                    {result.subtitle && (
                      <div className="text-xs text-muted-foreground">
                        {result.subtitle}
                      </div>
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] px-1.5 py-0", getTypeBadge(result.type))}
                  >
                    {result.type}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-secondary/30 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Arrow Keys Navigate</span>
            <span>Enter Select</span>
            <span>ESC Close</span>
          </div>
          <span>Cmd+K to reopen</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
