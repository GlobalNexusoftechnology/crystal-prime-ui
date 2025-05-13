import { TIconProps } from "@/constants";

export function UserIcon({
  className="w-full h-full",
  color = "#ffff"
}: TIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 16 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.98475 13.3457C4.11713 13.3457 0.81427 13.9305 0.81427 16.2724C0.81427 18.6143 4.09617 19.22 7.98475 19.22C11.8524 19.22 15.1543 18.6343 15.1543 16.2933C15.1543 13.9524 11.8733 13.3457 7.98475 13.3457Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.98477 10.0059C10.5229 10.0059 12.58 7.94779 12.58 5.40969C12.58 2.8716 10.5229 0.814453 7.98477 0.814453C5.44667 0.814453 3.38858 2.8716 3.38858 5.40969C3.38001 7.93922 5.42382 9.99731 7.95239 10.0059H7.98477Z"
        stroke={color}
        strokeWidth={1.42857}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}