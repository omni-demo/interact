import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ConsoleButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
}

export function ConsoleButton({ label, onClick, href }: ConsoleButtonProps) {
  if (href) {
    return (
      <Link
        to={href}
        className="w-full inline-flex items-center justify-between bg-background hover:bg-secondary/80 h-11 px-4 text-sm font-medium group border rounded-[0.25rem] transition-colors no-underline"
      >
        <span>{label}</span>
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full justify-between bg-background hover:bg-secondary/80 h-11 px-4 text-sm font-medium group border rounded-[0.25rem]"
      onClick={onClick}
    >
      <span>{label}</span>
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Button>
  );
}
