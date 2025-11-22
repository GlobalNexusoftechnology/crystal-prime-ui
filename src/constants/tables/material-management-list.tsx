"use client";

import { ITableColumn } from "../table";
import { Checkbox } from "@/components";
import React, { useState } from "react";
import Image from "next/image";

export interface IMaterialManagementProps {
  id: string;
  name: string;
  active: boolean;
  code: string;
  materialBrand?: string | { id: string; name: string };
  size?: string;
  uom?: string; // Unit of Material
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
  photos?: string[];
}

export const materialColumns: ITableColumn<IMaterialManagementProps>[] = [
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
    header: "CODE",
    accessor: "code",
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
    header: "SIZE",
    accessor: "size",
  },
  {
    header: "UOM",
    accessor: "uom",
    cell: ({ value }) => <span>{String(value || "-")}</span>,
  },
  {
    header: "PRESSURE",
    accessor: "pressure",
  },
  {
    header: "HSN",
    accessor: "hsn",
  },
  {
    header: "TYPE",
    accessor: "materialType",
    cell: ({ value }) => {
      if (typeof value === "string") return value;
      if (value && typeof value === "object" && "name" in value)
        return value.name;
      return "-";
    },
  },
  {
    header: "PURCHASE PRICE",
    accessor: "purchase_price",
  },
  {
    header: "SALES PRICE",
    accessor: "sales_price",
  },
  {
    header: "SALES DESCRIPTION",
    accessor: "sales_description",
  },
  {
    header: "PURCHASE DESCRIPTION",
    accessor: "purchase_description",
  },
  {
    header: "QUANTITY",
    accessor: "quantity",
  },
  {
    header: "ALIAS",
    accessor: "alias",
  },
  {
    header: "PHOTOS",
    accessor: "photos",
    cell: function PhotosCell({ value }) {
      const [modalOpen, setModalOpen] = useState(false);
      const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

      if (Array.isArray(value) && value.length > 0) {
        return (
          <>
            <div className="flex gap-2">
              {value.map((url, idx) => (
                <Image
                  key={idx}
                  src={url}
                  alt="InventoryPhoto"
                  width={500}
                  height={500}
                  className="w-12 h-12 object-cover rounded border cursor-pointer"
                  style={{ maxWidth: 48, maxHeight: 48 }}
                  onClick={() => {
                    setSelectedUrl(url);
                    setModalOpen(true);
                  }}
                />
              ))}
            </div>
            {modalOpen && selectedUrl && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                <div className="relative bg-white rounded-lg p-4 flex flex-col items-center">
                  <button
                    className="absolute top-2 right-2 text-gray-700 bg-gray-200 rounded-full px-2 py-1 text-lg"
                    onClick={() => setModalOpen(false)}
                  >
                    ×
                  </button>
                  <Image
                    src={selectedUrl}
                    alt="Preview"
                    width={600}
                    height={600}
                    className="max-w-[80vw] max-h-[80vh] object-contain rounded"
                  />
                </div>
              </div>
            )}
          </>
        );
      }
      return <span className="text-gray-400">-</span>;
    },
  },
  {
    header: "GST",
    accessor: "gst",
  },
];
