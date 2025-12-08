import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Sparkles } from "lucide-react";
import { MyProjectsTable } from "@/components/MyProjectsTable";


const ResearchConsoleDetail = () => {
  return (
    <InteractMasterLayout
      currentUser={{
        name: "John Miller",
        role: "project-owner",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        tenantId: "bbdo",
        tenantName: "BBDO (and its network including AMV BBDO, adam&eveDDB)",
      }}
    >
      <main className="max-w-[1400px] mx-auto px-6 py-6 pb-32">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </a>
          <span className="text-muted-foreground">›</span>
          <span className="font-medium text-foreground">Research Console</span>
        </div>

        {/* Top Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-lg font-semibold">Adobe Workfront</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors cursor-pointer group relative opacity-60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-muted-foreground">Analyze Creative Capital</span>
                    <Badge variant="outline" className="text-xs border-2">
                      AVAILABLE SOON
                    </Badge>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-1">You are all caught up!</p>
                <p className="text-sm text-muted-foreground">
                  There are no new notifications available.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tasks */}
          <div className="h-full">
            <MyProjectsTable />
          </div>

        </div>

        {/* Training and Resource Center */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Training and Resource Center</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">User Guides</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Academy</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Product Resources</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </InteractMasterLayout>
  );
};

export default ResearchConsoleDetail;
