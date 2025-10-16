"use client";

import React, { useMemo } from "react";
import { AttendanceHeader } from "./AttendanceHeader";
import { useAllAttendanceQuery, useAllUsersQuery } from "@/services";
import { IAttendance, IUser } from "@/services";
import { AttendanceRow } from "./AttedanceRow";

export const AttendanceTable: React.FC = () => {
  const year = 2025;
  const month = 10;

  // Fetch attendance data
  const {
    data: attendanceResponse,
    isLoading: isLoadingAttendance,
    isError: isAttendanceError,
    error: attendanceError,
  } = useAllAttendanceQuery();

  // Fetch all users/staff data
  const {
    allUsersData: usersResponse,
    isLoading: isLoadingUsers,
    isError: isUsersError,
    error: usersError,
  } = useAllUsersQuery();

  // Normalize attendance array from response
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

  // Normalize users array from response - fixed to use data.list
  const usersData = useMemo<IUser[]>(() => {
    if (!usersResponse || !usersResponse.data) return [];
    
    // Extract the list from data.list
    const userList = usersResponse.data.list || [];
    
    // Filter out users with role 'admin' or 'client'
    const filteredUsers = userList.filter((user: IUser) => {
      const userRole = user.role?.role?.toLowerCase();
      return userRole.toLowerCase() !== 'admin' && userRole.toLowerCase() !== 'client';
    });

    return filteredUsers;
  }, [usersResponse]);

  // Build staff list from usersData and match with attendance data
  const staffList = React.useMemo(() => {
    if (!usersData || usersData.length === 0) return [];

    return usersData.map((user) => {
      // Find attendance records for this user
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
          Error loading data: {error?.message}
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
              attendanceData={staff.attendanceRecords}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};