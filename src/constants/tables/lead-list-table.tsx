import { IStatus, IUser } from "@/services";
import { ITableColumn } from "../table";

export interface ILeadsListProps {
  id: string;
  name: string;
  number: string;
  email: string;
  businessName: string;
  natureOfBusiness: string;
  cityName: string;
  status: string;
  assignedTo: string;
}
export interface ILeadsListDetailsProps {
  id: string;
  name: string;
  number: string;
  email: string;
  businessName: string;
  natureOfBusiness: string;
  cityName: string;
  status: IStatus;
  assignedTo: IUser;
}

export const leadsListColumn: ITableColumn<ILeadsListProps>[] = [
  {
    header: "NAME",
    accessor: "name",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "MOBILE NUMBER",
    accessor: "number",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "EMAIL",
    accessor: "email",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "BUSINESS NAME",
    accessor: "businessName",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "NATURE OF BUSINESS",
    accessor: "natureOfBusiness",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "CITY",
    accessor: "cityName",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "STATUS",
    accessor: "status",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "ASSIGNED TO",
    accessor: "assignedTo",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
];
