export type WORKS = {
  id: string;
  title: string;
  company?: string;
  description?: string;
  dates?: string;
  location?: string;
  /** One-line impact statement shown in the Preview timeline. */
  highlight?: string;
  texts: string[];
  stack?: string[];
};

export type Education = {
  id: string;
  title: string;
  centerName: string;
  location: string;
  dates: string;
  description?: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  icon: string;
  skills: string[];
};

export type Metric = {
  id: string;
  value: string;
  label: string;
};

export type Language = {
  id: string;
  name: string;
  level: string;
};

export const CONTACT = {
  email: "wuj890312@gmail.com",
  whatsapp: "https://wa.me/34695135544",
  linkedin: "https://www.linkedin.com/in/wilber-ulloa-jorge-868960a0/",
  location: "Seville, Spain",
  availability: "Open to Senior Frontend Engineer roles",
  workMode: "Remote, or hybrid in Europe",
};

export const CV_PDF_PATH = "/Wilber_Ulloa_CV.pdf";

export const WORK_EXPERIENCES: WORKS[] = [
  {
    id: "fullstack-woflow",
    title: "Senior Fullstack Engineer",
    company: "Woflow Inc",
    location: "San Francisco, CA, USA (Remote)",
    dates: "Nov 2022 – Apr 2026  (3 yrs 6 mos)",
    description:
      "Woflow automates structured data operations for enterprise clients including Walmart, DoorDash, UberEats, Square, and Lightspeed.",
    highlight:
      "Built the customer-facing AI agent platform — MCP tool integrations, a no-code agent wizard and a human-in-the-loop data pipeline for Walmart.",
    texts: [
      "Contributed to the company's customer-facing AI agent platform, implementing an MCP-based tool integration layer that exposed capabilities to AI agents, and a configuration wizard enabling clients to build and deploy agents without engineering support.",
      "Designed and implemented an agent versioning system introducing snapshot-based version control — allowing users to compare agent performance across draft, published, and historical versions with different tools, knowledge bases, and skills. Previously, agents had no version history.",
      "Built a human-in-the-loop data ingestion pipeline for Walmart: a fullstack feature enabling operators to upload large retail CSVs, parse them into products and sub-products, review structured output, and trigger agent ingestion — handling high-volume catalog data at enterprise scale.",
      "Maintained and extended Ruby on Rails backend services, navigating a complex monolith across models, controllers, and API layers — owning cross-layer features end-to-end without handoff.",
      "Led engineering support for legacy XtremeAI clients post-acquisition, maintaining platform stability and resolving critical issues during migration.",
      "Collaborated within a cross-functional team of 10–20 engineers to deliver scalable solutions across frontend and backend.",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Ruby on Rails",
      "Supabase",
      "Tailwind CSS",
      "LangGraph",
      "LangChain",
      "MCP",
    ],
  },
  {
    id: "frontend-fonoma",
    title: "Frontend Developer",
    company: "Fonoma LLC",
    location: "Remote",
    dates: "Apr 2017 – Oct 2022  (5 yrs 7 mos)",
    description:
      "Fonoma is a telecom-focused SaaS product with 200,000+ users, delivered by a lean frontend team of fewer than 5 developers.",
    highlight:
      "Led the full AngularJS-to-React migration and the shared component library behind a product serving 200,000+ users.",
    texts: [
      "Led the full AngularJS-to-React migration across the entire client codebase — modernising architecture under continuous production constraints with no downtime.",
      "Built and maintained the shared React/Next.js component library powering the full product UI/UX surface for 200,000+ users, as part of a frontend team of fewer than 5.",
      "Established and maintained test coverage above 85% using Jest and React Testing Library across 5+ years of continuous delivery.",
      "Contributed to backend REST API development using Python and Django on Google App Engine.",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Django",
      "styled-components",
      "Jest",
      "React Testing Library",
    ],
  },
  {
    id: "frontend-freelance",
    title: "Frontend Developer",
    company: "Self-employed (Freelance)",
    location: "Remote",
    dates: "2021 – 2022",
    highlight:
      "Shipped a full e-commerce platform solo in under 8 weeks, alongside cross-platform apps in Ionic and Flutter.",
    texts: [
      "Delivered a full e-commerce platform using React, TypeScript, Next.js, NextAuth, and Material UI — solo, in under 8 weeks.",
      "Built two cross-platform Ionic/Angular 12 applications for American Iron & Metal (AIM): one for managing auto parts sales and one for tracking vehicle catalysts across physical warehouse locations.",
      "Developed and maintained mobile application features for Aerial using Flutter (Dart).",
    ],
    stack: ["React", "Next.js", "TypeScript", "Ionic", "Angular", "Flutter"],
  },
  {
    id: "engineer-copsonic",
    title: "Software Engineer",
    company: "Copsonic",
    location: "Remote",
    dates: "May 2016 – Aug 2017",
    highlight:
      "Built native Android apps for ultrasound-based device communication on the CopSonic SDK.",
    texts: [
      "Built SonicQRCode, a native Android application enabling ultrasound-based communication between mobile devices and web components using the CopSonic SDK.",
      "Developed Nikon 360 Viewer, a native Android app for displaying 360° video content from Nikon's 360-degree camera hardware.",
      "Built additional Android SDK demo applications for testing CopSonic on mobile and wearable devices.",
    ],
    stack: ["Java", "Android SDK", "JavaScript"],
  },
];

export const EDUCATION: Education[] = [
  {
    id: "cei-master",
    title: "Master's — Web Design & Development",
    location: "Seville, Spain",
    centerName: "CEI Centro de Estudios de Innovación",
    dates: "2023",
    description:
      "Focus: HTML5, CSS3, MERN stack (MongoDB, Express, React, Node.js)",
  },
  {
    id: "cuaje",
    title: "Engineer's Degree — Automation & Software Design",
    location: "Havana, Cuba",
    centerName: "Instituto Superior Politécnico José Antonio Echeverría",
    dates: "2008 - 2013",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "/icons/palette.svg",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "styled-components",
      "Redux",
      "Material UI",
      "HTML5",
      "CSS3",
      "SASS",
    ],
  },
  {
    id: "testing",
    label: "Testing",
    icon: "/icons/lab.svg",
    skills: ["Jest", "React Testing Library", "Storybook"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "/icons/tags.svg",
    skills: [
      "Node.js",
      "Ruby on Rails",
      "Python",
      "Django",
      "FastAPI",
      "REST APIs",
      "Supabase",
      "Google App Engine",
    ],
  },
  {
    id: "ai-agents",
    label: "AI & Agents",
    icon: "/icons/sparkle.svg",
    skills: [
      "LangGraph",
      "LangChain",
      "MCP (Model Context Protocol)",
      "RAG",
      "Claude Code",
      "Prompt engineering",
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: "/icons/phone.svg",
    skills: ["React Native", "Flutter", "Ionic"],
  },
  {
    id: "tools",
    label: "Tools & Methods",
    icon: "/icons/tools.svg",
    skills: ["Git", "GitHub", "CI/CD", "Docker", "Figma", "Agile/Scrum"],
  },
];

export const METRICS: Metric[] = [
  { id: "years", value: "8+", label: "years building web products" },
  { id: "users", value: "200k+", label: "users served on a single product" },
  { id: "coverage", value: "85%+", label: "test coverage maintained" },
];

export const ENTERPRISE_CLIENTS = [
  "Walmart",
  "DoorDash",
  "UberEats",
  "Square",
  "Lightspeed",
];

export const LANGUAGES: Language[] = [
  { id: "es", name: "Spanish", level: "Native" },
  { id: "en", name: "English", level: "C1 · Advanced" },
];
