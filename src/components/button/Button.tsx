import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "primary-outline" | "secondary" | "secondary-outline";
  isLoading?: boolean;
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  actionIcon?: ReactNode;
  width?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  disabled,
  title,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  actionIcon: ActionIcon,
  width = "w-auto",
  ...props
}) => {
  const variantClasses = {
    primary: "bg-primary font-semibold text-white",
    "primary-outline":
      "border border-primary text-primary hover:bg-primary hover:text-white",
    secondary: "bg-secondary text-white hover:bg-secondary",
    "secondary-outline":
      "border border-secondary text-secondary hover:text-white hover:bg-secondary",
  };
  return (
    <button
      className={`flex items-center justify-center rounded-md ${width} h-auto 2xl:px-[1vw] 2xl:py-[1vw] px-4 py-2 space-x-2 font-medium ${
        variantClasses[variant]
      } ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin border-2 border-current border-r-transparent rounded-full w-4 h-4 inline-block"></span>
      ) : (
        <>
          {LeftIcon && <span className="w-5 h-5 text-current">{LeftIcon}</span>}
          {title && (
            <span className="text-sm 2xl:text-[1vw] text-nowrap">{title}</span>
          )}
          {RightIcon && (
            <span className="w-5 h-5 text-current">{RightIcon}</span>
          )}
          {ActionIcon && ActionIcon}
        </>
      )}
    </button>
  );
};
