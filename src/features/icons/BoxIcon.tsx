import React from "react";

type TUserIconProps = {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
};

export function BoxIcon({
  width = 36,
  height = 36,
  stroke = "#1DC5C4",
  fill = "none",
}: TUserIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="28"
        height="28"
        stroke={stroke}
        strokeWidth="1.5"
        fill={fill}
      />
      <path
        d="M4 4L16.8 8.8L28 4"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 32L16.8 27.2L28 32"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
