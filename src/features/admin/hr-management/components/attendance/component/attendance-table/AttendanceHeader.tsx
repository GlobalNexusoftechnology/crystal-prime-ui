"use client";

import { generateMonthDates } from "@/constants";
import React from "react";

interface AttendanceHeaderProps {
  year: number;
  month: number;
}

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  year,
  month,
}) => {
  return (
    <thead>
      <tr className="bg-gray-100 text-sm font-semibold whitespace-nowrap">
        <th
          rowSpan={2}
          className="border p-2 text-center sticky left-0 bg-gray-100 z-20 w-12"
        >
          S.No
        </th>
        <th
          rowSpan={2}
          className="border p-2 text-center sticky left-12 bg-gray-100 z-20 w-20"
        >
          Staff ID
        </th>
        <th
          rowSpan={2}
          className="border p-2 text-center sticky left-30 bg-gray-100 z-10 w-40"
        >
          Name
        </th>

        {generateMonthDates(year, month).map((date, i) => (
          <th key={i} colSpan={2} className="border p-2 text-center">
            {date}
          </th>
        ))}
      </tr>

      <tr className="bg-gray-50 text-xs font-medium">
        {generateMonthDates(year, month).map((_, index) => (
          <React.Fragment key={index}>
            <th className="border p-2 text-center">In Time</th>
            <th className="border p-2 text-center">Out Time</th>
          </React.Fragment>
        ))}
      </tr>
    </thead>
  );
};
