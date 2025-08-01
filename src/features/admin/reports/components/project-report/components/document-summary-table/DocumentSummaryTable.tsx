import { Table } from "@/components";
import { ProjectPerformanceReportResponse } from "@/services";

const columns: {
  header: string;
  accessor: "last_updated" | "file_name" | "file_url" | "id";
}[] = [
  { header: "File Name", accessor: "file_name" },
  { header: "Last Updated", accessor: "last_updated" },
  { header: "Download", accessor: "file_url" },
];

export function DocumentSummaryTable({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["documentSummary"];
}) {
  if (!data) return null;
  return (
    <div className="border-b border-gray-400 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw]">
      <div className="bg-white rounded-xl 2xl:rounded-[1vw]">
        <div className="flex justify-between items-center mb-6 2xl:mb-[1vw]">
          <h2 className="text-[1.1rem] 2xl:text-[1.1vw] font-semibold">
            Document Summary
          </h2>
          <span className="2xl:text-[1vw] font-medium">
            Total FILES: {data.totalFiles ?? "-"}
          </span>
        </div>
        <Table
          data={(data.files || [])?.map((file, idx) => ({
            ...file,
            id: idx,
            file_url: file.file_url
              ? (
                  <a
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download
                  </a>
                )
              : "-",
          }))}
          columns={columns}
        />
      </div>
    </div>
  );
}
