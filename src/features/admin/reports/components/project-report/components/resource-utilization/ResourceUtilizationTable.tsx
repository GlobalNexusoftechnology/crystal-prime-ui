import React from "react";
import { Table } from "@/components/table";
import type { ITableColumn } from "@/constants/table";

interface ResourceUtilization {
  id: number;
  teamMember: string;
  assignedTasks: string;
  completedTask: number;
  load: string;
  followUpsHandled: number;
  activeIssues: number;
}

const sampleData: ResourceUtilization[] = [
  { id: 2, teamMember: "Stanford Smith", assignedTasks: "Development", completedTask: 10, load: "22%", followUpsHandled: 0, activeIssues: 0 },
  { id: 3, teamMember: "Kendra Lee", assignedTasks: "Design", completedTask: 5, load: "70%", followUpsHandled: 20, activeIssues: 0 },
  { id: 4, teamMember: "Elwin Brown", assignedTasks: "Testing", completedTask: 15, load: "50%", followUpsHandled: 20, activeIssues: 5 },
  { id: 5, teamMember: "Corwin Davis", assignedTasks: "Deployment", completedTask: 5, load: "50%", followUpsHandled: 50, activeIssues: 8 },
  { id: 6, teamMember: "Maya Johnson", assignedTasks: "Review", completedTask: 5, load: "50%", followUpsHandled: 50, activeIssues: 2 },
  { id: 7, teamMember: "Liam Thompson", assignedTasks: "Documentation", completedTask: 5, load: "50%", followUpsHandled: 858, activeIssues: 1 },
  { id: 8, teamMember: "Ava Martinez", assignedTasks: "Maintenance", completedTask: 5, load: "10%", followUpsHandled: 85, activeIssues: 8 },
];

const columns: ITableColumn<ResourceUtilization>[] = [
  {
    header: "TEAM MEMBER",
    accessor: "teamMember",
    sortable: true,
    headerClassName: "min-w-[12rem]",
  },
  {
    header: "ASSIGNED TASKS",
    accessor: "assignedTasks",
    sortable: true,
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "COMPLETED TASK",
    accessor: "completedTask",
    sortable: true,
    headerClassName: "min-w-[8rem]",
  },
  {
    header: "LOAD %",
    accessor: "load",
    sortable: true,
    headerClassName: "min-w-[8rem]",
  },
  {
    header: "FOLLOW-UPS HANDLED",
    accessor: "followUpsHandled",
    sortable: true,
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "ACTIVE ISSUES",
    accessor: "activeIssues",
    sortable: true,
    headerClassName: "min-w-[8rem]",
  },
];

export const ResourceUtilizationTable: React.FC = () => {
  return (
    <div className="bg-white w-full">
      <h2 className="text-xl font-medium mb-4">Resource Utilization</h2>
      <Table<ResourceUtilization>
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