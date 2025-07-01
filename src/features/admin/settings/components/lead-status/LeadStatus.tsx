"use client";

import { useMemo, useState } from "react";
import { SearchBar, Button, Table } from "@/components";
import {
  IAllStatusesList,
  useAllStatusesQuery,
  useDeleteStatusesMutation,
} from "@/services";
import { formatDate, IApiError } from "@/utils";
import toast from "react-hot-toast";
import { AddLeadStatusModal } from "../add-lead-status-modal";
import { ILeadStatusListTableColumn } from "@/constants";

export function LeadStatus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<{
    id: string;
    name: string;
    color: string;
  } | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const { allStatusesData, allStatuses } = useAllStatusesQuery();

  const { onDeleteStatuses } = useDeleteStatusesMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      allStatuses();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  // Prepare full list from API
  const fullStatusesList: IAllStatusesList[] = (allStatusesData ?? []).map(
    (lead) => ({
      id: lead?.id || "N/A",
      name: lead?.name || "N/A",
      color: lead?.color ?? undefined,
      created_at: `${formatDate(lead?.created_at)}` || "N/A",
      updated_at: `${formatDate(lead?.updated_at)}` || "N/A",
    })
  );

  // Filter list based on search term (case-insensitive)
  const filteredStatusesList = useMemo(() => {
    if (!searchTerm.trim()) return fullStatusesList;
    return fullStatusesList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.updated_at.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, fullStatusesList]);

  const leadStatusAction = [
    {
      label: "Edit",
      onClick: (row: IAllStatusesList) => {
        console.log("Edit clicked", row.id);
        setSelectedStatus({ id: row.id, name: row.name, color: row.color || "" });
        setIsAddModalOpen(true);
      },
      className: "text-blue-500",
    },
    {
      label: "Delete",
      onClick: (row: IAllStatusesList) => {
        console.log("Delete clicked", row.id);
        onDeleteStatuses(row.id);
      },
      className: "text-red-500",
    },
  ];

  const handleAddStatusSuccessCallback = () => {
    allStatuses();
    setSelectedStatus(null); // Clear edit status after success
    setIsAddModalOpen(false); // Close modal after success
  };

  // Clear modal and edit status when modal closes (Cancel or outside click)
  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setSelectedStatus(null);
  };

  return (
    <div className="bg-[#F8F8F8] p-5 rounded-xl">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Leads Status List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          <Button
            title="Add Status"
            variant="background-white"
            width="w-full md:w-fit"
            onClick={() => {
              setSelectedStatus(null); // Clear any edit before opening
              setIsAddModalOpen(true);
            }}
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <Table
          data={filteredStatusesList}
          columns={ILeadStatusListTableColumn}
          actions={leadStatusAction}
        />
      </div>
      {/* 👇 MODAL WHEN "VIEW" IS CLICKED */}
      {isAddModalOpen && (
        <AddLeadStatusModal
          isOpen={isAddModalOpen}
          onClose={handleModalClose}
          onAddStatusSuccessCallback={handleAddStatusSuccessCallback}
          statusId={selectedStatus?.id}
          statusName={selectedStatus?.name}
          statusColor={selectedStatus?.color}
          onClearEditData={() => setSelectedStatus(null)}
        />
      )}
    </div>
  );
}
