"use client";

import React, { useMemo } from "react";
import { AttendanceHeader } from "./AttendanceHeader";
import { useAllAttendanceQuery, useAllUsersQuery } from "@/services";
import { IAttendance, IUser } from "@/services";
import { AttendanceRow } from "./AttedanceRow";

interface AttendanceTableProps {
  year: number;
  month: number;
  searchText?: string; // optional search filter
  page?: number;
  limit?: number;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  year,
  month,
  searchText,
  page = 1,
  limit = 100,
}) => {
  // Fetch all users/staff data
  const {
    allUsersData: usersResponse,
    isLoading: isLoadingUsers,
    isError: isUsersError,
    error: usersError,
  } = useAllUsersQuery();

  // Fetch attendance data with filters
  const {
    data: attendanceResponse,
    isLoading: isLoadingAttendance,
    isError: isAttendanceError,
    error: attendanceError,
  } = useAllAttendanceQuery({ year, month, searchText, page, limit });

  // Normalize attendance array
  const attendanceData = useMemo<IAttendance[]>(() => {
    if (!attendanceResponse || !attendanceResponse.list) return [];
    return attendanceResponse.list;
  }, [attendanceResponse]);

  // Normalize users array - filter out admin/client
  const usersData = useMemo<IUser[]>(() => {
    if (!usersResponse?.data?.list) return [];
    return usersResponse.data.list.filter((user: IUser) => {
      const userRole = user.role?.role?.toLowerCase();
      return userRole && userRole !== "admin" && userRole !== "client";
    });
  }, [usersResponse]);

  // Map staff with their attendance records
  const staffList = useMemo(() => {
    if (!usersData || usersData.length === 0) return [];

    return usersData.map((user) => {
      const userAttendance = attendanceData.filter(
        (att) => att.staffId === user.id
      );
      return {
        id: user.id,
        name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
        email: user.email ?? "",
        attendanceRecords: userAttendance,
      };
    });
  }, [usersData, attendanceData]);

  const isLoading = isLoadingAttendance || isLoadingUsers;
  const isError = isAttendanceError || isUsersError;
  const error = attendanceError || usersError;

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="text-lg">Loading attendance data...</div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="text-lg text-red-500">
          Error loading data: {error?.message}
        </div>
      </div>
    );

  if (staffList.length === 0)
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="text-lg">No staff data found</div>
      </div>
    );

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
              attendanceData={staff.attendanceRecords}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
