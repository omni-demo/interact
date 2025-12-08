import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
  Megaphone
} from "lucide-react";

export function CampaignManagerDashboard() {
  const campaignMetrics = [
    { label: "Active Campaigns", value: "12", change: "+3", icon: Megaphone, color: "text-blue-600" },
    { label: "Total Reach", value: "2.4M", change: "+18%", icon: Users, color: "text-purple-600" },
    { label: "Budget Utilization", value: "73%", change: "+5%", icon: DollarSign, color: "text-green-600" },
    { label: "Avg. Performance", value: "87%", change: "+12%", icon: TrendingUp, color: "text-orange-600" },
  ];

  const upcomingLaunches = [
    { name: "Spring Collection Launch", date: "Mar 15, 2026", status: "on-track", daysUntil: 12 },
    { name: "Social Media Blitz", date: "Mar 20, 2026", status: "at-risk", daysUntil: 17 },
    { name: "Email Campaign Series", date: "Mar 25, 2026", status: "on-track", daysUntil: 22 },
  ];

  const activeCampaigns = [
    { 
      name: "Q4 Product Launch", 
      status: "active", 
      engagement: "High",
      budget: "$450K",
      spent: "$340K",
      completion: 75
    },
    { 
      name: "Holiday Marketing", 
      status: "active", 
      engagement: "Medium",
      budget: "$320K",
      spent: "$195K",
      completion: 60
    },
    { 
      name: "Brand Awareness Campaign", 
      status: "review", 
      engagement: "High",
      budget: "$280K",
      spent: "$240K",
      completion: 85
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "at-risk":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {campaignMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${metric.color}`} />
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Campaigns */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCampaigns.map((campaign) => (
                <div key={campaign.name} className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{campaign.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="outline" className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        <span>Engagement: {campaign.engagement}</span>
                        <span>{campaign.spent} / {campaign.budget}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Campaign Progress</span>
                      <span className="font-medium">{campaign.completion}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${campaign.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Launches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Launches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingLaunches.map((launch) => (
                <div key={launch.name} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm truncate">{launch.name}</h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        {launch.date}
                      </p>
                    </div>
                    {launch.status === "on-track" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {launch.daysUntil} days until launch
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Campaign Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Impressions</p>
              <p className="text-2xl font-bold">4.2M</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 23% vs last month</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Click-Through Rate</p>
              <p className="text-2xl font-bold">3.8%</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 0.4% vs last month</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold">2.1%</p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">↓ 0.2% vs last month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            Multi-Channel Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* TV */}
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold">TV</h4>
                </div>
                <Badge variant="secondary" className="text-xs">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reach</span>
                  <span className="font-medium">1.8M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GRP</span>
                  <span className="font-medium">245</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">$450K</span>
                </div>
              </div>
            </div>

            {/* Digital/Internet */}
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h4 className="font-semibold">Digital</h4>
                </div>
                <Badge variant="secondary" className="text-xs">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Impressions</span>
                  <span className="font-medium">3.2M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CTR</span>
                  <span className="font-medium">4.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">$320K</span>
                </div>
              </div>
            </div>

            {/* Film/Cinema */}
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                    <svg className="w-4 h-4 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold">Film</h4>
                </div>
                <Badge variant="secondary" className="text-xs">Planning</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Theaters</span>
                  <span className="font-medium">850</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Screens</span>
                  <span className="font-medium">2,400</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">$180K</span>
                </div>
              </div>
            </div>

            {/* Store/Retail */}
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold">Retail</h4>
                </div>
                <Badge variant="secondary" className="text-xs">Active</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Locations</span>
                  <span className="font-medium">1,250</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Foot Traffic</span>
                  <span className="font-medium">485K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">$280K</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
