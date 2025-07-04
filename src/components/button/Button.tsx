import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "primary-outline"
    | "primary-outline-blue"
    | "secondary"
    | "secondary-outline"
    | "background-white";
  isLoading?: boolean;
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  actionIcon?: ReactNode;
  width?: string;
  hover?: boolean;
  tooltip?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  disabled,
  title,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  actionIcon: ActionIcon,
  tooltip,
  width = "w-full",
  hover,
  ...props
}) => {
  const variantClasses = {
    primary: "bg-primary font-semibold text-white",
    "primary-outline":
      "border 2xl:border-[0.1vw] border-primary text-primary hover:bg-primary hover:text-white",
    secondary: "bg-secondary text-white hover:bg-secondary",
    "secondary-outline":
      "border 2xl:border-[0.1vw] border-secondary text-secondary hover:text-white hover:bg-secondary",
    "background-white": `border 2xl:border-[0.1vw] bg-white border-gray-300 ${hover ? "hover:border-primary hover:text-primary" : ""}  duration-300`,
    "primary-outline-blue":
      "border 2xl:border-[0.1vw] border-primary text-primary hover:scale-95 duration-300",
  };
  return (
    <div className={`${width} relative group inline-block`}>
      <button
        className={`flex items-center justify-center rounded-xl w-full 2xl:rounded-[0.75vw] h-auto 2xl:px-[1vw] 2xl:py-[0.65vw] px-4 py-2 space-x-2 2xl:space-x-[0.5vw] font-medium ${
          variantClasses[variant]
        } ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin border-2 border-current border-r-transparent rounded-full w-4 h-4 inline-block"></span>
        ) : (
          <>
            {LeftIcon && (
              <span className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.125vw] text-current">
                {LeftIcon}
              </span>
            )}
            {title && (
              <span className="text-sm 2xl:text-[1vw] text-nowrap">
                {title}
              </span>
            )}
            {RightIcon && (
              <span className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.125vw] text-current">
                {RightIcon}
              </span>
            )}
            {ActionIcon && ActionIcon}
          </>
        )}
      </button>
      {tooltip && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 2xl:mb-[0.5vw] opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs 2xl:text-[0.75vw] rounded 2xl:rounded-[0.25vw] py-1 2xl:py-[0.25vw] px-2 2xl:px-[0.5vw] whitespace-nowrap z-10">
          {tooltip}
        </span>
      )}
    </div>
  );
};
