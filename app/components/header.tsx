"use client";
import React, { useEffect, useState } from "react";
import Logo from "./logo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`'flex justify-center fixed w-full left-0 top-0 z-50 ${scrolled ? "bg-gray-950/20 backdrop-blur-[3px]" : "bg-transparent"} `}
    >
      <div
        className={`p-[40px_100px] max-xl:p-[30px_60px] max-md:p-[20px_20px] flex items-center justify-between`}
      >
        <Logo color={scrolled ? "black" : "white"} />
      </div>
    </div>
  );
};

export default Header;
