"use client";

import { useState, useRef, JSX } from "react";
import { Button, SearchBar } from "@/components";
import { EAction, EModule, IClientListProps, ITableAction } from "@/constants";
import { Breadcrumb, ExportIcon } from "@/features";
import { AddClientModal } from "../add-client-modal";
import {
  useAllClientQuery,
  useDeleteClientMutation,
  useUpdateClientMutation,
  useAllClientDownloadExcelQuery,
  useClientDownloadTemplateExcelQuery,
  useUploadClientFromExcelMutation,
} from "@/services";
import { usePermission, useDebounce } from "@/utils/hooks";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import { CustomClientTable } from "..";
import { downloadBlobFile } from "@/utils";
import { ImDownload2 } from "react-icons/im";
import { DeleteModal } from "@/components/modal/DeleteModal";

/**
 * Renders the client list table with search, import, export, and CRUD operations.
 *
 * This component integrates with API hooks to:
 * - Display a table of clients
 * - Allow adding, editing, deleting clients
 * - Provide import/export functionality via Excel
 * - Use permissions for conditional actions
 *
 * @returns {JSX.Element} ClientListTable component
 */
export function ClientListTable(): JSX.Element {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<IClientListProps | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { hasPermission } = usePermission();

  const canEditClient = hasPermission(EModule.CLIENT_MANAGEMENT, EAction.EDIT);
  const canDeleteClient = hasPermission(EModule.CLIENT_MANAGEMENT, EAction.DELETE);

  const clientListActions: ITableAction<IClientListProps>[] = [];

  /**
   * Handles editing a client.
   * @param client - The client to edit
   */
  const handleEdit = (client: IClientListProps) => {
    setSelectedClient(client);
    setIsAddClientModalOpen(true);
  };

  /**
   * Handles deleting a client.
   * @param id - The client ID to delete
   */
  const handleDelete = (id: string) => {
    onDeleteClient(id);
  };

  if (canEditClient) {
    clientListActions.push({
      label: "Edit",
      onClick: handleEdit,
      className: "text-blue-500",
    });
  }

  if (canDeleteClient) {
    clientListActions.push({
      label: "Delete",
      onClick: (row) => {
        setDeleteId(row.id);
        setShowDeleteModal(true);
      },
      className: "text-red-500",
    });
  }

  const { onDeleteClient, isPending: isDeletePending } = useDeleteClientMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      refetchClient();
      setShowDeleteModal(false);
      setDeleteId(null);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
      setShowDeleteModal(false);
      setDeleteId(null);
    },
  });

  const { updateClient, isPending: isUpdatePending } = useUpdateClientMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      refetchClient();
      setIsAddClientModalOpen(false);
      setSelectedClient(null);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const { onAllClientDownloadExcel } = useAllClientDownloadExcelQuery();
  const { onClientDownloadTemplateExcel } = useClientDownloadTemplateExcelQuery();

  /**
   * Downloads all clients as an Excel file.
   */
  const handleExportClients = async () => {
    const blob = await onAllClientDownloadExcel(searchQuery); // pass searchQuery if you want filtered export
    if (blob instanceof Blob) {
      await downloadBlobFile(blob, `clients_data.xlsx`);
    }
  };

  /**
   * Downloads the Excel template for uploading clients.
   */
  const handleDownloadTemplate = async () => {
    const { data } = await onClientDownloadTemplateExcel();
    if (data instanceof Blob) {
      await downloadBlobFile(data, `upload_client_template.xlsx`);
    }
  };

  /**
   * Closes the Add/Edit Client modal and resets selected client.
   */
  const handleCloseModal = () => {
    setIsAddClientModalOpen(false);
    setSelectedClient(null);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { onUploadClientFromExcel, isPending: isUploading } = useUploadClientFromExcelMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message || "Clients imported successfully");
      refetchClient();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message || "Failed to import clients");
    },
  });

  /**
   * Triggers file input click for importing clients.
   */
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handles file change and uploads the selected Excel file.
   * @param e - File input change event
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      onUploadClientFromExcel(formData);
      e.target.value = ""; // reset input
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { debouncedValue: debouncedSearch } = useDebounce({
    initialValue: searchQuery,
    delay: 300,
    onChangeCb: () => {},
  });

  // Use the debounced value for backend search
  const { allClientData, refetchClient } = useAllClientQuery({ searchText: debouncedSearch, page: currentPage });

  // Remove the frontend filter:
  // const filteredClients = (allClientData || []).filter(...);
  // Instead, just use allClientData directly:
  const filteredClients = allClientData?.data?.list || [];
  const paginationData = allClientData?.data?.pagination;

  const clientNameToDelete = deleteId ? filteredClients.find((c) => c.id === deleteId)?.name : "";

  return (
    <div className="flex flex-col gap-8 2xl:gap-[2vw] px-4 2xl:p-[1vw] py-2 2xl:py-[0.5vw]">
      <div className="flex flex-col gap-4 2xl:gap-[1vw]">
        <Breadcrumb />
        <div className="flex flex-col flex-wrap lg:items-center gap-4 lg:flex-row lg:gap-0 justify-between">
          <h1 className="font-medium text-2xl 2xl:text-[1.5vw]">Client List</h1>
          <div className="flex flex-col flex-wrap md:flex-row gap-4 2xl:gap-[1vw]">
            <SearchBar
              value={searchQuery}
              onSearch={setSearchQuery}
              placeholder="Search clients..."
            />
            <Button
              title="Add New Client"
              variant="primary-outline-blue"
              width="w-full md:w-fit"
              onClick={() => setIsAddClientModalOpen(true)}
            />
            <Button
              title="Export"
              variant="primary-outline-blue"
              rightIcon={<ExportIcon color="#034A9F" />}
              width="w-full md:w-fit"
              onClick={handleExportClients}
            />
            <Button
              title="Import"
              variant="primary-outline-blue"
              rightIcon={<ExportIcon color="#034A9F" className="rotate-180" />}
              width="w-full md:w-fit"
              onClick={handleImportClick}
              disabled={isUploading}
            />
            <input
              type="file"
              accept=".xlsx,.xls"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              variant="primary-outline-blue"
              width="w-full md:w-fit"
              onClick={handleDownloadTemplate}
              leftIcon={
                <ImDownload2
                  className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]"
                  color="#034A9F"
                />
              }
              tooltip="Download Template"
            />
          </div>
        </div>
      </div>
      <CustomClientTable
        data={filteredClients}
        actions={clientListActions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refetch={refetchClient}
        paginationData={paginationData}
        onPageChange={setCurrentPage}
      />
      {isAddClientModalOpen && (
        <AddClientModal
          clientRefech={refetchClient}
          onClose={handleCloseModal}
          selectedClient={selectedClient}
          onUpdateClient={updateClient}
          isUpdatePending={isUpdatePending}
        />
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        onConfirm={() => {
          if (deleteId) onDeleteClient(deleteId);
        }}
        isLoading={isDeletePending}
        title="Delete Client"
        message="Are you sure you want to delete this client "
        itemName={clientNameToDelete}
      />
    </div>
  );
}
