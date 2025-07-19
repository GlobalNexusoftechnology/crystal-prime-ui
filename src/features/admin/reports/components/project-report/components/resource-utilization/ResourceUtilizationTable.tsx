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
    <div className="border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw]">
      <h3 className="text-xl 2xl:text-[1.25vw] mb-4 2xl:mb-[1vw] font-medium">
        Resource Utilization
      </h3>
      <Table data={data} columns={columns} />
    </div>
  );
}
