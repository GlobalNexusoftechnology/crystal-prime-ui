"use client";
import { DeleteModal, SearchBar, Button } from "@/components";
import { Breadcrumb } from "@/features";
import React, { useState, useMemo, useCallback } from "react";
import { PurchaseOrderListTable } from "./components";
import {
  useAllPurchaseOrderQuery,
  useDeletePurchaseOrderMutation,
  IPurchaseOrderList,
  useDownloadPurchaseOrderPdfMutation,
} from "@/services";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

export function PurchaseOrder() {
  const { allPurchaseOrderData = [], refetchAllPurchaseOrder } =
    useAllPurchaseOrderQuery();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [deleteConfirm, setDeleteConfirm] = useState<IPurchaseOrderList | null>(
    null
  );

  // Delete Purchase Order mutation
  const { onDeletePurchaseOrder, isPending: isDeleting } =
    useDeletePurchaseOrderMutation({
      onSuccessCallback: () => {
        toast.success("Purchase Order deleted successfully");
        setDeleteConfirm(null);
        refetchAllPurchaseOrder();
      },
      onErrorCallback: (err: unknown) => {
        const errorMessage = err instanceof Error ? err.message : "Failed to delete Purchase Order";
        toast.error(errorMessage);
      },
    });

  const { downloadPdf } = useDownloadPurchaseOrderPdfMutation({
    onSuccessCallback: (pdfBlob: Blob) => {
      // Create a blob URL and trigger download
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `purchase-order.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Purchase order downloaded successfully");
    },
    onErrorCallback: (err: unknown) => {
      const errorMessage = err instanceof Error ? err.message : "Failed to download purchase order";
      toast.error(errorMessage);
    },
  });

  const filteredData = useMemo(() => {
    if (!search) return allPurchaseOrderData;
    return allPurchaseOrderData.filter(
      (item) =>
        (item.purchaseCode || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.supplierName || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item.supplyerInvoiceNo || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [allPurchaseOrderData, search]);

  const handleDelete = useCallback((purchaseOrder: IPurchaseOrderList) => {
    setDeleteConfirm(purchaseOrder);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteConfirm) {
      onDeletePurchaseOrder(deleteConfirm.id);
    }
  }, [deleteConfirm, onDeletePurchaseOrder]);

  const cancelDelete = useCallback(() => {
    setDeleteConfirm(null);
  }, []);

  // Handle edit navigation
  const handleEdit = useCallback((purchaseOrder: IPurchaseOrderList) => {
    router.push(`/admin/material-management/purchase-order/edit/${purchaseOrder.id}`);
  }, [router]);

  const handleDownloadPdf = useCallback((purchaseOrder: IPurchaseOrderList) => {
    downloadPdf(purchaseOrder.id);
  }, [downloadPdf]);

  return (
    <section className="flex flex-col gap-4  border  border-gray-300 rounded-lg  bg-white px-2 sm:px-6  py-2 sm:py-4 ">
      <Breadcrumb />
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between items-center flex-wrap gap-4 ">
          <h1 className="text-[1.2rem]  font-medium">
            Purchase Orders
          </h1>
          <div className="flex items-center gap-4 ">
            <SearchBar
              onSearch={setSearch}
              bgColor="white"
              width="w-full min-w-[12rem] md:w-[25vw]"
            />
            <Button
              title="Add Purchase Order"
              variant="background-white"
              width="w-full md:w-fit"
              leftIcon={
                <FiPlus className="w-5 h-5  " />
              }
              onClick={() => router.push("/admin/material-management/purchase-order/add")}
            />
          </div>
        </div>

        <PurchaseOrderListTable
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDownloadPdf={handleDownloadPdf}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteConfirm}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Purchase Order"
        message="Are you sure you want to delete this purchase order?"
        itemName={deleteConfirm?.purchaseCode || ""}
      />
    </section>
  );
}