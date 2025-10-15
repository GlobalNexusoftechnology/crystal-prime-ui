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
  onAnnouncementClick?: () => void; // pass handler from parent
}

export const UserDropdown: React.FC<UserDropdownProps> = ({
  name,
  onAnnouncementClick,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { removeSession, activeSession } = useAuthStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userRole = activeSession?.user?.role.role;
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

  const handleLogout = () => {
    removeSession();
    router.push("/login");
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-customGray border px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-all"
      >
        <span className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-primary">
          {getInitials(name)}
        </span>
        <span className="font-medium text-black capitalize">{name}</span>
        <FiChevronDown
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md z-50">
          <ul className="flex flex-col py-2 text-gray-700">
            <Link
              onClick={() => setOpen(false)}
              href="/admin/profile"
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Profile
            </Link>
            {userRole?.toLowerCase() === "admin" ? (
              <div
                onClick={() => {
                  setOpen(false);
                  onAnnouncementClick?.(); // trigger parent handler
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Announcement
              </div>
            ) : null}

            <Link
              onClick={() => setOpen(false)}
              href="/admin/change-password"
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Change Password
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-left w-full"
            >
              <CgLogOut className="w-4 h-4" />
              Logout
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};
