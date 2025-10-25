import { IAllSourcesList } from "@/services";
import { ITableColumn } from "../table";

/**
 * Column definitions for the Follow Up Management table.
 */
export const ILeadSourcesListTableColumn: ITableColumn<IAllSourcesList>[] =
  [
    {
      header: "SOURCES",
      accessor: "name",
      sortable: true,
      headerClassName: "min-w-[10rem]  ",
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
