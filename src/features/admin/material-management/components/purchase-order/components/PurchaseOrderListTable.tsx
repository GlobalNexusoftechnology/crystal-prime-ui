"use client";
import React, { useState } from "react";
import { Table, Dropdown, ConfirmationModal } from "@/components";
import {
  IPurchaseOrderList,
  PurchaseOrderStatus,
  useChangePurchaseOrderStatusMutation,
} from "@/services";
import { ITableAction } from "@/constants";
import toast from "react-hot-toast";

interface PurchaseOrderListTableProps {
  data: IPurchaseOrderList[];
  onEdit: (purchaseOrder: IPurchaseOrderList) => void;
  onDelete: (purchaseOrder: IPurchaseOrderList) => void;
  onDownloadPdf: (purchaseOrder: IPurchaseOrderList) => void;
}

export function PurchaseOrderListTable({
  data,
  onEdit,
  onDelete,
}: PurchaseOrderListTableProps) {
  // State for confirmation dialog
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showInwardConfirmation, setShowInwardConfirmation] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    purchaseOrderId: string;
    newStatus: PurchaseOrderStatus;
    currentStatus: PurchaseOrderStatus;
  } | null>(null);

  // Status change mutation hook
  const { onChangePurchaseOrderStatus } = useChangePurchaseOrderStatusMutation({
    onSuccessCallback: () => {
      toast.success("Purchase order status updated successfully");
      setShowCancelConfirmation(false);
      setShowInwardConfirmation(false);
      setPendingStatusChange(null);
    },
    onErrorCallback: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update purchase order status";
      toast.error(errorMessage);
      setShowCancelConfirmation(false);
      setShowInwardConfirmation(false);
      setPendingStatusChange(null);
    },
  });

  // Purchase order status options
  const purchaseOrderStatusOptions = [
    { label: "Pending", value: PurchaseOrderStatus.PENDING },
    { label: "Ordered", value: PurchaseOrderStatus.ORDERED },
    { label: "Cancelled", value: PurchaseOrderStatus.CANCELLED },
    { label: "Inward", value: PurchaseOrderStatus.INWARD },
  ];

  // Handle status change with confirmation for cancellation and inward
  const handleStatusChange = (
    purchaseOrderId: string,
    newStatus: string,
    currentStatus: PurchaseOrderStatus
  ) => {
    if (newStatus !== currentStatus) {
      if (newStatus === PurchaseOrderStatus.CANCELLED) {
        // Show confirmation for cancellation
        setPendingStatusChange({
          purchaseOrderId,
          newStatus: newStatus as PurchaseOrderStatus,
          currentStatus,
        });
        setShowCancelConfirmation(true);
      } else if (newStatus === PurchaseOrderStatus.INWARD) {
        // Show confirmation for inward
        setPendingStatusChange({
          purchaseOrderId,
          newStatus: newStatus as PurchaseOrderStatus,
          currentStatus,
        });
        setShowInwardConfirmation(true);
      } else {
        // Direct status change for other statuses
        onChangePurchaseOrderStatus({
          id: purchaseOrderId,
          payload: {
            status: newStatus as PurchaseOrderStatus,
            remarks: `Status changed from ${currentStatus} to ${newStatus}`,
          },
        });
      }
    }
  };

  // Confirm cancellation
  const confirmCancellation = () => {
    if (pendingStatusChange) {
      onChangePurchaseOrderStatus({
        id: pendingStatusChange.purchaseOrderId,
        payload: {
          status: pendingStatusChange.newStatus,
          remarks: `Status changed from ${pendingStatusChange.currentStatus} to ${pendingStatusChange.newStatus}`,
        },
      });
    }
  };

  // Confirm inward
  const confirmInward = () => {
    if (pendingStatusChange) {
      onChangePurchaseOrderStatus({
        id: pendingStatusChange.purchaseOrderId,
        payload: {
          status: pendingStatusChange.newStatus,
          remarks: `Status changed from ${pendingStatusChange.currentStatus} to ${pendingStatusChange.newStatus}`,
        },
      });
    }
  };

  // Cancel the confirmation dialog
  const cancelConfirmation = () => {
    setShowCancelConfirmation(false);
    setShowInwardConfirmation(false);
    setPendingStatusChange(null);
  };
  const columns = [
    {
      header: "STATUS",
      accessor: "status" as keyof IPurchaseOrderList,
      sortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row, value }: any) => {
        const purchaseOrder = row as IPurchaseOrderList;
        const currentStatus = value as PurchaseOrderStatus;

        const onStatusChange = (newStatus: string) => {
          handleStatusChange(purchaseOrder.id, newStatus, currentStatus);
        };
        // Show text badges for CANCELLED and INWARD; dropdown for others
        if (
          currentStatus === PurchaseOrderStatus.CANCELLED ||
          currentStatus === PurchaseOrderStatus.INWARD
        ) {
          const getStatusColor = (status: PurchaseOrderStatus) => {
            switch (status) {
              case PurchaseOrderStatus.CANCELLED:
                return "bg-red-100 text-red-800";
              case PurchaseOrderStatus.INWARD:
                return "bg-green-100 text-green-800";
              default:
                return "bg-gray-100 text-gray-800";
            }
          };

          return (
            <span
              className={`px-4  py-1  rounded-full text-xs  font-medium ${getStatusColor(
                currentStatus
              )}`}
            >
              {currentStatus === PurchaseOrderStatus.CANCELLED
                ? "Cancelled"
                : "Inward"}
            </span>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <Dropdown
              options={purchaseOrderStatusOptions}
              value={currentStatus}
              onChange={onStatusChange}
              dropdownWidth="min-w-[8rem] "
              />
          </div>
        );
      },
    },
    {
      header: "PURCHASE CODE",
      accessor: "purchaseCode" as keyof IPurchaseOrderList,
      sortable: true,
    },
    {
      header: "SUPPLIER NAME",
      accessor: "supplier" as keyof IPurchaseOrderList,
      sortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row, value }: any) => {
        // value is the supplier object, row is the full purchase order
        const supplierName = value?.supplier_name || row?.supplierName || "-";

        return <div className="font-medium text-gray-900">{supplierName}</div>;
      },
    },
    {
      header: "INVOICE NO",
      accessor: "supplyerInvoiceNo" as keyof IPurchaseOrderList,
      sortable: true,
    },
    {
      header: "PURCHASE DATE",
      accessor: "purchaseDate" as keyof IPurchaseOrderList,
      sortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ value }: any) => {
        if (!value) return "-";
        const date = new Date(value as string);
        return date.toLocaleDateString();
      },
    },
    {
      header: "PAYMENT STATUS",
      accessor: "paymentStatus" as keyof IPurchaseOrderList,
      sortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ value }: any) => {
        const statusColors = {
          paid: "bg-green-100 text-green-800",
          unpaid: "bg-red-100 text-red-800",
        };
        const colorClass =
          statusColors[value as keyof typeof statusColors] ||
          "bg-gray-100 text-gray-800";
        return (
          <span
            className={`px-2  py-1  rounded-full text-xs  font-medium ${colorClass}`}
          >
            {(value as string)?.toUpperCase() || "N/A"}
          </span>
        );
      },
    },
    {
      header: "GRAND TOTAL",
      accessor: "grandTotalAmount" as keyof IPurchaseOrderList,
      sortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ value }: any) => {
        const amount = typeof value === "string" ? parseFloat(value) : value;
        return amount ? `₹${amount.toLocaleString()}` : "-";
      },
    },
    {
      header: "CREATED AT",
      accessor: "created_at" as keyof IPurchaseOrderList,
      sortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ value }: any) => {
        if (!value) return "-";
        const date = new Date(value as string);
        return date.toLocaleDateString();
      },
    },
  ];

  const actions: ITableAction<IPurchaseOrderList>[] = [
    {
      label: "Edit",
      onClick: onEdit,
      className: "text-blue-500 hover:text-blue-700",
    },
    {
      label: "Delete",
      onClick: onDelete,
      className: "text-red-500 hover:text-red-700",
    },
  ];

  return (
    <div className="bg-white rounded-lg">
      <Table data={data} columns={columns} actions={actions} />

      {/* Cancellation Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelConfirmation}
        onClose={cancelConfirmation}
        onConfirm={confirmCancellation}
        title="Confirm Cancellation"
        message="Are you sure you want to cancel this purchase order?"
        confirmText="Confirm Cancellation"
        confirmButtonVariant="danger"
        icon={
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        }
      >
        <div className="text-sm text-gray-500">
          <p className="mb-2">This action will:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Change the status to &quot;Cancelled&quot;</li>
            <li>Return reserved stock to available inventory</li>
            <li>This action cannot be easily undone</li>
          </ul>
        </div>
      </ConfirmationModal>

      {/* Inward Confirmation Modal */}
      <ConfirmationModal
        isOpen={showInwardConfirmation}
        onClose={cancelConfirmation}
        onConfirm={confirmInward}
        title="Confirm Inward"
        message="Are you sure you want to mark this purchase order as inward?"
        confirmText="Confirm Inward"
        confirmButtonVariant="primary"
        icon={
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      >
        <div className="text-sm text-gray-500">
          <p className="mb-2">This action will:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Change the status to &quot;Inward&quot;</li>
            <li>Mark materials as received in inventory</li>
            <li>Update stock levels accordingly</li>
          </ul>
        </div>
      </ConfirmationModal>
    </div>
  );
}
