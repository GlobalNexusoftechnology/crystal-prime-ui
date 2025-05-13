import {TIconProps} from "@/constants"

// SearchIcon component renders a search (magnifying glass) icon.
export function SearchIcon({
  className = "w-full h-full",
  color = "#2B2B3A",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.69356 12.5352C12.4234 11.375 13.6959 8.22157 12.5357 5.49173C11.3756 2.76189 8.22212 1.48941 5.49228 2.64957C2.76244 3.80972 1.48996 6.96318 2.65011 9.69302C3.81027 12.4229 6.96373 13.6953 9.69356 12.5352Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.3902 11.3896L15.5556 15.5556"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
