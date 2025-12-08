import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { RoleSelector, UserRole } from "./RoleSelector";

interface ConsoleNavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

interface ConsoleSection {
  title: string;
  items: {
    code: string;
    label: string;
    path?: string;
    variant?: "default" | "solid";
  }[];

}

export function ConsoleNavigationMenu({ isOpen, onClose, currentRole, onRoleChange }: ConsoleNavigationMenuProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Audience Console",
    "Research Console",
    "Workflow Console",
    "Investment Console",
    "Activation Console",
    "Production Console",
    "Content Console",
    "Data Management Console",
    "Internal Tools",
    "Training and Resources",
  ]);

  const consoleSections: ConsoleSection[] = [
    {
      title: "Audience Console",
      items: [
        { code: "AC", label: "Audience Console", path: "/audience-console" },
      ],
    },
    {
      title: "Research Console",
      items: [
        { code: "ECI", label: "Explore Cultural Insights", path: "/research-console" },
      ],
    },

    {
      title: "Workflow Console",
      items: [
        { code: "CMS", label: "Create Media Strategy" },
      ],
    },
    {
      title: "Investment Console",
      items: [
        { code: "DP", label: "Discover Partnerships" },
      ],
    },
    {
      title: "Activation Console",
      items: [
        { code: "DT", label: "Define Taxonomies" },
        { code: "BC", label: "Build Campaigns" },
        { code: "M&O", label: "Manage & Optimize Campaigns" },
      ],
    },
    {
      title: "Production Console",
      items: [
        { code: "MA", label: "Manage Assets" },
        { code: "BC", label: "Build Creatives" },
      ],
    },
    {
      title: "Content Console",
      items: [
        { code: "MC", label: "Map Content" },
        { code: "GC", label: "Generate Content" },
        { code: "MC", label: "Measure Content" },
      ],
    },
    {
      title: "Data Management Console",
      items: [
        { code: "UD", label: "Upload Data" },
        { code: "MD", label: "Map Data" },
        { code: "ED", label: "Export Data" },
        { code: "VR", label: "View Reports" },
      ],
    },
    {
      title: "Internal Tools",
      items: [
        { code: "CC", label: "Client Central", variant: "solid", path: "/client-central" },
        { code: "EL", label: "Experimentation Lab" },
        { code: "FM", label: "Feed Management" },
      ],
    },
    {
      title: "Training and Resources",
      items: [
        { code: "AC", label: "Academy" },
        { code: "PR", label: "Product Resources" },
        { code: "UG", label: "User Guides" },
      ],
    },
  ];

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const filteredSections = consoleSections.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((section) => section.items.length > 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-[#1a1f2e] border-r shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Consoles</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-8"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>

          {currentRole && onRoleChange && (
            <div className="pt-2">
              <RoleSelector value={currentRole} onChange={onRoleChange} />
            </div>
          )}
        </div>

        {/* Console List */}
        <div className="overflow-y-auto h-[calc(100vh-180px)]">
          {filteredSections.map((section) => (
            <div key={section.title} className="border-b last:border-b-0">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-left"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {section.title}
                </span>
                {expandedSections.includes(section.title) ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {/* Section Items */}
              {expandedSections.includes(section.title) && (
                <div className="pb-2">
                  {section.items.map((item, index) => (
                    item.path ? (
                      <Link
                        key={`${item.code}-${index}`}
                        to={item.path}
                        onClick={onClose}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-secondary/50 transition-colors text-left group"
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${item.variant === 'solid'
                            ? 'bg-[#3b82f6] text-white'
                            : 'bg-primary/10 text-primary'
                          }`}>
                          <span className="text-xs font-semibold">
                            {item.code}
                          </span>
                        </div>
                        <span className="text-sm text-primary group-hover:underline">
                          {item.label}
                        </span>
                      </Link>
                    ) : (
                      <button
                        key={`${item.code}-${index}`}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-secondary/50 transition-colors text-left group"
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${item.variant === 'solid'
                            ? 'bg-[#3b82f6] text-white'
                            : 'bg-primary/10 text-primary'
                          }`}>
                          <span className="text-xs font-semibold">
                            {item.code}
                          </span>
                        </div>
                        <span className="text-sm text-primary group-hover:underline">
                          {item.label}
                        </span>
                      </button>
                    )
                  ))}

                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white dark:bg-[#1a1f2e]">
          <p className="text-xs text-muted-foreground">© Interact, 2025</p>
        </div>
      </div>
    </>
  );
}
