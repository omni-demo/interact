import { cn } from "@/lib/utils";

interface NotificationItemProps {
  title: string;
  subtitle: string;
  date: string;
  isNew?: boolean;
}

export function NotificationItem({ title, subtitle, date, isNew }: NotificationItemProps) {
  return (
    <div className={cn(
      "p-3 rounded-lg border bg-card hover:bg-secondary/50 transition-colors cursor-pointer",
      isNew && "border-primary/20 bg-primary/5"
    )}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">{date}</span>
      </div>
    </div>
  );
}
