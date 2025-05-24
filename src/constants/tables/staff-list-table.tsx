import { IAllUsersListResponse } from "@/services";
import { ITableColumn } from "../table";

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

export const staffListColumn: ITableColumn<IAllUsersListResponse>[] = [

  {
    header: "FIRST NAME",
    accessor: "first_name",
    sortable: true,
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "LAST NAME",
    accessor: "last_name",
    sortable: true,
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "CONTACT",
    accessor: "number",
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
    accessor: "role",
    headerClassName: "min-w-[14rem]",
  },
  {
    header: "CREATED AT",
    accessor: "created_at",
    headerClassName: "min-w-[10rem]",
  },
  {
    header: "UPDATED AT",
    accessor: "updated_at",
    headerClassName: "min-w-[10rem]",
  },
];
