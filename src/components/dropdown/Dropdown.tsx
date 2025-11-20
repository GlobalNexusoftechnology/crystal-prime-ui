"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "../button";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange?: (val: string) => void;
  error?: string;
  label?: string;
  isRequired?: boolean;
  dropdownBorderRadius?: string;
  dropdownWidth?: string;
  isShowButton?: boolean;
  buttonTitle?: string;
  handleCickButton?: () => void;
  disabled?: boolean;
}

export function Dropdown({
  options,
  value,
  onChange,
  error,
  label,
  isRequired = false,
  dropdownBorderRadius = "rounded-md",
  dropdownWidth = "w-full",
  isShowButton = false,
  buttonTitle,
  handleCickButton,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});
  const [search, setSearch] = useState("");

  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const selectedOption = options.find((opt) => opt.value === value);

  /** Close dropdown when clicked outside */
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (dropdownRef.current?.contains(target)) return;
    if (menuRef.current?.contains(target)) return;

    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** Position dropdown menu */
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
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setHighlightIndex(0);
  };

  const handleSelect = (val: string) => {
    onChange?.(val);
    setIsOpen(false);
    setSearch("");
  };

  /** ⭐ Filter options using search */
  const filteredOptions = search
    ? options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    )
    : options;

  /** ⭐ Keyboard Navigation */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown") {
        setIsOpen(true);
        setHighlightIndex(0);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && filteredOptions[highlightIndex]) {
        handleSelect(filteredOptions[highlightIndex].value);
      }
    }

    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`${dropdownWidth} relative`}
      ref={dropdownRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label className="block text-gray-700 mb-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Selected Field */}
      <div
        className={`border px-4 py-2 flex items-center justify-between gap-4 cursor-pointer ${dropdownBorderRadius}
          ${error ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 text-gray-400 cursor-default" : "bg-white"}`}
        onClick={toggleDropdown}
      >
        <span className={!selectedOption ? "text-gray-400" : ""}>
          {selectedOption ? selectedOption.label : "Select an option"}
        </span>

        {!disabled && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? "rotate-180" : ""
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>

      {/* Dropdown Menu (Portal) */}
      {isOpen &&
        menuStyles.top !== undefined &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              ...menuStyles,
              maxHeight: 200,
              overflowY: "auto",
              background: "#fff",
            }}
          >
            {isShowButton && (
              <div className="px-2 pt-2">
                <Button
                  title={buttonTitle}
                  variant="primary"
                  onClick={() => {
                    handleCickButton?.();
                    setIsOpen(false);
                  }}
                />
              </div>
            )}

            {/* Search Box */}
            <div className="p-2 border-b">
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightIndex(0);
                }}
                placeholder="Search..."
                className="w-full px-2 py-1 border rounded"
              />
            </div>

            {/* Options */}
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-gray-400">No options</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  ref={(el) => {
                    if (index === highlightIndex && el) {
                      el.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      });
                    }
                  }}
                  className={`px-4 py-2 cursor-pointer ${index === highlightIndex
                      ? "bg-indigo-100"
                      : value === option.value
                        ? "bg-gray-100 font-bold"
                        : ""
                    }`}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onMouseDown={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>,
          document.body
        )}

      {/* Error */}
      {error && <p className="text-red-500 text-[0.9rem] mt-1">{error}</p>}
    </div>
  );
}
