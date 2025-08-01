"use client"
import { Button, InputField, ModalOverlay } from "@/components";
import {
  ICreateStatusesResponse,
  IUpdateStatusesResponse,
  useCreateStatusesMutation,
  useUpdateStatusesMutation,
} from "@/services";
import { IApiError } from "@/utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface AddLeadStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStatusSuccessCallback: () => void;
  onClearEditData?: () => void; // NEW: Callback to clear edit mode
  statusId?: string;
  statusName?: string;
  statusColor?: string;
}

export function AddLeadStatusModal({
  onClose,
  onAddStatusSuccessCallback,
  onClearEditData,
  isOpen,
  statusId,
  statusName,
  statusColor,
}: AddLeadStatusModalProps) {
  const { onAllStatusMutation } = useCreateStatusesMutation({
    onSuccessCallback: (response: ICreateStatusesResponse) => {
      onAddStatusSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const { onEditStatuses } = useUpdateStatusesMutation({
    onSuccessCallback: (response: IUpdateStatusesResponse) => {
      onAddStatusSuccessCallback();
      onClose();
      onClearEditData?.(); // Clear edit mode
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  return (
    <ModalOverlay modalTitle="Back to Status" isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#F8F8F8] sm:w-[30rem]">
        <div className="border border-[#D7D7D7] rounded-lg p-4 space-y-4 bg-[#FFFFFF]">
          <h2 className="text-base font-semibold text-gray-800">
            {statusId ? "Edit Lead Status" : "Add Lead Status"}
          </h2>

          <Formik
            initialValues={{ name: statusName || "", color: statusColor || "#000000" }}
            enableReinitialize
            validationSchema={Yup.object({
              name: Yup.string()
                .required("Lead status is required")
                .max(50, "Must be 50 characters or less"),
              color: Yup.string()
                .matches(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color code")
                .required("Color is required"),
            })}
            onSubmit={(values, { resetForm }) => {
              const lowerCaseName = values.name.toLowerCase().trim();
              if (statusId) {
                onEditStatuses({
                  id: statusId,
                  payload: { name: lowerCaseName, color: values.color },
                });
              } else {
                onAllStatusMutation({ name: lowerCaseName, color: values.color });
              }
              resetForm();
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-4">
                <div>
                  <label className="text-[0.9rem] font-medium text-gray-700 block mb-2">
                    Lead Status
                  </label>
                  <Field
                    name="name"
                    as={InputField}
                    type="text"
                    placeholder="Enter New Lead Status"
                  />
                  <div className="text-red-500 text-[0.9rem] mt-1">
                    <ErrorMessage name="name" />
                  </div>
                </div>

                <div>
                  <label className="text-[0.9rem] font-medium text-gray-700 block mb-2">
                    Status Color
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md 2xl:rounded-[0.375vw] relative px-4 ">
                    <div
                      className="w-14 h-6 rounded-full"
                      style={{ backgroundColor: values.color }}
                    />
                    <Field
                      name="color"
                      as={InputField}
                      type="text"
                      className="bg-transparent border-none ring-none focus:none"
                      placeholder="#000000"
                    />
                    <Field
                      name="color"
                      as={InputField}
                      type="color"
                      className="absolute w-full left-0 top-0 opacity-0"
                    />
                  </div>
                  <div className="text-red-500 text-[0.9rem] mt-1">
                    <ErrorMessage name="color" />
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    variant="primary-outline"
                    title="Cancel"
                    width="w-full"
                    onClick={() => {
                      onClose();
                      onClearEditData?.();
                    }}
                    type="button"
                  />
                  <Button
                    variant="primary"
                    title={statusId ? "Update Status" : "Add Status"}
                    width="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </ModalOverlay>
  );
}
