// import { Contact } from "./contact";
import { ArrowUpRight } from "lucide-react";

export function About() {
  return (
    <div
      id="about"
      className="relative min-h-dvh sm:h-dvh overflow-hidden bg-foreground pt-28 pb-56 sm:py-32 px-8 sm:px-[15%] flex flex-col justify-center"
    >
      <div id="about-text" className="flex flex-col gap-10 sm:gap-14">
        <p className="text-gray-400 text-lg md:text-2xl md:leading-relaxed text-left">
          Senior Frontend Engineer with 8+ years building web products for
          enterprise clients including Walmart, DoorDash and UberEats.
          Specialises in React, Next.js and TypeScript. Most recently delivered
          AI agent infrastructure at Woflow: MCP integrations, an agent
          configuration wizard and a human-in-the-loop data pipeline at
          enterprise scale.
        </p>
        <div className="text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gray-600 mb-4">
            Beyond the code
          </p>
          <p className="text-gray-500 text-lg md:text-xl font-extralight md:leading-relaxed">
            Away from the keyboard I&apos;m usually chasing the perfect
            espresso — slowly turning a coffee obsession into proper barista
            skills, one latte-art pour at a time. I&apos;m a huge sports fan:
            baseball above all (die-hard New York Yankees supporter, still
            dreaming of a seat at Yankee Stadium) and football, with Real
            Madrid in my heart. And I don&apos;t just watch from the couch —
            working out and keeping a healthy life are part of the routine.
          </p>
        </div>
      </div>
      <div
        id="about-contact"
        className="shrink-0 text-center absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-8"
      >
        <p className="text-gray-500 text-lg font-extralight mb-1">
          Seville, Spain
        </p>
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-1 sm:gap-4">
          <span className="text-gray-400 text-lg font-extralight flex items-center gap-1">
            wuj890312@gmail.com{" "}
            <a href="mailto:wuj890312@gmail.com" rel="noopener noreferrer">
              <ArrowUpRight className="font-extralight" size={18} />
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
              <ArrowUpRight size={18} />
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
              <ArrowUpRight size={18} />
            </a>
          </span>
        </div>
      </div>
      {/* <Contact /> */}
    </div>
  );
}
