import { ModalOverlay } from "@/components";
import { IFollowUpManagementListProps } from "@/constants";
import { ThreeIcon } from "@/features/icons";
const notes = [
  {
    id: 1,

    message:
      "This project involves designing, developing, and delivering a full-stack mobile and web-based e-commerce application for XYZ Pvt. Ltd. The platform will support product listings, cart features, payment gateways, and user management.",
  },
];

interface IViewFollowUpProps {
  showFollowUp: IFollowUpManagementListProps;
  onClose: () => void;
}

export function ViewFollowUp({ onClose }: IViewFollowUpProps) {
  return (
    <ModalOverlay
      modalTitle="Back to Follow up"
      isOpen={true}
      onClose={onClose}
      modalClassName="w-[20rem] md:w-[34rem] xl:w-[40rem] 2xl:w-[50vw] 2xl:h-[29vw]"
    >
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        {/* Lead Info Header */}

        {/* Lead Details Grid */}
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex justify-between items-center py-4">
            <div>
              <p className="text-[0.9rem] 2xl:text-[0.9vw]">Assigned To</p>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white p-2 rounded-full text-[1rem] 2xl:text-[1vw] font-medium">
                  RM
                </span>
                <p className="font-semibold text-black  text-[1rem] 2xl:text-[1vw] ">
                  Ramesh Gupta
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 py-4">
              <div className="border border-gray-400 rounded-full p-2 cursor-pointer">
                <ThreeIcon className="h-5 w-5  text-gray-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 py-4 gap-4 ">
            <div>
              <p className=" text-[0.9rem] 2xl:text-[0.9vw]">Lead Name</p>
              <p className="font-semibold text-textColor text-[1rem] 2xl:text-[1vw] underline">
                Nisha Sharma
              </p>
            </div>

            <div>
              <p className=" text-[0.9rem] 2xl:text-[0.9vw]">
                Owner Of Follow Up
              </p>
              <p className="font-semibold text-textColor  text-[1rem] 2xl:text-[1vw] underline">
                Ajax Stark
              </p>
            </div>
            <div>
              <p className="text-[0.9rem] 2xl:text-[0.9vw]">
                Uploaded Document
              </p>
              <a
                href="#"
                className="font-semibold text-textColor  text-[1rem] 2xl:text-[1vw] underline"
              >
                Project Report.pdf
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-start md:gap-[16%] lg:gap-[21%] xl:gap-14 2xl:gap-[8vw] space-y-2">
            <div>
              <p className="text-[0.9rem] 2xl:text-[0.9vw]">Status</p>
              <select
                defaultValue="initiated"
                className="mt-1 w-fit bg-lightYellow text-white px-3 md:py-1 text-[1rem] 2xl:text-[1vw] rounded-lg font-semibold focus:outline-none"
              >
                <option value="initiated">Not Intrested</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="">
              <p className="text-[0.9rem] 2xl:text-[0.9vw]">Follow Up Date</p>
              <p className="font-semibold  text-[1rem] 2xl:text-[1vw] text-textColor  underline">
                20/02/2022
              </p>
            </div>
          </div>
        </div>

        {/* Remark Section */}
        <div className="bg-white rounded-lg p-4 space-y-4 border w-[18rem] md:w-[32.5rem] 2xl:w-[49vw] xl:w-[38.5rem] border-gray-200 overflow-y-auto max-h-64">
          <p className="font-medium text-gray-700  text-[1rem] 2xl:text-[1vw]">
            Remark
          </p>
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-100  rounded-md border w-[15.9rem] xl:w-[36.3rem] md:w-[30rem] 2xl:w-[47.5vw] border-gray-200 space-y-1 p-2"
            >
              <p className=" text-[1rem] 2xl:text-[1vw] text-black text-wrap">
                {note.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ModalOverlay>
  );
}
