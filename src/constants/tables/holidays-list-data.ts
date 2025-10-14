"use client";
import { IHoliday } from "@/services";
import { ITableAction, ITableColumn } from "../table";

export const holidaysList: IHoliday[] = [
  {
    id: "1",
    created_at: "2025-10-10T00:00:00Z",
    updated_at: "2025-10-10T00:00:00Z",
    deleted: false,
    deleted_at: null,
    holidayName: "Sick",
    date: "2025-10-10",
  },
];

export const holidaysAction: ITableAction<IHoliday>[] = [
  {
    label: "Edit",
    onClick: (row) => {
      console.log("Edit clicked", row);
    },
    className: "text-blue-500",
  },
  {
    label: "Delete",
    onClick: (row) => {
      console.log("Delete clicked", row);
    },
    className: "text-red-500",
  },
];

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
