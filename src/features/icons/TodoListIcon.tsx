import { TIconProps } from "@/constants";

// ToDoListIcon component renders a hamburger menu icon as an SVG.
export function ToDoListIcon({
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
      <path
        d="M2.91669 7.80637C2.91669 4.91177 2.91669 3.46448 3.77096 2.56525C4.62523 1.66602 6.00016 1.66602 8.75002 1.66602H11.25C13.9999 1.66602 15.3748 1.66602 16.2291 2.56525C17.0834 3.46448 17.0834 4.91177 17.0834 7.80637V12.1923C17.0834 15.0869 17.0834 16.5342 16.2291 17.4334C15.3748 18.3327 13.9999 18.3327 11.25 18.3327H8.75002C6.00016 18.3327 4.62523 18.3327 3.77096 17.4334C2.91669 16.5342 2.91669 15.0869 2.91669 12.1923V7.80637Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.25 9.16602H14.1667"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M5.83331 10.0007C5.83331 10.0007 6.24998 10.0007 6.66665 10.834C6.66665 10.834 7.99018 8.75065 9.16665 8.33398"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.25 14.166H14.1667"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M6.66669 1.66602L6.73519 2.07702C6.90147 3.07472 6.98461 3.57357 7.3343 3.86979C7.68398 4.16602 8.1897 4.16602 9.20119 4.16602H10.7989C11.8104 4.16602 12.3161 4.16602 12.6658 3.86979C13.0154 3.57357 13.0986 3.07472 13.2649 2.07702L13.3334 1.66602"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.66669 14.166H7.50002"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
