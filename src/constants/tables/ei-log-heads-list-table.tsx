import { IAllEILogHeadList } from "@/services";
import { ITableColumn } from "../table";

/**
 * Column definitions for the EI Log Heads table.
 */
export const IEILogHeadsListTableColumn: ITableColumn<IAllEILogHeadList>[] =
  [
    {
      header: "HEADS",
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