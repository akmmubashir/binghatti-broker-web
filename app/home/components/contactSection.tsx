"use client";

import React, { useEffect, useRef, useState } from "react";
import ContentWrapper from "@/app/components/contentWrapper";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const formWrapperRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      if (isMobile) {
        // Mobile: Form appears from bottom
        gsap.set(imageWrapperRef.current, {
          display: "none",
        });

        gsap.set(formWrapperRef.current, {
          opacity: 0,
          y: 50,
        });

        tl.to(formWrapperRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      } else {
        // Desktop: Image slides from full width to left side
        gsap.set(imageWrapperRef.current, {
          width: "100%",
        });

        gsap.set(formWrapperRef.current, {
          opacity: 0,
          x: 50,
        });

        tl.to(imageWrapperRef.current, {
          width: "50%",
          duration: 1.2,
          ease: "power3.inOut",
        });

        tl.to(
          formWrapperRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );
      }

      // Animate form elements
      tl.from(
        headingRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4",
      );

      tl.from(
        formRef.current?.querySelectorAll(".form-field") || [],
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.2",
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

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={containerRef}
      className="snap-section relative h-dvh max-md:h-auto overflow-hidden bg-black"
    >
      <div className="relative h-full flex flex-col md:flex-row">
        {/* Image Side - Hidden on Mobile */}
        <div
          ref={imageWrapperRef}
          className="hidden md:block relative h-full overflow-hidden"
        >
          <Image
            src="/assets/common/about.webp"
            alt="Contact Binghatti"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/40 to-black/80" />
        </div>

        {/* Form Side */}
        <div
          ref={formWrapperRef}
          className="flex-1 relative w-full md:h-full overflow-y-auto"
        >
          <ContentWrapper
            maxwidth="max-w-2xl mx-auto"
            className="h-full flex items-center py-12 md:py-20 px-4 md:px-0"
          >
            <div className="w-full">
              {/* Heading */}
              <div className="mb-8 md:mb-12">
                <h2
                  ref={headingRef}
                  className="text-white text-[42px] sm:text-[48px] md:text-[56px] font-light tracking-[-0.01em] leading-tight mb-4"
                >
                  Get in Touch
                </h2>
                <div className="w-24 h-px bg-linear-to-r from-white/60 to-transparent mb-4 md:mb-6" />
                <p className="text-white/70 text-base sm:text-lg font-extralight">
                  Ready to explore investment opportunities? Contact our team
                  today
                </p>
              </div>

              {/* Form */}
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                {/* Name Field */}
                <div className="form-field">
                  <label
                    htmlFor="name"
                    className="block text-white/80 text-xs sm:text-sm uppercase tracking-wider mb-2 font-light"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/20 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors duration-300 backdrop-blur-sm rounded-sm"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div className="form-field">
                  <label
                    htmlFor="email"
                    className="block text-white/80 text-xs sm:text-sm uppercase tracking-wider mb-2 font-light"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/20 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors duration-300 backdrop-blur-sm rounded-sm"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone Field */}
                <div className="form-field">
                  <label
                    htmlFor="phone"
                    className="block text-white/80 text-xs sm:text-sm uppercase tracking-wider mb-2 font-light"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/20 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors duration-300 backdrop-blur-sm rounded-sm"
                    placeholder="+971 50 123 4567"
                  />
                </div>

                {/* Submit Button */}
                <div className="form-field pt-2 md:pt-4">
                  <button
                    type="submit"
                    className="group cursor-pointer relative w-full px-8 sm:px-12 py-4 sm:py-5 bg-white text-black font-medium rounded-sm backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02]"
                  >
                    <span className="relative z-10 flex items-center gap-2 sm:gap-3 tracking-widest text-xs sm:text-sm uppercase justify-center">
                      Send Message
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform duration-500"
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
              </form>

              {/* Contact Info */}
              {/* <div className="mt-12 pt-8 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white/60 text-sm">
                  <div>
                    <p className="text-white/40 uppercase tracking-wider text-xs mb-2">
                      Email
                    </p>
                    <p className="font-light">info@binghatti.com</p>
                  </div>
                  <div>
                    <p className="text-white/40 uppercase tracking-wider text-xs mb-2">
                      Phone
                    </p>
                    <p className="font-light">+971 4 123 4567</p>
                  </div>
                </div>
              </div> */}
            </div>
          </ContentWrapper>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
