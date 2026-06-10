import Image from "next/image";
import { Courier_Prime } from "next/font/google";
import { Experience } from "./experience";
import { WORK_EXPERIENCES, EDUCATION } from "@/app/data/constants";
import { Education } from "./education";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function Code() {
  return (
    <div
      className={`${courierPrime.className} antialiased flex flex-col sm:flex-row h-full`}
    >
      {/* Left panel — never scrolls, image stays pinned */}
      <div className="w-full sm:w-[20%] shrink-0 flex flex-col items-center pt-28 sm:pt-48 px-8">
        <div className="relative w-[150px] h-[150px] sm:w-[280px] sm:h-[280px]">
          <Image src="/profile-rounded.png" alt="Profile Image" fill />
        </div>
      </div>

      {/* Right panel — scrolls independently, scrollbar hidden.
          id="code-scroll" marks it as the only scrollable area of the overlay
          (the page.tsx wheel/touch blocker lets its events through), and
          overscroll-contain stops boundary scrolls from chaining to the page. */}
      <div
        id="code-scroll"
        className="flex-1 overflow-y-scroll overscroll-contain pt-12 sm:pt-48 pb-20 pr-6 sm:pr-20 pl-6 [&::-webkit-scrollbar]:hidden mask-t-from-90% mask-t-to-100%"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-col justify-start">
          <h2 className="text-neon-blue text-lg sm:text-xl font-bold">
            Senior Frontend Engineer / React / Next.js / TypeScript / AI-Powered
            Products
          </h2>
          <ul className="border-l border-gray-400 pl-4 pr-0 mr-0 sm:pr-10 sm:pl-10 ml-2 sm:mx-4 my-4">
            <li className="text-neon-green text-lg sm:text-xl font-bold">
              Seville, Spain
            </li>
            <li className="text-neon-green text-lg sm:text-xl font-bold">
              +34 695 135 544
            </li>
            <li className="text-neon-green text-lg sm:text-xl font-bold">
              wuj890312@gmail.com
            </li>
            <li className="text-neon-green text-lg sm:text-xl font-bold">
              linkedin.com/in/wilber-ulloa-jorge-868960a0
            </li>
          </ul>
          <h2 className="text-neon-yellow text-lg sm:text-xl font-bold">
            Professional Summary
          </h2>
          <p className="text-lg sm:text-xl text-neon-blue font-bold border-l border-gray-400 py-2 pl-4 pr-0 ml-2 mr-0 sm:px-10 sm:mx-4 my-4">
            Senior Frontend Engineer with 8+ years of experience building
            high-quality web products — from fast-moving startups to platforms
            serving enterprise clients including Walmart, DoorDash, UberEats,
            Square, and Lightspeed. Specialises in React, Next.js, and
            TypeScript, with deep experience in component architecture,
            performance optimisation, and test-driven development. Comfortable
            contributing across the full stack (Ruby on Rails, Python/Django,
            Supabase) while keeping frontend quality as the primary craft. Most
            recently delivered customer-facing AI agent infrastructure at
            Woflow: MCP tool integrations, an agent configuration wizard, a
            version-control system for agent snapshots, and a human-in-the-loop
            data ingestion pipeline at enterprise scale. Proven in remote,
            cross-functional teams and open to Senior Frontend Engineer roles —
            remote or hybrid in Europe.
          </p>
          <h2 className="text-neon-yellow text-lg sm:text-xl font-bold">
            Technical Skills
          </h2>
          <ul className="border-l border-gray-400 py-2 pl-4 pr-0 mr-0 sm:px-10 ml-2 sm:mx-4 my-4">
            <li className="text-neon-blue text-lg sm:text-xl font-bold">
              <span className="text-neon-purple">Frontend:</span> React.js,
              Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS,
              styled-components, Redux, Material UI, HTML5, CSS3, SASS
            </li>
            <li className="text-neon-blue text-lg sm:text-xl font-bold">
              <span className="text-neon-purple">Testing:</span> Jest, React
              Testing Library, Storybook
            </li>
            <li className="text-neon-blue text-lg sm:text-xl font-bold">
              <span className="text-neon-purple">Backend:</span> Node.js,
              Python, Django, Ruby on Rails, REST APIs, Google App Engine
            </li>
            <li className="text-neon-blue text-lg sm:text-xl font-bold">
              <span className="text-neon-purple">AI & Agents:</span> LangGraph,
              MCP (Model Context Protocol), Agentic AI workflows, Supabase
            </li>
            <li className="text-neon-blue text-lg sm:text-xl font-bold">
              <span className="text-neon-purple">Mobile:</span> React Native
            </li>
            <li className="text-neon-blue text-lg sm:text-xl font-bold">
              <span className="text-neon-purple">Tools & Methods:</span> GitHub,
              Agile/Scrum, CI/CD, Figma
            </li>
          </ul>
          <h2 className="text-neon-yellow text-lg sm:text-xl font-bold">
            Professional Experience
          </h2>
          <div className="border-l border-gray-400 py-2 pl-4 pr-0 ml-2 mr-0 sm:px-10 sm:mx-4 my-2">
            {WORK_EXPERIENCES.map((e) => (
              <Experience key={e.id} {...e} />
            ))}
          </div>
          <h2 className="text-neon-yellow text-lg sm:text-xl font-bold">
            Education
          </h2>
          <div className="border-l border-gray-400 py-2 pl-4 pr-0 ml-2 mr-0 sm:px-10 sm:mx-4 my-2">
            {EDUCATION.map((e) => (
              <Education key={e.id} {...e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
