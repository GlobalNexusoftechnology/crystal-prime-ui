import React from "react";

// Type for the CarIcon properties
type TCarIconProps = {
  width?: number; // Width of the icon
  height?: number; // Height of the icon
  fill?: string; // Fill color for the primary path
  stroke?: string; // Stroke color for the outlined path
};

/**
 * ---------------------------------------------------------------------------
 * A Car icon with customizable width, height, fill, and stroke color.
 */
export function LockIcon({
  width = 48,
  height = 48,
  fill = "#EAB4FE",
  stroke = "#141718",
}: TCarIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 24C8 19.5817 11.5817 16 16 16H32C36.4183 16 40 19.5817 40 24V36C40 40.4183 36.4183 44 32 44H16C11.5817 44 8 40.4183 8 36V24Z"
        fill={fill}
      />
      <path
        d="M32 16H16M32 16C36.4183 16 40 19.5817 40 24V36C40 40.4183 36.4183 44 32 44H16C11.5817 44 8 40.4183 8 36V24C8 19.5817 11.5817 16 16 16M32 16V12C32 7.58172 28.4183 4 24 4C19.5817 4 16 7.58172 16 12V16M24 32V28"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
