import { ITableAction, ITableColumn } from "../table";

export interface ILeadsListProps {
  id: string;
  name: string;
  number: string;
  email: string;
  businessName: string;
  natureOfBusiness: string;
  cityName: string;
}

export const actions: ITableAction<ILeadsListProps>[] = [
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
