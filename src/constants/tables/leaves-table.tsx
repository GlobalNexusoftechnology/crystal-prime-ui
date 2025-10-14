/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ILeaves } from "@/services";
import { ITableColumn } from "../table";

import { useState } from "react";
import { Button, Dropdown, InputField, ModalOverlay } from "@/components";

const StatusCell = ({ row }: { row: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [currentStatus, setCurrentStatus] = useState(row.status || "pending");

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Approve", value: "approve" },
    { label: "Not Approve", value: "not_approve" },
  ];

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);

    if (newStatus === "approve" || newStatus === "not_approve") {
      setIsModalOpen(true);
    } else {
      // Update directly for pending
      updateStatus(row, newStatus, "");
    }
  };

  const handleSubmit = () => {
    updateStatus(row, currentStatus, remark);
    setIsModalOpen(false);
    setRemark("");
  };

  const handleCancel = () => {
    setCurrentStatus("pending");
    updateStatus(row, "pending", "");
    setIsModalOpen(false);
    setRemark("");
  };

  const updateStatus = (rowData: any, status: string, remark: string) => {
    console.log("Status updated:", {
      staffId: rowData.staffId,
      status,
      remark,
    });
    // API call here
  };

  return (
    <>
      <Dropdown
        options={statusOptions}
        value={currentStatus}
        onChange={handleStatusChange}
        dropdownWidth="w-40"
      />

      <ModalOverlay
        isOpen={isModalOpen}
        onClose={handleCancel}
        modalTitle={`Status Change - ${row.staff_name}`}
        modalClassName="w-[24rem]"
      >
        <div className=" flex flex-col gap-6 p-4">
          <InputField label="Remark" placeholder="Fill Remark Here" />

          <div className="flex justify-between gap-5">
            <Button
              title="Cancel"
              variant="primary-outline"
              onClick={handleCancel}
            />

            <Button title="Submit" onClick={handleSubmit} />
          </div>
        </div>
      </ModalOverlay>
    </>
  );
};

export const leavesListColumn: ITableColumn<
  ILeaves & { staff_name: string }
>[] = [
  {
    header: "STAFF ID",
    accessor: "staffId",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "STAFF NAME",
    accessor: "staff_name",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "STATUS",
    accessor: "status",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
    cell: (row) => <StatusCell row={row} />,
  },
];
