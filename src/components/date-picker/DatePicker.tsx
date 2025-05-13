"use client";
import React, { useRef } from "react";

/**
 * Reusable Date Picker Component
 * @param {string} value - Selected date.
 * @param {(val: string) => void} onChange - Function to handle date change.
 * @param {string | null} [error] - Optional error message.
 */
export function DatePicker({
  placeholder,
  value,
  onChange,
  error,
  label,
  isRequired = false,
  datePickerBorderRadius = "rounded-xl 2xl:rounded-[0.75vw]",
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  datePickerBorderRadius?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      {label && (
        <label className="block 2xl:text-[1vw] text-gray-700 mb-2 2xl:mb-[0.5vw]">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      {/* Date Input */}
      <div className="relative">
        <input
          placeholder={placeholder}
          ref={inputRef}
          type="date"
          className={`w-full 2xl:text-[1vw] border ${
            error ? "border-red-500" : "border-gray-300"
          } ${datePickerBorderRadius} px-4 2xl:px-[1vw] py-3 2xl:py-[0.7vw] pr-10 2xl:pr-[2.5vw] focus:outline-none focus:ring-1 ${
            error ? "focus:ring-red-500" : "focus:ring-primary"
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {/* Custom Calendar Icon (Now Works on All Browsers) */}
        <div
          className="absolute inset-y-0 right-3 2xl:right-[0.75vw] flex items-center cursor-pointer"
          onClick={() =>
            inputRef.current?.showPicker?.() || inputRef.current?.focus()
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 012 0v1h4V2a1 1 0 112 0v1h1a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h1V2zm10 4H4v10a1 1 0 001 1h10a1 1 0 001-1V6zm-8 3a1 1 0 012 0v3a1 1 0 01-2 0V9zm4 0a1 1 0 012 0v3a1 1 0 01-2 0V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm 2xl:text-[0.9vw] mt-1 2xl:mt-[0.25vw]">
          {error}
        </p>
      )}
    </div>
  );
}
