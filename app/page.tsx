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
const LOGO_W_MOBILE = 330;
const LOGO_H = 300;
const LOGO_H_MOBILE = 132;
const NAV_LOGO_W = 215;
const NAV_LOGO_W_MOBILE = 160;
const PAD = 40;

const MOBILE_TOGGLE_SCALE = 0.8;

// CSS headline is set to the final large size.
// These scale values shrink it to visually match text-3xl (30px) at startup,
// so the animation goes from constrained → natural (0.x → 1) rather than
// natural → overshooting (1 → 2). Line breaks are always computed at the
// large CSS size, so they stay consistent throughout the animation.
const MOBILE_HEADLINE_SCALE_START = 30 / 48; // text-3xl / text-5xl
const DESKTOP_HEADLINE_SCALE_START = 30 / 60; // text-3xl / text-6xl

export default function Home() {
  const [section, setSection] = useState<ToggleValue>("Preview");
  const containerRef = useRef(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      // iOS fires scroll events asynchronously — normalizeScroll intercepts
      // touchstart/touchmove at the DOM level so ScrollTrigger reads position
      // synchronously, in sync with the user's finger.
      // ignore: "#code" — when a touch starts inside the Code overlay, GSAP
      // steps aside and lets the browser handle it natively so internal
      // scroll still works.
      ScrollTrigger.normalizeScroll({ ignore: "#code" });
      // Prevent Safari's address bar show/hide from triggering ScrollTrigger
      // recalculations on every scroll — those cause constant micro-jitters.
      ScrollTrigger.config({ ignoreMobileResize: true });

      const mm = gsap.matchMedia();

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const logoEl = document.getElementById("logo")!;
      const toggleEl = document.getElementById("nav-toggle")!;
      const toggleW = toggleEl.offsetWidth;

      // Common
      gsap.set("#code", { xPercent: 100 });
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

      /**
       * Mobile — toggle shrinks to the corner, headline scales less
       */
      mm.add("(max-width: 767px)", () => {
        // Re-capture dimensions: the callback re-runs on every resize that
        // crosses this breakpoint, so we want fresh values each time.
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const toggleW = toggleEl.offsetWidth;
        // Read from the DOM so the JS position always matches whatever CSS renders —
        // no risk of the constant drifting out of sync with the Tailwind class.
        const logoW = logoEl.offsetWidth;
        const logoH = logoEl.offsetHeight;

        gsap.set(logoEl, {
          x: vw / 2 - logoW / 2,
          y: vh / 2 - logoH,
          opacity: 1,
        });
        gsap.set("#headline", { scale: MOBILE_HEADLINE_SCALE_START });

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "+=100%",
            // 0.3 on mobile: a touch swipe can jump 600px in 80ms — scrub:1
            // means the animation would trail 1 second behind the finger.
            scrub: 0.3,
            pin: true,
            anticipatePin: 1,
            snap: {
              snapTo: [0, 1],
              duration: { min: 0.1, max: 0.2 },
              delay: 0.3, // must be >= scrub to avoid fighting
              ease: "power2.inOut",
            },
          },
        });

        heroTl
          .to(logoEl, {
            x: PAD,
            y: PAD - 8,
            scale: LOGO_W_MOBILE / LOGO_W,
            transformOrigin: "top left",
            ease: "power2.inOut",
          })
          .to(
            toggleEl,
            {
              x: vw - PAD - toggleW,
              y: PAD,
              scale: MOBILE_TOGGLE_SCALE,
              // "top right" pins the right edge — the element shrinks inward
              // to the left, so x: vw - PAD - toggleW stays correct at any scale
              transformOrigin: "top right",
              ease: "power2.inOut",
            },
            "<",
          )
          .to(
            "#headline",
            { y: -(vh / 3.5), scale: 1, ease: "power2.inOut" },
            "<",
          );
      });

      /**
       * Desktop — original behavior, no changes
       */
      mm.add("(min-width: 768px)", () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const toggleW = toggleEl.offsetWidth;

        gsap.set(logoEl, {
          x: vw / 2 - LOGO_W / 2,
          y: vh / 2 - LOGO_H / 2,
          opacity: 1,
        });
        gsap.set("#headline", { scale: DESKTOP_HEADLINE_SCALE_START });

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
              delay: 0.8, // must be >= scrub; 0.8 vs 1.0 is a slight concession for snappier feel
              ease: "power2.inOut",
            },
          },
        });

        heroTl
          .to(logoEl, {
            x: PAD,
            y: PAD - 8,
            scale: NAV_LOGO_W / LOGO_W,
            transformOrigin: "top left",
            ease: "power2.inOut",
          })
          .to(
            toggleEl,
            { x: vw - PAD - toggleW, y: PAD, ease: "power2.inOut" },
            "<",
          )
          .to(
            "#headline",
            { y: -(vh / 3), scale: 1, ease: "power2.inOut" },
            "<",
          );
      });

      // Phase 2: logo crossfade as About scrolls up
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "top top",
            scrub: 1,
            // Array form (velocity-based) is correct here: the user is scrolling
            // with intent — snap in their direction of travel.
            // 0 = Hero fully visible (About offscreen), 1 = About fully in view.
            snap: {
              snapTo: [0, 1],
              duration: { min: 0.3, max: 0.6 },
              delay: 0.8,
              ease: "power2.inOut",
            },
          },
        })
        .to("#logo-white-overlay", { opacity: 1, ease: "none" }, 0);

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
              // Array form uses scroll velocity to pick direction — arriving
              // from Hero with forward momentum would auto-snap to contact.
              // Function form uses only progress value, ignoring velocity:
              // user must scroll past 65% before committing to contact form.
              snapTo: (value) => (value > 0.65 ? 1 : 0),
              duration: { min: 0.2, max: 0.4 },
              delay: 0.8,
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
    // contextSafe handlers run outside GSAP's matchMedia scope, so we
    // check the breakpoint manually at call time.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const LOGO_WIDTH = isMobile ? LOGO_W_MOBILE : LOGO_W;
    const NAV_LOGO = isMobile ? NAV_LOGO_W_MOBILE : NAV_LOGO_W;
    const LOGO_HEIGHT = isMobile ? LOGO_H_MOBILE : LOGO_H;

    const LOGO_PREVIEW_HEIGHT = isMobile ? LOGO_HEIGHT : LOGO_HEIGHT / 2;

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
        y: PAD - 8,
        scale: NAV_LOGO / LOGO_WIDTH,
        transformOrigin: "top left",
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to(toggleEl, {
        x: vw - PAD - toggleW,
        y: PAD,
        scale: isMobile ? MOBILE_TOGGLE_SCALE : 1,
        transformOrigin: isMobile ? "top right" : "50% 50%",
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to("#logo-white-overlay", { opacity: 1, duration: 0.3, delay: 0.2 });
    } else {
      gsap.to("#code", { xPercent: 100, duration: 0.6, ease: "power2.inOut" });
      gsap.to(logoEl, {
        x: vw / 2 - LOGO_WIDTH / 2,
        y: vh / 2 - LOGO_PREVIEW_HEIGHT,
        scale: 1,
        transformOrigin: "50% 50%",
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to(toggleEl, {
        x: vw / 2 - toggleW / 2,
        y: PAD,
        scale: 1,
        transformOrigin: "50% 50%",
        ease: "power2.inOut",
        duration: 0.5,
      });
      gsap.to("#logo-white-overlay", { opacity: 0, duration: 0.3 });
      const headlineInitScale = isMobile
        ? MOBILE_HEADLINE_SCALE_START
        : DESKTOP_HEADLINE_SCALE_START;
      gsap.to("#headline", {
        y: 0,
        scale: headlineInitScale,
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
        {/* fill requires an explicit-size parent — responsive size lives here, not on <Image> */}
        <div className="relative w-[330px] h-[132px] sm:w-[750px] sm:h-[300px]">
          <Image src="/LOGO.svg" fill preload alt="wilber ulloa logo" />
          <div id="logo-white-overlay" className="absolute inset-0 opacity-0">
            <Image src="/LOGO-white.svg" fill alt="wilber ulloa logo white" />
          </div>
        </div>
      </div>
      <div id="nav-toggle" className="fixed top-0 left-0 opacity-0 z-50">
        <NavToggle section={section} handleChange={handleToggleSection} />
      </div>

      {/* Preview — always in DOM so scroll-based ScrollTriggers stay alive */}
      <section id="preview" className="w-full bg-white relative">
        <div
          id="hero"
          className="h-dvh flex flex-col items-center px-8 py-10 sm:px-10  w-full"
        >
          <div id="headline" className="absolute bottom-[10%] left-0 right-0">
            <p className="skills-line text-5xl md:text-6xl font-bold text-black text-center">
              Senior Frontend Engineer
            </p>
            <p className="skills-line text-5xl md:text-6xl font-bold text-black text-center">
              React &middot; Next.js &middot; TypeScript
            </p>
            <p className="skills-line text-5xl md:text-6xl font-bold text-black text-center">
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
