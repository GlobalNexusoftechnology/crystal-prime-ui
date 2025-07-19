import { Table } from "@/components";
import { ProjectPerformanceReportResponse } from "@/services";

const columns: {
  header: string;
  accessor: "file_type" | "count" | "last_updated" | "id";
}[] = [
  { header: "Type", accessor: "file_type" },
  { header: "Count", accessor: "count" },
  { header: "Last Updated", accessor: "last_updated" },
];

export function DocumentSummaryTable({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["documentSummary"];
}) {
  if (!data) return null;
  return (
    <div className="border-b 2xl:border-[0.1vw]">
      <div className="bg-white rounded-xl 2xl:rounded-[1vw] p-6 2xl:p-[2vw]">
        <div className="flex justify-between items-center mb-6 2xl:mb-[1vw]">
          <h2 className="text-xl 2xl:text-[1.25vw] font-medium">
            Document Summary
          </h2>
          <span className="2xl:text-[1vw] font-medium">
            Total FILES: {data.totalFiles ?? "-"}
          </span>
        </div>
        <Table
          data={(data.files || []).map((file, idx) => ({ ...file, id: idx }))}
          columns={columns}
        />
      </div>
    </div>
  );
}
