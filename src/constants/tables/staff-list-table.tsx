/**
 * Staff List Table Configuration
 *
 * This module defines the data structure, dummy data, table column configurations,
 * and available row actions for the Staff List feature in the Staff Management module.
 *
 * Exports:
 * - IStaffListProps: TypeScript interface for individual staff data.
 * - StaffList: Sample data representing staff records.
 * - actions: Row-level action buttons (e.g., Edit, View, Delete, Export).
 * - StaffListColumn: Column definitions for rendering the staff table.
 */

import { ITableAction, ITableColumn } from "../table";

export interface IStaffListProps {
  id: number;
  name: string;
  number: string;
  email: string;
  businessName: string;
  natureOfBusiness: string;
  cityName: string;
}

export const StaffList: IStaffListProps[] = [
  {
    id: 1,
    name: "Jeanette Torp",
    number: "(385) 344-9378",
    email: "Jon_Bradtke5l@gmail.com",
    businessName: "Quigley LLC",
    natureOfBusiness: "5",
    cityName: "Lake Genesisfort",
  },
  {
    id: 2,
    name: "Jody Grant",
    number: "(385) 344-9378",
    email: "Amari.Zulauf@gmail.com",
    businessName: "Rolfson and Sons",
    natureOfBusiness: "10",
    cityName: "Leschland",
  },
  {
    id: 3,
    name: "Jeanette Torp",
    number: "(385) 344-9378",
    email: "Jon_Bradtke5l@gmail.com",
    businessName: "Upton - Reynolds",
    natureOfBusiness: "3",
    cityName: "Idellfort",
  },
  {
    id: 4,
    name: "Jody Grant",
    number: "(385) 344-9378",
    email: "Amari.Zulauf@gmail.com",
    businessName: "Donnelly - Runolfsdottir",
    natureOfBusiness: "1",
    cityName: "Murphyview",
  },
  {
    id: 5,
    name: "Jeanette Torp",
    number: "(385) 344-9378",
    email: "Jon_Bradtke5l@gmail.com",
    businessName: "Feest, Grimes and Lesch",
    natureOfBusiness: "10",
    cityName: "Theomouth",
  },
  {
    id: 6,
    name: "Jody Grant",
    number: "(385) 344-9378",
    email: "Amari.Zulauf@gmail.com",
    businessName: "Cremin - Kulas",
    natureOfBusiness: "20",
    cityName: "Terrymouth",
  },
];

export const staffActions: ITableAction<IStaffListProps>[] = [
  {
    label: "Edit",
    onClick: (row) => {
      console.log("Edit clicked", row.id);
    },
    className: "text-blue-500",
  },
  {
    label: "View",
    onClick: (row) => {
      console.log("View clicked", row.id);
    },
    className: "text-blue-500",
  },
  {
    label: "Delete",
    onClick: (row) => {
      console.log("Delete clicked", row.id);
    },
    className: "text-red-500",
  },
  {
    label: "Explore As xlsx",
    onClick: (row) => {
      console.log("Explore As xlsx clicked", row.id);
    },
    className: "text-blue-500 whitespace-nowrap",
  },
];

export const StaffListColumn: ITableColumn<IStaffListProps>[] = [
  {
    header: "STAFF NAME",
    accessor: "name",
    sortable: true,
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "CONTACT",
    accessor: "number",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "EMAIL",
    accessor: "email",
    headerClassName: "min-w-[8rem] 2xl:min-w-[8vw]",
  },
  {
    header: "STATUS",
    accessor: "businessName",
    sortable: true,
    headerClassName: "min-w-[13rem] 2xl:min-w-[15vw]",
  },
  {
    header: "ASSIGNED TASK",
    accessor: "natureOfBusiness",
    sortable: true,
    headerClassName: "min-w-[16rem] 2xl:min-w-[16vw]",
  },
];
