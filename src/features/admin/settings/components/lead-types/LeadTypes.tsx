"use client";

import { useState, useMemo } from "react";
import { SearchBar, Button, Table } from "@/components";
import { EAction, EModule, ILeadTypesListTableColumn, ITableAction } from "@/constants";
import {
  IAllTypesList,
  useAllTypesQuery,
  useDeleteTypeMutation,
} from "@/services";
import { formatDate, IApiError } from "@/utils";
import toast from "react-hot-toast";
import { usePermission } from "@/utils/hooks";
import { AddLeadTypesModal } from "./components";

export function LeadTypes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { hasPermission } = usePermission();
  const cavAddTypes = hasPermission(EModule.LEAD_SOURCES, EAction.ADD);
  const cavEditTypes = hasPermission(EModule.LEAD_SOURCES, EAction.EDIT);
  const cavDeleteTypes = hasPermission(EModule.LEAD_SOURCES, EAction.DELETE);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const { allTypesData, fetchAllTypes } = useAllTypesQuery();

  const { onDeleteTypes } = useDeleteTypeMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      fetchAllTypes();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  // Prepare full list from API
  const fullTypesList: IAllTypesList[] = (allTypesData?.data ?? []).map(
    (lead) => ({
      id: lead?.id || "N/A",
      name: lead?.name || "N/A",
      created_at: `${formatDate(lead?.created_at)}` || "N/A",
      updated_at: `${formatDate(lead?.updated_at)}` || "N/A",
    })
  );

  // Filter list based on search term (case-insensitive)
  const filteredTypesList = useMemo(() => {
    if (!searchTerm.trim()) return fullTypesList;
    return fullTypesList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.updated_at.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, fullTypesList]);

  const leadTypesAction: ITableAction<IAllTypesList>[] = [];

  if (cavEditTypes) {
    leadTypesAction.push({
      label: "Edit",
      onClick: (row: IAllTypesList) => {
        setSelectedType({ id: row.id, name: row.name });
        setIsAddModalOpen(true);
      },
      className: "text-blue-500",
    });
  }

  if (cavDeleteTypes) {
    leadTypesAction.push({
      label: "Delete",
      onClick: (row: IAllTypesList) => {
        onDeleteTypes(row.id);
      },
      className: "text-red-500",
    });
  }

  // Called after add or edit success: refetch + clear edit state
  const handleAddTypeSuccessCallback = () => {
    fetchAllTypes();
    setSelectedType(null); // Clear edit type after success
    setIsAddModalOpen(false); // Close modal after success
  };

  // Clear modal and edit type when modal closes (Cancel or outside click)
  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setSelectedType(null);
  };

  return (
    <div className="bg-[#F8F8F8] p-5 rounded-xl">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Leads Type List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          {cavAddTypes ? (
            <Button
              title="Add Types"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => {
                setSelectedType(null); // Clear any edit before opening
                setIsAddModalOpen(true);
              }}
            />
          ) : null}
        </div>
      </div>

      <div className="w-full mt-4">
        <Table
          data={filteredTypesList}
          columns={ILeadTypesListTableColumn}
          actions={leadTypesAction}
        />
      </div>
      {isAddModalOpen && (
        <AddLeadTypesModal
          isOpen={isAddModalOpen}
          onClose={handleModalClose}
          onAddTypeSuccessCallback={handleAddTypeSuccessCallback}
          typeId={selectedType?.id}
          typeName={selectedType?.name}
          onClearEditData={() => setSelectedType(null)}
        />
      )}
    </div>
  );
}
