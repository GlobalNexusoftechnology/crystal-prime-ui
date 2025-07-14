import React, { useState, useRef, useEffect } from "react";

interface Project {
  name: string;
  date: string;
  status: number;
}
interface Category {
  category: string;
  projects: Project[];
}
interface ProjectRenewalListProps {
  data: Category[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  monthOptions: string[];
}

export const ProjectRenewalList: React.FC<ProjectRenewalListProps> = ({ data, selectedMonth, onMonthChange, monthOptions }) => {
  const [open, setOpen] = useState(false);
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

  return (
    <div className="bg-white rounded-xl p-4 border 2xl:border-[0.1vw] border-gray-300 w-[46%]">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-lg text-gray-700">Project Renewal</span>
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <button
            type="button"
            className="text-base text-gray-700 bg-transparent outline-none flex items-center gap-1"
            onClick={() => setOpen((prev) => !prev)}
          >
            {selectedMonth}
            <svg
              className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
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
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow z-10 min-w-[8rem]">
              {monthOptions.map((option) => (
                <button
                  key={option}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 ${
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
        <div className="flex justify-center items-center w-full h-full text-gray-400">No projects found for this month.</div>
      ) : (
        data.map((cat) => (
          <div key={cat.category} className="mb-2">
            <div className="font-semibold text-gray-700 mb-1">{cat.category}</div>
            {cat.projects.map((proj) => (
              <div key={proj.name} className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-sm">{proj.name}</span>
                <span className="text-gray-400 text-xs">{proj.date}</span>
                <div className="flex-1 mx-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${proj.status}%` }}></div>
                  </div>
                </div>
                <span className="text-xs text-primary font-semibold">{proj.status}%</span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};