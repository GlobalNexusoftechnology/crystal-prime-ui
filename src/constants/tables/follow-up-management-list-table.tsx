import { ITableAction, ITableColumn } from "../table";

/**
 * Interface for a single follow-up management record.
 */
export interface IFollowUpManagementListProps {
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
export const FollowUpManagementList: IFollowUpManagementListProps[] = [
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

/**
 * Actions available for each row in the Follow Up table.
 * Includes Edit, View, Delete, and Export.
 */
export const action: ITableAction<IFollowUpManagementListProps>[] = [
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
export const FollowUpManagementListColumn: ITableColumn<IFollowUpManagementListProps>[] = [
  {
    header: "LEAD NAME",
    accessor: "name",
    sortable: true,
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "FOllOW UP DATE",
    accessor: "number",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "ASSIGNED TO",
    accessor: "email",
    headerClassName: "min-w-[8rem] ",
  },
  {
    header: "STATUS",
    accessor: "businessName",
    sortable: true,
    headerClassName: "min-w-[13rem] ",
  },
];
