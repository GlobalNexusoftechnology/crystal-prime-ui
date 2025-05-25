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
    <div className="p-4 bg-white rounded-xl">
      {/* Navigation Buttons to switch between settings views */}
      <div className="flex space-x-2 pb-2 mb-4">
        <button
          className={`px-2 py-2 rounded font-semibold ${
            activePage === "settings"
              ? "border-b-4 border-[#65558F] text-lg"
              : "text-lg"
          }`}
        >
          Settings
        </button>

        <button
          className={`px-2 py-2 rounded ${
            activePage === "leadSources"
              ? "border-b-[0.2rem] border-[#65558F] text-[#65558F] text-sm"
              : "text-sm"
          }`}
          onClick={() => setActivePage("leadSources")}
        >
          Lead Sources
        </button>

        <button
          className={`px-2 py-2 rounded ${
            activePage === "leadStatus"
              ? "border-b-[0.2rem] border-[#65558F] text-[#65558F] text-sm"
              : "text-sm"
          }`}
          onClick={() => setActivePage("leadStatus")}
        >
          Lead Status
        </button>

        <button
          className={`px-2 py-2 rounded ${
            activePage === "role"
              ? "border-b-[0.2rem] border-[#65558F] text-[#65558F] text-sm"
              : "text-sm"
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
