import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  gradient?: "radial" | "waves" | "angular";
  backgroundImage?: string;
  children?: ReactNode;
  className?: string;
}

const gradientClasses = {
  radial: "bg-[image:var(--gradient-blue-radial)]",
  waves: "bg-[image:var(--gradient-blue-waves)]",
  angular: "bg-[image:var(--gradient-blue-angular)]",
};

export function DashboardCard({ title, description, gradient, backgroundImage, children, className }: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg border hover:bg-[#3d67ff] group cursor-pointer", className)}>
      <div className="p-3">
        <div 
          className={cn(
            "h-[220px] relative bg-cover bg-center overflow-hidden",
            !backgroundImage && gradient && gradientClasses[gradient]
          )}
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
        </div>
      </div>
      <CardHeader className="pb-3 pt-0 transition-colors duration-300">
        <CardTitle className="text-lg font-semibold group-hover:text-white transition-colors duration-300">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs text-muted-foreground leading-relaxed group-hover:text-white/90 transition-colors duration-300">{description}</CardDescription>
        )}
      </CardHeader>
      {children && <CardContent className="pt-0">{children}</CardContent>}
    </Card>
  );
}
