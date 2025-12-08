import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Trash2,
  Play,
  Filter,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface MarketBriefEvent {
  id: string;
  eventType: "brief.created" | "brief.updated" | "brief.deleted";
  briefId: string;
  briefTitle: string;
  timestamp: Date;
  status: "new" | "reviewing" | "processed" | "rejected";
  source: string;
  payload: any;
  assignedTo?: string;
  notes?: string;
}

export function EventListenerDashboard() {
  const [selectedTab, setSelectedTab] = useState("new");
  const [selectedEvent, setSelectedEvent] = useState<MarketBriefEvent | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [filterType, setFilterType] = useState("all");

  const [events, setEvents] = useState<MarketBriefEvent[]>([
    {
      id: "evt_001",
      eventType: "brief.created",
      briefId: "brief_20260315_001",
      briefTitle: "Spring 2026 Product Launch Campaign",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: "new",
      source: "marketbrief.platform",
      payload: {
        campaign_name: "Spring 2026 Product Launch",
        budget: "$250,000",
        launch_date: "2026-03-15",
      },
    },
    {
      id: "evt_002",
      eventType: "brief.updated",
      briefId: "brief_20251220_005",
      briefTitle: "Holiday Campaign 2025 - Budget Revision",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: "reviewing",
      source: "marketbrief.platform",
      payload: {
        budget_change: "$50,000 increase",
        reason: "Additional channel investment",
      },
      assignedTo: "Sarah Chen",
    },
    {
      id: "evt_003",
      eventType: "brief.created",
      briefId: "brief_20260201_002",
      briefTitle: "Q1 Content Marketing Initiative",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: "new",
      source: "marketbrief.platform",
      payload: {
        campaign_name: "Q1 Content Marketing",
        budget: "$75,000",
        channels: ["Blog", "Social", "Email"],
      },
    },
    {
      id: "evt_004",
      eventType: "brief.created",
      briefId: "brief_20260110_008",
      briefTitle: "Brand Awareness Campaign - APAC Region",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      status: "processed",
      source: "marketbrief.platform",
      payload: {
        region: "APAC",
        budget: "$500,000",
      },
      notes: "Project created: WF-20260110-APAC",
    },
    {
      id: "evt_005",
      eventType: "brief.deleted",
      briefId: "brief_20251205_003",
      briefTitle: "Cancelled: Year-End Promotion",
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      status: "rejected",
      source: "marketbrief.platform",
      payload: {},
      notes: "Campaign cancelled by stakeholder",
    },
  ]);

  const statusCounts = {
    new: events.filter((e) => e.status === "new").length,
    reviewing: events.filter((e) => e.status === "reviewing").length,
    processed: events.filter((e) => e.status === "processed").length,
    rejected: events.filter((e) => e.status === "rejected").length,
  };

  const filteredEvents = events.filter((event) => {
    if (selectedTab !== "all" && event.status !== selectedTab) return false;
    if (filterType !== "all" && event.eventType !== filterType) return false;
    return true;
  });

  const getStatusColor = (status: MarketBriefEvent["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "processed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
  };

  const getEventIcon = (eventType: MarketBriefEvent["eventType"]) => {
    switch (eventType) {
      case "brief.created":
        return <Play className="h-4 w-4 text-green-600" />;
      case "brief.updated":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "brief.deleted":
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const toggleEventSelection = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const bulkProcess = () => {
    setEvents(
      events.map((e) =>
        selectedEvents.includes(e.id) ? { ...e, status: "processed" } : e
      )
    );
    setSelectedEvents([]);
  };

  const bulkReject = () => {
    setEvents(
      events.map((e) =>
        selectedEvents.includes(e.id) ? { ...e, status: "rejected" } : e
      )
    );
    setSelectedEvents([]);
  };

  const updateEventStatus = (eventId: string, status: MarketBriefEvent["status"]) => {
    setEvents(events.map((e) => (e.id === eventId ? { ...e, status } : e)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Event Listener Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and process incoming MarketBrief events
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Event Types</SelectItem>
              <SelectItem value="brief.created">Created</SelectItem>
              <SelectItem value="brief.updated">Updated</SelectItem>
              <SelectItem value="brief.deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">New Events</p>
                <p className="text-2xl font-bold">{statusCounts.new}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Play className="h-5 w-5 text-blue-600 dark:text-blue-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Reviewing</p>
                <p className="text-2xl font-bold">{statusCounts.reviewing}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Processed</p>
                <p className="text-2xl font-bold">{statusCounts.processed}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Rejected</p>
                <p className="text-2xl font-bold">{statusCounts.rejected}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Event Queue</CardTitle>
            {selectedEvents.length > 0 && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={bulkReject}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject ({selectedEvents.length})
                </Button>
                <Button size="sm" onClick={bulkProcess}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Process ({selectedEvents.length})
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="new">
                New
                {statusCounts.new > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {statusCounts.new}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="reviewing">
                Reviewing
                {statusCounts.reviewing > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.reviewing}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="processed">Processed</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {filteredEvents.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No events in this queue</p>
                    </div>
                  ) : (
                    filteredEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center gap-3 p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <Checkbox
                          checked={selectedEvents.includes(event.id)}
                          onCheckedChange={() => toggleEventSelection(event.id)}
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getEventIcon(event.eventType)}
                            <h3 className="font-medium text-sm truncate">
                              {event.briefTitle}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`text-[10px] ${getStatusColor(event.status)}`}
                            >
                              {event.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="font-mono">{event.briefId}</span>
                            <span>|</span>
                            <span>{formatTimestamp(event.timestamp)}</span>
                            {event.assignedTo && (
                              <>
                                <span>|</span>
                                <span>Assigned to {event.assignedTo}</span>
                              </>
                            )}
                          </div>
                          {event.notes && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Note: {event.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {event.status === "new" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateEventStatus(event.id, "reviewing")}
                              >
                                <Clock className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateEventStatus(event.id, "processed")}
                              >
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedEvent.briefTitle}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Event ID:</span>
                  <span className="ml-2 font-mono">{selectedEvent.id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Brief ID:</span>
                  <span className="ml-2 font-mono">{selectedEvent.briefId}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Event Type:</span>
                  <Badge variant="outline" className="ml-2">
                    {selectedEvent.eventType}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    variant="outline"
                    className={`ml-2 ${getStatusColor(selectedEvent.status)}`}
                  >
                    {selectedEvent.status}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Event Payload</h4>
                <pre className="text-xs bg-secondary p-4 rounded overflow-auto max-h-[300px]">
                  {JSON.stringify(selectedEvent.payload, null, 2)}
                </pre>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
                {selectedEvent.status === "new" && (
                  <Button>Create Project from Brief</Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
