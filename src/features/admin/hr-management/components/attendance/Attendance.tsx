import { Breadcrumb } from "@/features";
import { AttendanceTable } from "./component";

export function Attendance() {
  return (
    <div className="p-6 md:p-8  bg-[#fafbfc] border border-gray-300 rounded-xl min-h-screen flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Attendance
        </h1>
        <Breadcrumb />
      </div>
      <AttendanceTable />
    </div>
  );
}
