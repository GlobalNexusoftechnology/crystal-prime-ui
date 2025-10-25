import React from "react";

type TLoadingProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

/**
 * Loading component with customizable size and styles.
 *
 * @param {TLoadingProps} props - The component props.
 * @returns {JSX.Element} The rendered Loading component.
 */
export const Loading: React.FC<TLoadingProps> = ({
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-6  h-6  border-2 ",
    medium: "w-10  h-10  border-4",
    large: "w-16  h-16  border-4 ",
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`animate-spin rounded-full border-t-primary border-r-transparent border-b-transparent border-l-primary ${sizeClasses[size]} ${className}`}
      />
    </div>
  );
};
