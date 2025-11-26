import { ITableColumn } from "@/constants";
import { IAllMaterialTypeList } from "@/services/apis/types";


export const IMaterialTypeListTableColumn: ITableColumn<IAllMaterialTypeList>[] =
  [
    {
      header: "MATERIAL TYPE",
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
