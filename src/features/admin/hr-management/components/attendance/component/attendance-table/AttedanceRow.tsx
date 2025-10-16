"use client";

import React, { useState, useEffect } from "react";
import { generateMonthDates } from "@/constants";
import { IAttendance } from "@/services";

interface AttendanceRowProps {
  index: number;
  staffId: string;
  name: string;
  year: number;
  month: number;
  attendanceData: IAttendance[];
}

// Format time to display in AM/PM format from HH:mm:ss
const formatTimeForDisplay = (raw?: string | null) => {
  if (!raw) return "-";
  
  // Your API returns time in "HH:mm:ss" format
  if (raw.includes(":")) {
    const timeParts = raw.split(":");
    if (timeParts.length >= 2) {
      const hours = parseInt(timeParts[0]);
      const minutes = timeParts[1];
      
      // Convert to AM/PM format
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      
      return `${displayHours}:${minutes} ${ampm}`;
    }
  }
  
  return raw;
};

export const AttendanceRow: React.FC<AttendanceRowProps> = ({
  index,
  staffId,
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
      const existing = attendanceData.find((att) => {
        const apiDate = att.date;
        return apiDate === date;
      });

      initialData[date] = {
        inTime: existing ? formatTimeForDisplay(existing.inTime) : "-",
        outTime: existing ? formatTimeForDisplay(existing.outTime) : "-",
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
        {staffId}
      </td>
      <td className="border p-2 text-start sticky left-30 bg-white z-10">
        {name}
      </td>

      {generateMonthDates(year, month).map((date, idx) => (
        <React.Fragment key={idx}>
          <td className="border p-2 text-center">
            <div className="min-h-[40px] flex items-center justify-center">
              {displayData[date]?.inTime || "-"}
            </div>
          </td>
          <td className="border p-2 text-center">
            <div className="min-h-[40px] flex items-center justify-center">
              {displayData[date]?.outTime || "-"}
            </div>
          </td>
        </React.Fragment>
      ))}
    </tr>
  );
};