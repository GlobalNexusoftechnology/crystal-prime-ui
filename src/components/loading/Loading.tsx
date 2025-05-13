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
    small: "w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] border-2 2xl:border-[0.2vw]",
    medium: "w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] border-4 2xl:border-[0.3vw]",
    large: "w-16 2xl:w-[4vw] h-16 2xl:h-[4vw] border-4 2xl:border-[0.8vw]",
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`animate-spin rounded-full border-t-primary border-r-transparent border-b-transparent border-l-primary ${sizeClasses[size]} ${className}`}
      />
    </div>
  );
};
