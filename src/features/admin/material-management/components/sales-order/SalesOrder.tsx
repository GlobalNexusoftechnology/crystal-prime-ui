"use client";
import { DeleteModal, SearchBar } from "@/components";
import { Breadcrumb } from "@/features";
import React, { useState, useMemo, useCallback } from "react";
import { EditSalesOrderModal, CustomSalesOrderTable } from "./components";
import {
  useAllSalesOrderQuery,
  useDeleteSalesOrderMutation,
  ISalesOrderList,
  useDownloadSalesOrderPdfMutation,
} from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function SalesOrder() {
  const router = useRouter();
  const { allSalesOrderData = [], refetchAllSalesOrder } =
    useAllSalesOrderQuery();
  const [search, setSearch] = useState("");

  const [deleteConfirm, setDeleteConfirm] = useState<ISalesOrderList | null>(
    null
  );

  // ✅ Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] =
    useState<Partial<ISalesOrderList> | null>(null);

  // Delete Sales Order mutation
  const { onDeleteSalesOrder, isPending: isDeleting } =
    useDeleteSalesOrderMutation({
      onSuccessCallback: () => {
        toast.success("Sales Order deleted successfully");
        setDeleteConfirm(null);
        refetchAllSalesOrder();
      },
      onErrorCallback: (err) => {
        toast.error(err?.message || "Failed to delete Sales Order");
      },
    });

  const { downloadPdf } = useDownloadSalesOrderPdfMutation({
    onSuccessCallback: (pdfBlob: Blob) => {
      // Create a blob URL and trigger download
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `sales-order.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
      toast.success("sales order downloaded successfully");
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || "Failed to download sales order");
    },
  });

  const filteredData = useMemo(() => {
    if (!search) return allSalesOrderData;
    return allSalesOrderData.filter(
      (item) =>
        (item.salesOrderNumber || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.purchaseOrderNumber || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.boqId || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [allSalesOrderData, search]);

  const handleDelete = useCallback((salesOrder: ISalesOrderList) => {
    setDeleteConfirm(salesOrder);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteConfirm) {
      onDeleteSalesOrder(deleteConfirm.id);
    }
  }, [deleteConfirm, onDeleteSalesOrder]);

  const cancelDelete = useCallback(() => {
    setDeleteConfirm(null);
  }, []);

  // ✅ Handle edit modal open
  const handleEdit = useCallback((salesOrder: ISalesOrderList) => {
    setSelectedOrder(salesOrder);
    setEditModalOpen(true);
  }, []);

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedOrder(null);
  };

  const handleEditSuccess = () => {
    refetchAllSalesOrder();
    closeEditModal();
  };

  // Handle create purchase order
  const handleCreatePurchaseOrder = useCallback(
    (salesOrderId: string) => {
      router.push(
        `/admin/material-management/purchase-order/add?salesOrderId=${salesOrderId}`
      );
    },
    [router]
  );

  // Actions for the table
  const actions = useMemo(
    () => [
      {
        label: "Edit",
        onClick: handleEdit,
        className: "text-green-600",
      },
      {
        label: "Download Sales Order",
        onClick: (row: ISalesOrderList) => {
          downloadPdf(row.id);
        },
        className: "text-blue-600",
      },
      {
        label: "Create Purchase Order",
        onClick: (row: ISalesOrderList) => {
          handleCreatePurchaseOrder(row.id);
        },
        className: "text-purple-600",
      },
      {
        label: "Delete",
        onClick: handleDelete,
        className: "text-red-600",
      },
    ],
    [handleEdit, handleDelete, downloadPdf, handleCreatePurchaseOrder]
  );

  return (
    <section className="flex flex-col gap-4  border  border-gray-300 rounded-lg  bg-white px-2 sm:px-6  py-2 sm:py-4 ">
      <Breadcrumb />
      <h1 className="text-2xl  font-medium">
        Sales Order List
      </h1>
      <SearchBar
        placeholder="Search Client"
        onSearch={setSearch}
        value={search}
        bgColor="white"
        width="w-full md:w-[25vw] "
      />
      <CustomSalesOrderTable data={filteredData} actions={actions} />

      <DeleteModal
        isOpen={!!deleteConfirm}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Sales Order"
        message={`Are you sure you want to delete the Sales Order?`}
        itemName={deleteConfirm?.salesOrderNumber || ""}
        isLoading={isDeleting}
      />
      <EditSalesOrderModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        initialData={selectedOrder}
        onSuccess={handleEditSuccess}
      />
    </section>
  );
}
