/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Dropdown, InputField, ModalOverlay } from "@/components";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { IMaterialManagementProps } from "@/constants/tables/material-management-list";
import { useAllMaterialBrandQuery } from "@/services/apis/clients/community-client/query-hooks/useAllMaterialBrandQuery";
import { useCreateInventoryMutation } from "@/services/apis/clients/community-client/query-hooks/useCreateInventoryMutation";
import { useUpdateInventoryMutation } from "@/services/apis/clients/community-client/query-hooks/useUpdateInventoryMutation";

export interface IAddStaffFormValues {
  code: string;
  materialName: string;
  brand: string;
  size: string;
  uom: string;
  pressure: string;
  hsn: string;
  type: string;
  gst: string;
  qty: string;
  purchasePrice: string;
  salesPrice: string;
  salesDescription: string;
  purchaseDescription: string;
  prices: string;
  Upload: (File | string)[];
  keywords?: string[];
}

const validationSchema = Yup.object({
  code: Yup.string().optional(),
  materialName: Yup.string().optional(),
  brand: Yup.string().optional(),
  size: Yup.string().optional(),
  uom: Yup.string().optional(),
  pressure: Yup.string().optional(),
  hsn: Yup.string().optional(),
  qty: Yup.string().optional(),
  type: Yup.string().optional(),
  gst: Yup.string().optional(),
  purchasePrice: Yup.string().optional(),
  salesPrice: Yup.string().optional(),
  salesDescription: Yup.string().optional(),
  purchaseDescription: Yup.string().optional(),
  prices: Yup.string().optional(),
  Upload: Yup.array()
    .of(
      Yup.mixed()
        .test("fileType", "Unsupported File Format", (value: any) => {
          if (!value || typeof value === "string") return true;
          const allowed = ["image/jpeg", "image/png", "application/pdf"];
          return value instanceof File ? allowed.includes(value.type) : true;
        })
        .test("fileSize", "File too large", (value: any) => {
          if (!value || typeof value === "string") return true;
          return value instanceof File ? value.size <= 5 * 1024 * 1024 : true;
        }),
    )
    .max(10, "You can upload up to 10 files")
    .optional(),
});

export function AddMaterialModal({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IMaterialManagementProps | null;
  onSuccess?: () => void;
}) {
  const { allMaterialBrandData } = useAllMaterialBrandQuery();

  const isEditMode = Boolean(initialData);

  const brandOptions =
    allMaterialBrandData?.data?.list?.map((brand: any) => ({
      label: brand?.name,
      value: brand?.id.toString(),
    })) || [];

  const setFieldValueRef = React.useRef<
    FormikHelpers<IAddStaffFormValues>["setFieldValue"] | null
  >(null);

  const { createMaterial, isPending: isCreating } = useCreateInventoryMutation({
    onSuccessCallback: (res) => {
      toast.success(res.message);
      onClose();
      onSuccess?.();
    },
    onErrorCallback: (err) => {
      toast.error(err?.message);
    },
  });

  const { updateMaterial, isPending: isUpdating } = useUpdateInventoryMutation({
    onSuccessCallback: (res) => {
      toast.success(res.message);
      onClose();
      onSuccess?.();
    },
    onErrorCallback: (err) => {
      toast.error(err?.message);
    },
  });

  const initialUpload: (File | string)[] =
    isEditMode && Array.isArray(initialData?.photos) ? initialData.photos : [];

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={isEditMode ? "Edit Inventory " : "Add Inventory "}
      modalClassName="w-[40rem] "
    >
      <Formik
        enableReinitialize
        initialValues={{
          code: initialData?.code || "",
          materialName: initialData?.name || "",
          brand:
            typeof initialData?.materialBrand === "string"
              ? initialData.materialBrand
              : initialData?.materialBrand?.id || "",
          size: initialData?.size || "",
          uom: initialData?.uom || "",
          pressure: initialData?.pressure || "",
          hsn: initialData?.hsn || "",
          type:
            typeof initialData?.materialType === "string"
              ? initialData.materialType
              : initialData?.materialType?.id || "",
          gst: initialData?.gst || "",
          qty:
            initialData?.qty?.toString() ||
            initialData?.quantity?.toString() ||
            "",
          purchasePrice: initialData?.purchase_price?.toString() || "",
          salesPrice: initialData?.sales_price?.toString() || "",
          salesDescription: initialData?.sales_description || "",
          purchaseDescription: initialData?.purchase_description || "",
          prices: initialData?.prices || "",
          statePrices: {
            Maharashtra: "",
            Gujarat: "",
            Uttar_Pradesh: "",
            Karnataka: "",
            West_Bengal: "",
            Delhi: "",
            Odisha: "",
            Goa: "",
          },
          Upload: initialUpload,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values: any, actions: any) => {
          const payload: any = {
            name: values.materialName,
            code: values.code,
            materialBrandId: values.brand,
            size: values.size,
            uom: values.uom,
            pressure: values.pressure,
            hsn: values.hsn,
            materialTypeId: values.type,
            gst: values.gst,
            quantity: Number(values.qty),
            purchase_price: Number(values.purchasePrice),
            sales_price: Number(values.salesPrice),
            sales_description: values.salesDescription,
            purchase_description: values.purchaseDescription,
            prices: values.prices,
            // ✅ State-wise prices
            state_prices: Object.fromEntries(
              Object.entries(values.statePrices).map(([state, prices]) => [
                state,
                Number(prices),
              ]),
            ),

            photos: values.Upload
              ? await Promise.all(
                  (values.Upload as (File | string)[]).map(async (file) =>
                    typeof file === "string" ? file : file.name,
                  ),
                )
              : [],
          };

          if (isEditMode && initialData?.id) {
            updateMaterial({ id: initialData.id, payload });
          } else {
            createMaterial(payload);
          }
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        }) => {
          setFieldValueRef.current = setFieldValue;
          const isPending = isCreating || isUpdating || isUploading;

          return (
            <Form className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] bg-white rounded-lg  p-4  border  border-gray-200">
              <h1 className="text-lg  font-semibold">
                {isEditMode ? "Edit Inventory " : "Add Inventory "}
              </h1>

              {/* Inventory  Name & Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Inventory  Name"
                  name="materialName"
                  value={values.materialName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Inventory  Name"
                  error={touched.materialName && errors.materialName}
                />
                <Dropdown
                  label="Brand"
                  options={brandOptions}
                  value={values.brand}
                  onChange={(v) => setFieldValue("brand", v)}
                  error={touched.brand ? errors.brand : undefined}
                />
              </div>

              {/* State-wise Prices */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Prices"
                    name="prices"
                    value={values.prices}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Price"
                    error={touched.prices && errors.prices}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4">
                <Button
                  title="Cancel"
                  variant="background-white"
                  onClick={onClose}
                />
                <Button
                  title={
                    isUploading
                      ? "Uploading..."
                      : isPending
                        ? "Saving..."
                        : "Save"
                  }
                  type="submit"
                  variant="primary"
                  disabled={isPending}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </ModalOverlay>
  );
}
