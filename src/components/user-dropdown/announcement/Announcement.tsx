"use client";

import React, { useState } from "react";
import { Dropdown, Button, ModalOverlay } from "@/components";
import { useCreateAnnouncementMutation } from "@/services"; 
import { toast } from "react-hot-toast";

interface AnnouncementProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Announcement: React.FC<AnnouncementProps> = ({ isOpen, onClose }) => {
  const [selectedUserType, setSelectedUserType] = useState("");
  const [message, setMessage] = useState("");

  const { onAnnouncementMutation, isPending } = useCreateAnnouncementMutation({
    onSuccessCallback: (data) => {
      toast.success(data?.message);
      setMessage("");
      setSelectedUserType("");
      onClose();
    },
    onErrorCallback: (error) => {
      toast.success(error?.message || "Failed to create announcement");
    },
  });

  // Handle submit
  const handleAnnounce = () => {
    if (!selectedUserType || !message.trim()) {
      toast.success("Please fill all fields before announcing.");
      return;
    }

    const payload = {
      userType: selectedUserType,
      message: message.trim(),
    };

    onAnnouncementMutation(payload);
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Announcements"
      modalClassName="w-[24rem]"
    >
      <div className="flex flex-col gap-3 p-1">
        {/* User Type Dropdown */}
        <Dropdown
          label="User Type"
          options={[
            { label: "Client", value: "client" },
            { label: "Staff", value: "staff" },
          ]}
          value={selectedUserType}
          onChange={(val: string) => setSelectedUserType(val)}
        />

        {/* Message Input */}
        <div className="flex flex-col gap-2">
          <label>Message</label>
          <textarea
            className="border px-2 py-1 rounded-md"
            placeholder="Type your message..."
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="w-full flex justify-between gap-4">
          <Button
            title="Cancel"
            variant="primary-outline"
            onClick={onClose}
            disabled={isPending}
          />
          <Button
            title={isPending ? "Announcing..." : "Announce"}
            onClick={handleAnnounce}
            disabled={isPending}
          />
        </div>
      </div>
    </ModalOverlay>
  );
};
