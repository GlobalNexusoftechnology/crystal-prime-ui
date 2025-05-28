"use client";
import { ModalOverlay } from "@/components";
import { ILeadsListDetailsProps, ILeadsListProps } from "@/constants";
import { PhoneIcon, MailIcon } from "@/features";
import { useEffect, useRef, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Attachments, Followups, StatusHistory } from "./components";
import Link from "next/link";
import { formattingDate, getInitials, getRandomColor } from "@/utils";

interface LeadDetailsModalProps {
  lead: ILeadsListProps;
  onClose: () => void;
  data: ILeadsListDetailsProps;
}

const tabs = ["Followups", "Attachment", "Status History"];

export function LeadDetailModal({ onClose, data }: LeadDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("Followups");
  const [showForm, setShowForm] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [showForm]);

  return (
    <ModalOverlay
      modalTitle="Back to Leads"
      isOpen={true}
      onClose={onClose}
      modalClassName="2xl:w-[40vw]"
    >
      <div
        className="overflow-y-auto max-h-[80vh] space-y-4"
        ref={containerRef}
      >
        {/* Lead Info Header */}
        <div className="flex flex-col gap-4 2xl:gap-[1vw] bg-white rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] border-gray-200">
          <div className="flex justify-between items-center">
            <div >
              <p className=" text-[1rem] 2xl:text-[1vw]">First Name</p>
              <p className="underline underline-offset-2 2xl:underline-offset-4 text-textColor text-[1.1rem] 2xl:text-[1.1vw]">
                {data.first_name}
              </p>
            </div>
            <div className="flex flex-col">
              <p className=" text-[1rem] 2xl:text-[1vw]">Last Name</p>
              <p className="underline underline-offset-2 2xl:underline-offset-4 text-textColor text-[1.1rem] 2xl:text-[1.1vw]">
                {data.last_name}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 2xl:gap-[0.5vw] mt-4 text-[1rem] 2xl:text-[1vw] text-gray-600">
            <Link
              href={`tel:${data.phone}`}
              className="flex items-center gap-2 2xl:gap-[0.5vw] text-[1rem] 2xl:text-[1vw]"
            >
              <PhoneIcon className="h-6 w-6 2xl:h-[1.5vw] 2xl:w-[1.5vw]" />
              <p className="underline underline-offset-2 2xl:underline-offset-4 text-textColor text-[1rem] 2xl:text-[1vw]">
                {data.phone}
              </p>
            </Link>
            <Link
              href={`mailto:${data.email}`}
              className="flex items-center gap-2 2xl:gap-[0.5vw] text-[1rem] 2xl:text-[1vw]"
            >
              <MailIcon className="h-6 w-6 2xl:h-[1.5vw] 2xl:w-[1.5vw]" />
              <p className="underline underline-offset-2 2xl:underline-offset-4 text-textColor text-[1rem] 2xl:text-[1vw]">
                {data.email}
              </p>
            </Link>
          </div>
        </div>

        {/* Lead Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-gray-200 p-4 2xl:p-[1vw] rounded-lg 2xl:rounded-[0.5vw] text-[1rem] 2xl:text-[1vw] text-gray-700">
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className=" text-sm 2xl:text-[0.875vw]">Created By</p>
            <p className="underline underline-offset-2 2xl:underline-offset-4 text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.first_name} {data.last_name}
            </p>
          </div>
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className=" text-sm 2xl:text-[0.875vw]">Created At</p>
            <p className=" text-textColor text-[1rem] 2xl:text-[1vw]">
              {formattingDate(data.created_at, "toReadable")}
            </p>
          </div>
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className=" text-sm 2xl:text-[0.875vw]">Location</p>
            <p className=" text-textColor text-[1rem] 2xl:text-[1vw]">
              {data?.location}
            </p>
          </div>
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className="text-sm 2xl:text-[0.875vw]">Updated By</p>
            <p className="underline underline-offset-2 2xl:underline-offset-4 text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.first_name} {data.last_name}
            </p>
          </div>
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className="text-sm 2xl:text-[0.875vw]">Updated At</p>
            <p className="text-textColor text-[1rem] 2xl:text-[1vw]">
              {formattingDate(data.updated_at, "toReadable")}
            </p>
          </div>
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className="text-sm 2xl:text-[0.875vw]">Source Name</p>
            <p className="text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.source.name}
            </p>
          </div>
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className="text-sm 2xl:text-[0.875vw]">Budget</p>
            <p className="text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.budget}
            </p>
          </div>
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className="text-sm 2xl:text-[0.875vw]">Assigned To</p>
            <div className="flex gap-2 2xl:gap-[0.5vw] items-center">
              <p
                className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 h-10 2xl:w-[2.5vw] 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] rounded-full"
                style={{
                  backgroundColor: getRandomColor(
                    `${data.assignedTo.first_name}${data.assignedTo.last_name}`
                  ),
                }}
              >
                {getInitials(data.assignedTo.first_name)}
                {getInitials(data.assignedTo.last_name)}
              </p>
              <p className="underline underline-offset-2 2xl:underline-offset-4 font-medium text-textColor text-[1rem] 2xl:text-[1vw]">
                {data?.assignedTo?.first_name} {data?.assignedTo?.last_name}
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
                  className={`pb-2 2xl:pb-[0.5vw] 2xl:gap-[2vw] font-medium text-[1rem] 2xl:text-[1vw] ${
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
              onClick={() => setShowForm((prev) => !prev)}
              className="flex items-center gap-2 2xl:gap-[0.5vw] text-primary text-[1rem] 2xl:text-[1vw]"
            >
              {showForm ? (
                <IoMdCloseCircleOutline className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
              ) : (
                <FiPlusSquare className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
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
              <Attachments
                leadId={data.id}
                showForm={showForm}
                setShowForm={setShowForm}
              />
            )}
            {activeTab === "Status History" && (
              <StatusHistory
                leadId={data.id}
                showForm={showForm}
                setShowForm={setShowForm}
              />
            )}
          </div>

          <div ref={bottomRef} />
        </div>
      </div>
    </ModalOverlay>
  );
}
