"use client";
import { Button, InputField, ModalOverlay } from "@/components";
import { IApiError } from "@/utils";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import toast from "react-hot-toast";
import {
  ICreateMaterialTypeResponse,
  IUpdateMaterialTypeResponse,
} from "@/services/apis/types";
import { useCreateMaterialTypeMutation } from "@/services/apis/clients/community-client/query-hooks/useCreateMaterialTypeMutation";
import { useUpdateMaterialTypeMutation } from "@/services/apis/clients/community-client/query-hooks/useUpdateMaterialTypeMutation";

interface AddLeadMaterialTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMaterialTypeSuccessCallback: () => void;
  onClearEditData?: () => void; // NEW: Callback to clear edit mode
  materialTypeId?: string;
  materialTypeName?: string;
}

export const AddMaterialTypeModal: React.FC<AddLeadMaterialTypeModalProps> = ({
  isOpen,
  onClose,
  onAddMaterialTypeSuccessCallback,
  onClearEditData,
  materialTypeId,
  materialTypeName = "",
}) => {
  const [initialValues, setInitialValues] = useState({ name: "" });

  // Update form values when modal opens or materialTypeName changes
  useEffect(() => {
    if (isOpen) {
      setInitialValues({ name: materialTypeName || "" });
    }
  }, [isOpen, materialTypeName]);

  const { onMaterialTypeMutation } = useCreateMaterialTypeMutation({
    onSuccessCallback: (response: ICreateMaterialTypeResponse) => {
      onAddMaterialTypeSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create material type:", err);
      toast.error(err.message);
    },
  });

  const { onEditMaterialType } = useUpdateMaterialTypeMutation({
    onSuccessCallback: (response: IUpdateMaterialTypeResponse) => {
      onAddMaterialTypeSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to update material type:", err);
      toast.error(err.message);
    },
  });

  return (
    <ModalOverlay
      modalTitle="Back to Add Product Type"
      isOpen={isOpen}
      onClose={onClose}
      modalClassName="w-full sm:w-[30rem]"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .required(" materialType name is required")
            .max(50, "Must be 50 characters or less"),
        })}
        onSubmit={(values, { resetForm }) => {
          const lowerCaseName = values.name.toLowerCase().trim();
          if (materialTypeId) {
            onEditMaterialType({
              id: materialTypeId,
              payload: { name: lowerCaseName },
            });
          } else {
            onMaterialTypeMutation({ name: lowerCaseName });
          }
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4  p-4  bg-white rounded-xl  border-gray-400">
            <h1 className="text-md  text-gray-900">
              {materialTypeId ? "Edit  Product Type" : "Add New  Product Type"}
            </h1>

            <div className="flex flex-col gap-4 md:gap-8  md:flex-row justify-between items-center w-full">
              <div className="w-full">
                <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  as={InputField}
                  placeholder="Enter Product Type Name"
                />
                <div className="text-red-500 text-[0.9rem] mt-1">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>

            <div className="flex gap-4  w-full">
              <Button
                title="Cancel"
                variant="primary-outline"
                width="w-full"
                type="button"
                onClick={() => {
                  onClose();
                  onClearEditData?.();
                }}
              />
              <Button
                title={
                  materialTypeId ? "Update Product Type" : "Add Product Type"
                }
                variant="primary"
                width="w-full"
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </ModalOverlay>
  );
};
