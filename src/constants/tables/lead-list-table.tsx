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
  possibility_of_conversion?: number | null;
  requirement: string;
  source_id: string;
  status_id: string;
  status_color?: string;
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
  possibility_of_conversion?: number | null;
  requirement: string;
  source: ISource;
  status: IStatus;
  type: IType;
  assignedTo: IAllUsersListResponse;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  deleted_at: string;
}

export const leadsListColumn: ITableColumn<ILeadsListProps>[] = [
    {
    header: "STATUS",
    accessor: "status_id",
    headerClassName: "min-w-[13rem] ",
    cell: ({ row }) => (
      <span
        className="inline-block px-4 py-1 rounded-full text-white"
        style={{ backgroundColor: row.status_color }}
      >
        {row.status_id}
      </span>
    ),
  },
  {
    header: "FIRST NAME",
    accessor: "first_name",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "LAST NAME",
    accessor: "last_name",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "COMPANY",
    accessor: "company",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "PHONE",
    accessor: "phone",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "OTHER CONTACT",
    accessor: "other_contact",
    headerClassName: "min-w-[12rem] ",
  },
  {
    header: "EMAIL",
    accessor: "email",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "LOCATION",
    accessor: "location",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "BUDGET",
    accessor: "budget",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "POSSIBILITY OF CONVERSION",
    accessor: "possibility_of_conversion",
    headerClassName: "min-w-[12rem] ",
    cell: ({ row }) => (
      <span>
        {row.possibility_of_conversion ? `${row.possibility_of_conversion}%` : '-'}
      </span>
    ),
  },
  {
    header: "REQUIREMENT",
    accessor: "requirement",
    headerClassName: "min-w-[12rem] ",
  },
  {
    header: "SOURCE",
    accessor: "source_id",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "TYPE",
    accessor: "type_id",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "ASSIGNED TO",
    accessor: "assigned_to",
    headerClassName: "min-w-[13rem] ",
  },
];

