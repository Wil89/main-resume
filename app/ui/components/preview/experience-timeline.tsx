import { WORK_EXPERIENCES } from "@/app/data/constants";
import { SectionHeading } from "./section-heading";

export function ExperienceTimeline() {
  return (
    <div
      id="experience"
      className="bg-foreground px-8 sm:px-[15%] py-24 sm:py-32"
    >
      <SectionHeading>Experience</SectionHeading>
      <ol id="experience-list" className="relative ml-1.5">
        {/* Drawn by GSAP (scaleY scrub) as the timeline scrolls through */}
        <span
          id="experience-rail"
          aria-hidden
          className="absolute inset-y-0 left-0 w-px bg-gray-600/40"
        />
        {WORK_EXPERIENCES.map((job) => (
          <li key={job.id} className="relative pl-8 sm:pl-12 pb-16 last:pb-0">
            <span
              data-timeline-dot
              aria-hidden
              className="absolute -left-[5px] top-2.5 h-2.5 w-2.5 rounded-full bg-gray-400"
            />
            <div data-timeline-content>
              <p className="text-gray-600 text-sm font-extralight tracking-wide">
                {job.dates}
                {job.location && <> &middot; {job.location}</>}
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold text-white mt-2">
                {job.title}
                {job.company && (
                  <span className="text-gray-500 font-extralight">
                    {" "}
                    &middot; {job.company}
                  </span>
                )}
              </h3>
              {job.highlight && (
                <p className="text-gray-500 text-lg font-extralight mt-3 max-w-3xl">
                  {job.highlight}
                </p>
              )}
              {job.stack && (
                <p className="text-gray-600 text-sm font-extralight mt-3">
                  {job.stack.join(" · ")}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
