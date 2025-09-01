"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

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
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});
  const [search, setSearch] = useState("");

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

  // Calculate and set menu position when opening
  useEffect(() => {
    function updateMenuPosition() {
      if (isOpen && dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        setMenuStyles({
          position: "absolute",
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          zIndex: 9999,
          background: "white",
          border: "1px solid #ccc",
        });
      }
    }
    if (isOpen) {
      setTimeout(updateMenuPosition, 0);
      window.addEventListener("resize", updateMenuPosition);
      window.addEventListener("scroll", updateMenuPosition, true);
    }
    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearch("");
  };

  // Filter options by search
  const filteredOptions = search
    ? options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  return (
    <div className={`${dropdownWidth} relative`} ref={dropdownRef}>
      {label && (
        <label className="block 2xl:text-[1vw] text-gray-700 mb-2 2xl:mb-[0.5vw]">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`border 2xl:border-[0.05vw] focus:outline-none focus:ring-1 ${
          error ? "focus:ring-red-500" : "focus:ring-primary"
        } ${error ? "border-red-500" : "border-gray-300"} ${dropdownBorderRadius} 2xl:text-[1vw] px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] flex items-center gap-6 2xl:gap-[1.5vw] justify-between cursor-pointer bg-white`}
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

      {/* Debug: Render portal menu as plain div, no animation */}
      {isOpen && menuStyles.top !== undefined && menuStyles.left !== undefined &&
        typeof window !== "undefined" && typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              ...menuStyles,
              background: "#fff",
              border: "1px solid #F8F8F8",
              color: "#000",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              borderRadius: "8px",
              padding: 0,
              maxHeight: 240,
              overflow: "auto",
            }}
          >
            <div className="p-2 border-b">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1 border rounded"
                autoFocus
              />
            </div>
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-gray-400">No options</div>
            ) : (
              filteredOptions.length > 0 && filteredOptions.map((option) => (
                <div
                  key={option.value}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    background: value === option.value ? "#F8F8F8" : undefined,
                    fontWeight: value === option.value ? "bold" : undefined,
                  }}
                  onMouseDown={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>,
          document.body
        )}
      {/* Fallback: render inline if menuStyles not set */}
      {isOpen && (menuStyles.top === undefined || menuStyles.left === undefined) && (
        <div
          className={`absolute z-10 mt-1 2xl:mt-[0.25vw] w-full bg-yellow-100 border border-yellow-500 ${dropdownBorderRadius} shadow-lg max-h-60 overflow-auto`}
        >
          <div className="p-2 border-b">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-2 py-1 border rounded"
              autoFocus
            />
          </div>
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-2 text-gray-400">No options</div>
          ) : (
            filteredOptions.length > 0 && filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] 2xl:text-[0.9vw] cursor-pointer hover:bg-gray-100 ${
                  value === option.value ? "bg-gray-100 font-semibold" : ""
                }`}
                onMouseDown={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-[0.9rem] 2xl:text-[0.9vw] mt-1 2xl:mt-[0.5vw]">
          {error}
        </p>
      )}
    </div>
  );
}
