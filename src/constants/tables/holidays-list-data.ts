"use client";
import { IHoliday } from "@/services";
import { ITableColumn } from "../table";

export const holidaysListColumn: ITableColumn<IHoliday>[] = [
  {
    header: "HOLIDAYS NAME",
    accessor: "holidayName",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "DATE",
    accessor: "date",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
];
