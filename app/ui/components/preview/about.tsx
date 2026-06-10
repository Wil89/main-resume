import { Contact } from "./contact";

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
        id="about-contact-info"
        className="shrink-0 text-center absolute bottom-8"
      >
        <p className="text-white text-lg font-extralight text-center">
          Seville, Spain &nbsp;&middot;&nbsp; +34 695 135 544
          &nbsp;&middot;&nbsp; wuj890312@gmail.com
        </p>
      </div>
      <Contact />
    </div>
  );
}
