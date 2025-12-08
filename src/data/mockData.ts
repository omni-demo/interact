export interface Client {
    id: string;
    name: string;
    subName?: string;
    status?: "Active" | "Inactive";
    agencies?: string;
    industries: string;
    markets: string;
    lastUpdated: string;
    updatedBy: string;
    isExpanded?: boolean;
    subClients?: Client[];
    // Extended details
    clientId?: string;
    website?: string;
    hierarchy?: string;
    accountOwners?: string[];
    description?: string;
    agencyList?: string;
    regionMarkets?: { region: string; markets: string }[];
    // New Data for Tabs
    marketBriefs?: MarketBrief[];
    clientTeams?: ClientTeam[];
    linesOfBusiness?: LineOfBusiness[];
}

export interface MarketBrief {
    id: string;
    name: string;
    market: string;
    forecastedBudget: string;
    owner: string;
    dateRange: string;
    // Detail fields
    clientName?: string;
    brandProduct?: string;
    objective?: string;
    projectUrl?: string;
    description?: string;
    deliverables?: Deliverable[];
    documents?: BriefDocument[];
    team?: string;
    workstreams?: string[];
}

export interface BriefDocument {
    name: string;
    type: string;
    date: string;
    size: string;
}

export interface Deliverable {
    id: string;
    name: string;
    source: string;
    console?: string;
    createdBy: string;
    createdDate: string;
    status: string;
    link?: string;
    details?: string;
}

export interface ClientTeam {
    id: string;
    name: string;
    description: string;
    members: { name: string; email: string }[];
}

export interface LineOfBusiness {
    id: string;
    name: string;
    brands: { name: string; markets: string }[];
}

export const demoSubClients: Client[] = [
    { id: "s1", name: "BANCO DEL AUSTRO", industries: "Banking", markets: "Ecuador", lastUpdated: "Aug 1, 2023, 2:20 PM", updatedBy: "Rahman Hayes" },
    { id: "s2", name: "Bimbo Takis", industries: "Food & Beverage", markets: "Ecuador", lastUpdated: "Apr 5, 2023, 8:37 AM", updatedBy: "Damilare Akogun" },
    { id: "s3", name: "Brand X", industries: "Other", markets: "2 Markets", lastUpdated: "Jun 30, 2025, 12:57 AM", updatedBy: "Haslinda Hashim" },
    { id: "s4", name: "Brand Y", industries: "Other", markets: "2 Markets", lastUpdated: "Jun 30, 2025, 12:58 AM", updatedBy: "Haslinda Hashim" },
    { id: "s5", name: "CURACAO", industries: "2 Industries", markets: "Peru", lastUpdated: "Mar 1, 2023, 10:25 PM", updatedBy: "Amira Shah" },
    { id: "s6", name: "Century 21", industries: "Real Estate", markets: "Belgium", lastUpdated: "Sep 23, 2025, 3:57 AM", updatedBy: "Abul Siddique" },
    { id: "s7", name: "Coke Coffee", industries: "Food & Beverage", markets: "2 Markets", lastUpdated: "Mar 24, 2021, 12:08 PM", updatedBy: "Matthew Hayes" },
    { id: "s8", name: "Colorplex", industries: "Other", markets: "Chile", lastUpdated: "Apr 28, 2022, 6:25 PM", updatedBy: "Cecilia MartinezSanchez" },
    { id: "s9", name: "Consejo Minero", industries: "Other", markets: "Chile", lastUpdated: "Jul 28, 2021, 11:30 AM", updatedBy: "Brinda Patel" },
    { id: "s10", name: "Cornershop", industries: "2 Industries", markets: "Peru", lastUpdated: "Apr 6, 2022, 12:51 PM", updatedBy: "Cecilia MartinezSanchez" },
    { id: "s11", name: "DONGFENG", industries: "Auto", markets: "Ecuador", lastUpdated: "Dec 14, 2023, 5:54 PM", updatedBy: "Rahman Hayes" },
    { id: "s12", name: "De Prati", industries: "Retail", markets: "Ecuador", lastUpdated: "Sep 27, 2022, 12:35 PM", updatedBy: "Michael Simpson" },
    { id: "s13", name: "De Prati Hogar", industries: "Retail", markets: "Ecuador", lastUpdated: "Sep 27, 2022, 12:35 PM", updatedBy: "Michael Simpson" },
    { id: "s14", name: "Demo Client", industries: "Auto", markets: "113 Markets", lastUpdated: "May 23, 2024, 3:40 AM", updatedBy: "Syafiq Ahmad" },
    { id: "s15", name: "EFPC", industries: "2 Industries", markets: "Peru", lastUpdated: "Mar 1, 2023, 10:22 PM", updatedBy: "Amira Shah" },
    { id: "s16", name: "Elva Movie", industries: "Entertainment", markets: "Chile", lastUpdated: "Sep 10, 2021, 10:58 AM", updatedBy: "Brinda Patel" },
    { id: "s17", name: "Esencial", industries: "Healthcare", markets: "Chile", lastUpdated: "Jan 24, 2022, 4:08 PM", updatedBy: "Brinda Patel" },
    { id: "s18", name: "HUGGIES", industries: "Healthcare", markets: "Peru", lastUpdated: "Oct 7, 2021, 12:58 PM", updatedBy: "Brinda Patel" },
    { id: "s19", name: "KIMBERLY CLARK", industries: "Healthcare", markets: "Peru", lastUpdated: "Oct 7, 2021, 12:58 PM", updatedBy: "Brinda Patel" },
    { id: "s20", name: "MG", industries: "Auto", markets: "Spain", lastUpdated: "Jan 21, 2023, 6:04 AM", updatedBy: "Michael Simpson" },
    { id: "s21", name: "Novibet", industries: "Other", markets: "Ecuador", lastUpdated: "Jan 24, 2023, 10:22 AM", updatedBy: "Michael Simpson" },
    { id: "s22", name: "PaySafe", industries: "Banking", markets: "4 Markets", lastUpdated: "Mar 13, 2023, 4:25 PM", updatedBy: "Rahman Hayes" },
    { id: "s23", name: "Rica Palma", industries: "Food & Beverage", markets: "Ecuador", lastUpdated: "Aug 20, 2024, 5:09 PM", updatedBy: "Juano Alejo" },
    { id: "s24", name: "Superpets", industries: "Entertainment", markets: "Chile", lastUpdated: "Sep 10, 2021, 9:59 AM", updatedBy: "Brinda Patel" },
    { id: "s25", name: "UPEL PITCH", industries: "Education", markets: "Ecuador", lastUpdated: "May 2, 2022, 9:12 AM", updatedBy: "Brinda Patel" },
    { id: "s26", name: "Vilar", industries: "2 Industries", markets: "Chile", lastUpdated: "Oct 28, 2022, 8:03 PM", updatedBy: "Cecilia MartinezSanchez" },
];

