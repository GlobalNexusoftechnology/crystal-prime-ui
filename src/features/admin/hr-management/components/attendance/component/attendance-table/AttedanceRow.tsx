"use client";

import React, { useState, useEffect } from "react";
import { generateMonthDates } from "@/constants";
import { IAttendance } from "@/services";

interface AttendanceRowProps {
  index: number;
  employeeId: string;
  name: string;
  year: number;
  month: number;
  attendanceData: IAttendance[];
}

// Convert 24h time string to 12h AM/PM format
const formatTimeForDisplay = (dateStr?: string, timeStr?: string | null) => {
  if (!timeStr) return "-";

  const [hoursStr, minutesStr] = timeStr.split(":");
  const hours = parseInt(hoursStr, 10);

  if (isNaN(hours)) return "-";

  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutesStr} ${ampm}`;
};

// Function to check if a date is Sunday
const isSunday = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date.getDay() === 0;
};

export const AttendanceRow: React.FC<AttendanceRowProps> = ({
  index,
  employeeId,
  name,
  year,
  month,
  attendanceData,
}) => {
  const [displayData, setDisplayData] = useState<
    Record<string, { inTime: string; outTime: string }>
  >({});

  // Initialize display data for every date in month
  useEffect(() => {
    const dates = generateMonthDates(year, month);
    const initialData: Record<string, { inTime: string; outTime: string }> = {};

    dates.forEach((date) => {
      // Find matching attendance entry
      const existing = attendanceData.find((att) => att.date === date);

      initialData[date] = {
        inTime: existing ? formatTimeForDisplay(existing.date, existing.inTime) : "-",
        outTime: existing ? formatTimeForDisplay(existing.date, existing.outTime) : "-",
      };
    });

    setDisplayData(initialData);
  }, [attendanceData, year, month]);

  return (
    <tr className="text-sm whitespace-nowrap">
      <td className="border p-2 text-center sticky left-0 bg-white z-20">
        {index + 1}
      </td>
      <td className="border p-2 text-center sticky left-12 bg-white z-20">
        {employeeId || "N/A"}
      </td>
      <td className="border p-2 text-start sticky left-[12.5rem] bg-white z-10">
        {name}
      </td>

      {generateMonthDates(year, month).map((date, idx) => {
        const sundayClass = isSunday(date) ? "bg-yellow-100" : "bg-white";
        return (
          <React.Fragment key={idx}>
            <td className={`border p-2 text-center ${sundayClass}`}>
              <div className="min-h-[40px] flex items-center justify-center">
                {displayData[date]?.inTime || "-"}
              </div>
            </td>
            <td className={`border p-2 text-center ${sundayClass}`}>
              <div className="min-h-[40px] flex items-center justify-center">
                {displayData[date]?.outTime || "-"}
              </div>
            </td>
          </React.Fragment>
        );
      })}
    </tr>
  );
};
