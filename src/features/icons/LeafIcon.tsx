import React from "react";

type TCustomIconProps = {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

/**
 * ---------------------------------------------------------------------------
 * A custom SVG leaf icon with structured paths and customizable stroke.
 */
export function LeafIcon({
  width = 40,
  height = 40,
  fill = "#1DC5C4",
  stroke = "white", // Default stroke color
  strokeWidth = 1, // Default stroke width
}: TCustomIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M36.49 0.538888C36.4367 0.343091 36.3041 0.178352 36.1241 0.0845746C35.7689 -0.103383 35.3286 0.032208 35.1405 0.387417C35.14 0.388321 35.1395 0.389226 35.1391 0.390131C35.1391 0.410233 31.4523 7.56266 20.1347 8.809C18.6584 8.96651 17.2153 9.35167 15.8569 9.95082C13.4254 11.0079 11.4173 12.8477 10.1518 15.1774C8.97043 17.3659 8.48114 19.8614 8.7487 22.3339C8.9458 24.1363 9.54777 25.8708 10.5097 27.4077C8.49943 28.8511 2.12296 33.8405 1.54803 39.1957C1.50581 39.5954 1.79569 39.9536 2.19533 39.9958C2.59506 40.038 2.95318 39.7482 2.9954 39.3485C3.52208 34.5682 9.50455 29.9326 11.37 28.5897C13.6095 31.3397 16.9625 32.8916 20.5609 33.1449C22.9827 33.3012 25.4074 32.8882 27.6409 31.9388C30.0655 30.9215 32.2068 29.3307 33.8807 27.3032C38.1947 22.0766 40.2491 13.2918 36.49 0.538888Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width={width} height={height} fill="white" stroke={stroke}
          strokeWidth={strokeWidth} />
        </clipPath>
      </defs>
    </svg>
  );
}