const demoDeliverables: Deliverable[] = [
    {
        id: "1",
        name: "Explore Cultural Insights",
        source: "Research Console",
        console: "Research Console",
        createdBy: "System",
        createdDate: "Nov 10, 2025",
        status: "Completed",
        link: "/research-console",
        details: "Market Brief ID, Industry, Description of Target Audience"
    },
    {
        id: "2",
        name: "Generate Brand Research",
        source: "Research Console",
        console: "Research Console",
        createdBy: "System",
        createdDate: "Nov 11, 2025",
        status: "Completed",
        link: "/research-console",
        details: "Market Brief ID, Client, Brand"
    },
    {
        id: "3",
        name: "Elevate Audience Intelligence",
        source: "Research Console",
        console: "Research Console",
        createdBy: "System",
        createdDate: "Nov 12, 2025",
        status: "In Progress",
        link: "/research-console",
        details: "Market Brief ID, Client, Brand, Market, Industry, Brand Competitors, Business Goals / KPIs"
    },
    {
        id: "4",
        name: "Build & Analyze Audiences",
        source: "Research Console",
        console: "Research Console",
        createdBy: "System",
        createdDate: "Nov 13, 2025",
        status: "Pending",
        link: "/research-console",
        details: "Market Brief ID, Description of Target Audience"
    },
    {
        id: "5",
        name: "Strategic Media Plan approved",
        source: "Planning Agent",
        console: "Design Console",
        createdBy: "Planner",
        createdDate: "Nov 14, 2025",
        status: "Approved",
        link: "/planning",
        details: "Market Brief ID, Media Plan Name, Budget, Brand, Dates, Flighting, Audience, Channels"
    },
    {
        id: "6",
        name: "New Library created in Asset Manager",
        source: "Manage Assets (DAM)",
        console: "Design Console",
        createdBy: "Asset Mgr",
        createdDate: "Nov 15, 2025",
        status: "Completed",
        link: "/assets",
        details: "Library creation"
    },
    {
        id: "7",
        name: "Workbook Created",
        source: "Map Content",
        console: "Design Console",
        createdBy: "Content Mgr",
        createdDate: "Nov 16, 2025",
        status: "Completed",
        link: "/content-map",
        details: "Triggered when a new workbook has been created"
    },
    {
        id: "8",
        name: "Creatives Approved",
        source: "Generate Content",
        console: "Design Console",
        createdBy: "Creative Dir",
        createdDate: "Nov 17, 2025",
        status: "Approved",
        link: "/content-gen",
        details: "Triggered when creatives are approved"
    },
    {
        id: "9",
        name: "Tactical Plan Finalized",
        source: "Tactical Plan (FX)",
        console: "Design Console",
        createdBy: "Planner",
        createdDate: "Nov 18, 2025",
        status: "Finalized",
        link: "/tactical-plan",
        details: "Triggered when the tactical plan is approved internally"
    },
    {
        id: "10",
        name: "Digital Campaign Finalized",
        source: "Optimize Keywords",
        console: "Design Console",
        createdBy: "Optimizer",
        createdDate: "Nov 19, 2025",
        status: "Finalized",
        link: "/optimize",
        details: "Triggered when the tactical plan is considered final"
    },
    {
        id: "11",
        name: "Quality Checks Passed",
        source: "Assure Quality",
        console: "FX Trafficking",
        createdBy: "QA System",
        createdDate: "Nov 20, 2025",
        status: "Passed",
        link: "/quality",
        details: "For each platform, the number of checks passed versus the total number of checks"
    },
    {
        id: "12",
        name: "Creative Optimization has been enabled",
        source: "Optimize Creatives",
        console: "Optimize Creatives",
        createdBy: "System",
        createdDate: "Nov 21, 2025",
        status: "Enabled",
        link: "/optimize-creatives",
        details: "Events"
    },
    {
        id: "13",
        name: "Performance/delivery data onboarded",
        source: "Data Platform",
        console: "Data Platform",
        createdBy: "Data System",
        createdDate: "Nov 22, 2025",
        status: "Onboarded",
        link: "/data-platform",
        details: "Triggered when the performance/delivery data is onboarded"
    }
];

