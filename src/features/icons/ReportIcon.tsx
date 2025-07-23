import { TIconProps } from "@/constants";

// ProjectManagementIcon component renders a hamburger menu icon as an SVG.
export function ReportIcon({
  className = "w-full h-full",
  color = "#505050",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21.5H10C6.70017 21.5 5.05025 21.5 4.02513 20.4749C3 19.4497 3 17.7998 3 14.5V3.5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M7 4.5H8"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M7 7.5H11"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M5 20.5C6.07093 18.553 7.52279 13.5189 10.3063 13.5189C12.2301 13.5189 12.7283 15.9717 14.6136 15.9717C17.8572 15.9717 17.387 10.5 21 10.5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
