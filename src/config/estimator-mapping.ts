export interface EstimatorOptionDetails {
  key: string;
  label: string;
  description?: string;
  technicalDetails?: string;
  badge?: "Recommended" | "Most Popular" | "Ideal for Startups" | "Best Value" | "Enterprise";
}

export const PROJECT_TYPES_MAPPING: Record<string, EstimatorOptionDetails> = {
  "Website": { key: "Website", label: "Professional Website", description: "A beautifully designed website to showcase your business.", badge: "Ideal for Startups" },
  "Web App": { key: "Web App", label: "Custom Web Application", description: "A cloud-based software running in the browser.", technicalDetails: "Next.js + React + Node.js Backend" },
  "Mobile App": { key: "Mobile App", label: "Mobile App (iOS & Android)", description: "A native application available on app stores.", technicalDetails: "React Native / Expo + Native Modules" },
  "ERP": { key: "ERP", label: "Enterprise Resource Planning (ERP)", description: "A complete system to manage your entire business operations.", badge: "Enterprise", technicalDetails: "Microservices + PostgreSQL + Advanced RBAC" },
  "CRM": { key: "CRM", label: "Customer Relationship Management (CRM)", description: "Manage leads, clients, and sales pipelines efficiently.", technicalDetails: "Data Pipelines + Real-time Sync + Analytics" },
  "AI Automation": { key: "AI Automation", label: "AI Business Automation", description: "Automate manual tasks using Artificial Intelligence.", badge: "Most Popular", technicalDetails: "OpenAI/Anthropic APIs + LangChain + Python" },
  "AI SaaS": { key: "AI SaaS", label: "AI Software as a Service", description: "Build your own AI product to sell to customers.", technicalDetails: "LLM Orchestration + Stripe Billing + Multi-tenant DB" },
  "School ERP": { key: "School ERP", label: "School Management System", description: "Manage students, teachers, fees, and attendance.", technicalDetails: "Multi-role Dashboards + Automated Reporting" },
  "Healthcare": { key: "Healthcare", label: "Healthcare & Clinic System", description: "Manage patients, appointments, and medical records securely.", technicalDetails: "HIPAA Compliant Architecture + End-to-End Encryption" },
  "Restaurant": { key: "Restaurant", label: "Restaurant Management & POS", description: "Take orders, manage tables, and process payments.", technicalDetails: "Real-time WebSockets + Offline Mode Support" },
  "Real Estate": { key: "Real Estate", label: "Real Estate Portal", description: "List properties, manage agents, and handle inquiries.", technicalDetails: "Advanced Search Algorithms + Map Clustering" },
  "Marketplace": { key: "Marketplace", label: "Online Multi-vendor Marketplace", description: "Allow multiple sellers to sell products on your platform.", technicalDetails: "Stripe Connect + Complex Relational Database" },
  "Custom Software": { key: "Custom Software", label: "Custom Software Solution", description: "A unique solution tailored specifically to your needs.", badge: "Recommended" },
};

