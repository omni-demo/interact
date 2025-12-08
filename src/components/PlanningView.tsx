import { useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface EntityCard {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
}

interface EntitySection {
  title: string;
  entities: EntityCard[];
  isExpanded: boolean;
}

export function PlanningView() {
  const navigate = useNavigate();
  
  const [sections, setSections] = useState<EntitySection[]>([
    {
      title: "POC",
      isExpanded: true,
      entities: [
        { id: "plan", title: "PLAN", icon: "✏️", color: "bg-orange-400" },
      ],
    },
    {
      title: "ADMIN ONLY",
      isExpanded: true,
      entities: [
        { id: "admin", title: "ADMIN | CLIENT MAN...", icon: "📋", color: "bg-pink-400" },
      ],
    },
    {
      title: "FOUNDATION ENTITIES",
      isExpanded: true,
      entities: [
        { id: "master-creative", title: "Master Creative", icon: "🎨", color: "bg-teal-400" },
        { id: "master-media", title: "Master Media", icon: "⚡", color: "bg-blue-500" },
        { id: "advertiser", title: "Advertiser", subtitle: "Synthetic data", icon: "📱", color: "bg-orange-300" },
        { id: "agency", title: "Agency", subtitle: "Synthetic data", icon: "❄️", color: "bg-cyan-300" },
        { id: "brand", title: "Brand", subtitle: "Synthetic data", icon: "🏷️", color: "bg-purple-400" },
        { id: "global-mdm", title: "Global MDM", icon: "🔗", color: "bg-purple-300" },
        { id: "client-mdm", title: "Client MDM", icon: "🔗", color: "bg-teal-600" },
        { id: "client", title: "Client", subtitle: "Synthetic data", icon: "💼", color: "bg-yellow-300" },
        { id: "client-teams", title: "Client Teams", icon: "✏️", color: "bg-yellow-400" },
        { id: "clients-config", title: "Clients Configurations", icon: "⚙️", color: "bg-yellow-200" },
        { id: "external-clients", title: "External Clients", icon: "🎯", color: "bg-indigo-300" },
        { id: "dictionaries", title: "Dictionaries", icon: "💼", color: "bg-red-500" },
        { id: "local-brands", title: "Local Brands", icon: "🌐", color: "bg-blue-400" },
        { id: "market-brief-events", title: "Market Brief Events", icon: "🎥", color: "bg-gray-400" },
        { id: "market-brief-members", title: "Market Brief Members", icon: "👥", color: "bg-gray-300" },
      ],
    },
  ]);

  const toggleSection = (index: number) => {
    setSections((prev) =>
      prev.map((section, i) =>
        i === index ? { ...section, isExpanded: !section.isExpanded } : section
      )
    );
  };

  return (
    <div className="h-full bg-[#f8f9fa] dark:bg-[#0f1419]">
      {/* Secondary Header */}
      <div className="bg-white dark:bg-[#1a1f2e] border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-secondary/50 rounded">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                O
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-semibold">OMNI+</h1>
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
            <Button size="sm">Share</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 overflow-auto h-[calc(100vh-14rem)]">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {sections.map((section, sectionIndex) => (
            <div key={section.title}>
              {/* Section Header */}
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="flex items-center gap-2 mb-3 hover:opacity-70 transition-opacity"
              >
                {section.isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  {section.title}
                </h2>
              </button>

              {/* Entity Grid */}
              {section.isExpanded && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {section.entities.map((entity) => (
                    <button
                      key={entity.id}
                      onClick={() => entity.id === "plan" && navigate("/plan")}
                      className="flex items-start gap-3 p-4 bg-white dark:bg-[#1a1f2e] border rounded-lg hover:shadow-md transition-shadow text-left group"
                    >
                      <div className={`w-12 h-12 ${entity.color} rounded flex items-center justify-center text-2xl flex-shrink-0`}>
                        {entity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate group-hover:text-primary">
                          {entity.title}
                        </h3>
                        {entity.subtitle && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {entity.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {/* Add Record Type Card */}
                  <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-[#1a1f2e] border border-dashed rounded-lg hover:border-primary hover:bg-secondary/20 transition-colors min-h-[80px]">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Add record type</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
