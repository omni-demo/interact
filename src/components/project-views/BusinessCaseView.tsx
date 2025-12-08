import { Button } from "@/components/ui/button";
import { Pencil, Calculator, AlertTriangle, ThumbsUp, GitMerge, FileOutput } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BusinessCaseView() {
    return (
        <div className="flex h-full bg-white overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl space-y-10">

                    {/* Project Info */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Project Info</h2>
                            <Pencil className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                        </div>
                        <div className="grid grid-cols-3 gap-8 text-sm">
                            <div>
                                <div className="text-slate-500 mb-1">Description</div>
                                <div className="font-medium">None</div>
                            </div>
                            <div></div>
                            <div></div>

                            <div>
                                <div className="text-slate-500 mb-1">Project Owner</div>
                                <div className="font-medium">Jimmie Miller</div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Project Sponsor</div>
                                <div className="font-medium">None</div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Portfolio</div>
                                <div className="font-medium">None</div>
                            </div>

                            <div>
                                <div className="text-slate-500 mb-1">Status</div>
                                <div className="font-medium">Planning</div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Fixed Start Date</div>
                                <div className="font-medium">None</div>
                            </div>
                            <div>
                                <div className="text-slate-500 mb-1">Fixed End Date</div>
                                <div className="font-medium">None</div>
                            </div>
                        </div>
                    </section>

                    {/* Goals */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Goals</h2>
                            <Pencil className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                        </div>
                        <p className="text-sm text-slate-500 italic">No goals added</p>
                    </section>

                    {/* Expenses */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Expenses</h2>
                            <Pencil className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                        </div>
                        <p className="text-sm text-slate-500 italic">No expenses added</p>
                    </section>

                    {/* Resource Budgeting */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Resource Budgeting</h2>
                            <Pencil className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                        </div>
                        <p className="text-sm text-slate-500">This is the Labor Cost of the resources budgeted in the Resource Planner</p>
                    </section>

                    {/* Risks */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Risks</h2>
                            <Pencil className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                        </div>
                        <p className="text-sm text-slate-500 italic">No risks added</p>
                    </section>

                    {/* Scorecard */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Scorecard</h2>
                            <Pencil className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                        </div>
                        <p className="text-sm text-slate-500 italic">No scorecards added</p>
                    </section>
                </div>
            </div>

            {/* Right Sidebar - Business Case Summary */}
            <div className="w-80 p-6 border-l border-slate-200 bg-slate-50">
                <Card className="shadow-sm">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-base font-bold">Business Case</CardTitle>
                        <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                            <FileOutput className="w-3 h-3" />
                            Export
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-xs text-slate-500 mb-1">Summary</div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Calculator className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <div className="text-xs font-medium text-slate-500">Net Value</div>
                                <div className="text-sm font-bold">$0.00</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 flex items-center justify-center border border-slate-400 rounded text-[10px] font-bold text-slate-500 mt-0.5">$</div>
                            <div>
                                <div className="text-xs font-medium text-slate-500">Budgeted Cost</div>
                                <div className="text-sm font-bold">$0.00</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <div className="text-xs font-medium text-slate-500">Potential Risk</div>
                                <div className="text-sm font-bold">$0.00</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <ThumbsUp className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <div className="text-xs font-medium text-slate-500">Planned Benefit</div>
                                <div className="text-sm font-bold">$0.00</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <GitMerge className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                                <div className="text-xs font-medium text-slate-500">Aligned</div>
                                <div className="text-sm font-bold">0%</div>
                            </div>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Submit
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
