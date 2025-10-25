"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { createPortal } from "react-dom";

interface ActionOption {
  label: string;
  onClick: () => void;
  className?: string;
}

interface ActionDropdownProps {
  options: ActionOption[];
  icon?: ReactNode;
  direction?: "left" | "right" | "bottom";
  className?: string;
}

export function ActionDropdown({
  options,
  icon,
  direction = "right",
  className = "w-fit min-w-[8rem] ",
}: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    // Check if click is outside both the button and the menu
    const isOutsideButton =
      buttonRef.current && !buttonRef.current.contains(target);
    const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);
    const isOutsideDropdown =
      dropdownRef.current && !dropdownRef.current.contains(target);

    if (isOutsideButton && isOutsideMenu && isOutsideDropdown) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Calculate and set menu position when opening
  useEffect(() => {
    function updateMenuPosition() {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        let top: number;
        let left: number;

        switch (direction) {
          case "right":
            top = rect.top + window.scrollY;
            left = rect.right + window.scrollX + rect.width * 1;
            break;
          case "left":
            top = rect.top + window.scrollY;
            left = rect.left + window.scrollX - 128 - rect.width * 1;
            break;
          case "bottom":
            top = rect.bottom + window.scrollY;
            left = rect.left + window.scrollX + rect.width * 1;
            break;
          default:
            top = rect.top + window.scrollY;
            left = rect.right + window.scrollX + rect.width * 1;
        }

        setMenuStyles({
          position: "absolute",
          top,
          left,
          zIndex: 9999,
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "4px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
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
  }, [isOpen, direction]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleActionClick = (action: ActionOption) => {
    try {
      action.onClick();
    } catch (error) {
      console.error("Action click error:", error);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        ref={buttonRef}
        onClick={toggleDropdown}
        className="p-1  rounded hover:bg-gray-200"
      >
        {icon || (
          <FiMoreVertical className="w-5  h-5 " />
        )}
      </button>

      {/* Portal-based menu rendering */}
      {isOpen &&
        menuStyles.top !== undefined &&
        menuStyles.left !== undefined &&
        typeof window !== "undefined" &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              ...menuStyles,
              minWidth: "8rem",
              padding: "0.5rem 0",
            }}
          >
            {options.length > 0 &&
              options.map((action, actionIndex) => (
                <button
                  type="button"
                  key={actionIndex}
                  className={`block w-full px-4 text-[0.9rem]    py-2  text-left hover:bg-gray-100 ${
                    action.className || ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleActionClick(action);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  {action.label}
                </button>
              ))}
          </div>,
          document.body
        )}

      {/* Fallback: render inline if menuStyles not set */}
      {isOpen &&
        (menuStyles.top === undefined || menuStyles.left === undefined) && (
          <div
            ref={menuRef}
            className={`absolute ${
              direction === "right"
                ? "left-full bottom-0"
                : direction === "bottom"
                ? "right-full top-[50%]"
                : "right-full bottom-0"
            } mt-2 bg-white shadow-lg z-50 rounded  border  ${className}`}
          >
            {options.length > 0 &&
              options.map((action, actionIndex) => (
                <button
                  type="button"
                  key={actionIndex}
                  className={`block w-full px-4 text-[0.9rem]    py-2  text-left hover:bg-gray-100 ${
                    action.className || ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleActionClick(action);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  {action.label}
                </button>
              ))}
          </div>
        )}
    </div>
  );
}
