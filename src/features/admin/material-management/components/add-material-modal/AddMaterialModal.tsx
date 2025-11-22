"use client";

import React from "react";
import {
  Button,
  Dropdown,
  InputField,
  ModalOverlay,
  UploadPhotos,
} from "@/components";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  useAllMaterialBrandQuery,
  useAllMaterialTypeQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useUploadMultipleAttachmentsMutation,
} from "@/services";
import toast from "react-hot-toast";
import { gstOptions, IMaterialManagementProps } from "@/constants";

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
  alias: string;
  Upload: (File | string)[];
}

const validationSchema = Yup.object({
  code: Yup.string().required("Code is required"),
  materialName: Yup.string().required("Material Name is required"),
  brand: Yup.string().required("Brand is required"),
  size: Yup.string().required("Size is required"),
  uom: Yup.string().required("UOM is required"),
  pressure: Yup.string().required("Pressure is required"),
  hsn: Yup.string().required("HSN is required"),
  qty: Yup.string().required("Quantity is required"),
  type: Yup.string().required("Type is required"),
  gst: Yup.string().required("GST is required"),
  purchasePrice: Yup.string().required("Purchase Price is required"),
  salesPrice: Yup.string().required("Sales Price is required"),
  salesDescription: Yup.string().required("Sales Description is required"),
  purchaseDescription: Yup.string().required("Purchase Description is required"),
  alias: Yup.string().required("Alias is required"),
  Upload: Yup.array()
    .of(
      Yup.mixed()
        .test("fileType", "Unsupported File Format", (value) => {
          if (!value || typeof value === "string") return true;
          const allowed = ["image/jpeg", "image/png", "application/pdf"];
          return value instanceof File ? allowed.includes(value.type) : true;
        })
        .test("fileSize", "File too large", (value) => {
          if (!value || typeof value === "string") return true;
          return value instanceof File ? value.size <= 5 * 1024 * 1024 : true;
        })
    )
    .max(10, "You can upload up to 10 files"),
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
  const { allMaterialTypeData } = useAllMaterialTypeQuery();

  const isEditMode = Boolean(initialData);

  const typeOptions =
    allMaterialTypeData?.data?.list?.map((type) => ({
      label: type?.name,
      value: type?.id.toString(),
    })) || [];

  const brandOptions =
    allMaterialBrandData?.data?.list?.map((brand) => ({
      label: brand?.name,
      value: brand?.id.toString(),
    })) || [];

  const setFieldValueRef = React.useRef<FormikHelpers<IAddStaffFormValues>["setFieldValue"] | null>(null);
  const latestUploadRef = React.useRef<(File | string)[]>([]);

  const { onUploadMultipleAttachments, isPending: isUploading } =
    useUploadMultipleAttachmentsMutation({
      onSuccessCallback: (res) => {
        if (setFieldValueRef.current) {
          setFieldValueRef.current("Upload", [
            ...(latestUploadRef.current || []),
            ...(res.data || []),
          ]);
        }
        toast.success("Photos uploaded successfully");
      },
      onErrorCallback: (err) => {
        toast.error(err?.message || "Upload failed");
      },
    });

  const { createMaterial, isPending: isCreating } = useCreateMaterialMutation({
    onSuccessCallback: (res) => {
      toast.success(res.message);
      onClose();
      onSuccess?.();
    },
    onErrorCallback: (err) => {
      toast.error(err?.message);
    },
  });

  const { updateMaterial, isPending: isUpdating } = useUpdateMaterialMutation({
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
    isEditMode && Array.isArray(initialData?.photos)
      ? initialData.photos
      : [];

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={isEditMode ? "Edit Material" : "Add Material"}
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
          qty: initialData?.qty?.toString() || initialData?.quantity?.toString() || "",
          purchasePrice: initialData?.purchase_price?.toString() || "",
          salesPrice: initialData?.sales_price?.toString() || "",
          salesDescription: initialData?.sales_description || "",
          purchaseDescription: initialData?.purchase_description || "",
          alias: initialData?.alias || "",
          Upload: initialUpload,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const payload = {
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
            alias: values.alias,
            photos: values.Upload
              ? await Promise.all(
                  (values.Upload as (File | string)[]).map(async (file) =>
                    typeof file === "string" ? file : file.name
                  )
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
                {isEditMode ? "Edit Material" : "Add Material"}
              </h1>

              {/* Material Name & Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Material Name"
                  name="materialName"
                  value={values.materialName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Material Name"
                  error={touched.materialName && errors.materialName}
                />
                <InputField
                  label="Code"
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Code"
                  error={touched.code && errors.code}
                />
              </div>

              {/* Brand & Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Dropdown
                  label="Brand"
                  options={brandOptions}
                  value={values.brand}
                  onChange={(v) => setFieldValue("brand", v)}
                  error={touched.brand ? errors.brand : undefined}
                />
                <InputField
                  label="Size"
                  name="size"
                  value={values.size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Size"
                  error={touched.size && errors.size}
                />
              </div>

              {/* UOM */}
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="UOM (Unit of Material)"
                  name="uom"
                  value={values.uom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter UOM (e.g., kg, m, pcs, etc.)"
                  error={touched.uom && errors.uom}
                />
              </div>

              {/* Pressure & HSN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Pressure"
                  name="pressure"
                  value={values.pressure}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Pressure"
                  error={touched.pressure && errors.pressure}
                />
                <InputField
                  label="HSN"
                  name="hsn"
                  value={values.hsn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter HSN"
                  error={touched.hsn && errors.hsn}
                />
              </div>

              {/* Type & GST */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Dropdown
                  label="Type"
                  options={typeOptions}
                  value={values.type}
                  onChange={(v) => setFieldValue("type", v)}
                  error={touched.type ? errors.type : undefined}
                />
                <Dropdown
                  label="GST"
                  options={gstOptions}
                  value={values.gst}
                  onChange={(v) => setFieldValue("gst", v)}
                  error={touched.gst ? errors.gst : undefined}
                />
              </div>

              {/* Purchase Price & Desc */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Purchase Price"
                  name="purchasePrice"
                  value={values.purchasePrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Purchase Price"
                  error={touched.purchasePrice && errors.purchasePrice}
                />
                <InputField
                  label="Purchase Description"
                  name="purchaseDescription"
                  value={values.purchaseDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Purchase Description"
                  error={
                    touched.purchaseDescription && errors.purchaseDescription
                  }
                />
              </div>

              {/* Sales Price & Desc */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Sales Price"
                  name="salesPrice"
                  value={values.salesPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Sales Price"
                  error={touched.salesPrice && errors.salesPrice}
                />
                <InputField
                  label="Sales Description"
                  name="salesDescription"
                  value={values.salesDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Sales Description"
                  error={touched.salesDescription && errors.salesDescription}
                />
              </div>

              {/* Quantity & Alias */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Quantity"
                  name="qty"
                  value={values.qty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Quantity"
                  error={touched.qty && errors.qty}
                />
                <InputField
                  label="Alias"
                  name="alias"
                  value={values.alias}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Alias"
                  error={touched.alias && errors.alias}
                />
              </div>

              {/* Upload */}
              <UploadPhotos
                name="Upload"
                setFieldValue={setFieldValue}
                value={
                  values.Upload && values.Upload.length > 0
                    ? typeof values.Upload[0] === "string"
                      ? (values.Upload as string[])
                      : (values.Upload as File[])
                    : []
                }
                error={
                  Array.isArray(errors.Upload)
                    ? errors.Upload.filter(Boolean).join(", ")
                    : (errors.Upload as string | undefined)
                }
                touched={
                  Array.isArray(touched.Upload)
                    ? touched.Upload.some(Boolean)
                    : !!touched.Upload
                }
                placeholder="Upload Photos"
                multiple
                onFilesSelected={(files) => {
                  if (files.length > 0) {
                    const formData = new FormData();
                    files.forEach((file) => formData.append("image", file));
                    latestUploadRef.current = values.Upload || [];
                    onUploadMultipleAttachments(formData);
                  }
                }}
              />

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
