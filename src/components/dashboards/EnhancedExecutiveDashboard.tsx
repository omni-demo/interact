import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  AlertTriangle,
  Target,
  Zap,
  BarChart3,
  PieChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export function EnhancedExecutiveDashboard() {
  // Portfolio health metrics
  const portfolioMetrics = [
    {
      label: "Active Campaigns",
      value: "24",
      change: "+3",
      trend: "up",
      icon: Target,
      color: "text-blue-600",
    },
    {
      label: "Total Budget",
      value: "$4.2M",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "Resource Utilization",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "At Risk Projects",
      value: "3",
      change: "-1",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  // Budget burn rate by month
  const budgetData = [
    { month: "Jan", planned: 650, actual: 620, forecast: 650 },
    { month: "Feb", planned: 600, actual: 580, forecast: 600 },
    { month: "Mar", planned: 550, actual: 530, forecast: 550 },
    { month: "Apr", planned: 500, actual: 490, forecast: 500 },
    { month: "May", planned: 450, actual: null, forecast: 430 },
    { month: "Jun", planned: 400, actual: null, forecast: 380 },
  ];

  // Campaign performance by type
  const campaignTypeData = [
    { name: "Product Launch", value: 35, campaigns: 8, roi: 245 },
    { name: "Brand Awareness", value: 25, campaigns: 6, roi: 180 },
    { name: "Lead Generation", value: 20, campaigns: 5, roi: 320 },
    { name: "Content Marketing", value: 15, campaigns: 4, roi: 150 },
    { name: "Event Marketing", value: 5, campaigns: 1, roi: 110 },
  ];

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

  // Timeline metrics
  const timelineData = [
    { quarter: "Q1 2025", onTime: 12, delayed: 2, completed: 14 },
    { quarter: "Q2 2025", onTime: 15, delayed: 3, completed: 18 },
    { quarter: "Q3 2025", onTime: 18, delayed: 1, completed: 19 },
    { quarter: "Q4 2025", onTime: 10, delayed: 2, completed: 0 },
  ];

  // AI recommendations
  const aiRecommendations = [
    {
      id: "1",
      priority: "high",
      title: "Budget Reallocation Opportunity",
      description: "Shift 15% from underperforming Display to high-ROI Video campaigns",
      impact: "$120K potential savings",
      confidence: 92,
    },
    {
      id: "2",
      priority: "medium",
      title: "Resource Constraint Alert",
      description: "Design team at 95% capacity - may impact Q2 deliverables",
      impact: "3 campaigns at risk",
      confidence: 88,
    },
    {
      id: "3",
      priority: "high",
      title: "Campaign Success Pattern Detected",
      description: "Product launches with 6+ week lead time show 45% better ROI",
      impact: "Apply to 5 upcoming campaigns",
      confidence: 95,
    },
  ];

  // Strategic initiatives
  const strategicInitiatives = [
    { name: "Market Expansion", coverage: 85, campaigns: 12, budget: 1200000 },
    { name: "Digital Transformation", coverage: 70, campaigns: 8, budget: 800000 },
    { name: "Brand Refresh", coverage: 60, campaigns: 6, budget: 600000 },
    { name: "Customer Retention", coverage: 90, campaigns: 15, budget: 900000 },
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {metric.label}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold">{metric.value}</h3>
                      <Badge
                        variant={metric.trend === "up" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-secondary ${metric.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Burn Rate */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Budget Burn Rate & Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="planned"
                  stackId="1"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stackId="2"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stackId="3"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.4}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Planned YTD</div>
                <div className="text-xl font-bold">$2.5M</div>
              </div>
              <div>
                <div className="text-muted-foreground">Actual Spend</div>
                <div className="text-xl font-bold text-blue-600">$1.8M</div>
              </div>
              <div>
                <div className="text-muted-foreground">Variance</div>
                <div className="text-xl font-bold text-green-600">-28%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Mix */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Campaign Portfolio Mix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartPieChart>
                <Pie
                  data={campaignTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {campaignTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {campaignTypeData.map((type, index) => (
                <div key={type.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span>{type.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{type.campaigns} campaigns</span>
                    <Badge variant="outline" className="text-[10px]">
                      {type.roi}% ROI
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Performance & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline Delivery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline Delivery Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="onTime" stackId="a" fill="#10b981" name="On Time" />
                <Bar dataKey="delayed" stackId="a" fill="#ef4444" name="Delayed" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <div className="text-sm text-muted-foreground">Average On-Time Delivery</div>
              <div className="text-2xl font-bold text-green-600">89%</div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                AI-Powered Recommendations
              </CardTitle>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                3 New
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={rec.priority === "high" ? "destructive" : "secondary"}
                        className="text-[10px]"
                      >
                        {rec.priority}
                      </Badge>
                      <h4 className="text-sm font-medium">{rec.title}</h4>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {rec.confidence}% conf
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary">
                      {rec.impact}
                    </span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-6 text-xs">
                        Dismiss
                      </Button>
                      <Button size="sm" className="h-6 text-xs">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Initiative Coverage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Strategic Initiative Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategicInitiatives.map((initiative) => (
              <div key={initiative.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{initiative.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {initiative.campaigns} campaigns
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      ${(initiative.budget / 1000000).toFixed(1)}M
                    </span>
                    <span className="font-medium">{initiative.coverage}%</span>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${initiative.coverage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
