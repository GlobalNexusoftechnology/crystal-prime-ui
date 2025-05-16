"use client";
import { Table } from "@/components";
import { ITableAction, ITableColumn } from "@/constants";

/**
 * LeadsListTable Component
 *
 * A client-side React component that renders a paginated, sortable table of leads
 * using a custom Table component. It includes actions for editing and deleting each row.
 *
 * Features:
 * - Displays lead details: name, contact, email, business info
 * - Supports sorting and pagination
 * - Edit and Delete actions with console logging
 *
 * Data and column definitions are hardcoded for demonstration purposes.
 */

interface ILeadsListProps {
  id: number;
  name: string;
  number: string;
  email: string;
  businessName: string;
  natureOfBusiness: string;
  cityName: string;
}

const leadsList: ILeadsListProps[] = [
  {
    id: 1,
    name: "Jeanette Torp",
    number: "(385) 344-9378",
    email: "Jon_Bradtke5l@gmail.com",
    businessName: "Quigley LLC",
    natureOfBusiness: "07-25-2022",
    cityName: "Lake Genesisfort",
  },
  {
    id: 2,
    name: "Jody Grant",
    number: "(385) 344-9378",
    email: "Amari.Zulauf@gmail.com",
    businessName: "Rolfson and Sons",
    natureOfBusiness: "07-25-2022",
     cityName: "Leschland",
  },
  {
    id: 3,
    name: "Jeanette Torp",
    number: "(385) 344-9378",
    email: "Jon_Bradtke5l@gmail.com",
    businessName: "Upton - Reynolds",
    natureOfBusiness: "07-25-2022",
     cityName: "Idellfort",
  },
  {
    id: 4,
    name: "Jody Grant",
    number: "(385) 344-9378",
    email: "Amari.Zulauf@gmail.com",
    businessName: "Donnelly - Runolfsdottir",
    natureOfBusiness: "07-25-2022",
     cityName: "Murphyview",
  },
  {
    id: 5,
    name: "Jeanette Torp",
    number: "(385) 344-9378",
    email: "Jon_Bradtke5l@gmail.com",
    businessName: "Feest, Grimes and Lesch",
    natureOfBusiness: "07-25-2022",
     cityName: "Theomouth",
  },
  {
    id: 6,
    name: "Jody Grant",
    number: "(385) 344-9378",
    email: "Amari.Zulauf@gmail.com",
    businessName: "Cremin - Kulas",
    natureOfBusiness: "07-25-2022",
     cityName: "Terrymouth",
  },
];
const actions: ITableAction<ILeadsListProps>[] = [
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
    label: "Explore As xlsx ",
    onClick: (row) => {
      console.log("Explore As xlsx clicked", row.id);
    },
    className: "text-blue-500 whitespace-nowrap",
  },
];

const leadsListColumn: ITableColumn<ILeadsListProps>[] = [
  { header: "LEAD NAME", accessor: "name", sortable: true, headerClassName: "min-w-[10rem]" },
  { header: "CONTACT", accessor: "number", headerClassName: "min-w-[10rem]" },
  { header: "EMAIL", accessor: "email", headerClassName: "min-w-[8rem]" },
  { header: "BUSINESS NAME", accessor: "businessName", sortable: true, headerClassName: "min-w-[12rem]" },
  { header: "NATURE OF BUSINESS", accessor: "natureOfBusiness", sortable: true, headerClassName: "min-w-[14rem]" },
    { header: "CITY NAME", accessor: "cityName", sortable: true, headerClassName: "min-w-[12rem]" },

];

export function LeadsListTable() {
  return (
    <main>
      <Table
        data={leadsList}
        columns={leadsListColumn}
        pageSize={10}
        actions={actions}
      />
    </main>
  );
}