import React from "react";

type Props = {
  children?: React.ReactNode;
  desktopPadding?: string;
  laptopPadding?: string;
  mobilePadding?: string;
  maxwidth?: string;
  className?: string;
  style?: React.CSSProperties;
};

const ContentWrapper = (props: Props) => {
  return (
    <div
      className={`${props.desktopPadding ?? "p-[100px_100px]"} ${props.laptopPadding ?? "max-xl:p-[80px_60px]"} ${props.mobilePadding ?? "max-lg:p-[60px_20px]"} ${props.maxwidth ?? "max-w-300 mx-auto"} ${props.className ?? ""}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default ContentWrapper;
