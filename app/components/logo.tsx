import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  color?: string;
};

const Logo = (props: Props) => {
  return (
    <div className="w-50 max-md:w-40">
      <Link href="/">
        <Image
          src={
            props.color === "white"
              ? "/assets/common/binghatti-logo.png"
              : "/assets/common/binghatti-logo.png"
          }
          alt="Logo"
          className="w-full h-full"
          width={300}
          height={200}
        />
      </Link>
    </div>
  );
};

export default Logo;
