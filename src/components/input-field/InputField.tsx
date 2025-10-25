"use client";
import React, { useState } from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: string | any;
  icon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onIconClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  isRequired?: boolean;
  inputBorderRadius?: string;
  textAreaBorderRadius?: string;
  textAreaHeight?: string;
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
  inputBorderRadius = "rounded-md ",
  textAreaBorderRadius = "rounded-md ",
  textAreaHeight ="min-h-[8rem]",
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isTextArea = type === "textarea";

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true)
    // Call parent's onFocus if provided
    if (props.onFocus) {
      props.onFocus(e)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false)
    // Call parent's onBlur if provided
    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block  text-gray-700 mb-2 ">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={`flex items-${
          isTextArea ? "start" : "center"
        } border  ${
          error
            ? "border-red-500"
            : isFocused
            ? "border-primary ring-1 ring-primary"
            : "border-gray-300"
        } ${
          isTextArea ? textAreaBorderRadius : inputBorderRadius
        } px-4  py-2  bg-white transition ${className}`}
      >
        {/* Left Icon */}
        {icon && <span className="mr-3 text-gray-500">{icon}</span>}

        {/* Input or Textarea */}
        {isTextArea ? (
          <textarea
            className={`w-full bg-transparent outline-none resize-none  text-gray-700 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed ${textAreaHeight}`}
            disabled={disabled}
            required={isRequired}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        ) : (
          <input
            type={type}
            className="w-full bg-transparent outline-none  text-gray-700 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            required={isRequired}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}

        {suffixIcon && (
          <span
            className="text-gray-500 cursor-pointer flex-shrink-0"
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
        <p className="text-red-500 text-[0.9rem]   mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
