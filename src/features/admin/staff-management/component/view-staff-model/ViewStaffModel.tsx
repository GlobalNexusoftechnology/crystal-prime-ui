import { ModalOverlay } from "@/components";
import { IUserViewDetails } from "@/services";
import { formatDate, formatDateToDDMMYYYY } from "@/utils";
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
  const dob = selectStaff && formatDateToDDMMYYYY(selectStaff?.dob);

  return (
    <div>
      <ModalOverlay
        modalTitle="Back to Staff"
        isOpen={isOpen}
        onClose={onClose}
        modalClassName="w-full md:w-[76%] lg:w-[66%] xl:w-[44%] "
      >
        <form className="flex flex-col justify-between gap-4  p-4 rounded-xl ">
          <div className="bg-white flex flex-col gap-8  p-4  border border-gray-300  rounded-lg ">
            <div className="flex flex-col md:flex-row gap-1 justify-between ">
              <div className="flex flex-col gap-1 ">
                <span className="text-[0.9rem]  text-gray-600">
                  First Name
                </span>
                <span className="underline text-[1rem]  ">
                  {selectStaff?.first_name}
                </span>
              </div>
              <div className="flex flex-col gap-1 ">
                <span className="text-[0.9rem]  text-gray-600">
                  Last Name
                </span>
                <span className="underline text-[1rem]  ">
                  {selectStaff?.last_name}
                </span>
              </div>  
            </div>
            <div className="flex flex-col gap-4 md:flex-row justify-between md:gap-1 ">
              {/* Contact Info */}
              <div className="flex items-center gap-2  ">
                <Phone className="h-6 w-6   text-blue-700" />
                <span className="underline text-[1rem]  ">
                  {selectStaff?.phone_number}
                </span>
              </div>
              <div className="flex items-center gap-2  ">
                <Mail className="h-6 w-6   text-blue-700" />
                <span className="underline text-[1rem]  ">
                  {selectStaff?.email}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col gap-4  p-4  border border-gray-300  rounded-lg ">
            <div className="flex flex-col gap-3 md:flex-row md:gap-1 justify-between ">
              <div className="flex flex-col ">
                <span className="text-[0.9rem]  text-gray-600">
                  DOB
                </span>
                <span className=" text-[1rem] ">{dob}</span>
              </div>
              <div className="flex flex-col gap-1 ">
                <span className="text-[0.9rem]  text-gray-600">
                  Created At
                </span>
                <span className=" text-[1rem] ">
                  {formatDate(`${selectStaff?.created_at}`)}
                </span>
              </div>

              <div className="flex flex-col gap-1 ">
                <span className="text-[0.9rem]  text-gray-600">
                  Role Name
                </span>
                <span className=" text-[1rem] ">
                  {selectStaff?.role}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 ">
              <span className="text-[0.9rem]  text-gray-600">
                Updated At
              </span>
              <span className=" text-[1rem] ">
                {formatDate(`${selectStaff?.updated_at}`)}
              </span>
            </div>
          </div>
        </form>
      </ModalOverlay>
    </div>
  );
};
