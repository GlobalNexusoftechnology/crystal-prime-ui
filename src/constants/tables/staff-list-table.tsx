import { ITableAction, ITableColumn } from "../table";

export interface IStaffListProps {
  id: number;
  firstName: string;
  lastName: string;
  contact: string;
  dob: string;
  email: string;
  roleName: string;
  createdAt: string;
  updatedAt: string;
}

export const staffList: IStaffListProps[] = [
  {
    id: 1,
    firstName: "Jeanette",
    lastName: "Torp",
    contact: "(385) 344-9378",
    dob: "07-25-2022",
    email: "Elna.Ferry@hotmail.com",
    roleName: "Developer",
    createdAt: "07-25-2022",
    updatedAt: "07-25-2022",
  },
  {
    id: 2,
    firstName: "Jody",
    lastName: "Grant",
    contact: "(385) 344-9378",
    dob: "07-25-2022",
    email: "Willis.Schaden@yahoo.com",
    roleName: "HR",
    createdAt: "07-25-2022",
    updatedAt: "07-25-2022",
  },
  {
    id: 3,
    firstName: "Francisco",
    lastName: "Keebler",
    contact: "(385) 344-9378",
    dob: "07-25-2022",
    email: "Savanna_Satterfield@hotmail.com",
    roleName: "Francisco Keebler",
    createdAt: "07-25-2022",
    updatedAt: "07-25-2022",
  },
  {
    id: 4,
    firstName: "Jean",
    lastName: "Hyatt",
    contact: "(385) 344-9378",
    dob: "07-25-2022",
    email: "Brown23@gmail.com",
    roleName: "Jean Hyatt",
    createdAt: "07-25-2022",
    updatedAt: "07-25-2022",
  },
  {
    id: 5,
    firstName: "Miss Dianna",
    lastName: "Hills",
    contact: "(385) 344-9378",
    dob: "07-25-2022",
    email: "Zelma_Dachlite@yahoo.com",
    roleName: "Miss Dianna Hills",
    createdAt: "07-25-2022",
    updatedAt: "07-25-2022",
  },
  {
    id: 6,
    firstName: "Tommie",
    lastName: "Jaskolski",
    contact: "(385) 344-9378",
    dob: "07-25-2022",
    email: "Eryn_Goldner@yahoo.com",
    roleName: "Tommie Jaskolski",
    createdAt: "07-25-2022",
    updatedAt: "07-25-2022",
  },
  {
    id: 7,
    firstName: "Michele",
    lastName: "Jakubowski",
    contact: "(385) 344-9378",
    dob: "07-25-2022",
    email: "Dorris_Brakus92@gmail.com",
    roleName: "Michele Jakubowski",
    createdAt: "07-25-2022",
    updatedAt: "07-25-2022",
  },
];



export const staffActions: ITableAction<IStaffListProps>[] = [

  {
    label: "Edit",
    onClick: (row) => {
      console.log("Edit clicked", row.id);
    },
    className: "text-blue-500 whitespace-nowrap",
  },
  {
    label: "Delete",
    onClick: (row) => {
      console.log("Delete clicked", row.id);
    },
    className: "text-red-500",
  },
];
export const staffListColumn: ITableColumn<IStaffListProps>[] = [

  {
    header: "FIRST NAME",
    accessor: "firstName",
    sortable: true,
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "LAST NAME",
    accessor: "lastName",
    sortable: true,
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "CONTACT",
    accessor: "contact",
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "DOB",
    accessor: "dob",
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "EMAIL",
    accessor: "email",
    headerClassName: "min-w-[16rem]",
  },
  {
    header: "ROLE NAME",
    accessor: "roleName",
    headerClassName: "min-w-[14rem]",
  },
  {
    header: "CREATED AT",
    accessor: "createdAt",
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "UPDATED AT",
    accessor: "updatedAt",
    headerClassName: "min-w-[10rem]",
  },
];
