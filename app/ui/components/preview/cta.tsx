"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { CONTACT, CV_PDF_PATH } from "@/app/data/constants";

interface ResumeCtaProps {
  onViewCode: () => void;
}

export function ResumeCta({ onViewCode }: ResumeCtaProps) {
  return (
    <div
      id="cta"
      className="bg-foreground px-8 sm:px-[15%] py-28 sm:py-40 flex flex-col items-center text-center"
    >
      <p
        data-reveal
        className="text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight"
      >
        {CONTACT.availability}
      </p>
      <p data-reveal className="text-gray-500 text-lg font-extralight mt-4">
        {CONTACT.workMode} &middot; Based in {CONTACT.location}
      </p>
      <div
        data-reveal
        className="flex flex-col sm:flex-row items-center gap-4 mt-10"
      >
        <a
          href={`mailto:${CONTACT.email}`}
          className="flex items-center gap-1.5 bg-white text-black font-semibold rounded-full py-3 px-7 hover:bg-gray-300 transition-colors duration-300"
        >
          Get in touch <ArrowUpRight size={18} />
        </a>
        <a
          href={CV_PDF_PATH}
          download="Wilber_Ulloa_CV.pdf"
          className="flex items-center gap-1.5 border-1 border-gray-400 text-gray-300 font-semibold rounded-full py-3 px-7 hover:border-white hover:text-white transition-colors duration-300"
        >
          Download CV <Download size={18} />
        </a>
      </div>
      <button
        type="button"
        data-reveal
        onClick={onViewCode}
        className="text-gray-600 text-base font-extralight mt-14 cursor-pointer hover:text-gray-400 transition-colors duration-300"
      >
        or read this resume as source code{" "}
        <span className="font-normal">&lt;/&gt;</span>
      </button>
    </div>
  );
}
