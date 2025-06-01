"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (val: string) => void;
  error?: string;
  label?: string;
  isRequired?: boolean;
  dropdownBorderRadius?: string;
  dropdownWidth?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  error,
  label,
  isRequired = false,
  dropdownBorderRadius = "rounded-md 2xl:rounded-[0.375vw]",
  dropdownWidth = "w-full"
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`${dropdownWidth} relative`} ref={dropdownRef}>
      {label && (
        <label className="block 2xl:text-[1vw] text-gray-700 mb-2 2xl:mb-[0.5vw]">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`border 2xl:border-[0.1vw] ${error ? "border-red-500" : "border-gray-300"} ${dropdownBorderRadius} 2xl:text-[1vw] px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] flex items-center gap-6 2xl:gap-[1.5vw] justify-between cursor-pointer bg-white`}
        onClick={toggleDropdown}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        <span className={`${!selectedOption ? "text-gray-400" : ""}`}>
          {selectedOption ? selectedOption.label : "Select an option"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw] text-gray-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute z-10 mt-1 2xl:mt-[0.25vw] w-full bg-white border 2xl:border-[0.1vw] ${error ? "border-red-500" : "border-gray-300"} ${dropdownBorderRadius} shadow-lg max-h-60 overflow-auto`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] 2xl:text-[0.9vw] cursor-pointer hover:bg-gray-100 ${
                  value === option.value ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-red-500 text-sm 2xl:text-[0.9vw] mt-1 2xl:mt-[0.25vw]">
          {error}
        </p>
      )}
    </div>
  );
}
