import { useState, useEffect } from "react";
import { X, CheckCheck, Archive, Clock, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface InboxItem {
  id: string;
  type: "task" | "approval" | "mention" | "status" | "ai-recommendation" | "alert";
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  priority: "low" | "medium" | "high" | "critical";
  source: "workfront" | "marketbrief" | "interact" | "ai";
  actionUrl?: string;
  metadata?: {
    projectName?: string;
    assignedBy?: string;
    dueDate?: Date;
  };
}

interface UniversalInboxProps {
  onClose: () => void;
  onUnreadCountChange: (count: number) => void;
}

export function UniversalInbox({ onClose, onUnreadCountChange }: UniversalInboxProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [items, setItems] = useState<InboxItem[]>([
    {
      id: "1",
      type: "approval",
      title: "Creative assets need approval",
      description: "Q4 Product Launch campaign - 5 assets pending review",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: false,
      priority: "high",
      source: "workfront",
      metadata: { projectName: "Q4 Product Launch", dueDate: new Date(Date.now() + 1000 * 60 * 60 * 4) },
    },
    {
      id: "2",
      type: "task",
      title: "Media plan review assigned to you",
      description: "Sarah Chen assigned you to review the Holiday campaign media plan",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      read: false,
      priority: "medium",
      source: "workfront",
      metadata: { projectName: "Holiday Marketing Campaign", assignedBy: "Sarah Chen" },
    },
    {
      id: "3",
      type: "ai-recommendation",
      title: "AI suggests budget reallocation",
      description: "Market Brief Harmonizer recommends shifting 15% budget from display to video based on performance",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
      priority: "medium",
      source: "ai",
      metadata: { projectName: "Brand Refresh Initiative" },
    },
    {
      id: "4",
      type: "mention",
      title: "Alex mentioned you in a comment",
      description: '"@you can you review the latest creative concepts before Friday?"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      read: true,
      priority: "low",
      source: "interact",
      metadata: { projectName: "Q4 Product Launch" },
    },
    {
      id: "5",
      type: "status",
      title: "Project status changed to At Risk",
      description: "Holiday Marketing Campaign timeline is at risk due to resource constraints",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      read: false,
      priority: "critical",
      source: "workfront",
      metadata: { projectName: "Holiday Marketing Campaign" },
    },
    {
      id: "6",
      type: "alert",
      title: "New Market Brief received",
      description: "Spring 2026 Product Refresh brief published from MarketBrief platform",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      read: true,
      priority: "medium",
      source: "marketbrief",
    },
  ]);

  const unreadItems = items.filter(item => !item.read);

  useEffect(() => {
    onUnreadCountChange(unreadItems.length);
  }, [items, onUnreadCountChange]);

  const markAsRead = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, read: true } : item
    ));
  };

  const markAllAsRead = () => {
    setItems(items.map(item => ({ ...item, read: true })));
  };

  const archiveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getIconForType = (type: InboxItem["type"]) => {
    switch (type) {
      case "task":
        return <CheckCheck className="h-4 w-4" />;
      case "approval":
        return <Clock className="h-4 w-4" />;
      case "mention":
        return <span className="text-xs">@</span>;
      case "status":
        return <AlertCircle className="h-4 w-4" />;
      case "ai-recommendation":
        return <Sparkles className="h-4 w-4" />;
      case "alert":
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: InboxItem["priority"]) => {
    switch (priority) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-gray-400";
    }
  };

  const getSourceBadge = (source: InboxItem["source"]) => {
    const colors = {
      workfront: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      marketbrief: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      interact: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      ai: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return colors[source];
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const filteredItems = items.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !item.read;
    return item.type === activeTab;
  });

  return (
    <div className="w-96 h-full border-l bg-white dark:bg-[#1a1f2e] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">Inbox</h2>
          <p className="text-xs text-muted-foreground">
            {unreadItems.length} unread
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadItems.length === 0}
          >
            <CheckCheck className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b h-auto p-0">
          <TabsTrigger value="all" className="rounded-none">
            All
            <Badge variant="secondary" className="ml-2">
              {items.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread" className="rounded-none">
            Unread
            {unreadItems.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadItems.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="task" className="rounded-none">
            Tasks
          </TabsTrigger>
          <TabsTrigger value="approval" className="rounded-none">
            Approvals
          </TabsTrigger>
          <TabsTrigger value="ai-recommendation" className="rounded-none">
            AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="divide-y">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No items</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "p-4 hover:bg-secondary/50 cursor-pointer transition-colors relative",
                      !item.read && "bg-blue-50/50 dark:bg-blue-950/20"
                    )}
                    onClick={() => markAsRead(item.id)}
                  >
                    {/* Priority Indicator */}
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", getPriorityColor(item.priority))} />

                    <div className="flex gap-3 pl-2">
                      {/* Icon */}
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        item.type === "ai-recommendation" && "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
                        item.type === "approval" && "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-200",
                        item.type === "task" && "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200",
                        item.type === "mention" && "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200",
                        item.type === "status" && "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200",
                        item.type === "alert" && "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-200"
                      )}>
                        {getIconForType(item.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={cn(
                            "text-sm font-medium",
                            !item.read && "font-semibold"
                          )}>
                            {item.title}
                          </h3>
                          {!item.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", getSourceBadge(item.source))}>
                            {item.source}
                          </Badge>
                          {item.metadata?.projectName && (
                            <span className="text-[10px] text-muted-foreground">
                              {item.metadata.projectName}
                            </span>
                          )}
                          <span className="text-[10px] text-muted-foreground ml-auto">
                            {formatTimestamp(item.timestamp)}
                          </span>
                        </div>

                        {item.metadata?.dueDate && (
                          <div className="mt-2 text-[10px] text-orange-600 dark:text-orange-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Due {formatTimestamp(item.metadata.dueDate)}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            archiveItem(item.id);
                          }}
                        >
                          <Archive className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
