"use client";

import { Checkbox } from "@/components";
import { ITableColumn } from "../table";

export interface IMaterialManagementProps {
  id: string;
  name: string;
  active: boolean;
  code: string;
  materialBrand?: string | { id: string; name: string };
  size?: string;
  uom?: string; // Unit of Product
  pressure?: string;
  hsn?: string;
  materialType?: string | { id: string; name: string };
  gst?: string;
  qty?: number;
  minqty?: number;
  quantity?: number; // API response field
  purchase_price?: string;
  sales_price?: string;
  sales_description?: string;
  purchase_description?: string;
  alias?: string;
  prices?: string;
  photos?: string[];
  state_prices: {
    Mumbai?: number;
    Maharashtra?: number;
    Gujarat?: number;
    Goa?: number;
    Uttar_Pradesh?: number;
    Karnataka?: number;
    West_Bengal?: number;
    Odisha?: number;
    Bangalore?: number;
  };
}

export const inventoryColumns: ITableColumn<IMaterialManagementProps>[] = [
  {
    header: "ACTIVE",
    accessor: "active",
    sortable: true,
    headerClassName: "min-w-[5rem] ",
    cell: ({ value }) => (
      <Checkbox
        checked={!!value}
        readOnly
        disabled
        className="w-16 h-16 rounded-xl border-4 border-[#6C4BAF] checked:bg-[#6C4BAF] checked:border-[#6C4BAF] focus:ring-0 focus:outline-none"
      />
    ),
  },
  {
    header: "MATERIAL NAME",
    accessor: "name",
    sortable: true,
    headerClassName: "min-w-[10rem] ",
  },

  {
    header: "BRAND",
    accessor: "materialBrand",
    cell: ({ value }) => {
      if (typeof value === "string") return value;
      if (value && typeof value === "object" && "name" in value)
        return value.name;
      return "-";
    },
  },

  {
    header: "MIN QUANTITY",
    accessor: "minqty",
  },
  {
    header: "QUANTITY",
    accessor: "quantity",
    cell: ({ value, row }) => {
      const minQty = row.minqty ?? 1;

      const isLowStock = value <= minQty;

      return (
        <div
          className={`px-2 py-1 rounded-md text-center ${
            isLowStock ? "bg-red-500 text-white font-semibold" : ""
          }`}
        >
          {value}
        </div>
      );
    },
  },

  {
    header: "Price",
    accessor: "prices",
  },
];
