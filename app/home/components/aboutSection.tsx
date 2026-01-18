"use client";

import React, { useEffect, useRef } from "react";
import ContentWrapper from "@/app/components/contentWrapper";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const ctasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Overlay fade
      tl.from(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        clearProps: "opacity",
      });

      // Heading + divider + paragraph
      tl.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        clearProps: "opacity,transform",
      });
      tl.from(
        dividerRef.current,
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "center",
          duration: 0.6,
          clearProps: "opacity,transform",
        },
        "-=0.4",
      );
      tl.from(
        paragraphRef.current,
        { y: 20, opacity: 0, duration: 0.6, clearProps: "opacity,transform" },
        "-=0.2",
      );

      // Cards stagger with clearProps to ensure visibility
      tl.from(
        cardsRef.current?.querySelectorAll(".about-card") || [],
        {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          clearProps: "opacity,transform",
        },
        "-=0.1",
      );

      // Number count-up animation for stats - part of timeline
      const statNumbers =
        cardsRef.current?.querySelectorAll(".stat-number") || [];
      statNumbers.forEach((stat, index) => {
        const element = stat as HTMLElement;
        const text = element.textContent || "";
        const numberMatch = text.match(/(\d+)/);

        if (numberMatch) {
          const endValue = parseInt(numberMatch[1]);
          const suffix =
            (text.includes("K") ? "K" : "") + (text.includes("+") ? "+" : "");

          const counterObj = { value: 0 };
          tl.to(
            counterObj,
            {
              value: endValue,
              duration: 2.5,
              ease: "power2.out",
              onUpdate: function () {
                element.textContent = Math.floor(counterObj.value) + suffix;
              },
              clearProps: "none",
            },
            index === 0 ? "-=0.3" : "-=0.2",
          );
        }
      });

      // CTAs stagger
      tl.from(
        ctasRef.current?.querySelectorAll("a") || [],
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          clearProps: "opacity,transform",
        },
        "-=0.2",
      );

      // Background parallax zoom
      gsap.to(bgRef.current, {
        scale: 1.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Snap between full-screen sections
      const sections = gsap.utils.toArray<HTMLElement>(".snap-section");
      sections.forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: "bottom top",
          snap: { snapTo: [0, 1], duration: 0.25, ease: "power1.inOut" },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="snap-section relative h-screen overflow-hidden"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        <Image
          src="/assets/common/about.webp"
          alt="Luxury architecture in Dubai"
          className="w-full h-full object-cover"
          width={1800}
          height={900}
          priority
        />
      </div>

      {/* Dark premium overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-linear-to-b from-black/10 via-black/30 to-black/10"
      />

      <ContentWrapper
        maxwidth="max-w-full mx-auto"
        className="relative h-full flex items-center"
      >
        <div className="w-full px-6">
          {/* Heading + intro */}
          <div className="max-w-5xl mx-auto text-center">
            <h2
              ref={headingRef}
              className="text-white text-[56px] max-lg:text-[42px] max-md:text-[32px] font-light tracking-[-0.01em] leading-tight"
            >
              About Binghatti
            </h2>
            <div
              ref={dividerRef}
              className="w-24 h-px bg-linear-to-r from-transparent via-white/60 to-transparent mx-auto my-6"
            />
            <p
              ref={paragraphRef}
              className="text-white text-lg max-md:text-base font-extralight leading-relaxed"
            >
              We craft architectural icons across Dubai, blending timeless
              elegance with modern innovation to deliver truly extraordinary
              living experiences.
            </p>
          </div>

          {/* Premium stat cards */}
          <div
            ref={cardsRef}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            <div className="about-card p-6 border border-white/20 bg-white/5 backdrop-blur-md text-white transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] cursor-pointer">
              <div className="stat-number text-4xl font-extralight mb-2">
                50+
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                Projects
              </div>
            </div>
            <div className="about-card p-6 border border-white/20 bg-white/5 backdrop-blur-md text-white transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] cursor-pointer">
              <div className="stat-number text-4xl font-extralight mb-2">
                15K+
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                Units Delivered
              </div>
            </div>
            <div className="about-card p-6 border border-white/20 bg-white/5 backdrop-blur-md text-white transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] cursor-pointer">
              <div className="stat-number text-4xl font-extralight mb-2">
                20+
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                Years Legacy
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default AboutSection;
