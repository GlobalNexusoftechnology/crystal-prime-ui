"use client";
import { ModalOverlay } from "@/components";
import { ILeadsListDetailsProps, ILeadsListProps } from "@/constants";
import { PhoneIcon, ThreeIcon, MailIcon } from "@/features";
// import { getInitials } from "@/utils";
import { useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Attachments, Followups, StatusHistory } from "./components";
import Link from "next/link";
import { formatDate, getInitials } from "@/utils";

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
        <div className="flex flex-col gap-4 2xl:gap-[1vw] bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className=" text-[1rem] 2xl:text-[1vw]">First Name</p>
              <p className="underline text-textColor text-[1.1rem] 2xl:text-[1.1vw]">
                {data.first_name}
              </p>
            </div>
            <div className="flex flex-col">
              <p className=" text-[1rem] 2xl:text-[1vw]">Last Name</p>
              <p className="underline text-textColor text-[1.1rem] 2xl:text-[1.1vw]">
                {data.last_name}
              </p>
            </div>

            <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <div className="border border-gray-400 rounded-full p-2 2xl:p-[0.5vw] cursor-pointer flex items-center">
                <ThreeIcon className="h-5 w-5 2xl:h-[1.5vw] 2xl:w-[1.5vw] text-gray-600 " />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 2xl:gap-[0.5vw] mt-4 text-[1rem] 2xl:text-[1vw] text-gray-600">
            <Link
              href="tel:+13853449378"
              className="flex items-center gap-2 2xl:gap-[0.5vw] text-[1rem] 2xl:text-[1vw]"
            >
              <PhoneIcon className="h-6 w-6 2xl:h-[1.5vw] 2xl:w-[1.5vw]" />
              <p className="underline text-textColor text-[1rem] 2xl:text-[1vw]">
                {data.phone}
              </p>
            </Link>
            <Link
              href="mailto:Elna.Ferry@hotmail.com"
              className="flex items-center gap-2 2xl:gap-[0.5vw] text-[1rem] 2xl:text-[1vw]"
            >
              <MailIcon className="h-6 w-6 2xl:h-[1.5vw] 2xl:w-[1.5vw]" />
              <p className="underline text-textColor text-[1rem] 2xl:text-[1vw]">
                {data.email}
              </p>
            </Link>
          </div>
        </div>

        {/* Lead Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-gray-200 p-4 rounded-lg  text-[1rem] 2xl:text-[1vw] text-gray-700">
          <div>
            <p className=" text-sm 2xl:text-[0.875vw]">Created By</p>
            <p className="underline text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.first_name} {data.last_name}
            </p>
          </div>
          <div>
            <p className=" text-sm 2xl:text-[0.875vw]">Created At</p>
            <p className=" text-textColor text-[1rem] 2xl:text-[1vw]">
              {formatDate(`${data?.created_at}`)}
            </p>
          </div>
          <div>
            <p className=" text-sm 2xl:text-[0.875vw]">Location</p>
            <p className=" text-textColor text-[1rem] 2xl:text-[1vw]">
              {data?.location}
            </p>
          </div>
          <div>
            <p className="text-sm 2xl:text-[0.875vw]">Updated By</p>
            <p className="underline text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.first_name} {data.first_name}
            </p>
          </div>
          <div>
            <p className="text-sm 2xl:text-[0.875vw]">Updated At</p>
            <p className="text-textColor text-[1rem] 2xl:text-[1vw]">
              {formatDate(`${data?.updated_at}`)}
            </p>
          </div>
          <div>
            <p className="text-sm 2xl:text-[0.875vw]">Source Name</p>
            <p className="text-textColor text-[1rem] 2xl:text-[1vw]">{data.source.name}</p>
          </div>
          <div>
            <p className="text-sm 2xl:text-[0.875vw]">Budget</p>
            <p className="text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.budget}
            </p>
          </div>
          <div>
            <p className="text-sm 2xl:text-[0.875vw]">Assigned To</p>
            <div className="flex gap-2 2xl:gap-[0.5vw] items-center">
              <p>{getInitials(data.assignedTo.first_name)}{getInitials(data.assignedTo.last_name)}</p>
              <p className="underline font-medium text-textColor text-[1rem] 2xl:text-[1vw]">
                {data?.assignedTo?.first_name} {data?.assignedTo?.last_name}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm 2xl:text-[0.875vw]">Deleted At</p>
            <p className="underline text-textColor text-[1rem] 2xl:text-[1vw]">
              {formatDate(`${data?.deleted_at}`)}
            </p>
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
                    setShowForm(false);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 2xl:gap-[0.5vw] text-primary"
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
            {activeTab === "Followups" && (
              <Followups
                leadId={data.id}
                showForm={showForm}
                setShowForm={setShowForm}
              />
            )}
            {activeTab === "Attachment" && (
              <Attachments showForm={showForm} setShowForm={setShowForm} />
            )}
            {activeTab === "Status History" && (
              <StatusHistory
                leadId={data.id}
                showForm={showForm}
                setShowForm={setShowForm}
              />
            )}
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
