import React, { useState, useRef, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
}

interface LeadTypeChartProps {
  chartDataMap: Record<string, DataItem[]>;
  colors: string[];
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;
  const nCx = Number(cx) || 0;
  const nCy = Number(cy) || 0;
  const nInner = Number(innerRadius) || 0;
  const nOuter = Number(outerRadius) || 0;
  const radius = nInner + (nOuter - nInner) * 1.15;
  const x = nCx + radius * Math.cos(-midAngle * RADIAN);
  const y = nCy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={20}
        fill="#fff"
        stroke="#E5E7EB"
        strokeWidth={3}
      />
      <text
        x={x}
        y={y}
        fill="#222"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[0.7rem]"
        fontWeight={600}
      >
        {`${Math.round((percent || 0) * 100)}%`}
      </text>
    </g>
  );
};

const dropdownOptions = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export const LeadTypeChart: React.FC<LeadTypeChartProps> = ({ chartDataMap, colors }) => {
  const [selected, setSelected] = useState(dropdownOptions[0].value);
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState<DataItem[]>(chartDataMap[dropdownOptions[0].value] ?? []);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChartData(chartDataMap[selected]);
  }, [selected, chartDataMap]);

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

  const legendItems = (chartData ?? [])?.map((d, idx) => ({
    name: d.name,
    color: colors[idx % colors.length],
  }));

  // If all items are 'Unknown', show a message instead of the chart
  const allUnknown = (chartData ?? []).length > 0 && (chartData ?? []).every(d => d.name === "Unknown");

  return (
    <div
      className="bg-white rounded-xl p-4 border 2xl:border-[0.1vw] border-gray-300 flex flex-col items-center w-full"
    >
      <div className="flex justify-between items-center w-full mb-2 2xl:mb-[0.5vw]">
        <span className="font-medium text-lg 2xl:text-[1.2vw] text-gray-900">Lead Type</span>
        <div className="flex items-center gap-2 2xl:gap-[0.5vw] relative" ref={dropdownRef}>
          <button
            type="button"
            className="text-base text-gray-700 font-medium bg-transparent outline-none flex items-center gap-1"
            onClick={() => setOpen((prev) => !prev)}
          >
            {dropdownOptions.find(opt => opt.value === selected)?.label}
            <svg
              className={`w-4 h-4 ml-2 transition-transform ${
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
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          {allUnknown ? (
            <div className="text-center text-gray-500 py-8">No lead type data available for this period.</div>
          ) : (chartData ?? []).length === 0 ? (
            <div className="text-center text-gray-500 py-8">No data available for this period.</div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={4}
                  label={renderCustomizedLabel}
                  labelLine={false}
                  isAnimationActive={false}
                >
                  {(chartData ?? [])?.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={colors[idx % colors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        {/* Legend */}
        <div className="w-full md:auto lg:w-[45%] flex flex-wrap justify-center flex-col gap-4">
          <div className="flex gap-4 flex-wrap">
            {legendItems?.length > 0 && legendItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 text-base 2xl:text-[1vw] mb-2"
              >
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ background: item.color }}
                ></span>
                <span className="text-gray-900 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
