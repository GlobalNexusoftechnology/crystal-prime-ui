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

// export const clientListActions: ITableAction<IClientListProps>[] = [
//   {
//     label: "Edit",
//     onClick: (row) => {
//       console.log("Edit clicked", row.id);
//     },
//     className: "text-blue-500",
//   },
//   {
//     label: "Delete",
//     onClick: (row) => {
//       console.log("Delete clicked", row.id);
//     },
//     className: "text-red-500",
//   },
// ];

export const clientListColumn: ITableColumn<IClientListProps>[] = [
  {
    header: "CUSTOMER NAME",
    accessor: "name",
  },
  {
    header: "COMPANY NAME",
    accessor: "company_name",
  },
  {
    header: "CONTACT PERSON",
    accessor: "contact_person",
  },
  {
    header: "PHONE NUMBER",
    accessor: "contact_number",
  },
  {
    header: "CONTACT EMAIl",
    accessor: "email",
  },
  {
    header: "WEBSITE URL",
    accessor: "website",
  },
  {
    header: "ADDRESS",
    accessor: "address",
  },
  {
    header: "CREATED AT",
    accessor: "created_at",
  },
];
