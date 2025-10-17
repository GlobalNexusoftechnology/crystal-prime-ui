"use client";
import { Table } from "@/components";
import { leavesListColumn } from "@/constants";
import { Breadcrumb } from "@/features";
import {  useAllLeavesQuery } from "@/services";

export function Leaves() {
  const { data } = useAllLeavesQuery();

  const formattedData = data?.data?.map((leave) => ({
    ...leave,
    employee_id: leave.staff?.employee_id || "N/A",
    staff_name: `${leave.staff?.first_name || ""} ${leave.staff?.last_name || ""}`.trim(),
  }));
  

  return (
    <div className="p-6 md:p-8 bg-[#fafbfc] border border-gray-300 rounded-xl min-h-screen flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Leaves</h1>
        <Breadcrumb />
      </div>
      <Table
        data={formattedData || []}
        columns={leavesListColumn}
      />
    </div>
  );
}
