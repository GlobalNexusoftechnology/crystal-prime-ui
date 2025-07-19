import React from "react";
import { Table } from "@/components/table";
import type { ITableColumn } from "@/constants/table";

interface Milestone {
  id: number;
  milestone: string;
  status: string;
  plannedDate: string;
  actualDate: string;
  assignedTo: string;
  delay: number;
}

const sampleData: Milestone[] = [
  { id: 2, milestone: "Initial Concept", status: "Completed", plannedDate: "2023-01-01", actualDate: "2023-01-01", assignedTo: "Stanford Smith", delay: 10 },
  { id: 3, milestone: "Prototype Development", status: "In Progress", plannedDate: "2023-02-01", actualDate: "2023-02-01", assignedTo: "Kendra Lee", delay: 5 },
  { id: 4, milestone: "User Testing", status: "Open", plannedDate: "2023-03-01", actualDate: "2023-03-01", assignedTo: "Elwin Brown", delay: 15 },
  { id: 5, milestone: "Feature Implementation", status: "Completed", plannedDate: "2023-04-01", actualDate: "2023-04-01", assignedTo: "Corwin Davis", delay: 5 },
  { id: 6, milestone: "Final Review", status: "In Progress", plannedDate: "2023-05-01", actualDate: "2023-05-01", assignedTo: "Maya Johnson", delay: 5 },
  { id: 7, milestone: "Launch Preparation", status: "Open", plannedDate: "2023-06-01", actualDate: "2023-06-01", assignedTo: "Liam Thompson", delay: 5 },
  { id: 8, milestone: "Go Live", status: "Completed", plannedDate: "2023-07-01", actualDate: "2023-07-01", assignedTo: "Ava Martinez", delay: 5 },
];

const columns: ITableColumn<Milestone>[] = [
  {
    header: "MILESTONE",
    accessor: "milestone",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "STATUS",
    accessor: "status",
    sortable: true,
    headerClassName: "min-w-[8rem]",
  },
  {
    header: "PLANNED DATE",
    accessor: "plannedDate",
    sortable: true,
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "ACTUAL DATE",
    accessor: "actualDate",
    sortable: true,
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "ASSIGNED TO",
    accessor: "assignedTo",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "DELAY (DAYS)",
    accessor: "delay",
    sortable: true,
    headerClassName: "min-w-[8rem]",
  },
];

export const MilestoneSummaryTable: React.FC = () => {
  return (
    <div className="bg-white w-full">
      <h2 className="text-xl 2xl:text-[1.25vw] font-medium mb-4 2xl:mb-[1vw]">Milestone Summary</h2>
      <Table<Milestone>
        data={sampleData}
        columns={columns}
        actions={[
          {
            label: "More",
            onClick: () => {},
            className: "text-gray-700",
          },
        ]}
      />
    </div>
  );
};

