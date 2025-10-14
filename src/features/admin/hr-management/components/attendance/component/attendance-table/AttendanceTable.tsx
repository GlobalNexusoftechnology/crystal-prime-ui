"use client";

import React from "react";
import { AttendanceHeader } from "./AttendanceHeader";
import { AttendanceRow } from "./AttedanceRow";

export const AttendanceTable: React.FC = () => {
  const year = 2025;
  const month = 10;

  const staffList = [
    { id: "ST001", name: "Sohel" },
    { id: "ST002", name: "Shubhanginee Gupta" },
    { id: "ST003", name: "Aaftab" },
    { id: "ST004", name: "Shivam" },
        { id: "ST006", name: "Moin Baig" },

    { id: "ST005", name: "Darshika" },

  ];

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border-collapse border border-gray-300 text-gray-700">
        <AttendanceHeader year={year} month={month} />
        <tbody>
          {staffList.map((staff, index) => (
            <AttendanceRow
              key={staff.id}
              index={index}
              staffId={staff.id}
              name={staff.name}
              year={year}
              month={month}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
