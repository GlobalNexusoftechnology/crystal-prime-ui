"use client";

import {
  Button,
  InputField,
  ModalOverlay,
  Dropdown,
  UploadDocument,
} from "@/components";
import { IApiError } from "@/utils";
import { IAllEILogList } from "@/services";
import React, { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  ICreateEILogResponse,
  IUpdateEILogResponse,
  useCreateEILogMutation,
  useUpdateEILogMutation,
  useAllEILogTypesQuery,
  useAllEILogHeadsQuery,
  useUploadEILogAttachmentMutation,
  IUploadAttachmentResponse,
} from "@/services";
import toast from "react-hot-toast";

interface EILogFormValues {
  ei_log_type_id: string;
  ei_log_head_id: string;
  description: string;
  income: string;
  expense: string;
  payment_mode: string;
  attachment: File | string;
}

interface AddEILogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEILogSuccessCallback: () => void;
  onClearEditData?: () => void;
  eiLogId?: string;
  eiLogData?: IAllEILogList | null;
  eiLogsRefetch?: () => void;
}

export const AddEILogModal: React.FC<AddEILogModalProps> = ({
  isOpen,
  onClose,
  onAddEILogSuccessCallback,
  onClearEditData,
  eiLogId,
  eiLogData,
  eiLogsRefetch,
}) => {
  const [initialValues, setInitialValues] = useState({
    ei_log_type_id: "",
    ei_log_head_id: "",
    description: "",
    income: "",
    expense: "",
    payment_mode: "Cash",
    attachment: "" as File | "",
  });

  const { allEILogTypesData } = useAllEILogTypesQuery();
  const { allEILogHeadsData } = useAllEILogHeadsQuery();

  // Update form values when modal opens or eiLogData changes
  useEffect(() => {
    if (isOpen && eiLogData) {
      setInitialValues({
        ei_log_type_id: eiLogData.eilogType?.id || "",
        ei_log_head_id: eiLogData.eilogHead?.id || "",
        description: eiLogData.description || "",
        income: eiLogData.income?.toString() || "",
        expense: eiLogData.expense?.toString() || "",
        payment_mode: eiLogData.paymentMode || "",
        attachment: "",
      });
    } else if (isOpen) {
      setInitialValues({
        ei_log_type_id: "",
        ei_log_head_id: "",
        description: "",
        income: "",
        expense: "",
        payment_mode: "Cash",
        attachment: "",
      });
    }
  }, [isOpen, eiLogData]);

  const { createEILog, isPending: isCreating } = useCreateEILogMutation({
    onSuccessCallback: (response: ICreateEILogResponse) => {
      onAddEILogSuccessCallback();
      onClose();
      onClearEditData?.();
      toast.success(response.message);
      eiLogsRefetch?.();
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create EI Log:", err);
      toast.error(err.message);
    },
  });

  const { onEditEILog, isPending: isUpdating } = useUpdateEILogMutation({
    onSuccessCallback: (response: IUpdateEILogResponse) => {
      onAddEILogSuccessCallback();
      onClose();
      onClearEditData?.();
      toast.success(response.message);
      eiLogsRefetch?.();
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to update EI Log:", err);
      toast.error(err.message);
    },
  });

  const setFieldValueRef = React.useRef<
    FormikHelpers<EILogFormValues>["setFieldValue"] | null
  >(null);

  const { onUploadEILogAttachment } = useUploadEILogAttachmentMutation({
    onSuccessCallback: (data: IUploadAttachmentResponse) => {
      // Set the Formik field to the uploaded file URL (docUrl)
      if (setFieldValueRef.current) {
        setFieldValueRef.current("attachment", data.data.docUrl);
      }
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const typeOptions = (allEILogTypesData?.data || []).map((type) => ({
    key: type.id,
    label: type.name,
    value: type.id,
  }));

  const headOptions = (allEILogHeadsData?.data || []).map((head) => ({
    key: head.id,
    label: head.name,
    value: head.id,
  }));

  const paymentModeOptions = [
    { key: "Cash", label: "Cash", value: "Cash" },
    { key: "Online", label: "Online", value: "Online" },
    { key: "UPI", label: "UPI", value: "UPI" },
    { key: "Bank Transfer", label: "Bank Transfer", value: "Bank Transfer" },
    { key: "Cheque", label: "Cheque", value: "Cheque" },
    { key: "Others", label: "Others", value: "Others" },
  ];

  return (
    <ModalOverlay
      modalTitle="Back to EI Logs"
      isOpen={isOpen}
      onClose={onClose}
      modalClassName="w-full sm:w-[40rem]"
    >
      <Formik<EILogFormValues>
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          ei_log_type_id: Yup.string().required("EI Log Type is required"),
          ei_log_head_id: Yup.string().required("EI Log Head is required"),
          description: Yup.string().required("Description is required"),
          income: Yup.number().min(0, "Income must be positive"),
          expense: Yup.number().min(0, "Expense must be positive"),
          payment_mode: Yup.string().required("Payment Mode is required"),
          attachment: Yup.mixed(),
        })}
        onSubmit={(values, { resetForm }) => {
          const payload = {
            eilogType: values.ei_log_type_id,
            eilogHead: values.ei_log_head_id,
            description: values.description,
            income: values.income ? parseFloat(values.income) : undefined,
            expense: values.expense ? parseFloat(values.expense) : undefined,
            paymentMode: values.payment_mode,
            attachment:
              typeof values.attachment === "string"
                ? values.attachment
                : undefined,
          };

          if (eiLogId) {
            onEditEILog({ id: eiLogId, payload });
          } else {
            createEILog(payload);
          }
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue, values, touched, errors }) => {
          // Set the ref directly
          setFieldValueRef.current = setFieldValue;
          return (
            <Form className="flex flex-col gap-4 2xl:gap-[1vw] p-4 2xl:p-[1vw] bg-white rounded-xl 2xl:rounded-[0.75vw] border-gray-400">
              <h1 className="text-md 2xl:text-[1vw] text-gray-900">
                {eiLogId ? "Edit EI Log" : "Add New EI Log"}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw]">
                <div>
                  <Dropdown
                    label="EI Log Type *"
                    options={typeOptions}
                    value={values.ei_log_type_id}
                    onChange={(value: string) =>
                      setFieldValue("ei_log_type_id", value)
                    }
                    error={
                      touched.ei_log_type_id && errors.ei_log_type_id
                        ? errors.ei_log_type_id
                        : ""
                    }
                  />
                </div>
                <div>
                  <Dropdown
                    label="EI Log Head *"
                    options={headOptions}
                    value={values.ei_log_head_id}
                    onChange={(value: string) =>
                      setFieldValue("ei_log_head_id", value)
                    }
                    error={
                      touched.ei_log_head_id && errors.ei_log_head_id
                        ? errors.ei_log_head_id
                        : ""
                    }
                  />
                </div>
                <div>
                  <Dropdown
                    label="Payment Mode *"
                    options={paymentModeOptions}
                    value={values.payment_mode}
                    onChange={(value: string) =>
                      setFieldValue("payment_mode", value)
                    }
                    error={
                      touched.payment_mode && errors.payment_mode
                        ? errors.payment_mode
                        : ""
                    }
                  />
                </div>
                <div>
                  <InputField
                    label="Income"
                    name="income"
                    type="number"
                    placeholder="Enter Income"
                    value={values.income}
                    onChange={(e) => setFieldValue("income", e.target.value)}
                    error={touched.income && errors.income ? errors.income : ""}
                  />
                </div>
                <div>
                  <InputField
                    label="Expense"
                    name="expense"
                    type="number"
                    placeholder="Enter Expense"
                    value={values.expense}
                    onChange={(e) => setFieldValue("expense", e.target.value)}
                    error={
                      touched.expense && errors.expense ? errors.expense : ""
                    }
                  />
                </div>
                <div className="mt-2">
                  <UploadDocument
                    label="Attachment (Optional)"
                    placeholder={
                      typeof values.attachment === "string"
                        ? values.attachment
                        : "Upload Attachment"
                    }
                    onChange={(files: FileList | null) => {
                      if (files && files[0]) {
                        const formData = new FormData();
                        formData.append("document", files[0]);
                        onUploadEILogAttachment(formData);
                      }
                    }}
                    error={
                      touched.attachment && errors.attachment
                        ? errors.attachment
                        : undefined
                    }
                  />
                </div>
              </div>

              <div>
                <InputField
                  label="Description *"
                  name="description"
                  type="textarea"
                  value={values.description}
                  onChange={(e) => setFieldValue("description", e.target.value)}
                  error={
                    touched.description && errors.description
                      ? errors.description
                      : ""
                  }
                />
              </div>
              <div className="flex justify-end gap-4 2xl:gap-[1vw] mt-4">
                <Button
                  title="Cancel"
                  variant="primary-outline"
                  onClick={onClose}
                  type="button"
                />
                <Button
                  title={eiLogId ? "Update" : "Create"}
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || isCreating || isUpdating}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </ModalOverlay>
  );
};
