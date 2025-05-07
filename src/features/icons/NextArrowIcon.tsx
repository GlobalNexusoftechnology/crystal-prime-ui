import React from "react";

type TCustomIconProps = {
    width?: number;
    height?: number;
    stroke?: string;
};

/**
 * ---------------------------------------------------------------------------
 * A custom icon with a customizable width, height, and fill color.
 */
    export function NextArrowIcon({
        // width = 6,
        // height = 10,
        stroke = "#808080",
      }: TCustomIconProps) {
        return (
          <svg
            // width={width}
            // height={height}
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.0835 0.916676L5.16683 5.00001L1.0835 9.08334"
              stroke={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      }