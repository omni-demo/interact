import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileCheck, Clock } from "lucide-react";

export function ApproverDashboard() {
  const approvals = [
    { 
      title: "Q4 Campaign Creative Assets", 
      submitter: "Sarah Chen", 
      type: "Design Review",
      submitted: "2 hours ago",
      files: 8
    },
    { 
      title: "Holiday Marketing Copy", 
      submitter: "Michael Ross", 
      type: "Content Approval",
      submitted: "5 hours ago",
      files: 3
    },
    { 
      title: "Brand Guidelines Update", 
      submitter: "Jennifer Lee", 
      type: "Document Review",
      submitted: "1 day ago",
      files: 12
    },
    { 
      title: "Social Media Calendar", 
      submitter: "David Park", 
      type: "Schedule Approval",
      submitted: "1 day ago",
      files: 1
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-primary" />
            Pending Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {approvals.map((approval, idx) => (
              <div key={idx} className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground mb-1">{approval.title}</h4>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm text-muted-foreground">by {approval.submitter}</span>
                      <Badge variant="outline">{approval.type}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {approval.submitted}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {approval.files} {approval.files === 1 ? 'file' : 'files'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                    <Button size="sm">
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
