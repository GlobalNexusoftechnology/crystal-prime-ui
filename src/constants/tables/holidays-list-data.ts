"use client"
import { ITableAction, ITableColumn } from "../table";

export interface IHolidaysListProps {
  id: number;
  holidays_name: string;
  date: string;
}

export const holidaysList: IHolidaysListProps[] = [
  {
    id: 1,
    holidays_name: "Sick",
    date: "10/Oct/2025",
  },
];

export const holidaysAction: ITableAction<IHolidaysListProps>[] = [
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

export const holidaysListColumn: ITableColumn<IHolidaysListProps>[] = [
  {
    header: "HOLIDAYS NAME",
    accessor: "holidays_name",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "DATE",
    accessor: "date",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
];
