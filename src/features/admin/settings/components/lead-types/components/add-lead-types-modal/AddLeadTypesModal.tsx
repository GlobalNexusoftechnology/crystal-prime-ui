import { Button, InputField, ModalOverlay } from "@/components";
import { IApiError } from "@/utils";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ICreateTypesResponse,
  IUpdateTypesResponse,
  useCreateTypeMutation,
  useUpdateTypeMutation,
} from "@/services";
import toast from "react-hot-toast";

interface AddLeadTypesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTypeSuccessCallback: () => void;
  onClearEditData?: () => void; // NEW: Callback to clear edit mode
  typeId?: string;
  typeName?: string;
}

export const AddLeadTypesModal: React.FC<AddLeadTypesModalProps> = ({
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

  const { onTypeMutation } = useCreateTypeMutation({
    onSuccessCallback: (response: ICreateTypesResponse) => {
      onAddTypeSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create lead type:", err);
      toast.error(err.message);
    },
  });

  const { onEditType } = useUpdateTypeMutation({
    onSuccessCallback: (response: IUpdateTypesResponse) => {
      onAddTypeSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to update lead type:", err);
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
            .required("Lead type name is required")
            .max(50, "Must be 50 characters or less"),
        })}
        onSubmit={(values, { resetForm }) => {
          const lowerCaseName = values.name.toLowerCase().trim();
          if (typeId) {
            onEditType({ id: typeId, payload: { name: lowerCaseName } });
          } else {
            onTypeMutation({ name: lowerCaseName });
          }
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 2xl:gap-[1vw] p-4 2xl:p-[1vw] bg-white rounded-xl 2xl:rounded-[0.75vw] border-gray-400">
            <h1 className="text-md 2xl:text-[1vw] text-gray-900">
              {typeId ? "Edit Lead Type" : "Add New Lead Type"}
            </h1>

            <div className="flex flex-col gap-4 md:gap-8 2xl:gap-[2vw] md:flex-row justify-between items-center w-full">
              <div className="w-full">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  as={InputField}
                  placeholder="Enter Lead Type Name"
                />
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 2xl:gap-[1vw] w-full">
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
                title={typeId ? "Update Type" : "Add Type"}
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
