import { ITableColumn } from "@/constants";
import { IInventoryHistoryItem } from "@/services";


export const IInventoryHistoryTableColumns: ITableColumn<IInventoryHistoryItem>[] =
  [
    {
      header: "DATE",
      accessor: "date",
      sortable: true,
      headerClassName: "min-w-[10rem]",
    },
    {
      header: "USED QTY",
      accessor: "used",
      sortable: true,
      headerClassName: "min-w-[8rem]",
    },
    {
      header: "NOTES",
      accessor: "notes",
      headerClassName: "min-w-[14rem]",
    },

  ];

