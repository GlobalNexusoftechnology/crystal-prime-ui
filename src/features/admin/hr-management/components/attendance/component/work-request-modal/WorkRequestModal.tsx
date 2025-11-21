import { useState } from "react";
import { Button, CustomDatePicker, Dropdown, ModalOverlay } from "@/components";
import { useCreateWorkRequestMutation, useAllHolidayQuery } from "@/services";
import toast from "react-hot-toast";

interface WorkRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkRequestModal({ isOpen, onClose }: WorkRequestModalProps) {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState<"Weekend" | "Holiday" | "">("");

  const { data: holidays } = useAllHolidayQuery();

  const { onCreateWorkRequest, isPending } = useCreateWorkRequestMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message || "Request submitted successfully");
      handleClose();
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to submit request");
    },
  });

  const handleClose = () => {
    setDate("");
    setReason("");
    setType("");
    onClose();
  };

  const handleSubmit = () => {
    if (!date || !reason || !type) return;
    onCreateWorkRequest({ date, reason, type });
  };

  const isDateSelectable = (d: Date) => {
    // Fix: Use local time components to avoid timezone shifts
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    if (type === "Weekend") {
      // Allow only Sundays (0)
      return d.getDay() === 0;
    }

    if (type === "Holiday") {
      // Allow only dates present in holidays list
      return holidays?.some((h: any) => h.date === dateString) ?? false;
    }

    return true;
  };

  const typeOptions = [
    { label: "Weekend (Sunday)", value: "Weekend" },
    { label: "Holiday", value: "Holiday" },
  ];

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={handleClose}
      modalTitle="Request Work Approval"
      modalClassName="w-[30rem]"
    >
      <div className="flex flex-col gap-6 p-4">
        <Dropdown
          label="Type"
          options={typeOptions}
          value={type}
          onChange={(val) => {
            setType(val as "Weekend" | "Holiday");
            setDate(""); // Reset date when type changes
          }}
          isRequired
        />

        <CustomDatePicker
          label="Date"
          value={date}
          onChange={setDate}
          isRequired
          minDate={new Date().toISOString().split("T")[0]}
          filterDate={isDateSelectable}
          placeholder="dd/mm/yyyy"
        />

        <div className="flex flex-col gap-2">
          <label className="block text-gray-700 font-medium">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px] resize-vertical"
            placeholder="Enter reason for working..."
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            title="Cancel"
            variant="primary-outline"
            onClick={handleClose}
            disabled={isPending}
          />
          <Button
            title={isPending ? "Submitting..." : "Submit"}
            onClick={handleSubmit}
            disabled={isPending || !date || !reason || !type}
          />
        </div>
      </div>
    </ModalOverlay>
  );
}
