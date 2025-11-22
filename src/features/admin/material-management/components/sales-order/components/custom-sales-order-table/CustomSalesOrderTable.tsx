"use client";

import React, { useState, useMemo } from "react";
import { ActionDropdown, Dropdown, ConfirmationModal } from "@/components";
import { FiChevronDown, FiChevronUp, FiMoreVertical } from "react-icons/fi";
import {
  ISalesOrderList,
  IPurchaseOrderList,
  PurchaseOrderStatus,
  IChangePurchaseOrderStatusResponse,
  useChangePurchaseOrderStatusMutation,
  useGetPurchaseOrdersBySalesOrderQuery,
} from "@/services";
import { Pagination } from "@/components/table/components/pagination";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CustomSalesOrderTableProps {
  data: ISalesOrderList[];
  actions: {
    label: string;
    onClick: (salesOrder: ISalesOrderList) => void;
    className: string;
  }[];
  pageSize?: number;
}

export function CustomSalesOrderTable({
  data,
  actions,
  pageSize = 10,
}: CustomSalesOrderTableProps) {
  const router = useRouter();
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle create purchase order
  const handleCreatePurchaseOrder = (salesOrderId: string) => {
    router.push(
      `/admin/material-management/purchase-order/add?salesOrderId=${salesOrderId}`
    );
  };

  const handleRowClick = (rowId: string) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedRowId(null);
  };

  // Client-side pagination
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border rounded-lg  shadow-sm">
        <table className="w-full text-[0.9rem]  text-left border-collapse">
          <thead className="bg-gray-200 uppercase text-[0.9rem] ">
            <tr>
              <th className="text-center p-3 min-w-[6rem]  uppercase">
                Action
              </th>
              <th className="text-center p-3 min-w-[12rem]  uppercase">
                Sales Order Number
              </th>
              <th className="text-center p-3 min-w-[12rem]  uppercase">
                Sales Order Date
              </th>
              <th className="text-center p-3 min-w-[15rem]  uppercase">
                Purchase Order Number
              </th>
              <th className="text-center p-3 min-w-[15rem]  uppercase">
                Purchase Order Date
              </th>
              <th className="text-center p-3 min-w-[15rem]  uppercase">
                Contact Person Name
              </th>
              <th className="text-center p-3 min-w-[12rem]  uppercase">
                Business Name
              </th>
              <th className="text-center p-3 min-w-[12rem]  uppercase">
                Client Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length > 0 &&
              paginatedData.map((row, idx) => (
                <React.Fragment key={row.id}>
                  <tr
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="text-center px-6  py-4  text-[0.9rem] ">
                      <div className="flex items-center gap-2 ">
                        <button onClick={() => handleRowClick(row.id)}>
                          {expandedRowId === row.id ? (
                            <FiChevronUp className="w-4 h-4  " />
                          ) : (
                            <FiChevronDown className="w-4 h-4  " />
                          )}
                        </button>
                        <ActionDropdown
                          options={actions?.map((action) => ({
                            label: action?.label,
                            onClick: () => action?.onClick(row),
                            className: action?.className,
                          }))}
                          icon={
                            <FiMoreVertical className="w-4 h-4  " />
                          }
                        />
                      </div>
                    </td>
                    <td className="text-center px-6  py-4  text-[0.9rem] ">
                      {row.salesOrderNumber || "-"}
                    </td>
                    <td className="text-center px-6  py-4  text-[0.9rem] ">
                      {row.salesOrderDate
                        ? new Date(row.salesOrderDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="text-center px-6  py-4  text-[0.9rem] ">
                      {row.purchaseOrderNumber || "-"}
                    </td>
                    <td className="text-center px-6  py-4  text-[0.9rem] ">
                      {row.purchaseOrderDate
                        ? new Date(row.purchaseOrderDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="text-center px-6  py-4  text-[0.9rem] ">
                      {row.boq?.leadName || "-"}
                    </td>
                    <td className="text-center px-6  py-4  text-[0.9rem] ">
                      {row.boq?.businessName || "-"}
                    </td>
                    <td className="text-center px-6  py-4  text-[0.9rem] ">
                      {row?.client?.name || "-"}
                    </td>
                  </tr>
                  {expandedRowId === row.id && (
                    <tr key={`${row.id}-details`}>
                      <td
                        colSpan={8}
                        className="pl-16  p-4  bg-gray-50 rounded-b-lg "
                      >
                        <h3 className="mb-4  text-[1.2rem]  font-semibold">
                          Purchase Order Details
                        </h3>
                        <PurchaseOrderDetails 
                         salesOrderId={row.id} 
                         onCreatePurchaseOrder={handleCreatePurchaseOrder}
                       />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

// Separate component for purchase order details
interface PurchaseOrderDetailsProps {
  salesOrderId: string;
  onCreatePurchaseOrder: (salesOrderId: string) => void;
}

function PurchaseOrderDetails({ salesOrderId }: PurchaseOrderDetailsProps) {
  const { purchaseOrdersData, isLoading, error, refetchPurchaseOrders } =
    useGetPurchaseOrdersBySalesOrderQuery({
      salesOrderId,
      enabled: !!salesOrderId,
    });

  const { onChangePurchaseOrderStatus } = useChangePurchaseOrderStatusMutation({
    onSuccessCallback: (res: IChangePurchaseOrderStatusResponse) => {
      toast.success(res.message);
      refetchPurchaseOrders();
      // Ensure confirmation states are reset after successful API call
      handleConfirmSuccess();
    },
    onErrorCallback: (error) => {
      toast.error(error.message);
      // Reset confirmation states on error as well
      handleConfirmSuccess();
    },
  });

  // Confirmation state for status changes
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showInwardConfirmation, setShowInwardConfirmation] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    purchaseOrderId: string;
    newStatus: PurchaseOrderStatus;
    currentStatus: PurchaseOrderStatus;
  } | null>(null);

  // Purchase order status options
  const purchaseOrderStatusOptions = [
    { label: "Pending", value: PurchaseOrderStatus.PENDING },
    { label: "Ordered", value: PurchaseOrderStatus.ORDERED },
    { label: "Inward", value: PurchaseOrderStatus.INWARD },
    { label: "Cancelled", value: PurchaseOrderStatus.CANCELLED },
  ];

  const handlePurchaseOrderStatusChange = (
    purchaseOrderId: string,
    newStatus: string,
    currentStatus?: PurchaseOrderStatus
  ) => {
    if (currentStatus && newStatus === currentStatus) return;
    if (newStatus === PurchaseOrderStatus.CANCELLED) {
      setPendingStatusChange({
        purchaseOrderId,
        newStatus: PurchaseOrderStatus.CANCELLED,
        currentStatus: currentStatus || PurchaseOrderStatus.PENDING,
      });
      setShowCancelConfirmation(true);
      return;
    }
    if (newStatus === PurchaseOrderStatus.INWARD) {
      setPendingStatusChange({
        purchaseOrderId,
        newStatus: PurchaseOrderStatus.INWARD,
        currentStatus: currentStatus || PurchaseOrderStatus.PENDING,
      });
      setShowInwardConfirmation(true);
      return;
    }
    onChangePurchaseOrderStatus({
      id: purchaseOrderId,
      payload: {
        status: newStatus as PurchaseOrderStatus,
        remarks: `Status changed to ${newStatus}`,
      },
    });
  };

  const confirmCancellation = () => {
    if (pendingStatusChange) {
      onChangePurchaseOrderStatus({
        id: pendingStatusChange.purchaseOrderId,
        payload: {
          status: pendingStatusChange.newStatus,
          remarks: `Status changed from ${pendingStatusChange.currentStatus} to ${pendingStatusChange.newStatus}`,
        },
      });
      handleConfirmSuccess();
    }
  };

  const confirmInward = () => {
    if (pendingStatusChange) {
      onChangePurchaseOrderStatus({
        id: pendingStatusChange.purchaseOrderId,
        payload: {
          status: pendingStatusChange.newStatus,
          remarks: `Status changed from ${pendingStatusChange.currentStatus} to ${pendingStatusChange.newStatus}`,
        },
      });
      handleConfirmSuccess();
    }
  };

  const cancelConfirmation = () => {
    setShowCancelConfirmation(false);
    setShowInwardConfirmation(false);
    setPendingStatusChange(null);
  };

  const handleConfirmSuccess = () => {
    // Reset all confirmation states after successful confirmation
    setShowCancelConfirmation(false);
    setShowInwardConfirmation(false);
    setPendingStatusChange(null);
  };

  if (isLoading) {
    return (
      <div className="bg-white border rounded shadow-sm px-4 py-8  ">
        <div className="text-center text-gray-500">
          <p className="text-sm ">Loading purchase order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border rounded shadow-sm px-4 py-8  ">
        <div className="text-center text-red-500">
          <p className="text-sm ">Error loading purchase order details.</p>
        </div>
      </div>
    );
  }

  if (!purchaseOrdersData || purchaseOrdersData.length === 0) {
          return (
        <div className="flex justify-center items-center bg-white border rounded shadow-sm px-4 py-8  ">
            <p className="text-sm ">
              No purchase order associated with this sales order.
            </p>
        </div>
      );
  }

  return (
    <>
    <table className="bg-white border rounded shadow-sm">
      <thead className="bg-gray-200">
        <tr>
          <th className="text-center px-4  py-2  text-[0.9rem]  font-semibold uppercase">
            Action
          </th>
          <th className="text-center px-4  py-2  text-[0.9rem]  font-semibold uppercase min-w-[8rem] ">
            Status
          </th>
          <th className="text-center px-4  py-2  text-[0.9rem]  font-semibold uppercase min-w-[12rem] ">
            Purchase Order Number
          </th>
          <th className="text-center px-4  py-2  text-[0.9rem]  font-semibold uppercase min-w-[15rem] ">
            Purchase Order Date
          </th>
          <th className="text-center px-4  py-2  text-[0.9rem]  font-semibold uppercase min-w-[10rem] ">
            Supplier Name
          </th>
          <th className="text-center px-4  py-2  text-[0.9rem]  font-semibold uppercase min-w-[10rem] ">
            Total Amount
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {purchaseOrdersData.map((po: IPurchaseOrderList) => (
          <tr
            key={po.id}
            className="hover:bg-blue-50 transition-colors duration-150"
          >
            <td className="text-center px-4  py-3 ">
              <div className="flex justify-center">
                <ActionDropdown
                  options={[
                    {
                      label: "Edit",
                      onClick: () => {
                        window.open(
                          `/admin/material-management/purchase-order/edit/${po.id}`,
                          "_blank"
                        );
                      },
                      className: "text-green-600",
                    },
                  ]}
                  icon={
                    <FiMoreVertical className="w-4 h-4  " />
                  }
                />
              </div>
            </td>
            <td className="text-center px-6  py-4  text-[0.9rem] ">
              {po.status === PurchaseOrderStatus.CANCELLED ||
              po.status === PurchaseOrderStatus.INWARD ? (
                <span
                  className={`px-4  py-1  rounded-full text-xs  font-medium ${
                    po.status === PurchaseOrderStatus.CANCELLED
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {po.status === PurchaseOrderStatus.CANCELLED
                    ? "Cancelled"
                    : "Inward"}
                </span>
              ) : (
                <Dropdown
                  options={purchaseOrderStatusOptions}
                  value={po.status}
                  onChange={(val) =>
                    handlePurchaseOrderStatusChange(po.id, val, po.status)
                  }
                  dropdownWidth="min-w-[8rem] "
                />
              )}
            </td>
            <td className="text-center px-6  py-4  text-[0.9rem] ">
              {po.purchaseCode}
            </td>
            <td className="text-center px-6  py-4  text-[0.9rem] ">
              {po.purchaseDate
                ? new Date(po.purchaseDate).toLocaleDateString()
                : "-"}
            </td>
            <td className="text-center px-6  py-4  text-[0.9rem] ">
              {po.supplier?.supplier_name || po.supplierName || "-"}
            </td>
            <td className="text-center px-6  py-4  text-[0.9rem] ">
              ₹{po.grandTotalAmount || po.totalAmount || "0"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

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
    </>
  );
}
