'use client'

import { analyticalCards } from "@/constants";
import { AnalyticalCard } from "../analytical-card";
import { Button, DatePicker, Dropdown, InputField, ModalOverlay } from "@/components";
import { ProjectManagementCard } from "./components";
import { useState } from "react";



export function ProjectManagement() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  // const [lead, setLead] = useState("");

  const [selectTo, setSelectTo] = useState("");
  const [remark, setRemark] = useState("");
  const [projectInformation, setProjectInformation] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");


  const selectToOptions = [
    { label: "User 1", value: "User 1" },
    { label: "User 2", value: "User 2" },
  ];

 

  return (
    <section className="flex flex-col gap-6 md:gap-8 2xl:gap-[2.5vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
      {/* Section Header */}
      <div className="flex flex-col gap-2 2xl:gap-[0.5vw] px-4 2xl:px-[1vw]">
        <h1 className="text-xl 2xl:text-[1.25vw] font-medium">
          Project Management
        </h1>
      </div>

      {/* Summary Cards and Add project Button */}
      <div className="grid grid-cols-1 gap-4 2xl:gap-[1vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 2xl:gap-[1vw] flex-wrap px-4 2xl:px-[1vw]">
          {/* Render up to 4 analytical cards */}
          {analyticalCards.slice(0, 4).map((card, index) => (
            <AnalyticalCard key={index} data={card} />
          ))}

          {/* Button to open modal */}
          <div className="flex flex-col justify-end">
            <Button
              type="button"
              title="Add Project"
              variant="primary-outline"
              onClick={() => setIsAddProjectModalOpen(true)} // 🔑 Modal open trigger
            />
          </div>
        </div>
      </div>

      {/* Project Management Cards */}
      <div className="gap-2 2xl:gap-[0.5vw] px-4 2xl:px-[1vw]">
        <ProjectManagementCard />
      </div>

      {/* Modal */}
      <ModalOverlay
        modalTitle="Back to Leads"
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        modalClassName="w-[20rem] md:w-[34rem] xl:w-[40rem] 2xl:w-[50vw] 2xl:h-[29vw]"
      >
        <form className="bg-white p-6 rounded-lg overflow-y-auto max-h-[80vh] md:h-[25rem] h-[24rem] space-y-4 md:w-[38rem] 2xl:w-[49vw] 2xl:h-[26vw] border border-gray-300">
          <h2 className="text-[1rem] 2xl:text-[1.5vw] font-semibold mb-2">
            Project Information
          </h2>

          <div>
            <label className="block text-[1rem] 2xl:text-[1vw]">
              Project Information
            </label>
            <InputField
              type="text"
              value={projectInformation}
              onChange={(e) => setProjectInformation(e.target.value)}
              placeholder="Description"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <Dropdown
            label="Select Lead"
            options={selectToOptions}
            value={selectTo}
            onChange={setSelectTo}
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
              label="Set Reminder"
              value={followUpDate}
              onChange={setFollowUpDate}
              placeholder="Select Date"
            />
          </div>

          <div>
            <label className="block text-[1rem] 2xl:text-[1vw] font-medium">
              Description
            </label>
            <InputField
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Description"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </form>
        <div className="flex justify-between pt-4 gap-5">
          <Button title="Cancel" variant="primary-outline" type="button"/>
          <Button title="Add Lead" />
        </div>
      </ModalOverlay>
    </section>
  );
}
