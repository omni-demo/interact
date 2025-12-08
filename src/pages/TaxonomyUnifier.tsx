import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Sparkles, Upload, Download, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

const TaxonomyUnifier = () => {
    const [currentTaxonomy, setCurrentTaxonomy] = useState("Campaign > Region > Product > Quarter");
    const [aiSuggestion, setAiSuggestion] = useState("Global_Campaign_ID | Region_Code | Product_SKU | Fiscal_Quarter | Channel_Type");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [matchScore, setMatchScore] = useState(98);
    const [reasoning, setReasoning] = useState("The AI recommends adding Global_Campaign_ID and Fiscal_Quarter to ensure better cross-region tracking and financial alignment.");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [apiKey, setApiKey] = useState("");
    const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
    const [csvData, setCsvData] = useState<{ headers: string[], rows: string[][] } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedKey = localStorage.getItem("gemini_api_key");
        if (storedKey) {
            setApiKey(storedKey);
        }
    }, []);

    const handleSaveApiKey = () => {
        localStorage.setItem("gemini_api_key", apiKey);
        setIsApiKeyDialogOpen(false);
    };

    const callGemini = async (modelName: string, prompt: string) => {
        const genAI = new GoogleGenerativeAI(apiKey.trim());
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    };

    const generateSuggestion = async (input: string, fromCsv = false) => {
        setIsAnalyzing(true);

        if (!apiKey) {
            setIsApiKeyDialogOpen(true);
            setIsAnalyzing(false);
            return;
        }

        const prompt = `
        You are an expert marketing data architect. Your goal is to standardize and unify marketing taxonomy.
        
        Analyze the following input, which represents a ${fromCsv ? "CSV header row" : "taxonomy structure string"}:
        "${input}"

        Please provide a JSON response with the following fields:
        1. "suggested_taxonomy": A pipe-separated string of standardized field names (e.g., "Global_Campaign_ID | Region_Code"). Use industry best practices (snake_case, descriptive).
        2. "reasoning": A concise explanation of why you made these changes. Mention specific fields you added or renamed and why (e.g., for financial alignment, global tracking).
        3. "match_score": A number between 0 and 100 indicating how close the original input was to a standard best-practice taxonomy.

        Ensure the suggestion includes "Global_Campaign_ID" and "Fiscal_Quarter" if they are missing, as these are critical for our system.
        Return ONLY the JSON.
      `;

        try {
            let text = "";
            try {
                // Try the primary model first
                text = await callGemini("gemini-1.5-flash", prompt);
            } catch (flashError) {
                console.warn("gemini-1.5-flash failed, trying gemini-1.0-pro fallback", flashError);
                // Fallback to gemini-1.0-pro if flash fails
                text = await callGemini("gemini-1.0-pro", prompt);
            }

            // Clean up markdown code blocks if present
            const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
            const data = JSON.parse(cleanText);

            setAiSuggestion(data.suggested_taxonomy);
            setReasoning(data.reasoning);
            setMatchScore(data.match_score);

        } catch (error) {
            console.error("Error generating suggestion:", error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            // Show error in UI temporarily
            setReasoning(`Error generating suggestion: ${errorMessage}. Falling back to simulation...`);

            // Fallback to simulation if API fails completely
            setTimeout(() => {
                const parts = input.split(/[>|/,]+/).map(p => p.trim()).filter(p => p);
                let suggestionParts = parts.map(part => {
                    const lower = part.toLowerCase();
                    if (lower.includes("campaign")) return "Global_Campaign_ID";
                    if (lower.includes("region") || lower.includes("geo")) return "Region_Code";
                    if (lower.includes("product") || lower.includes("brand")) return "Product_SKU";
                    if (lower.includes("quarter") || lower.includes("date") || lower.includes("time")) return "Fiscal_Quarter";
                    return part.charAt(0).toUpperCase() + part.slice(1).replace(/\s+/g, '_');
                });

                if (!suggestionParts.some(p => p.includes("Campaign"))) suggestionParts.unshift("Global_Campaign_ID");
                if (!suggestionParts.some(p => p.includes("Quarter"))) suggestionParts.push("Fiscal_Quarter");

                setAiSuggestion(suggestionParts.join(" | "));
                setMatchScore(85);
                setReasoning("The AI recommends adding Global_Campaign_ID and Fiscal_Quarter to ensure better cross-region tracking and financial alignment. (Simulated Result)");
            }, 1000);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCurrentTaxonomy(newValue);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            setIsAnalyzing(true);

            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                const lines = text.split('\n').map(line => line.trim()).filter(line => line);

                if (lines.length > 0) {
                    // Simple CSV parsing
                    const headers = lines[0].split(',').map(h => h.trim());
                    // Parse remaining lines as rows
                    const rows = lines.slice(1).map(line => {
                        // Handle quoted values roughly or just split by comma
                        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
                        return matches ? matches.map(m => m.replace(/^"|"$/g, '').trim()) : line.split(',');
                    });

                    setCsvData({ headers, rows });
                    setCurrentTaxonomy(lines[0]); // Use header as taxonomy input
                    generateSuggestion(lines[0], true);
                }
            };
            reader.readAsText(file);
        }
    };

    const handleDownload = () => {
        let headers: string[];
        let rows: string[][];

        if (csvData) {
            // Use uploaded CSV data
            headers = [...csvData.headers, "AI_Suggested_Taxonomy", "AI_Reasoning"];
            rows = csvData.rows.map(row => [...row, aiSuggestion, reasoning]);
        } else {
            // Use dummy data if no CSV uploaded
            headers = ["Original_Product_Name", "Original_SKU", "Original_Category", "Original_Season", "AI_Suggested_Taxonomy", "AI_Reasoning"];
            rows = [
                ["AE Ne(x)t Level High-Waisted Jegging", "12345", "Jeans", "Fall 2024", aiSuggestion, reasoning],
                ["AE Super Soft Graphic Tee", "67890", "Tops", "Summer 2024", aiSuggestion, reasoning],
                ["AirFlex+ Patched Skinny Jean", "11223", "Jeans", "Winter 2024", aiSuggestion, reasoning],
                ["Oversized Chenille Sweater", "44556", "Tops", "Fall 2024", aiSuggestion, reasoning],
                ["AE Flex Boxer Brief", "99887", "Underwear", "All Season", aiSuggestion, reasoning]
            ];
        }

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
        ].join("\n");

        const blob = new Blob(["\uFEFF" + csvContent], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "suggested_taxonomy_americaneagle.csv");
        link.style.display = "none";
        document.body.appendChild(link);

        setTimeout(() => {
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 2000);
        }, 100);
    };

    return (
        <InteractMasterLayout
            currentUser={{
                name: "John Miller",
                role: "project-owner",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                tenantId: "bbdo",
                tenantName: "BBDO (and its network including AMV BBDO, adam&eveDDB)",
            }}
            activeCampaign={{
                id: "camp_001",
                name: "Q4 Product Launch",
                guid: "550e8400-e29b-41d4-a716-446655440000",
                workfrontId: "WF-2025-Q4-001",
            }}
        >
            <div className="max-w-[1000px] mx-auto px-6 py-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span>&gt;</span>
                    <span className="font-medium text-foreground">Taxonomy Unifier</span>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#1e293b]">Taxonomy Unifier</h1>
                            <p className="text-muted-foreground">Unify and standardize your marketing taxonomy with AI-powered suggestions.</p>
                        </div>
                    </div>

                    <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Gemini API Settings</DialogTitle>
                                <DialogDescription>
                                    Enter your Google Gemini API Key to enable real-time AI suggestions.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="api-key" className="text-right">
                                        API Key
                                    </Label>
                                    <Input
                                        id="api-key"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        className="col-span-3"
                                        type="password"
                                        placeholder="AIzaSy..."
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleSaveApiKey}>Save Key</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Input Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Taxonomy Structure</CardTitle>
                            <CardDescription>Enter your current naming convention or taxonomy structure.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-taxonomy">Input Taxonomy</Label>
                                    <Input
                                        id="current-taxonomy"
                                        value={currentTaxonomy}
                                        onChange={handleInputChange}
                                        className="font-mono bg-muted/30"
                                        placeholder="e.g. Campaign > Product > Location"
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept=".csv"
                                            onChange={handleFileUpload}
                                        />
                                        <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isAnalyzing}>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload CSV
                                        </Button>
                                        {uploadedFile && (
                                            <div className="ml-3 flex flex-col">
                                                <span className="text-sm text-muted-foreground">{uploadedFile.name}</span>
                                                {csvData && <span className="text-xs text-green-600">{csvData.rows.length} rows loaded</span>}
                                            </div>
                                        )}
                                    </div>
                                    <Button onClick={() => generateSuggestion(currentTaxonomy)} disabled={isAnalyzing}>
                                        {isAnalyzing ? "Analyzing..." : "Analyze Structure"}
                                        {!isAnalyzing && <ArrowRight className="ml-2 h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Suggestion Section */}
                    <Card className="border-primary/20 bg-primary/5">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <CardTitle className="text-primary">AI Suggested Taxonomy</CardTitle>
                            </div>
                            <CardDescription>Optimized structure based on industry best practices and your campaign data.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="ai-suggestion" className="text-primary font-medium">Suggested Structure</Label>
                                <div className="relative">
                                    <Input
                                        id="ai-suggestion"
                                        value={aiSuggestion}
                                        readOnly
                                        className={`font-mono bg-white border-primary/20 pr-24 transition-opacity duration-200 ${isAnalyzing ? 'opacity-50' : 'opacity-100'}`}
                                    />
                                    <div className="absolute right-2 top-1.5">
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium">{matchScore}% Match Score</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-primary/10 shadow-sm">
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Why this recommendation?
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {reasoning}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button className="flex-1 bg-primary hover:bg-primary/90">
                                    Apply Taxonomy
                                </Button>
                                <Button variant="outline" className="flex-1 border-primary/20 text-primary hover:bg-primary/5" onClick={handleDownload}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download CSV
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </InteractMasterLayout>
    );
};

export default TaxonomyUnifier;
