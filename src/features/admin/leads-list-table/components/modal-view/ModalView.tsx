import { InputField, ModalOverlay } from "@/components";
import { ILeadsListProps, ImageRegistry } from "@/constants";
import { PhoneIcon, ThreeIcon } from "@/features/icons";
import { MailIcon } from "@/features/icons/MailIcon";
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
              <p className="font-semibold text-lg text-gray-800">Ajax Stark</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="border border-gray-400 rounded-full p-2 cursor-pointer">
                <ThreeIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4 text-sm text-gray-600">
            <a href="tel:+13853449378" className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5" />
              (385) 344-9378
            </a>
            <a
              href="mailto:Elna.Ferry@hotmail.com"
              className="flex items-center gap-2"
            >
              <MailIcon className="h-5 w-5" />
              Elna.Ferry@hotmail.com
            </a>
          </div>
        </div>

        {/* Lead Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-gray-200 p-4 rounded-lg  text-sm text-gray-700">
          <div>
            <p className="font-medium">Lead Owner</p>
            <p className="font-semibold text-textColor">Nisha Sharma</p>
          </div>
          <div>
            <p className="font-medium">Created on</p>
            <p className="font-semibold text-textColor">20 / 02 / 2024</p>
          </div>
          <div>
            <p className="font-medium">Business Name</p>
            <p className="font-semibold text-textColor">Quigley LLC</p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <select
              defaultValue="initiated"
              className="mt-1 w-fit bg-[#08EA79] text-white px-3 py-1 text-xs rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="initiated">Initiated</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <p className="font-medium">Nature Of Business</p>
            <p className="font-semibold text-textColor">Retail Business</p>
          </div>
          <div>
            <p className="font-medium">Lead Type</p>
            <p className="font-semibold text-textColor">Website</p>
          </div>
          <div>
            <p className="font-medium">City</p>
            <p className="font-semibold text-textColor">Lake Genesisfort</p>
          </div>
          <div>
            <p className="font-medium">Uploaded Document</p>
            <a href="#" className="font-semibold text-blue-600 underline">
              Project Report.pdf
            </a>
          </div>
          <div>
            <p className="font-medium">Assigned To</p>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                RM
              </span>
              <p className="font-semibold text-textColor">Ramesh Gupta</p>
            </div>
          </div>
        </div>

        {/* Notes Section */}

        <div className="bg-white rounded-lg p-4 space-y-4 border border-gray-200 overflow-y-auto max-h-64">
          <p className="font-medium text-gray-700">Notes</p>
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-100 p-3 rounded-md border border-gray-200 space-y-1"
            >
              <p className="text-sm font-semibold text-textColor">
                {note.name}
              </p>
              <p className="text-sm text-gray-700">{note.message}</p>
              <p className="text-xs text-gray-500">{note.timestamp}</p>
            </div>
          ))}
          <div className="pt-2 ">
            <InputField
              placeholder="Enter Comments"
              name="email"
              type="email"
            />
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
