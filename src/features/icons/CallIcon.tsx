import React from "react";

// Type definition for the icon's props
type TPhoneIconProps = {
  width?: number; // Width of the icon
  height?: number; // Height of the icon
  fill?: string; // Fill color of the icon
  stroke?: string; // Stroke color of the icon
  strokeWidth?: number; // Stroke width of the icon
};

/**
 * ---------------------------------------------------------------------------
 * A Phone icon with customizable width, height, fill, stroke color, and stroke width.
 */
export function CallIcon({
  width = 48,
  height = 48,
  fill = "#EAB4FE",
  stroke = "#141718",
  strokeWidth = 2.5,
}: TPhoneIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42 38V34.7081C42 33.0725 41.0042 31.6017 39.4856 30.9942L35.4173 29.3669C33.4857 28.5943 31.2844 29.4312 30.354 31.292L30 32C30 32 25 31 21 27C17 23 16 18 16 18L16.708 17.646C18.5688 16.7156 19.4057 14.5143 18.6331 12.5827L17.0058 8.51444C16.3983 6.99581 14.9275 6 13.2919 6H10C7.79086 6 6 7.79086 6 10C6 27.6731 20.3269 42 38 42C40.2091 42 42 40.2091 42 38Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}
