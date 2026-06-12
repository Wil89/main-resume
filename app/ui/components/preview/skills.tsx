"use client";

import { useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SKILL_GROUPS } from "@/app/data/constants";
import { Pill } from "./pill";
import { SectionHeading } from "./section-heading";

export function Skills() {
  const [activeId, setActiveId] = useState(SKILL_GROUPS[0].id);
  const active = SKILL_GROUPS.find((g) => g.id === activeId) ?? SKILL_GROUPS[0];
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Swapping the active group changes this section's height, which shifts
    // every ScrollTrigger start position below it — re-measure them.
    ScrollTrigger.refresh();
  }, [activeId]);

  return (
    <div id="skills" className="bg-foreground px-8 sm:px-[15%] py-24 sm:py-32">
      <SectionHeading>Skills</SectionHeading>
      <div data-reveal className="flex flex-wrap gap-2.5 sm:gap-3">
        {SKILL_GROUPS.map((g) => (
          <Pill
            key={g.id}
            leadIcon={g.icon}
            text={g.label}
            active={g.id === activeId}
            action={() => setActiveId(g.id)}
          />
        ))}
      </div>
      <ul
        key={active.id}
        className="flex flex-wrap gap-x-8 gap-y-4 mt-10 sm:mt-12 min-h-28"
      >
        {active.skills.map((skill, i) => (
          <li
            key={skill}
            className="text-gray-400 text-xl sm:text-2xl font-extralight"
            style={{
              animation: "fade-up 0.4s ease both",
              animationDelay: `${i * 40}ms`,
            }}
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
