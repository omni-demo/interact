import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export function ExecutiveDashboard() {
  const metrics = [
    { label: "Active Campaigns", value: "24", change: "+3", icon: BarChart3 },
    { label: "Total Budget", value: "$2.4M", change: "+12%", icon: DollarSign },
    { label: "Team Members", value: "47", change: "+5", icon: Users },
    { label: "ROI Average", value: "3.2x", change: "+0.4x", icon: TrendingUp },
  ];

  const campaigns = [
    { name: "Q4 Product Launch", market: "North America", status: "On Track", budget: "$450K", progress: 75 },
    { name: "Holiday Marketing", market: "Global", status: "On Track", budget: "$320K", progress: 60 },
    { name: "Brand Refresh", market: "Europe", status: "At Risk", budget: "$280K", progress: 45 },
    { name: "Spring Campaign 2026", market: "Asia Pacific", status: "Planning", budget: "$550K", progress: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs">
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{campaign.market}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={
                        campaign.status === "On Track" ? "default" : 
                        campaign.status === "At Risk" ? "destructive" : 
                        "secondary"
                      }
                    >
                      {campaign.status}
                    </Badge>
                    <span className="text-sm font-medium">{campaign.budget}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        campaign.status === "At Risk" ? "bg-destructive" : "bg-primary"
                      }`}
                      style={{ width: `${campaign.progress}%` }}
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
