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
    header: "EMPLOYEE ID",
    accessor: "employee_id",
    sortable: true,
    headerClassName: "min-w-[10rem] ",
    cell: ({ value }) => <span>{value ? value : "N/A"}</span>
  },
  {
    header: "FIRST NAME",
    accessor: "first_name",
    sortable: true,
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "LAST NAME",
    accessor: "last_name",
    sortable: true,
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "CONTACT",
    accessor: "number",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "DOB",
    accessor: "dob",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "EMAIL",
    accessor: "email",
    headerClassName: "min-w-[16rem] ",
  },
  {
    header: "ROLE NAME",
    accessor: "role",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "TEAM LEAD",
    accessor: "team_lead",
    headerClassName: "min-w-[12rem] ",
    cell: ({ value }) => <span>{value ? value : "N/A"}</span>
  },

  {
  header: "KEYWORDS",
  // accessor is a function that accepts the full row type and returns the keywords array (fallback to [])
  accessor: (row: IAllUsersListResponse) => {
    console.log("row", row);
    return row?.keywords ?? [];
  },
  headerClassName: "min-w-[10rem]",
  // cell expects the resolved value (and row if your types require it)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  cell: ({ row, value }: { row: IAllUsersListResponse; value: any }) => {

    const keywords = Array.isArray(value) ? value : [];
    return keywords.length > 0 ? (
      <div className="flex flex-wrap gap-1">
        {keywords.map((kw: string, i: number) => (
          <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
            {kw}
          </span>
        ))}
      </div>
    ) : (
      <span>N/A</span>
    );
  },
},
  {
    header: "CREATED AT",
    accessor: "created_at",
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "UPDATED AT",
    accessor: "updated_at",
    headerClassName: "min-w-[10rem] ",
  },
];
