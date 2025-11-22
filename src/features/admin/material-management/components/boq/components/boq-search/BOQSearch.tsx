"use client";
import React from "react";
import Image from "next/image";
import { SearchIcon } from "@/features";
import { IAllMaterialsList } from "@/services";

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
  discount?: number;
  hsn: string;
  salesPrice?: number;
  type?: string;
}

interface BOQSearchProps {
  searchQuery: string;
  filteredMaterials: IAllMaterialsList[];
  onSearchChange: (query: string) => void;
  onMaterialSelect: (material: MaterialItem) => void;
}

export function BOQSearch({
  searchQuery,
  filteredMaterials,
  onSearchChange,
  onMaterialSelect,
}: BOQSearchProps) {
  const visibleMaterials = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    // filteredMaterials are already filtered by the parent component
    // Just return them directly (same as EditProposal)
    return filteredMaterials;
  }, [filteredMaterials, searchQuery]);
  return (
    <div className="relative">
      <label className="block text-sm  font-medium text-gray-700 mb-2 ">
        Search Material
      </label>
      <div className="w-full md:w-[25rem]  relative flex items-center border  border-gray-300 px-4 py-3   rounded-xl  bg-white">
        <SearchIcon className="w-6  h-6  text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Material"
          className="ml-3  bg-transparent focus:outline-none w-full "
        />
      </div>

      {/* Search Dropdown: only when typing; shows only matching items */}
      {searchQuery.trim().length > 0 && visibleMaterials.length > 0 && (
        <div className="w-full md:w-[25rem]  absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {visibleMaterials.map((material) => (
            <div
              key={material.id}
              className="w-full flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => {
                onMaterialSelect({
                  ...material,
                  size: material.size || "",
                  uom: material.uom || "",
                  pressure: material.pressure || "",
                  brand: material?.materialBrand?.name || "",
                  sales_description: material.sales_description || "",
                  purchase_description: material.purchase_description || "",
                  alias: material.alias || "",
                  photos: material.photos || [],
                  qty: material.qty || 0,
                  discount: Number(material.discount) || 0,
                  hsn: material.hsn || "",
                  salesPrice: material.sales_price ? Number(material.sales_price) : 0,
                  type: material?.materialType?.name || "",
                });
              }}
            >
              {material.photos && material.photos.length > 0 && (
                <Image
                  src={material.photos[0]}
                  alt={material.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-cover rounded"
                />
              )}
              <div className="mx-4 border-l border-gray-200 h-8" />
              <div className="flex-1 text-sm font-medium">
                {material.name}
              </div>
              <div className="mx-4 border-l border-gray-200 h-8" />
              <div className="text-sm text-gray-500">{material.size}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 