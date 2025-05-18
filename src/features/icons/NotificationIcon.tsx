import { TIconProps } from "@/constants";

// HorizontalTreeDotIcon component renders a hamburger menu icon as an SVG.
export function NotificationIcon({
  className = "w-full h-full",
  color = "black",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.10843 11.9951C1.93122 13.1227 2.7235 13.9052 3.69354 14.2952C7.41251 15.7906 12.5878 15.7906 16.3067 14.2952C17.2768 13.9052 18.0691 13.1227 17.8919 11.9951C17.783 11.3022 17.2445 10.7252 16.8455 10.1617C16.3229 9.41466 16.271 8.59983 16.2709 7.73292C16.2709 4.38267 13.4634 1.66675 10.0002 1.66675C6.53694 1.66675 3.72944 4.38267 3.72944 7.73292C3.72936 8.59983 3.67743 9.41466 3.15484 10.1617C2.75586 10.7252 2.21734 11.3022 2.10843 11.9951Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 17.5C8.16344 18.0183 9.03958 18.3333 10 18.3333C10.9604 18.3333 11.8366 18.0183 12.5 17.5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
