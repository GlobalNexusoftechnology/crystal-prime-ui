import { TIconProps } from "@/constants";

// MenuIcon component renders a hamburger menu icon as an SVG.
export function MenuIcon({
  className = "w-full h-full",
  color = "#2B2B3A",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.898019">
        <path
          d="M3.75 6.5625H20.25V7.9375H3.75V6.5625ZM3.75 12.0625H20.25V13.4375H3.75V12.0625ZM3.75 17.5625H20.25V18.9375H3.75V17.5625Z"
          fill={color}
        />
      </g>
    </svg>
  );
}
