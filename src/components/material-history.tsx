/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Button, DatePicker, InputField, Table } from "@/components";
import { IApiError } from "@/utils";
import { IInventoryHistoryTableColumns } from "./inventory-history.columns";
import {
  ICreateInventoryHistoryPayload,
  IInventoryHistoryItem,
} from "@/services";
import { useCreateInventoryHistoryMutation } from "@/services/apis/clients/community-client/query-hooks/useCreateInventoryHistoryMutation";
import { useDeleteInventoryHistoryMutation } from "@/services/apis/clients/community-client/query-hooks/useDeleteInventoryHistoryMutation";
import { useInventoryHistoryByMaterialQuery } from "@/services/apis/clients/community-client/query-hooks/useInventoryHistoryByMaterialQuery";
import { useAllMaterialsQuery } from "@/services/apis/clients/community-client/query-hooks/useAllMaterialsQuery";

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  used: Yup.number()
    .typeError("Used quantity must be a number")
    .min(0, "Used quantity cannot be negative")
    .required("Used quantity is required"),
  notes: Yup.string().optional(),
});

interface IInventoryHistoryProps {
  materialId: string;
}

export function InventoryHistory({ materialId }: IInventoryHistoryProps) {
  const queryClient = useQueryClient();

  const { fetchAllMaterials } = useAllMaterialsQuery();

  // 🔁 Fetch list for this material
  const { data: historyData, refetch } =
    useInventoryHistoryByMaterialQuery(materialId);

  // ➕ Create mutation
  const { createInventoryHistory } = useCreateInventoryHistoryMutation({
    onSuccessCallback: () => {
      toast.success("Product history created");
      formik.resetForm();
      refetch();
      queryClient.invalidateQueries({
        queryKey: ["materials-list-query-key"],
      });
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  // ❌ Delete mutation (optional)
  const { deleteInventoryHistory } = useDeleteInventoryHistoryMutation({
    onSuccessCallback: () => {
      toast.success("Entry deleted");
      refetch();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });
  const formik = useFormik<ICreateInventoryHistoryPayload>({
    initialValues: {
      material_id: materialId,
      date: "",
      used: 0,
      notes: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (!materialId) {
        toast.error("Material ID is missing");
        return;
      }

      try {
        await createInventoryHistory({
          ...values,
          material_id: materialId,
        });

        fetchAllMaterials(); // ✅ runs ONLY after API success
        toast.success("Product history created");
        formik.resetForm();
      } catch (err: any) {
        // mutateAsync throws on error
        toast.error(err?.message || "Failed to create inventory history");
      }
    },
  });

  const inventoryHistoryActions = [
    {
      label: "Delete",
      variant: "danger",
      onClick: (row: IInventoryHistoryItem) => {
        if (!row.id) return;
        deleteInventoryHistory(row.id);
      },
    },
  ];

  const list: IInventoryHistoryItem[] = historyData?.data || [];

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* 👉 Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 bg-customGray border p-3 rounded-md mb-3"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <DatePicker
            label="Date"
            value={formik.values.date}
            onChange={(date) => formik.setFieldValue("date", date)}
            placeholder="Select date"
            error={formik.touched.date ? formik.errors.date : undefined}
            minDate={new Date().toISOString().slice(0, 10)}
          />

          <InputField
            label="Used Quantity"
            name="used"
            type="number"
            placeholder="Enter used quantity"
            value={formik.values.used}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.used ? (formik.errors.used as string) : undefined
            }
          />
        </div>

        <InputField
          label="Notes"
          name="notes"
          placeholder="Enter notes"
          value={formik.values.notes || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.notes ? formik.errors.notes : undefined}
        />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            title="Reset"
            variant="primary-outline"
            onClick={() => formik.resetForm()}
          />
          <Button type="submit" title="Add History" />
        </div>
      </form>

      {/* 👉 Table */}
      <div className="w-full mt-2">
        <Table
          data={list}
          columns={IInventoryHistoryTableColumns}
          actions={inventoryHistoryActions}
          // Add pagination props if your hook returns them
          // paginationData={paginationData}
          // onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
