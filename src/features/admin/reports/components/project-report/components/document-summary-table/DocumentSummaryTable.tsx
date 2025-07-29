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
