import {
  Button,
  DatePicker,
  Dropdown,
  InputField,
  ModalOverlay,
} from "@/components";
import { DetailedProject } from "@/constants/tables/project-management-list";

import { useState } from "react";

interface IEditProjectProps {
  project: DetailedProject;
  onClose: () => void;
}

export function ProjectEdit({ onClose }: IEditProjectProps) {
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
    <ModalOverlay
      modalTitle="Back to Leads"
      isOpen={true}
      onClose={onClose} 
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
        <Button
          title="Cancel"
          variant="primary-outline"
          type="button"
          onClick={onClose}
        />
        <Button title="Add Lead" />
      </div>
    </ModalOverlay>
  );
}
