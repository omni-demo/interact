import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight,
    BookOpen,
    GraduationCap,
    Box,
    Tv,
    CalendarRange,
    Sparkles
} from "lucide-react";
import { MyProjectsTable } from "@/components/MyProjectsTable";

const DesignConsole = () => {
    return (
        <InteractMasterLayout>
            <div className="max-w-[1600px] mx-auto px-6 py-6 font-sans">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span>&gt;</span>
                    <span className="font-medium text-foreground">Design Console</span>
                </div>

                {/* Top Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-sm cursor-pointer transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <Tv className="h-5 w-5 text-slate-600" />
                            <span className="font-semibold text-slate-900">Create Media Strategy</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-sm cursor-pointer transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <CalendarRange className="h-5 w-5 text-slate-600" />
                            <span className="font-semibold text-slate-900">Planning Agent</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Banner */}
                <div className="bg-white p-4 rounded-lg border border-slate-200 mb-6 flex items-center justify-between hover:shadow-sm cursor-pointer transition-all group">
                    <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-slate-600" />
                        <span className="font-semibold text-slate-900">Introducing Planning Agent</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Main Grid: Notifications & Tasks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Notifications */}
                    <Card className="h-full border-slate-200 shadow-sm">
                        <CardHeader className="pb-3 border-b border-slate-100">
                            <CardTitle className="text-lg font-bold text-slate-800">Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-24 text-center h-[300px]">
                            <p className="text-slate-500 mb-1">You are all caught up!</p>
                            <p className="text-slate-400 text-sm">There are no new notifications available.</p>
                        </CardContent>
                    </Card>

                    {/* Tasks */}
                    <MyProjectsTable />
                </div>

                {/* Training and Resource Center */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-800">Training and Resource Center</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* User Guides */}
                        <div className="bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-between hover:shadow-sm cursor-pointer transition-shadow group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                    <BookOpen size={20} />
                                </div>
                                <span className="font-semibold text-sm text-slate-700">User Guides</span>
                            </div>
                            <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </div>

                        {/* Academy */}
                        <div className="bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-between hover:shadow-sm cursor-pointer transition-shadow group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                    <GraduationCap size={20} />
                                </div>
                                <span className="font-semibold text-sm text-slate-700">Academy</span>
                            </div>
                            <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </div>

                        {/* Product Resources */}
                        <div className="bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-between hover:shadow-sm cursor-pointer transition-shadow group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                    <Box size={20} />
                                </div>
                                <span className="font-semibold text-sm text-slate-700">Product Resources</span>
                            </div>
                            <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </InteractMasterLayout>
    );
};

export default DesignConsole;
