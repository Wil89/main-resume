import React from "react";
import Image from "next/image";
import { NavToggle } from "./nav-toggle";
import { ToggleProps } from "./nav-toggle";

export default function Navbar({ section, setSection }: ToggleProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 p-[40px]">
      <div className="flex items-center justify-between">
        <Image
          src="/LOGO.svg"
          width={215}
          height={86}
          alt="wilber ulloa logo"
        />
        <NavToggle
          section={section}
          setSection={setSection}
          id="nav-static-toggle"
        />
      </div>
    </nav>
  );
}
