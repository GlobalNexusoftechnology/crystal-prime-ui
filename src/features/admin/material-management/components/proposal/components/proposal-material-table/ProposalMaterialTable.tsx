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
  purchase_price?: string;
  purchase_description?: string;
  alias?: string;
  photos: string[];
  qty: number;
  salesPrice?: number;
  discount?: number;
}

interface ProposalMaterialTableProps {
  selectedMaterials: MaterialItem[];
  onQuantityChange: (materialId: string, increment: boolean) => void;
  onQuantityInputChange: (materialId: string, value: number) => void;
  onPhotoClick: (src: string) => void;
  onRemoveMaterial: (materialId: string) => void;
  onDiscountChange?: (materialId: string, value: number) => void;
  onRateChange?: (materialId: string, value: number) => void;
}

export function ProposalMaterialTable({
  selectedMaterials,
  onQuantityChange,
  onQuantityInputChange,
  onPhotoClick,
  onRemoveMaterial,
  onDiscountChange,
  onRateChange,
}: ProposalMaterialTableProps) {
  // Calculate total for a material item
  const calculateItemTotal = (item: MaterialItem): number => {
    const rate = item.salesPrice || 0;
    const quantity = item.qty || 0;
    const discount = item.discount || 0;
    const subtotal = rate * quantity;
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  // Calculate grand total
  const grandTotal = selectedMaterials.reduce((total, item) => {
    return total + calculateItemTotal(item);
  }, 0);

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
      header: "RATE",
      accessor: "salesPrice" as keyof MaterialItem,
      sortable: true,
      headerClassName: "min-w-[8rem] ",
      cell: ({ row }) => (
        <NumberInput
          value={row.salesPrice ?? 0}
          onChange={(value) =>
            onRateChange && onRateChange(row.id, value >= 0 ? value : 0)
          }
          min={0}
          className="w-20 text-center border rounded px-1 py-0.5"
          onFocus={(e) => e?.stopPropagation()}
        />
      ),
    },
    {
      header: "DISCOUNT (%)",
      accessor: "discount" as keyof MaterialItem,
      sortable: true,
      headerClassName: "min-w-[8rem] ",
      cell: ({ row }) => (
        <NumberInput
          value={row.discount ?? 0}
          onChange={(value) =>
            onDiscountChange && onDiscountChange(row.id, value)
          }
          min={0}
          max={100}
          className="w-20 text-center border rounded px-1 py-0.5"
        />
      ),
    },
    {
      header: "DISCOUNT RATE",
      accessor: "discountRate" as keyof MaterialItem,
      sortable: false,
      headerClassName: "min-w-[10rem] ",
      cell: ({ row }) => {
        const baseRate = row.salesPrice ?? 0;
        const discountPercent = row.discount ?? 0;
        const effectiveRate = baseRate * (1 - discountPercent / 100);
        return <div className="font-medium">₹{effectiveRate.toFixed(2)}</div>;
      },
    },
    {
      header: "TOTAL",
      accessor: "total" as keyof MaterialItem,
      sortable: false,
      headerClassName: "min-w-[8rem] ",
      cell: ({ row }) => (
        <div className="font-semibold text-green-600">
          ₹{calculateItemTotal(row).toFixed(2)}
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

  return (
    <div className="space-y-4 relative pb-8">
      <Table data={selectedMaterials} columns={materialColumns} hidePagination/>
      
      {/* All Total Summary */}
      {selectedMaterials.length > 0 && (
        <div className="flex justify-end right-0">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4  min-w-[300px]">
            <div className="flex justify-between items-center text-lg  font-semibold text-gray-800">
              <span>Total Amount:</span>
              <span className="text-green-600">₹{grandTotal.toFixed(2)}</span>
            </div>
            <div className="text-sm  text-gray-600 mt-2">
              {selectedMaterials.length} item{selectedMaterials.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
