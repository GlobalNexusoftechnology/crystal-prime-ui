import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "primary-outline"
    | "secondary"
    | "secondary-outline"
    | "danger"
    | "danger-outline"
    | "blue"
    | "blue-outline"
    | "teal"
    | "teal-outline"
    | "white-outline"
    | "purple" // Added purple variant
    | "CustomBtn";
  // |"CustomBtn-outline";
  isLoading?: boolean;
  title?: string; // Button label text
  leftIcon?: ReactNode; // Left icon prop (optional)
  rightIcon?: ReactNode; // Right icon prop (optional)
  actionIcon?: ReactNode; // For additional actions
  widthClass?: string; // Tailwind class for width
  heightClass?: string; // Tailwind class for height
  isIconOnly?: boolean; // Flag for icon-only buttons
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  disabled,
  title,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  actionIcon: ActionIcon,
  widthClass = "w-auto", // Default width
  heightClass = "h-auto", // Default height
  isIconOnly = false,
  ...props
}) => {
  // Map variant to Tailwind CSS classes
  const variantClasses = {
    primary: "bg-backgroundlinear text-black",
    "primary-outline":
      "border border-black text-black hover:bg-black hover:text-white",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    "secondary-outline":
      "border border-gray-500 text-gray-500 hover:bg-gray-500 ",

    danger: "bg-red-500 text-white hover:bg-red-600",
    "danger-outline":
      "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
    blue: "bg-blue-500 text-white hover:bg-blue-600",
    "blue-outline": "border border-blue-500 text-blue-500 hover:bg-blue-500 ",
    teal: "bg-teal-500 text-white hover:bg-teal-600 ",
    "teal-outline": "border border-teal-500 text-teal-500 hover:bg-teal-500  ",
    "white-outline": "border border-white text-white hover:text-teal-500",
    purple: "bg-purple-500 text-white hover:bg-purple-600",
    CustomBtn: "bg-customButton text-white ",
  };

  return (
    <button
      className={`flex items-center justify-center rounded-md  ${widthClass} ${heightClass} ${
        isIconOnly ? "p-2" : "2xl:px-[1vw] 2xl:py-[1vw] px-4 py-2"
      } space-x-2 ${variantClasses[variant]} ${
        disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin border-2 border-current border-r-transparent rounded-full w-4 h-4 inline-block"></span>
      ) : (
        <>
          {LeftIcon && <span className="w-5 h-5 text-current">{LeftIcon}</span>}
          {!isIconOnly && title && (
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
