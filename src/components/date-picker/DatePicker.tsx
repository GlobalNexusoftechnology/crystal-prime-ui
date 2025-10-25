"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";

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
  datePickerBorderRadius = "rounded-md ",
  name="date",
  datePickerWidth="w-full",
  minDate,
  maxDate
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string | null | boolean;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  datePickerBorderRadius?: string;
  name?: string;
  datePickerWidth?:string;
  minDate?: string;
  maxDate?: string;

}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState(value);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update internal value when external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Debounced onChange handler
  const debouncedOnChange = useCallback((newValue: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (newValue !== value) {
        onChange(newValue);
      }
    }, 500); // 500ms delay
  }, [onChange, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    
    // If picker is not open, use debounced onChange
    if (!isPickerOpen) {
      debouncedOnChange(newValue);
    }
  };

  const handleInputFocus = () => {
    setIsPickerOpen(true);
  };

  const handleInputBlur = () => {
    setIsPickerOpen(false);
    
    // Ensure the final value is applied
    if (internalValue !== value) {
      onChange(internalValue);
    }
    
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent immediate onChange when using arrow keys in the picker
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.stopPropagation();
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`${datePickerWidth}`}>
      {label && (
        <label className="block  text-gray-700 mb-2 ">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      {/* Date Input */}
      <div className="relative">
        <input
          placeholder={placeholder}
          ref={inputRef}
          type="date"
          className={`w-full  border  ${
            error ? "border-red-500" : "border-gray-300"
          } ${datePickerBorderRadius} px-4  py-2  pr-10 focus:outline-none focus:ring-1 ${
            error ? "focus:ring-red-500" : "focus:ring-primary"
          }`}
          value={internalValue}
          name={name}
          min={minDate}
          max={maxDate}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
        {/* Custom Calendar Icon */}
        <div
          className="absolute inset-y-0 right-3  flex items-center cursor-pointer"
          onClick={() =>
            inputRef.current?.showPicker?.() || inputRef.current?.focus()
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6  h-6  text-gray-500"
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
        <p className="text-red-500 text-[0.9rem]  mt-1 ">
          {error}
        </p>
      )}
    </div>
  );
}
