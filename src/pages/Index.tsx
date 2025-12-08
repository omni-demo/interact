import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { useUser } from "@/context/UserContext";
import { CustomizableProjectOwnerDashboard } from "@/components/dashboards/CustomizableProjectOwnerDashboard";
import { CustomizableTaskOwnerDashboard } from "@/components/dashboards/CustomizableTaskOwnerDashboard";
import { ApproverDashboard } from "@/components/dashboards/ApproverDashboard";
import { EnhancedExecutiveDashboard } from "@/components/dashboards/EnhancedExecutiveDashboard";
import { CampaignManagerDashboard } from "@/components/dashboards/CampaignManagerDashboard";
import { PlanningView } from "@/components/PlanningView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NotificationItem } from "@/components/NotificationItem";
import { DraggableWidget } from "@/components/DraggableWidget";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type SectionId = "notifications-tasks" | "active-campaigns" | "campaign-tracking";

interface Section {
  id: SectionId;
}

const WORKFRONT_TASK_URL = "https://experience.adobe.com/#/@leappointptrsd/so:leappointptrsd-Production/workfront/issue/6914c0aa0004b8034f914b6e6b63fe85/overview";

const Index = () => {
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const { currentRole, setCurrentRole } = useUser();
  const [workfrontConnected, setWorkfrontConnected] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    { id: "active-campaigns" },
    { id: "campaign-tracking" },
  ]);

  useEffect(() => {
    if (viewParam === "planning") {
      setCurrentRole("planning");
    }
  }, [viewParam, setCurrentRole]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case "planning":
        return <PlanningView />;
      case "project-owner":
        return <CustomizableProjectOwnerDashboard />;
      case "task-owner":
        return <CustomizableTaskOwnerDashboard />;
      case "campaign-manager":
        return <CampaignManagerDashboard />;
      case "approver":
        return <ApproverDashboard />;
      case "executive":
        return <EnhancedExecutiveDashboard />;
      default:
        return <CustomizableProjectOwnerDashboard />;
    }
  };

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "notifications-tasks":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Notifications</CardTitle>
                <Button variant="link" size="sm">See All Notifications</Button>
              </CardHeader>
              <CardContent className="space-y-2">
                <NotificationItem
                  title="Optimized solutions are ready for Scenario 1"
                  subtitle="Client: Bank Strategy, Gefferbyte, Galvercot"
                  date="Nov 5, 2025, 8:34 AM"
                  isNew
                />
                <NotificationItem
                  title="Optimized solutions are ready for Scenario 2"
                  subtitle="Client: Multi Strategy, Gefferbyte, Galvercot"
                  date="Nov 5, 2025, 8:31 AM"
                  isNew
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                {!workfrontConnected ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground text-center mb-4">
                      To access your tasks, connect to your Adobe Workfront
                    </p>
                    <Button onClick={() => setWorkfrontConnected(true)}>
                      Connect Adobe Workfront
                    </Button>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Connected to Adobe Workfront
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setWorkfrontConnected(false)}
                      >
                        Disconnect
                      </Button>
                    </div>
                    <div className="relative w-full h-[400px] border rounded-lg overflow-hidden">
                      <iframe
                        src={WORKFRONT_TASK_URL}
                        className="w-full h-full"
                        title="Adobe Workfront Tasks"
                        allow="fullscreen"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case "active-campaigns":
        return (
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold text-lg mb-2">Active Campaigns (for Campaign Planners)</h3>
            <p className="text-sm text-muted-foreground">Track and manage your ongoing marketing initiatives</p>
          </div>
        );
      case "campaign-tracking":
        return (
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold text-lg mb-2">OR: Campaign Tracking (for Client Client Leads)</h3>
            <p className="text-sm text-muted-foreground">Monitor campaign performance and client deliverables</p>
          </div>
        );
    }
  };

  return (
    <InteractMasterLayout
      activeCampaign={{
        id: "camp_001",
        name: "Q4 Product Launch",
        guid: "550e8400-e29b-41d4-a716-446655440000",
        workfrontId: "WF-2025-Q4-001",
      }}
    >
      {currentRole === "planning" ? (
        <PlanningView />
      ) : (
        <main className={currentRole === "task-owner" ? "w-full" : "max-w-[1400px] mx-auto px-6 py-6"}>
          <div className={`flex items-center justify-between ${currentRole === "task-owner" ? "px-4 py-2 border-b bg-white" : "mb-6"}`}>
            <div>
              {currentRole !== "task-owner" && (
                <>
                  <h1 className="text-2xl font-semibold text-foreground mb-0.5">Welcome to Interact</h1>
                  <p className="text-sm text-muted-foreground">Manage your workflow and campaigns efficiently</p>
                </>
              )}
            </div>
          </div>

          {renderDashboard()}

          {/* Draggable Sections - Only show for project-owner, task-owner, and approver roles */}
          {(currentRole !== "executive" && currentRole !== "campaign-manager" && currentRole !== "task-owner") && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="mt-6 space-y-6">
                  {sections.map((section) => (
                    <DraggableWidget key={section.id} id={section.id}>
                      {renderSection(section.id)}
                    </DraggableWidget>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </main>
      )}
    </InteractMasterLayout>
  );
};

export default Index;
