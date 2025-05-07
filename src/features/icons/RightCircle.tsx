import React from "react";

type TCheckIconProps = {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
};

/**
 * ---------------------------------------------------------------------------
 * A circular check icon with a check mark inside.
 */
export function RightCircleIcon({
  width = 20,
  height = 20,
  fill = "#AF5AD0",
  stroke = "white",
}: TCheckIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_106_1686)">
        <rect width="20" height="20" rx="10" fill={fill} />
        <path
          d="M14.4166 7.125L8.68742 12.8542L6.08325 10.25"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_106_1686">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
