"use client"
import { ITableAction, ITableColumn } from "../table";

export interface ILeavesListProps {
  id: number;
  staff_id: number;
  staff_name: string;
  status: string;
}

export const leavesList: ILeavesListProps[] = [
  {
    id: 1,
  staff_id: 1,
  staff_name: "John Doe",
  status: "Pending",

  },
];

export const leavesAction: ITableAction<ILeavesListProps>[] = [
  {
    label: "Edit",
    onClick: () => {
      console.log("Edit clicked");
    },
    className: "text-blue-500",
  },
  {
    label: "Delete",
    onClick: () => {
      console.log("Delete clicked");
    },
    className: "text-red-500",
  },
];

export const leavesListColumn: ITableColumn<ILeavesListProps>[] = [
  {
    header: "STAFF ID",
    accessor: "staff_id",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "STAFF NAME",
    accessor: "staff_name",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
   {
    header: "STATUS",
    accessor: "status",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
];
