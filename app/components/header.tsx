"use client";
import React, { useEffect, useState } from "react";
import Logo from "./logo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past hero section (assuming hero is viewport height)
      setScrolled(currentScrollY > 10);

      // Show header if at top of page or scrolling up
      if (currentScrollY < 100) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed w-full left-0 top-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "bg-black/20 backdrop-blur-[3px]" : "bg-transparent"}`}
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
