"use client";

import { useState } from "react";
import { SearchBar, Button, Table } from "@/components";
import { IAllStatusesList, useAllStatusesQuery, useDeleteStatusesMutation } from "@/services";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import { AddLeadStatusModal } from "../add-lead-status-modal";
import { ILeadStatusListTableColumn } from "@/constants";

export function LeadStatus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const { allStatusesData, allStatuses } = useAllStatusesQuery();

  const { onDeleteStatuses } = useDeleteStatusesMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message)
      allStatuses()
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message)
    },
  });

  const filteredData = (allStatusesData ?? []).filter((sourceData: IAllStatusesList) =>
    sourceData.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const leadStatusAction = [
    {
      label: "Edit",
      onClick: (row: IAllStatusesList) => {
        console.log("Edit clicked", row.id);
      },
      className: "text-blue-500",
    },
    {
      label: "View",
      onClick: () => {},
      className: "text-blue-500",
    },
    {
      label: "Delete",
      onClick: (row: IAllStatusesList) => {
        console.log("Delete clicked", row.id);
        onDeleteStatuses(row.id)
      },
      className: "text-red-500",
    },
  ];

  const handleAddStatusSuccessCallback = () => {
    allStatuses();
  }

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
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <Table
          data={filteredData}
          columns={ILeadStatusListTableColumn}
          actions={leadStatusAction}
        />
      </div>

      {/* 👇 MODAL WHEN "VIEW" IS CLICKED */}
      {isAddModalOpen && (
        <AddLeadStatusModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddStatusSuccessCallback={handleAddStatusSuccessCallback}
        />
      )}
    </div>
  );
}
