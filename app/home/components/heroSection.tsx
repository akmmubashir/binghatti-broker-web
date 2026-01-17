import React from "react";
import ContentWrapper from "@/app/components/contentWrapper";

const HeroSection = () => {
  return (
    <ContentWrapper
      maxwidth="max-w-full mx-auto"
      className="h-dvh relative flex items-end"
    >
      {/* video fixed section */}
      <video
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        muted
        playsInline
        loop
        preload="auto"
        autoPlay
      >
        <source src={"/assets/common/hero.mp4"} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* content section */}
      <div className="absolute left-0 bottom-0 z-10 flex flex-col items-start justify-center">
        <h1 className="text-white text-[100px] max-xl:text-[40px] max-lg:text-[32px] font-semibold text-start w-2/3 max-lg:w-full">
          Luxury Real Estate Developer in Dubai
        </h1>
      </div>
    </ContentWrapper>
  );
};

export default HeroSection;
