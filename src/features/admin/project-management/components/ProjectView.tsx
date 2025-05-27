'use client'

import { ModalOverlay } from "@/components";
import { DetailedProject } from "@/constants/tables/project-management-list";
import { ThreeIcon } from "@/features/icons";

interface IEditProjectProps {
  project: DetailedProject;
  onClose: () => void;
}

const notes = [
  {
    id: 1,

    message:
      "This project involves designing, developing, and delivering a full-stack mobile and web-based e-commerce application for XYZ Pvt. Ltd. The platform will support product listings, cart features, payment gateways, and user management.",
  },
];

export function ProjectView({ onClose }: IEditProjectProps) {
  return (
    <ModalOverlay
      modalTitle="Back to Leads"
      isOpen={true}
      onClose={onClose}
      modalClassName="w-[20rem] md:w-[34rem] xl:w-[40rem] 2xl:w-[50vw] 2xl:h-[29vw]"
    >
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        {/* Modal content here */}
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex gap-[5rem] items-center py-4">
            <div>
              <p className="text-[0.9rem] 2xl:text-[0.9vw]">Project Name</p>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-black  text-[1rem] 2xl:text-[1vw]">
                  E-Commerce App Development
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 py-4">
              <div className="border border-gray-400 rounded-full p-2 cursor-pointer">
                <ThreeIcon className="h-5 w-5 2xl:w-[5vw] 2xl:h-[5rem]  text-gray-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 py-4 gap-4">
            <div>
              <p className="text-[0.9rem] 2xl:text-[0.9vw]">Lead Name</p>
              <p className="font-semibold text-textColor text-[1rem] 2xl:text-[1vw] underline">
                Nisha Sharma
              </p>
            </div>
            <div>
              <p className="text-[0.9rem] 2xl:text-[0.9vw]">Renewal Date</p>
              <p className="font-semibold text-[1rem] 2xl:text-[1vw] text-textColor underline">
                20/02/2022
              </p>
            </div>
            <div>
              <p className="text-[0.9rem] 2xl:text-[0.9vw]">
                Owner Of Follow Up
              </p>
              <p className="font-semibold text-textColor text-[1rem] 2xl:text-[1vw] underline">
                Ajax Stark
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-start md:gap-[14%] lg:gap-[14%] xl:gap-[6.2rem] 2xl:gap-[10vw] space-y-2">
            <div>
              <p className="text-[0.9rem] 2xl:text-[0.9vw]">Renewal Date</p>
              <p className="font-semibold text-[1rem] 2xl:text-[1vw] text-textColor underline">
                20/02/2022
              </p>
            </div>

            <div>
              <p className="text-[0.9rem] 2xl:text-[0.9vw]">Project Status</p>
              <select
                defaultValue="initiated"
                className="mt-1 w-fit bg-blue-600 text-white md:py-1 text-[1rem] 2xl:text-[1vw] rounded-lg font-semibold focus:outline-none"
              >
                <option value="initiated">Open</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Remark Section */}
        <div className="bg-white rounded-lg p-4 space-y-4 border w-[18rem] md:w-[32.5rem] 2xl:w-[49vw] xl:w-[38.5rem] border-gray-200 overflow-y-auto max-h-64">
          <p className="font-medium text-gray-700 text-[1rem] 2xl:text-[1vw]">
            Description
          </p>
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-100 rounded-md border w-[15.9rem] xl:w-[36.3rem] md:w-[30rem] 2xl:w-[47.5vw] border-gray-200 space-y-1 p-2"
            >
              <p className="text-[1rem] 2xl:text-[1vw] text-black text-wrap">
                {note.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ModalOverlay>
  );
}
