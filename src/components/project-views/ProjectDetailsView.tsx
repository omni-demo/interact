import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Plus, Pencil } from "lucide-react";

export function ProjectDetailsView() {
    return (
        <div className="flex flex-col h-full bg-white overflow-y-auto">
            {/* Toolbar */}
            <div className="px-6 py-2 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">Project Details</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button className="bg-red-600 hover:bg-red-700 text-white h-8 text-xs">
                        Summarize project
                    </Button>
                    <Input placeholder="Add custom form" className="h-8 w-48 text-xs" />
                    <div className="flex items-center border rounded-md h-8">
                        <Button variant="ghost" size="sm" className="h-full px-2 border-r rounded-none">
                            <ChevronRight className="w-4 h-4 rotate-180" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-full px-2 rounded-none">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl">
                {/* Left Column */}
                <div className="space-y-8">
                    {/* Overview */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                            <h2 className="text-lg font-bold text-slate-900">Overview</h2>
                        </div>

                        <div className="space-y-6 pl-6">
                            <div>
                                <h3 className="text-sm font-bold text-slate-700 mb-1">Description</h3>
                                <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0 hover:bg-transparent hover:underline text-xs">
                                    +Add
                                </Button>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-700 mb-2">Project condition</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-slate-500 mb-1">Condition Type</div>
                                        <div className="font-medium">Manual</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 mb-1">Condition</div>
                                        <div className="flex items-center gap-1 text-red-600 font-medium">
                                            <div className="w-2 h-2 rounded-full bg-red-600"></div>
                                            In Trouble
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 mb-1">Progress Status</div>
                                        <div className="flex items-center gap-1 text-red-600 font-medium">
                                            <div className="w-2 h-2 rounded-full bg-red-600"></div>
                                            In Trouble
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-700 mb-2">Project dates</h3>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                    <div className="col-span-2">
                                        <div className="text-slate-500 mb-1">Schedule Mode</div>
                                        <div className="font-medium">Standard</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-slate-500 mb-1">Start Date</div>
                                        <div className="font-medium">Dec 1, 2025 10:00 AM</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 mb-1">Planned Start Date</div>
                                        <div className="font-medium">Dec 1, 2025 10:00 AM</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 mb-1">Planned Completion Date</div>
                                        <div className="font-medium">Dec 1, 2025 6:00 PM</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 mb-1">Projected Start Date</div>
                                        <div className="font-medium">Dec 2, 2025 11:07 AM</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 mb-1">Projected Completion Date</div>
                                        <div className="font-medium">Dec 3, 2025 11:07 AM</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 mb-1">Actual Start Date</div>
                                        <div className="font-medium">N/A</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 mb-1">Actual Completion Date</div>
                                        <div className="font-medium">N/A</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-700 mb-2">Project stakeholders</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-slate-500 mb-1">Project Owner</div>
                                        <div className="font-medium text-blue-600">Jimmie Miller</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 mb-1">Project Sponsor</div>
                                        <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0 hover:bg-transparent hover:underline text-xs">
                                            +Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Basic Information */}
                    <section className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-4">Basic information</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            <div>
                                <div className="text-slate-500 mb-1">Reference Number</div>
                                <div className="font-medium">33200</div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Status</div>
                                <div className="flex items-center gap-1 text-red-600 font-medium">
                                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                                    Planning
                                </div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">URL</div>
                                <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0 hover:bg-transparent hover:underline text-xs">
                                    +Add
                                </Button>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Priority</div>
                                <div className="flex items-center gap-1 font-medium">
                                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                    Normal
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Project Association */}
                    <section className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-4">Project association</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <div className="text-slate-500 mb-1">Portfolio</div>
                                <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0 hover:bg-transparent hover:underline text-xs">
                                    +Add
                                </Button>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Program</div>
                                <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0 hover:bg-transparent hover:underline text-xs">
                                    +Add
                                </Button>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Group</div>
                                <div className="font-medium">01 Default Group</div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Company</div>
                                <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0 hover:bg-transparent hover:underline text-xs">
                                    +Add
                                </Button>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Parent Project</div>
                                <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0 hover:bg-transparent hover:underline text-xs">
                                    +Add
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Working Time */}
                    <section className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-4">Working time</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            <div>
                                <div className="text-slate-500 mb-1">Planned Hours</div>
                                <div className="font-medium">0 Hours</div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Actual Hours</div>
                                <div className="font-medium">0 Hours</div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Planned Duration</div>
                                <div className="font-medium">1 Day</div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Actual Duration</div>
                                <div className="font-medium">0 Days</div>
                            </div>
                        </div>
                    </section>

                    {/* Entry and Updates */}
                    <section className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-4">Entry and updates</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            <div>
                                <div className="text-slate-500 mb-1">Entry Date</div>
                                <div className="font-medium">Dec 1, 2025 8:28 AM</div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Entered By</div>
                                <div className="font-medium">Jimmie Miller</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
