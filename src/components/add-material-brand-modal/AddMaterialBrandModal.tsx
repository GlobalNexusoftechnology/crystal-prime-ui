"use client";
import { Button, InputField, ModalOverlay } from "@/components";
import { IApiError } from "@/utils";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useCreateMaterialBrandMutation } from "@/services/apis/clients/community-client/query-hooks/useCreateMaterialBrandMutation";
import { useUpdateMaterialBrandMutation } from "@/services/apis/clients/community-client/query-hooks/useUpdateMaterialBrandMutation";
import {
  ICreateMaterialBrandResponse,
  IUpdateMaterialBrandResponse,
} from "@/services/apis/types";

interface AddLeadMaterialBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMaterialBrandSuccessCallback: () => void;
  onClearEditData?: () => void; // NEW: Callback to clear edit mode
  materialBrandId?: string;
  materialBrandName?: string;
}

export const AddMaterialBrandModal: React.FC<
  AddLeadMaterialBrandModalProps
> = ({
  isOpen,
  onClose,
  onAddMaterialBrandSuccessCallback,
  onClearEditData,
  materialBrandId,
  materialBrandName = "",
}) => {
  const [initialValues, setInitialValues] = useState({ name: "" });

  // Update form values when modal opens or materialBrandName changes
  useEffect(() => {
    if (isOpen) {
      setInitialValues({ name: materialBrandName || "" });
    }
  }, [isOpen, materialBrandName]);

  const { onMaterialBrandMutation } = useCreateMaterialBrandMutation({
    onSuccessCallback: (response: ICreateMaterialBrandResponse) => {
      onAddMaterialBrandSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create material type", err);
      toast.error(err.message);
    },
  });

  const { onEditMaterialBrand } = useUpdateMaterialBrandMutation({
    onSuccessCallback: (response: IUpdateMaterialBrandResponse) => {
      onAddMaterialBrandSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to update material type", err);
      toast.error(err.message);
    },
  });

  return (
    <ModalOverlay
      modalTitle="Back to Add Product Brand"
      isOpen={isOpen}
      onClose={onClose}
      modalClassName="w-full sm:w-[30rem]"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("material brand name is required")
            .max(50, "Must be 50 characters or less"),
        })}
        onSubmit={(values, { resetForm }) => {
          const lowerCaseName = values.name.toLowerCase().trim();
          if (materialBrandId) {
            onEditMaterialBrand({
              id: materialBrandId,
              payload: { name: lowerCaseName },
            });
          } else {
            onMaterialBrandMutation({ name: lowerCaseName });
          }
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4  p-4  bg-white rounded-xl  border-gray-400">
            <h1 className="text-md  text-gray-900">
              {materialBrandId
                ? "Edit material brand"
                : "Add New material brand"}
            </h1>

            <div className="flex flex-col gap-4 md:gap-8  md:flex-row justify-between items-center w-full">
              <div className="w-full">
                <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  as={InputField}
                  placeholder="Enter Lead materialBrand Name"
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
                  materialBrandId ? "Update Product Brand" : "Add Product Brand"
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
