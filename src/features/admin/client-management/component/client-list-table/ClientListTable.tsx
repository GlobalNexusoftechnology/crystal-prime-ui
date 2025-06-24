"use client";

import { useState } from "react";
import { Button, SearchBar } from "@/components";
import {
  EAction,
  EModule,
  IClientListProps,
  ITableAction,
} from "@/constants";
import { ExportIcon } from "@/features";
import { AddClientModal } from "../add-client-modal";
import { useAllClientQuery, useDeleteClientMutation, useUpdateClientMutation, useAllClientDownloadExcelQuery, useClientDownloadTemplateExcelQuery } from "@/services";
import { usePermission } from "@/utils/hooks";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import { CustomClientTable } from "..";
import { downloadBlobFile } from "@/utils";

/**
 * ClientListTable component renders a section displaying the list of clients.
 */
export function ClientListTable() {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<IClientListProps | null>(null);
  const { allClientData, refetchClient } = useAllClientQuery();
  const { hasPermission } = usePermission();
  const canEditClient = hasPermission(EModule.CLIENT_MANAGEMENT, EAction.EDIT);
  const canDeleteClient = hasPermission(
    EModule.CLIENT_MANAGEMENT,
    EAction.DELETE
  );

  const clientListActions: ITableAction<IClientListProps>[] = [];

  const handleEdit = (client: IClientListProps) => {
    setSelectedClient(client);
    setIsAddClientModalOpen(true);
  };

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
      onClick: (row) => handleDelete(row.id),
      className: "text-red-500",
    });
  }

  const { onDeleteClient } = useDeleteClientMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      refetchClient();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
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

  const handleExportClients = async () => {
    const { data } = await onAllClientDownloadExcel();
    if (data instanceof Blob) {
      await downloadBlobFile(data, `clients_${new Date().getTime()}.xlsx`);
    }
  };

  const handleDownloadTemplate = async () => {
    const { data } = await onClientDownloadTemplateExcel();
    if (data instanceof Blob) {
      await downloadBlobFile(data, `upload_client_template.xlsx`);
    }
  };

  const handleCloseModal = () => {
    setIsAddClientModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="flex flex-col gap-4 2xl:gap-[1vw]">
      <div className="flex flex-col lg:items-center gap-4 lg:flex-row lg:gap-0 justify-between">
        <h1 className="font-medium text-2xl 2xl:text-[1.5vw]">Client List</h1>
        <div className="flex flex-col md:flex-row justify-between gap-4 2xl:gap-[1vw]">
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
            rightIcon={<ExportIcon color="#034A9F" className="rotate-180 " />}
            width="w-full md:w-fit"
            onClick={handleDownloadTemplate}
          />
          <Button
            title="Add New Client"
            variant="primary-outline-blue"
            width="w-full md:w-fit"
            onClick={() => setIsAddClientModalOpen(true)}
          />
          <SearchBar
            width="w-full"
            onSearch={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>

      <CustomClientTable
        data={allClientData || []}
        actions={clientListActions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isAddClientModalOpen && (
        <AddClientModal 
          onClose={handleCloseModal} 
          selectedClient={selectedClient}
          onUpdateClient={updateClient}
          isUpdatePending={isUpdatePending}
        />
      )}
    </div>
  );
}
