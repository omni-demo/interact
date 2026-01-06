import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
    ChevronRight,
    Send,
    FileBox,
    Bell,
    CheckSquare,
} from "lucide-react";
import { MyProjectsTable } from "@/components/MyProjectsTable";

const ProductionConsole = () => {
    const navigate = useNavigate();

    return (
        <InteractMasterLayout>
            <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-8">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-muted-foreground">
                    <span className="hover:text-foreground cursor-pointer">Home</span>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-medium text-foreground">Production Console</span>
                </div>

                {/* Top Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-card p-4 rounded-lg border shadow-sm flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors group">
                        <div className="flex items-center gap-3">
                            <Send className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-primary" />
                            <span className="font-medium">Manage Assets</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div
                        className="bg-white dark:bg-card p-4 rounded-lg border shadow-sm flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors group"
                        onClick={() => navigate("/proof-approval")}
                    >
                        <div className="flex items-center gap-3">
                            <FileBox className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-primary" />
                            <span className="font-medium">Proof Approval</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Notifications */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col items-center justify-center text-center p-6">
                            <div className="mb-4 text-muted-foreground/30">
                                {/* Placeholder for illustration */}
                                <Bell className="w-16 h-16 opacity-20" />
                            </div>
                            <p className="text-muted-foreground">You are all caught up!</p>
                            <p className="text-muted-foreground text-sm">There are no new notifications available.</p>
                        </CardContent>
                    </Card>

                    {/* Tasks */}
                    <div className="h-[400px]">
                        <MyProjectsTable />
                    </div>
                </div>

                {/* Training and Resource Center */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-foreground">Training and Resource Center</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-card p-4 rounded-lg border shadow-sm flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <span className="font-medium">User Guides</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="bg-white dark:bg-card p-4 rounded-lg border shadow-sm flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <span className="font-medium">Academy</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="bg-white dark:bg-card p-4 rounded-lg border shadow-sm flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <span className="font-medium">Product Resources</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </InteractMasterLayout>
    );
};

export default ProductionConsole;
