import { useState } from "react";
import { RefreshCw, CheckCircle2, AlertCircle, XCircle, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";

interface SyncStatus {
  platform: "marketbrief" | "workfront";
  status: "synced" | "syncing" | "error" | "offline";
  lastSync: Date;
  pendingChanges: number;
  errorMessage?: string;
}

export function SyncStatusWidget() {
  const [syncing, setSyncing] = useState(false);
  const [syncStatuses, setSyncStatuses] = useState<SyncStatus[]>([
    {
      platform: "marketbrief",
      status: "synced",
      lastSync: new Date(Date.now() - 1000 * 60 * 5),
      pendingChanges: 0,
    },
    {
      platform: "workfront",
      status: "synced",
      lastSync: new Date(Date.now() - 1000 * 60 * 2),
      pendingChanges: 0,
    },
  ]);

  const overallStatus = syncStatuses.some(s => s.status === "error")
    ? "error"
    : syncStatuses.some(s => s.status === "syncing")
    ? "syncing"
    : syncStatuses.some(s => s.status === "offline")
    ? "offline"
    : "synced";

  const totalPendingChanges = syncStatuses.reduce((sum, s) => sum + s.pendingChanges, 0);

  const forceSync = () => {
    setSyncing(true);
    setSyncStatuses(syncStatuses.map(s => ({ ...s, status: "syncing" })));
    
    setTimeout(() => {
      setSyncStatuses(syncStatuses.map(s => ({
        ...s,
        status: "synced",
        lastSync: new Date(),
        pendingChanges: 0,
      })));
      setSyncing(false);
    }, 2000);
  };

  const getStatusIcon = (status: SyncStatus["status"]) => {
    switch (status) {
      case "synced":
        return <CheckCircle2 className="h-3 w-3 text-green-600" />;
      case "syncing":
        return <RefreshCw className="h-3 w-3 text-blue-600 animate-spin" />;
      case "error":
        return <XCircle className="h-3 w-3 text-red-600" />;
      case "offline":
        return <AlertCircle className="h-3 w-3 text-gray-400" />;
    }
  };

  const getStatusColor = (status: SyncStatus["status"]) => {
    switch (status) {
      case "synced":
        return "text-green-600";
      case "syncing":
        return "text-blue-600";
      case "error":
        return "text-red-600";
      case "offline":
        return "text-gray-400";
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

  const getPlatformLabel = (platform: SyncStatus["platform"]) => {
    return platform === "marketbrief" ? "MarketBrief" : "Workfront";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          {getStatusIcon({ status: overallStatus } as SyncStatus)}
          {totalPendingChanges > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center text-[10px]"
            >
              {totalPendingChanges}
            </Badge>
          )}
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">Sync Status</h3>
              <p className="text-xs text-muted-foreground">
                Platform integration health
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={forceSync}
              disabled={syncing}
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
            </Button>
          </div>

          <Separator />

          {/* Overall Status */}
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon({ status: overallStatus } as SyncStatus)}
              <span className={`text-sm font-medium ${getStatusColor(overallStatus)}`}>
                {overallStatus === "synced" && "All Systems Synced"}
                {overallStatus === "syncing" && "Syncing..."}
                {overallStatus === "error" && "Sync Error"}
                {overallStatus === "offline" && "Connection Lost"}
              </span>
            </div>
            {totalPendingChanges > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{totalPendingChanges} pending changes</span>
                  <span>Auto-sync in 30s</span>
                </div>
                <Progress value={66} className="h-1" />
              </div>
            )}
          </div>

          {/* Individual Platform Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-muted-foreground">Platform Status</h4>
            {syncStatuses.map((sync) => (
              <div key={sync.platform} className="flex items-center justify-between p-2 rounded hover:bg-secondary/50">
                <div className="flex items-center gap-2">
                  {getStatusIcon(sync)}
                  <div>
                    <div className="text-sm font-medium">
                      {getPlatformLabel(sync.platform)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {sync.status === "synced" && `Last sync ${formatTimestamp(sync.lastSync)}`}
                      {sync.status === "syncing" && "Syncing changes..."}
                      {sync.status === "error" && (sync.errorMessage || "Sync failed")}
                      {sync.status === "offline" && "Connection lost"}
                    </div>
                  </div>
                </div>
                {sync.pendingChanges > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {sync.pendingChanges}
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {/* GUID Registry Info */}
          <Separator />
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">GUID Registry</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-secondary/30 rounded">
                <div className="text-muted-foreground">Total GUIDs</div>
                <div className="text-lg font-semibold">247</div>
              </div>
              <div className="p-2 bg-secondary/30 rounded">
                <div className="text-muted-foreground">Active Projects</div>
                <div className="text-lg font-semibold">42</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              View Registry
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              Sync Logs
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
