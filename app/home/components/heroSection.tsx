"use client";

import React, { useEffect, useRef } from "react";
import ContentWrapper from "@/app/components/contentWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Video overlay animation
      tl.from(overlayRef.current, {
        opacity: 0,
        duration: 1,
      });

      // Badge animation
      tl.from(
        badgeRef.current,
        {
          y: -50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5",
      );

      // Heading animation with split effect
      tl.from(
        headingRef.current?.querySelectorAll(".hero-text-line") || [],
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.2,
          duration: 1,
        },
        "-=0.4",
      );

      // Subtitle animation
      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5",
      );

      // CTA buttons stagger animation
      gsap.set(ctaRef.current?.querySelectorAll("button") || [], {
        clearProps: "all",
      });

      tl.from(
        ctaRef.current?.querySelectorAll("button") || [],
        {
          y: 0,
          opacity: 0,
          // scale: 0,
          stagger: 0.15,
          duration: 0.6,
          clearProps: "opacity",
        },
        "-=0.4",
      );

      // Stats animation
      tl.from(
        statsRef.current?.querySelectorAll(".stat-item") || [],
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
        },
        "-=0.3",
      );

      // Scroll indicator animation
      tl.from(
        scrollIndicatorRef.current,
        {
          y: -20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5",
      );

      // Continuous animations
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });

      // Parallax effect on scroll
      gsap.to(videoRef.current, {
        scale: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Fade out only heading on scroll
      gsap.to(headingRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="snap-section h-dvh relative overflow-hidden"
    >
      <ContentWrapper maxwidth="max-w-full mx-auto" className="h-full">
        {/* video fixed section */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          loop
          preload="auto"
          autoPlay
        >
          <source src={"/assets/common/hero.mp4"} type="video/mp4" />
        </video>

        {/* Animated Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90"
        />

        {/* Elegant radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        {/* content section */}
        <div className="relative z-10 flex flex-col gap-y-10 max-md:gap-y-6 items-center justify-center h-full px-6">
          {/* Main Heading with split lines */}
          <h1
            ref={headingRef}
            className="text-center max-w-7xl overflow-hidden"
          >
            <span className="block hero-text-line text-[100px] max-xl:text-[80px] max-lg:text-[60px] max-md:text-[36px] font-light leading-none max-lg:leading-tight tracking-[-0.02em] text-white/95">
              Luxury Real Estate
            </span>
            <span className="block hero-text-line text-[100px] max-xl:text-[80px] max-lg:text-[60px] max-md:text-[36px] font-extralight leading-none max-lg:leading-tight tracking-[-0.02em] mt-4 max-lg:mt-0 text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.3)]">
              Redefined
            </span>
          </h1>

          {/* Elegant divider line */}
          <div className="w-20 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-white/80 text-xl max-lg:text-lg max-md:text-base text-center max-w-2xl font-extralight leading-relaxed tracking-[0.02em]"
          >
            Architectural masterpieces crafting Dubai&apos;s iconic skyline
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap gap-6 max-md:gap-4 justify-center opacity-100"
          >
            <button className="group cursor-pointer relative px-12 py-5 max-md:px-8 max-md:py-3 max-lg:px-20 bg-white text-black font-medium rounded-none overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02] opacity-100">
              <span className="relative z-10 tracking-widest text-sm uppercase">
                Explore Projects
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-white via-gray-100 to-white transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            <button className="group cursor-pointer relative px-12 py-5 max-md:px-8 max-md:py-3 bg-transparent border border-white/40 text-white font-medium rounded-none backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] opacity-100">
              <span className="relative z-10 flex items-center gap-3 tracking-widest text-sm uppercase">
                Contact Us
                <svg
                  className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </div>

          {/* Premium Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="absolute -bottom-15 left-1/2 -translate-x-1/2 cursor-pointer group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-light group-hover:text-white/70 transition-colors duration-300">
                Scroll
              </div>
              <div className="w-px h-16 bg-linear-to-b from-white/40 via-white/20 to-transparent group-hover:from-white/60 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroSection;
