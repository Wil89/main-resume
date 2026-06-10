// import { Contact } from "./contact";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function About() {
  return (
    <div
      id="about"
      className="relative h-dvh overflow-hidden bg-foreground py-40 sm:py-60 px-8 sm:px-[15%] flex flex-col items-center"
    >
      <p id="about-text" className="text-gray-500 text-lg text-left">
        Senior Frontend Engineer with 8+ years building web products for
        enterprise clients including Walmart, DoorDash and UberEats. Specialises
        in React, Next.js and TypeScript. Most recently delivered AI agent
        infrastructure at Woflow: MCP integrations, an agent configuration
        wizard and a human-in-the-loop data pipeline at enterprise scale.
      </p>
      <div
        id="about-contact"
        className="shrink-0 text-center absolute bottom-8"
      >
        {/* <p className="text-black text-lg font-extralight">Seville, Spain</p> */}
        <div className="flex flex-col-reverse sm:flex-row items-center gap-1 sm:gap-4">
          <span className="text-gray-400 text-lg font-extralight flex items-center gap-1">
            wuj890312@gmail.com{" "}
            <a href="mailto:wuj890312@gmail.com" rel="noopener noreferrer">
              <ArrowUpRight className="font-extralight" />
            </a>
            <span className="text-3xl hidden sm:block">&middot;</span>
          </span>
          <span className="text-gray-400 text-lg font-extralight flex items-center gap-1">
            Whatsapp
            <a
              target="_blank"
              href={"https://wa.me/34695135544"}
              rel="noopener noreferrer"
            >
              <ArrowUpRight />
            </a>
            <span className="text-3xl hidden sm:block">&middot;</span>
          </span>
          <span className="text-gray-400 text-lg font-extralight flex items-center gap-1">
            LinkedIn
            <a
              target="_blank"
              href={"https://www.linkedin.com/in/wilber-ulloa-jorge-868960a0/"}
              rel="noopener noreferrer"
            >
              <ArrowUpRight />
            </a>
          </span>
        </div>
      </div>
      {/* <Contact /> */}
    </div>
  );
}
