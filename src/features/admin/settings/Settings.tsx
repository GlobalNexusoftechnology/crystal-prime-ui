"use client";

import { useState, useMemo } from "react";
import {
  LeadSources,
  LeadTypes,
  ProjectTemplateList,
  EILogTypes,
  EILogHeads,
} from "./components";
import { LeadStatus } from "./components";
import { RoleManagement } from "./components";
import { usePermission } from "@/utils/hooks";
import { EAction, EModule } from "@/constants";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const { hasPermission } = usePermission();
  const cavViewSources = hasPermission(EModule.LEAD_SOURCES, EAction.VIEW);
  const cavViewStatuses = hasPermission(EModule.LEAD_STATUSES, EAction.VIEW);
  const cavViewRoles = hasPermission(EModule.ROLES, EAction.VIEW);
  const cavViewTypes = hasPermission(EModule.LEAD_TYPES, EAction.VIEW);
  const cavViewProjectTemplate = hasPermission(
    EModule.PROJECT_TEMPLATE,
    EAction.VIEW
  );
  const cavViewEILogTypes = hasPermission(EModule.EI_LOG_TYPES, EAction.VIEW);
  const cavViewEILogHeads = hasPermission(EModule.EI_LOG_HEADS, EAction.VIEW);

  // Dynamically build the tabs array based on permissions
  const tabs = useMemo(() => {
    const arr = [];
    if (cavViewTypes) arr.push({ key: "leadTypes", label: "Lead Types" });
    if (cavViewEILogTypes)
      arr.push({ key: "eiLogTypes", label: "EI Log Types" });
    if (cavViewEILogHeads)
      arr.push({ key: "eiLogHeads", label: "EI Log Heads" });
    if (cavViewSources) arr.push({ key: "leadSources", label: "Lead Sources" });
    if (cavViewStatuses) arr.push({ key: "leadStatus", label: "Lead Status" });
    if (cavViewRoles) arr.push({ key: "role", label: "Role" });
    if (cavViewProjectTemplate)
      arr.push({ key: "projectTemplate", label: "Project Template" });
    return arr;
  }, [
    cavViewTypes,
    cavViewSources,
    cavViewStatuses,
    cavViewRoles,
    cavViewProjectTemplate,
    cavViewEILogTypes,
    cavViewEILogHeads,
  ]);

  // Read tab from query param
  const tabParam = searchParams.get("tab");
  const validTab = tabs.find((tab) => tab.key === tabParam);
  const [activePage, setActivePage] = useState(
    () => validTab?.key || tabs[0]?.key
  );

  return (
    <div className="p-4 2xl:p-[1vw] bg-white rounded-xl 2xl:rounded-[0.75vw]">
      {/* Navigation Buttons to switch between settings views */}
      <div className="flex flex-row gap-4 2xl:gap-[1vw] mb-4 2xl:mb-[1vw]">
        <button
          className={`p-2 2xl:p-[0.5vw] rounded 2xl:rounded-[0.25vw] font-semibold ${
            activePage === "settings"
              ? "border-b-4 border-[#65558F] text-lg 2xl:text-[1.125vw]"
              : "text-lg 2xl:text-[1.125vw]"
          }`}
        >
          Settings
        </button>
        <div className="flex gap-4 2xl:gap-[1vw] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`p-2 2xl:p-[0.5vw] w-fit whitespace-nowrap rounded 2xl:rounded-[0.25vw] font-medium ${
                activePage === tab.key
                  ? "border-b-4 border-[#65558F] text-[1rem] 2xl:text-[1vw]"
                  : "text-[0.9rem] 2xl:text-[0.875vw]"
              }`}
              onClick={() => setActivePage(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Rendering of Selected Tab Content */}
      {activePage === "leadSources" && <LeadSources />}
      {activePage === "leadStatus" && <LeadStatus />}
      {activePage === "leadTypes" && <LeadTypes />}
      {activePage === "role" && <RoleManagement />}
      {activePage === "projectTemplate" && <ProjectTemplateList />}
      {activePage === "eiLogTypes" && <EILogTypes />}
      {activePage === "eiLogHeads" && <EILogHeads />}
    </div>
  );
}
