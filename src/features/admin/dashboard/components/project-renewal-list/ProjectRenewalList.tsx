import React, { useState, useRef, useEffect } from "react";
import type { Category } from "@/services";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface ProjectRenewalListProps {
  data: Category[]; // for a single month
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  monthOptions: string[];
}

export const ProjectRenewalList: React.FC<ProjectRenewalListProps> = ({
  data,
  selectedMonth,
  onMonthChange,
  monthOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const getDotColor = (categoryName: string) => {
    if (categoryName.toLowerCase().includes("real estate")) {
      return "bg-blue-500";
    }
    return "bg-orange-500";
  };

  return (
    <div className="bg-white rounded-xl p-4  border  border-gray-300 w-full h-full">
      <div className="flex justify-between items-center mb-4 ">
        <span className="font-medium text-lg  text-gray-700">
          Project Renewal
        </span>
        <div
          className="flex items-center gap-2  relative"
          ref={dropdownRef}
        >
          <button
            type="button"
            className="text-base  text-gray-700 bg-transparent outline-none flex items-center gap-1 "
            onClick={() => setOpen((prev) => !prev)}
          >
            {selectedMonth}
            <svg
              className={`w-4 h-4   ml-2  transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-2  bg-white border border-gray-200 rounded shadow z-10 min-w-[8rem] ">
              {monthOptions?.length > 0 && monthOptions.map((option) => (
                <button
                  key={option}
                  className={`block w-full text-left px-4  py-2  hover:bg-gray-100 text-gray-700  ${
                    selectedMonth === option ? "font-medium" : ""
                  }`}
                  onClick={() => {
                    onMonthChange(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {data.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full text-gray-400 ">
          No projects found for this month.
        </div>
      ) : (
        <div className="space-y-3 ">
          {data?.length > 0 && data.map((cat) => {
            const isExpanded = expandedCategories.has(cat.category);
            const firstProject = cat.projects[0];

            return (
              <div
                key={cat.category}
                className="border-b border-gray-100 pb-3  last:border-b-0"
              >
                {/* Category Header */}
                <div
                  className="flex items-center justify-between cursor-pointer mb-2 "
                  onClick={() => toggleCategory(cat.category)}
                >
                  <div className="flex items-center gap-2 ">
                    <div
                      className={`w-3 h-3   rounded-full ${getDotColor(
                        cat.category
                      )}`}
                    ></div>
                    <span className="font-bold text-gray-800 text-base ">
                      {cat.category}
                    </span>
                    {isExpanded ? (
                      <FiChevronUp className="w-4 h-4   text-gray-500" />
                    ) : (
                      <FiChevronDown className="w-4 h-4   text-gray-500" />
                    )}
                  </div>
                  {!isExpanded ? (
                    <span className="text-gray-500 text-sm ">
                      {firstProject?.date}
                    </span>
                  ) : null}
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="ml-5  space-y-3 ">
                    {/* All Projects with Status */}
                    {cat?.projects?.length > 0 && cat?.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="space-y-2 "
                      >
                        <div className="flex items-center justify-between">

                        <h1 className="font-medium text-gray-800 text-[0.8rem] ">Company Name</h1>
                        <h1 className="font-bold text-gray-800 text-base  capitalize">{proj.company_name}</h1>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-800 text-sm  capitalize">
                            {proj.name}
                          </span>
                          <span className="text-gray-500 text-sm ">
                            {proj.date}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-sm ">
                              Project Status
                            </span>
                            <span className="text-gray-500 text-sm ">
                              {proj.status}%
                            </span>
                          </div>
                          <div className="w-full h-1  bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-600 rounded-full transition-all duration-300"
                              style={{ width: `${proj.status}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
