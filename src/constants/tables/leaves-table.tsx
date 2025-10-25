/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button, Dropdown, InputField, ModalOverlay } from "@/components";
import { ILeaves, useUpdateLeaveStatusMutation } from "@/services";
import { ITableColumn } from "../table";
import toast from "react-hot-toast";

interface IStatusCellProps {
  row: any;
}

type LeaveStatus = "Approved" | "Pending" | "Not Approved";

const StatusCell = ({ row }: IStatusCellProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminRemark, setAdminRemark] = useState("");
  const [currentStatus, setCurrentStatus] = useState<LeaveStatus>(
    (row.status as LeaveStatus) || "Pending"
  );
  const [nextStatus, setNextStatus] = useState<LeaveStatus | null>(null);

  const { updateLeaveStatus, isPending } = useUpdateLeaveStatusMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message || "Leave status updated successfully");
      setIsModalOpen(false);
      setAdminRemark("");
      setNextStatus(null);
      setCurrentStatus(nextStatus!);
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to update leave status");
    },
  });

  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Not Approved", value: "Not Approved" },
  ];

  const handleStatusChange = (val: string) => {
    const newStatus = val as LeaveStatus;

    // Approved cannot be changed again
    if (currentStatus === "Approved") return;

    if (newStatus === "Pending") {
      setCurrentStatus(newStatus);
      callUpdateAPI(newStatus, "");
    } else if (newStatus === "Not Approved") {
      setNextStatus(newStatus);
      setIsModalOpen(true);
    } else if (newStatus === "Approved") {
      setNextStatus(newStatus);
      setIsModalOpen(true);
    }
  };

  const handleSubmit = () => {
    if (!nextStatus) return;
    callUpdateAPI(nextStatus, adminRemark);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setAdminRemark("");
    setIsModalOpen(false);
    setNextStatus(null);
  };

  const callUpdateAPI = (status: LeaveStatus, remark: string) => {
    //  Only call API if not already Approved
    if (currentStatus === "Approved") return;

    updateLeaveStatus({
      id: row?.id,
      payload: {
        status,
        adminRemark: remark || null,
      },
    });
  };

  return (
    <>
      <Dropdown
        options={statusOptions}
        value={currentStatus}
        onChange={handleStatusChange}
        dropdownWidth="w-40"
        disabled={
          currentStatus === "Approved" || currentStatus === "Not Approved"
        }
      />

      <ModalOverlay
        isOpen={isModalOpen}
        onClose={handleCancel}
        modalTitle={`Status Change - ${row.staff_name}`}
        modalClassName="w-[24rem]"
      >
        <div className="flex flex-col gap-6 p-4">
          <InputField
            label="Remark"
            placeholder="Fill Remark Here"
            value={adminRemark}
            onChange={(e) => setAdminRemark(e.target.value)}
          />

          <div className="flex justify-between gap-5">
            <Button
              title="Cancel"
              variant="primary-outline"
              onClick={handleCancel}
              disabled={isPending}
            />
            <Button
              title={isPending ? "Submitting..." : "Submit"}
              onClick={handleSubmit}
              disabled={isPending || !adminRemark.trim()}
            />
          </div>
        </div>
      </ModalOverlay>
    </>
  );
};

// Table Columns
export const leavesListColumn: ITableColumn<
  ILeaves & { staff_name: string; employee_id: string }
>[] = [
  {
    header: "STATUS",
    accessor: "status",
    headerClassName: "min-w-[10rem] ",
    cell: ({ row }) => <StatusCell row={row} />,
  },

  {
    header: "EMPLOYEE ID",
    accessor: "employee_id",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "STAFF NAME",
    accessor: "staff_name",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "REASON LEAVE",
    accessor: "description",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "LEAVE TYPE",
    accessor: "leaveType",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "FROM DATE",
    accessor: "fromDate",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "TO DATE",
    accessor: "toDate",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "LEAVE DAYS",
    accessor: "leaveDays",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "APPLIED DATE",
    accessor: "appliedDate",
    headerClassName: "min-w-[10rem] ",
  },
];
