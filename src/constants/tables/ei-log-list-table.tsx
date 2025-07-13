import { IAllEILogList } from "@/services";
import { ITableColumn } from "../table";

/**
 * Column definitions for the EI Log table.
 */
export const IEILogListTableColumn: ITableColumn<IAllEILogList>[] = [
  {
    header: "DATE",
    accessor: "created_at",
    sortable: true,
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
  {
    header: "EI LOG TYPE",
    accessor: "eilogType",
    sortable: true,
    headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
    cell: ({ value }) => {
      if (typeof value === 'object' && value !== null && 'name' in value) {
        return value.name;
      }
      return "N/A";
    },
  },
  {
    header: "EI LOG HEAD",
    accessor: "eilogHead",
    sortable: true,
    headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
    cell: ({ value }) => {
      if (typeof value === 'object' && value !== null && 'name' in value) {
        return value.name;
      }
      return "N/A";
    },
  },
  {
    header: "DESCRIPTION",
    accessor: "description",
    sortable: true,
    headerClassName: "min-w-[15rem] 2xl:min-w-[15vw]",
  },
  {
    header: "Created By",
    accessor: "createdBy",
    sortable: false,
    headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
    cell: ({ value }) =>
      value && typeof value === "object" && "firstName" in value && "lastName" in value
        ? `${value.firstName} ${value.lastName}`
        : "-",
  },
  {
    header: "INCOME",
    accessor: "income",
    sortable: true,
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
    cell: ({ value }) => {
      if (typeof value === "string" || typeof value === "number") {
        return `₹${value}`;
      }
      return "-";
    },
  },
  {
    header: "EXPENSE",
    accessor: "expense",
    sortable: true,
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
    cell: ({ value }) => {
      if (typeof value === "string" || typeof value === "number") {
        return `₹${value}`;
      }
      return "-";
    },
  },
  {
    header: "PAYMENT MODE",
    accessor: "paymentMode",
    sortable: true,
    headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
  },
  {
    header: "ATTACHMENT",
    accessor: "attachment",
    sortable: false,
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
    cell: (value) => value ? "Yes" : "No",
  },
]; 