"use client";

import { ToggleValue } from "@/app/page";

export interface ToggleProps {
  section: ToggleValue;
  handleChange: (section: ToggleValue) => void;
}

export function NavToggle({ section, handleChange }: ToggleProps) {
  return (
    <div className="shrink-0 rounded-full bg-gray-500 py-1.5 px-1 sm:px-1.5 flex relative">
      <div
        id="slider"
        className="absolute w-[85px] sm:w-[98px] h-[40px] bg-gray-300 rounded-full z-1"
      />
      <button
        className="z-5 text-sm sm:text-base p-1 sm:p-2 w-[85px] sm:w-[98px] h-[40px] text-black cursor-pointer font-semibold"
        onClick={() => handleChange("Preview")}
      >
        Preview
      </button>
      <button
        className="z-5 text-sm sm:text-base p-1 sm:p-2 w-[85px] sm:w-[98px] h-[40px] text-black cursor-pointer font-semibold"
        onClick={() => handleChange("Code")}
      >
        Code
      </button>
    </div>
  );
}
