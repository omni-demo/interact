import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableWidget } from "@/components/DraggableWidget";
import { DashboardCard } from "@/components/DashboardCard";
import { ConsoleButton } from "@/components/ConsoleButton";
import { AiHighlight } from "@/components/AiHighlight";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, LayoutDashboard, ExternalLink, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type WidgetId = "mine" | "make" | "manage" | "notifications" | "tasks";

interface Widget {
  id: WidgetId;
}

interface CampaignMetadata {
  owner?: string;
  region?: string;
  budget?: string;
  roi?: string;
}

interface Campaign {
  id: string;
  name: string;
  status: "on-track" | "at-risk" | "behind" | "blocked" | "planning";
  deadline: string;
  tasks: number;
  completed: number;
  metadata?: CampaignMetadata;
}

const StatusBadge = ({ status }: { status: Campaign["status"] }) => {
  const statusConfig = {
    "on-track": { label: "On Track", color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-50 dark:bg-green-950" },
    "at-risk": { label: "At Risk", color: "bg-amber-500", textColor: "text-amber-700", bgColor: "bg-amber-50 dark:bg-amber-950" },
    "behind": { label: "Behind Schedule", color: "bg-orange-500", textColor: "text-orange-700", bgColor: "bg-orange-50 dark:bg-orange-950" },
    "blocked": { label: "Blocked", color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50 dark:bg-red-950" },
    "planning": { label: "Planning", color: "bg-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-50 dark:bg-blue-950" }
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color}`} />
      <span className={`text-xs font-medium px-2 py-0.5 rounded ${config.bgColor} ${config.textColor}`}>
        {config.label}
      </span>
    </div>
  );
};

const CampaignMetadataRow = ({ metadata }: { metadata?: CampaignMetadata }) => {
  if (!metadata) return null;

  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      {metadata.owner && (
        <div className="flex items-center gap-1">
          <span className="font-medium text-foreground">Owner:</span>
          <span>{metadata.owner}</span>
        </div>
      )}
      {metadata.region && (
        <div className="flex items-center gap-1">
          <span className="font-medium text-foreground">Region:</span>
          <span>{metadata.region}</span>
        </div>
      )}
      {metadata.budget && (
        <div className="flex items-center gap-1">
          <span className="font-medium text-foreground">Budget:</span>
          <span>{metadata.budget}</span>
        </div>
      )}
      {metadata.roi && (
        <div className="flex items-center gap-1">
          <span className="font-medium text-foreground">ROI:</span>
          <span className="text-green-600 dark:text-green-400 font-medium">{metadata.roi}</span>
        </div>
      )}
    </div>
  );
};

const CampaignProgressBar = ({ completed, total }: { completed: number; total: number }) => {
  const percentage = Math.round((completed / total) * 100);
  const progressColor = percentage >= 75 ? "bg-green-500" : percentage >= 50 ? "bg-blue-500" : percentage >= 25 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted-foreground">Tasks Progress</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{completed} / {total}</span>
          <span className="text-muted-foreground">({percentage}%)</span>
        </div>
      </div>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${progressColor} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const CampaignActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="text-xs h-8">
        View campaign
      </Button>
      <Button variant="ghost" size="sm" className="text-xs h-8 text-muted-foreground hover:text-foreground">
        <ExternalLink className="h-3 w-3 mr-1" />
        Workfront
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  return (
    <div className="p-4 border rounded-lg hover:shadow-md hover:border-primary/30 transition-all duration-200 group bg-card">
      <div className="space-y-3">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <StatusBadge status={campaign.status} />
              <span className="text-xs text-muted-foreground">{campaign.deadline}</span>
            </div>
            <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors truncate">
              {campaign.name}
            </h3>
          </div>
          <CampaignActions />
        </div>

        {/* Metadata Row */}
        {campaign.metadata && (
          <CampaignMetadataRow metadata={campaign.metadata} />
        )}

        {/* Progress Bar */}
        <CampaignProgressBar
          completed={campaign.completed}
          total={campaign.tasks}
        />
      </div>
    </div>
  );
};

export function CustomizableProjectOwnerDashboard() {


  const initialWidgets: Widget[] = [
    { id: "mine" },
    { id: "make" },
    { id: "manage" },
  ];

  const renderWidget = (widgetId: WidgetId) => {
    switch (widgetId) {
      case "mine":
        return (
          <DashboardCard
            title="Mine"
            description="Mine for Audience and Cultural Insights"
            backgroundImage="/interact/mine.png"
          >
            <div className="space-y-2">
              <ConsoleButton label="Research Console" href="/research-console/detail" />
              <ConsoleButton label="Audience Console" href="/audience-console" />

              <ConsoleButton label="Planning" href="/?view=planning" />
            </div>
          </DashboardCard>
        );
      case "make":
        return (
          <DashboardCard
            title="Make"
            description="Make Marketing Campaigns with Transparent Inventory"
            backgroundImage="/interact/make.png"
          >
            <div className="space-y-2">
              <ConsoleButton label="Design Console" href="/design-console" />
              <ConsoleButton label="Investment Console" href="/investment-console" />
              <ConsoleButton label="Production Console" href="/production-console" />
            </div>
          </DashboardCard>
        );
      case "manage":
        return (
          <DashboardCard
            title="Manage"
            description="Manage, Optimize and Measure Performance of Marketing Campaigns"
            backgroundImage="/interact/manage.png"
          >
            <div className="space-y-2">
              <ConsoleButton label="Activation Console" />
              <ConsoleButton label="Content Console" />
              <ConsoleButton label="Workflow Console" href="/workflow-console" />
            </div>
          </DashboardCard>
        );

      default:
        return null;
    }
  };

  const [widgets, setWidgets] = useState(initialWidgets);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const resetLayout = () => {
    setWidgets(initialWidgets);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm">Dashboard Customization</h3>
            <p className="text-xs text-muted-foreground">
              {isCustomizing ? "Drag widgets to rearrange your dashboard" : "Enable customization to rearrange widgets"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {isCustomizing && (
            <Button variant="outline" size="sm" onClick={resetLayout}>
              Reset Layout
            </Button>
          )}
          <Button
            variant={isCustomizing ? "default" : "outline"}
            size="sm"
            onClick={() => setIsCustomizing(!isCustomizing)}
          >
            {isCustomizing ? "Done" : "Customize"}
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={widgets.map((w) => w.id)}
          strategy={rectSortingStrategy}
          disabled={!isCustomizing}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {widgets.slice(0, 3).map((widget) => (
              <DraggableWidget key={widget.id} id={widget.id}>
                {renderWidget(widget.id)}
              </DraggableWidget>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6">
            {widgets.slice(3).map((widget) => (
              <DraggableWidget key={widget.id} id={widget.id}>
                {renderWidget(widget.id)}
              </DraggableWidget>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
