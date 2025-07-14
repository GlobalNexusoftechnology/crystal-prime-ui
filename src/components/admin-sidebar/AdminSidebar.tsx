"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IAdminSidebarLink, ImageRegistry } from "@/constants";
import { useAuthStore } from "@/services";
import { usePermission } from "@/utils/hooks";
import { EModule, EAction } from "@/constants/permissions";
import { CgLogOut } from "react-icons/cg";
import { useState } from "react";
import { TbReportSearch } from "react-icons/tb";

interface IAdminSidebarProps {
  adminSidebarLinks: IAdminSidebarLink[];
  isVisibleSidebar: boolean;
}

export function AdminSidebar({
  adminSidebarLinks,
  isVisibleSidebar,
}: IAdminSidebarProps) {
  const pathName = usePathname();
  const router = useRouter();
  const { removeSession } = useAuthStore();
  const [reportsOpen, setReportsOpen] = useState(false);
  // Use the usePermission hook for permission checks
  const { hasPermission } = usePermission();
  const hasReportPermission = (report: string) => {
    switch (report) {
      case 'staff-performance':
        return hasPermission(EModule.STAFF_PERFORMANCE_REPORT, EAction.VIEW);
      case 'project-performance':
        return hasPermission(EModule.PROJECT_PERFORMANCE_REPORT, EAction.VIEW);
      case 'lead-analytics':
        return hasPermission(EModule.LEAD_ANALYTICS_REPORT, EAction.VIEW);
      case 'business-analysis':
        return hasPermission(EModule.BUSINESS_ANALYSIS_REPORT, EAction.VIEW);
      case 'public-business-dashboard':
        return hasPermission(EModule.PUBLIC_BUSINESS_DASHBOARD, EAction.VIEW);
      case 'any':
        return [
          EModule.STAFF_PERFORMANCE_REPORT,
          EModule.PROJECT_PERFORMANCE_REPORT,
          EModule.LEAD_ANALYTICS_REPORT,
          EModule.BUSINESS_ANALYSIS_REPORT,
          EModule.PUBLIC_BUSINESS_DASHBOARD,
        ].some((mod) => hasPermission(mod, EAction.VIEW));
      default:
        return false;
    }
  };

  // Function to handle navigation
  const handleRedirect = (link: string) => {
    if (link === "/admin/logout") {
      handleLogout();
    } else {
      router.push(link);
    }
  };

  // Logout function
  const handleLogout = () => {
    removeSession();
    router.push("/login"); // Redirect to login page
  };

  return (
    <aside
      className={`relative flex flex-col items-center w-full h-full bg-white py-2 2xl:py-[1vw] overflow-hidden`}
    >
      <div className="flex justify-center pb-4 2xl:pb-[1vw]">
        {!isVisibleSidebar ? (
          <div className={`w-[13rem] xl:w-[15vw]`}>
            <Image
              src={ImageRegistry.websiteLogo}
              alt="website-logo"
              className="w-full h-full cursor-pointer"
            />
          </div>
        ) : (
          <div className={`w-[5rem] xl:w-[5vw]`}>
            <Image
              src={ImageRegistry.websiteLogoIcon}
              alt="website-logo"
              className="w-full h-full cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
        )}
      </div>
      <ul className="w-full h-full flex flex-col justify-between gap-4 2xl:gap-[1vw] overflow-scroll admin-sidebar-links-container">
        <div className="flex flex-col gap-4 2xl:gap-[1vw]">
          {adminSidebarLinks.map((link, index) => {
            const isActive = pathName === link.path;
            // Find the index of the settings link
            const isSettings = link.path === "/admin/settings";
            if (isSettings) {
              // Insert Reports dropdown just before Settings, only if user has permission
              return (
                <React.Fragment key={index}>
                  {hasReportPermission('any') && (
                    <li className="flex flex-col px-4">
                      <button
                        onClick={() => setReportsOpen((prev) => !prev)}
                        className="flex items-center gap-3 2xl:gap-[0.8vw] px-4 2xl:px-[1vw] py-3 2xl:py-[0.8vw] rounded-lg 2xl:rounded-[0.5vw] transition w-full text-left text-gray-600 text-base 2xl:text-[1vw] font-medium"
                      >
                          <TbReportSearch className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw]"/>
                        <span className={`${isVisibleSidebar ? "hidden" : "flex"}`}>Reports</span>
                        <svg className={`w-4 h-4 ml-auto transition-transform ${reportsOpen ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {reportsOpen && !isVisibleSidebar && (
                        <ul className="ml-8 mt-1 flex flex-col gap-1">
                          {hasReportPermission('staff-performance') && (
                            <li>
                              <button onClick={() => handleRedirect("/admin/reports/staff-performance")}
                                className="w-full text-left px-2 py-1 text-gray-600 hover:text-primary"
                              >1 Staff Performance Report</button>
                            </li>
                          )}
                          {hasReportPermission('project-performance') && (
                            <li>
                              <button onClick={() => handleRedirect("/admin/reports/project-performance")}
                                className="w-full text-left px-2 py-1 text-gray-600 hover:text-primary"
                              >2 Project Performance Report</button>
                            </li>
                          )}
                          {hasReportPermission('lead-analytics') && (
                            <li>
                              <button onClick={() => handleRedirect("/admin/reports/lead-analytics")}
                                className="w-full text-left px-2 py-1 text-gray-600 hover:text-primary"
                              >3 Lead Analytics Report</button>
                            </li>
                          )}
                          {hasReportPermission('business-analysis') && (
                            <li>
                              <button onClick={() => handleRedirect("/admin/reports/business-analysis")}
                                className="w-full text-left px-2 py-1 text-gray-600 hover:text-primary"
                              >4 Business Analysis Report</button>
                            </li>
                          )}
                          {hasReportPermission('public-business-dashboard') && (
                            <li>
                              <button onClick={() => handleRedirect("/admin/reports/public-business-dashboard")}
                                className="w-full text-left px-2 py-1 text-gray-600 hover:text-primary"
                              >5 Public Business Dashboard</button>
                            </li>
                          )}
                        </ul>
                      )}
                    </li>
                  )}
                  {/* Settings link */}
                  <li className="flex items-center relative group px-4">
                    {isActive ? (
                      <div className="absolute left-0 w-[4px] 2xl:w-[0.4vw] rounded-full h-[80%] bg-primary"></div>
                    ) : null}
                    <button
                      onClick={() => handleRedirect(link.path)}
                      className={`flex items-center gap-3 2xl:gap-[0.8vw] px-4 2xl:px-[1vw] py-3 2xl:py-[0.8vw] rounded-lg 2xl:rounded-[0.5vw] transition w-full text-left ${
                        isActive ? "text-primary" : null
                      }`}
                    >
                      <span className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw]">
                        {isActive ? link.activeIcon : link.icon}
                      </span>
                      <span
                        className={`${isVisibleSidebar ? "hidden" : "flex"} ${
                          isActive ? "text-primary font-medium" : " text-gray-600"
                        } text-base 2xl:text-[1vw]`}
                      >
                        {link.name}
                      </span>
                    </button>
                  </li>
                </React.Fragment>
              );
            }
            // All other links
            return (
              <li key={index} className="flex items-center relative group px-4">
                {isActive ? (
                  <div className="absolute left-0 w-[4px] 2xl:w-[0.4vw] rounded-full h-[80%] bg-primary"></div>
                ) : null}
                <button
                  onClick={() => handleRedirect(link.path)}
                  className={`flex items-center gap-3 2xl:gap-[0.8vw] px-4 2xl:px-[1vw] py-3 2xl:py-[0.8vw] rounded-lg 2xl:rounded-[0.5vw] transition w-full text-left ${
                    isActive ? "text-primary" : null
                  }`}
                >
                  <span className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw]">
                    {isActive ? link.activeIcon : link.icon}
                  </span>
                  <span
                    className={`${isVisibleSidebar ? "hidden" : "flex"} ${
                      isActive ? "text-primary font-medium" : " text-gray-600"
                    } text-base 2xl:text-[1vw]`}
                  >
                    {link.name}
                  </span>
                </button>
              </li>
            );
          })}
        </div>
        <div
          onClick={handleLogout}
          className={`${
            isVisibleSidebar ? "justify-center" : "justify-start"
          } flex items-center gap-4 2xl:gap-[1vw] p-6 2xl:p-[1.5vw]  cursor-pointer`}
        >
          <CgLogOut className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
          <h1
            className={`${
              isVisibleSidebar ? "hidden" : "flex"
            } text-base 2xl:text-[1vw]`}
          >
            Logout
          </h1>
        </div>
      </ul>
    </aside>
  );
}
