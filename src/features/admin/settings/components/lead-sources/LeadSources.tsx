"use client";

import { useState } from "react";
import { SearchBar, Button, Table } from "@/components";
import { ILeadSourcesListTableColumn } from "@/constants";
import {
  AddLeadSourcesModal,
} from "../add-lead-sources-modal";
import { IAllSourcesList, useAllSourcesQuery } from "@/services";

export function LeadSources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const { allSourcesData, fetchAllSources } = useAllSourcesQuery();

  const filteredData = (allSourcesData?.data ?? []).filter((sourceData: IAllSourcesList) =>
    sourceData.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const leadSourcesaction = [
    {
      label: "Edit",
      onClick: (row: IAllSourcesList) => {
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
      onClick: (row: IAllSourcesList) => {
        console.log("Delete clicked", row.id);
      },
      className: "text-red-500",
    },
  ];

  const handleAddSourceSuccessCallback = () => {
    fetchAllSources();
  }

  return (
    <div className="bg-[#F8F8F8] p-5 rounded-xl">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Leads Source List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          <Button
            title="Add Sources"
            variant="background-white"
            width="w-full md:w-fit"
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <Table
          data={filteredData}
          columns={ILeadSourcesListTableColumn}
          actions={leadSourcesaction}
        />
      </div>

      {/* 👇 MODAL WHEN "VIEW" IS CLICKED */}
      {isAddModalOpen && (
        <AddLeadSourcesModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddSourceSuccessCallback={handleAddSourceSuccessCallback}
        />
      )}
    </div>
  );
}
