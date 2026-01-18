"use client";

import React, { useEffect, useRef, useState } from "react";
import ContentWrapper from "@/app/components/contentWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectList = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projectsList = [
    {
      id: 1,
      title: "Bugatti Residences",
      spanTitle: "By Binghatti",
      image: "/assets/projects/bugatti-new.webp",
    },
    {
      id: 2,
      title: "MERCEDES-BENZ PLACES",
      spanTitle: "Binghatti City",
      image: "/assets/projects/mercedes-benz-places-binghatti-city.webp",
    },
    {
      id: 3,
      title: "MERCEDES-BENZ PLACES",
      spanTitle: "Binghatti",
      image: "/assets/projects/mercedes-new.webp",
    },
    {
      id: 4,
      title: "Burj Binghatti",
      spanTitle: "Jacob&CO Residences",
      image: "/assets/projects/jacob-new.webp",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectsList.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + projectsList.length) % projectsList.length,
    );
  };

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

      // Entrance animations
      tl.from(bgRef.current, { opacity: 0, duration: 0.8 });
      tl.from(
        headingRef.current,
        { y: 40, opacity: 0, duration: 0.8 },
        "-=0.4",
      );
      tl.from(
        subtitleRef.current,
        { y: 20, opacity: 0, duration: 0.6 },
        "-=0.4",
      );
      tl.from(
        buttonRef.current,
        { y: 20, opacity: 0, duration: 0.6, clearProps: "opacity" },
        "-=0.3",
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

  useEffect(() => {
    // Animate background image change
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        opacity: 0.5,
        duration: 0.3,
        onComplete: () => {
          gsap.to(bgRef.current, {
            opacity: 1,
            duration: 0.3,
          });
        },
      });
    }

    // Animate text content
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "power3.out",
      });
    }
  }, [activeIndex]);

  const currentProject = projectsList[activeIndex];

  return (
    <section
      ref={containerRef}
      className="snap-section relative h-screen overflow-hidden bg-black bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${currentProject.image})`,
        // filter: "grayscale(0%) brightness(80%)",
      }}
    >
      {/* Dark premium overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/40 via-black/50 to-black/60" />

      <ContentWrapper
        maxwidth="max-w-full mx-auto"
        className="relative h-full flex items-center"
        mobilePadding="max-lg:p-[100px_20px_80px]"
      >
        <div
          ref={contentRef}
          className="flex flex-col justify-between w-full h-full"
        >
          {/* Heading + subtitle */}
          <div className="max-w-5xl">
            <h2
              ref={headingRef}
              className="text-white uppercase text-[64px] max-lg:text-[48px] max-md:text-[36px] font-light tracking-[-0.01em] leading-tight"
            >
              {currentProject.title}
            </h2>
            <div
              ref={subtitleRef}
              className="mt-4 uppercase text-white/80 text-2xl max-lg:text-xl max-md:text-lg font-extralight"
            >
              {currentProject.spanTitle}
            </div>
          </div>

          {/* Bottom section with button and navigation */}
          <div className="flex flex-col gap-12">
            <button
              ref={buttonRef}
              className="group cursor-pointer relative w-fit px-12 py-5 max-md:px-8 max-md:py-3 bg-white text-black font-medium rounded-none backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02] opacity-100!"
            >
              <span className="relative z-10 flex items-center gap-3 tracking-widest text-sm uppercase">
                Discover More
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

            {/* Navigation Controls */}
            <div className="flex flex-wrap justify-between gap-8 items-end">
              {/* Navigation Arrows */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="group cursor-pointer w-14 h-14 border border-white/40 backdrop-blur-sm hover:bg-white hover:border-white transition-all duration-300"
                  aria-label="Previous project"
                >
                  <svg
                    className="w-6 h-6 mx-auto text-white group-hover:text-black transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="group cursor-pointer w-14 h-14 border border-white/40 backdrop-blur-sm hover:bg-white hover:border-white transition-all duration-300"
                  aria-label="Next project"
                >
                  <svg
                    className="w-6 h-6 mx-auto text-white group-hover:text-black transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-3 items-center">
                {/* Pagination Dots */}
                <div className="flex gap-2">
                  {projectsList.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-1 transition-all duration-300 ${
                        index === activeIndex
                          ? "w-20 bg-white"
                          : "w-8 cursor-pointer bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <span className="text-white/60 text-sm uppercase tracking-wider ml-auto">
                  {activeIndex + 1} / {projectsList.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default ProjectList;
