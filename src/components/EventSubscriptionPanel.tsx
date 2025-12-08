import { useState } from "react";
import { X, Bell, BellOff, Filter, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

interface EventType {
  id: string;
  name: string;
  description: string;
  source: "marketbrief" | "workfront" | "interact";
  category: "project" | "task" | "approval" | "status" | "brief";
  enabled: boolean;
  notificationChannels: {
    inApp: boolean;
    email: boolean;
    push: boolean;
  };
  priority: "low" | "medium" | "high";
}

interface EventSubscriptionPanelProps {
  onClose: () => void;
}

export function EventSubscriptionPanel({ onClose }: EventSubscriptionPanelProps) {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<string>("all");
  
  const [eventTypes, setEventTypes] = useState<EventType[]>([
    {
      id: "brief.created",
      name: "Market Brief Created",
      description: "New market brief published from MarketBrief platform",
      source: "marketbrief",
      category: "brief",
      enabled: true,
      notificationChannels: { inApp: true, email: true, push: false },
      priority: "high",
    },
    {
      id: "brief.updated",
      name: "Market Brief Updated",
      description: "Existing market brief has been modified",
      source: "marketbrief",
      category: "brief",
      enabled: true,
      notificationChannels: { inApp: true, email: false, push: false },
      priority: "medium",
    },
    {
      id: "project.created",
      name: "Project Created",
      description: "New Workfront project created from brief",
      source: "workfront",
      category: "project",
      enabled: true,
      notificationChannels: { inApp: true, email: true, push: true },
      priority: "high",
    },
    {
      id: "project.status_changed",
      name: "Project Status Changed",
      description: "Project status updated (On Track, At Risk, etc.)",
      source: "workfront",
      category: "project",
      enabled: true,
      notificationChannels: { inApp: true, email: true, push: false },
      priority: "high",
    },
    {
      id: "task.assigned",
      name: "Task Assigned to Me",
      description: "A task has been assigned to you",
      source: "workfront",
      category: "task",
      enabled: true,
      notificationChannels: { inApp: true, email: true, push: true },
      priority: "high",
    },
    {
      id: "task.completed",
      name: "Task Completed",
      description: "Task marked as complete in your projects",
      source: "workfront",
      category: "task",
      enabled: false,
      notificationChannels: { inApp: true, email: false, push: false },
      priority: "low",
    },
    {
      id: "approval.pending",
      name: "Approval Pending",
      description: "Asset or deliverable requires your approval",
      source: "workfront",
      category: "approval",
      enabled: true,
      notificationChannels: { inApp: true, email: true, push: true },
      priority: "high",
    },
    {
      id: "approval.approved",
      name: "Approval Completed",
      description: "Your submitted item was approved",
      source: "workfront",
      category: "approval",
      enabled: true,
      notificationChannels: { inApp: true, email: false, push: false },
      priority: "medium",
    },
    {
      id: "sync.conflict",
      name: "GUID Sync Conflict",
      description: "Sync issue detected between platforms",
      source: "interact",
      category: "status",
      enabled: true,
      notificationChannels: { inApp: true, email: true, push: false },
      priority: "high",
    },
  ]);

  const toggleEventEnabled = (id: string) => {
    setEventTypes(eventTypes.map(event =>
      event.id === id ? { ...event, enabled: !event.enabled } : event
    ));
  };

  const toggleNotificationChannel = (id: string, channel: keyof EventType["notificationChannels"]) => {
    setEventTypes(eventTypes.map(event =>
      event.id === id
        ? {
            ...event,
            notificationChannels: {
              ...event.notificationChannels,
              [channel]: !event.notificationChannels[channel],
            },
          }
        : event
    ));
  };

  const getSourceColor = (source: EventType["source"]) => {
    switch (source) {
      case "marketbrief":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "workfront":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "interact":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  const filteredEvents = eventTypes.filter(event => {
    if (filterCategory !== "all" && event.category !== filterCategory) return false;
    if (filterSource !== "all" && event.source !== filterSource) return false;
    return true;
  });

  const enabledCount = eventTypes.filter(e => e.enabled).length;

  return (
    <div className="w-96 h-full border-l bg-white dark:bg-[#1a1f2e] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="font-semibold text-lg">Event Subscriptions</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {enabledCount} of {eventTypes.length} events enabled
        </p>
      </div>

      {/* Filters */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Category</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="project">Projects</SelectItem>
                <SelectItem value="task">Tasks</SelectItem>
                <SelectItem value="approval">Approvals</SelectItem>
                <SelectItem value="brief">Briefs</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Source</Label>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="marketbrief">MarketBrief</SelectItem>
                <SelectItem value="workfront">Workfront</SelectItem>
                <SelectItem value="interact">Interact</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Event List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-3 border rounded-lg space-y-3 bg-card hover:bg-secondary/30 transition-colors"
            >
              {/* Event Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium">{event.name}</h3>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getSourceColor(event.source)}`}>
                      {event.source}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {event.description}
                  </p>
                </div>
                <Switch
                  checked={event.enabled}
                  onCheckedChange={() => toggleEventEnabled(event.id)}
                />
              </div>

              {/* Notification Channels */}
              {event.enabled && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Notification Channels
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        variant={event.notificationChannels.inApp ? "default" : "outline"}
                        size="sm"
                        className="flex-1 h-7 text-xs"
                        onClick={() => toggleNotificationChannel(event.id, "inApp")}
                      >
                        In-App
                      </Button>
                      <Button
                        variant={event.notificationChannels.email ? "default" : "outline"}
                        size="sm"
                        className="flex-1 h-7 text-xs"
                        onClick={() => toggleNotificationChannel(event.id, "email")}
                      >
                        Email
                      </Button>
                      <Button
                        variant={event.notificationChannels.push ? "default" : "outline"}
                        size="sm"
                        className="flex-1 h-7 text-xs"
                        onClick={() => toggleNotificationChannel(event.id, "push")}
                      >
                        Push
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <BellOff className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No events match your filters</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Event
        </Button>
      </div>
    </div>
  );
}
