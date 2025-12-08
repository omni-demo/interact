import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, LayoutGrid, List, ArrowUpDown } from "lucide-react";

export function DocumentsView() {
    return (
        <div className="flex h-full bg-white">
            {/* Sidebar - Folders */}
            <div className="w-64 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                        <Plus className="w-3 h-3" />
                        Add new
                    </Button>
                </div>
                <div className="p-2">
                    <div className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded cursor-pointer">
                        <ChevronRight className="w-3 h-3" />
                        PROJECT FOLDERS (0)
                    </div>
                </div>
            </div>

            {/* Main Content - File List */}
            <div className="flex-1 flex flex-col">
                {/* Toolbar */}
                <div className="px-4 py-2 border-b border-slate-200 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="hover:text-blue-600 cursor-pointer">PROJECT FOLDERS (0)</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center border rounded h-8">
                            <Button variant="ghost" size="sm" className="h-full px-2 border-r rounded-none text-slate-600">
                                <LayoutGrid className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-full px-2 rounded-none bg-slate-100 text-blue-600">
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600 gap-1">
                            <ArrowUpDown className="w-3 h-3" />
                            Date Modified
                        </Button>
                    </div>
                </div>

                {/* Empty State */}
                <div className="flex-1 flex items-center justify-center bg-slate-50/30">
                    <div className="text-center">
                        <p className="text-slate-400 text-sm">No documents found</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
