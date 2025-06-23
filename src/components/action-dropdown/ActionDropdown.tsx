"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { FiMoreVertical } from "react-icons/fi";

interface ActionOption {
  label: string;
  onClick: () => void;
  className?: string;
}

interface ActionDropdownProps {
  options: ActionOption[];
  icon?: ReactNode;
  direction?: 'left' | 'right' | 'bottom'
}

export function ActionDropdown({ options, icon, direction = "right" }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="p-1 2xl:p-[0.25vw] rounded hover:bg-gray-200"
      >
        {icon || <FiMoreVertical className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw]" />}
      </button>

      {isOpen && (
        <div
          className={`absolute ${direction === "right" ? "left-full bottom-0" : direction === "bottom" ? "right-full top-[50%]" : "right-full bottom-0"} mt-2 bg-white shadow-lg z-50 rounded 2xl:rounded-[0.25vw] border 2xl:border-[0.1vw] w-fit min-w-[8rem] 2xl:min-w-[8vw]`}
        >
          {options.map((action, actionIndex) => (
            <button
              key={actionIndex}
              className={`block w-full px-4 text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left hover:bg-gray-100 ${action.className || ""
                }`}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
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