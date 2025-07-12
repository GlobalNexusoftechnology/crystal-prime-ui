import { TIconProps } from "@/constants";

export function EILogIcon({
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
        d="M13 4H14C14.93 4 15.395 4 15.7765 4.10222C16.8117 4.37962 17.6204 5.18827 17.8978 6.22354C18 6.60504 18 7.07003 18 8H5C3.89543 8 3 7.10457 3 6C3 4.89543 3.89543 4 5 4H8"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 6V16C3 18.8284 3 20.2426 3.87868 21.1213C4.75736 22 6.17157 22 9 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V14C21 11.1716 21 9.75736 20.1213 8.87868C19.2426 8 17.8284 8 15 8H7"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 13H19C18.535 13 18.3025 13 18.1118 13.0511C17.5941 13.1898 17.1898 13.5941 17.0511 14.1118C17 14.3025 17 14.535 17 15C17 15.465 17 15.6975 17.0511 15.8882C17.1898 16.4059 17.5941 16.8102 18.1118 16.9489C18.3025 17 18.535 17 19 17H21"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.5 3C12.433 3 14 4.567 14 6.5C14 7.0368 13.8792 7.54537 13.6632 8H7.33682C7.12085 7.54537 7 7.0368 7 6.5C7 4.567 8.567 3 10.5 3Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
