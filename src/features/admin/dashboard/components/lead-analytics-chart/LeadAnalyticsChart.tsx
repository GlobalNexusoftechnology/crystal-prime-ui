import React, { useState, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  value: number;
}

interface LeadAnalyticsChartProps {
  dataMap: Record<string, DataItem[]>;
}

const dropdownOptions = ["weekly", "monthly", "yearly"];

export const LeadAnalyticsChart: React.FC<LeadAnalyticsChartProps> = ({ dataMap }) => {
  const [selected, setSelected] = useState("weekly");
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState<DataItem[]>(dataMap["weekly"] ?? []);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChartData(dataMap[selected]);
  }, [selected, dataMap]);

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
    <div className="bg-white rounded-xl p-4 border 2xl:border-[0.1vw] border-gray-300 w-[67.5%]">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-lg text-gray-700">Lead Analytics</span>
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <button
            type="button"
            className="text-base text-gray-700 bg-transparent outline-none flex items-center gap-1"
            onClick={() => setOpen((prev) => !prev)}
          >
            {selected}
            <svg
              className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
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
              {dropdownOptions.map((option) => (
                <button
                  key={option}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 ${
                    selected === option ? "font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelected(option);
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
      {(chartData ?? []).length === 0 ? (
        <div className="text-center text-gray-500 py-8">No data available for this period.</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}; 