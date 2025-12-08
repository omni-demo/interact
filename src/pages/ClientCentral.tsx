import { useState } from "react";
import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronDown, Download, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Client, initialClients } from "@/data/mockData";

export default function ClientCentral() {
    const [clients, setClients] = useState<Client[]>(initialClients);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleExpand = (id: string) => {
        setClients(clients.map(c =>
            c.id === id ? { ...c, isExpanded: !c.isExpanded } : c
        ));
    };

    return (
        <InteractMasterLayout>
            <div className="flex flex-col h-full bg-[#f5f7fa] dark:bg-[#0f1419]">
                {/* Header */}
                <div className="bg-white dark:bg-[#1a1f2e] border-b px-6 py-4">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-semibold text-[#3b82f6]">Client Central</h1>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Clients</h2>
                        <Button variant="outline" className="gap-2 text-[#3b82f6] border-none hover:bg-blue-50">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-4">
                        {/* Filters Bar */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search"
                                    className="pl-9 bg-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Filter className="h-4 w-4" />
                                <span>Filters:</span>
                            </div>

                            <Select defaultValue="all">
                                <SelectTrigger className="w-[120px] border-none shadow-none hover:bg-slate-50">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Status: All</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select defaultValue="all">
                                <SelectTrigger className="w-[130px] border-none shadow-none hover:bg-slate-50">
                                    <SelectValue placeholder="Markets" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Markets: All</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select defaultValue="all">
                                <SelectTrigger className="w-[130px] border-none shadow-none hover:bg-slate-50">
                                    <SelectValue placeholder="Agencies" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Agencies: All</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Table */}
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableHead className="w-[300px]">Name ▲</TableHead>
                                    <TableHead>Status ▼</TableHead>
                                    <TableHead>Agencies ▼</TableHead>
                                    <TableHead>Industries</TableHead>
                                    <TableHead>Markets</TableHead>
                                    <TableHead className="text-right">Last Updated</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients.map((client) => (
                                    <>
                                        <TableRow key={client.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b last:border-0">
                                            <TableCell className="font-medium">
                                                <div className="flex items-start gap-3">
                                                    <button
                                                        onClick={() => toggleExpand(client.id)}
                                                        className="mt-1 text-muted-foreground hover:text-foreground"
                                                    >
                                                        {client.isExpanded ? (
                                                            <ChevronDown className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                    <div>
                                                        <Link
                                                            to={`/client-central/${client.id}`}
                                                            className="text-[#3b82f6] hover:underline cursor-pointer font-semibold"
                                                        >
                                                            {client.name}
                                                        </Link>
                                                        {client.subName && (
                                                            <div className="text-xs text-muted-foreground mt-0.5">
                                                                {client.subName}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {client.status && (
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${client.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                                                        <span className="text-sm text-slate-600 dark:text-slate-300">{client.status}</span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                {client.agencies}
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                {client.industries}
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                {client.markets}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="text-xs text-muted-foreground">
                                                    <div>{client.lastUpdated}</div>
                                                    <div>by {client.updatedBy}</div>
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                        {/* Sub-clients rendering */}
                                        {client.isExpanded && client.subClients && client.subClients.map((subClient) => (
                                            <TableRow key={subClient.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b last:border-0 bg-slate-50/50 dark:bg-slate-800/20">
                                                <TableCell className="font-medium pl-12">
                                                    <div className="text-slate-700 dark:text-slate-300 hover:underline cursor-pointer text-sm underline decoration-slate-400 underline-offset-2">
                                                        {subClient.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                    {subClient.industries}
                                                </TableCell>
                                                <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                    {subClient.markets}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="text-xs text-muted-foreground">
                                                        <div>{subClient.lastUpdated}</div>
                                                        <div>by {subClient.updatedBy}</div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </InteractMasterLayout>
    );
}
