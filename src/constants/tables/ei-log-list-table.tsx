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
    accessor: "ei_log_type",
    sortable: true,
    headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
  },
  {
    header: "EI LOG HEAD",
    accessor: "ei_log_head",
    sortable: true,
    headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
  },
  {
    header: "DESCRIPTION",
    accessor: "description",
    sortable: true,
    headerClassName: "min-w-[15rem] 2xl:min-w-[15vw]",
  },
  {
    header: "INCOME",
    accessor: "income",
    sortable: true,
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
    cell: (value) => value ? `₹${value}` : "-",
  },
  {
    header: "EXPENSE",
    accessor: "expense",
    sortable: true,
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
    cell: (value) => value ? `₹${value}` : "-",
  },
  {
    header: "PAYMENT MODE",
    accessor: "payment_mode",
    sortable: true,
    headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
  },
  {
    header: "ATTACHMENT",
    accessor: "attachment",
    sortable: false,
    headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
  },
]; 