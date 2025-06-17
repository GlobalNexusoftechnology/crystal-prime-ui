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

import { ITableAction, ITableColumn } from "../table";

export interface IClientListProps {
  id: number;
  clientId: string;
  customerName: string;
  companyName: string;
  contactPerson: string;
  phoneNumber: string;
  contactEmail: string;
  websiteUrl: string;
  address: string;
  createdAt: string;
}

export const clientList: IClientListProps[] = [
  {
    id: 1,
    clientId: "001",
    customerName: "Alice Johnson",
    companyName: "Alice Johnson Corp",
    contactPerson: "Alice",
    phoneNumber: "5698745698",
    contactEmail: "alice.johnson@example.com",
    websiteUrl: "www.alicejohnsoncorp.com",
    address: "123 Main St, Springfield",
    createdAt: "2023-01-01",
  },
];

export const clientListActions: ITableAction<IClientListProps>[] = [
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

export const clientListColumn: ITableColumn<IClientListProps>[] = [
  {
    header: "CLIENT ID",
    accessor: "clientId",
  },
  {
    header: "CUSTOMER NAME",
    accessor: "customerName",
  },
  {
    header: "COMPANY NAME",
    accessor: "companyName",
  },
  {
    header: "CONTACT PERSON",
    accessor: "contactPerson",
  },
  {
    header: "PHONE NUMBER",
    accessor: "phoneNumber",
  },
  {
    header: "CONTACT EMAIl",
    accessor: "contactEmail",
  },
  {
    header: "WEBSITE URL",
    accessor: "websiteUrl",
  },
  {
    header: "ADDRESS",
    accessor: "address",
  },
  {
    header: "CREATED AT",
    accessor: "createdAt",
  },
];
