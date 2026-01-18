"use client";

import React, { useEffect, useRef } from "react";
import ContentWrapper from "@/app/components/contentWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyInvestSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);

  const investmentReasons = [
    {
      id: 1,
      icon: "📍",
      title: "Prime Locations",
      description:
        "Strategically located in Dubai's most sought-after neighborhoods with excellent connectivity",
    },
    {
      id: 2,
      icon: "✨",
      title: "Luxury Design",
      description:
        "World-class architecture and premium finishes that set new standards in luxury living",
    },
    {
      id: 3,
      icon: "📈",
      title: "Strong ROI",
      description:
        "Consistent capital appreciation and high rental yields in competitive markets",
    },
    {
      id: 4,
      icon: "🌿",
      title: "Sustainability",
      description:
        "Green building practices and eco-friendly features for sustainable living",
    },
    {
      id: 5,
      icon: "👥",
      title: "Community",
      description:
        "Vibrant lifestyle amenities and world-class facilities for residents",
    },
    {
      id: 6,
      icon: "🔒",
      title: "Security & Privacy",
      description:
        "Advanced security systems and 24/7 management for peace of mind",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Heading + divider + paragraph
      tl.from(headingRef.current, { y: 40, opacity: 0, duration: 0.8 });
      tl.from(
        dividerRef.current,
        { scaleX: 0, opacity: 0, transformOrigin: "center", duration: 0.6 },
        "-=0.4",
      );
      tl.from(
        paragraphRef.current,
        { y: 20, opacity: 0, duration: 0.6 },
        "-=0.2",
      );

      // Features stagger
      tl.from(
        featuresRef.current?.querySelectorAll(".feature-card") || [],
        { y: 40, opacity: 0, stagger: 0.12, duration: 0.6 },
        "-=0.1",
      );

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
      className="snap-section relative min-h-screen overflow-hidden bg-[#0a0a0a] flex items-center"
    >
      <ContentWrapper maxwidth="max-w-7xl mx-auto" className="relative">
        <div className="w-full flex flex-col gap-y-10">
          {/* Heading + intro */}
          <div className="max-w-4xl mx-auto text-center">
            <h2
              ref={headingRef}
              className="text-white text-[56px] max-lg:text-[42px] max-md:text-[32px] font-light tracking-[-0.01em] leading-tight"
            >
              Why Invest in Binghatti
            </h2>
            <div
              ref={dividerRef}
              className="w-24 h-px bg-linear-to-r from-transparent via-white/60 to-transparent mx-auto my-6"
            />
            <p
              ref={paragraphRef}
              className="text-white/80 text-lg max-md:text-base font-extralight leading-relaxed"
            >
              Discover the compelling reasons to invest in Binghatti&apos;s
              exceptional real estate portfolio
            </p>
          </div>

          {/* Features Grid */}
          <div
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:gap-[20px_0px] max-w-6xl mx-auto"
          >
            {investmentReasons.map((reason) => (
              <div
                key={reason.id}
                className="feature-card group relative p-8 border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                {/* Content */}
                <h3 className="text-white text-xl font-light mb-4 group-hover:text-white/90 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-white/60 text-sm font-extralight leading-relaxed mb-6">
                  {reason.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="max-w-4xl mx-auto flex max-lg:flex-wrap items-center gap-6 max-md:gap-[20px_0]">
            <h3 className="text-white text-3xl max-md:text-2xl font-light">
              Ready to Invest?
            </h3>

            <button className="group cursor-pointer relative px-12 py-5 bg-white text-black font-medium rounded-none backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02]">
              <span className="relative z-10 flex items-center gap-3 tracking-widest text-sm uppercase justify-center">
                Schedule Consultation
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
              <div className="absolute inset-0 bg-linear-to-r from-white via-gray-100 to-white transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default WhyInvestSection;
