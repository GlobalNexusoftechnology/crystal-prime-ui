"use client";

import { useState, useMemo } from "react";
import { SearchBar, Button, Table } from "@/components";
import { ILeadSourcesListTableColumn } from "@/constants";
import { AddLeadSourcesModal } from "../add-lead-sources-modal";
import {
  IAllSourcesList,
  useAllSourcesQuery,
  useDeleteSourcesMutation,
} from "@/services";
import { formatDate, IApiError } from "@/utils";
import toast from "react-hot-toast";

export function LeadSources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const { allSourcesData, fetchAllSources } = useAllSourcesQuery();

  const { onDeleteSources } = useDeleteSourcesMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      fetchAllSources();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  // Prepare full list from API
  const fullSourcesList: IAllSourcesList[] = (allSourcesData?.data ?? []).map(
    (lead) => ({
      id: lead?.id || "N/A",
      name: lead?.name || "N/A",
      created_at: `${formatDate(lead?.created_at)}` || "N/A",
      updated_at: `${formatDate(lead?.updated_at)}` || "N/A",
    })
  );

  // Filter list based on search term (case-insensitive)
  const filteredSourcesList = useMemo(() => {
    if (!searchTerm.trim()) return fullSourcesList;
    return fullSourcesList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.updated_at.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, fullSourcesList]);

  const leadSourcesAction = [
    {
      label: "Edit",
      onClick: (row: IAllSourcesList) => {
        console.log("Edit clicked", row.id);
        setSelectedSource({ id: row.id, name: row.name });
        setIsAddModalOpen(true);
      },
      className: "text-blue-500",
    },
    {
      label: "Delete",
      onClick: (row: IAllSourcesList) => {
        console.log("Delete clicked", row.id);
        onDeleteSources(row.id);
      },
      className: "text-red-500",
    },
  ];

  const handleAddSourceSuccessCallback = () => {
    fetchAllSources();
  };

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
          data={filteredSourcesList}
          columns={ILeadSourcesListTableColumn}
          actions={leadSourcesAction}
        />
      </div>
      {isAddModalOpen && (
        <AddLeadSourcesModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddSourceSuccessCallback={handleAddSourceSuccessCallback}
          sourceId={selectedSource?.id}
          sourceName={selectedSource?.name}
        />
      )}
    </div>
  );
}
