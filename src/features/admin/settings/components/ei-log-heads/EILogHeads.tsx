"use client";

import { useState, useMemo } from "react";
import { SearchBar, Button, Table } from "@/components";
import { EAction, EModule, IEILogHeadsListTableColumn, ITableAction } from "@/constants";
import {
  IAllEILogHeadList,
  useAllEILogHeadsQuery,
  useDeleteEILogHeadMutation,
} from "@/services";
import { formatDate, IApiError } from "@/utils";
import toast from "react-hot-toast";
import { usePermission } from "@/utils/hooks";
import { AddEILogHeadsModal } from "../add-ei-log-heads-modal";
import { DeleteModal } from "@/components";

export function EILogHeads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHead, setSelectedHead] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { hasPermission } = usePermission();
  const cavAddHeads = hasPermission(EModule.EI_LOG_HEADS, EAction.ADD);
  const cavEditHeads = hasPermission(EModule.EI_LOG_HEADS, EAction.EDIT);
  const cavDeleteHeads = hasPermission(EModule.EI_LOG_HEADS, EAction.DELETE);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const { allEILogHeadsData, fetchAllEILogHeads } = useAllEILogHeadsQuery({ page: currentPage });

  const { onDeleteEILogHead } = useDeleteEILogHeadMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      fetchAllEILogHeads();
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
  const fullHeadsList: IAllEILogHeadList[] = (allEILogHeadsData?.data?.list ?? []).map(
    (head) => ({
      id: head?.id || "N/A",
      name: head?.name || "N/A",
      created_at: `${formatDate(head?.created_at)}` || "N/A",
      updated_at: `${formatDate(head?.updated_at)}` || "N/A",
    })
  );

  // Extract pagination data
  const paginationData = allEILogHeadsData?.data?.pagination;

  // Filter list based on search term (case-insensitive)
  const filteredHeadsList = useMemo(() => {
    if (!searchTerm.trim()) return fullHeadsList;
    return fullHeadsList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.updated_at.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, fullHeadsList]);

  const eiLogHeadsAction: ITableAction<IAllEILogHeadList>[] = [];

  if (cavEditHeads) {
    eiLogHeadsAction.push({
      label: "Edit",
      onClick: (row: IAllEILogHeadList) => {
        setSelectedHead({ id: row.id, name: row.name });
        setIsAddModalOpen(true);
      },
      className: "text-blue-500",
    });
  }

  if (cavDeleteHeads) {
    eiLogHeadsAction.push({
      label: "Delete",
      onClick: (row: IAllEILogHeadList) => {
        setDeleteId(row.id);
        setShowDeleteModal(true);
      },
      className: "text-red-500",
    });
  }

  // Called after add or edit success: refetch + clear edit state
  const handleAddHeadSuccessCallback = () => {
    fetchAllEILogHeads();
    setSelectedHead(null); // Clear edit head after success
    setIsAddModalOpen(false); // Close modal after success
  };

  // Clear modal and edit head when modal closes (Cancel or outside click)
  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setSelectedHead(null);
  };

  const headNameToDelete = deleteId
    ? filteredHeadsList.find((h) => h.id === deleteId)?.name || ""
    : "";

  return (
    <div className="bg-[#F8F8F8] p-5 2xl:p-[1.25vw]rounded-xl 2xl:rounded-[0.75vw] border 2xl:border-[0.1vw] border-gray-300">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          EI Log Heads List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          {cavAddHeads ? (
            <Button
              title="Add Heads"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => {
                setSelectedHead(null); // Clear any edit before opening
                setIsAddModalOpen(true);
              }}
            />
          ) : null}
        </div>
      </div>

      <div className="w-full mt-4">
        <Table
          data={filteredHeadsList}
          columns={IEILogHeadsListTableColumn}
          actions={eiLogHeadsAction}
          paginationData={paginationData}
          onPageChange={setCurrentPage}
        />
      </div>
      {isAddModalOpen && (
        <AddEILogHeadsModal
          isOpen={isAddModalOpen}
          onClose={handleModalClose}
          onAddHeadSuccessCallback={handleAddHeadSuccessCallback}
          headId={selectedHead?.id}
          headName={selectedHead?.name}
          onClearEditData={() => setSelectedHead(null)}
        />
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        onConfirm={() => {
          if (deleteId) onDeleteEILogHead(deleteId);
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        isLoading={false}
        title="Delete EI Log Head"
        message="Are you sure you want to delete this EI Log Head "
        itemName={headNameToDelete}
      />
    </div>
  );
} 