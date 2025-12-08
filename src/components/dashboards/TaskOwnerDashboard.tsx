import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TaskOwnerDashboard() {
  const tasks = [
    { title: "Review creative assets for Q4 campaign", project: "Q4 Product Launch", priority: "High", dueDate: "Nov 12, 2025" },
    { title: "Update audience segmentation analysis", project: "Holiday Marketing", priority: "Medium", dueDate: "Nov 14, 2025" },
    { title: "Complete investment console training", project: "Training", priority: "Low", dueDate: "Nov 18, 2025" },
    { title: "Design social media templates", project: "Brand Refresh", priority: "High", dueDate: "Nov 13, 2025" },
    { title: "Compile market research data", project: "Q4 Product Launch", priority: "Medium", dueDate: "Nov 15, 2025" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-primary" />
            My Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task, idx) => (
              <div key={idx} className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors group">
                <div className="flex items-start gap-4">
                  <input 
                    type="checkbox" 
                    className="mt-1 h-4 w-4 rounded border-input accent-primary cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">{task.project}</span>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
