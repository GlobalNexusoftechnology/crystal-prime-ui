"use client";
import React, { useState } from "react";
import { ModalOverlay, Button, InputField } from "@/components";

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (remark: string) => void;
  isLoading?: boolean;
}

export function RejectionModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: RejectionModalProps) {
  const [remark, setRemark] = useState("");

  const handleConfirm = () => {
    if (!remark.trim()) {
      return;
    }
    onConfirm(remark.trim());
    setRemark("");
  };

  const handleClose = () => {
    setRemark("");
    onClose();
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={handleClose}
      modalTitle="Reject Proposal"
      modalClassName="w-full md:w-[30vw] "
    >
      <div className="flex flex-col gap-4 border p-4  rounded-md ">
        <div className="text-gray-600 mb-2">
          <p>Please provide a reason for rejecting this proposal:</p>
        </div>
        
        <InputField
          label="Rejection Reason"
          type="textarea"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter rejection reason..."
          required
        />
        
        <div className="flex gap-2 justify-end">
          <Button
            title="Cancel"
            variant="primary-outline"
            onClick={handleClose}
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            disabled={!remark.trim() || isLoading}
            onClick={handleConfirm}
            title={isLoading ? "Rejecting..." : "Reject"}
            variant="primary"
          />
        </div>
      </div>
    </ModalOverlay>
  );
}
