"use client";
import { ModalOverlay } from "@/components";
import {
  ILeadsListDetailsProps,
  ILeadsListProps,
  ImageRegistry,
} from "@/constants";
import { PhoneIcon, MailIcon } from "@/features";
import { useEffect, useRef, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Attachments, Followups, StatusHistory } from "./components";
import Link from "next/link";
import { formatIndiaTime, getInitials, getRandomColor } from "@/utils";
import Image from "next/image";

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
      modalClassName="w-full md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[52vw]"
    >
      <div
        className="overflow-y-auto max-h-[80vh] space-y-4"
        ref={containerRef}
      >
        {/* Lead Info Header */}
        <div className="flex flex-col gap-4 2xl:gap-[1vw] bg-white rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col">
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
              href={`mailto:${
                Array.isArray(data.email) ? data.email[0] : data.email
              }`}
              className="flex items-start gap-2 2xl:gap-[0.5vw] text-[1rem] 2xl:text-[1vw]"
            >
              <MailIcon className="h-6 w-6 2xl:h-[1.5vw] 2xl:w-[1.5vw] mt-1" />
              <div className="flex flex-col">
                {data?.email ? (
                  Array.isArray(data?.email[0]) &&
                  data?.email[0].map((email: string, index: number) => (
                    <div
                      key={index}
                      className="underline underline-offset-2 2xl:underline-offset-4 text-textColor text-[1rem] 2xl:text-[1vw] mb-2"
                    >
                      <p>{String(email).trim()}</p>
                    </div>
                  ))
                ) : (
                  <p className="underline underline-offset-2 2xl:underline-offset-4 text-textColor text-[1rem] 2xl:text-[1vw]">
                    {String(data.email || "").trim()}
                  </p>
                )}
              </div>
            </Link>
          </div>
        </div>
        {/* Lead Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-gray-200 p-4 2xl:p-[1vw] rounded-lg 2xl:rounded-[0.5vw] text-[1rem] 2xl:text-[1vw] text-gray-700">
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className=" text-sm 2xl:text-[0.875vw]">Created By</p>
            <p className="underline underline-offset-2 2xl:underline-offset-4 text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.created_by}
            </p>
          </div>
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className=" text-sm 2xl:text-[0.875vw]">Created At</p>
            <p className=" text-textColor text-[1rem] 2xl:text-[1vw]">
              {formatIndiaTime(data.created_at, "toReadable")}
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
              {data.updated_by}
            </p>
          </div>
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className="text-sm 2xl:text-[0.875vw]">Updated At</p>
            <p className="text-textColor text-[1rem] 2xl:text-[1vw]">
              {formatIndiaTime(data.updated_at, "toReadable")}
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
            <p className="text-sm 2xl:text-[0.875vw]">Other Contact</p>
            <p className="text-textColor text-[1rem] 2xl:text-[1vw]">
              {data?.other_contact}
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
          <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
            <p className="text-sm 2xl:text-[0.875vw]">Type Name</p>
            <p className="text-textColor text-[1rem] 2xl:text-[1vw]">
              {data.type.name}
            </p>
          </div>
          <div className="flex flex-col justify-center relative group">
            <Link
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3VCLODb2NPMj0903NYc27RodmYGwV8ZQDRVkcjv5-gEaLYHkiH5OOXEz0AiLwXXEhP_NjvauEi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20 2xl:w-[5vw] 2xl:h-[5vw]"
            >
              <Image
                src={ImageRegistry.googleCalendarIcon}
                alt="Google Calendar"
                className="w-full h-full"
              />
            </Link>
            {/* Tooltip */}
            <div className="absolute bottom-full bg-black text-white text-xs 2xl:text-[0.7vw] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              Schedule Meeting
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