const demoMarketBriefs: MarketBrief[] = [
    {
        id: "1",
        name: "Market Brief for Build Campaigns",
        market: "United States",
        forecastedBudget: "--",
        owner: "Sander.Koning",
        dateRange: "--",
        clientName: "Demo Client",
        brandProduct: "Coke Coffee",
        objective: "--",
        projectUrl: "--",
        description: "--",
        deliverables: []
    },
    {
        id: "2",
        name: "U6606099 Demo Client TBD T2 Demo Campaign 1 20251110",
        market: "United States",
        forecastedBudget: "--",
        owner: "syndication",
        dateRange: "--",
        deliverables: demoDeliverables
    },
    { id: "3", name: "U6610440 Demo Client TBD T1 democlientcampaign 20251117", market: "United States", forecastedBudget: "--", owner: "syndication", dateRange: "--" },
    { id: "4", name: "U6610586 Demo Client TBD T2 demo campaign 20251117", market: "United States", forecastedBudget: "--", owner: "syndication", dateRange: "--" },
];

const universalDemoMarketBriefs: MarketBrief[] = [
    { id: "1", name: "AP MB TEST 1", market: "United States", forecastedBudget: "--", owner: "syndication", dateRange: "--" },
    { id: "2", name: "AP MB TEST 2", market: "Demo Market", forecastedBudget: "--", owner: "syndication", dateRange: "--" },
    { id: "3", name: "CB Test Market Brief 1", market: "United States", forecastedBudget: "--", owner: "nicole.willis", dateRange: "--" },
    { id: "4", name: "CB Test Market Brief 2", market: "Demo Market", forecastedBudget: "--", owner: "nicole.willis", dateRange: "--" },
    { id: "5", name: "Demo Market Brief", market: "Demo Market", forecastedBudget: "--", owner: "sander.koning", dateRange: "--" },
    { id: "6", name: "Fictional Coffee Co.", market: "Demo Market", forecastedBudget: "--", owner: "ricko.kruit", dateRange: "--" },
    { id: "7", name: "Hyper Local Campaign", market: "Demo Market", forecastedBudget: "--", owner: "sander.koning", dateRange: "--" },
    { id: "8", name: "IA | DW | Market Brief Test", market: "Demo Market", forecastedBudget: "€1.00", owner: "Dennis.Wiemann", dateRange: "Nov 1, 2025 - Dec 31, 2025" },
    { id: "9", name: "Market Brief 2025 Q1", market: "Demo Market", forecastedBudget: "$100,000.00", owner: "Oleksii.Oleksiienko", dateRange: "Always On" },
    { id: "10", name: "Meta HyperLocal", market: "Demo Market", forecastedBudget: "$1,000,000.00", owner: "matthijs.schakenbos", dateRange: "--" },
    { id: "11", name: "QA Team DM", market: "Demo Market", forecastedBudget: "--", owner: "yurii.salnikov", dateRange: "--" },
    { id: "12", name: "QA Team US", market: "United States", forecastedBudget: "--", owner: "yurii.salnikov", dateRange: "--" },
    { id: "13", name: "Sunrise Brew - National Launch", market: "Demo Market", forecastedBudget: "$2,000,000.00", owner: "Sander.Koning", dateRange: "Jan 1, 2026 - Mar 31, 2026" },
];

