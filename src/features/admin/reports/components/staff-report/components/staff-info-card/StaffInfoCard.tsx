import { FiPhone, FiMail } from "react-icons/fi";
import { StaffPerformanceReportResponse } from "@/services";

type StaffInfoCardProps = {
  staffInfo?: StaffPerformanceReportResponse["data"]["staffInfo"];
};

export function StaffInfoCard({ staffInfo }: StaffInfoCardProps) {
  if (!staffInfo) return null;

  return (
    <div className="p-6  border-b border-gray-400 ">
      <h3 className="text-[1.1rem]  font-semibold mb-6  text-[#1a2341]">
        Staff Basic Info
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        {/* First Name */}
        <div className="border border-gray-300  rounded-lg  p-4 ">
          <p className="text-sm  text-gray-500 mb-1">
            First Name
          </p>
          <p className="text-[1rem]  font-medium underline text-[#1a2341]">
            {staffInfo.firstName}
          </p>
        </div>

        {/* Last Name */}
        <div className="border border-gray-300  rounded-lg  p-4 ">
          <p className="text-sm  text-gray-500 mb-1">
            Last Name
          </p>
          <p className="text-[1rem]  font-medium underline text-[#1a2341]">
            {staffInfo.lastName}
          </p>
        </div>

        {/* Phone */}
        <div className="border border-gray-300  rounded-lg  p-4  flex items-center gap-3">
          <FiPhone className="w-5 h-5   text-primary" />
          <a
            href={`tel:${staffInfo.phone}`}
            className="underline text-[1rem]  font-medium text-[#1a2341]"
          >
            {staffInfo.phone}
          </a>
        </div>

        {/* Email */}
        <div className="border border-gray-300  rounded-lg  p-4  flex items-center gap-3">
          <FiMail className="w-5 h-5   text-primary" />
          <a
            href={`mailto:${staffInfo.email}`}
            className="underline text-[1rem]  font-medium text-[#1a2341]"
          >
            {staffInfo.email}
          </a>
        </div>
      </div>
    </div>
  );
}
