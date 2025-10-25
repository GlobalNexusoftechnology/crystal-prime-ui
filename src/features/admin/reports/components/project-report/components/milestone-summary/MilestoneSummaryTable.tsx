import { Table } from "@/components/table/Table";
import { ProjectPerformanceReportResponse } from "@/services";

const columns: {
  header: string;
  accessor:
    | "name"
    | "status"
    | "start_date"
    | "end_date"
    | "actual_date"
    | "delayDays"
    | "id"
    | "assignedToName";
}[] = [
  { header: "Name", accessor: "name" },
  { header: "Status", accessor: "status" },
  { header: "Start", accessor: "start_date" },
  { header: "End", accessor: "end_date" },
  { header: "Actual", accessor: "actual_date" },
  { header: "Assigned To", accessor: "assignedToName" },
  { header: "Delay Days", accessor: "delayDays" },
];

export function MilestoneSummaryTable({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["milestoneSummary"];
}) {
  if (!data) return null;
  return (
    <div className="border-b border-gray-400  p-6 ">
      <h3 className="text-[1.1rem]  mb-4  font-semibold">
        Milestone Summary
      </h3>
      <Table
        data={data?.map((row) => ({
          ...row,
          id: row.milestoneId,
          assignedToName: row.assigned_to?.name ?? "-",
        }))}
        columns={columns}
      />
    </div>
  );
}