export const FEATURES_MAPPING: Record<string, EstimatorOptionDetails> = {
  "Authentication": { key: "Authentication", label: "Secure Login & Registration", description: "Allow users to securely create accounts and log in.", technicalDetails: "OAuth 2.0 + NextAuth / Supabase Auth + JWT" },
  "Role Management": { key: "Role Management", label: "Admin & User Roles", description: "Control what different types of users can see and do.", technicalDetails: "Role-Based Access Control (RBAC) + Middleware Protection" },
  "Dashboard": { key: "Dashboard", label: "Admin Dashboard", description: "A centralized command center to monitor your business.", badge: "Recommended", technicalDetails: "React Recharts + Data Aggregation pipelines" },
  "CMS": { key: "CMS", label: "Content Management (CMS)", description: "Easily update text and images without a developer.", technicalDetails: "Headless CMS integration (Sanity / Strapi / Custom)" },
  "Reports": { key: "Reports", label: "Data Reports", description: "Exportable reports for business insights (PDF/Excel).", technicalDetails: "Server-side PDF generation + CSV streaming" },
  "Analytics": { key: "Analytics", label: "Visual Analytics", description: "Interactive charts and graphs for business intelligence.", technicalDetails: "Time-series database queries + D3.js / Recharts" },
  "Inventory": { key: "Inventory", label: "Inventory Management", description: "Track stock levels, suppliers, and automated alerts.", technicalDetails: "Transactional Database + Concurrency Control" },
  "Booking System": { key: "Booking System", label: "Booking & Reservations", description: "Allow customers to book dates or services.", technicalDetails: "Calendar sync algorithms + Timezone handling" },
  "Appointments": { key: "Appointments", label: "Appointment Scheduling", description: "Book time slots with specific staff members.", technicalDetails: "Conflict resolution algorithms + CRON job reminders" },
  "Notifications": { key: "Notifications", label: "In-App Alerts", description: "Notify users about important updates inside the app.", technicalDetails: "WebSockets / Server-Sent Events (SSE)" },
  "Push Notifications": { key: "Push Notifications", label: "Mobile Push Notifications", description: "Send alerts directly to the user's phone screen.", technicalDetails: "Firebase Cloud Messaging (FCM) / APNs" },
  "Email": { key: "Email", label: "Automated Emails", description: "Send welcome emails, receipts, and password resets.", technicalDetails: "Resend / SendGrid API + React Email templates" },
  "SMS": { key: "SMS", label: "SMS Alerts", description: "Send text messages to users' phones.", technicalDetails: "Twilio / MessageBird API Integration" },
  "Maps": { key: "Maps", label: "Interactive Maps", description: "Display locations, routes, or tracking on a map.", technicalDetails: "Google Maps API / Mapbox GL JS" },
  "Chat": { key: "Chat", label: "Live Chat / Messaging", description: "Real-time communication between users or support.", technicalDetails: "WebSockets / Socket.io + Message Persistence" },
  "Blogs": { key: "Blogs", label: "Blog System", description: "Publish articles to improve SEO and engage customers.", technicalDetails: "MDX parsing + Static Site Generation (SSG)" },
  "CRM": { key: "CRM", label: "Mini CRM", description: "Basic customer relationship tracking module.", technicalDetails: "Relational modeling + Lead pipelines" },
  "ERP": { key: "ERP", label: "Mini ERP", description: "Core resource planning features within your app.", technicalDetails: "Complex state management + Audit logs" },
  "Invoices": { key: "Invoices", label: "Automated Invoicing", description: "Automatically generate and send invoices to clients.", technicalDetails: "Dynamic PDF Generation + Stripe Webhooks" },
  "File Upload": { key: "File Upload", label: "Secure File Uploads", description: "Allow users to upload documents or images securely.", technicalDetails: "AWS S3 / Cloudinary + Presigned URLs" },
  "Multi-language": { key: "Multi-language", label: "Multi-language Support", description: "Translate your app into multiple languages.", technicalDetails: "i18n (Internationalization) + Locale routing" },
  "Dark Mode": { key: "Dark Mode", label: "Dark & Light Mode", description: "Allow users to switch app themes.", technicalDetails: "CSS Variables + System preference detection" },
  "Offline Mode": { key: "Offline Mode", label: "Works Offline", description: "The app works even without an internet connection.", technicalDetails: "Service Workers + IndexedDB Local Sync" },
  "Vendor Dashboard": { key: "Vendor Dashboard", label: "Vendor / Partner Dashboard", description: "A separate login area for external partners to manage their data.", technicalDetails: "Multi-tenant architecture + Data isolation" },
  "Payment Module": { key: "Payment Module", label: "Online Payments", description: "Accept credit cards and digital payments securely.", badge: "Recommended", technicalDetails: "Stripe / PayPal Integration + PCI Compliance" },
  "Order Management": { key: "Order Management", label: "Order Tracking", description: "Manage orders from placement to delivery.", technicalDetails: "State machine logic for order statuses" },
  "Reviews and Ratings": { key: "Reviews and Ratings", label: "Customer Reviews", description: "Allow users to rate and review products or services.", technicalDetails: "Aggregated rating calculations + Moderation tools" },
};

