"use client";

import { useState, useMemo } from "react";
import { usePermission } from "@/utils/hooks";
import { EModule, EAction } from "@/constants";
import {
  StaffReport,
  ProjectReport,
  LeadReport,
  BusinessReport,
} from "./components";
import { Breadcrumb } from "../breadcrumb";

export function Reports() {
  const { hasPermission } = usePermission();
  const canViewStaff = hasPermission(EModule.STAFF_PERFORMANCE_REPORT, EAction.VIEW);
  const canViewProject = hasPermission(EModule.PROJECT_PERFORMANCE_REPORT, EAction.VIEW);
  const canViewLead = hasPermission(EModule.LEAD_ANALYTICS_REPORT, EAction.VIEW);
  const canViewBusiness = hasPermission(EModule.BUSINESS_ANALYSIS_REPORT, EAction.VIEW);

  // Dynamically build the tabs array based on permissions
  const tabs = useMemo(() => {
    const arr = [];
    if (canViewStaff) arr.push({ key: "staff", label: "Staff" });
    if (canViewProject) arr.push({ key: "project", label: "Project" });
    if (canViewLead) arr.push({ key: "lead", label: "Lead" });
    if (canViewBusiness) arr.push({ key: "business", label: "Business" });
    return arr;
  }, [canViewStaff, canViewProject, canViewLead, canViewBusiness]);

  const [activeTab, setActiveTab] = useState(() => tabs[0]?.key);

  // If no permission for any tab, show nothing
  if (tabs.length === 0) {
    return <div className="p-6 2xl:p-[1vw] bg-white rounded-xl 2xl:rounded-[0.75vw]">No report permissions available.</div>;
  }

  return (
    <div className="flex flex-col gap-4 2xl:gap-[1vw] p-6 2xl:p-[1vw] bg-white rounded-xl 2xl:rounded-[0.75vw]">
      <Breadcrumb />
      <div className="flex items-center gap-8 2xl:gap-[2vw]">
        <h1 className="text-3xl 2xl:text-[2vw] font-medium mb-6 2xl:mb-[1vw]">Reports</h1>
        <div className="flex gap-4 2xl:gap-[1vw] mb-6 2xl:mb-[1vw] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`p-2 2xl:p-[0.5vw] rounded 2xl:rounded-[0.25vw] font-medium whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-b-4 border-[#65558F] text-[1rem] 2xl:text-[1vw]"
                  : "text-[0.9rem] 2xl:text-[0.875vw]"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Conditional Rendering of Selected Tab Content */}
      {activeTab === "staff" && <StaffReport />}
      {activeTab === "project" && <ProjectReport />}
      {activeTab === "lead" && <LeadReport />}
      {activeTab === "business" && <BusinessReport />}
    </div>
  );
} 