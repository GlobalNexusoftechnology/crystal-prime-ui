"use client";

import { EAction, EModule } from "@/constants";
import { usePermission } from "@/utils/hooks";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  EILogHeads,
  EILogTypes,
  LeadSources,
  LeadStatus,
  LeadTypes,
  ProjectTemplateList,
  RoleManagement,
} from "./components";
import { MaterialBrand, MaterialType } from "@/components";

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
    EAction.VIEW,
  );
  const cavViewMaterialType = hasPermission(
    EModule.MATERIAL_TYPE,
    EAction.VIEW,
  );
  const cavViewMaterialBrand = hasPermission(
    EModule.MATERIAL_BRAND,
    EAction.VIEW,
  );

  // Dynamically build the tabs array based on permissions
  const tabs = useMemo(() => {
    const arr = [];
    if (cavViewTypes) arr.push({ key: "leadTypes", label: "Lead Types" });

    if (cavViewSources) arr.push({ key: "leadSources", label: "Lead Sources" });
    if (cavViewStatuses) arr.push({ key: "leadStatus", label: "Lead Status" });
    if (cavViewRoles) arr.push({ key: "role", label: "Role" });

    if (cavViewMaterialType)
      arr.push({ key: "materialType", label: "Product Type" });
    if (cavViewMaterialBrand)
      arr.push({ key: "materialBrand", label: "Product Brand" });
    if (cavViewProjectTemplate)
      arr.push({ key: "projectTemplate", label: "Project Template" });
    return arr;
  }, [
    cavViewTypes,
    cavViewSources,
    cavViewStatuses,
    cavViewRoles,
    cavViewMaterialType,
    cavViewMaterialBrand,
    cavViewProjectTemplate,
  ]);

  // Read tab from query param
  const tabParam = searchParams.get("tab");
  const validTab = tabs.find((tab) => tab.key === tabParam);
  const [activePage, setActivePage] = useState(
    () => validTab?.key || tabs[0]?.key,
  );

  return (
    <div className="p-4  bg-white border  border-gray-300 rounded-xl ">
      {/* Navigation Buttons to switch between settings views */}
      <div className="flex flex-row gap-4  mb-4 ">
        <button
          className={`p-2  rounded  font-semibold ${
            activePage === "settings"
              ? "border-b-4 border-[#65558F] text-lg "
              : "text-lg "
          }`}
        >
          Settings
        </button>
        <div className="flex gap-4  overflow-x-auto">
          {tabs?.length > 0 &&
            tabs.map((tab) => (
              <button
                key={tab.key}
                className={`p-2  w-fit whitespace-nowrap rounded  font-medium ${
                  activePage === tab.key
                    ? "border-b-4 border-[#65558F] text-[1rem] "
                    : "text-[0.9rem] "
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
      {activePage === "materialBrand" && <MaterialBrand />}
      {activePage === "materialType" && <MaterialType />}
    </div>
  );
}
