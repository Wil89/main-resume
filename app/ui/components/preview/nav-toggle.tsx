"use client";

import { useRef } from "react";
import clsx from "clsx";
import { ToggleValue } from "@/app/page";

export interface ToggleProps {
  section: ToggleValue;
  handleChange: (section: ToggleValue) => void;
}

export function NavToggle({ section, handleChange }: ToggleProps) {
  const container = useRef(null);

  return (
    <div
      className="shrink-0 rounded-full bg-gray-500 p-1.5 flex relative"
      ref={container}
    >
      <div
        id="slider"
        className="absolute w-[98] h-[40] bg-gray-300 rounded-full z-1"
      />
      <button
        className={clsx("z-5 p-2 w-[98px] text-black cursor-pointer", {
          "font-semibold": section === "Preview",
        })}
        onClick={() => handleChange("Preview")}
      >
        Preview
      </button>
      <button
        className={clsx("z-5 p-2 w-[98px] text-black cursor-pointer", {
          "font-semibold": section === "Code",
        })}
        onClick={() => handleChange("Code")}
      >
        Code
      </button>
    </div>
  );
}
