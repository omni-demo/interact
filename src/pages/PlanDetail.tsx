import { useState } from "react";
import { ChevronDown, Plus, Search, Filter, SortAsc, Grid3x3, Eye, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { useNavigate } from "react-router-dom";

interface Campaign {
  id: number;
  name: string;
  client: {
    name: string;
    icon: string;
  };
  industry: string;
  brand: {
    name: string;
    color: string;
  };
  objective: string;
  masterProject: {
    name: string;
    icon: string;
  };
  startDate: string;
}

export default function PlanDetail() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedView, setSelectedView] = useState("ADMIN");

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: "Pep-Z Generation",
      client: { name: "PepsiCo", icon: "🥤" },
      industry: "Food & Beverage",
      brand: { name: "Pepsi-Cola", color: "bg-red-500" },
      objective: "",
      masterProject: { name: "Pep-Z Generation Master Cam...", icon: "📊" },
      startDate: "11/03/2025",
    },
    {
      id: 2,
      name: "iPod X",
      client: { name: "Apple", icon: "🍎" },
      industry: "Technology",
      brand: { name: "iPod", color: "bg-orange-600" },
      objective: "",
      masterProject: { name: "The return of the iPod", icon: "📊" },
      startDate: "07/09/2025",
    },
    {
      id: 3,
      name: "Landline Campaign",
      client: { name: "AT&T", icon: "🌐" },
      industry: "Telecommunications",
      brand: { name: "Corded Phones", color: "bg-red-500" },
      objective: "Listening",
      masterProject: { name: "", icon: "" },
      startDate: "10/13/2025",
    },
    {
      id: 4,
      name: "Nissan Rogue EV EMEA Campaign 25",
      client: { name: "Nissan", icon: "🚗" },
      industry: "Automotive",
      brand: { name: "Rogue", color: "bg-yellow-500" },
      objective: "sell 100,000 Nissan Rogues in FY 26",
      masterProject: { name: "", icon: "" },
      startDate: "11/19/2025",
    },
    {
      id: 5,
      name: "Apple iPhone 18 Campaign",
      client: { name: "Apple", icon: "🍎" },
      industry: "Technology",
      brand: { name: "iPhone", color: "bg-purple-500" },
      objective: "Make some great things happen and sell a billion iphones",
      masterProject: { name: "Apple iPhone 18 Campaign", icon: "📊" },
      startDate: "12/26/2025",
    },
    {
      id: 6,
      name: "Starry Starry Night",
      client: { name: "PepsiCo", icon: "🥤" },
      industry: "Food & Beverage",
      brand: { name: "Starry", color: "bg-green-500" },
      objective: "Capture 45% of the 65-85 year old lemon lime beverage share",
      masterProject: { name: "", icon: "" },
      startDate: "11/13/2025",
    },
    {
      id: 7,
      name: "MacBook Amateur",
      client: { name: "Apple", icon: "🍎" },
      industry: "Technology",
      brand: { name: "MacBook", color: "bg-pink-500" },
      objective: "Introduce a new line of macbooks for non-professionals in Spring 26",
      masterProject: { name: "MacBook Amateur Master Prj...", icon: "📊" },
      startDate: "04/02/2026",
    },
  ]);

  const handleNewRecord = () => {
    const newId = campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) + 1 : 1;
    const newRecord: Campaign = {
      id: newId,
      name: "",
      client: { name: "", icon: "📝" },
      industry: "",
      brand: { name: "", color: "bg-gray-200" },
      objective: "",
      masterProject: { name: "", icon: "📊" },
      startDate: ""
    };
    setCampaigns([...campaigns, newRecord]);
  };

  const updateCampaign = (id: number, field: string, value: any) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === id) {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            return { 
              ...c, 
              [parent]: { 
                ...c[parent as keyof Campaign] as any, 
                [child]: value 
              } 
            };
        }
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  return (
    <InteractMasterLayout
      currentUser={{
        name: "John Miller",
        role: "planning",
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
      <div className="h-full bg-white dark:bg-[#1a1f2e] flex flex-col">
        {/* Top Header Bar */}
        <div className="border-b px-4 py-2 flex items-center justify-between bg-gray-50 dark:bg-[#0f1419]">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button className="hover:text-foreground">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M9 6l-6 6 6 6" />
            </svg>
          </button>
          <span className="text-xs">PINS</span>
          <button className="flex items-center gap-1 hover:text-foreground">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="text-xs">Pin current page</span>
          </button>
        </div>
      </div>

      {/* Main Header with Workspace Info */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/?view=planning")} className="p-2 hover:bg-secondary/50 rounded">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-bold">
                📝
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">OMNI+</span>
                  <h1 className="text-lg font-semibold">PLAN</h1>
                  <ChevronDown className="w-4 h-4" />
                  <button className="p-1 hover:bg-secondary/50 rounded">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </button>
                </div>
                <div className="text-xs text-muted-foreground">WORKSPACE</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <span className="mr-2">💬</span>
              Feedback
            </Button>
            <button className="p-2 hover:bg-secondary/50 rounded">
              <Clock className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-secondary/50 rounded">
              <Star className="w-4 h-4" />
            </button>
            <ChevronDown className="w-4 h-4" />
            <Button size="sm">Share</Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleNewRecord}>
              New record
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">
                <div className="flex items-center gap-2">
                  <Grid3x3 className="w-4 h-4" />
                  <span>ADMIN</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>

          <Button variant="outline" size="sm" className="gap-2">
            <SortAsc className="w-4 h-4" />
            Sort
          </Button>

          <Button variant="outline" size="sm" className="gap-2">
            <Grid3x3 className="w-4 h-4" />
            Grouping
          </Button>

          <Button variant="outline" size="sm" className="gap-2 text-blue-600 border-blue-600">
            <Eye className="w-4 h-4" />
            Fields
          </Button>

          <Button variant="outline" size="sm" className="gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Row colors
          </Button>

          <Button variant="outline" size="sm" className="gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
            Row height
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[200px] h-9"
            />
          </div>
          <button className="p-2 hover:bg-secondary/50 rounded">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto min-h-[500px]">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-[#0f1419] sticky top-0 z-10">
            <tr className="border-b">
              <th className="w-12 px-4 py-3">
                <Checkbox />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Campaign Name
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Client
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Industry Sector (from Client)
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Brand/Product
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  Objective
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Master Campaign Project
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Start Date
                </div>
              </th>
              <th className="w-12 px-4 py-3">
                <Plus className="w-4 h-4" />
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={campaign.id} className="border-b hover:bg-secondary/20 group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{index + 1}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Input
                    value={campaign.name}
                    onChange={(e) => updateCampaign(campaign.id, 'name', e.target.value)}
                    className="h-8 border-transparent hover:border-input focus:border-input bg-transparent shadow-none px-2 -ml-2 w-full text-foreground"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{campaign.client.icon}</span>
                    <Input
                      value={campaign.client.name}
                      onChange={(e) => updateCampaign(campaign.id, 'client.name', e.target.value)}
                      className="h-8 border-transparent hover:border-input focus:border-input bg-transparent shadow-none px-2 -ml-2 w-full text-foreground"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                   <Input
                    value={campaign.industry}
                    onChange={(e) => updateCampaign(campaign.id, 'industry', e.target.value)}
                    className="h-8 border-transparent hover:border-input focus:border-input bg-transparent shadow-none px-2 -ml-2 w-full text-foreground"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${campaign.brand.color}`}></div>
                    <Input
                      value={campaign.brand.name}
                      onChange={(e) => updateCampaign(campaign.id, 'brand.name', e.target.value)}
                      className="h-8 border-transparent hover:border-input focus:border-input bg-transparent shadow-none px-2 -ml-2 w-full text-foreground"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                   <Input
                    value={campaign.objective}
                    onChange={(e) => updateCampaign(campaign.id, 'objective', e.target.value)}
                    className="h-8 border-transparent hover:border-input focus:border-input bg-transparent shadow-none px-2 -ml-2 w-full text-foreground"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {campaign.masterProject.name && (
                      <div className="w-6 h-6 rounded bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs">{campaign.masterProject.icon}</span>
                      </div>
                    )}
                    <Input
                      value={campaign.masterProject.name}
                      onChange={(e) => updateCampaign(campaign.id, 'masterProject.name', e.target.value)}
                      className="h-8 border-transparent hover:border-input focus:border-input bg-transparent shadow-none px-2 -ml-2 w-full text-foreground"
                      placeholder={!campaign.masterProject.name ? "Add master project..." : ""}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                   <Input
                    value={campaign.startDate}
                    onChange={(e) => updateCampaign(campaign.id, 'startDate', e.target.value)}
                    className="h-8 border-transparent hover:border-input focus:border-input bg-transparent shadow-none px-2 -ml-2 w-full text-foreground"
                  />
                </td>
                <td className="px-4 py-3">
                  <button className="opacity-0 group-hover:opacity-100">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                      <circle cx="5" cy="12" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Bottom Bar */}
        <div className="border-t px-4 py-2 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="gap-2" onClick={handleNewRecord}>
            <Plus className="w-4 h-4" />
            New record
          </Button>
        </div>
      </div>
    </InteractMasterLayout>
  );
}
