import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ChevronRight,
    Pin,
    Menu,
    FileImage,
    Link,
    User,
    Trash2,
    Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProofApproval = () => {
    return (
        <InteractMasterLayout
            currentUser={{
                name: "John Miller",
                role: "project-owner",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                tenantId: "bbdo",
                tenantName: "BBDO (and its network including AMV BBDO, adam&eveDDB)",
            }}
        >
            <div className="flex flex-col h-full bg-white">
                {/* Top Bar - Pins */}
                <div className="flex items-center px-4 py-2 border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-slate-800">
                        <Menu className="w-4 h-4" />
                        <span className="font-semibold">PINS</span>
                    </div>
                    <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-800">
                        <Pin className="w-3 h-3 rotate-45" />
                        <span>Pin current page</span>
                    </div>
                </div>

                {/* Page Header */}
                <div className="px-8 py-6">
                    <h1 className="text-2xl font-normal text-slate-800 mb-1">New proof</h1>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>MacBook Amateur</span>
                        <Badge variant="secondary" className="text-[10px] h-5 bg-slate-200 text-slate-600 rounded-sm font-normal">PROJECT</Badge>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-8 pb-8 overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12">
                        {/* Left Column - Add Files */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-slate-800">Add files</h2>

                            <div className="space-y-4">
                                {/* Drag & Drop Area */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-500 flex items-center justify-center rounded-l-sm text-white">
                                        <FileImage className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 h-12 bg-blue-50 border border-blue-200 border-l-0 rounded-r-sm flex items-center justify-center text-sm text-slate-600 border-dashed">
                                        <span>Drag & drop files here or <span className="text-blue-600 hover:underline cursor-pointer">browse</span></span>
                                    </div>
                                </div>

                                {/* URL Input */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-green-600 flex items-center justify-center rounded-l-sm text-white">
                                        <Link className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 h-12 bg-slate-50 border border-slate-200 border-l-0 rounded-r-sm flex items-center px-4">
                                        <Input
                                            placeholder="www.shareyourlink.com"
                                            className="h-8 bg-white border-slate-200 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 text-sm text-slate-500 font-medium">
                                    0 files (0 proofs)
                                </div>

                                <div className="flex justify-center py-8">
                                    <p className="text-slate-400 text-sm">You haven't added any files yet</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Settings */}
                        <div className="space-y-8">
                            {/* Single Proof Toggle */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-slate-800">Single proof</h2>
                                <div className="flex items-center gap-3">
                                    <Switch id="combine-files" />
                                    <label htmlFor="combine-files" className="text-sm text-slate-600 cursor-pointer">
                                        Combine all compatible files into single proof
                                    </label>
                                </div>
                            </div>

                            {/* Workflow */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-slate-800">Workflow</h2>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-500">Workflow type</label>
                                    <div className="flex border border-slate-200 rounded-sm overflow-hidden">
                                        <button className="flex-1 py-2 text-sm font-medium bg-white text-slate-800 flex items-center justify-center gap-2 border-r border-slate-200">
                                            <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-slate-800" />
                                            </div>
                                            Basic
                                        </button>
                                        <button className="flex-1 py-2 text-sm text-slate-500 bg-slate-50 flex items-center justify-center gap-2 hover:bg-slate-100">
                                            <div className="w-4 h-4 rounded-full border border-slate-300" />
                                            Automated
                                        </button>
                                    </div>
                                </div>

                                {/* Recipient Row */}
                                <div className="bg-white rounded-sm border-b border-slate-100 py-3">
                                    <div className="grid grid-cols-[2fr_1.5fr_1.5fr_auto] gap-4 items-center">
                                        <div>
                                            <label className="text-[10px] text-slate-400 block mb-1">* Recipient name or email address</label>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-slate-400">
                                                    <User className="w-3 h-3" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-800">Jimmie Miller</div>
                                                    <div className="text-[10px] text-blue-500">Owner</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] text-slate-400 block mb-1">Proof role</label>
                                            <Select defaultValue="reviewer">
                                                <SelectTrigger className="h-8 border-none shadow-none px-0 text-blue-600 hover:text-blue-700 font-medium text-sm w-full justify-start gap-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="reviewer">Reviewer & Approver</SelectItem>
                                                    <SelectItem value="read-only">Read Only</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="text-[10px] text-slate-400 block mb-1">Email alerts</label>
                                            <Select defaultValue="daily">
                                                <SelectTrigger className="h-8 border-none shadow-none px-0 text-blue-600 hover:text-blue-700 font-medium text-sm w-full justify-start gap-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="daily">Daily summary</SelectItem>
                                                    <SelectItem value="instant">Instant</SelectItem>
                                                    <SelectItem value="disabled">Disabled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="pt-4">
                                            <Button variant="ghost" size="sm" className="h-6 text-[10px] text-blue-600 hover:text-blue-700 px-2">
                                                Delete all
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Input
                                        placeholder="Type contact name or email address to add a recipient"
                                        className="bg-white border-slate-200"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <Checkbox id="deadline" className="border-slate-300" />
                                    <label htmlFor="deadline" className="text-sm text-slate-600 cursor-pointer">
                                        Set proof deadline
                                    </label>
                                </div>

                                <div className="space-y-1 pt-2">
                                    <label className="text-xs text-slate-500">Transfer primary decision rights to</label>
                                    <Select>
                                        <SelectTrigger className="bg-white border-slate-200">
                                            <SelectValue placeholder="Select primary decision maker" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="jimmie">Jimmie Miller</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <Checkbox id="one-decision" className="border-slate-300" />
                                    <label htmlFor="one-decision" className="text-sm text-slate-600 cursor-pointer flex items-center gap-1">
                                        Require only one decision for this stage
                                        <Info className="w-3 h-3 text-slate-400" />
                                    </label>
                                </div>
                            </div>

                            {/* Email Notification */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-slate-800">Email notification</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="notify-recipients" defaultChecked className="border-slate-300" />
                                        <label htmlFor="notify-recipients" className="text-sm text-slate-600 cursor-pointer">
                                            Notify recipients about this proof
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="custom-message" className="border-slate-300" />
                                        <label htmlFor="custom-message" className="text-sm text-slate-600 cursor-pointer">
                                            Add custom message
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Proof Settings */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-slate-800">Proof settings</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="require-login" className="border-slate-300" />
                                        <label htmlFor="require-login" className="text-sm text-slate-600 cursor-pointer">
                                            Require login. This proof cannot be shared with guest users
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="require-signature" className="border-slate-300" />
                                        <label htmlFor="require-signature" className="text-sm text-slate-600 cursor-pointer">
                                            Require decisions to be electronically signed
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="lock-proof" className="border-slate-300" />
                                        <label htmlFor="lock-proof" className="text-sm text-slate-600 cursor-pointer">
                                            Lock proof when all required decisions are made
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="allow-download" defaultChecked className="border-slate-300" />
                                        <label htmlFor="allow-download" className="text-sm text-slate-600 cursor-pointer">
                                            Allow downloading the original file
                                        </label>
                                    </div>

                                    <div className="pt-2">
                                        <div className="text-xs font-bold text-slate-700 mb-2">Share link</div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="allow-sharing" defaultChecked className="border-slate-300" />
                                            <label htmlFor="allow-sharing" className="text-sm text-slate-600 cursor-pointer">
                                                Allow sharing proof via public URL or embed code
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <div className="text-xs font-bold text-slate-700 mb-2">Subscription</div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="allow-subscribing" className="border-slate-300" />
                                            <label htmlFor="allow-subscribing" className="text-sm text-slate-600 cursor-pointer">
                                                Allow subscribing to proof via public URL or embed code
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-4 border-t border-slate-200 bg-white flex items-center gap-4">
                    <Button className="bg-slate-200 hover:bg-slate-300 text-slate-400 cursor-not-allowed" disabled>
                        Create Proof
                    </Button>
                    <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
                        Cancel
                    </Button>
                </div>
            </div>
        </InteractMasterLayout>
    );
};

export default ProofApproval;
