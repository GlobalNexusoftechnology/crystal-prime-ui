"use client";
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  InputField,
  Dropdown,
  Button,
  Checkbox,
  DatePicker,
  Table,
  NumberInput,
} from "@/components";
import { IoClose } from "react-icons/io5";
import {
  ICreatePurchaseOrderPayload,
  IPurchaseOrderItem,
  PaymentStatus,
  PurchaseOrderStatus,
  IBaseEntity,
  BoqItem,
  useCreatePurchaseOrderMutation,
  useUpdatePurchaseOrderMutation,
  usePurchaseOrderDetailQuery,
  useSalesOrderDetailQuery,
  useAllSuppliersQuery,
  useAllMaterialsQuery,
} from "@/services";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PurchaseOrderFormProps {
  isEdit?: boolean;
  purchaseOrderId?: string;
  salesOrderId?: string;
}

const validationSchema = Yup.object({
  purchaseDate: Yup.date().required("Purchase date is required"),
  supplyerInvoiceNo: Yup.string().optional(),
  supplyerInvoiceDate: Yup.date().optional(),
  supplierId: Yup.string().required("Supplier is required"),
  creditDays: Yup.number()
    .min(0, "Credit days must be positive")
    .required("Credit days is required"),
  paymentStatus: Yup.string().required("Payment status is required"),
  status: Yup.string().required("Status is required"),
  wereHouse: Yup.string().required("Warehouse is required"),
  shippingCharges: Yup.number()
    .min(0, "Shipping charges must be positive")
    .required("Shipping charges is required"),
  items: Yup.array().min(1, "At least one item is required"),
});

