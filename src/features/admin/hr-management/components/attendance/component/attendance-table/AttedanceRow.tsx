"use client";

import React, { useState, useEffect } from "react";
import { generateMonthDates } from "@/constants";
import { TimePicker } from "@/components";
import { IAttendance } from "@/services";

interface AttendanceRowProps {
  index: number;
  staffId: string;
  name: string;
  year: number;
  month: number;
  attendanceData: IAttendance[];
  onRefresh?: () => void; // optional refetch callback from parent
}

const formatTime = (raw?: string | null) => {
  if (!raw) return "";
  // if it's an ISO timestamp, convert to HH:mm
  if (raw.includes("T") || raw.includes("Z")) {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) {
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    }
  }
  // if raw already in HH:mm or similar, return as-is
  if (raw.includes(":")) return raw;
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
  const [localAttendanceData, setLocalAttendanceData] = useState<
    Record<string, { inTime: string; outTime: string }>
  >({});

  // Filter only entries for this staff
  const staffAttendance = React.useMemo(
    () => attendanceData.filter((a) => a.staffId === staffId),
    [attendanceData, staffId]
  );

  // Initialize localAttendanceData for every date in month
  useEffect(() => {
    const dates = generateMonthDates(year, month);
    const initialData: Record<string, { inTime: string; outTime: string }> = {};

    dates.forEach((date) => {
      // try to find matching attendance entry
      const existing = staffAttendance.find((att) => {
        try {
          // Normalize to YYYY-MM-DD
          const apiDate = att.date?.split("T")[0] ?? att.date;
          return apiDate === date;
        } catch {
          return false;
        }
      });

      initialData[date] = {
        inTime: formatTime(existing?.inTime) || "",
        outTime: formatTime(existing?.outTime) || "",
      };
    });

    setLocalAttendanceData(initialData);
  }, [staffAttendance, year, month]);

  const handleTimeChange = (
    date: string,
    type: "inTime" | "outTime",
    value: string
  ) => {
    setLocalAttendanceData((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [type]: value,
      },
    }));
  };

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
            <TimePicker
              value={localAttendanceData[date]?.inTime || ""}
              onChange={(val) => handleTimeChange(date, "inTime", val)}
            />
          </td>
          <td className="border p-2 text-center">
            <TimePicker
              value={localAttendanceData[date]?.outTime || ""}
              onChange={(val) => handleTimeChange(date, "outTime", val)}
            />
          </td>
        </React.Fragment>
      ))}
    </tr>
  );
};
