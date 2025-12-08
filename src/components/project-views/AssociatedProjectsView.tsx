import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Settings, Layout } from "lucide-react";

export function AssociatedProjectsView() {
    return (
        <div className="flex flex-col h-full bg-white">
            {/* Toolbar */}
            <div className="px-4 py-2 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs font-medium gap-1 text-slate-700">
                        <Plus className="w-3 h-3" />
                        New Associated Project
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                    <div className="h-6 w-px bg-slate-300"></div>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600 text-xs">
                        <Filter className="w-3 h-3 mr-1" />
                        Projects I'm On
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600 text-xs">
                        <Settings className="w-3 h-3 mr-1" />
                        Standard
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600 text-xs">
                        <Layout className="w-3 h-3 mr-1" />
                        Nothing
                    </Button>
                </div>
            </div>

            {/* Empty State / Table Header */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 sticky top-0 z-10 text-xs font-semibold text-slate-600">
                        <tr>
                            <th className="p-2 border-b border-r border-slate-200 w-10 text-center">
                                <input type="checkbox" className="rounded border-slate-300" />
                            </th>
                            <th className="p-2 border-b border-r border-slate-200 min-w-[200px]">Name</th>
                            <th className="p-2 border-b border-r border-slate-200">Owner</th>
                            <th className="p-2 border-b border-r border-slate-200">Desc</th>
                            <th className="p-2 border-b border-r border-slate-200">Start On</th>
                            <th className="p-2 border-b border-r border-slate-200">Due On</th>
                            <th className="p-2 border-b border-slate-200">% Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={7} className="p-12 text-center text-slate-500">
                                <p className="text-sm">Associated projects will show here as you add them.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
