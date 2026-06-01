import { ExperienceProps } from "../ui/components/code/experience";

export type WORKS = {
  id: string;
  title: string;
  company?: string;
  description?: string;
  dates?: string;
  location?: string;
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

export const WORK_EXPERIENCES: WORKS[] = [
  {
    id: "fullstack-woflow",
    title: "Senior Fullstack Engineer",
    company: "Woflow Inc",
    location: "San Francisco, CA, USA (Remote)",
    dates: "Nov 2022 – Mar 2026  (3 yrs 5 mos)",
    description:
      "Woflow automates structured data operations for enterprise clients including Walmart, DoorDash, UberEats, Square, and Lightspeed.",
    texts: [
      "Contributed to the company's customer-facing AI agent platform, implementing an MCP-based tool integration layer that exposed capabilities to AI agents, and a configuration wizard enabling clients to build and deploy agents without engineering support.",
      "Designed and implemented an agent versioning system introducing snapshot-based version control — allowing users to compare agent performance across draft, published, and historical versions with different tools, knowledge bases, and skills. Previously, agents had no version history.",
      "Built a human-in-the-loop data ingestion pipeline for Walmart: a fullstack feature enabling operators to upload large retail CSVs, parse them into products and sub-products, review structured output, and trigger agent ingestion — handling high-volume catalog data at enterprise scale.",
      "Led engineering support for legacy XtremeAI clients post-acquisition, maintaining platform stability and resolving critical issues during migration.",
      "Collaborated within a cross-functional team of 10–20 engineers to deliver scalable solutions across frontend and backend.",
    ],
    stack: [
      "React",
      "Next.Js",
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
    company: "Fonoma LLC ",
    location: "Remote",
    dates: "Apr 2017 – Oct 2022  (5 yrs 7 mos)",
    description:
      "Fonoma is a telecom-focused SaaS product with 200,000+ users, delivered by a lean frontend team of fewer than 5 developers.",
    texts: [
      "Led frontend implementation across the full product UI/UX surface as part of a team of fewer than 5 frontend developers serving 200,000+ users.",
      "Built and maintained React/Next.js components and static landing pages using TypeScript and styled-components.",
      "Established and maintained test coverage above 85% using Jest and React Testing Library.",
      "Contributed to backend REST API development using Python and Django on Google App Engine.",
      "Maintained and modernised the legacy AngularJS client — creating controllers, directives, and services — during migration to React.",
      "Participated in Agile ceremonies to plan, review, and ship product iterations.",
    ],
    stack: [
      "React",
      "Next.Js",
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
    dates: "2021 – 2022 ",
    texts: [
      "Developed and maintained mobile application features for Aerial using Flutter (Dart).",
      "Built two cross-platform Ionic/Angular 12 applications for American Iron & Metal (AIM): one for managing auto parts sales and one for tracking vehicle catalysts across physical warehouse locations.",
      "Delivered a full e-commerce platform using React, TypeScript, Next.js, NextAuth, and Mat erial UI.",
      "Participated in Agile/SCRUM ceremonies including sprint planning, daily standups, backlog grooming, and sprint reviews.",
    ],
    stack: ["React", "Next.Js", "TypeScript", "Ionic", "Angular", "Flutter"],
  },
  {
    id: "engineer-copsonic",
    title: "Software Engineer",
    company: "Copsonic",
    location: "Remote",
    dates: "May 2016 – Aug 2017 ",
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
    title: "Máster en Programación Web",
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
