import React from "react";
import { Table } from "@/components";
import { ITableAction, ITableColumn } from "@/constants";

// Define the row type for the document summary table
export interface DocumentSummaryRow {
  id: number;
  fileType: string;
  fileCount: string;
  lastUpdated: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const documentSummaryAction: ITableAction<DocumentSummaryRow>[] = [];

// Mock data for demonstration
const documentSummaryData: DocumentSummaryRow[] = [
  {
    id: 2,
    fileType: "07-25-2022",
    fileCount: "Regular",
    lastUpdated: "07-25-2022",
  },
  {
    id: 3,
    fileType: "07-25-2022",
    fileCount: "Office",
    lastUpdated: "07-25-2022",
  },
  {
    id: 4,
    fileType: "07-25-2022",
    fileCount: "Project",
    lastUpdated: "07-25-2022",
  },
  {
    id: 5,
    fileType: "07-25-2022",
    fileCount: "Staff",
    lastUpdated: "07-25-2022",
  },
];

export const documentSummaryColumns: ITableColumn<DocumentSummaryRow>[] = [
  {
    header: "FILE TYPE",
    accessor: "fileType",
    sortable: true,
    headerClassName: "text-center",
  },
  {
    header: "FILE COUNT",
    accessor: "fileCount",
    sortable: true,
    headerClassName: "text-center",
  },
  {
    header: "LAST UPDATED",
    accessor: "lastUpdated",
    sortable: true,
    headerClassName: "text-center",
  },
];

export function DocumentSummaryTable() {
  return (
    <div className="border-b 2xl:border-[0.1vw]">
      <div className="bg-white rounded-xl 2xl:rounded-[1vw] p-6 2xl:p-[2vw]">
        <div className="flex justify-between items-center mb-6 2xl:mb-[1vw]">
          <h2 className="text-xl 2xl:text-[1.25vw] font-medium">
            Document Summary
          </h2>
          <span className="2xl:text-[1vw] font-medium">Total FILES: 14</span>
        </div>
        <Table
          data={documentSummaryData}
          columns={documentSummaryColumns}
          actions={documentSummaryAction}
        />
      </div>
    </div>
  );
}
