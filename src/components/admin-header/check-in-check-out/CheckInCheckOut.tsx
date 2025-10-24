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

  const { data: todayStatus, isLoading: isStatusLoading, refetchTodayStatus } =
    useTodayAttendanceStatus(staffId);

  const [timerSeconds, setTimerSeconds] = useState(0);

  const isCheckedIn = todayStatus?.isCheckedIn ?? false;

  const userRole = activeSession?.user?.role?.role;
  const userPermission =
    userRole?.toLowerCase() === "admin" || userRole?.toLowerCase() === "client";

  // Timer logic (timezone safe)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
  
    if (isCheckedIn && todayStatus?.checkInTime) {
      const today = new Date();
  
      // Parse HH:MM:SS from checkInTime
      const [hours, minutes, seconds] = todayStatus.checkInTime.split(":").map(Number);
  
      // Create a Date object using local timezone (client)
      const checkInDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
        seconds
      );
  
      // If checkInDate is in the future (due to timezone), fallback to UTC parsing
      let diffSeconds = Math.floor((Date.now() - checkInDate.getTime()) / 1000);
      if (diffSeconds < 0) {
        // Parse as UTC
        const checkInDateUTC = new Date(Date.UTC(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          hours,
          minutes,
          seconds
        ));
        diffSeconds = Math.floor((Date.now() - checkInDateUTC.getTime()) / 1000);
      }
  
      setTimerSeconds(diffSeconds);
  
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [isCheckedIn, todayStatus?.checkInTime]);
  ;

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

  return (
    <div>
      {!userPermission && (
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
      )}
    </div>
  );
}
