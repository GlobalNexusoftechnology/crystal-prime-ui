import React from "react";

type TInstagramIconProps = {
  width?: number;
  height?: number;
  fill?: string;
};

/**
 * ---------------------------------------------------------------------------
 * A custom Instagram-like icon with multiple paths for the design.
 */
export function MoneyIcon({
    width = 48,
    height = 48,
//   fill = "white",
}: TInstagramIconProps) {
  return (
    <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  
  >
    <rect
      x={4}
      y={8}
      width={40}
      height={32}
      rx={4}
      fill="#EAB4FE"
      stroke="#141718"
      strokeWidth={2.5}
    />
    <circle
      cx={4}
      cy={4}
      r={4}
      transform="matrix(1 0 0 -1 20 28)"
      fill="white"
      stroke="#141718"
      strokeWidth={2.5}
    />
    <circle
      cx={2}
      cy={2}
      r={2}
      transform="matrix(1 0 0 -1 34 26)"
      fill="#141718"
    />
    <circle
      cx={2}
      cy={2}
      r={2}
      transform="matrix(1 0 0 -1 10 26)"
      fill="#141718"
    />
  </svg>
  );
}