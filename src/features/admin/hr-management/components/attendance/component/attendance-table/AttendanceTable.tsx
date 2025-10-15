"use client";

import React, { useMemo } from "react";
import { AttendanceHeader } from "./AttendanceHeader";
import { AttendanceRow } from "./AttedanceRow";
import { useAllAttendanceQuery } from "@/services";
import { IAttendance } from "@/services";

export const AttendanceTable: React.FC = () => {
  const year = 2025;
  const month = 10;

  // Assuming your hook returns { data, isLoading, isError, error, refetch }
  const {
    data: attendanceResponse,
    isLoading,
    isError,
    error,
  } = useAllAttendanceQuery();

  // Normalize array from your response shape:
  // your IAttendancesResponse -> { status, message, data: IAttendance[] }
  const attendanceData = useMemo<IAttendance[]>(() => {
    if (!attendanceResponse) return [];
    if (
      "data" in attendanceResponse &&
      Array.isArray(attendanceResponse.data)
    ) {
      return attendanceResponse.data;
    }
    if (Array.isArray(attendanceResponse)) {
      return attendanceResponse;
    }
    return [];
  }, [attendanceResponse]);

  // Build staff list from attendanceData
  const staffList = React.useMemo(() => {
    if (!attendanceData || attendanceData.length === 0) return [];

    const uniqueStaff = new Map<
      string,
      { id: string; name: string; email: string }
    >();

    attendanceData.forEach((att) => {
      const staff = att.staff;
      if (staff && !uniqueStaff.has(staff.id)) {
        uniqueStaff.set(staff.id, {
          id: staff.id,
          name: `${staff.first_name ?? ""} ${staff.last_name ?? ""}`.trim(),
          email: staff.email ?? "",
        });
      }
    });

    return Array.from(uniqueStaff.values());
  }, [attendanceData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="text-lg">Loading attendance data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="text-lg text-red-500">
          Error loading attendance data: {error?.message}
        </div>
      </div>
    );
  }

  if (staffList.length === 0) {
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="text-lg">No staff data found</div>
      </div>
    );
  }

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
              attendanceData={attendanceData}
              // pass refetch so rows or other components can trigger refresh
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
