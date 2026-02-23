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
  quantity?: number; // API response field
  purchase_price?: string;
  sales_price?: string;
  sales_description?: string;
  purchase_description?: string;
  alias?: string;
  prices?: string;
  photos?: string[];
  state_prices: {
    Maharashtra?: number;
    Gujarat?: number;
    Uttar_Pradesh?: number;
    Karnataka?: number;
    West_Bengal?: number;
    Delhi?: number;
    Odisha?: number;
    Goa?: number;
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
    header: "QUANTITY",
    accessor: "quantity",
  },

  {
    header: "Price",
    accessor: "prices",
  },
];
