import { IAllEILogTypeList } from "@/services";
import { ITableColumn } from "../table";

/**
 * Column definitions for the EI Log Types table.
 */
export const IEILogTypesListTableColumn: ITableColumn<IAllEILogTypeList>[] =
  [
    {
      header: "TYPES",
      accessor: "name",
      sortable: true,
      headerClassName: "min-w-[10rem] 2xl:min-w-[10vw] ",
    },
    {
      header: "CREATED AT",
      accessor: "created_at",
      headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
    },
    {
      header: "UPDATED AT",
      accessor: "updated_at",
      headerClassName: "min-w-[8rem] 2xl:min-w-[8vw]",
    },
  ]; 