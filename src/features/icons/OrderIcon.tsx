import React from "react";

type TCustomIconProps = {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
};

/**
 * ---------------------------------------------------------------------------
 * Custom Stretched SVG Icon with a sleek and modern design.
 */
export function OrderIcon({
  width = 36,
  height = 36,
  stroke = "#1DC5C4",
  fill = "none",
}: TCustomIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Frame */}
      <rect
        x="2"
        y="2"
        width="32"
        height="32"
        rx="6"
        stroke={stroke}
        strokeWidth="2"
      />

      {/* Inner Symbol - Stretched Shape */}
      <path
        d="M10 12 L18 6 L26 12 L26 24 L18 30 L10 24 Z"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small Details */}
      <circle cx="18" cy="18" r="4" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}
