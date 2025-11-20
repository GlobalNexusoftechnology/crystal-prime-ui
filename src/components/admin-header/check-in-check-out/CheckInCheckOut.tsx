/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components";
import {
  ICheckInResponse,
  ICheckOutResponse,
  useAuthStore,
  useCreateCheckInMutation,
  useCreateCheckOutMutation,
  useTodayAttendanceStatus,
  useAllWorkRequestsQuery,
  useAllHolidayQuery,
} from "@/services";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { IApiError } from "@/utils";

interface Props {
  onSuccessRefresh?: () => void; // parent can pass refetch()
}

export function CheckInCheckOut({ onSuccessRefresh }: Props) {
  const { activeSession } = useAuthStore();
  const staffId = activeSession?.user?.id;

  const {
    data: todayStatus,
    isLoading: isStatusLoading,
    refetchTodayStatus,
  } = useTodayAttendanceStatus(staffId);

  const { data: workRequests } = useAllWorkRequestsQuery();
  const { data: holidays } = useAllHolidayQuery();

  const [timerSeconds, setTimerSeconds] = useState(0);

  const isCheckedIn = todayStatus?.isCheckedIn ?? false;

  const userRole = activeSession?.user?.role?.role;
  const userPermission =
    userRole?.toLowerCase() === "admin" || userRole?.toLowerCase() === "client";

  // Check if today is a weekend or holiday and if user has approved work request
  const shouldShowCheckInOut = () => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    const isSunday = today.getDay() === 0;

    // Check if today is a holiday
    const isHoliday = holidays?.some((h: any) => h.date === todayString) ?? false;

    // If it's not a weekend or holiday, show the button
    if (!isSunday && !isHoliday) {
      return true;
    }

    // If it's a weekend or holiday, check if user has approved work request for today
    const hasApprovedRequest = workRequests?.data?.some(
      (req: any) =>
        req.requestDate === todayString &&
        req.status === "Approved" &&
        req.staffId === staffId
    ) ?? false;

    return hasApprovedRequest;
  };

  // Timer logic (timezone safe)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isCheckedIn && todayStatus?.checkInTime) {
      // Parse the check-in time and create a UTC date
      const [hours, minutes, seconds] = todayStatus.checkInTime
        .split(":")
        .map(Number);

      // Create check-in time in UTC by using the same date but with check-in time
      const now = new Date();
      const checkInDate = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          hours,
          minutes,
          seconds
        )
      );

      // Calculate the time difference in milliseconds
      const diffMilliseconds = Date.now() - checkInDate.getTime();

      // Convert the difference to seconds
      const diffSeconds = Math.floor(diffMilliseconds / 1000);

      // Set the timer
      setTimerSeconds(diffSeconds);

      // Update the timer every second
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCheckedIn, todayStatus?.checkInTime]);

  // Format timer as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Check In Mutation
  const { onCheckInMutation, isPending: isCheckInPending } =
    useCreateCheckInMutation({
      onSuccessCallback: (data: ICheckInResponse) => {
        toast.success(data.message || "Check In successful!");
        refetchTodayStatus();
        onSuccessRefresh?.();
      },
      onErrorCallback: (err: IApiError) => {
        toast.error(err.message || "Check In failed!");
      },
    });

  // Check Out Mutation
  const { onCheckOutMutation, isPending: isCheckOutPending } =
    useCreateCheckOutMutation({
      onSuccessCallback: (data: ICheckOutResponse) => {
        toast.success(data.message || "Check Out successful!");
        refetchTodayStatus();
        onSuccessRefresh?.();
      },
      onErrorCallback: (err: IApiError) => {
        toast.error(err.message || "Check Out failed!");
      },
    });

  const isLoading = isCheckInPending || isCheckOutPending || isStatusLoading;

  const handleButtonClick = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toISOString();

    if (!staffId) {
      toast.error("User not found!");
      return;
    }

    if (!isCheckedIn) {
      onCheckInMutation({
        staffId,
        inTime: currentTime,
        date: currentDate,
      } as any);
    } else {
      onCheckOutMutation({
        staffId,
        outTime: currentTime,
        date: currentDate,
      } as any);
    }
  };

  const buttonTitle = isCheckedIn ? "Check Out" : "Check In";

  // Don't render if user is admin/client OR if it's weekend/holiday without approval
  if (userPermission || !shouldShowCheckInOut()) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Button
          title={buttonTitle}
          onClick={handleButtonClick}
          disabled={isLoading}
        />
        {isCheckedIn && (
          <span className="text-sm text-gray-700">
            Timer: {formatTime(timerSeconds)}
          </span>
        )}
        {isLoading && <span>Loading...</span>}
      </div>
    </div>
  );
}
