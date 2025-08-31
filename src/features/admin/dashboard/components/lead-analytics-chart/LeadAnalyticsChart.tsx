import React, { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
}

interface LeadAnalyticsChartProps {
  dataMap: Record<string, DataItem[]>;
}

const dropdownOptions = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export const LeadAnalyticsChart: React.FC<LeadAnalyticsChartProps> = ({
  dataMap,
}) => {
  const [selected, setSelected] = useState(dropdownOptions[0].value);
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState<DataItem[]>(
    dataMap[dropdownOptions[0].value] ?? []
  );
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
    <div className="w-full h-full bg-white p-4 2xl:p-[1vw] border border-gray-300 rounded-xl 2xl:rounded-[0.75vw] 2xl:border-[0.05vw]">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4 2xl:mb-[1vw]">
          <span className="font-semibold text-[1.1rem] 2xl:text-[1.1vw] text-gray-900">
            Lead Analytics
          </span>
          <div className="flex items-center gap-2 relative" ref={dropdownRef}>
            <button
              type="button"
              className="text-base text-gray-700 bg-transparent outline-none flex items-center gap-1"
              onClick={() => setOpen((prev) => !prev)}
            >
              {dropdownOptions.find((opt) => opt.value === selected)?.label}
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${
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
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow z-10 min-w-[8rem]">
                {dropdownOptions?.length > 0 &&
                  dropdownOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 ${
                        selected === option.value ? "font-medium" : ""
                      }`}
                      onClick={() => {
                        setSelected(option.value);
                        setOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
        {(chartData ?? []).length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No data available for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} barSize={40}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 16, fill: "#222" }}
              />
              <YAxis domain={[0, 50]} />
              <Tooltip cursor={{ fill: "#F3F4F6" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                <LabelList
                  dataKey="value"
                  position="top"
                  style={{ fontWeight: 600, fontSize: 18, fill: "#222" }}
                />
                {chartData?.map((entry: DataItem, idx: number) => (
                  <Cell key={`cell-${idx}`} fill="#69A8F7" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
