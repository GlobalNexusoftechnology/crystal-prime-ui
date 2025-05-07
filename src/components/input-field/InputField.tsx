"use client";
import { useState, FC, ChangeEvent, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  name: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  onButtonChange?: () => void;
  labelStyle?: string;
  customClassName?: string;
}

/**
 * InputField component for rendering a labeled input with validation and styling.
 *
 * @param {InputFieldProps} props - Props for the input field.
 * @returns {JSX.Element} The rendered input field component.
 */
export const InputField: FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  error = "",
  required = false,
  icon,
  onIconClick,
  labelStyle,
  customClassName,
  onButtonChange,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className={`block text-[1rem] 2xl:text-[1.1vw] 2xl:mb-[0.7rem] text-gray-700 ${labelStyle} font-medium`}
        >
          {label} {required && <span className={"text-red-500"}>*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onClick={onIconClick}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full p-2 py-2 pr-10 border text-[1rem] 2xl:text-[1.1vw] rounded-md ${customClassName} mt-1 focus:outline-none  focus:ring-2 ${
            focused ? "focus:ring-[#3a9942]" : "focus:ring-[#F4DF83]"
          } ${error ? "border-[#7a7878]" : "border-[#7a7878]"}`} // change border color based on figma
          required={required}
          {...props}
        />
        {icon && (
          <span
            onClick={onButtonChange}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer"
          >
            {icon}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
