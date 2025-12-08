import { Construction } from "lucide-react";

interface GenericProjectViewProps {
    title: string;
}

export function GenericProjectView({ title }: GenericProjectViewProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-slate-50">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <Construction className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{title}</h2>
            <p className="text-slate-500 text-sm max-w-md text-center">
                This view is currently under construction. Please check back later for updates.
            </p>
        </div>
    );
}
