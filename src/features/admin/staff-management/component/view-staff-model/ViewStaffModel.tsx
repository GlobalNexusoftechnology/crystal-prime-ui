import { ModalOverlay } from "@/components";
import { ThreeIcon } from "@/features";
import { IUserViewDetails } from "@/services";
import { formatDate, formatDateToMMDDYYYY } from "@/utils";
import { Mail, Phone } from "lucide-react";
import React from "react";

interface ViewStaffModelProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectStaff: IUserViewDetails;
}

export const ViewStaffModel: React.FC<ViewStaffModelProps> = ({
  selectStaff,
  isOpen,
  onClose,
}) => {
  const dob = selectStaff && formatDateToMMDDYYYY(selectStaff?.dob);

  return (
    <div>
      <ModalOverlay
        modalTitle="Back to Staff"
        isOpen={isOpen}
        onClose={onClose}
        modalClassName="w-full md:w-[76%] lg:w-[66%] xl:w-[44%] 2xl:w-[40vw]"
      >
        <form className="flex flex-col justify-between gap-4 2xl:gap-[1vw] p-4 2xl:p-[1vw]rounded-xl 2xl:rounded-[0.75vw]">
          <div className="bg-white flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:p-[1vw] border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw]">
            <div className="flex flex-col md:flex-row gap-1 justify-between 2xl:gap-[0.25vw]">
              <div className="flex flex-col gap-1 2xl:gap-[0.25vw]">
                <span className="text-sm 2xl:text-[0.875vw] text-gray-600">
                  First Name
                </span>
                <span className="underline text-[1rem] 2xl:text-[1vw] ">
                  {selectStaff?.first_name}
                </span>
              </div>
              <div className="flex flex-col gap-1 2xl:gap-[0.25vw]">
                <span className="text-sm 2xl:text-[0.875vw] text-gray-600">
                  Last Name
                </span>
                <span className="underline text-[1rem] 2xl:text-[1vw] ">
                  {selectStaff?.last_name}
                </span>
              </div>
              {/* <div className="flex flex-col gap-1 2xl:gap-[0.25vw]">
                <span className="text-sm 2xl:text-[0.875vw] text-gray-600">
                  ID
                </span>
                <span className="underline text-[1rem] 2xl:text-[1vw] ">
                  {selectStaff?.id}
                </span>
              </div> */}
              <div className="border border-gray-400 2xl:border-[0.1vw] p-2 rounded-full flex items-center justify-center">
                <ThreeIcon className="h-5 w-5 2xl:h-[1.25vw] 2xl:w-[1.25vw] text-gray-600" />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row justify-between md:gap-1 2xl:gap-[0.25vw]">
              {/* Contact Info */}
              <div className="flex items-center gap-2 2xl:gap-[0.5vw] ">
                <Phone className="h-6 w-6 2xl:h-[1.5vw] 2xl:w-[1.5vw] text-blue-700" />
                <span className="underline text-[1rem] 2xl:text-[1vw] ">
                  {selectStaff?.phone_number}
                </span>
              </div>
              <div className="flex items-center gap-2 2xl:gap-[0.5vw] ">
                <Mail className="h-6 w-6 2xl:h-[1.5vw] 2xl:w-[1.5vw] text-blue-700" />
                <span className="underline text-[1rem] 2xl:text-[1vw] ">
                  {selectStaff?.email}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col gap-4 2xl:gap-[1vw] p-4 2xl:p-[1vw] border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw]">
            <div className="flex flex-col gap-3 md:flex-row md:gap-1 justify-between 2xl:gap-[0.25vw]">
              <div className="flex flex-col ">
                <span className="text-sm 2xl:text-[0.875vw] text-gray-600">
                  DOB
                </span>
                <span className=" text-[1rem] 2xl:text-[1vw]">{dob}</span>
              </div>
              <div className="flex flex-col gap-1 2xl:gap-[0.25vw]">
                <span className="text-sm 2xl:text-[0.875vw] text-gray-600">
                  Created At
                </span>
                <span className=" text-[1rem] 2xl:text-[1vw]">
                  {formatDate(`${selectStaff?.created_at}`)}
                </span>
              </div>

              <div className="flex flex-col gap-1 2xl:gap-[0.25vw]">
                <span className="text-sm 2xl:text-[0.875vw] text-gray-600">
                  Role Name
                </span>
                <span className=" text-[1rem] 2xl:text-[1vw]">
                  {selectStaff?.role}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 2xl:gap-[0.25vw]">
              <span className="text-sm 2xl:text-[0.875vw] text-gray-600">
                Updated At
              </span>
              <span className=" text-[1rem] 2xl:text-[1vw]">
                {formatDate(`${selectStaff?.updated_at}`)}
              </span>
            </div>
          </div>
        </form>
      </ModalOverlay>
    </div>
  );
};