export function PurchaseOrderForm({
  isEdit = false,
  purchaseOrderId,
  salesOrderId,
}: PurchaseOrderFormProps) {
  const router = useRouter();

  // Fetch suppliers data
  const { data: suppliersData } = useAllSuppliersQuery();
  
  // Fetch materials data
  const { allMaterialsData: materialsData } = useAllMaterialsQuery();

  // Fetch purchase order details for edit mode
  const { purchaseOrderDetailData } = usePurchaseOrderDetailQuery(
    purchaseOrderId || "",
    {
      enabled: isEdit && !!purchaseOrderId,
    }
  );

  // Fetch sales order details for pre-filling form
  const { salesOrderDetailData } = useSalesOrderDetailQuery(salesOrderId || "");

  // Ref to track if form has been initialized
  const formInitializedRef = useRef(false);

  // Process suppliers data for dropdown
  const supplierOptions =
    suppliersData?.data?.list?.map((supplier) => ({
      label: supplier.supplier_name,
      value: supplier.id,
    })) || [];

  // Process materials data for dropdown
  const materialOptions =
    materialsData?.data?.map((material) => ({
      label: `${material.name} (${material.code})`,
      value: material.id,
    })) || [];

  // Payment status options
  const paymentStatusOptions = [
    { label: "Paid", value: PaymentStatus.PAID },
    { label: "Unpaid", value: PaymentStatus.UNPAID },
  ];



  // Create Purchase Order mutation
  const { onCreatePurchaseOrder, isPending: isCreating } =
    useCreatePurchaseOrderMutation({
      onSuccessCallback: () => {
        toast.success("Purchase Order created successfully");
        router.push("/admin/material-management/purchase-order");
      },
      onErrorCallback: (err: unknown) => {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to create Purchase Order";
        toast.error(errorMessage);
      },
    });

  // Update Purchase Order mutation
  const { onUpdatePurchaseOrder, isPending: isUpdating } =
    useUpdatePurchaseOrderMutation({
      onSuccessCallback: () => {
        toast.success("Purchase Order updated successfully");
        router.push("/admin/material-management/purchase-order");
      },
      onErrorCallback: (err: unknown) => {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to update Purchase Order";
        toast.error(errorMessage);
      },
    });
  const [items, setItems] = useState<Omit<IPurchaseOrderItem, keyof IBaseEntity>[]>([
    {
      materialId: "",
      description: "",
      hsn: "",
      qty: 0,
      rate: 0,
      amount: 0,
      discount: 0,
      discountAmount: 0,
      gstRate: 0,
      totalGSTAmount: 0,
      totalCessAmount: 0,
      grandTotalAmount: 0,
    },
  ]);

  const formik = useFormik<Omit<ICreatePurchaseOrderPayload, "items">>({
    initialValues: {
      purchaseDate: "",
      supplyerInvoiceNo: "",
      supplyerInvoiceDate: "",
      creditDays: 0,
      remarks: "",
      paymentStatus: PaymentStatus.UNPAID,
      status: PurchaseOrderStatus.PENDING,
      totalGSTAmount: 0,
      totalCessAmount: 0,
      totalAmount: 0,
      grandTotalAmount: 0,
      wereHouse: "",
      shippingCharges: 0,
      isManual: false,
      isCalculate12CessTax: false,
      supplierId: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Sanitize items to ensure only primitives are sent
      const sanitizedItems = items.map((it) => ({
        materialId: String(it.materialId ?? ""),
        description: it.description ?? "",
        hsn: it.hsn ?? "",
        qty: Number(it.qty ?? 0),
        rate: Number(it.rate ?? 0),
        amount: Number(it.amount ?? 0),
        discount: Number(it.discount ?? 0),
        discountAmount: Number(it.discountAmount ?? 0),
        gstRate: Number(it.gstRate ?? 0),
        totalGSTAmount: Number(it.totalGSTAmount ?? 0),
        totalCessAmount: Number(it.totalCessAmount ?? 0),
        grandTotalAmount: Number(it.grandTotalAmount ?? 0),
      }));

      const payload: ICreatePurchaseOrderPayload = {
        purchaseDate: String(values.purchaseDate ?? ""),
        supplyerInvoiceNo: values.supplyerInvoiceNo || undefined,
        supplyerInvoiceDate: values.supplyerInvoiceDate || undefined,
        creditDays: Number(values.creditDays ?? 0),
        remarks: values.remarks || undefined,
        paymentStatus: values.paymentStatus,
        status: values.status,
        totalGSTAmount: Number(values.totalGSTAmount ?? 0),
        totalCessAmount: Number(values.totalCessAmount ?? 0),
        totalAmount: Number(values.totalAmount ?? 0),
        grandTotalAmount: Number(values.grandTotalAmount ?? 0),
        wereHouse: String(values.wereHouse ?? ""),
        shippingCharges: Number(values.shippingCharges ?? 0),
        isManual: Boolean(values.isManual),
        isCalculate12CessTax: Boolean(values.isCalculate12CessTax),
        supplierId: String(values.supplierId ?? ""),
        items: sanitizedItems.map(item => ({
          ...item,
          grandTotalAmount: Number(item.grandTotalAmount ?? 0)
        })),
        ...(salesOrderId ? { salesOrderId } : {}),
      };



      if (isEdit && purchaseOrderId) {
        onUpdatePurchaseOrder({ id: purchaseOrderId, ...payload });
      } else {
        onCreatePurchaseOrder(payload);
      }
    },
  });

  const warehouseOptions = [
    { label: "Main Warehouse", value: "main_warehouse" },
    { label: "Secondary Warehouse", value: "secondary_warehouse" },
    { label: "Storage Unit A", value: "storage_a" },
    { label: "Storage Unit B", value: "storage_b" },
  ];

  const addNewItem = () => {
    setItems([
      ...items,
      {
        materialId: "",
        description: "",
        hsn: "",
        qty: 0,
        rate: 0,
        amount: 0,
        discount: 0,
        discountAmount: 0,
        gstRate: 0,
        totalGSTAmount: 0,
        totalCessAmount: 0,
        grandTotalAmount: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (
    index: number,
    field: keyof Omit<IPurchaseOrderItem, keyof IBaseEntity>,
    value: string | number
  ) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Always recalculate all dependent fields in the correct order
    const item = updatedItems[index];
    
    // 1. Calculate amount (qty * rate)
    const qty = Number(item.qty) || 0;
    const rate = Number(item.rate) || 0;
    item.amount = qty * rate;

    // 2. Calculate discount amount
    const discount = Number(item.discount) || 0;
    item.discountAmount = (item.amount * discount) / 100;

    // 3. Calculate GST amount
    const gstRate = Number(item.gstRate) || 0;
    const taxableAmount = item.amount - item.discountAmount;
    item.totalGSTAmount = (taxableAmount * gstRate) / 100;

    // 4. Calculate grand total
    const totalCessAmount = Number(item.totalCessAmount) || 0;
    item.grandTotalAmount = taxableAmount + item.totalGSTAmount + totalCessAmount;

    setItems(updatedItems);

    // Update form totals
    calculateTotals(updatedItems);
  };

  const calculateTotals = (currentItems: Omit<IPurchaseOrderItem, keyof IBaseEntity>[]) => {
    const totalAmount = currentItems.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0
    );
    const totalGSTAmount = currentItems.reduce(
      (sum, item) => sum + (Number(item.totalGSTAmount) || 0),
      0
    );
    const totalCessAmount = currentItems.reduce(
      (sum, item) => sum + (Number(item.totalCessAmount) || 0),
      0
    );
    const shippingCharges = Number(formik.values.shippingCharges) || 0;
    const grandTotalAmount = totalAmount + totalGSTAmount + totalCessAmount + shippingCharges;

    formik.setFieldValue("totalAmount", totalAmount);
    formik.setFieldValue("totalGSTAmount", totalGSTAmount);
    formik.setFieldValue("totalCessAmount", totalCessAmount);
    formik.setFieldValue("grandTotalAmount", grandTotalAmount);
  };

  // Populate form when editing
  useEffect(() => {
    if (isEdit && purchaseOrderDetailData?.data && !formInitializedRef.current) {
      const data = purchaseOrderDetailData.data;
              const formValues = {
          purchaseDate: data.purchaseDate
            ? new Date(data.purchaseDate).toISOString().split("T")[0]
            : "",
          supplyerInvoiceNo: data.supplyerInvoiceNo || "",
          supplyerInvoiceDate: data.supplyerInvoiceDate
            ? new Date(data.supplyerInvoiceDate).toISOString().split("T")[0]
            : "",
          creditDays: data.creditDays || 0,
          remarks: data.remarks || "",
          paymentStatus: data.paymentStatus || PaymentStatus.UNPAID,
          status: data.status || PurchaseOrderStatus.PENDING,
          totalGSTAmount: Number(data.totalGSTAmount) || 0,
          totalCessAmount: Number(data.totalCessAmount) || 0,
          totalAmount: Number(data.totalAmount) || 0,
          grandTotalAmount: Number(data.grandTotalAmount) || 0,
          wereHouse: data.wereHouse || "",
          shippingCharges: Number(data.shippingCharges) || 0,
          isManual: data.isManual || false,
          isCalculate12CessTax: data.isCalculate12CessTax || false,
          supplierId: data.supplier?.id || "",
        };
      
      formik.setValues(formValues);
      if (data.items && data.items.length > 0) {
        setItems(data.items);
      }
      formInitializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, purchaseOrderDetailData?.data]);

  // Populate form with sales order data when creating from sales order
  useEffect(() => {
    if (!isEdit && salesOrderDetailData?.data && !formInitializedRef.current) {
      const salesOrderData = salesOrderDetailData.data;
      
      // Pre-fill form with sales order data
      const formValues = {
        purchaseDate: new Date().toISOString().split("T")[0],
        supplyerInvoiceNo: "",
        supplyerInvoiceDate: "",
        creditDays: 0,
        remarks: `Purchase Order for Sales Order: ${salesOrderData.salesOrderNumber}`,
        paymentStatus: PaymentStatus.UNPAID,
        status: PurchaseOrderStatus.PENDING,
        totalGSTAmount: 0,
        totalCessAmount: 0,
        totalAmount: 0,
        grandTotalAmount: 0,
        wereHouse: "main_warehouse",
        shippingCharges: 0,
        isManual: false,
        isCalculate12CessTax: false,
        supplierId: "",
      };
      
      formik.setValues(formValues);
      
      // Pre-fill items if sales order has BOQ items
      if (salesOrderData.boq?.items && salesOrderData.boq.items.length > 0) {
        const salesOrderItems = salesOrderData.boq.items.map((item: BoqItem) => {
          const qty = item.qty || 0;
          const rate = parseFloat(item.rate) || 0;
          const amount = qty * rate; // Calculate amount from qty * rate
          const discount = typeof item.discount === 'string' ? parseFloat(item.discount) : (item.discount || 0);
          const discountAmount = (amount * discount) / 100; // Calculate discount amount
          const taxableAmount = amount - discountAmount;
          const gstRate = 18; // Default GST rate of 18%
          const totalGSTAmount = (taxableAmount * gstRate) / 100;
          const totalCessAmount = 0; // Default CESS amount
          const grandTotalAmount = taxableAmount + totalGSTAmount + totalCessAmount;

          return {
            materialId: item.materialId || "",
            description: `${item.materialName} - ${item.size} - ${item.brand}`,
            hsn: item.hsn || "",
            qty: qty,
            rate: rate,
            amount: amount,
            discount: discount,
            discountAmount: discountAmount,
            gstRate: gstRate,
            totalGSTAmount: totalGSTAmount,
            totalCessAmount: totalCessAmount,
            grandTotalAmount: grandTotalAmount,
          };
        });
        setItems(salesOrderItems);
        
        // Calculate totals after setting items
        setTimeout(() => {
          calculateTotals(salesOrderItems);
        }, 0);
      }
      
      formInitializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salesOrderDetailData?.data]);

  // Table columns for Product Purchase Details
  const columns = [
    {
      header: "PRODUCT",
      accessor: "materialId" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[12rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <Dropdown
          options={materialOptions}
          value={items[row.index]?.materialId || ""}
          onChange={(value) => updateItem(row.index, "materialId", value)}
          dropdownWidth="w-full"
        />
      ),
    },
    {
      header: "DESCRIPTION",
      accessor: "description" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[15rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <input
          type="text"
          value={items[row.index]?.description || ""}
          onChange={(e) => updateItem(row.index, "description", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2   text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Description"
        />
      ),
    },
    {
      header: "HSN CODE",
      accessor: "hsn" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[8rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <input
          type="text"
          value={items[row.index]?.hsn || ""}
          onChange={(e) => updateItem(row.index, "hsn", e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2   text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="HSN Code"
        />
      ),
    },
    {
      header: "QTY",
      accessor: "qty" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[8rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <div className="flex space-x-2  items-center">
          <button
            type="button"
            onClick={() => {
              const currentQty = items[row.index]?.qty || 0;
              if (currentQty > 0) {
                updateItem(row.index, "qty", currentQty - 1);
              }
            }}
            className="w-6 h-6   bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
          >
            –
          </button>
          <NumberInput
            value={items[row.index]?.qty || 0}
            onChange={(value) =>
              updateItem(row.index, "qty", Math.max(0, value))
            }
            min={0}
            className="w-16  text-center border border-gray-300 rounded px-1 py-1 text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => {
              const currentQty = items[row.index]?.qty || 0;
              updateItem(row.index, "qty", currentQty + 1);
            }}
            className="w-6 h-6   bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
          >
            +
          </button>
        </div>
      ),
    },
    {
      header: "RATE",
      accessor: "rate" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[8rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <NumberInput
          value={items[row.index]?.rate || 0}
          onChange={(value) =>
            updateItem(row.index, "rate", value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2   text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Rate"
        />
      ),
    },
    {
      header: "AMOUNT",
      accessor: "amount" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[8rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <div className="font-medium text-gray-700">
          ₹{(items[row.index]?.amount || 0).toLocaleString()}
        </div>
      ),
    },
    {
      header: "DISCOUNT %",
      accessor: "discount" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[8rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <NumberInput
          value={items[row.index]?.discount || 0}
          onChange={(value) =>
            updateItem(row.index, "discount", value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2   text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Discount %"
        />
      ),
    },
    {
      header: "DISCOUNT AMOUNT",
      accessor: "discountAmount" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[10rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <div className="font-medium text-gray-700">
          ₹{(items[row.index]?.discountAmount || 0).toLocaleString()}
        </div>
      ),
    },
    {
      header: "GST RATE",
      accessor: "gstRate" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[8rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <NumberInput
          value={items[row.index]?.gstRate || 0}
          onChange={(value) =>
            updateItem(row.index, "gstRate", value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2   text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="GST Rate"
        />
      ),
    },
    {
      header: "TOTAL GST",
      accessor: "totalGSTAmount" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[8rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <div className="font-medium text-gray-700">
          ₹{(items[row.index]?.totalGSTAmount || 0).toLocaleString()}
        </div>
      ),
    },
    {
      header: "TOTAL CESS",
      accessor: "totalCessAmount" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & {
        id: number;
      }),
      sortable: false,
      headerClassName: "min-w-[8rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <NumberInput
          value={items[row.index]?.totalCessAmount || 0}
          onChange={(value) =>
            updateItem(row.index, "totalCessAmount", value)
          }
          className="w-full border border-gray-300 rounded px-3 py-2   text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Total CESS"
        />
      ),
    },
    {
      header: "GRAND TOTAL",
      accessor: "grandTotalAmount" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & {
        id: number;
      }),
      sortable: false,
      headerClassName: "min-w-[10rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <div className="font-bold text-green-600">
          ₹{(items[row.index]?.grandTotalAmount || 0).toLocaleString()}
        </div>
      ),
    },
    {
      header: "",
      accessor: "remove" as keyof (Omit<IPurchaseOrderItem, keyof IBaseEntity> & { id: number }),
      sortable: false,
      headerClassName: "min-w-[4rem] ",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <button
          type="button"
          onClick={() => removeItem(row.index)}
          className="w-8 h-8   bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-red-600 hover:text-red-700 transition-colors"
          title="Remove item"
          disabled={items.length === 1}
        >
          <IoClose className="w-4 h-4  " />
        </button>
      ),
    },
  ];

  // Transform items data for the table
  const tableData = items.map((item, index) => ({
    ...item,
    id: index + 2,
    index,
  }));

  return (
    <div className="bg-white p-6  rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl  font-semibold text-gray-900 mb-6 ">
        {isEdit ? "Edit Purchase Order" : "Add Purchase Order"}
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6 "
      >
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <DatePicker
            label="Purchase Date"
            value={formik.values.purchaseDate}
            onChange={(date) => formik.setFieldValue("purchaseDate", date)}
            error={
              formik.touched.purchaseDate && formik.errors.purchaseDate
                ? formik.errors.purchaseDate
                : undefined
            }
          />
          <InputField
            label="Supplier Invoice No"
            name="supplyerInvoiceNo"
            value={formik.values.supplyerInvoiceNo || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.supplyerInvoiceNo &&
              formik.errors.supplyerInvoiceNo
                ? formik.errors.supplyerInvoiceNo
                : undefined
            }
          />
          <DatePicker
            label="Supplier Invoice Date"
            value={formik.values.supplyerInvoiceDate || ""}
            onChange={(date) =>
              formik.setFieldValue("supplyerInvoiceDate", date)
            }
            error={
              formik.touched.supplyerInvoiceDate &&
              formik.errors.supplyerInvoiceDate
                ? formik.errors.supplyerInvoiceDate
                : undefined
            }
          />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          <Dropdown
            label="Supplier"
            options={supplierOptions}
            value={formik.values.supplierId}
            onChange={(value) => formik.setFieldValue("supplierId", value)}
            error={
              formik.touched.supplierId && formik.errors.supplierId
                ? formik.errors.supplierId
                : undefined
            }
          />
          <div className="w-full">
            <label className="block  text-gray-700 mb-2 ">
              Credit Days <span className="text-red-500">*</span>
            </label>
            <NumberInput
              value={formik.values.creditDays}
              onChange={(value) => formik.setFieldValue("creditDays", value)}
              onBlur={formik.handleBlur}
              min={0}
              className={`w-full border  ${
                formik.touched.creditDays && formik.errors.creditDays
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md  px-4  py-2  bg-white transition`}
            />
            {formik.touched.creditDays && formik.errors.creditDays && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.creditDays}</p>
            )}
          </div>
          <InputField
            label="Remark"
            name="remarks"
            value={formik.values.remarks || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.remarks && formik.errors.remarks
                ? formik.errors.remarks
                : undefined
            }
          />
          <Dropdown
            label="Payment Status"
            options={paymentStatusOptions}
            value={formik.values.paymentStatus}
            onChange={(value) => formik.setFieldValue("paymentStatus", value)}
            error={
              formik.touched.paymentStatus && formik.errors.paymentStatus
                ? formik.errors.paymentStatus
                : undefined
            }
          />

        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          <InputField
            label="Total GST Amount"
            name="totalGSTAmount"
            type="number"
            value={formik.values.totalGSTAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled
            readOnly
          />
          <InputField
            label="Total CESS Amount"
            name="totalCessAmount"
            type="number"
            value={formik.values.totalCessAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled
            readOnly
          />
          <InputField
            label="Total Amount"
            name="totalAmount"
            type="number"
            value={formik.values.totalAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled
            readOnly
          />
          <InputField
            label="Grand Total Amount"
            name="grandTotalAmount"
            type="number"
            value={formik.values.grandTotalAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled
            readOnly
          />
        </div>

        {/* Fourth Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          <Dropdown
            label="Ware House"
            options={warehouseOptions}
            value={formik.values.wereHouse}
            onChange={(value) => formik.setFieldValue("wereHouse", value)}
            error={
              formik.touched.wereHouse && formik.errors.wereHouse
                ? formik.errors.wereHouse
                : undefined
            }
          />
          <div className="w-full">
            <label className="block  text-gray-700 mb-2 ">
              Shipping Charges <span className="text-red-500">*</span>
            </label>
            <NumberInput
              value={formik.values.shippingCharges}
              onChange={(value) => {
                formik.setFieldValue("shippingCharges", value);
                calculateTotals(items);
              }}
              onBlur={formik.handleBlur}
              min={0}
              className={`w-full border  ${
                formik.touched.shippingCharges && formik.errors.shippingCharges
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md  px-4  py-2  bg-white transition`}
            />
            {formik.touched.shippingCharges && formik.errors.shippingCharges && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.shippingCharges}</p>
            )}
          </div>
          <div className="flex items-center gap-4  mt-8 ">
            <Checkbox
              label="Manual"
              checked={formik.values.isManual}
              onChange={(e) => formik.setFieldValue("isManual", (e as React.ChangeEvent<HTMLInputElement>).target.checked)}
            />
          </div>
          <div className="flex items-center gap-4  mt-8 ">
            <Checkbox
              label="Calculate 12% CESS Tax"
              checked={formik.values.isCalculate12CessTax}
              onChange={(e) =>
                formik.setFieldValue("isCalculate12CessTax", (e as React.ChangeEvent<HTMLInputElement>).target.checked)
              }
            />
          </div>
        </div>

        {/* Product Purchase Details Table */}
        <div className="mt-8 ">
          <div className="flex justify-between items-center mb-4 ">
            <h3 className="text-lg  font-medium text-gray-900">
              Product Purchase Details
            </h3>
            <Button
              type="button"
              variant="primary-outline"
              onClick={addNewItem}
              title="Add New"
              width="w-fit md:w-[10rem] "
            />
          </div>

          <div className="overflow-x-auto">
            <Table data={tableData} columns={columns} hidePagination/>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4  pt-6 ">
          <Button
            type="button"
            variant="primary-outline"
            title="Cancel"
            onClick={() =>
              router.push("/admin/material-management/purchase-order")
            }
            width="w-fit md:w-[10rem] "
          />
          <Button
            type="submit"
            variant="primary"
            title={
              isCreating || isUpdating
                ? "Saving..."
                : isEdit
                ? "Update"
                : "Save"
            }
            disabled={isCreating || isUpdating}
            width="w-fit md:w-[10rem] "
          />
        </div>
      </form>
    </div>
  );
}
