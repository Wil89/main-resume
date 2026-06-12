import { EDUCATION, LANGUAGES } from "@/app/data/constants";
import { SectionHeading } from "./section-heading";

export function EducationLanguages() {
  return (
    <div
      id="education"
      className="bg-foreground px-8 sm:px-[15%] py-24 sm:py-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
        <div data-reveal>
          <SectionHeading>Education</SectionHeading>
          <ul className="flex flex-col gap-10">
            {EDUCATION.map((e) => (
              <li key={e.id}>
                <p className="text-gray-600 text-sm font-extralight tracking-wide">
                  {e.dates} &middot; {e.location}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mt-1.5">
                  {e.title}
                </h3>
                <p className="text-gray-500 text-lg font-extralight mt-1">
                  {e.centerName}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <SectionHeading>Languages</SectionHeading>
          <ul className="flex flex-col gap-10">
            {LANGUAGES.map((l) => (
              <li key={l.id}>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {l.name}
                </h3>
                <p className="text-gray-500 text-lg font-extralight mt-1">
                  {l.level}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
