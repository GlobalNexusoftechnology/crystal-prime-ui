import { IAllEILogList } from "@/services";
import { ITableColumn } from "../table";

/**
 * Column definitions for the EI Log table.
 */
export const IEILogListTableColumn: ITableColumn<IAllEILogList>[] = [
  {
    header: "EI LOG TYPE",
    accessor: "eilogType",
    sortable: true,
    headerClassName: "min-w-[12rem] ",
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
    headerClassName: "min-w-[12rem] ",
    cell: ({ value }) => {
      if (typeof value === 'object' && value !== null && 'name' in value) {
        return value.name;
      }
      return "N/A";
    },
  },
  {
    header: "DATE",
    accessor: "created_at",
    sortable: true,
    headerClassName: "min-w-[10rem] ",
    cell: ({ value }) => {
      if (!value || (typeof value !== 'string' && typeof value !== 'number')) return "-";
      const date = new Date(value);
      if (isNaN(date.getTime())) return String(value); // fallback if invalid
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
  },
  {
    header: "DESCRIPTION",
    accessor: "description",
    sortable: true,
    headerClassName: "min-w-[15rem] ",
  },
  // {
  //   header: "Created By",
  //   accessor: "createdBy",
  //   sortable: false,
  //   headerClassName: "min-w-[12rem] ",
  //   cell: ({ value }) =>
  //     value && typeof value === "object" && "firstName" in value && "lastName" in value
  //       ? `${value.firstName} ${value.lastName}`
  //       : "-",
  // },
  {
    header: "INCOME",
    accessor: "income",
    sortable: true,
    headerClassName: "min-w-[10rem] ",
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
    headerClassName: "min-w-[10rem] ",
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
    headerClassName: "min-w-[12rem] ",
  },
  {
    header: "ATTACHMENT",
    accessor: "attachment",
    sortable: false,
    headerClassName: "min-w-[10rem] ",
    cell: ({ value }) => {
      if (!value) return "-";
      
      // Extract file name from URL
      const url = value as string;
      const fileName = url.split('/').pop()?.split('?')[0] || "File";
      
      return (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {fileName}
        </a>
      );
    },
  },
]; 