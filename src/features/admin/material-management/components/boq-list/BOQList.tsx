"use client"
import React, { useState } from "react";
import { SearchBar, DeleteModal } from "@/components";
import { Breadcrumb } from "@/features";
import { IAllBoqList, useDeleteBoqMutation, useAllBoqQuery, useUpdateBOQStatusMutation } from "@/services";
import { usePermission } from "@/utils/hooks";
import { BOQListTable } from "./components";
import { EModule, EAction } from "@/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BoqStatus } from "@/constants/material";

export function BOQList() {
  const { allBoqData = [], refetchAllBoq } = useAllBoqQuery();
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<IAllBoqList | null>(null);
  const { hasPermission } = usePermission();
  const router = useRouter();

  // Update BOQ mutation for status
  const { onUpdateBOQStatus, isPending: isUpdatingStatus } = useUpdateBOQStatusMutation({
    onSuccessCallback: () => {
      toast.success("BOQ status updated successfully");
      refetchAllBoq();
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || "Failed to update BOQ status");
    },
  });

  // Delete BOQ mutation
  const { onDeleteBoq, isPending: isDeleting } = useDeleteBoqMutation({
    onSuccessCallback: () => {
      toast.success("BOQ deleted successfully");
      setDeleteConfirm(null);
      refetchAllBoq();
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || "Failed to delete BOQ");
    },
  });

  // Permission checks
  const canEditBoq = hasPermission(EModule.BOQ, EAction.EDIT);
  const canDeleteBoq = hasPermission(EModule.BOQ, EAction.DELETE);

  const filteredData = React.useMemo(() => {
    // Filter out proposal_ready status items from BOQ list
    const nonProposalReadyData = allBoqData.filter((item: IAllBoqList) => 
      item.status !== BoqStatus.PROPOSAL_READY
    );
    
    if (!search) return nonProposalReadyData;
    return nonProposalReadyData.filter((item: IAllBoqList) =>
      (item.leadName || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (item.businessName || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (item.lead?.lead_code || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [allBoqData, search]);

  // Action handlers
  const handleEdit = React.useCallback((boq: IAllBoqList) => {
    router.push(`/admin/material-management/boq?boqId=${boq.id}`);
  }, [router]);

  const handleDelete = React.useCallback((boq: IAllBoqList) => {
    setDeleteConfirm(boq);
  }, []);

  const confirmDelete = React.useCallback(() => {
    if (deleteConfirm) {
      onDeleteBoq(deleteConfirm.id);
    }
  }, [deleteConfirm, onDeleteBoq]);

  const cancelDelete = React.useCallback(() => {
    setDeleteConfirm(null);
  }, []);

  // Define actions based on permissions
  const actions = React.useMemo(() => {
    const actionButtons = [];
        
    if (canEditBoq) {
      actionButtons.push({
        label: "Edit",
        onClick: handleEdit,
        className: "text-green-600",
      });
    }
    
    if (canDeleteBoq) {
      actionButtons.push({
        label: "Delete",
        onClick: handleDelete,
        className: "text-red-600",
      });
    }
    
    return actionButtons;
  }, [canEditBoq, canDeleteBoq, handleEdit, handleDelete]);

  // Status label map for dropdown
  const statusLabelMap: Record<BoqStatus, string> = {
    [BoqStatus.PENDING]: "Pending",
    [BoqStatus.PROPOSAL_READY]: "Proposal Ready",
    [BoqStatus.CANCELLED]: "Cancelled",
  };

  // Status options for dropdown
  const statusOptions = Object.values(BoqStatus).map((status) => ({
    label: statusLabelMap[status as BoqStatus] || status,
    value: status,
  }));

  // Update status handler with API call
  const handleStatusChange = (id: string, newStatus: string) => {
    const boq = allBoqData.find((b) => b.id === id);
    if (!boq) {
      toast.error("BOQ not found");
      return;
    }
    onUpdateBOQStatus({
       id, payload: {
        status: newStatus as BoqStatus,
       }
    });
  };

  return (
    <section className="flex flex-col gap-4  border  border-gray-300 rounded-lg  bg-white px-2 sm:px-6  py-2 sm:py-4 ">
      <Breadcrumb />
      <h1 className="text-2xl  font-medium">BOQ List</h1>
      <SearchBar
        placeholder="Search Client"
        onSearch={setSearch}
        value={search}
        bgColor="white"
        width="w-full md:w-[25vw] "
      />
      <BOQListTable
        data={filteredData}
        actions={actions}
        statusOptions={statusOptions}
        onStatusChange={handleStatusChange}
        isUpdatingStatus={isUpdatingStatus}
      />
      <DeleteModal
        isOpen={!!deleteConfirm}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete BOQ"
        message={`Are you sure you want to delete the BOQ for `}
        itemName={deleteConfirm?.businessName || ''}
        isLoading={isDeleting}
      />
    </section>
  );
}