/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components";
import { ICheckInResponse, ICheckOutResponse, useAuthStore } from "@/services";
import { useState } from "react";
import {
  useCreateCheckInMutation,
  useCreateCheckOutMutation,
} from "@/services";
import { toast } from "react-hot-toast";
import { IApiError } from "@/utils";

interface Props {
  onSuccessRefresh?: () => void; // parent can pass refetch()
}

export function CheckInCheckOut({ onSuccessRefresh }: Props) {
  const { activeSession } = useAuthStore();
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const userRole = activeSession?.user?.role?.role;
  const userPermission =
    userRole?.toLowerCase() === "admin" || userRole?.toLowerCase() === "client";

  // Check In Mutation
  const { onCheckInMutation, isPending: isCheckInPending } =
    useCreateCheckInMutation({
      onSuccessCallback: (data: ICheckInResponse) => {
        setIsCheckedIn(true);
        toast.success(data.message || "Check In successful!");
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
        setIsCheckedIn(false);
        toast.success(data.message || "Check Out successful!");
        onSuccessRefresh?.();
      },
      onErrorCallback: (err: IApiError) => {
        toast.error(err.message || "Check Out failed!");
      },
    });

  const isLoading = isCheckInPending || isCheckOutPending;

  const handleButtonClick = async () => {
    const staffId = activeSession?.user?.id;
    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toISOString(); // send ISO to backend

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
        <div>
          <Button
            title={buttonTitle}
            onClick={handleButtonClick}
            disabled={isLoading}
          />
          {isLoading && <span>Loading...</span>}
        </div>
      )}
    </div>
  );
}
