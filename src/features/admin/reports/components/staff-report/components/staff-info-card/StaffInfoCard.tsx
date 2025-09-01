import { FiPhone, FiMail } from "react-icons/fi";
import { StaffPerformanceReportResponse } from "@/services";

type StaffInfoCardProps = {
  staffInfo?: StaffPerformanceReportResponse["data"]["staffInfo"];
};

export function StaffInfoCard({ staffInfo }: StaffInfoCardProps) {
  if (!staffInfo) return null;

  return (
    <div className="p-6 2xl:p-[1.5vw] border-b border-gray-400 2xl:border-b-[0.1vw]">
      <h3 className="text-[1.1rem] 2xl:text-[1.1vw] font-semibold mb-6 2xl:mb-[1.5vw] text-[#1a2341]">
        Staff Basic Info
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:gap-[1.25vw]">
        {/* First Name */}
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
          <p className="text-sm 2xl:text-[0.85vw] text-gray-500 mb-1">
            First Name
          </p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium underline text-[#1a2341]">
            {staffInfo.firstName}
          </p>
        </div>

        {/* Last Name */}
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
          <p className="text-sm 2xl:text-[0.85vw] text-gray-500 mb-1">
            Last Name
          </p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium underline text-[#1a2341]">
            {staffInfo.lastName}
          </p>
        </div>

        {/* Phone */}
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] flex items-center gap-3">
          <FiPhone className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw] text-primary" />
          <a
            href={`tel:${staffInfo.phone}`}
            className="underline text-[1rem] 2xl:text-[1vw] font-medium text-[#1a2341]"
          >
            {staffInfo.phone}
          </a>
        </div>

        {/* Email */}
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] flex items-center gap-3">
          <FiMail className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw] text-primary" />
          <a
            href={`mailto:${staffInfo.email}`}
            className="underline text-[1rem] 2xl:text-[1vw] font-medium text-[#1a2341]"
          >
            {staffInfo.email}
          </a>
        </div>
      </div>
    </div>
  );
}
