import { useState } from "react";
import {
  Star,
  Share2,
  MoreHorizontal,
  ChevronRight,
  Pin,
  Plus,
  Search,
  LayoutTemplate,
  BarChartHorizontal,
  Filter,
  Settings,
  List,
  MoreVertical,
  FileText,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Clock,
  Users,
  DollarSign,
  Calendar,
  Layout,
  MessageSquare,
  Folder,
  AlertTriangle,
  Camera,
  History,
  CreditCard,
  Receipt,
  BookOpen,
  Sparkles,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectDetailsView } from "@/components/project-views/ProjectDetailsView";
import { AssociatedProjectsView } from "@/components/project-views/AssociatedProjectsView";
import { BusinessCaseView } from "@/components/project-views/BusinessCaseView";
import { DocumentsView } from "@/components/project-views/DocumentsView";
import { GenericProjectView } from "@/components/project-views/GenericProjectView";

export function CustomizableTaskOwnerDashboard() {
  const [activeTab, setActiveTab] = useState("Tasks");

  const sidebarItems = [
    { name: "Tasks", icon: List },
    { name: "Project Details", icon: FileText },
    { name: "Associated projects", icon: Briefcase },
    { name: "Business Case", icon: Briefcase },
    { name: "Updates", icon: MessageSquare },
    { name: "Documents", icon: Folder },
    { name: "Issues (0)", icon: AlertCircle },
    { name: "Risks", icon: AlertTriangle },
    { name: "Approvals", icon: CheckCircle2 },
    { name: "Snapshots", icon: Camera },
    { name: "Baselines", icon: History },
    { name: "Rates", icon: DollarSign },
    { name: "Resource For Billing", icon: Users },
    { name: "Billing Records", icon: Receipt },
    { name: "Expenses", icon: CreditCard },
    { name: "Bookings", icon: BookOpen },
    { name: "Hours", icon: Clock },
    { name: "Workload Balancer", icon: Layout },
    { name: "People", icon: Users },
  ];

  const UpdatesView = () => (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Updates Toolbar */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <div className="text-slate-900 border-b-2 border-slate-900 pb-4 -mb-4 cursor-pointer">Comments</div>
          <div className="hover:text-slate-900 cursor-pointer">System activity</div>
          <div className="flex items-center gap-2 hover:text-slate-900 cursor-pointer">
            System activity
            <Badge variant="secondary" className="text-[10px] h-5 bg-slate-200 text-slate-600 hover:bg-slate-300">Beta</Badge>
          </div>
          <div className="hover:text-slate-900 cursor-pointer">All (read-only)</div>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white border-0 gap-2 h-8 text-xs">
            <Sparkles className="w-3 h-3" />
            Summarize comments
          </Button>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <Input placeholder="" className="pl-8 h-9 bg-white" />
          </div>
        </div>
      </div>

      {/* Updates Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* New Comment Input */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 mb-8 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 mb-2">New comment</div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
              JM
            </div>
            <div className="flex-1 border border-slate-200 rounded-md h-10 bg-white hover:border-slate-300 transition-colors cursor-text"></div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
            <MessageCircle className="w-16 h-16" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">No comments yet</h3>
          <p className="text-slate-500 text-sm">Give feedback, ask questions, or start a discussion by writing a comment</p>
        </div>
      </div>
    </div>
  );

  const TasksView = () => (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="px-4 py-2 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 rounded-sm px-3 text-xs font-medium gap-1">
            <Plus className="w-3 h-3" />
            New Task
          </Button>
          <div className="h-6 w-px bg-slate-300 mx-2"></div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
          <div className="h-6 w-px bg-slate-300"></div>
          <div className="flex items-center bg-slate-100 rounded p-0.5">
            <Button variant="ghost" size="sm" className="h-7 px-2 bg-white shadow-sm text-slate-700">
              <LayoutTemplate className="w-3 h-3 mr-1" />
              Board
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-500">
              <BarChartHorizontal className="w-3 h-3 mr-1" />
              Gantt
            </Button>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs font-medium text-slate-700">
            <Users className="w-3 h-3 mr-1" />
            Bulk Assignments
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600">
            <Filter className="w-3 h-3 mr-1" />
            Filters
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600">
            <Settings className="w-3 h-3 mr-1" />
            Standard
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600">
            <Layout className="w-3 h-3 mr-1" />
            Nothing
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-600">
            <List className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-600">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Task Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10 text-xs font-semibold text-slate-600">
            <tr>
              <th className="p-2 border-b border-r border-slate-200 w-10 text-center">
                <input type="checkbox" className="rounded border-slate-300" />
              </th>
              <th className="p-2 border-b border-r border-slate-200 w-12 text-center">#</th>
              <th className="p-2 border-b border-r border-slate-200 min-w-[200px]">Task Name</th>
              <th className="p-2 border-b border-r border-slate-200">Assignments</th>
              <th className="p-2 border-b border-r border-slate-200">Duration</th>
              <th className="p-2 border-b border-r border-slate-200">Pln Hrs</th>
              <th className="p-2 border-b border-r border-slate-200">Predecessors</th>
              <th className="p-2 border-b border-r border-slate-200">Start On</th>
              <th className="p-2 border-b border-r border-slate-200">Due On</th>
              <th className="p-2 border-b border-slate-200 w-32">% Complete</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-700">
            <tr className="hover:bg-blue-50 group">
              <td className="p-2 border-b border-r border-slate-100 text-center">
                <input type="checkbox" className="rounded border-slate-300" />
              </td>
              <td className="p-2 border-b border-r border-slate-100 text-center">1</td>
              <td className="p-2 border-b border-r border-slate-100 font-medium text-blue-600 hover:underline cursor-pointer">
                Process Diagram
              </td>
              <td className="p-2 border-b border-r border-slate-100">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-slate-400" />
                  <span>Jimmie Miller</span>
                </div>
              </td>
              <td className="p-2 border-b border-r border-slate-100">1 Day</td>
              <td className="p-2 border-b border-r border-slate-100">0 Hours</td>
              <td className="p-2 border-b border-r border-slate-100"></td>
              <td className="p-2 border-b border-r border-slate-100">12/1/25</td>
              <td className="p-2 border-b border-r border-slate-100">12/1/25</td>
              <td className="p-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-slate-200 rounded-sm overflow-hidden">
                    <div className="h-full bg-green-500 w-0"></div>
                  </div>
                  <span className="text-[10px]">0%</span>
                </div>
              </td>
            </tr>
            {/* Empty rows for visual filler */}
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-2 border-b border-r border-slate-100 h-8"></td>
                <td className="p-2 border-b border-r border-slate-100"></td>
                <td className="p-2 border-b border-r border-slate-100"></td>
                <td className="p-2 border-b border-r border-slate-100"></td>
                <td className="p-2 border-b border-r border-slate-100"></td>
                <td className="p-2 border-b border-r border-slate-100"></td>
                <td className="p-2 border-b border-r border-slate-100"></td>
                <td className="p-2 border-b border-r border-slate-100"></td>
                <td className="p-2 border-b border-r border-slate-100"></td>
                <td className="p-2 border-b border-slate-100"></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-2">
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs font-medium">
            + Add More Tasks
          </Button>
        </div>

        <div className="p-2 text-right text-xs text-slate-400">
          Showing 1 task
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Tasks":
        return <TasksView />;
      case "Project Details":
        return <ProjectDetailsView />;
      case "Associated projects":
        return <AssociatedProjectsView />;
      case "Business Case":
        return <BusinessCaseView />;
      case "Updates":
        return <UpdatesView />;
      case "Documents":
        return <DocumentsView />;
      default:
        return <GenericProjectView title={activeTab} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-slate-800 font-sans text-sm">
      {/* Top Bar - Pins */}
      <div className="flex items-center px-4 py-2 border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
        <div className="flex items-center gap-2 cursor-pointer hover:text-slate-800">
          <MenuIcon className="w-4 h-4" />
          <span className="font-semibold">PINS</span>
        </div>
        <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">
          <Pin className="w-3 h-3 rotate-45" />
          <span>Pin current page</span>
        </div>
      </div>

      {/* Project Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white">
              <LayoutTemplate className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PROJECT</div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">Demo Diagram Project</h1>
                <Star className="w-5 h-5 text-slate-400 cursor-pointer hover:text-yellow-400" />
                <Button variant="outline" size="sm" className="h-7 rounded-full text-xs gap-1 ml-2">
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-xs">
            <div>
              <div className="text-slate-500 mb-1">Percent Complete</div>
              <div className="font-semibold">0%</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Project Owner</div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">
                  JM
                </div>
                <span className="text-blue-600 hover:underline cursor-pointer">Jimmie Miller</span>
              </div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Planned Completion Date</div>
              <div className="font-semibold">Dec 1, 2025</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Condition</div>
              <div className="flex items-center gap-1 text-red-600 font-semibold">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                In Trouble
              </div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Status</div>
              <div className="flex items-center gap-1 text-red-600 font-semibold">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                Planning
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-140px)]">
        {/* Sidebar */}
        <div className="w-60 border-r border-slate-200 bg-slate-50 overflow-y-auto flex-shrink-0 h-full">
          <div
            className="flex items-center gap-2 px-4 py-3 text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={() => setActiveTab("Tasks")}
          >
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium">Tasks</span>
          </div>
          <div className="py-2">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer text-sm ${activeTab === item.name
                  ? "bg-white border-l-4 border-blue-600 text-slate-900 font-medium shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 border-l-4 border-transparent"
                  }`}
              >
                <item.icon className={`w-4 h-4 ${activeTab === item.name ? "text-slate-900" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
            ))}
            <div className="px-4 py-3 mt-2 border-t border-slate-200">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-slate-600">
                <Plus className="w-4 h-4" />
                Add a Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
