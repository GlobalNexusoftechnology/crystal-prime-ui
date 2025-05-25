"use client";

import { useState } from "react";
import { LeadSources } from "./components";
import { LeadStatus } from "./components";
import { RoleManagement } from "./components";

/**
 * `Settings` is the main component for managing the settings page.
 * 
 * It allows the user to toggle between different settings sections:
 * - General settings
 * - Lead sources
 * - Lead status
 * - Roles (currently a placeholder)
 */
export function Settings() {
  // Tracks the currently active tab/page
  const [activePage, setActivePage] = useState("leadSources");

  return (
    <div className="p-4 2xl:p-[1vw] bg-white rounded-xl 2xl:rounded-[0.75vw]">
      {/* Navigation Buttons to switch between settings views */}
      <div className="flex space-x-2 mb-4 2xl:mb-[1vw]">
        <button
          className={`p-2 2xl:p-[0.5vw] rounded 2xl:rounded-[0.25vw] font-semibold ${
            activePage === "settings"
              ? "border-b-4 border-[#65558F] text-lg 2xl:text-[1.125vw]"
              : "text-lg 2xl:text-[1.125vw]"
          }`}
        >
          Settings
        </button>

        <button
          className={`p-2 2xl:p-[0.5vw] rounded 2xl:rounded-[0.25vw]  ${
            activePage === "leadSources"
              ? "border-b-[0.2rem] border-[#65558F] text-[#65558F] text-sm 2xl:text-[0.875vw]"
              : "text-sm 2xl:text-[0.875vw]"
          }`}
          onClick={() => setActivePage("leadSources")}
        >
          Lead Sources
        </button>

        <button
          className={`p-2 2xl:p-[0.5vw] rounded 2xl:rounded-[0.25vw] ${
            activePage === "leadStatus"
              ? "border-b-[0.2rem] border-[#65558F] text-[#65558F] text-sm 2xl:text-[0.875vw]"
              : "text-sm 2xl:text-[0.875vw]"
          }`}
          onClick={() => setActivePage("leadStatus")}
        >
          Lead Status
        </button>

        <button
          className={`p-2 2xl:p-[0.5vw] rounded 2xl:rounded-[0.25vw] ${
            activePage === "role"
              ? "border-b-[0.2rem] border-[#65558F] text-[#65558F] text-sm 2xl:text-[0.875vw]"
              : "text-sm 2xl:text-[0.875vw]"
          }`}
          onClick={() => setActivePage("role")}
        >
          Role
        </button>
      </div>

      {/* Conditional Rendering of Selected Tab Content */}
      {activePage === "leadSources" && <LeadSources />}
      {activePage === "leadStatus" && <LeadStatus />}
      {activePage === "role" && <RoleManagement/>} 
    </div>
  );
}
