"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { NavToggle } from "./ui/components/preview/nav-toggle";
import { About } from "./ui/components/preview/about";
import { Code } from "./ui/components/code/code";

export type ToggleValue = "Preview" | "Code";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LOGO_W = 750;
const LOGO_H = 300;
const NAV_LOGO_W = 215;
const PAD = 40;

export default function Home() {
  const [section, setSection] = useState<ToggleValue>("Preview");
  const containerRef = useRef(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const logoEl = document.getElementById("logo")!;
      const toggleEl = document.getElementById("nav-toggle")!;
      const toggleW = toggleEl.offsetWidth;

      // Code section starts off-screen to the right
      gsap.set("#code", { xPercent: 100 });

      // Initial hero-center positions (elements start opacity:0 in CSS)
      gsap.set(logoEl, {
        x: vw / 2 - LOGO_W / 2,
        y: vh / 2 - LOGO_H / 2,
        opacity: 1,
      });
      gsap.set(toggleEl, {
        x: vw / 2 - toggleW / 2,
        y: PAD,
        opacity: 1,
      });

      // Phase 1: hero pin — logo/toggle move to nav, headline rises
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 1],
            duration: { min: 0.1, max: 0.2 },
            delay: 0.1,
            ease: "power2.inOut",
          },
        },
      });

      heroTl
        .to(logoEl, {
          x: PAD,
          y: PAD,
          scale: NAV_LOGO_W / LOGO_W,
          transformOrigin: "top left",
          ease: "power2.inOut",
        })
        .to(
          toggleEl,
          { x: vw - PAD - toggleW, y: PAD, ease: "power2.inOut" },
          "<",
        )
        .to("#headline", { y: -(vh / 3), scale: 2, ease: "power2.inOut" }, "<");

      // Phase 2: logo crossfade as About scrolls up
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        })
        .to("#logo-white-overlay", { opacity: 1, ease: "none" }, 0)
        .to("#headline", { scale: 1, ease: "power2.inOut" }, 0);

      // Phase 3: About pins — text slides up, contact form rises from below
      gsap.set("#contact-form", { y: window.innerHeight, opacity: 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#about",
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
            snap: {
              snapTo: [0, 1],
              duration: { min: 0.2, max: 0.5 },
              delay: 0.2,
              ease: "power2.inOut",
            },
          },
        })
        .to(["#about-text", "#about-contact-info"], {
          y: -120,
          opacity: 0,
          duration: 0.6,
        })
        .to("#contact-form", { y: 0, opacity: 1, duration: 0.8 }, "<+=0.3");
    },
    { scope: containerRef },
  );

  // eslint-disable-next-line react-hooks/refs -- contextSafe callback only runs in event handlers, never during render
  const handleToggleSection = contextSafe((newSection: ToggleValue) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const logoEl = document.getElementById("logo")!;
    const toggleEl = document.getElementById("nav-toggle")!;
    const toggleW = toggleEl.offsetWidth;

    setSection(newSection);
    gsap.to("#slider", {
      xPercent: newSection === "Code" ? 100 : 0,
      ease: "elastic",
      duration: 1,
    });

    if (newSection === "Code") {
      // Clear any in-flight preview reset
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
      // Pause all scroll-driven animations — disable(false) pauses without killing the tweens
      ScrollTrigger.getAll().forEach((st) => st.disable(false));

      gsap.to("#code", { xPercent: 0, duration: 0.6, ease: "power2.inOut" });
      gsap.to(logoEl, {
        x: PAD,
        y: PAD,
        scale: NAV_LOGO_W / LOGO_W,
        transformOrigin: "top left",
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to(toggleEl, {
        x: vw - PAD - toggleW,
        y: PAD,
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to("#logo-white-overlay", { opacity: 1, duration: 0.3, delay: 0.2 });
    } else {
      gsap.to("#code", { xPercent: 100, duration: 0.6, ease: "power2.inOut" });
      gsap.to(logoEl, {
        x: vw / 2 - LOGO_W / 2,
        y: vh / 2 - LOGO_H / 2,
        scale: 1,
        transformOrigin: "50% 50%",
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to(toggleEl, {
        x: vw / 2 - toggleW / 2,
        y: PAD,
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to("#logo-white-overlay", { opacity: 0, duration: 0.3 });
      gsap.to("#headline", {
        y: 0,
        scale: 1,
        ease: "power2.inOut",
        duration: 0.5,
      });
      // After Code has slid out, reset scroll then re-enable ScrollTriggers at scroll=0
      resetTimeoutRef.current = setTimeout(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.getAll().forEach((st) => st.enable(true));
        resetTimeoutRef.current = null;
      }, 650);
    }
  });

  return (
    <main ref={containerRef} className="overflow-x-hidden">
      {/* Fixed elements — positioned by GSAP from hero-center to nav positions */}
      <div id="logo" className="fixed top-0 left-0 opacity-0 z-50">
        <div className="relative">
          <Image
            src="/LOGO.svg"
            width={LOGO_W}
            height={LOGO_H}
            preload
            alt="wilber ulloa logo"
          />
          <div id="logo-white-overlay" className="absolute inset-0 opacity-0">
            <Image
              src="/LOGO-white.svg"
              width={LOGO_W}
              height={LOGO_H}
              alt="wilber ulloa logo white"
            />
          </div>
        </div>
      </div>
      <div id="nav-toggle" className="fixed top-0 left-0 opacity-0 z-50">
        <NavToggle section={section} handleChange={handleToggleSection} />
      </div>

      {/* Preview — always in DOM so scroll-based ScrollTriggers stay alive */}
      <section id="preview" className="w-full bg-white relative">
        <div id="hero" className="h-dvh flex flex-col items-center p-10 w-full">
          <div id="headline" className="absolute bottom-[10%] left-0 right-0">
            <p className="skills-line text-3xl font-bold text-black text-center">
              Senior Frontend Engineer
            </p>
            <p className="skills-line text-3xl font-bold text-black text-center">
              React &middot; Next.js &middot; TypeScript
            </p>
            <p className="skills-line text-3xl font-bold text-black text-center">
              AI-Powered Products
            </p>
          </div>
          <div id="contact" className="shrink-0 text-center absolute bottom-8">
            <p className="text-black text-lg font-extralight">
              Seville, Spain &nbsp;&middot;&nbsp; +34 695 135 544
              &nbsp;&middot;&nbsp; wuj890312@gmail.com
            </p>
          </div>
        </div>
        <About />
      </section>

      {/* Code — fixed overlay, starts off-screen right, slides in on toggle */}
      <section
        id="code"
        className="fixed inset-0 z-40 overflow-hidden bg-foreground"
      >
        <Code />
      </section>
    </main>
  );
}
