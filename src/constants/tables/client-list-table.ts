/**
 * Document List Table Configuration
 *
 * This module defines the data structure, dummy data, table column configurations,
 * and available row actions for the Document List feature in the Document Management module.
 *
 * Exports:
 * - IClientListProps: TypeScript interface for individual document metadata.
 * - ClientList: Sample data representing document records.
 * - documentation: Row-level action buttons (e.g., Edit, View, Delete, Export).
 * - ClientListColumn: Column definitions for rendering the document table.
 */

import { ITableColumn } from "../table";

export interface IClientListProps {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
  email: string;
  contact_number: string;
  address: string;
  website: string;
  company_name: string;
  contact_person: string;
  lead_id: null
}


// export const clientListColumn: ITableColumn<IClientListProps>[] = [
//   {
//     header: "CUSTOMER NAME",
//     accessor: "name",
//   },
//   {
//     header: "COMPANY NAME",
//     accessor: "company_name",
//   },
//   {
//     header: "CONTACT PERSON",
//     accessor: "contact_person",
//   },
//   {
//     header: "PHONE NUMBER",
//     accessor: "contact_number",
//   },
//   {
//     header: "CONTACT EMAIl",
//     accessor: "email",
//   },
//   {
//     header: "WEBSITE URL",
//     accessor: "website",
//   },
//   {
//     header: "ADDRESS",
//     accessor: "address",
//   },
//   {
//     header: "CREATED AT",
//     accessor: "created_at",
//   },
// ];

export const clientListColumn = [
  {
    header: "CUSTOMER NAME",
    accessor: "name",
    headerClass: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "COMPANY NAME",
    accessor: "company_name",
    headerClass: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "CONTACT PERSON",
    accessor: "contact_person",
    headerClass: "min-w-[12rem] 2xl:min-w-[12vw]",
  },
  {
    header: "PHONE NUMBER",
    accessor: "contact_number",
    headerClass: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "CONTACT EMAIL",
    accessor: "email",
    headerClass: "min-w-[15rem] 2xl:min-w-[15vw]",
  },
  {
    header: "WEBSITE URL",
    accessor: "website",
    headerClass: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "ADDRESS",
    accessor: "address",
    headerClass: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "CREATED AT",
    accessor: "created_at",
    headerClass: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
];

export const clientContactDetailsColumns = [
  { header: "CONTACT NAME", headerClass: "min-w-[10rem] 2xl:min-w-[10vw]" },
  { header: "DESIGNATION", headerClass: "min-w-[10rem] 2xl:min-w-[10vw]" },
  { header: "CONTACT NUMBER", headerClass: "min-w-[10rem] 2xl:min-w-[10vw]" },
  { header: "OTHER CONTACT", headerClass: "min-w-[10rem] 2xl:min-w-[10vw]" },
  { header: "EMAIL", headerClass: "min-w-[15rem] 2xl:min-w-[15vw]" },
];