export const AI_FEATURES_MAPPING: Record<string, EstimatorOptionDetails> = {
  "AI Assistant": { key: "AI Assistant", label: "Smart Chat Assistant", description: "An intelligent chatbot that talks to your customers like a human.", badge: "Most Popular", technicalDetails: "OpenAI GPT-4o + System Prompt Engineering" },
  "AI Search": { key: "AI Search", label: "Intelligent Search", description: "Search that understands meaning, not just exact keywords.", technicalDetails: "Vector Embeddings + Cosine Similarity Search" },
  "Automation": { key: "Automation", label: "AI Task Automation", description: "Let AI handle repetitive data entry and sorting automatically.", technicalDetails: "Agentic Workflows + Structured JSON Outputs" },
  "Vector Database": { key: "Vector Database", label: "Custom Knowledge Memory", description: "The AI remembers your company's documents and specific data.", technicalDetails: "Pinecone / Qdrant + Chunking & Retrieval Strategy (RAG)" },
  "Knowledge Base": { key: "Knowledge Base", label: "AI Trained on Your Data", description: "Upload PDFs and let AI answer questions based on them.", technicalDetails: "Document Parsing + Semantic Retrieval-Augmented Generation" },
  "Analytics and Monitoring": { key: "Analytics and Monitoring", label: "AI Insights Dashboard", description: "AI analyzes your business data to find trends and recommendations.", technicalDetails: "Data Pipeline + LLM Analysis Agents" },
};

export const INTEGRATIONS_MAPPING: Record<string, EstimatorOptionDetails> = {
  "API Integration": { key: "API Integration", label: "General System Connection", description: "Connect with standard third-party services.", technicalDetails: "RESTful API / GraphQL consumer implementation" },
  "WhatsApp Integration": { key: "WhatsApp Integration", label: "WhatsApp Automation", description: "Send automated alerts or run a chatbot directly on WhatsApp.", badge: "Most Popular", technicalDetails: "WhatsApp Cloud API + Webhook listeners" },
  "Google Maps": { key: "Google Maps", label: "Google Maps & Locations", description: "Show rich interactive maps and calculate distances.", technicalDetails: "Google Maps SDK + Geocoding APIs" },
  "Google Login": { key: "Google Login", label: "Sign in with Google", description: "Allow users to log in with one click using their Google account.", technicalDetails: "OAuth 2.0 flow + Identity verification" },
  "Social Login": { key: "Social Login", label: "Facebook / Apple Login", description: "One-click login using social media accounts.", technicalDetails: "Multi-provider OAuth configuration" },
  "Custom APIs": { key: "Custom APIs", label: "Complex Custom Integration", description: "Connect with specialized or legacy business systems.", technicalDetails: "Custom API development + Data transformation layer" },
};

export const PLATFORMS_MAPPING: Record<string, EstimatorOptionDetails> = {
  "Website": { key: "Website", label: "Public Website", description: "Accessible to anyone on the internet.", badge: "Recommended", technicalDetails: "Responsive Web Design + Next.js App Router" },
  "Android": { key: "Android", label: "Android Application", description: "Available on the Google Play Store.", technicalDetails: "React Native Android Build + Google Play Console" },
  "iPhone": { key: "iPhone", label: "iOS Application", description: "Available on the Apple App Store.", technicalDetails: "React Native iOS Build + Apple Developer Program" },
  "Admin Dashboard": { key: "Admin Dashboard", label: "Internal Admin Portal", description: "For business owners to manage the platform.", badge: "Recommended", technicalDetails: "Secure Web Application + Admin RBAC" },
  "Employee Portal": { key: "Employee Portal", label: "Staff Workspace", description: "For employees to manage their tasks and data.", technicalDetails: "Role-specific UI routing + Secure Web App" },
  "Customer Portal": { key: "Customer Portal", label: "Client Account Area", description: "For your customers to log in and see their history.", technicalDetails: "Client-side rendering + Session management" },
  "Vendor Portal": { key: "Vendor Portal", label: "Partner/Vendor Area", description: "For external partners to manage their inventory/services.", technicalDetails: "Multi-tenant data partitioning" },
  "Desktop App": { key: "Desktop App", label: "Windows / Mac Software", description: "Installable software for desktop computers.", technicalDetails: "Electron / Tauri wrapping Web Technologies" },
};
