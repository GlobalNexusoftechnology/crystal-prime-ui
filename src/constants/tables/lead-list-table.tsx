import { IAllUsersListResponse, ISource, IStatus, IType } from "@/services";
import { ITableColumn } from "../table";

export interface ILeadsListProps {
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  phone: string;
  other_contact: string;
  email: string;
  location: string;
  budget: string;
  requirement: string;
  source_id: string;
  status_id: string;
  type_id: string;
  assigned_to: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

}
export interface ILeadsListDetailsProps {
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  phone: string;
  other_contact: string;
  email: string;
  location: string;
  budget: string;
  requirement: string;
  source: ISource;
  status: IStatus;
  type: IType;
  assignedTo: IAllUsersListResponse;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export const leadsListColumn: ITableColumn<ILeadsListProps>[] = [
    {
    header: "STATUS",
    accessor: "status_id",
    headerClassName: "min-w-[13rem] 2xl:min-w-[13vw]",
  },
  {
    header: "FIRST NAME",
    accessor: "first_name",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "LAST NAME",
    accessor: "last_name",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "COMPANY",
    accessor: "company",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "PHONE",
    accessor: "phone",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "OTHER CONTACT",
    accessor: "other_contact",
    headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
  },
  {
    header: "EMAIL",
    accessor: "email",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "LOCATION",
    accessor: "location",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "BUDGET",
    accessor: "budget",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "REQUIREMENT",
    accessor: "requirement",
    headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
  },
  {
    header: "SOURCE",
    accessor: "source_id",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "TYPE",
    accessor: "type_id",
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "ASSIGNED TO",
    accessor: "assigned_to",
    headerClassName: "min-w-[13rem] 2xl:min-w-[13vw]",
  },
];

