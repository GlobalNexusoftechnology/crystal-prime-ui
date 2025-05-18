import { TIconProps } from "@/constants";

// DashboardIcon component renders a hamburger menu icon as an SVG.
export function ExportIcon({
  className = "w-full h-full",
  color = "#303030",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.4165 10.0001C18.4165 13.732 18.4165 15.598 17.2571 16.7574C16.0978 17.9167 14.2318 17.9167 10.4998 17.9167C6.76792 17.9167 4.90192 17.9167 3.7425 16.7574C2.58317 15.598 2.58317 13.732 2.58317 10.0001C2.58317 6.26816 2.58317 4.40216 3.7425 3.24275C4.90192 2.08341 6.76792 2.08342 10.4998 2.08342C14.2318 2.08342 16.0978 2.08341 17.2571 3.24275C18.4165 4.40216 18.4165 6.26816 18.4165 10.0001Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M10.4979 14.1345V8.25925M10.4979 8.25925C10.2262 8.25558 9.95808 8.44241 9.76033 8.67033L8.43575 10.1559M10.4979 8.25925C10.7601 8.26275 11.0256 8.4485 11.2355 8.67041L12.5678 10.1559M13.8447 5.80116H7.17808"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
