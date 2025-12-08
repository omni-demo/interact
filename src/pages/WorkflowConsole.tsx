import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Globe, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import { MyProjectsTable } from "@/components/MyProjectsTable";

const WorkflowConsole = () => {
    return (
        <InteractMasterLayout
            currentUser={{
                name: "John Miller",
                role: "project-owner",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                tenantId: "bbdo",
                tenantName: "BBDO (and its network including AMV BBDO, adam&eveDDB)",
            }}
            activeCampaign={{
                id: "camp_001",
                name: "Q4 Product Launch",
                guid: "550e8400-e29b-41d4-a716-446655440000",
                workfrontId: "WF-2025-Q4-001",
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 py-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span>&gt;</span>
                    <span className="font-medium text-foreground">Workflow Console</span>
                </div>

                {/* Top Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Left Card - Adobe Workfront */}
                    <Link
                        to="/project-module"
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all bg-white dark:bg-card border border-border hover:border-primary/50 cursor-pointer no-underline group shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Globe className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                                Adobe Workfront
                            </span>
                        </div>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-muted-foreground group-hover:text-primary" />
                    </Link>

                    {/* Right Card - Project Module */}
                    <Link
                        to="/project-module"
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all bg-white dark:bg-card border border-border hover:border-primary/50 cursor-pointer no-underline group shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Layout className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                                Project Module
                            </span>
                        </div>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-muted-foreground group-hover:text-primary" />
                    </Link>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Notifications Section */}
                    <Card className="h-[500px]">
                        <CardContent className="p-6 h-full flex flex-col">
                            <h2 className="text-xl font-semibold text-[#1e293b] mb-4">Notifications</h2>
                            <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
                                <p className="mb-1">You are all caught up!</p>
                                <p>There are no new notifications available.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tasks Section */}
                    <div className="h-[500px]">
                        <MyProjectsTable />
                    </div>
                </div>

                {/* Training and Resource Center */}
                <div>
                    <h2 className="text-xl font-semibold text-[#1e293b] mb-4">Training and Resource Center</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                            <CardContent className="p-4 flex items-center justify-between">
                                <span className="font-medium">User Guides</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                            <CardContent className="p-4 flex items-center justify-between">
                                <span className="font-medium">Academy</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                            <CardContent className="p-4 flex items-center justify-between">
                                <span className="font-medium">Product Resources</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </InteractMasterLayout>
    );
};

export default WorkflowConsole;
