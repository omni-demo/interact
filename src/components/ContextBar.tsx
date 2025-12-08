import { ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface Campaign {
  id: string;
  name: string;
  guid: string;
  workfrontId?: string;
}

interface ContextBarProps {
  campaign: Campaign;
}

export function ContextBar({ campaign }: ContextBarProps) {
  const openInWorkfront = () => {
    window.open("https://experience.adobe.com/#/@leappointptrsd/so:leappointptrsd-Production/workfront/home/workspaces", "_blank");
  };

  const openInMarketBrief = () => {
    window.open(`https://marketbrief.platform/brief/${campaign.guid}`, "_blank");
  };

  return (
    <div className="flex items-center gap-3 pl-3 border-l">
      {/* Campaign Indicator */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span className="text-sm font-medium">{campaign.name}</span>
      </div>

      {/* Cross-Platform Links */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={openInWorkfront}
        >
          Workfront
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </div>

      {/* GUID Badge */}
      <Badge variant="outline" className="text-[10px] font-mono">
        {campaign.guid.substring(0, 8)}...
      </Badge>
    </div>
  );
}
