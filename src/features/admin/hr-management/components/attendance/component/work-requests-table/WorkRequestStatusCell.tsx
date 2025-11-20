"use client";
import { useState } from "react";
import { Button, Dropdown, InputField, ModalOverlay } from "@/components";
import { useUpdateWorkRequestStatusMutation, IWorkRequest } from "@/services";
import toast from "react-hot-toast";

interface WorkRequestStatusCellProps {
  row: IWorkRequest;
}

export function WorkRequestStatusCell({ row }: WorkRequestStatusCellProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminRemark, setAdminRemark] = useState("");
  const [nextStatus, setNextStatus] = useState<"Approved" | "Rejected" | null>(null);

  const { updateWorkRequestStatus, isPending } = useUpdateWorkRequestStatusMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message || "Status updated successfully");
      setIsModalOpen(false);
      setAdminRemark("");
      setNextStatus(null);
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to update status");
    },
  });

  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
  ];

  const handleStatusChange = (val: string) => {
    const newStatus = val as "Approved" | "Rejected" | "Pending";

    // Don't allow changing to Pending
    if (newStatus === "Pending") return;

    // Don't open modal if selecting the same status
    if (newStatus === row.status) return;

    setNextStatus(newStatus);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!nextStatus) return;
    updateWorkRequestStatus({
      id: row.id,
      payload: {
        status: nextStatus,
        adminRemark: adminRemark || undefined,
      },
    });
  };

  const handleCancel = () => {
    setAdminRemark("");
    setIsModalOpen(false);
    setNextStatus(null);
  };

  return (
    <>
      <Dropdown
        options={statusOptions}
        value={row.status}
        onChange={handleStatusChange}
        dropdownWidth="min-w-[140px]"
      />

      <ModalOverlay
        isOpen={isModalOpen}
        onClose={handleCancel}
        modalTitle={`Confirm ${nextStatus}`}
        modalClassName="w-[24rem]"
      >
        <div className="flex">

          <InputField
            label="Remark (Optional)"

            placeholder="Add a remark..."
            value={adminRemark}
            onChange={(e) => setAdminRemark(e.target.value)}
            width="w-full"
          />
        </div>
        <div className="flex flex-col gap-6 p-4">

          <div className="flex justify-end gap-4">
            <Button
              title="Cancel"
              variant="primary-outline"
              onClick={handleCancel}
              disabled={isPending}
            />
            <Button
              title={isPending ? "Updating..." : "Confirm"}
              onClick={handleSubmit}
              disabled={isPending}
            />
          </div>
        </div>
      </ModalOverlay>
    </>
  );
}
