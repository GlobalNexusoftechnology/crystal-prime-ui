"use client"
import { Button, InputField, ModalOverlay } from "@/components";
import { IApiError } from "@/utils";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ICreateEILogTypeResponse,
  IUpdateEILogTypeResponse,
  useCreateEILogTypeMutation,
  useUpdateEILogTypeMutation,
} from "@/services";
import toast from "react-hot-toast";

interface AddEILogTypesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTypeSuccessCallback: () => void;
  onClearEditData?: () => void; // NEW: Callback to clear edit mode
  typeId?: string;
  typeName?: string;
}

export const AddEILogTypesModal: React.FC<AddEILogTypesModalProps> = ({
  isOpen,
  onClose,
  onAddTypeSuccessCallback,
  onClearEditData,
  typeId,
  typeName = "",
}) => {
  const [initialValues, setInitialValues] = useState({ name: "" });

  // Update form values when modal opens or typeName changes
  useEffect(() => {
    if (isOpen) {
      setInitialValues({ name: typeName || "" });
    }
  }, [isOpen, typeName]);

  const { onEILogTypeMutation } = useCreateEILogTypeMutation({
    onSuccessCallback: (response: ICreateEILogTypeResponse) => {
      onAddTypeSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create EI Log Type:", err);
      toast.error(err.message);
    },
  });

  const { onEditEILogType } = useUpdateEILogTypeMutation({
    onSuccessCallback: (response: IUpdateEILogTypeResponse) => {
      onAddTypeSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to update EI Log Type:", err);
      toast.error(err.message);
    },
  });

  return (
    <ModalOverlay
      modalTitle="Back to Add Types"
      isOpen={isOpen}
      onClose={onClose}
      modalClassName="w-full sm:w-[30rem]"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("EI Log Type name is required")
            .max(50, "Must be 50 characters or less"),
        })}
        onSubmit={(values, { resetForm }) => {
          const lowerCaseName = values.name.toLowerCase().trim();
          if (typeId) {
            onEditEILogType({ id: typeId, payload: { name: lowerCaseName } });
          } else {
            onEILogTypeMutation({ name: lowerCaseName });
          }
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4  p-4  bg-white rounded-xl  border-gray-400">
            <h1 className="text-md  text-gray-900">
              {typeId ? "Edit EI Log Type" : "Add New EI Log Type"}
            </h1>

            <div className="flex flex-col gap-4 md:gap-8  md:flex-row justify-between items-center w-full">
              <div className="w-full">
                <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  as={InputField}
                  placeholder="Enter EI Log Type Name"
                />
                <div className="text-red-500 text-[0.9rem] mt-1">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 ">
              <Button
                type="button"
                title="Cancel"
                variant="primary-outline"
                onClick={onClose}
              />
              <Button
                title={isSubmitting ? "Saving..." : "Save"}
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