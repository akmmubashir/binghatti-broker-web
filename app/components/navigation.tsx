import React from "react";
import Link from "next/link";

type Props = {
  type?: string;
};

const Navigation = (props: Props) => {
  const navigationData = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "Contact Us", href: "#contact" },
  ];
  return (
    <div className="flex gap-5 uppercase max-xl:hidden">
      {navigationData.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-[16px] ${props.type === "transparent" ? "text-white hover:text-[#d9baa0]" : "text-[#160A0A] hover:text-[#d9baa0]"} ${props.type === "scroll" ? "font-medium" : ""}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
