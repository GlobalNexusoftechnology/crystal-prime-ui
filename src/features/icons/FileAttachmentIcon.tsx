import { TIconProps } from "@/constants";

// HorizontalTreeDotIcon component renders a hamburger menu icon as an SVG.
export function FileAttachmentIcon({
  className = "w-full h-full",
  color = "#555561",
}: TIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 12.0009V14.5451C4.5 17.7901 4.5 19.4126 5.38607 20.5116C5.56508 20.7336 5.76731 20.9359 5.98933 21.1149C7.08831 22.0009 8.71082 22.0009 11.9558 22.0009C12.6614 22.0009 13.0141 22.0009 13.3372 21.8869C13.4044 21.8632 13.4702 21.8359 13.5345 21.8052C13.8436 21.6574 14.093 21.4079 14.5919 20.909L19.3284 16.1725C19.9065 15.5944 20.1955 15.3054 20.3478 14.9379C20.5 14.5703 20.5 14.1616 20.5 13.3441V10.0009C20.5 6.22968 20.5 4.34407 19.3284 3.17249C18.2693 2.11333 16.6265 2.01171 13.5345 2.00195M13.5 21.5009V21.0009C13.5 18.1725 13.5 16.7583 14.3787 15.8796C15.2574 15.0009 16.6716 15.0009 19.5 15.0009H20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 8.23077V5.46154C4.5 3.54978 6.067 2 8 2C9.933 2 11.5 3.54978 11.5 5.46154V9.26923C11.5 10.2251 10.7165 11 9.75 11C8.7835 11 8 10.2251 8 9.26923V5.46154"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
