import { Button, InputField, ModalOverlay } from "@/components";
import { IApiError } from "@/utils";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ICreateSourcesResponse, IUpdateSourcesResponse, useCreateSourcesMutation, useUpdateSourcesMutation } from "@/services";
import toast from "react-hot-toast";

interface AddLeadSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSourceSuccessCallback: () => void;
  sourceId?: string; 
  sourceName?: string; 
}

export const AddLeadSourcesModal: React.FC<AddLeadSourcesModalProps> = ({
  isOpen,
  onClose,
  onAddSourceSuccessCallback,
  sourceId,
  sourceName = "", // Default to empty string
}) => {
  const [initialValues, setInitialValues] = useState({ name: "" });

  // Set initial values when modal opens
  useEffect(() => {
    if (isOpen) {
      setInitialValues({ name: sourceName || "" });
    }
  }, [isOpen, sourceName]);

  const { onStatusMutation } = useCreateSourcesMutation({
    onSuccessCallback: (response: ICreateSourcesResponse) => {
      onAddSourceSuccessCallback();
      onClose();
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create lead source:", err);
      toast.error(err.message);
    },
  });

  const { onEditSources } = useUpdateSourcesMutation({
    onSuccessCallback: (response: IUpdateSourcesResponse) => {
      onAddSourceSuccessCallback();
      onClose();
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to update lead source:", err);
      toast.error(err.message);
    },
  });

  return (
    <ModalOverlay
      modalTitle="Back to Add Sources"
      isOpen={isOpen}
      onClose={onClose}
      modalClassName="w-full sm:w-[30rem]"
    >
      <Formik
        enableReinitialize // Important: Allows form to update when initialValues change
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Lead source name is required")
            .max(50, "Must be 50 characters or less"),
        })}
        onSubmit={(values, { resetForm }) => {
          const lowerCaseName = values.name.toLowerCase().trim();
          if (sourceId) {
            onEditSources({ id: sourceId, payload: { name: lowerCaseName } });
          } else {
            onStatusMutation({ name: lowerCaseName });
          }
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 2xl:gap-[1vw] p-4 2xl:p-[1vw] bg-white rounded-xl 2xl:rounded-[0.75vw] border-gray-400">
            <h1 className="text-md 2xl:text-[1vw] text-gray-900">
              {sourceId ? "Edit Lead Source" : "Add New Lead Source"}
            </h1>

            <div className="flex flex-col gap-4 md:gap-8 2xl:gap-[2vw] md:flex-row justify-between items-center w-full">
              <div className="w-full">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  as={InputField}
                  placeholder="Enter Lead Source Name"
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
                onClick={onClose}
              />
              <Button
                title={sourceId ? "Update Source" : "Add Source"}
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
