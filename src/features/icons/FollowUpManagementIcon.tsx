import { TIconProps } from "@/constants";

// HorizontalTreeDotIcon component renders a hamburger menu icon as an SVG.
export function FollowUpManagementIcon({
  className = "w-full h-full",
  color = "black",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 9.86842C3.5 6.39491 3.5 4.65816 4.52513 3.57908C5.55025 2.5 7.20017 2.5 10.5 2.5H13.5C16.7998 2.5 18.4497 2.5 19.4749 3.57908C20.5 4.65816 20.5 6.39491 20.5 9.86842V15.1316C20.5 18.6051 20.5 20.3418 19.4749 21.4209C18.4497 22.5 16.7998 22.5 13.5 22.5H10.5C7.20017 22.5 5.55025 22.5 4.52513 21.4209C3.5 20.3418 3.5 18.6051 3.5 15.1316V9.86842Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 11.5H17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 12.5C7 12.5 7.5 12.5 8 13.5C8 13.5 9.58824 11 11 10.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 17.5H17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 2.5L8.0822 2.9932C8.28174 4.19044 8.38151 4.78906 8.80113 5.14453C9.22075 5.5 9.82762 5.5 11.0414 5.5H12.9586C14.1724 5.5 14.7793 5.5 15.1989 5.14453C15.6185 4.78906 15.7183 4.19044 15.9178 2.9932L16 2.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 17.5H9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
