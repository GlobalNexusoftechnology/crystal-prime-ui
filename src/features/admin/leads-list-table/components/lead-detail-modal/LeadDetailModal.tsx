"use client";
import { ModalOverlay } from "@/components";
import {
  ILeadsListDetailsProps,
  ILeadsListProps,
  ImageRegistry,
} from "@/constants";
import { PhoneIcon, ThreeIcon, MailIcon } from "@/features";
import { getInitials } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Attachments, Followups, StatusHistory } from "./components";

interface LeadDetailsModalProps {
  lead: ILeadsListProps;
  onClose: () => void;
  data: ILeadsListDetailsProps;
}

const tabs = ["Followups", "Attachment", "Status History"];

export function LeadDetailModal({ onClose, data }: LeadDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("Followups");
  const [showForm, setShowForm] = useState(false);

  return (
    <ModalOverlay isOpen={true} onClose={onClose} modalClassName="2xl:w-[40vw]">
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        {/* Lead Info Header */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src={ImageRegistry.ajaxstar}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="font-semibold text-[1rem] 2xl:text-[1vw] text-gray-800">
                {data.first_name} {data.last_name}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="border border-gray-400 rounded-full p-2 cursor-pointer">
                <ThreeIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4 text-[1rem] 2xl:text-[1vw] text-gray-600">
            <a
              href="tel:+13853449378"
              className="flex items-center gap-2 text-[1rem] 2xl:text-[1vw]"
            >
              <PhoneIcon className="h-5 w-5" />
              {data.phone}
            </a>
            <a
              href="mailto:Elna.Ferry@hotmail.com"
              className="flex items-center gap-2 text-[1rem] 2xl:text-[1vw]"
            >
              <MailIcon className="h-5 w-5" />
              {data.email}
            </a>
          </div>
        </div>

        {/* Lead Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-gray-200 p-4 rounded-lg  text-[1rem] 2xl:text-[1vw] text-gray-700">
          <div>
            <p className="font-medium text-[1rem] 2xl:text-[1vw]">Lead Owner</p>
            <p className="font-semibold text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.first_name} {data.last_name}
            </p>
          </div>
          <div>
            <p className="font-medium text-[1rem] 2xl:text-[1vw]">Created on</p>
            <p className="font-semibold text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.assignedTo.first_name}{data.assignedTo.last_name}
            </p>
          </div>
          <div>
            <p className="font-medium text-[1rem] 2xl:text-[1vw]">Company</p>
            <p className="font-semibold text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.company}
            </p>
          </div>
          <div>
            <p className="font-medium text-[1rem] 2xl:text-[1vw]">Status</p>
            <select
              defaultValue="initiated"
              className="mt-1 w-fit bg-lightGreen text-white px-3 py-1 text-xs rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="initiated">Initiated</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <p className="font-medium text-[1rem] 2xl:text-[1vw]">
              Nature Of Business
            </p>
            <p className="font-semibold text-textColor text-[1rem] 2xl:text-[1vw]">
              Retail Business
            </p>
          </div>
          <div>
            <p className="font-medium text-[1rem] 2xl:text-[1vw]">Lead Type</p>
            <p className="font-semibold text-textColor text-[1rem] 2xl:text-[1vw]">
              Website
            </p>
          </div>
          <div>
            <p className="font-medium text-[1rem] 2xl:text-[1vw]">Location</p>
            <p className="font-semibold text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.location}
            </p>
          </div>
          <div>
            <p className="font-medium text-[1rem] 2xl:text-[1vw]">
              Uploaded Document
            </p>
            <a
              href="#"
              className="font-semibold text-blue-600 underline text-[1rem] 2xl:text-[1vw]"
            >
              Project Report.pdf
            </a>
          </div>
          <div>
            <p className="font-medium text-[1rem] 2xl:text-[1vw]">
              Assigned To
            </p>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-[1rem] 2xl:text-[1vw] font-medium">
                {getInitials(data.assignedTo.first_name)} {getInitials(data.assignedTo.last_name)}
              </span>
              <p className="font-semibold text-textColor text-[1rem] 2xl:text-[1vw]">
                {data.assignedTo.first_name} {data.assignedTo.last_name}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 2xl:gap-[1vw] p-4 2xl:px-[1vw] bg-white border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
          {/* Tabs */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500"
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setShowForm(false); // Reset form on tab switch
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 text-primary"
            >
              {showForm ? (
                <IoMdCloseCircleOutline className="w-5 h-5" />
              ) : (
                <FiPlusSquare className="w-5 h-5" />
              )}
              <span>{showForm ? "Close" : "Add"}</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div>
            {activeTab === "Followups" && <Followups showForm={showForm} setShowForm={setShowForm}/>}
            {activeTab === "Attachment" && <Attachments showForm={showForm} setShowForm={setShowForm}/>}
            {activeTab === "Status History" && <StatusHistory showForm={showForm} setShowForm={setShowForm}/>}
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
