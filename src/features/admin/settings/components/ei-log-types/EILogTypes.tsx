"use client";

import { useState, useMemo } from "react";
import { SearchBar, Button, Table } from "@/components";
import { EAction, EModule, IEILogTypesListTableColumn, ITableAction } from "@/constants";
import {
  IAllEILogTypeList,
  useAllEILogTypesQuery,
  useDeleteEILogTypeMutation,
} from "@/services";
import { formatDate, IApiError } from "@/utils";
import toast from "react-hot-toast";
import { usePermission } from "@/utils/hooks";
import { AddEILogTypesModal } from "../add-ei-log-types-modal";

export function EILogTypes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { hasPermission } = usePermission();
  const cavAddTypes = hasPermission(EModule.EI_LOG_TYPES, EAction.ADD);
  const cavEditTypes = hasPermission(EModule.EI_LOG_TYPES, EAction.EDIT);
  const cavDeleteTypes = hasPermission(EModule.EI_LOG_TYPES, EAction.DELETE);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const { allEILogTypesData, fetchAllEILogTypes } = useAllEILogTypesQuery();

  const { onDeleteEILogType } = useDeleteEILogTypeMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      fetchAllEILogTypes();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  // Prepare full list from API
  const fullTypesList: IAllEILogTypeList[] = (allEILogTypesData?.data ?? []).map(
    (type) => ({
      id: type?.id || "N/A",
      name: type?.name || "N/A",
      created_at: `${formatDate(type?.created_at)}` || "N/A",
      updated_at: `${formatDate(type?.updated_at)}` || "N/A",
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

  const eiLogTypesAction: ITableAction<IAllEILogTypeList>[] = [];

  if (cavEditTypes) {
    eiLogTypesAction.push({
      label: "Edit",
      onClick: (row: IAllEILogTypeList) => {
        setSelectedType({ id: row.id, name: row.name });
        setIsAddModalOpen(true);
      },
      className: "text-blue-500",
    });
  }

  if (cavDeleteTypes) {
    eiLogTypesAction.push({
      label: "Delete",
      onClick: (row: IAllEILogTypeList) => {
        onDeleteEILogType(row.id);
      },
      className: "text-red-500",
    });
  }

  // Called after add or edit success: refetch + clear edit state
  const handleAddTypeSuccessCallback = () => {
    fetchAllEILogTypes();
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
          EI Log Types List
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
          columns={IEILogTypesListTableColumn}
          actions={eiLogTypesAction}
        />
      </div>
      {isAddModalOpen && (
        <AddEILogTypesModal
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