const demoClientTeams: ClientTeam[] = [
    {
        id: "1",
        name: "Demo LOB Team: include Vincent, Val and me",
        description: "Demo Client Team",
        members: [
            { name: "Vincent Spruyt", email: "vincent.spruyt@kinesso.com" },
            { name: "Nicole Willis", email: "Nicole.Willis@kinesso.com" },
            { name: "Valerie Savransky", email: "val.Savransky@kinesso.com" },
        ]
    }
];

const demoLinesOfBusiness: LineOfBusiness[] = [
    {
        id: "1",
        name: "Demo LOB",
        brands: [
            { name: "Demo Brand 1", markets: "2 Markets" },
            { name: "Demo Brand 2", markets: "2 Markets" },
        ]
    }
];

export const initialClients: Client[] = [
    {
        id: "1",
        name: "Demo Client",
        status: "Active",
        agencies: "10 Agencies",
        industries: "4 Industries",
        markets: "114 Markets",
        lastUpdated: "Mar 26, 2025, 7:11 PM",
        updatedBy: "Rahman Hayes",
        isExpanded: true,
        subClients: demoSubClients,
        clientId: "50112",
        website: "Open link",
        hierarchy: "--",
        accountOwners: ["vincent.spruyt@kinesso.com"],
        description: "Large company in the Demo Client Business",
        agencyList: "Acxiom, Healix, IPG, IPG Fusion, IPG Health, IPG Mediabrands, Ignite, Initiative, Kinesso, Matterkind, McCann, McCann Healthcare, McCann Worldgroup, Orion, Rapport, Reprise, Rufus, SOLVE(D), Stickyeyes, The Martin Agency, UM",
        regionMarkets: [
            { region: "EMEA", markets: "Germany" },
            { region: "NA", markets: "Demo Market, United States" }
        ],
        marketBriefs: demoMarketBriefs,
        clientTeams: demoClientTeams,
        linesOfBusiness: demoLinesOfBusiness,
    },
    {
        id: "2",
        name: "Omnicom",
        subName: "Omnicom Group (3rd Party Client)",
        status: "Active",
        agencies: "4 Agencies",
        industries: "Parent Level",
        markets: "141 Markets",
        lastUpdated: "Oct 20, 2025, 10:16 AM",
        updatedBy: "Brian Plunkett",
        isExpanded: false,
    },
    {
        id: "3",
        name: "Universal Demo Client",
        subName: "Universal Demo Client Corporation",
        status: "Active",
        agencies: "21 Agencies",
        industries: "Other",
        markets: "3 Markets",
        lastUpdated: "Dec 1, 2025, 2:21 PM",
        updatedBy: "Brian Plunkett",
        isExpanded: false,
        clientId: "56078",
        website: "Open link",
        hierarchy: "--",
        accountOwners: ["vincent.spruyt@kinesso.com"],
        description: "Large company in the Demo Client Business",
        agencyList: "Acxiom, Healix, IPG, IPG Fusion, IPG Health, IPG Mediabrands, Ignite, Initiative, Kinesso, Matterkind, McCann, McCann Healthcare, McCann Worldgroup, Orion, Rapport, Reprise, Rufus, SOLVE(D), Stickyeyes, The Martin Agency, UM",
        regionMarkets: [
            { region: "EMEA", markets: "Germany" },
            { region: "NA", markets: "Demo Market, United States" }
        ],
        marketBriefs: universalDemoMarketBriefs,
        clientTeams: demoClientTeams,
        linesOfBusiness: demoLinesOfBusiness,
    },
    {
        id: "4",
        name: "Demo Brand",
        status: "Active",
        agencies: "2 Agencies",
        industries: "Other",
        markets: "2 Markets",
        lastUpdated: "Dec 1, 2025, 2:21 PM",
        updatedBy: "Brian Plunkett",
        isExpanded: false,
        clientId: "56079",
        marketBriefs: [],
    },
    {
        id: "5",
        name: "Demo Brand 1",
        status: "Active",
        agencies: "2 Agencies",
        industries: "Other",
        markets: "2 Markets",
        lastUpdated: "Dec 1, 2025, 2:21 PM",
        updatedBy: "Brian Plunkett",
        isExpanded: false,
        clientId: "56080",
        marketBriefs: [],
    },
    {
        id: "6",
        name: "Demo Brand 2",
        status: "Active",
        agencies: "2 Agencies",
        industries: "Other",
        markets: "2 Markets",
        lastUpdated: "Dec 1, 2025, 2:21 PM",
        updatedBy: "Brian Plunkett",
        isExpanded: false,
        clientId: "56081",
        marketBriefs: [],
    }
];
