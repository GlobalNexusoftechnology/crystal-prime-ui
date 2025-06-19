import { TIconProps } from "@/constants";

// MilestoneIcon component renders a hamburger menu icon as an SVG.
export function MilestoneIcon({
  className = "w-full h-full",
  color = "#667085",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_594_4386)">
        <path
          d="M14.1666 10.0007C14.1666 12.3018 12.3011 14.1673 9.99998 14.1673C7.6988 14.1673 5.83331 12.3018 5.83331 10.0007C5.83331 7.69947 7.6988 5.83398 9.99998 5.83398"
          stroke={color}
          strokeWidth="1.5"
          stroke-linecap="round"
        />
        <path
          d="M11.6667 1.83272C11.1282 1.7234 10.5708 1.66602 10 1.66602C5.39765 1.66602 1.66669 5.39697 1.66669 9.99935C1.66669 14.6017 5.39765 18.3327 10 18.3327C14.6024 18.3327 18.3334 14.6017 18.3334 9.99935C18.3334 9.4286 18.2759 8.87118 18.1667 8.33268"
          stroke={color}
          strokeWidth="1.5"
          stroke-linecap="round"
        />
        <path
          d="M10.0253 9.9677L13.8194 6.1736M16.4504 3.61945L15.9894 1.9635C15.9044 1.69069 15.5762 1.58197 15.3549 1.76278C14.1582 2.74075 12.8545 4.05802 13.9192 6.13576C16.0643 7.13605 17.2889 5.78713 18.2278 4.65335C18.4146 4.42777 18.3019 4.08866 18.0206 4.00731L16.4504 3.61945Z"
          stroke={color}
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_594_4386">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
