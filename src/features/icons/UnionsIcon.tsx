import React from "react";

type TUserIconProps = {
  width?: number;
  height?: number;
  fill?: string;
  opacity?: number;
};

export function UnionsIcon({
  width = 55,
  height = 40,
  fill = "#DADADA",
  opacity = 0.41,
}: TUserIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 55 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.4643 13.2381C29.4643 6.00537 35.1805 0.142998 42.232 0.142822C49.2836 0.142822 55 6.00526 55 13.2381C55 26.3333 45.424 39.4285 35.8485 39.4285V32.8811C35.8485 32.8811 42.2323 29.9432 42.2323 26.3333C35.1807 26.3333 29.4643 20.47 29.4643 13.2381ZM6.38437 32.8811C6.38437 32.8811 12.7681 29.9432 12.7681 26.3333H12.7678C5.7162 26.3333 -0.000102997 20.4704 -0.000102997 13.2381C-0.000102997 6.00526 5.71663 0.142822 12.7678 0.142822C19.8193 0.142822 25.5356 6.00526 25.5356 13.2381C25.5356 26.3333 15.9601 39.4285 6.38437 39.4285V32.8811Z"
        fill={fill}
        fillOpacity={opacity}
      />
    </svg>
  );
}
