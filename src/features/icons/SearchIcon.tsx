import React from "react";

type TSearchIconProps = {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
};

/**
 * ---------------------------------------------------------------------------
 * A circle with a diagonal line through it, with customizable width, height, stroke, and strokeWidth.
 */
export function SearchIcon({
  width = 24,
  height = 24,
  stroke = "white", // default stroke color is white
  strokeWidth = 2, // default stroke width is 2
}: TSearchIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11"
        cy="11"
        r="6"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M20 20L17 17"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
