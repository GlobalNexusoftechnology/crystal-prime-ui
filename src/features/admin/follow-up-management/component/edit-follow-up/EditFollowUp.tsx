"use client";

import {
  Button,
  DatePicker,
  Dropdown,
  InputField,
  ModalOverlay,
} from "@/components";
import { IFollowUpManagementListProps } from "@/constants";

import { useState } from "react";

interface IEditFollowUpProps {
  followUp: IFollowUpManagementListProps;
  onClose: () => void;
}

export function EditFollowUp({ onClose }: IEditFollowUpProps) {
  //   const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState("");

  const [assignedTo, setAssignedTo] = useState("");
  const [lead, setLead] = useState("");
  const [selectTo, setSelectTo] = useState("");
  const [remark, setRemark] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const leadOptions = ["Lead 1", "Lead 2"];
  const assignedToOptions = ["User 1", "User 2"];
  const documentOptions = ["Document 1", "Document 2"];

  return (
    <ModalOverlay isOpen={true} onClose={onClose}>
      <form className="bg-white p-6 rounded-lg overflow-y-auto max-h-[80vh] md:h-[27rem] h-[24rem] space-y-4 md:w-[27rem] 2xl:w-[49vw] 2xl:h-[26vw] border border-gray-300">
        <h2 className="text-[1rem] 2xl:text-[1.5vw] font-semibold mb-2">
          Follow Up Information
        </h2>

        <Dropdown
          label="Select Lead"
          options={leadOptions}
          value={lead}
          onChange={setLead}
          dropdownWidth="w-full"
        />

        <Dropdown
          label="Assigned To"
          options={assignedToOptions}
          value={assignedTo}
          onChange={setAssignedTo}
          dropdownWidth="w-full"
        />

        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Renewal Date"
            value={renewalDate}
            onChange={setRenewalDate}
            placeholder="Select Date"
          />

          <DatePicker
            label="Follow Up Date"
            value={followUpDate}
            onChange={setFollowUpDate}
            placeholder="Select Date"
          />
        </div>

        <div>
          <label className="block text-[1rem] 2xl:text-[1vw] font-medium">
            Remark
          </label>
          <InputField
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Description"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <Dropdown
          label="Select Document"
          options={documentOptions}
          value={selectTo}
          onChange={setSelectTo}
          dropdownWidth="w-full"
        />
      </form>
      <div className="flex justify-end pt-4 gap-5">
        <Button title="Cancel" variant="primary-outline" type="button" />
        <Button title="Add Lead" />
      </div>
    </ModalOverlay>
  );
}
