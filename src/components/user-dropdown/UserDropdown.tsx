"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/services";
import { getInitials } from "@/utils";

interface UserDropdownProps {
  name: string;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ name }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { removeSession } = useAuthStore();

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

  // Logout function
  const handleLogout = () => {
    removeSession();
    router.push("/login"); // Redirect to login page
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 2xl:gap-[0.5vw] bg-customGray border 2xl:border-[0.1vw] border-gray-300 px-4 py-2 2xl:px-[1vw] 2xl:py-[0.25vw] rounded-xl 2xl:rounded-[0.75vw] shadow-sm hover:bg-gray-50 transition-all"
      >
        <span className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 h-10 2xl:w-[2.5vw] 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] rounded-full bg-primary">
          {getInitials(name)}
        </span>
        <span className="font-medium 2xl:text-[1vw] text-black">{name}</span>
        <FiChevronDown
          className={`w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 2xl:mt-[0.5vw] w-48 2xl:w-[12vw] bg-white border border-gray-300 rounded-md 2xl:rounded-[0.375vw] z-50">
          <ul className="flex flex-col py-2 2xl:py-[0.5vw] text-[0.9rem] text-gray-700">
            <Link
              onClick={() => setOpen(false)}
              href="/admin/profile"
              className="px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] 2xl:text-[1vw] hover:bg-gray-100 cursor-pointer"
            >
              Profile
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/admin/change-password"
              className="px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] 2xl:text-[1vw] hover:bg-gray-100 cursor-pointer"
            >
              Change Password
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 2xl:gap-[0.5vw] px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] 2xl:text-[1vw] hover:bg-gray-100 cursor-pointer text-left w-full"
            >
              <CgLogOut className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
              Logout
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};
