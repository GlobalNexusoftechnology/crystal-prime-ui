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
    <div className="bg-white rounded-xl p-4 2xl:p-[1vw] border 2xl:border-[0.05vw] border-gray-300 w-full h-full">
      <div className="flex justify-between items-center mb-4 2xl:mb-[1vw]">
        <span className="font-medium text-lg 2xl:text-[1vw] text-gray-700">
          Project Renewal
        </span>
        <div
          className="flex items-center gap-2 2xl:gap-[0.5vw] relative"
          ref={dropdownRef}
        >
          <button
            type="button"
            className="text-base 2xl:text-[0.9vw] text-gray-700 bg-transparent outline-none flex items-center gap-1 2xl:gap-[0.25vw]"
            onClick={() => setOpen((prev) => !prev)}
          >
            {selectedMonth}
            <svg
              className={`w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw] ml-2 2xl:ml-[0.5vw] transition-transform ${
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
            <div className="absolute right-0 mt-2 2xl:mt-[0.5vw] bg-white border border-gray-200 rounded shadow z-10 min-w-[8rem] 2xl:min-w-[8vw]">
              {monthOptions?.length > 0 && monthOptions.map((option) => (
                <button
                  key={option}
                  className={`block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-gray-100 text-gray-700 2xl:text-[0.9vw] ${
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
        <div className="flex justify-center items-center w-full h-full text-gray-400 2xl:text-[0.9vw]">
          No projects found for this month.
        </div>
      ) : (
        <div className="space-y-3 2xl:space-y-[0.75vw]">
          {data?.length > 0 && data.map((cat) => {
            const isExpanded = expandedCategories.has(cat.category);
            const firstProject = cat.projects[0];

            return (
              <div
                key={cat.category}
                className="border-b border-gray-100 pb-3 2xl:pb-[0.75vw] last:border-b-0"
              >
                {/* Category Header */}
                <div
                  className="flex items-center justify-between cursor-pointer mb-2 2xl:mb-[0.5vw]"
                  onClick={() => toggleCategory(cat.category)}
                >
                  <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
                    <div
                      className={`w-3 h-3 2xl:w-[0.75vw] 2xl:h-[0.75vw] rounded-full ${getDotColor(
                        cat.category
                      )}`}
                    ></div>
                    <span className="font-bold text-gray-800 text-base 2xl:text-[0.95vw]">
                      {cat.category}
                    </span>
                    {isExpanded ? (
                      <FiChevronUp className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw] text-gray-500" />
                    ) : (
                      <FiChevronDown className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw] text-gray-500" />
                    )}
                  </div>
                  {!isExpanded ? (
                    <span className="text-gray-500 text-sm 2xl:text-[0.85vw]">
                      {firstProject?.date}
                    </span>
                  ) : null}
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="ml-5 2xl:ml-[1.25vw] space-y-3 2xl:space-y-[0.75vw]">
                    {/* All Projects with Status */}
                    {cat?.projects?.length > 0 && cat?.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="space-y-2 2xl:space-y-[0.5vw]"
                      >
                        <div className="flex items-center justify-between">

                        <h1 className="font-medium text-gray-800 text-[0.8rem] 2xl:text-[0.8vw]">Company Name</h1>
                        <h1 className="font-bold text-gray-800 text-base 2xl:text-[1vw] capitalize">{proj.company_name}</h1>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-800 text-sm 2xl:text-[0.9vw] capitalize">
                            {proj.name}
                          </span>
                          <span className="text-gray-500 text-sm 2xl:text-[0.85vw]">
                            {proj.date}
                          </span>
                        </div>
                        <div className="space-y-1 2xl:space-y-[0.25vw]">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-sm 2xl:text-[0.85vw]">
                              Project Status
                            </span>
                            <span className="text-gray-500 text-sm 2xl:text-[0.85vw]">
                              {proj.status}%
                            </span>
                          </div>
                          <div className="w-full h-1 2xl:h-[0.25vw] bg-gray-200 rounded-full overflow-hidden">
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
