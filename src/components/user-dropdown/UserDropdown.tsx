"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";

interface UserDropdownProps {
  name: string;
  image: StaticImageData;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ name, image }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 2xl:gap-[0.5vw] bg-customGray border 2xl:border-[0.1vw] border-gray-300 px-4 py-2 2xl:px-[1vw] 2xl:py-[0.25vw] rounded-xl 2xl:rounded-[0.75vw] shadow-sm hover:bg-gray-50 transition-all"
      >
        <Image
          src={image}
          alt={name}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <span className="font-medium text-black">{name}</span>
        <FiChevronDown
          className={`w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 2xl:mt-[0.5vw] w-48 2xl:w-[12vw] bg-white border border-gray-300 rounded-md 2xl:rounded-[0.375vw] z-50">
          <ul className="flex flex-col py-2 2xl:py-[0.5vw] text-sm text-gray-700">
            <Link
              href="/admin/profile"
              className="px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] hover:bg-gray-100 cursor-pointer"
            >
              Profile
            </Link>
             <Link
              href="/admin/change-password"
              className="px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] hover:bg-gray-100 cursor-pointer"
            >
              change password
            </Link>
            <Link
              href=""
              className="px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </Link>
           
          </ul>
        </div>
      )}
    </div>
  );
};
