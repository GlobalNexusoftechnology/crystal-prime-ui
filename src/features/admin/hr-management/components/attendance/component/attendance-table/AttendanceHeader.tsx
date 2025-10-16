"use client";

import React from "react";
import { generateMonthDates } from "@/constants";

interface AttendanceHeaderProps {
  year: number;
  month: number;
}

// Function to get day name from date string and check if it's Sunday
const getDayInfo = (dateString: string): { dayName: string; isSunday: boolean } => {
  const date = new Date(dateString);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const isSunday = date.getDay() === 0; // 0 is Sunday
  return { dayName, isSunday };
};

// Function to format date as "DD MMM YYYY" (e.g., "01 Jan 2025")
const formatDateDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  year,
  month,
}) => {
  const dates = generateMonthDates(year, month);

  return (
    <thead className="bg-gray-50">
      {/* First row - Main headers */}
      <tr>
        <th
          rowSpan={2}
          className="border p-2 text-center sticky left-0 bg-gray-100 z-30"
        >
          S.No.
        </th>
        <th
          rowSpan={2}
          className="border p-2 text-center sticky left-12 bg-gray-100 z-30"
        >
          Staff ID
        </th>
        <th
          rowSpan={2}
          className="border p-2 text-start sticky left-30 bg-gray-100 z-20"
        >
          Name
        </th>
        {dates.map((date, idx) => {
          const { isSunday } = getDayInfo(date);
          return (
            <th
              key={idx}
              colSpan={2}
              className={`border p-2 text-center text-sm font-semibold ${isSunday ? 'bg-yellow-100' : 'bg-white'}`}
            >
              {formatDateDisplay(date)}
            </th>
          );
        })}
      </tr>
      
      {/* Second row - Day names and In/Out headers */}
      <tr>
        {dates.map((date, idx) => {
          const { dayName, isSunday } = getDayInfo(date);
          const sundayClass = isSunday ? 'bg-yellow-100' : 'bg-white';
          return (
            <React.Fragment key={idx}>
              <th className={`border p-1 text-center text-xs font-medium min-w-[5rem] ${sundayClass}`}>
                <div>In Time</div>
                <div className={`font-normal ${isSunday ? 'text-yellow-700' : 'text-gray-600'}`}>
                  {dayName}
                </div>
              </th>
              <th className={`border p-1 text-center text-xs font-medium min-w-[5rem] ${sundayClass}`}>
                <div>Out Time</div>
                <div className={`font-normal ${isSunday ? 'text-yellow-700' : 'text-gray-600'}`}>
                  {dayName}
                </div>
              </th>
            </React.Fragment>
          );
        })}
      </tr>
    </thead>
  );
};