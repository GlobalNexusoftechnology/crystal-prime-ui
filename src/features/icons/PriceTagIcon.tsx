/**
 * A user icon with head and shoulders using SVG paths.
 */
import React from "react";

type TUserIconProps = {
  width?: number;
  height?: number;
  stroke?: string;
};

export function PriceTagIcon({
  width = 32,
  height = 32,
  stroke = "#1DC5C4",
}: TUserIconProps) {
  return (
    <svg
      width={width} // Use dynamic width
      height={height} // Use dynamic height
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 16L16 4L28 16L16 28L4 16Z"
        stroke={stroke} // Use dynamic stroke color
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="12" r="2" fill={stroke} />
    </svg>
  );
}
