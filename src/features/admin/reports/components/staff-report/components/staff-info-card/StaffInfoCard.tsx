import { FiPhone, FiMail } from "react-icons/fi";
import { StaffPerformanceReportResponse } from "@/services";

type StaffInfoCardProps = {
  staffInfo?: StaffPerformanceReportResponse["data"]["staffInfo"];
};

export function StaffInfoCard({ staffInfo }: StaffInfoCardProps) {
  if (!staffInfo) return null;
  return (
    <div className="border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw] font-medium">
        Staff Basic Info
      </h3>
      <div className="flex flex-col gap-6 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">First Name</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              {staffInfo.firstName}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Last Name</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              {staffInfo.lastName}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex items-center gap-2 text-[1rem] 2xl:text-[1vw] text-primary">
            <FiPhone className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
            <a
              href={`tel:${staffInfo.phone}`}
              className="underline text-textColor font-medium"
            >
              {staffInfo.phone}
            </a>
          </div>
          <div className="flex items-center gap-2 text-[1rem] 2xl:text-[1vw] text-primary">
            <FiMail className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
            <a
              href={`mailto:${staffInfo.email}`}
              className="underline text-textColor font-medium"
            >
              {staffInfo.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
