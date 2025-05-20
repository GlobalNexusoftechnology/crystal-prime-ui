"use client";

import { InputField } from "@/components";
import React, { useState } from "react";
// import { BsArrowLeft } from "react-icons/bs";

type NewLeadFormProps = {
  setAddLeadModalOpen: (open: boolean) => void;
};

export function NewLeadForm({ setAddLeadModalOpen }: NewLeadFormProps) {
  const [step, setStep] = useState(1);
  const handleCancel = () => {
    setAddLeadModalOpen(false);
    setStep(1); // reset step if modal reused
  };

  const handleNext = () => {
    // example logic for step advancement
    if (step === 1) {
      setStep(2);
    } else {
      setAddLeadModalOpen(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 ">
      {/* <div className="px-3 py-2 bg-slate-200">
        <p className="flex items-center text-black py-2">
          <BsArrowLeft
            className="text-[1rem] 2xl:text-[1vw] mr-2 cursor-pointer"
            onClick={""}
          />
          Back to Leads
        </p> */}
      <div className="bg-white rounded-md w-[500px] max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Lead Information</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 py-2">
          <InputField
            label="Full Name"
            placeholder="Enter Full Name"
            name="fullName"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 py-2">
          <InputField
            label="Email"
            placeholder="Enter Email"
            name="email"
            type="email"
          />
          <InputField
            label="Mobile No"
            placeholder="Enter Mobile No"
            name="mobile"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 py-2">
          <InputField label="Notes" placeholder="Enter Notes" name="notes" />
        </div>

        <div className="py-2">
          <label className="block 2xl:text-[1vw] text-gray-700 mb-2 2xl:mb-[0.5vw]">
            Assigned To
          </label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>Select Staff</option>
            <option>John Doe</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 py-2 sm:py-4">
          <InputField
            label="Nature Of Business"
            placeholder="Enter Nature Of Business"
            name="natureOfBusiness"
          />
          <InputField
            label="Business Name"
            placeholder="Enter Business Name"
            name="businessName"
          />

          <InputField
            label="City Name"
            placeholder="Enter City Name"
            name="city"
          />
          <InputField label="Status" placeholder="Enter Status" name="status" />
        </div>
        <div className="py-2">
          <label className="block 2xl:text-[1vw] text-gray-700 mb-2 2xl:mb-[0.5vw]">
            Lead Type
          </label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>Select Lead Type</option>
          </select>
        </div>

        <div className="py-2">
          <label className="block 2xl:text-[1vw] text-gray-700 mb-2 2xl:mb-[0.5vw]">
            Upload Document
          </label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>Select Document</option>
          </select>
        </div>

        <div className="col-span-2 flex items-center space-x-2 py-2">
          <input type="checkbox" id="upload" />
          <label htmlFor="upload" className="text-sm">
            Upload Document
          </label>
        </div>

        <div className="flex justify-between mt-6 space-x-4">
          <button
            className="border border-blue-500  px-4 py-2 rounded text-sm bg-white text-blue-600 hover:bg-gray-100"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            onClick={handleNext}
          >
            Add Lead
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}
