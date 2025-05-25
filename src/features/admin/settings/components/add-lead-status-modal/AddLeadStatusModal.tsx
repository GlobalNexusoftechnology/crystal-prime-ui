import { Button, InputField, ModalOverlay } from "@/components";
import {
  ICreateStatusesResponse,
  IUpdateStatusesResponse,
  useCreateStatusesMutation,
  useUpdateStatusesMutation
} from "@/services";
import { IApiError } from "@/utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface AddLeadStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStatusSuccessCallback: () => void;
  statusId?: string;
  statusName?: string;
}

export function AddLeadStatusModal({
  onClose,
  onAddStatusSuccessCallback,
  isOpen,
  statusId,
  statusName
}: AddLeadStatusModalProps) {
  const { onAllStatusMutation } = useCreateStatusesMutation({
    onSuccessCallback: (response: ICreateStatusesResponse) => {
      onAddStatusSuccessCallback();
      onClose();
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create lead status:", err);
      toast.error(err.message);
    },
  });

  const { onEditStatuses } = useUpdateStatusesMutation({
    onSuccessCallback: (response: IUpdateStatusesResponse) => {
      onAddStatusSuccessCallback();
      onClose();
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to update lead status:", err);
      toast.error(err.message);
    },
  });

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#F8F8F8] sm:w-[30rem]">
        <div className="border border-[#D7D7D7] rounded-lg p-4 space-y-4 bg-[#FFFFFF]">
          <h2 className="text-base font-semibold text-gray-800">
            {statusId ? "Edit Lead Status" : "Add Lead Status"}
          </h2>

          <Formik
            initialValues={{ name: statusName || "" }}
            enableReinitialize
            validationSchema={Yup.object({
              name: Yup.string()
                .required("Lead status is required")
                .max(50, "Must be 50 characters or less"),
            })}
            onSubmit={(values, { resetForm }) => {
              if (statusId) {
                onEditStatuses({ id: statusId, payload: { name: values.name } });
              } else {
                onAllStatusMutation({ name: values.name });
              }
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Lead Status
                  </label>
                  <Field
                    name="name"
                    as={InputField}
                    type="text"
                    placeholder="Enter New Lead Status"
                  />
                  <div className="text-red-500 text-sm mt-1">
                    <ErrorMessage name="name" />
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    variant="primary-outline"
                    title="Cancel"
                    width="w-full"
                    onClick={onClose}
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
