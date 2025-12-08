import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type UserRole = "project-owner" | "task-owner" | "approver" | "executive" | "campaign-manager" | "planning";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-foreground">View as:</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="executive">Executive</SelectItem>
          <SelectItem value="campaign-manager">Campaign Manager</SelectItem>
          <SelectItem value="task-owner">Task Owner</SelectItem>
          <SelectItem value="approver">Approver</SelectItem>
          <SelectItem value="project-owner">Project Owner</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
