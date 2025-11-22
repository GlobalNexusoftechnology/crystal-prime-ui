import { TIconProps } from "@/constants";

// DashboardIcon component renders a hamburger menu icon as an SVG.
export function MaterialIcon({
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
        d="M17.7705 5.49408L14.3145 4.16279C13.1674 3.72093 12.5939 3.5 12.0001 3.5C11.4062 3.5 10.8327 3.72093 9.68561 4.16279L6.22941 5.49417C4.07647 6.32351 2.99999 6.73818 3 7.50021C3.00001 8.26225 4.07649 8.67688 6.22946 9.50616L9.68542 10.8373C10.8324 11.2791 11.4058 11.5 11.9996 11.5C12.5934 11.5 13.1668 11.2791 14.3138 10.8374L17.7704 9.5061C19.9235 8.67685 21 8.26223 21 7.50018C21 6.73814 19.9235 6.32345 17.7705 5.49408Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 10.0049L17.7705 10.4943C19.9235 11.3237 21 11.7383 21 12.5004C21 13.2624 19.9235 13.6771 17.7704 14.5063L14.3138 15.8376C13.1668 16.2793 12.5934 16.5002 11.9996 16.5002C11.4058 16.5002 10.8324 16.2793 9.68542 15.8375L6.22946 14.5064C4.07649 13.6771 3.00001 13.2625 3 12.5004C2.99999 11.7384 4.07647 11.3237 6.22941 10.4944L7.50011 10.0049"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 11L8.76086 15.3882M5 14L10.5 11.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6352 15.0566L17.7705 15.4939C19.9235 16.3233 21 16.738 21 17.5001C21 18.2621 19.9235 18.6767 17.7704 19.506L14.3138 20.8373C13.1668 21.279 12.5934 21.4999 11.9996 21.4999C11.4058 21.4999 10.8324 21.279 9.68542 20.8372L6.22946 19.506C4.07649 18.6768 3.00001 18.2621 3 17.5001C2.99999 16.738 4.07647 16.3234 6.22941 15.494L7.36476 15.0567"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
