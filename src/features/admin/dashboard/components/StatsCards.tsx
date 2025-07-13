import React from "react";

interface Stat {
  label: string;
  value: string | number;
  sub: string;
}

interface StatsCardsProps {
  stats: Stat[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
    {stats.map((stat, i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-4 flex flex-col items-center shadow border border-gray-100"
      >
        <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
        <div className="text-gray-700 text-base font-medium mb-1 text-center">
          {stat.label}
        </div>
        <div className="text-gray-400 text-xs text-center">{stat.sub}</div>
      </div>
    ))}
  </div>
);
