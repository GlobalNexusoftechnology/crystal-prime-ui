import { ITableAction, ITableColumn } from "../table";

/**
 * Interface for a single follow-up management record.
 */
export interface ILeadStatusListTable {
  /** Unique identifier for the lead */
  id: number;
  /** Name of the lead */
  name: string;
  /** Phone number of the lead */
  number: string;
  /** Email address of the lead */
  email: string;
  /** Name of the business associated with the lead */
  businessName: string;
  /** Nature or date of business activity */
  natureOfBusiness: string;
  /** City where the lead is located */
  cityName: string;
}

/**
 * Sample list of follow-up leads to populate the table.
 */
export const LeadStatusListTable: ILeadStatusListTable[] = [
  {
    id: 1,
    name: "Website ",
    number: "07-25-2022",
    email: "07-25-2022",
    businessName: "07-25-2022",
    natureOfBusiness: "07-25-2022",
    cityName: "07-25-2022",
  },
  {
    id: 2,
    name: "Referral",
    number: "07-25-2022",
    email: "07-25-2022",
    businessName: "07-25-2022",
    natureOfBusiness: "07-25-2022",
    cityName: "07-25-2022",
  },
  {
    id: 3,
    name: "Website ",
    number: "07-25-2022",
    email: "07-25-2022",
    businessName: "07-25-2022",
    natureOfBusiness: "07-25-2022",
    cityName: "07-25-2022",
  },
  {
    id: 4,
    name: "Referral",
    number: "07-25-2022",
    email: "07-25-2022",
    businessName: "07-25-2022",
    natureOfBusiness: "07-25-2022",
    cityName: "07-25-2022",
  },
  {
    id: 5,
    name: "Website ",
    number: "07-25-2022",
    email: "07-25-2022",
    businessName: "07-25-2022",
    natureOfBusiness: "07-25-2022",
    cityName: "07-25-2022",
  },
  {
    id: 6,
    name: "Referral",
    number: "07-25-2022",
    email: "07-25-2022",
    businessName: "07-25-2022",
    natureOfBusiness: "07-25-2022",
    cityName: "07-25-2022",
  },
];

/**
 * Actions available for each row in the Follow Up table.
 * Includes Edit, View, Delete, and Export.
 */
export const leadastatusction: ITableAction<ILeadStatusListTable>[] = [
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

/**
 * Column definitions for the Follow Up Management table.
 */
export const ILeadStatusColumn: ITableColumn<ILeadStatusListTable>[] =
  [
    {
      header: "SOURCES",
      accessor: "name",
      sortable: true,
      headerClassName: "min-w-[10rem] 2xl:min-w-[10vw] ",
    },
    {
      header: "CREATED AT",
      accessor: "number",
      headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
    },
    {
      header: "UPDATED AT",
      accessor: "email",
      headerClassName: "min-w-[8rem] 2xl:min-w-[8vw]",
    },
    {
      header: "STATUS",
      accessor: "businessName",
      sortable: true,
      headerClassName: "min-w-[13rem] 2xl:min-w-[15vw]",
    },
  ];
