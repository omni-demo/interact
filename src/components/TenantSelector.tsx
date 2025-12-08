import { Building2, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TenantSelectorProps {
  currentTenant: string;
  tenantId: string;
}

export function TenantSelector({ currentTenant, tenantId }: TenantSelectorProps) {
  // Mock tenant list - would come from API in production
  const tenants = [
    { id: "bbdo", name: "BBDO (and its network including AMV BBDO, adam&eveDDB)", role: "admin" },
    { id: "ddb", name: "DDB Worldwide", role: "user" },
    { id: "tbwa", name: "TBWA (TBWA\\Worldwide)", role: "user" },
    { id: "180global", name: "180 Global (180 Amsterdam)", role: "user" },
    { id: "a720", name: "a720", role: "user" },
    { id: "alma", name: "Alma", role: "user" },
    { id: "antoni", name: "Antoni", role: "user" },
    { id: "auditoire", name: "Auditoire", role: "user" },
    { id: "brightred", name: "Bright Red", role: "user" },
    { id: "darkhorses", name: "Dark Horses", role: "user" },
    { id: "dieste", name: "Dieste", role: "user" },
    { id: "doremus", name: "Doremus & Co", role: "user" },
    { id: "dotdotdash", name: "Dot Dot Dash", role: "user" },
    { id: "fluent360", name: "Fluent360", role: "user" },
    { id: "gmr", name: "GMR Marketing", role: "user" },
    { id: "gsp", name: "Goodby Silverstein & Partners (GS&P)", role: "user" },
    { id: "gsdm", name: "GSD&M", role: "user" },
    { id: "grabarz", name: "Grabarz und Partner", role: "user" },
    { id: "luckygenerals", name: "Lucky Generals", role: "user" },
    { id: "merkley", name: "Merkley and Partners", role: "user" },
    { id: "serinocoyne", name: "Serino Coyne", role: "user" },
    { id: "tma", name: "The Marketing Arm (TMA)", role: "user" },
    { id: "thirdear", name: "Third Ear", role: "user" },
    { id: "tro", name: "TRO", role: "user" },
    { id: "zimmerman", name: "Zimmerman Advertising", role: "user" },
  ];

  return (
    <div className="flex items-center gap-2 pl-3 border-l">
      <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      <Select value={tenantId}>
        <SelectTrigger className="w-[280px] h-8 border-0 shadow-none focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-w-[400px]">
          {tenants.map((tenant) => (
            <SelectItem key={tenant.id} value={tenant.id}>
              <div className="flex items-center justify-between w-full">
                <span className="truncate">{tenant.name}</span>
                {tenant.id === tenantId && (
                  <Check className="h-4 w-4 ml-2 text-primary flex-shrink-0" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
