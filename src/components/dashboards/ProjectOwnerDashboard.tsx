import { DashboardCard } from "@/components/DashboardCard";
import { ConsoleButton } from "@/components/ConsoleButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";

export function ProjectOwnerDashboard() {
  const campaigns = [
    { name: "Q4 Product Launch", status: "In Progress", deadline: "Dec 15, 2025", tasks: 12, completed: 8 },
    { name: "Holiday Marketing Campaign", status: "Planning", deadline: "Nov 20, 2025", tasks: 8, completed: 2 },
    { name: "Brand Refresh Initiative", status: "In Progress", deadline: "Jan 30, 2026", tasks: 15, completed: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Mine"
          description="Mine for Audience and Cultural Insights"
          backgroundImage="/interact/mine.png"
        >
          <div className="space-y-2">
            <ConsoleButton label="Research Console" />
            <ConsoleButton label="Audience Console" />
            <ConsoleButton label="Planning" href="/?view=planning" />
          </div>
        </DashboardCard>

        <DashboardCard
          title="Make"
          description="Make Marketing Campaigns with Transparent Inventory"
          backgroundImage="/interact/make.png"
        >
          <div className="space-y-2">
            <ConsoleButton label="Design Console" />
            <ConsoleButton label="Investment Console" />
            <ConsoleButton label="Production Console" />
          </div>
        </DashboardCard>

        <DashboardCard
          title="Manage"
          description="Manage, Optimize and Measure Performance of Marketing Campaigns"
          backgroundImage="/interact/manage.png"
        >
          <div className="space-y-2">
            <ConsoleButton label="Activation Console" />
            <ConsoleButton label="Content Console" />
          </div>
        </DashboardCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            My Open Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign, idx) => (
              <div key={idx} className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={campaign.status === "In Progress" ? "default" : "secondary"}>
                        {campaign.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {campaign.deadline}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Tasks Progress</span>
                    <span className="font-medium">{campaign.completed}/{campaign.tasks}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(campaign.completed / campaign.tasks) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
