import React from "react";

type TCustomIconProps = {
  width?: number;
  height?: number;
  stroke?: string;
};

/**
 * ---------------------------------------------------------------------------
 * A custom icon with circles and paths as defined in the provided SVG.
 */
export function FilterIcon({
  width = 22,
  height = 19,
  stroke = "white",
}: TCustomIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 5H9"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 14H4"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="5"
        cy="5"
        r="4"
        stroke={stroke}
        strokeWidth={1.5}
      />
      <circle
        cx="17"
        cy="14"
        r="4"
        stroke={stroke}
        strokeWidth={1.5}
      />
    </svg>
  );
}
