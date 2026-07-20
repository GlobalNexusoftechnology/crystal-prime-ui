"use client";

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

type StatePrices = {
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

export const materialColumns: ITableColumn<IMaterialManagementProps>[] = [
  // {
  //   header: "ACTIVE",
  //   accessor: "active",
  //   sortable: true,
  //   headerClassName: "min-w-[5rem] ",
  //   cell: ({ value }) => (
  //     <Checkbox
  //       checked={!!value}
  //       readOnly
  //       disabled
  //       className="w-16 h-16 rounded-xl border-4 border-[#6C4BAF] checked:bg-[#6C4BAF] checked:border-[#6C4BAF] focus:ring-0 focus:outline-none"
  //     />
  //   ),
  // },

  {
    header: "PRODUCT CODE",
    accessor: "code",
  },
  {
    header: "CATEGORY",
    accessor: "size",
  },
  {
    header: "PRODUCT NAME",
    accessor: "name",
    sortable: true,
    headerClassName: "min-w-[10rem] ",
  },
  {
    header: "QUANTITY",
    accessor: "quantity",
  },

  {
    header: "VENDOR NAME",
    accessor: "uom",
    cell: ({ value }) => <span>{String(value || "-")}</span>,
  },

  {
    header: "STATE PRICES",
    accessor: "state_prices",
    cell: ({ value }: { value: StatePrices | null }) => {
      if (!value) {
        return <span className="text-gray-400">-</span>;
      }

      return (
        <div className="flex flex-col gap-1 text-sm">
          {Object.entries(value).map(([state, price]) => (
            <div key={state} className="flex justify-between gap-2">
              <span className="font-medium">{state}:</span>
              <span>₹{price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      );
    },
  },

  {
    header: "GST",
    accessor: "gst",
  },
];
