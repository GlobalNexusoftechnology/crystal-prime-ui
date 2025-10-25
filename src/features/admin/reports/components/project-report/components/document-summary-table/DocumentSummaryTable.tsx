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
    <div className="border-b border-gray-400  p-6 ">
      <div className="bg-white rounded-xl ">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-[1.1rem]  font-semibold">
            Document Summary
          </h2>
          <span className=" font-medium">
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
