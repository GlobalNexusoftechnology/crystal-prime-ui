"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, ModalOverlay, DatePicker, NumberInput } from "@/components";
import { useRef, useEffect } from "react";

export interface IProposal {
  proposalDate: string;
  proposalNumber: string; 
  proposalText: string;
}

export interface SendProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IProposal) => Promise<void> | void;
  initialValues: IProposal;
  isPending?: boolean;
  isEdit?: boolean;
}

export function SendProposalModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isPending = false,
  isEdit = false,
}: SendProposalModalProps) {
  const userEditedNumber = useRef(false);
  const userEditedText = useRef(false);

  const formik = useFormik({
    initialValues: {
      proposalDate: initialValues.proposalDate || "",
      proposalNumber: initialValues.proposalNumber || "0", // default as string
      proposalText: initialValues.proposalText || "",
    },
    validationSchema: Yup.object().shape({
      proposalDate: Yup.string().required("Proposal date is required"),
      proposalNumber: Yup.string()
        .required("Proposal number is required")
        .matches(/^[1-9]\d*$/, "Proposal number must be a positive integer"),
      proposalText: Yup.string().required("Proposal text is required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  // Sync initial values if user hasn't edited fields
  useEffect(() => {
    if (!userEditedNumber.current && initialValues.proposalNumber !== undefined) {
      formik.setFieldValue("proposalNumber", initialValues.proposalNumber.toString());
    }
    if (!userEditedText.current) {
      formik.setFieldValue("proposalText", initialValues.proposalText || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues.proposalNumber, initialValues.proposalText]);

  // Set defaults when modal opens
  useEffect(() => {
    if (isOpen && !isEdit) {
      if (!formik.values.proposalDate) {
        formik.setFieldValue("proposalDate", new Date().toISOString().split("T")[0]);
      }
      if (!formik.values.proposalNumber && initialValues.proposalNumber === undefined) {
        formik.setFieldValue("proposalNumber", "1"); // default as string
      }
    }
  }, [isOpen, isEdit, formik, initialValues.proposalNumber]);

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={isEdit ? "Edit Proposal" : "Send Proposal"}
      modalClassName="w-full md:w-[45rem]"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 2xl:gap-[1.5vw] overflow-auto bg-customGray border 2xl:border-[0.05vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proposal Number
            </label>
            <NumberInput
              value={Number(formik.values.proposalNumber)}
              onChange={(value) => {
                userEditedNumber.current = true;
                formik.setFieldValue("proposalNumber", value.toString());
              }}
              onBlur={formik.handleBlur}
              min={1}
              placeholder="Enter proposal number"
              className={`w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                formik.touched.proposalNumber && formik.errors.proposalNumber
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.proposalNumber && formik.errors.proposalNumber && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.proposalNumber}</p>
            )}
          </div>

          <DatePicker
            label="Proposal Date"
            value={formik.values.proposalDate || ""}
            onChange={(value) => formik.setFieldValue("proposalDate", value)}
            placeholder="Select Proposal Date"
            datePickerWidth="w-full"
            error={formik.touched.proposalDate ? formik.errors.proposalDate : undefined}
            maxDate={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Text</label>
          <textarea
            name="proposalText"
            placeholder="Enter proposal text..."
            value={formik.values.proposalText}
            onChange={(e) => {
              userEditedText.current = true;
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            rows={6}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              formik.touched.proposalText && formik.errors.proposalText ? "border-red-500" : ""
            }`}
          />
          {formik.touched.proposalText && formik.errors.proposalText && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.proposalText}</p>
          )}
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <Button
            title="Cancel"
            variant="primary-outline"
            type="button"
            onClick={onClose}
            width="w-full"
          />
          <Button
            title={isPending ? (isEdit ? "Saving..." : "Sending...") : isEdit ? "Save Changes" : "Send Proposal"}
            type="submit"
            width="w-full"
            disabled={isPending}
          />
        </div>
      </form>
    </ModalOverlay>
  );
}
