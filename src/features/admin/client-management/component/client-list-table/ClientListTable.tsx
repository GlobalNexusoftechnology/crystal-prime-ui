"use client";

import { useState } from "react";
import { Button, SearchBar, Table } from "@/components";
import {
  clientListColumn,
  EAction,
  EModule,
  IClientListProps,
  ITableAction,
} from "@/constants";
import { ExportIcon } from "@/features";
import { AddClientModal } from "../add-client-modal";
import { useAllClientQuery, useDeleteClientMutation, useUpdateClientMutation } from "@/services";
import { usePermission } from "@/utils/hooks";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";

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

  if (canEditClient) {
    clientListActions.push({
      label: "Edit",
      onClick: (row: IClientListProps) => {
        setSelectedClient(row);
        setIsAddClientModalOpen(true);
      },
      className: "text-blue-500",
    });
  }

  if (canDeleteClient) {
    clientListActions.push({
      label: "Delete",
      onClick: (row: IClientListProps) => {
        onDeleteClient(row.id);
      },
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
          />
          <Button
            title="Import"
            variant="primary-outline-blue"
            rightIcon={<ExportIcon color="#034A9F" className="rotate-180 " />}
            width="w-full md:w-fit"
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

      <Table
        data={allClientData || []}
        columns={clientListColumn}
        actions={clientListActions}
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
