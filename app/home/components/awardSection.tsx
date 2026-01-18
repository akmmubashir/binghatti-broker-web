"use client";
import React, { useEffect, useRef } from "react";
import ContentWrapper from "@/app/components/contentWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const AwardSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const awardList = [
    {
      id: 1,
      img: "/assets/awards/img-6.svg",
      title: "International Architecture Award 2023",
    },
    {
      id: 2,
      img: "/assets/awards/img-2.svg",
      title: "International Architecture Award 2023",
    },
    {
      id: 3,
      img: "/assets/awards/img-3.svg",
      title: "International Architecture Award 2023",
    },
    {
      id: 4,
      img: "/assets/awards/img-7.svg",
      title: "International Architecture Award 2023",
    },
    {
      id: 5,
      img: "/assets/awards/img-5.svg",
      title: "International Architecture Award 2023",
    },
    {
      id: 6,
      img: "/assets/awards/img-1.svg",
      title: "International Architecture Award 2023",
    },
    {
      id: 7,
      img: "/assets/awards/img-4.svg",
      title: "International Architecture Award 2023",
    },
    {
      id: 8,
      img: "/assets/awards/img-8.svg",
      title: "International Architecture Award 2023",
    },
    {
      id: 9,
      img: "/assets/awards/img-9.svg",
      title: "International Architecture Award 2023",
    },
    {
      id: 10,
      img: "/assets/awards/img-10.svg",
      title: "International Architecture Award 2023",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Overlay fade
      tl.from(overlayRef.current, { opacity: 0, duration: 0.8 });

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

      // Cards stagger
      tl.from(
        cardsRef.current?.querySelectorAll(".about-card") || [],
        { y: 30, opacity: 0, stagger: 0.15, duration: 0.6 },
        "-=0.1",
      );

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
      className="snap-section relative min-h-screen overflow-hidden bg-black flex items-center"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
        muted
        playsInline
        loop
        preload="auto"
        autoPlay
      >
        <source src={"/assets/common/bg-video1.mp4"} type="video/mp4" />
      </video>

      {/* Dark premium overlay with black & white effect */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-linear-to-b from-black/40 via-black/50 to-black/60"
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      <ContentWrapper
        maxwidth="max-w-full mx-auto h-full"
        className="relative py-20 flex items-center"
      >
        <div className="w-full flex flex-col gap-y-20">
          {/* Heading + intro */}
          <div className="max-w-5xl mx-auto text-center lg:px-6">
            <h2
              ref={headingRef}
              className="text-white text-[56px] max-lg:text-[42px] max-md:text-[32px] font-light tracking-[-0.01em] leading-tight"
            >
              Awards & Recognition
            </h2>
            <div
              ref={dividerRef}
              className="w-24 h-px bg-linear-to-r from-transparent via-white/60 to-transparent mx-auto my-6"
            />
            <p
              ref={paragraphRef}
              className="text-white text-lg max-md:text-base font-extralight leading-relaxed"
            >
              Recognized globally for excellence in design, sustainability, and
              customer satisfaction
            </p>
          </div>

          {/* Awards Grid */}
          <div
            className="grid grid-cols-10 max-xl:grid-cols-12 max-lg:grid-cols-10 gap-16 overflow-hidden max-lg:gap-[40px_20px] px-6 max-w-7xl mx-auto"
            ref={cardsRef}
          >
            {awardList.map((award) => (
              <div
                key={award.id}
                className="about-card col-span-2 max-xl:col-span-3 max-lg:col-span-5 flex justify-center items-center"
              >
                <Image
                  src={award.img}
                  alt={award.title}
                  width={300}
                  height={200}
                  className="w-full h-14 max-lg:h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default AwardSection;
