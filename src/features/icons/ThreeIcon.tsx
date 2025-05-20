import { TIconProps } from "@/constants";

// DashboardIcon component renders a hamburger menu icon as an SVG.
export function ThreeIcon({
  className = "w-full h-full",
//   color = "#303030",
}: TIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    
    >
      <path
        d="M11.9922 12H12.0012"
        stroke="#303030"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9844 18H11.9934"
        stroke="#303030"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6H12.009"
        stroke="#303030"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
