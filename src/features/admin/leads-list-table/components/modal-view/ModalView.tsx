import { ModalOverlay } from "@/components";
import { ILeadsListProps, ImageRegistry } from "@/constants";
import { Mail, Phone, MoreVertical } from "lucide-react";
import Image from "next/image";

const notes = [
  {
    id: 1,
    name: "Nisha Sharma",
    message:
      "Followed up via WhatsApp. Awaiting response regarding package details.",
    timestamp: "20/02/2024 10:24 AM",
  },
  {
    id: 2,
    name: "Nisha Sharma",
    message:
      "Followed up via WhatsApp. Awaiting response regarding package details.",
    timestamp: "20/02/2024 10:24 AM",
  },
];

interface LeadDetailsModalProps {
  lead: ILeadsListProps;
  onClose: () => void;
}

export function ModalView({ onClose }: LeadDetailsModalProps) {
  return (
    <ModalOverlay isOpen={true} onClose={onClose}>
      <div className="p-4 bg-gray-50 md:p-6 overflow-y-auto max-h-[90vh]">
        {/* Lead Information Section */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-4 items-center">
                <Image
                  src={ImageRegistry.ajaxstar}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <p className="font-medium text-lg">Ajax Stark</p>
              </div>

              <div className="border border-gray-300 rounded-full p-2 cursor-pointer">
                <MoreVertical className="text-gray-500 h-5 w-5" />
              </div>
            </div>

            <div className="flex justify-between sm:flex-row sm:gap-4 text-sm text-[#252F4A] ">
              <a href="tel:+13853449378" className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-[#054B9E]" /> (385) 344-9378
              </a>
              <a
                href="mailto:Elna.Ferry@hotmail.com"
                className="flex items-center gap-1"
              >
                <Mail className="h-4 w-4 text-[#054B9E]" />
                Elna.Ferry@hotmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-3 shadow-md text-sm text-gray-700 bg-white border border-gray-200 p-4 rounded-lg">
          <div>
            <p className="font-medium">Lead Owner</p>
            <p className=" text-[#252F4A] font-semibold">Nisha Sharma</p>
          </div>
          <div>
            <p className="font-medium">Created on</p>
            <p className=" text-[#252F4A] font-semibold">20 / 02 / 2024</p>
          </div>
          <div>
            <p className="font-medium">Business Name</p>
            <p className=" text-[#252F4A] font-semibold">Quigley LLC</p>
          </div>
          <div>
            <p className="font-medium mb-1">Status</p>
            <select
              className="inline-flex items-center px-2 py-1 bg-[#08EA79] 
 text-white rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-300  "
              defaultValue="initiated"
            >
              <option value="initiated">Initiated</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <p className="font-medium">Nature Of Business</p>
            <p className=" text-[#252F4A] font-semibold">Retail Business</p>
          </div>
          <div>
            <p className="font-medium">Lead Type</p>
            <p className=" text-[#252F4A] font-semibold">Website</p>
          </div>
          <div>
            <p className="font-medium">City</p>
            <p className=" text-[#252F4A] font-semibold">Lake Genesisfort</p>
          </div>
          <div>
            <p className="font-medium">Uploaded Document</p>
            <a href="#" className=" text-[#252F4A] font-semibold">
              Project Report.pdf
            </a>
          </div>
          <div>
            <p className="font-medium">Assigned To</p>
            <p className="flex items-center gap-1 text-[#252F4A] font-semibold">
              <span className="bg-blue-500 rounded-full px-2 py-1 text-md text-white font-medium">
                RM
              </span>
              Ramesh Gupta
            </p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
          <p className="font-medium text-gray-700">Notes</p>
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-100 p-3 rounded-md border border-gray-100"
            >
              <p className="text-sm font-semibold text-[#252F4A] border-b border-[#252F4A] inline-block">
                {note.name}
              </p>
              <p className="text-[1rem] 2xl:text-[1vw] from-neutral-400 text-black mt-1">
                {note.message}
              </p>
              <p className="text-sm font-semibold text-[#252F4A] border-b border-[#252F4A] inline-block">
                {note.timestamp}
              </p>
            </div>
          ))}

          {/* Add Note Input */}
          <div className="pt-2 space-y-2">
            <textarea
              placeholder="Enter Comments"
              className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition">
              Add Note
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
