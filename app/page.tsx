"use client";

import { useEffect, useRef, useState } from "react";
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
  const savedScrollRef = useRef(0);
  // Mirrors `section` for code that runs outside React's render cycle —
  // matchMedia callbacks re-run on breakpoint changes at any moment.
  const sectionRef = useRef<ToggleValue>("Preview");
  // In-flight section-toggle tweens. GSAP does NOT auto-overwrite conflicting
  // tweens, so a rapid re-toggle must kill these explicitly — otherwise a
  // stale slide-out onComplete re-enables ScrollTriggers while in Code mode.
  const modeTweensRef = useRef<gsap.core.Tween[]>([]);
  // Set by useGSAP; invoked (debounced) when the viewport settles at a new
  // size. Lives on a ref so the plain useEffect below can reach it.
  const relayoutRef = useRef<(() => "retry" | void) | null>(null);

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

      const logoEl = document.getElementById("logo")!;
      const toggleEl = document.getElementById("nav-toggle")!;
      const heroEl = document.getElementById("hero")!;

      // Common (the logo/toggle initial positions are owned by the
      // responsive setup blocks below, which both run on setup)
      gsap.set("#code", { xPercent: 100 });

      // All vertical math measures the hero element (h-dvh) instead of
      // window.innerHeight: on iOS Safari the two disagree while the dynamic
      // toolbars are visible, and the headline/contact are laid out by CSS
      // against dvh — measuring the element keeps the JS positions in the
      // same coordinate system as the CSS layout.
      const lastLayout = { w: 0, h: 0 };
      let mm: gsap.MatchMedia | null = null;

      /**
       * Mobile — toggle shrinks to the corner, headline scales less
       */
      const setupMobileHero = () => {
        // Re-capture dimensions: this re-runs on breakpoint changes and on
        // viewport-settle relayouts, so we want fresh values each time.
        const vw = window.innerWidth;
        const vh = heroEl.offsetHeight;
        const toggleW = toggleEl.offsetWidth;
        // Read from the DOM so the JS position always matches whatever CSS renders —
        // no risk of the constant drifting out of sync with the Tailwind class.
        const logoW = logoEl.offsetWidth;
        const logoH = logoEl.offsetHeight;

        if (sectionRef.current === "Code") {
          // Crossed into this breakpoint (e.g. rotation) while the Code
          // overlay is up: logo and toggle are z-50, above the overlay, so
          // park them at the nav corner instead of re-centering them.
          gsap.set(logoEl, {
            x: PAD,
            y: PAD - 8,
            scale: NAV_LOGO_W_MOBILE / logoW,
            transformOrigin: "top left",
          });
          gsap.set(toggleEl, {
            x: vw - PAD - toggleW,
            y: PAD,
            scale: MOBILE_TOGGLE_SCALE,
            transformOrigin: "top right",
          });
        } else {
          gsap.set(logoEl, {
            x: vw / 2 - logoW / 2,
            y: vh / 2 - logoH,
            opacity: 1,
          });
          gsap.set(toggleEl, { x: vw / 2 - toggleW / 2, y: PAD, opacity: 1 });
          gsap.set("#headline", { scale: MOBILE_HEADLINE_SCALE_START });
        }

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
            // Must equal Code mode's corner scale (NAV_LOGO / logoW): both
            // paths park the logo in the nav, and a mismatch makes it pop in
            // size when toggling sections at a scrolled position.
            scale: NAV_LOGO_W_MOBILE / logoW,
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

        // Every other ScrollTrigger is disabled while in Code mode — a
        // freshly created one must match, or it scrubs behind the overlay.
        if (sectionRef.current === "Code")
          heroTl.scrollTrigger?.disable(false);
      };

      /**
       * Desktop — original behavior, no changes
       */
      const setupDesktopHero = () => {
        const vw = window.innerWidth;
        const vh = heroEl.offsetHeight;
        const toggleW = toggleEl.offsetWidth;
        const logoW = logoEl.offsetWidth;

        if (sectionRef.current === "Code") {
          // See the mobile block: don't re-center over the Code overlay.
          gsap.set(logoEl, {
            x: PAD,
            y: PAD - 8,
            scale: NAV_LOGO_W / logoW,
            transformOrigin: "top left",
          });
          gsap.set(toggleEl, {
            x: vw - PAD - toggleW,
            y: PAD,
            scale: 1,
            transformOrigin: "50% 50%",
          });
        } else {
          gsap.set(logoEl, {
            x: vw / 2 - LOGO_W / 2,
            y: vh / 2 - LOGO_H / 2,
            opacity: 1,
          });
          gsap.set(toggleEl, { x: vw / 2 - toggleW / 2, y: PAD, opacity: 1 });
          gsap.set("#headline", { scale: DESKTOP_HEADLINE_SCALE_START });
        }

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

        if (sectionRef.current === "Code")
          heroTl.scrollTrigger?.disable(false);
      };

      const setupResponsive = () => {
        mm?.revert();
        mm = gsap.matchMedia();
        lastLayout.w = window.innerWidth;
        lastLayout.h = heroEl.offsetHeight;
        mm.add("(max-width: 767px)", setupMobileHero);
        mm.add("(min-width: 768px)", setupDesktopHero);
      };
      setupResponsive();

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
      gsap.set("#contact-form", { y: heroEl.offsetHeight, opacity: 0 });
      const aboutTl = gsap
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

      // Re-measures and rebuilds the hero layer after the real viewport
      // changes (iOS toolbars settling, rotation, window resize). Returns
      // "retry" while the user is actively scrolling so the caller can
      // re-schedule — rebuilding mid-scrub would visibly yank the elements.
      relayoutRef.current = () => {
        if (ScrollTrigger.isScrolling()) return "retry";
        const w = window.innerWidth;
        const h = heroEl.offsetHeight;
        if (w === lastLayout.w && Math.abs(h - lastLayout.h) < 2) return;
        setupResponsive();
        // The contact form's offscreen anchor embeds a height; re-anchor it
        // as long as its intro hasn't run (afterwards the timeline owns it)
        if (aboutTl.progress() === 0) {
          gsap.set("#contact-form", { y: h, opacity: 0 });
        }
        ScrollTrigger.refresh();
      };
    },
    { scope: containerRef },
  );

  useEffect(() => {
    // The Code overlay is position:fixed, so wheel/touch gestures outside its
    // scrollable panel chain-scroll the document underneath. ScrollTriggers
    // are disabled in Code mode, so that drift stays invisible until the user
    // returns to Preview and everything restores against a moved scroll.
    // (React attaches wheel/touch listeners as passive, hence native ones.)
    const codeEl = document.getElementById("code")!;
    const blockScrollChain = (e: Event) => {
      if (!(e.target instanceof Element) || !e.target.closest("#code-scroll")) {
        e.preventDefault();
      }
    };
    codeEl.addEventListener("wheel", blockScrollChain, { passive: false });
    codeEl.addEventListener("touchmove", blockScrollChain, { passive: false });

    // iOS Safari resizes the real viewport when its toolbars collapse/expand.
    // ScrollTrigger's own resize handling is silenced (ignoreMobileResize) to
    // avoid mid-scroll thrash, so re-measure here once the viewport settles.
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduleRelayout = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        if (relayoutRef.current?.() === "retry") scheduleRelayout();
      }, 250);
    };
    window.addEventListener("resize", scheduleRelayout);
    window.visualViewport?.addEventListener("resize", scheduleRelayout);
    return () => {
      codeEl.removeEventListener("wheel", blockScrollChain);
      codeEl.removeEventListener("touchmove", blockScrollChain);
      clearTimeout(settleTimer);
      window.removeEventListener("resize", scheduleRelayout);
      window.visualViewport?.removeEventListener("resize", scheduleRelayout);
    };
  }, []);

  // eslint-disable-next-line react-hooks/refs -- contextSafe callback only runs in event handlers, never during render
  const handleToggleSection = contextSafe((newSection: ToggleValue) => {
    if (newSection === section) return;

    const vw = window.innerWidth;
    // hero is h-dvh — measure it rather than window.innerHeight, which can
    // disagree with the CSS viewport on iOS Safari (see the note in useGSAP)
    const vh = document.getElementById("hero")!.offsetHeight;
    const logoEl = document.getElementById("logo")!;
    const toggleEl = document.getElementById("nav-toggle")!;
    const toggleW = toggleEl.offsetWidth;
    // Read from the DOM so the math always matches whatever size CSS rendered
    const logoW = logoEl.offsetWidth;
    const logoH = logoEl.offsetHeight;
    // contextSafe handlers run outside GSAP's matchMedia scope, so we
    // check the breakpoint manually at call time.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const NAV_LOGO = isMobile ? NAV_LOGO_W_MOBILE : NAV_LOGO_W;
    // Centered-logo y position: on mobile the logo sits a half-logo above
    // center (matching the initial gsap.set), on desktop dead center.
    const logoPreviewY = vh / 2 - (isMobile ? logoH : logoH / 2);

    // Kill the previous toggle's in-flight tweens (see modeTweensRef)
    modeTweensRef.current.forEach((t) => t.kill());
    modeTweensRef.current = [];
    const track = (tween: gsap.core.Tween) => {
      modeTweensRef.current.push(tween);
      return tween;
    };

    setSection(newSection);
    sectionRef.current = newSection;
    track(
      gsap.to("#slider", {
        xPercent: newSection === "Code" ? 100 : 0,
        ease: "elastic",
        duration: 1,
      }),
    );

    if (newSection === "Code") {
      savedScrollRef.current = window.scrollY;
      // Pause all scroll-driven animations — disable(false) skips the revert,
      // so pins stay in the DOM and the layout/scroll range doesn't change
      ScrollTrigger.getAll().forEach((st) => st.disable(false));

      track(
        gsap.to("#code", { xPercent: 0, duration: 0.6, ease: "power2.inOut" }),
      );
      track(
        gsap.to(logoEl, {
          x: PAD,
          y: PAD - 8,
          scale: NAV_LOGO / logoW,
          transformOrigin: "top left",
          ease: "power2.inOut",
          duration: 0.5,
        }),
      );
      track(
        gsap.to(toggleEl, {
          x: vw - PAD - toggleW,
          y: PAD,
          scale: isMobile ? MOBILE_TOGGLE_SCALE : 1,
          transformOrigin: isMobile ? "top right" : "50% 50%",
          ease: "power2.inOut",
          duration: 0.5,
        }),
      );
      track(
        gsap.to("#logo-white-overlay", {
          opacity: 1,
          duration: 0.3,
          delay: 0.2,
        }),
      );
    } else {
      const savedScroll = savedScrollRef.current;
      // Use a 50 px threshold instead of === 0: normalizeScroll can leave
      // window.scrollY at a fractional pixel even when the page is at the top,
      // causing the strict check to miss and skip the hero-restore animation.
      const isHeroInitial = savedScroll < 50;
      const targetScroll = isHeroInitial ? 0 : savedScroll;
      const headlineInitScale = isMobile
        ? MOBILE_HEADLINE_SCALE_START
        : DESKTOP_HEADLINE_SCALE_START;

      // Seeks each disabled ScrollTrigger timeline to the exact progress that
      // matches targetScroll. Must be called AFTER the overlay is reset to 0:
      // GSAP lazily captures "from" on a tween's first render — if the user
      // never scrolled to About, that first render happens here. We need it to
      // see overlay:0 (the initial baseline), not Code mode's overlay:1.
      const seekToTargetScroll = () => {
        ScrollTrigger.getAll().forEach((st) => {
          const anim = st.animation;
          if (!anim) return;
          const range = st.end - st.start;
          const progress =
            range > 0
              ? Math.max(0, Math.min(1, (targetScroll - st.start) / range))
              : 0;
          // progress() skips rendering when the value doesn't change — but
          // Code mode wrote directly to properties these timelines own (the
          // white overlay, logo/toggle transforms), so force a re-render to
          // reassert the timeline's values over those stale direct writes.
          anim.progress(progress, true).render(anim.time(), true, true);
        });
      };

      if (isHeroInitial) {
        // Code mode moved the logo to the corner; animate it back to center
        // while the overlay slides out (these finish in 0.5 s, slide takes 0.6 s)
        track(
          gsap.to(logoEl, {
            x: vw / 2 - logoW / 2,
            y: logoPreviewY,
            scale: 1,
            transformOrigin: "50% 50%",
            ease: "power2.inOut",
            duration: 0.5,
          }),
        );
        track(
          gsap.to(toggleEl, {
            x: vw / 2 - toggleW / 2,
            y: PAD,
            scale: 1,
            transformOrigin: "50% 50%",
            ease: "power2.inOut",
            duration: 0.5,
          }),
        );
        track(gsap.to("#logo-white-overlay", { opacity: 0, duration: 0.3 }));
        track(
          gsap.to("#headline", {
            y: 0,
            scale: headlineInitScale,
            ease: "power2.inOut",
            duration: 0.5,
          }),
        );
      } else {
        // For scrolled states the logo/toggle are already at the corner from
        // Code mode — that IS the correct scrolled position. Do NOT gsap.set
        // them to center: gsap.set uses immediateRender which writes to DOM
        // before the progress() seek can move them back, producing a visible
        // center→corner flash. Only reset the overlay (Code mode forced it to
        // 1) and seek the timelines so the Preview shows the right state while
        // the Code overlay slides out.
        gsap.set("#logo-white-overlay", { opacity: 0 });
        gsap.set("#contact-form", { y: vh, opacity: 0 });
        gsap.set(["#about-text", "#about-contact-info"], { y: 0, opacity: 1 });
        seekToTargetScroll();
      }

      // onComplete fires exactly when the Code slide ends (no magic number).
      // GSAP does NOT kill this tween on a quick re-toggle — the explicit
      // modeTweensRef kill at the top of the handler is what guarantees a
      // stale onComplete never re-enables triggers while in Code mode.
      track(
        gsap.to("#code", {
          xPercent: 100,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            if (isHeroInitial) {
              // gsap.to animations have completed (0.5 s ≤ 0.6 s).
              // Set every element to the scroll=0 baseline so the hero and
              // about-crossfade tweens capture the correct "from" on first render.
              gsap.set(logoEl, {
                x: vw / 2 - logoW / 2,
                y: logoPreviewY,
                scale: 1,
                transformOrigin: "50% 50%",
              });
              gsap.set(toggleEl, { x: vw / 2 - toggleW / 2, y: PAD, scale: 1 });
              gsap.set("#logo-white-overlay", { opacity: 0 });
              gsap.set("#headline", { y: 0, scale: headlineInitScale });
              gsap.set("#contact-form", { y: vh, opacity: 0 });
              gsap.set(["#about-text", "#about-contact-info"], { y: 0, opacity: 1 });
            }
            // (No overlay reset here for scrolled states: the forced-render
            // seek before the slide already initialized every timeline with
            // clean "from" values, and re-zeroing the overlay would fight the
            // state the timelines just rendered.)
            // Restore the scroll BEFORE re-enabling: enable()/refresh() apply
            // each timeline at the *current* scroll position, so enabling
            // first would render (and scrub-animate) everything against
            // whatever the scroll drifted to during Code mode.
            window.scrollTo({ top: targetScroll, behavior: "instant" });
            // enable(false, false): keep each trigger's recorded progress
            // (a bare enable() resets it to 0 and refreshes against the
            // current scroll) and defer recalculation to the single
            // refresh() below, which re-renders everything in one pass.
            ScrollTrigger.getAll().forEach((st) => st.enable(false, false));
            ScrollTrigger.refresh();
          },
        }),
      );
    }
  });

  return (
    <main ref={containerRef} className="overflow-x-hidden">
      {/* Fixed elements — positioned by GSAP from hero-center to nav positions */}
      <div id="logo" className="fixed top-0 left-0 opacity-0 z-50">
        {/* fill requires an explicit-size parent — responsive size lives here, not on <Image>.
            md: (768px) must stay in sync with the 767px breakpoint all the GSAP math uses,
            otherwise the JS positions a logo whose CSS size it mispredicts. */}
        <div className="relative w-[330px] h-[132px] md:w-[750px] md:h-[300px]">
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
