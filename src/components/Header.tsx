import { Menu, Bell, HelpCircle, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-[#1a1f2e] shadow-sm">
      <div className="flex h-12 items-center px-3 max-w-full">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="h-6 w-px bg-border"></div>
          <Button variant="ghost" className="h-10 px-3 text-[18px] font-medium text-primary hover:bg-transparent hover:text-primary/80">
            Home
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
