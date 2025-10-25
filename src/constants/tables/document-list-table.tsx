/**
 * Document List Table Configuration
 *
 * This module defines the data structure, dummy data, table column configurations,
 * and available row actions for the Document List feature in the Document Management module.
 *
 * Exports:
 * - IDocumentListProps: TypeScript interface for individual document metadata.
 * - DocumentList: Sample data representing document records.
 * - documentaction: Row-level action buttons (e.g., Edit, View, Delete, Export).
 * - DocumentListColumn: Column definitions for rendering the document table.
 */

import { ITableAction, ITableColumn } from "../table";

export interface IDocumentListProps {
  id: number;
  name: string;
  number: string;
  email: string;
  businessName: string;
  natureOfBusiness: string;
  cityName: string;
}

export const DocumentList: IDocumentListProps[] = [
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

export const documentaction: ITableAction<IDocumentListProps>[] = [
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

export const DocumentListColumn: ITableColumn<IDocumentListProps>[] = [
  {
    header: "DOCUMENT NAME",
    accessor: "name",
    sortable: true,
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "DATE UPLOADED",
    accessor: "number",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "UPLOADED BY",
    accessor: "email",
    headerClassName: "min-w-[8rem] ",
  },
  {
    header: "TYPE",
    accessor: "businessName",
    sortable: true,
    headerClassName: "min-w-[13rem] ",
  },
];
