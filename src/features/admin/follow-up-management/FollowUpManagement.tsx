"use client";

import { Button, DatePicker, Dropdown, InputField, ModalOverlay } from "@/components";
import { useState } from "react";
import { analyticalCards } from "@/constants";
import { AnalyticalCard } from "../analytical-card";
import { FollowUpManagementListTable } from "./component";

export function FollowUpManagement() {
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [lead, setLead] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [selectTo, setSelectTo] = useState("");
  const [remark, setRemark] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const leadOptions = [
    { label: "Lead 1", value: "Lead 1" },
    { label: "Lead 2", value: "Lead 2" },
  ];

  const assignedToOptions = [
    { label: "User 1", value: "User 1" },
    { label: "User 2", value: "User 2" },
  ];

  const documentOptions = [
    { label: "Document 1", value: "Document 1" },
    { label: "Document 2", value: "Document 2" },
  ];

  return (
    <section className="flex flex-col gap-6 md:gap-8 2xl:gap-[2.5vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
      {/* Header */}
      <div className="flex flex-col gap-2 2xl:gap-[0.5vw] px-4 2xl:px-[1vw]">
        <h1 className="text-[1rem] 2xl:text-[5vw] font-medium">
          Follow Up Management
        </h1>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-4 2xl:gap-[1vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 2xl:gap-[1vw] flex-wrap px-4 2xl:px-[1vw]">
          {analyticalCards.slice(0, 4).map((card, index) => (
            <AnalyticalCard key={index} data={card} />
          ))}
        </div>

        <FollowUpManagementListTable
          setIsFollowUpModalOpen={setIsFollowUpModalOpen}
        />
      </div>

      {/* Modal */}
      <ModalOverlay
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        modalClassName="w-[29rem] md:h-[32rem]  2xl:w-[50vw] 2xl:h-[32vw]"
      >
        <form className="bg-white p-6 rounded-lg overflow-y-auto max-h-[80vh] md:h-[25rem] h-[24rem] space-y-4 md:w-[27rem] 2xl:w-[49vw] 2xl:h-[26vw] border border-gray-300">
          <h2 className="text-[1rem] 2xl:text-[1.5vw] font-semibold mb-2">Follow Up Information</h2>

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
            <label className="block text-[1rem] 2xl:text-[1vw] font-medium">Remark</label>
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
    </section>
  );
}
