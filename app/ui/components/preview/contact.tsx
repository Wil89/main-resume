import Image from "next/image";
import { Pill } from "./pill";

type PillType = {
  leadIcon: string;
  text: string;
  action: () => void;
};

const pills: PillType[] = [
  {
    leadIcon: "/icons/palette.svg",
    text: "Frontend",
    action: () => {},
  },
  {
    leadIcon: "/icons/lab.svg",
    text: "Testing",
    action: () => {},
  },
  {
    leadIcon: "/icons/tags.svg",
    text: "Backend",
    action: () => {},
  },
  {
    leadIcon: "/icons/sparkle.svg",
    text: "AI & Agents",
    action: () => {},
  },
  {
    leadIcon: "/icons/phone.svg",
    text: "Mobile",
    action: () => {},
  },
  {
    leadIcon: "/icons/tools.svg",
    text: "Tools & Methods",
    action: () => {},
  },
];

export function Contact() {
  return (
    <div id="contact-form" className="absolute inset-0 flex items-center bg-foreground px-[15%]">
      <form className="w-full">
        <div className="relative">
          <textarea
            className="bg-dark-black border-1 border-gray-400 rounded-xl resize-none text-gray-400 placeholder:text-gray-400 w-full p-2"
            rows={10}
            name="message"
            id=""
            placeholder="Any Idea to work with me?"
          />
          <div className="absolute bottom-4 right-2">
            <Image
              src={"/icons/arrow-up.svg"}
              width={40}
              height={40}
              alt="arrow up submit button"
            />
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full flex-wrap">
          {pills.map((p) => (
            <Pill key={p.text} {...p} />
          ))}
        </div>
      </form>
    </div>
  );
}
