import icon1 from "../assets/Procter_&_Gamble_logo.svg";
import icon2 from "../assets/qoomita-logo.png";
import icon3 from "../assets/project-placeholder-3.svg";
import icon4 from "../assets/project-placeholder-1.svg";
import logistic1 from "../assets/logistics-1.png";
import logistic2 from "../assets/logistics-2.jpg";
import ledger1 from "../assets/ledger-sc1.jpg";
import ledger2 from "../assets/ledger-sc2.jpg";
import business1 from "../assets/qoomita-1.png"
import business2 from "../assets/qoomita-2.png"
import pharmacy1 from "../assets/pharmacy-1.png"
import pharmacy2 from "../assets/pharmacy-2.png"
import dental1 from "../assets/project-placeholder-1.svg"
import dental2 from "../assets/project-placeholder-2.svg"

export type ProjectScreenshot = {
  src: string;
  alt: string;
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  year: string;
  role: string;
  tags: string[];
  icon: string;
  kind: "mobile" | "web";
  badge?: string;
  screenshots: ProjectScreenshot[];
  links?: ProjectLink[];
  context?: string;
  challenges?: string[];
  solutions?: string[];
  outcomes?: string[];
};

export const projects: Project[] = [
  {
    id: "logistics-companion",
    name: "Logistics Companion",
    description:
      "An offline-first logistics app for Procter & Gamble's field and warehouse operations.",
    longDescription:
      "Logistics Companion (internal: PG Logistics) is an enterprise-grade cross-platform application built for Procter & Gamble's field and warehouse operations across the Philippines. The app replaces paper-based workflows with a digital-first approach, enabling real-time shipment tracking, returns (RTV/RMA) processing, transmittal form management, barcode scanning, digital signature capture, and AI-assisted document scanning — all while functioning reliably in environments with intermittent connectivity. Built with React Native, Expo, and WatermelonDB, it runs on Android, and Web from a single codebase via Expo Router.",
    year: "2024",
    role: "Software Developer",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "WatermelonDB",
      "SQLite (expo-sqlite)",
      "React Native Elements",
      "React Native Paper",
      "AG Grid (web)",
    ],
    icon: icon1,
    kind: "mobile",
    badge: "Enterprise",
    screenshots: [
      { src: logistic2, alt: "Logistics Companion — shipments list" },
      { src: logistic1, alt: "Logistics Companion — scan and capture" },
    ],
    context: "Built at Ascensoft · Procter & Gamble",
    challenges: [
      "Unreliable network connectivity in warehouses and during transit requiring true offline-first architecture",
      "Complex permissioned roles (driver, warehouse staff, supervisor, admin) with scope-based access control",
      "Large data sync requirements (10k+ barcode records, transmittal forms) with conflict resolution and atomic transactions",
      "Barcode/QR scanning with device camera and external Bluetooth scanners across Android, and Web",
      "Digital signature capture for carrier pickups and warehouse receipts with offline persistence",
      "AI-assisted document scanning (ML Kit text recognition) for automated data extraction",
      "Background sync and upload tasks that survive app termination",
      "Schema migrations for evolving offline database across app versions",
    ],
    solutions: [
      "Expo Router for type-safe file-based navigation and deep linking across all three platforms",
      "Atomic WatermelonDB sync service: batch chunked writes (500 records/chunk) in single transactions with safety guards against empty-server-over-local-data",
      "Expo Camera + Barcode Scanner + react-native-ml-kit/text-recognition for unified scanning abstraction across platforms",
      "react-native-signature-canvas for signature capture with base64 encoding and offline queue",
      "Expo Background Fetch + Task Manager for background AI scan uploads and signature hydration tasks",
      "Role-based scope system (returns:returns.read/write, shipments:shipments.write, returns:transmittal-form.read, etc.) enforced at navigation and API layers",
      "AG Grid for high-performance web data grids (transmittal forms, returns lists) with virtualization",
    ],
    outcomes: [
      "Reduced shipment/returns processing time by ~40% across 12+ warehouse sites",
      "Eliminated paper forms for RTV/RMA, transmittal forms, and scanning operations",
      "Zero data loss during extended pilot with 200+ daily active users across intermittent connectivity",
      "Adopted as standard tooling for P&G logistics in the region (Android, iOS, Web)",
      "Background sync processes 5000+ records in under 30s via chunked atomic transactions",
      "Schema migration system enables zero-downtime database evolution across app versions",
    ],
  },
  {
    id: "business-operations",
    name: "Business Operations",
    description:
      "A cross-platform operations app that runs a small business's back office.",
    longDescription:
      "Business Operations is a comprehensive cross-platform ERP application that consolidates a business's daily operations — sales, purchases, inventory, cash flow, multi-bank reconciliation, currency conversions, project management, and payroll — into a single unified interface. Built with React Native, Expo Router, and AG Grid, it runs on Android, and Web from a single codebase. Features role-based access control, real-time dashboards with charting, digital signatures, and offline-capable workflows.",
    year: "2024",
    role: "Software Developer",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "React Native Elements",
      "React Native Paper",
      "AG Grid (Community + Enterprise)",
      "AsyncStorage",
      "REST API",
    ],
    icon: icon2,
    kind: "web",
    badge: "Cross-Platform",
    screenshots: [
      { src: business1, alt: "Ascensoft Business Suite — dashboard" },
      { src: business2, alt: "Ascensoft Business Suite — sales and inventory" },
    ],
    context: "Built at Ascensoft · Internal release",
    challenges: [
      "Multi-currency, multi-bank cash flow tracking with daily reconciliation across 4+ banks and 3+ currencies",
      "Real-time inventory sync across sales orders, purchase orders, transfer orders, and warehouse locations",
      "Complex role-based permissions (owner, manager, cashier, accountant, staff) with scope-based access control",
      "Unified navigation and state management across web and mobile from single Expo Router codebase",
      "Dynamic charting and visualization for collection dashboards, USD rate trends, and KPIs",
      "Multi-tenant architecture with company isolation and user invitations",
    ],
    solutions: [
      "Expo Router 4 for universal file-based routing across Android, iOS, and Web",
      "AG Grid Enterprise for high-performance data grids with virtualization, server-side row model, and Excel export",
      "react-native-gifted-charts for interactive pie/line charts (collection dashboards, currency rate trends)",
      "Custom currency conversion service with daily rate caching and multi-bank reconciliation workflows",
      "React Native Elements + React Native Paper for consistent cross-platform UI components",
      "Scope-based authorization (spin:dashboards.read, spin:sales.write, spin:inventory.read, etc.) enforced at navigation and API layers",
      "Multi-tenant session context with company switching and user invitation flows",
    ],
    outcomes: [
      "Consolidated 5+ separate tools (spreadsheets, POS, banking apps, chat, task manager, inventory) into one platform",
      "Reduced end-of-day reconciliation from 2 hours to 15 minutes via automated multi-bank matching",
      "Enabled owner to monitor real-time cash position across 4+ banks and 3+ currencies with daily USD rate tracking",
      "Deployed simultaneously to web (admin dashboards) and mobile (field staff) from single codebase",
      "Real-time collection dashboard with settled vs. not-settled and paid vs. not-paid KPIs",
      "Project management module with dimensions, task tracking, and resource allocation",
      "Payroll integration with configurable pay periods and compliance reporting",
    ],
  },
  {
    id: "ledger",
    name: "Ledger",
    description:
      "A privacy-first personal finance tracker with recurring bills, savings goals, and spending analytics.",
    longDescription:
      "Ledger is a full-featured personal finance web application built for manual-entry enthusiasts who want complete control over their financial data without linking bank accounts. It combines a monthly ledger view with recurring bill tracking, a shared savings pot with visual goal progression, spending category analytics, and forward-looking cash flow projections — all backed by Firebase for real-time sync and offline resilience.",
    year: "2026",
    role: "Solo Project",
    tags: ["React", "TypeScript", "Vite", "Firebase", "Firestore", "Tailwind CSS", "Chart.js", "React Compiler"],
    icon: icon3,
    kind: "web",
    badge: "Personal",
    screenshots: [
      { src: ledger1, alt: "Ledger — monthly summary with running balance and savings pot" },
      { src: ledger2, alt: "Ledger — finance calendar with bill reminders and transaction list" },
    ],
    context: "Personal project · Web App",
    challenges: [
      "Designing a flexible transaction model supporting income, expenses, bills, and bidirectional savings transfers",
      "Computing running balances and projections across months with recurring bill schedules",
      "Building a shared savings pot where multiple goals draw from one pool with visual progress",
      "Implementing undo/redo for destructive actions without server round-trips",
      "Real-time Firestore sync with offline-first UX and no composite indexes",
    ],
    solutions: [
      "Typed transaction schema (income/expense/bill/savings) with discriminated unions for type-safe operations",
      "Month-keyed balance outlook engine projecting 12 months forward with cumulative running balance",
      "Savings journey visualization: single pot balance mapped to multiple goals with position percentages",
      "Client-side undo stack with staged restores for transactions, bills, and goals",
      "Firestore listener by userId only — client-side sort/filter avoids composite index requirements",
      "Lazy-loaded app shell: auth loads first, full ledger code-split via React.lazy + Suspense",
    ],
    outcomes: [
      "Personally used for 2+ years with 1,500+ tracked transactions across multiple devices",
      "Zero data loss across migrations; offline writes merge cleanly on reconnect",
      "Informed UX patterns for bill reminders and savings goals later used in client projects",
      "Achieves sub-2s interactive load on cold start via code splitting and minimal auth bundle",
    ],
  },
  {
    id: "pharmacy-pos",
    name: "Pharmacy Management System with POS",
    description:
      "A web-based pharmacy management system with integrated Point of Sale (POS), inventory tracking, and sales analytics.",
    longDescription:
      "A comprehensive pharmacy management system built as a thesis project during college. The system features a full-featured Point of Sale (POS) module for processing sales transactions, inventory management with stock tracking and expiration monitoring, category and product management, sales reporting with charts, user management with role-based access, and a dashboard for business insights. Built with React (CRA), Redux Toolkit for state management, React Router for navigation, Chart.js for analytics visualization, and a Node.js/Express backend with MongoDB.",
    year: "2022",
    role: "Frontend Developer",
    tags: [
      "React",
      "Redux Toolkit",
      "React Router",
      "Chart.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT Auth",
    ],
    icon: icon4,
    kind: "web",
    badge: "Thesis Project",
    screenshots: [
      { src: pharmacy1, alt: "Pharmacy POS — Point of Sale interface" },
      { src: pharmacy2, alt: "Pharmacy POS — Dashboard with sales analytics" },
    ],
    context: "College Thesis Project · TUP Manila",
    challenges: [
      "Building a responsive POS interface with real-time cart calculations and stock validation",
      "Implementing role-based access control (admin, pharmacist, cashier) with JWT authentication",
      "Managing complex product state with Redux Toolkit (cart, inventory, sales history)",
      "Creating sales analytics dashboard with Chart.js visualizations",
      "Handling product expiration tracking and low-stock alerts",
    ],
    solutions: [
      "React Select for searchable product dropdown with stock-aware quantity validation",
      "Redux Toolkit slices for modular state management (products, sales, users, categories)",
      "Headless UI Dialog/Transition for accessible modal interactions (quantity editing, receipts)",
      "React Hot Toast for user feedback on actions and validation errors",
      "Tailwind CSS for rapid, responsive UI development",
      "Express async handler + centralized error handling for clean backend code",
      "Mongoose models with timestamps for audit trails on sales and inventory changes",
    ],
    outcomes: [
      "Complete POS workflow: product selection → quantity validation → cart → payment → receipt",
      "Real-time inventory deduction on sale with stock availability checks",
      "Sales reports with date filtering and visual charts (bar charts for daily/weekly/monthly)",
      "Expired products tracking page with automated flagging",
      "Multi-user system with role-based permissions (admin manages users/products, cashier processes sales)",
      "Deployed and presented as a working thesis prototype",
    ],
  },
  {
    id: "dental-appointment",
    name: "Dental Appointment Scheduling System with Inventory",
    description:
      "A web-based dental clinic management system with appointment scheduling, patient management, and dental supplies inventory tracking.",
    longDescription:
      "A comprehensive dental clinic management system built as a freelance project during college. The system features a public landing page with service showcase, patient registration and authentication, appointment booking with calendar view, dentist dashboard for schedule management, admin panel for patient/appointment/supplies management, and inventory tracking for dental supplies. Built with React + Vite, React Router for navigation, Tailwind CSS for styling, React Datepicker for appointment scheduling, React Data Table Component for data grids, and a Node.js/Express backend with MySQL database and JWT authentication. The frontend was developed independently while a colleague handled the backend.",
    year: "2022",
    role: "Frontend Developer (Freelance)",
    tags: [
      "React",
      "Vite",
      "React Router",
      "Tailwind CSS",
      "React Datepicker",
      "React Data Table Component",
      "React Icons",
      "Axios",
      "Node.js",
      "Express",
      "MySQL",
      "JWT Auth",
    ],
    icon: dental1,
    kind: "web",
    badge: "Freelance",
    screenshots: [
      { src: dental1, alt: "Dental System — Landing page with services" },
      { src: dental2, alt: "Dental System — Appointment booking calendar" },
    ],
    context: "Freelance College Project · TUP Manila",
    challenges: [
      "Building a public-facing landing page with service showcase and responsive design",
      "Implementing dual authentication flows (patient vs dentist) with role-based routing",
      "Creating an intuitive appointment booking experience with calendar and time-slot selection",
      "Building dentist dashboard with schedule visualization and patient management",
      "Developing admin panel with data tables for patients, appointments, and supplies inventory",
      "Integrating with REST API for all CRUD operations and real-time availability checks",
    ],
    solutions: [
      "React Router v6 with protected routes for patient/dentist/admin role separation",
      "React Datepicker for interactive appointment scheduling with disabled past dates",
      "React Data Table Component for sortable, paginated admin tables (patients, appointments, supplies)",
      "AuthContext for global auth state management with token persistence",
      "Tailwind CSS for rapid, consistent UI across landing page, dashboards, and forms",
      "Axios interceptors for automatic JWT attachment and error handling",
      "Responsive design breakpoints for mobile appointment booking",
    ],
    outcomes: [
      "Complete patient journey: landing page → registration → login → book appointment → view history",
      "Dentist dashboard with calendar view, pending/confirmed appointments, and patient profiles",
      "Admin panel with full CRUD for patients, appointments, and dental supplies inventory",
      "Inventory tracking for dental supplies with low-stock visibility",
      "JWT-based authentication with httpOnly cookies for secure session management",
      "Delivered as a working system for a dental clinic client",
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectPaths(): string[] {
  return projects.map((p) => p.id);
}