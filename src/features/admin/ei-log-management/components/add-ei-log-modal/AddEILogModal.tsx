"use client";

import { Button, InputField, ModalOverlay, Dropdown, UploadFileInput } from "@/components";
import { IApiError } from "@/utils";
import { IAllEILogList } from "@/services";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ICreateEILogResponse,
  IUpdateEILogResponse,
  useCreateEILogMutation,
  useUpdateEILogMutation,
  useAllEILogTypesQuery,
  useAllEILogHeadsQuery,
} from "@/services";
import toast from "react-hot-toast";

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
    payment_mode: "",
    attachment: null as File | null,
  });

  const { allEILogTypesData } = useAllEILogTypesQuery();
  const { allEILogHeadsData } = useAllEILogHeadsQuery();

  // Update form values when modal opens or eiLogData changes
  useEffect(() => {
    if (isOpen && eiLogData) {
      setInitialValues({
        ei_log_type_id: eiLogData.ei_log_type?.id || "",
        ei_log_head_id: eiLogData.ei_log_head?.id || "",
        description: eiLogData.description || "",
        income: eiLogData.income?.toString() || "",
        expense: eiLogData.expense?.toString() || "",
        payment_mode: eiLogData.payment_mode || "",
        attachment: null,
      });
    } else if (isOpen) {
      setInitialValues({
        ei_log_type_id: "",
        ei_log_head_id: "",
        description: "",
        income: "",
        expense: "",
        payment_mode: "",
        attachment: null,
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
    { key: "cash", label: "Cash", value: "cash" },
    { key: "card", label: "Card", value: "card" },
    { key: "bank_transfer", label: "Bank Transfer", value: "bank_transfer" },
    { key: "upi", label: "UPI", value: "upi" },
    { key: "cheque", label: "Cheque", value: "cheque" },
  ];

  return (
    <ModalOverlay
      modalTitle="Back to EI Logs"
      isOpen={isOpen}
      onClose={onClose}
      modalClassName="w-full sm:w-[40rem]"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          ei_log_type_id: Yup.string().required("EI Log Type is required"),
          ei_log_head_id: Yup.string().required("EI Log Head is required"),
          description: Yup.string().required("Description is required"),
          income: Yup.number().min(0, "Income must be positive"),
          expense: Yup.number().min(0, "Expense must be positive"),
          payment_mode: Yup.string(),
          attachment: Yup.mixed(),
        })}
        onSubmit={(values, { resetForm }) => {
          const payload = {
            ei_log_type_id: values.ei_log_type_id,
            ei_log_head_id: values.ei_log_head_id,
            description: values.description,
            income: values.income ? parseFloat(values.income) : undefined,
            expense: values.expense ? parseFloat(values.expense) : undefined,
            payment_mode: values.payment_mode || undefined,
            attachment: values.attachment || undefined,
          };

          if (eiLogId) {
            onEditEILog({ id: eiLogId, payload });
          } else {
            createEILog(payload);
          }
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="flex flex-col gap-4 2xl:gap-[1vw] p-4 2xl:p-[1vw] bg-white rounded-xl 2xl:rounded-[0.75vw] border-gray-400">
            <h1 className="text-md 2xl:text-[1vw] text-gray-900">
              {eiLogId ? "Edit EI Log" : "Add New EI Log"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw]">
              <div>
                <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                  Date *
                </label>
                <Field
                  name="date"
                  type="date"
                  as={InputField}
                  placeholder="Select Date"
                />
                <div className="text-red-500 text-[0.9rem] mt-1">
                  <ErrorMessage name="date" />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                  EI Log Type *
                </label>
                <Dropdown
                  options={typeOptions}
                  value={values.ei_log_type_id}
                  onChange={(value: string) => setFieldValue("ei_log_type_id", value)}
                />
                <div className="text-red-500 text-[0.9rem] mt-1">
                  <ErrorMessage name="ei_log_type_id" />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                  EI Log Head *
                </label>
                <Dropdown
                  options={headOptions}
                  value={values.ei_log_head_id}
                  onChange={(value: string) => setFieldValue("ei_log_head_id", value)}
                />
                <div className="text-red-500 text-[0.9rem] mt-1">
                  <ErrorMessage name="ei_log_head_id" />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                  Payment Mode
                </label>
                <Dropdown
                  options={paymentModeOptions}
                  value={values.payment_mode}
                  onChange={(value: string) => setFieldValue("payment_mode", value)}
                />
                <div className="text-red-500 text-[0.9rem] mt-1">
                  <ErrorMessage name="payment_mode" />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                  Income
                </label>
                <Field
                  name="income"
                  type="number"
                  as={InputField}
                  placeholder="Enter Income"
                />
                <div className="text-red-500 text-[0.9rem] mt-1">
                  <ErrorMessage name="income" />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                  Expense
                </label>
                <Field
                  name="expense"
                  type="number"
                  as={InputField}
                  placeholder="Enter Expense"
                />
                <div className="text-red-500 text-[0.9rem] mt-1">
                  <ErrorMessage name="expense" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                Description *
              </label>
              <Field
                name="description"
                as="textarea"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter Description"
              />
              <div className="text-red-500 text-[0.9rem] mt-1">
                <ErrorMessage name="description" />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-[0.9rem] font-medium text-gray-700">
                Attachment (Optional)
              </label>
              <UploadFileInput
                onFileUpload={(file: File | null) => {
                  setFieldValue("attachment", file);
                }}
                placeholder="Upload Attachment"
              />
              <div className="text-red-500 text-[0.9rem] mt-1">
                <ErrorMessage name="attachment" />
              </div>
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
        )}
      </Formik>
    </ModalOverlay>
  );
}; 