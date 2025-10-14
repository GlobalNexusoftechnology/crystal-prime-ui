"use client";
import { ILeaves } from "@/services";
import { ITableColumn } from "../table";

export const leavesListColumn: ITableColumn<ILeaves & { staff_name: string }>[] = [
  {
    header: "STAFF ID",
    accessor: "staffId",
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
