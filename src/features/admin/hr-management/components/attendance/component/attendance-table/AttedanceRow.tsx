"use client";

import React, { useState } from "react";
import { generateMonthDates } from "@/constants";
import { TimePicker } from "@/components";

interface AttendanceRowProps {
  index: number;
  staffId: string;
  name: string;
  year: number;
  month: number;
}

export const AttendanceRow: React.FC<AttendanceRowProps> = ({
  index,
  staffId,
  name,
  year,
  month,
}) => {

  const [attendanceData, setAttendanceData] = useState<
    Record<string, { inTime: string; outTime: string }>
  >({});

  const handleTimeChange = (
    date: string,
    type: "inTime" | "outTime",
    value: string
  ) => {
    setAttendanceData((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [type]: value,
      },
    }));
  };

  return (
   <tr className="text-sm whitespace-nowrap">
  <td className="border p-2 text-center sticky left-0 bg-white z-20">{index + 1}</td>
  <td className="border p-2 text-center sticky left-12 bg-white z-20">{staffId}</td>
  <td className="border p-2 text-start sticky left-30 bg-white z-10">{name}</td>

  {generateMonthDates(year, month).map((date, idx) => (
    <React.Fragment key={idx}>
      <td className="border p-2 text-center">
        <TimePicker
          value={attendanceData[date]?.inTime || ""}
          onChange={(val) => handleTimeChange(date, "inTime", val)}
        />
      </td>
      <td className="border p-2 text-center">
        <TimePicker
          value={attendanceData[date]?.outTime || ""}
          onChange={(val) => handleTimeChange(date, "outTime", val)}
        />
      </td>
    </React.Fragment>
  ))}
</tr>

  );
};
