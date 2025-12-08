import { useState } from "react";
import { Sparkles, ArrowRight, Check, AlertCircle, Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface BriefField {
  key: string;
  label: string;
  value: string;
  type: "text" | "date" | "number" | "select" | "multiline";
}

interface WorkfrontField {
  key: string;
  label: string;
  required: boolean;
  type: "text" | "date" | "number" | "select" | "textarea" | "currency";
  options?: string[];
}

interface FieldMapping {
  briefField: string;
  workfrontField: string;
  transformedValue: string;
  confidence: number; // AI confidence 0-100
  manualOverride: boolean;
}

interface BriefToProjectMapperProps {
  briefId: string;
  briefTitle: string;
  onComplete: (projectId: string) => void;
  onCancel: () => void;
}

export function BriefToProjectMapper({
  briefId,
  briefTitle,
  onComplete,
  onCancel,
}: BriefToProjectMapperProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock brief data from MarketBrief
  const briefFields: BriefField[] = [
    { key: "campaign_name", label: "Campaign Name", value: "Spring 2026 Product Launch", type: "text" },
    { key: "budget", label: "Budget", value: "$250,000", type: "text" },
    { key: "target_audience", label: "Target Audience", value: "Tech-savvy professionals, 25-45", type: "multiline" },
    { key: "launch_date", label: "Launch Date", value: "2026-03-15", type: "date" },
    { key: "channels", label: "Marketing Channels", value: "Digital, Social Media, Email", type: "text" },
    { key: "objectives", label: "Campaign Objectives", value: "Increase brand awareness by 30%, generate 5000 leads", type: "multiline" },
    { key: "kpis", label: "Success Metrics", value: "CTR, Conversion Rate, ROI", type: "text" },
  ];

  // Mock Workfront custom fields
  const workfrontFields: WorkfrontField[] = [
    { key: "name", label: "Project Name", required: true, type: "text" },
    { key: "plannedBudget", label: "Planned Budget", required: true, type: "currency" },
    { key: "description", label: "Description", required: false, type: "textarea" },
    { key: "plannedStartDate", label: "Planned Start Date", required: true, type: "date" },
    { key: "DE:targetAudience", label: "Target Audience (Custom)", required: false, type: "textarea" },
    { key: "DE:channels", label: "Marketing Channels (Custom)", required: false, type: "select", options: ["Digital", "Social", "Email", "Print", "TV"] },
    { key: "DE:campaignGoals", label: "Campaign Goals (Custom)", required: false, type: "textarea" },
  ];

  // AI-suggested mappings
  const [mappings, setMappings] = useState<FieldMapping[]>([
    { briefField: "campaign_name", workfrontField: "name", transformedValue: "Spring 2026 Product Launch", confidence: 98, manualOverride: false },
    { briefField: "budget", workfrontField: "plannedBudget", transformedValue: "250000", confidence: 95, manualOverride: false },
    { briefField: "launch_date", workfrontField: "plannedStartDate", transformedValue: "2026-03-15", confidence: 100, manualOverride: false },
    { briefField: "target_audience", workfrontField: "DE:targetAudience", transformedValue: "Tech-savvy professionals, 25-45", confidence: 92, manualOverride: false },
    { briefField: "channels", workfrontField: "DE:channels", transformedValue: "Digital, Social Media, Email", confidence: 88, manualOverride: false },
    { briefField: "objectives", workfrontField: "DE:campaignGoals", transformedValue: "Increase brand awareness by 30%, generate 5000 leads", confidence: 90, manualOverride: false },
  ]);

  const templates = [
    { id: "campaign", name: "Marketing Campaign", description: "Standard marketing campaign with media planning" },
    { id: "product-launch", name: "Product Launch", description: "Multi-phase product launch with creative assets" },
    { id: "brand-refresh", name: "Brand Refresh", description: "Brand identity and messaging update" },
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-50 dark:bg-green-950";
    if (confidence >= 70) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950";
    return "text-red-600 bg-red-50 dark:bg-red-950";
  };

  const updateMapping = (index: number, field: keyof FieldMapping, value: any) => {
    setMappings(mappings.map((m, i) => 
      i === index ? { ...m, [field]: value, manualOverride: true } : m
    ));
  };

  const createProject = async () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      onComplete("WF-" + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, 2000);
  };

  const getBriefFieldValue = (key: string) => {
    return briefFields.find(f => f.key === key)?.value || "";
  };

  const getWorkfrontFieldLabel = (key: string) => {
    return workfrontFields.find(f => f.key === key)?.label || key;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Create Project from Brief</h1>
          <p className="text-sm text-muted-foreground">
            MarketBrief: <span className="font-medium">{briefTitle}</span>
          </p>
          <Badge variant="outline" className="mt-2">
            GUID: {briefId}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={createProject} disabled={!selectedTemplate || isProcessing}>
            {isProcessing ? "Creating..." : "Create Project"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Workfront Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{template.name}</h3>
                  {selectedTemplate === template.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {template.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI-Suggested Field Mappings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI-Suggested Field Mappings
            </CardTitle>
            <Button variant="outline" size="sm">
              <Wand2 className="h-4 w-4 mr-2" />
              Re-run AI Mapper
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {mappings.map((mapping, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card">
                  <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-start">
                    {/* Brief Field */}
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1">
                        From MarketBrief
                      </Label>
                      <div className="text-sm font-medium mb-1">
                        {briefFields.find(f => f.key === mapping.briefField)?.label}
                      </div>
                      <div className="text-xs text-muted-foreground p-2 bg-secondary/30 rounded">
                        {getBriefFieldValue(mapping.briefField)}
                      </div>
                    </div>

                    {/* Arrow with Confidence */}
                    <div className="flex flex-col items-center justify-center pt-6">
                      <ArrowRight className="h-5 w-5 text-muted-foreground mb-2" />
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${getConfidenceColor(mapping.confidence)}`}
                      >
                        {mapping.confidence}% match
                      </Badge>
                    </div>

                    {/* Workfront Field */}
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1">
                        To Workfront
                      </Label>
                      <Select
                        value={mapping.workfrontField}
                        onValueChange={(value) => updateMapping(index, "workfrontField", value)}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {workfrontFields.map((field) => (
                            <SelectItem key={field.key} value={field.key}>
                              {field.label} {field.required && "*"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        className="mt-2 text-xs"
                        value={mapping.transformedValue}
                        onChange={(e) => updateMapping(index, "transformedValue", e.target.value)}
                      />
                      {mapping.manualOverride && (
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-orange-600">
                          <AlertCircle className="h-3 w-3" />
                          Manually modified
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Unmapped Fields Warning */}
          <Separator className="my-4" />
          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
            <div className="text-xs">
              <div className="font-medium text-amber-900 dark:text-amber-200">
                2 required Workfront fields not mapped
              </div>
              <div className="text-amber-700 dark:text-amber-300">
                Description, Project Owner - these will use default values
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side-by-Side Preview */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">MarketBrief Data</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2 text-xs font-mono">
                <pre className="text-[10px] bg-secondary/30 p-3 rounded overflow-auto">
{JSON.stringify({
  id: briefId,
  campaign_name: "Spring 2026 Product Launch",
  budget: "$250,000",
  target_audience: "Tech-savvy professionals, 25-45",
  launch_date: "2026-03-15",
  channels: ["Digital", "Social Media", "Email"],
  objectives: "Increase brand awareness by 30%, generate 5000 leads"
}, null, 2)}
                </pre>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Workfront Project (Preview)</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2 text-xs font-mono">
                <pre className="text-[10px] bg-secondary/30 p-3 rounded overflow-auto">
{JSON.stringify({
  name: "Spring 2026 Product Launch",
  plannedBudget: 250000,
  plannedStartDate: "2026-03-15",
  customFields: {
    targetAudience: "Tech-savvy professionals, 25-45",
    channels: "Digital, Social Media, Email",
    campaignGoals: "Increase brand awareness by 30%, generate 5000 leads",
    sourceGUID: briefId
  }
}, null, 2)}
                </pre>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
