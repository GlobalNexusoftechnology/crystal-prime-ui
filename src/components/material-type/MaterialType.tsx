"use client";

import { useState, useMemo } from "react";
import { SearchBar, Button, Table } from "@/components";
import { EAction, EModule, ITableAction } from "@/constants";
import { DeleteModal } from "@/components";
// import {
//   IAllMaterialTypeList,
//   useAllMaterialTypeQuery,
//   useDeleteMaterialTypeMutation,
// } from "@/services";
import { formatDate, IApiError } from "@/utils";
import toast from "react-hot-toast";
import { usePermission } from "@/utils/hooks";
import { IAllMaterialTypeList } from "@/services/apis/types";
import { useAllMaterialTypeQuery } from "@/services/apis/clients/community-client/query-hooks/useAllMaterialTypeQuery";
import { useDeleteMaterialTypeMutation } from "@/services/apis/clients/community-client/query-hooks/useDeleteMaterialTypeMutation";
import { AddMaterialTypeModal } from "@/features/admin/settings/components/add-material-type-modal/AddMaterialTypeModal";
import { IMaterialTypeListTableColumn } from "../table/components/material-type-list-table";

export function MaterialType() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMaterialType, setSelectedMaterialType] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { hasPermission } = usePermission();
  const cavAddMaterialType = hasPermission(EModule.LEAD_SOURCES, EAction.ADD);
  const cavEditMaterialType = hasPermission(EModule.LEAD_SOURCES, EAction.EDIT);
  const cavDeleteMaterialType = hasPermission(
    EModule.LEAD_SOURCES,
    EAction.DELETE,
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const { allMaterialTypeData, allMaterialType } = useAllMaterialTypeQuery({
    page: currentPage,
  });

  const { onDeleteMaterialType } = useDeleteMaterialTypeMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      allMaterialType();
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
  const fullMaterialTypeList: IAllMaterialTypeList[] = (
    allMaterialTypeData?.data?.list ?? []
  ).map((lead) => ({
    id: lead?.id || "N/A",
    name: lead?.name || "N/A",
    created_at: `${formatDate(lead?.created_at)}` || "N/A",
    updated_at: `${formatDate(lead?.updated_at)}` || "N/A",
  }));

  // Extract pagination data
  const paginationData = allMaterialTypeData?.data?.pagination;

  // Filter list based on search term (case-insensitive)
  const filteredMaterialTypeList = useMemo(() => {
    if (!searchTerm.trim()) return fullMaterialTypeList;
    return fullMaterialTypeList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.updated_at.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, fullMaterialTypeList]);

  const leadMaterialTypeAction: ITableAction<IAllMaterialTypeList>[] = [];

  if (cavEditMaterialType) {
    leadMaterialTypeAction.push({
      label: "Edit",
      onClick: (row: IAllMaterialTypeList) => {
        setSelectedMaterialType({ id: row.id, name: row.name });
        setIsAddModalOpen(true);
      },
      className: "text-blue-500",
    });
  }

  if (cavDeleteMaterialType) {
    leadMaterialTypeAction.push({
      label: "Delete",
      onClick: (row: IAllMaterialTypeList) => {
        setDeleteId(row.id);
        setShowDeleteModal(true);
      },
      className: "text-red-500",
    });
  }

  // Called after add or edit success: refetch + clear edit state
  const handleAddMaterialTypeSuccessCallback = () => {
    allMaterialType();
    setSelectedMaterialType(null); // Clear edit materialType after success
    setIsAddModalOpen(false); // Close modal after success
  };

  // Clear modal and edit materialType when modal closes (Cancel or outside click)
  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setSelectedMaterialType(null);
  };

  const materialTypeNameToDelete = deleteId
    ? filteredMaterialTypeList.find((s) => s.id === deleteId)?.name || ""
    : "";

  return (
    <div className="bg-[#F8F8F8] p-5  rounded-xl  border  border-gray-300">
      <div className="flex justify-between items-center flex-wrap gap-4 ">
        <h1 className="text-[1.2rem]  font-medium">Product Type List</h1>
        <div className="flex items-center flex-wrap gap-4 ">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          {cavAddMaterialType ? (
            <Button
              title="Add Product Type"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => {
                setSelectedMaterialType(null); // Clear any edit before opening
                setIsAddModalOpen(true);
              }}
            />
          ) : null}
        </div>
      </div>

      <div className="w-full mt-4">
        <Table
          data={filteredMaterialTypeList}
          columns={IMaterialTypeListTableColumn}
          actions={leadMaterialTypeAction}
          paginationData={paginationData}
          onPageChange={setCurrentPage}
        />
      </div>
      {isAddModalOpen && (
        <AddMaterialTypeModal
          isOpen={isAddModalOpen}
          onClose={handleModalClose}
          onAddMaterialTypeSuccessCallback={
            handleAddMaterialTypeSuccessCallback
          }
          materialTypeId={selectedMaterialType?.id}
          materialTypeName={selectedMaterialType?.name}
          onClearEditData={() => setSelectedMaterialType(null)}
        />
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        onConfirm={() => {
          if (deleteId) onDeleteMaterialType(deleteId);
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        isLoading={false}
        title="Delete Product Type"
        message="Are you sure you want to delete this Product Type "
        itemName={materialTypeNameToDelete}
      />
    </div>
  );
}
