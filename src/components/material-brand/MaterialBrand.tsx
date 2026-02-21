"use client";

import { useState, useMemo } from "react";
import { SearchBar, Button, Table } from "@/components";
import { EAction, EModule, ITableAction } from "@/constants";
import { DeleteModal } from "@/components";

import { formatDate, IApiError } from "@/utils";
import toast from "react-hot-toast";
import { usePermission } from "@/utils/hooks";
import { AddMaterialBrandModal } from "../add-material-brand-modal";
import { useAllMaterialBrandQuery } from "@/services/apis/clients/community-client/query-hooks/useAllMaterialBrandQuery";
import { useDeleteMaterialBrandMutation } from "@/services/apis/clients/community-client/query-hooks/useDeleteMaterialBrandMutation";
import { IAllMaterialBrandList } from "@/services/apis/types";
import { IMaterialBrandListTableColumn } from "@/constants/tables/material-brand-list-table";

export function MaterialBrand() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMaterialBrand, setSelectedMaterialBrand] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { hasPermission } = usePermission();
  const cavAddMaterialBrand = hasPermission(EModule.LEAD_SOURCES, EAction.ADD);
  const cavEditMaterialBrand = hasPermission(
    EModule.LEAD_SOURCES,
    EAction.EDIT,
  );
  const cavDeleteMaterialBrand = hasPermission(
    EModule.LEAD_SOURCES,
    EAction.DELETE,
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const { allMaterialBrandData, allMaterialBrand } = useAllMaterialBrandQuery({
    page: currentPage,
  });

  const { onDeleteMaterialBrand } = useDeleteMaterialBrandMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      allMaterialBrand();
      setShowDeleteModal(false);
      setDeleteId(null);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
      setShowDeleteModal(false);
      setDeleteId(null);
    },
  });

  // Prepare full list from API
  const fullMaterialBrandList: IAllMaterialBrandList[] = (
    allMaterialBrandData?.data?.list ?? []
  ).map((lead) => ({
    id: lead?.id || "N/A",
    name: lead?.name || "N/A",
    created_at: `${formatDate(lead?.created_at)}` || "N/A",
    updated_at: `${formatDate(lead?.updated_at)}` || "N/A",
  }));

  // Extract pagination data
  const paginationData = allMaterialBrandData?.data?.pagination;

  // Filter list based on search term (case-insensitive)
  const filteredMaterialBrandList = useMemo(() => {
    if (!searchTerm.trim()) return fullMaterialBrandList;
    return fullMaterialBrandList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.updated_at.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, fullMaterialBrandList]);

  const leadMaterialBrandAction: ITableAction<IAllMaterialBrandList>[] = [];

  if (cavEditMaterialBrand) {
    leadMaterialBrandAction.push({
      label: "Edit",
      onClick: (row: IAllMaterialBrandList) => {
        setSelectedMaterialBrand({ id: row.id, name: row.name });
        setIsAddModalOpen(true);
      },
      className: "text-blue-500",
    });
  }

  if (cavDeleteMaterialBrand) {
    leadMaterialBrandAction.push({
      label: "Delete",
      onClick: (row: IAllMaterialBrandList) => {
        setDeleteId(row.id);
        setShowDeleteModal(true);
      },
      className: "text-red-500",
    });
  }

  // Called after add or edit success: refetch + clear edit state
  const handleAddMaterialBrandSuccessCallback = () => {
    allMaterialBrand();
    setSelectedMaterialBrand(null); // Clear edit materialBrand after success
    setIsAddModalOpen(false); // Close modal after success
  };

  // Clear modal and edit materialBrand when modal closes (Cancel or outside click)
  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setSelectedMaterialBrand(null);
  };

  const materialBrandNameToDelete = deleteId
    ? filteredMaterialBrandList.find((s) => s.id === deleteId)?.name || ""
    : "";

  return (
    <div className="bg-[#F8F8F8] p-5  rounded-xl  border  border-gray-300">
      <div className="flex justify-between items-center flex-wrap gap-4 ">
        <h1 className="text-[1.2rem]  font-medium">Product Brand List</h1>
        <div className="flex items-center flex-wrap gap-4 ">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          {cavAddMaterialBrand ? (
            <Button
              title="Add Product Brand"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => {
                setSelectedMaterialBrand(null); // Clear any edit before opening
                setIsAddModalOpen(true);
              }}
            />
          ) : null}
        </div>
      </div>

      <div className="w-full mt-4">
        <Table
          data={filteredMaterialBrandList}
          columns={IMaterialBrandListTableColumn}
          actions={leadMaterialBrandAction}
          paginationData={paginationData}
          onPageChange={setCurrentPage}
        />
      </div>
      {isAddModalOpen && (
        <AddMaterialBrandModal
          isOpen={isAddModalOpen}
          onClose={handleModalClose}
          onAddMaterialBrandSuccessCallback={
            handleAddMaterialBrandSuccessCallback
          }
          materialBrandId={selectedMaterialBrand?.id}
          materialBrandName={selectedMaterialBrand?.name}
          onClearEditData={() => setSelectedMaterialBrand(null)}
        />
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        onConfirm={() => {
          if (deleteId) onDeleteMaterialBrand(deleteId);
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        isLoading={false}
        title="Delete Product Brand"
        message="Are you sure you want to delete this Product Brand "
        itemName={materialBrandNameToDelete}
      />
    </div>
  );
}
