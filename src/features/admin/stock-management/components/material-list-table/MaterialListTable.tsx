/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Table, Checkbox, DeleteModal } from "@/components";
import { ITableAction, ITableColumn } from "@/constants";
import toast from "react-hot-toast";
import { IApiError } from "@/utils";
import { useState } from "react";
import {
  IMaterialManagementProps,
  materialColumns,
} from "@/constants/tables/material-management-list";
import { useDeleteMaterialMutation } from "@/services/apis/clients/community-client/query-hooks/useDeleteMaterialMutation";
import { useChangeMaterialStatusMutation } from "@/services/apis/clients/community-client/query-hooks/useChangeMaterialStatusMutation";
import { MaterialHistoryTab } from "@/features/admin/inventory-management/inventory-management";

export function MaterialListTable({
  onEdit,
  data,
  onRefetch,
  paginationData,
  onPageChange,
}: {
  onEdit: (material: IMaterialManagementProps) => void;
  data: IMaterialManagementProps[];
  onRefetch: () => void;
  paginationData?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [materialToDelete, setMaterialToDelete] =
    useState<IMaterialManagementProps | null>(null);
  const [openTab, setOpenTab] = useState(false);
  const [id, setId] = useState("");
  const { onDeleteMaterial, isPending } = useDeleteMaterialMutation({
    onSuccessCallback: (res) => {
      toast.success(res?.message || "Inventory  deleted successfully");
      onRefetch();
      setShowDeleteConfirmation(false);
      setMaterialToDelete(null);
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || "Error deleting material");
      setShowDeleteConfirmation(false);
      setMaterialToDelete(null);
    },
  });

  const { onChangeMaterialStatus, isPending: isStatusPending } =
    useChangeMaterialStatusMutation({
      onSuccessCallback: () => {
        toast.success("Inventory  status updated");
        onRefetch();
      },
      onErrorCallback: (err: IApiError) => {
        toast.error(err?.message || "Error updating status");
      },
    });

  const closeTab = () => setOpenTab(false);

  // Use the data passed as props
  const normalizedData: IMaterialManagementProps[] = data || [];

  // Create columns with interactive checkbox for 'active'
  const columns = materialColumns.map((col) => {
    if (col.accessor === "active") {
      return {
        ...col,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: ({
          row,
          value,
        }: {
          row: IMaterialManagementProps;
          value: any;
        }) => (
          <Checkbox
            checked={!!value}
            disabled={isStatusPending}
            onChange={() =>
              onChangeMaterialStatus({ id: row.id, active: !value })
            }
            className="w-16 h-16 rounded-xl border-4 border-[#6C4BAF] checked:bg-[#6C4BAF] checked:border-[#6C4BAF] focus:ring-0 focus:outline-none"
          />
        ),
      } as ITableColumn<IMaterialManagementProps>;
    }
    return col;
  });

  const actions: ITableAction<IMaterialManagementProps>[] = [
    {
      label: "Manage Inventory",
      onClick: (row) => {
        setOpenTab(true);
        setId(row.id);
      },
    },
    {
      label: "Edit",
      onClick: (row) => {
        onEdit(row);
      },
    },
    {
      label: isPending ? "Deleting..." : "Delete",
      onClick: (row) => {
        setMaterialToDelete(row);
        setShowDeleteConfirmation(true);
      },
      className: "text-red-500",
    },
  ];

  if (normalizedData.length === 0)
    return <div className="text-center py-10  ">No inventory found.</div>;

  const datahistory = normalizedData.find((data) => data.id === id);
  return (
    <>
      <Table
        data={normalizedData}
        columns={columns}
        actions={actions}
        paginationData={paginationData}
        onPageChange={onPageChange}
      />
      <DeleteModal
        isOpen={showDeleteConfirmation}
        onClose={() => {
          setShowDeleteConfirmation(false);
          setMaterialToDelete(null);
        }}
        onConfirm={() => {
          if (materialToDelete?.id) {
            onDeleteMaterial(materialToDelete.id);
          }
        }}
        title="Delete Inventory "
        message="Are you sure you want to delete this material"
        itemName={materialToDelete?.name || ""}
        isLoading={isPending}
      />
      {openTab && <MaterialHistoryTab data={datahistory} onClose={closeTab} />}
    </>
  );
}
