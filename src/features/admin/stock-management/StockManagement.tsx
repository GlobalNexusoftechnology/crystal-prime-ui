"use client";
import { useState, useMemo, useEffect } from "react";

import { useDebounce } from "@/utils/hooks";

import { Breadcrumb } from "../breadcrumb";
import { IMaterialManagementProps } from "@/constants/tables/material-management-list";
import { useAllMaterialsQuery } from "@/services/apis/clients/community-client/query-hooks/useAllMaterialsQuery";
import { MaterialListTable } from "./components/material-list-table";
import { AddMaterialModal, MaterialFilters } from "./components";
import { useAllInventoryQuery } from "@/services/apis/clients/community-client/query-hooks/useAllInventoryQuery";

export function StockManagement() {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] =
    useState<IMaterialManagementProps | null>(null);

  const { debouncedValue: searchQuery } = useDebounce({
    initialValue: searchInput,
    delay: 500,
    onChangeCb: () => {},
  });

  const filters = useMemo(
    () => ({
      searchText: searchQuery,
      page: currentPage,
      limit: 40,
    }),
    [searchQuery, currentPage],
  );

  const { allMaterialsData, fetchAllMaterials } = useAllInventoryQuery(filters);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleEditMaterial = (material: IMaterialManagementProps) => {
    setEditingMaterial(material);
    setIsAddMaterialOpen(true);
  };

  const handleAddMaterial = () => {
    setIsAddMaterialOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddMaterialOpen(false);
    setEditingMaterial(null);
  };

  const handleRefetch = () => {
    fetchAllMaterials();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="flex flex-col gap-4  border  border-gray-300 rounded-lg  bg-white px-2 sm:px-6  py-2 sm:py-4 ">
      <Breadcrumb />
      <div className="flex flex-col gap-2 ">
        <h1 className="text-xl font-medium">Inventory Management</h1>
      </div>
      <div className="flex flex-col gap-6  bg-customGray p-4  border  rounded-xl ">
        <MaterialFilters
          searchQuery={searchInput}
          onSearchChange={setSearchInput}
          onAddMaterial={handleAddMaterial}
          isUploading={false}
          onRefetch={handleRefetch}
          currentFilters={filters}
        />

        <MaterialListTable
          onEdit={handleEditMaterial}
          data={allMaterialsData?.data || []}
          onRefetch={fetchAllMaterials}
          paginationData={allMaterialsData?.pagination}
          onPageChange={handlePageChange}
        />

        <AddMaterialModal
          isOpen={isAddMaterialOpen}
          onClose={handleCloseModal}
          initialData={editingMaterial}
          onSuccess={handleRefetch}
        />
      </div>
    </section>
  );
}
