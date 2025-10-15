"use client";

import React, { useState } from "react";
import { Dropdown, Button, ModalOverlay } from "@/components";

interface AnnouncementProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Announcement: React.FC<AnnouncementProps> = ({ isOpen, onClose }) => {
  const [selectedUserType, setSelectedUserType] = useState("");

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} modalTitle="Announcements" modalClassName="w-[24rem]">
      <div className="flex flex-col gap-3 p-1">
        <Dropdown
          label="User Type"
          options={[
            { label: "Client", value: "client" },
            { label: "Staff", value: "staff" },
          ]}
          value={selectedUserType}
          onChange={(val: string) => setSelectedUserType(val)}
        />

        <div className="flex flex-col gap-2">
          <label>Message</label>
          <textarea
            className="border px-2 py-1 rounded-md"
            placeholder="Type your message..."
            rows={6}
          />
        </div>

        <div className="w-full flex justify-between gap-4">
          <Button title="Cancel" variant="primary-outline" onClick={onClose} />
          <Button title="Announce" />
        </div>
      </div>
    </ModalOverlay>
  );
};
