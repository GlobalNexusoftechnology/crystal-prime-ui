import { IAllMaterialBrandList } from "@/services/apis/types";
import { ITableColumn } from "../table";

/**
 * Column definitions for the Follow Up Management table.
 */
export const IMaterialBrandListTableColumn: ITableColumn<IAllMaterialBrandList>[] =
  [
    {
      header: "MATERIAL BRAND",
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
