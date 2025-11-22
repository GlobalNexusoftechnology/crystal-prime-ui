"use client";
import React from "react";
import Image from "next/image";
import { Table, NumberInput } from "@/components";
import { ITableColumn } from "@/constants";
import { IoClose } from "react-icons/io5";

interface MaterialItem {
  id: string;
  name: string;
  size: string;
  uom?: string;
  pressure: string;
  brand: string;
  sales_description?: string;
  purchase_description?: string;
  alias?: string;
  photos: string[];
  qty: number;
  salesPrice?: number;
}

interface BOQMaterialTableProps {
  selectedMaterials: MaterialItem[];
  onQuantityChange: (materialId: string, increment: boolean) => void;
  onQuantityInputChange: (materialId: string, value: number) => void;
  onPhotoClick: (src: string) => void;
  onRemoveMaterial: (materialId: string) => void;
}

export function BOQMaterialTable({
  selectedMaterials,
  onQuantityChange,
  onQuantityInputChange,
  onPhotoClick,
  onRemoveMaterial,
}: BOQMaterialTableProps) {
  // Table columns for materials
  const materialColumns: ITableColumn<MaterialItem>[] = [
    {
      header: "MATERIAL",
      accessor: "name" as keyof MaterialItem,
      sortable: true,
      headerClassName: "min-w-[12rem] ",
      cell: ({ row }) => <div className="font-medium">{row.name}</div>,
    },
    {
      header: "SIZE",
      accessor: "size" as keyof MaterialItem,
      sortable: true,
      headerClassName: "min-w-[6rem] ",
      cell: ({ row }) => <div>{row.size}</div>,
    },
    {
      header: "UOM",
      accessor: "uom" as keyof MaterialItem,
      sortable: true,
      headerClassName: "min-w-[6rem] ",
      cell: ({ row }) => <div>{row.uom || "-"}</div>,
    },
    {
      header: "PRESSURE",
      accessor: "pressure" as keyof MaterialItem,
      sortable: true,
      headerClassName: "min-w-[8rem] ",
      cell: ({ row }) => <div>{row.pressure}</div>,
    },
    {
      header: "BRAND",
      accessor: "brand" as keyof MaterialItem,
      sortable: true,
      headerClassName: "min-w-[8rem] ",
      cell: ({ row }) => <div>{row.brand}</div>,
    },
    {
      header: "PHOTOS",
      accessor: "photos" as keyof MaterialItem,
      sortable: false,
      headerClassName: "min-w-[10rem] ",
      cell: ({ row }) => (
        <div className="flex space-x-1 ">
          {row.photos &&
            row.photos.slice(0, 2).map((photo, idxPhoto) => (
              <div
                key={idxPhoto}
                className="relative cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onPhotoClick(photo);
                }}
              >
                <Image
                  src={photo}
                  alt={`${row.name} photo ${idxPhoto + 1}`}
                  width={30}
                  height={30}
                  className="w-8 h-8   object-cover rounded border-2"
                />
              </div>
            ))}
        </div>
      ),
    },
    {
      header: "QTY",
      accessor: "qty" as keyof MaterialItem,
      sortable: false,
      headerClassName: "min-w-[8rem] ",
      cell: ({ row }) => (
        <div className="flex space-x-2 ">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuantityChange(row.id, false);
            }}
            className="w-6 h-6   bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
          >
            –
          </button>
          <NumberInput
            value={row.qty}
            onChange={(value) => {
              onQuantityInputChange(row.id, value >= 0 ? value : 0);
            }}
            min={0}
            className="w-16  text-center border rounded px-1 py-0.5"
            onFocus={(e) => e?.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuantityChange(row.id, true);
            }}
            className="w-6 h-6   bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
          >
            +
          </button>
        </div>
      ),
    },

    {
      header: "",
      accessor: "remove" as keyof MaterialItem,
      sortable: false,
      headerClassName: "min-w-[4rem] ",
      cell: ({ row }) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemoveMaterial(row.id);
          }}
          className="w-8 h-8   bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-red-600 hover:text-red-700 transition-colors"
          title="Remove material"
        >
          <IoClose className="w-4 h-4  " />
        </button>
      ),
    },
  ];

  return <Table data={selectedMaterials} columns={materialColumns} hidePagination />;
}
