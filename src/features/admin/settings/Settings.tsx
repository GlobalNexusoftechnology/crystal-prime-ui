"use client";

import { useState } from "react";
import { LeadSources, LeadTypes } from "./components";
import { LeadStatus } from "./components";
import { RoleManagement } from "./components";
import { usePermission } from "@/utils/hooks";
import { EAction, EModule } from "@/constants";

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
  const [activePage, setActivePage] = useState<null|string>(null);
  const { hasPermission } = usePermission();
  const cavViewSources = hasPermission(EModule.LEAD_SOURCES, EAction.VIEW);
  const cavViewStatuses = hasPermission(EModule.LEAD_STATUSES, EAction.VIEW);
  const cavViewRoles = hasPermission(EModule.ROLES, EAction.VIEW);
  const cavViewTypes = hasPermission(EModule.LEAD_TYPES, EAction.VIEW);

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

        {cavViewTypes ? (
          <button
            className={`p-2 2xl:p-[0.5vw] rounded 2xl:rounded-[0.25vw]  ${
              activePage === "leadTypes"
                ? "border-b-[0.2rem] border-[#65558F] text-[#65558F] text-sm 2xl:text-[0.875vw]"
                : "text-sm 2xl:text-[0.875vw]"
            }`}
            onClick={() => setActivePage("leadTypes")}
          >
            Lead Types
          </button>
        ) :  null}
        {cavViewSources ? (
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
        ) :  null}

        {cavViewStatuses ? (
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
        ) :  null}

        {cavViewRoles ? (
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
        ) :  null}

      </div>

      {/* Conditional Rendering of Selected Tab Content */}
      {activePage === "leadSources" && <LeadSources />}
      {activePage === "leadStatus" && <LeadStatus />}
      {activePage === "leadTypes" && <LeadTypes />}
      {activePage === "role" && <RoleManagement/>} 
    </div>
  );
}
