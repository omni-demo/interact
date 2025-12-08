import { Home, FolderOpen, CheckSquare, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function NavigationSidebar({ isOpen, onClose }: NavigationSidebarProps) {
  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: FolderOpen, label: "Projects", href: "/projects" },
    { icon: CheckSquare, label: "Tasks", href: "/tasks" },
    { icon: Users, label: "Team", href: "/team" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r z-40 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="p-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">Navigation</h2>
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      item.label === "Dashboard"
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
