"use client";
import React, { useState } from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string | null;
  icon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onIconClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  isRequired?: boolean;
  inputBorderRadius?: string;
  textAreaBorderRadius?: string;
}

export function InputField({
  label,
  error,
  icon,
  suffixIcon,
  onIconClick,
  isRequired = false,
  className,
  disabled,
  type = "text",
  inputBorderRadius = "rounded-xl 2xl:rounded-[0.75vw]",
  textAreaBorderRadius = "rounded-xl 2xl:rounded-[0.75vw]",
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isTextArea = type === "textarea";

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block 2xl:text-[1vw] text-gray-700 mb-2 2xl:mb-[0.5vw]">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={`flex items-${
          isTextArea ? "start" : "center"
        } border 2xl:border-[0.1vw] ${
          error
            ? "border-red-500"
            : isFocused
            ? "border-primary ring-1 ring-primary"
            : "border-gray-300"
        } ${
          isTextArea ? textAreaBorderRadius : inputBorderRadius
        } px-4 2xl:px-[1vw] py-3 2xl:py-[0.7vw] bg-white transition focus-within:ring-1 focus-within:ring-primary ${className}`}
      >
        {/* Left Icon */}
        {icon && <span className="mr-3 text-gray-500">{icon}</span>}

        {/* Input or Textarea */}
        {isTextArea ? (
          <textarea
            className="w-full bg-transparent outline-none resize-none 2xl:text-[1vw] text-gray-700 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            required={isRequired}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            className="w-full bg-transparent outline-none 2xl:text-[1vw] text-gray-700 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            required={isRequired}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {/* Right Icon (e.g., Eye for Password) */}
        {suffixIcon && (
          <span
            className="text-gray-500 cursor-pointer"
            onClick={(e) => {
              if (onIconClick) onIconClick(e);
            }}
          >
            {suffixIcon}
          </span>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm 2xl:text-[0.9vw] 2xl:mt-[0.25vw] mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
