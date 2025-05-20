import {  ITableColumn } from "../table";

export interface ILeadsListProps {
  id: number;
  name: string;
  number: string;
  email: string;
  businessName: string;
  natureOfBusiness: string;
  cityName: string;
}

export const leadsList: ILeadsListProps[] = [
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
// export const actions: ITableAction<ILeadsListProps>[] = [
//   {
//     label: "Edit",
//     onClick: (row) => {
//       console.log("Edit clicked", row.id);
//     },
//     className: "text-blue-500",
//   },
//   {
//     label: "View",
//     onClick: (row) => {
//       console.log("View clicked", row.id);
//     },
//     className: "text-blue-500",
//   },
//   {
//     label: "Delete",
//     onClick: (row) => {
//       console.log("Delete clicked", row.id);
//     },
//     className: "text-blue-500",
//   },
//   {
//     label: "Explore As xlsx ",
//     onClick: (row) => {
//       console.log("Explore As xlsx clicked", row.id);
//     },
//     className: "text-blue-500 whitespace-nowrap",
//   },
// ];

export const leadsListColumn: ITableColumn<ILeadsListProps>[] = [
  {
    header: "LEAD NAME",
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
    header: "BUSINESS NAME",
    accessor: "businessName",
    sortable: true,
    headerClassName: "min-w-[13rem] 2xl:min-w-[15vw]",
  },
  {
    header: "NATURE OF BUSINESS",
    accessor: "natureOfBusiness",
    sortable: true,
    headerClassName: "min-w-[16rem] 2xl:min-w-[16vw]",
  },
  {
    header: "CITY NAME",
    accessor: "cityName",
    sortable: true,
    headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
  },
];
