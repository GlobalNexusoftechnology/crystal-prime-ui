import { Table } from "@/components/table/Table";
import { ProjectPerformanceReportResponse } from "@/services";

const columns: { header: string; accessor: "file_type" | "count" | "last_updated" | "id" }[] = [
  { header: "Type", accessor: "file_type" },
  { header: "Count", accessor: "count" },
  { header: "Last Updated", accessor: "last_updated" },
];

export function DocumentSummaryTable({ data }: { data: ProjectPerformanceReportResponse["data"]["documentSummary"] }) {
  if (!data) return null;
  return (
    <div className="border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw]">
      <h3 className="text-xl 2xl:text-[1.25vw] mb-4 2xl:mb-[1vw] font-medium">Document Summary</h3>
      <div className="flex flex-col gap-6 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex flex-col">
          <span className="font-light">Total Files</span>
          <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.totalFiles ?? '-'}</span>
        </div>
        <div className="flex flex-col mt-4">
          <span className="font-light mb-2">Files by Type</span>
          <Table data={(data.files || []).map((file, idx) => ({ ...file, id: idx }))} columns={columns} />
        </div>
      </div>
    </div>
  );
} 