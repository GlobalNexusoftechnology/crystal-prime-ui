import { Table } from "@/components/table/Table";
import { ProjectPerformanceReportResponse } from "@/services";

const columns: {
  header: string;
  accessor:
    | "name"
    | "role"
    | "assignedTasks"
    | "completedTasks"
    | "loadPercent"
    | "followUpsHandled"
    | "activeIssues"
    | "id"
    | "email"
    | "phone";
}[] = [
  { header: "Name", accessor: "name" },
  { header: "Role", accessor: "role" },
  { header: "Assigned Tasks", accessor: "assignedTasks" },
  { header: "Completed Tasks", accessor: "completedTasks" },
  { header: "Load %", accessor: "loadPercent" },
  { header: "FollowUps Handled", accessor: "followUpsHandled" },
  { header: "Active Issues", accessor: "activeIssues" },
];

export function ResourceUtilizationTable({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["resourceUtilization"];
}) {
  if (!data) return null;
  return (
    <div className="border-b border-gray-400  p-6 ">
      <h3 className="text-[1.1rem]  mb-4  font-semibold">
        Resource Utilization
      </h3>
      <Table data={data} columns={columns} />
    </div>
  );
}
