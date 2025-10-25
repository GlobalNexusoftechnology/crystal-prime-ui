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
      modalClassName="w-full md:w-[70vw] lg:w-[60vw] xl:w-[50vw] "
    >
      <div
        className="overflow-y-auto max-h-[80vh] space-y-4"
        ref={containerRef}
      >
        {/* Lead Info Header */}
        <div className="flex flex-col gap-4  bg-white rounded-lg  p-4  border  border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col">
              <p className=" text-[1rem] ">First Name</p>
              <p className="underline underline-offset-2  text-textColor text-[1.1rem]  capitalize">
                {data.first_name || "N/A"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className=" text-[1rem] ">Last Name</p>
              <p className="underline underline-offset-2  text-textColor text-[1.1rem]  capitalize">
                {data.last_name || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2  mt-4 text-[1rem]  text-gray-600">
            <Link
              href={`tel:${data.phone}`}
              className="flex items-center gap-2  text-[1rem] "
            >
              <PhoneIcon className="h-6 w-6  " />
              <p className="underline underline-offset-2  text-textColor text-[1rem] ">
                {data.phone || "N/A"}
              </p>
            </Link>
            <Link
              href={`mailto:${data.email || ""}`}
              className="flex items-start gap-2  text-[1rem] "
            >
              <MailIcon className="h-6 w-6   mt-1" />
              <div className="flex flex-col">
                <p className="underline underline-offset-2  text-textColor text-[1rem] ">
                  {String(data.email || "").trim() || "N/A"}
                </p>
              </div>
            </Link>
          </div>
        </div>
        {/* Lead Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-gray-200 p-4  rounded-lg  text-[1rem]  text-gray-700">
          <div className="flex flex-col gap-1 ">
            <p className=" text-[0.9rem] ">Created By</p>
            <p className="underline underline-offset-2  text-textColor text-[1rem]  capitalize">
              {data.created_by || "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className=" text-[0.9rem] ">Created At</p>
            <p className=" text-textColor text-[1rem] ">
              {formatIndiaTime(data.created_at, "toReadable")}
            </p>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className=" text-[0.9rem] ">Location</p>
            <p className=" text-textColor text-[1rem]  capitalize">
              {data?.location || "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="text-[0.9rem] ">Updated By</p>
            <p className="underline underline-offset-2  text-textColor text-[1rem]  capitalize">
              {data.updated_by || "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="text-[0.9rem] ">Updated At</p>
            <p className="text-textColor text-[1rem] ">
              {formatIndiaTime(data.updated_at, "toReadable")}
            </p>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="text-[0.9rem] ">Source Name</p>
            <p className="text-textColor text-[1rem]  capitalize">
              {data.source?.name || "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="text-[0.9rem] ">Budget</p>
            <p className="text-textColor text-[1rem]  capitalize">
              {data.budget || "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="text-[0.9rem] ">
              Possibility of Conversion
            </p>
            <p className="text-textColor text-[1rem] ">
              {data.possibility_of_conversion
                ? `${data.possibility_of_conversion}%`
                : "Not specified"}
            </p>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="text-[0.9rem] ">Other Contact</p>
            <p className="text-textColor text-[1rem]  capitalize">
              {data?.other_contact || "N/A"}
            </p>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="text-[0.9rem] ">Assigned To</p>
            <div className="flex gap-2  items-center">
              <p
                className="flex items-center justify-center p-2  w-10 h-10   text-white text-[0.9rem]   rounded-full"
                style={{
                  backgroundColor: getRandomColor(
                    `${data.assignedTo.first_name}${data.assignedTo.last_name}`
                  ),
                }}
              >
                {getInitials(data.assignedTo.first_name)}
                {getInitials(data.assignedTo.last_name)}
              </p>
              <p className="underline underline-offset-2  font-medium text-textColor text-[1rem]  capitalize">
                {data?.assignedTo?.first_name || "N/A"} {data?.assignedTo?.last_name || ""}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 ">
            <p className="text-[0.9rem] ">Type Name</p>
            <p className="text-textColor text-[1rem]  capitalize">
              {data.type?.name || "N/A"}
            </p>
          </div>
          <div className="flex flex-col justify-center relative group">
            <Link
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3VCLODb2NPMj0903NYc27RodmYGwV8ZQDRVkcjv5-gEaLYHkiH5OOXEz0AiLwXXEhP_NjvauEi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20  "
            >
              <Image
                src={ImageRegistry.googleCalendarIcon}
                alt="Google Calendar"
                className="w-full h-full"
              />
            </Link>
            {/* Tooltip */}
            <div className="absolute bottom-full bg-black text-white text-xs  px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              Schedule Meeting
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4  p-4  bg-white border  rounded-xl ">
          {/* Tabs */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {tabs?.length > 0 && tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-2   font-medium text-[1rem]  ${
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
              className="flex items-center gap-2  text-primary text-[1rem] "
            >
              {showForm ? (
                <IoMdCloseCircleOutline className="w-5 h-5  " />
              ) : (
                <FiPlusSquare className="w-5 h-5  " />
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
