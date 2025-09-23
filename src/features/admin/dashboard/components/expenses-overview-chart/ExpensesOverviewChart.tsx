import React, { useState, useRef, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DataItem {
  month: string;
  income: number;
  expense: number;
}

interface ExpensesOverviewChartProps {
  dataMap: Record<string, DataItem[]>;
}

const dropdownOptions = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export const ExpensesOverviewChart: React.FC<ExpensesOverviewChartProps> = ({
  dataMap,
}) => {
  const [selected, setSelected] = useState("monthly");
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState<DataItem[]>(dataMap["monthly"]);
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
    <div className="bg-white rounded-xl p-4 border 2xl:border-[0.05vw] border-gray-300 w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-lg text-gray-700">Expenses Overview</span>
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <button
            type="button"
            className="text-base text-gray-700 bg-transparent outline-none flex items-center gap-1"
            onClick={() => setOpen((prev) => !prev)}
          >
            {dropdownOptions.find(opt => opt.value === selected)?.label}
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
              {dropdownOptions?.length > 0 && dropdownOptions.map((option) => (
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
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area type="monotone" dataKey="income" stroke="#6366F1" fill="#E0E7FF" />
          <Area type="monotone" dataKey="expense" stroke="#F59E42" fill="#FEF3C7" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}; 