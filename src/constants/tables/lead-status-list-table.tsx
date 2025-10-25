import { IAllStatusesList } from "@/services";
import { ITableColumn } from "../table";

/**
 * Column definitions for the Follow Up Management table.
 */
export const ILeadStatusListTableColumn: ITableColumn<IAllStatusesList>[] =
  [
    {
      header: "Status",
      accessor: "name",
      sortable: true,
      headerClassName: "min-w-[10rem]  ",
    },
    {
      header: "Color",
      accessor: "color",
      headerClassName: "min-w-[8rem] ",
    },
    {
      header: "CREATED AT",
      accessor: "created_at",
      headerClassName: "min-w-[10rem] ",
    },
    {
      header: "UPDATED AT",
      accessor: "updated_at",
      headerClassName: "min-w-[8rem] ",
    },
  ];
