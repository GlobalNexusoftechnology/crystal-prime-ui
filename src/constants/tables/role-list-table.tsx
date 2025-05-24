import { ITableAction} from "../table";

/**
 * Interface for a single follow-up management record.
 */
export interface IRoleListTable {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}


/**
 * Actions available for each row in the Follow Up table.22
 * Includes Edit, View, Delete, and Export.
 */
export const Roleaction: ITableAction<IRoleListTable>[] = [
  {
    label: "Edit",
    onClick: (row) => {
      console.log("Edit clicked", row.id);
    },
    className: "text-blue-500",
  },
  {
    label: "View",
    onClick: (row) => {
      console.log("View clicked", row.id);
    },
    className: "text-blue-500",
  },
  {
    label: "Delete",
    onClick: (row) => {
      console.log("Delete clicked", row.id);
    },
    className: "text-red-500",
  },
  {
    label: "Explore As xlsx ",
    onClick: (row) => {
      console.log("Explore As xlsx clicked", row.id);
    },
    className: "text-blue-500 whitespace-nowrap",
  },
];
