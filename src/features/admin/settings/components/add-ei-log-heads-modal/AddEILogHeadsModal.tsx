"use client"
import { Button, InputField, ModalOverlay } from "@/components";
import { IApiError } from "@/utils";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ICreateEILogHeadResponse,
  IUpdateEILogHeadResponse,
  useCreateEILogHeadMutation,
  useUpdateEILogHeadMutation,
} from "@/services";
import toast from "react-hot-toast";

interface AddEILogHeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHeadSuccessCallback: () => void;
  onClearEditData?: () => void; // NEW: Callback to clear edit mode
  headId?: string;
  headName?: string;
}

export const AddEILogHeadsModal: React.FC<AddEILogHeadsModalProps> = ({
  isOpen,
  onClose,
  onAddHeadSuccessCallback,
  onClearEditData,
  headId,
  headName = "",
}) => {
  const [initialValues, setInitialValues] = useState({ name: "" });

  // Update form values when modal opens or headName changes
  useEffect(() => {
    if (isOpen) {
      setInitialValues({ name: headName || "" });
    }
  }, [isOpen, headName]);

  const { onEILogHeadMutation } = useCreateEILogHeadMutation({
    onSuccessCallback: (response: ICreateEILogHeadResponse) => {
      onAddHeadSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create EI Log Head:", err);
      toast.error(err.message);
    },
  });

  const { onEditEILogHead } = useUpdateEILogHeadMutation({
    onSuccessCallback: (response: IUpdateEILogHeadResponse) => {
      onAddHeadSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to update EI Log Head:", err);
      toast.error(err.message);
    },
  });

  return (
    <ModalOverlay
      modalTitle="Back to Add Heads"
      isOpen={isOpen}
      onClose={onClose}
      modalClassName="w-full sm:w-[30rem]"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("EI Log Head name is required")
            .max(50, "Must be 50 characters or less"),
        })}
        onSubmit={(values, { resetForm }) => {
          const lowerCaseName = values.name.toLowerCase().trim();
          if (headId) {
            onEditEILogHead({ id: headId, payload: { name: lowerCaseName } });
          } else {
            onEILogHeadMutation({ name: lowerCaseName });
          }
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 2xl:gap-[1vw] p-4 2xl:p-[1vw] bg-white rounded-xl 2xl:rounded-[0.75vw] border-gray-400">
            <h1 className="text-md 2xl:text-[1vw] text-gray-900">
              {headId ? "Edit EI Log Head" : "Add New EI Log Head"}
            </h1>

            <div className="flex flex-col gap-4 md:gap-8 2xl:gap-[2vw] md:flex-row justify-between items-center w-full">
              <div className="w-full">
                <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  as={InputField}
                  placeholder="Enter EI Log Head Name"
                />
                <div className="text-red-500 text-[0.9rem] mt-1">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 2xl:gap-[0.5vw]">
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