"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay, Dropdown } from "@/components";
import { useRef, useEffect } from "react";
import { ICreateTicketCommentPayload } from "@/services/apis/clients/community-client/types";

const priorityOptions = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Critical", value: "Critical" },
];

const statusOptions = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Resolved", value: "Resolved" },
  { label: "Closed", value: "Closed" },
];

export interface AddTicketCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ICreateTicketCommentPayload) => Promise<void> | void;
  initialValues: ICreateTicketCommentPayload;
  isPending?: boolean;
  isEdit?: boolean;
}

export function AddTicketCommentModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isPending = false,
  isEdit = false,
}: AddTicketCommentModalProps) {
  // Track if user has edited title/description
  const userEditedTitle = useRef(false);
  const userEditedDescription = useRef(false);

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().optional(),
      description: Yup.string().optional(),
      status: Yup.string().required("Status is required"),
      priority: Yup.string().required("Priority is required"),
      remark: Yup.string().optional(),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  // Watch for changes in initialValues and update formik if not edited by user
  useEffect(() => {
    if (!userEditedTitle.current) {
      formik.setFieldValue("title", initialValues.title || "");
    }
    if (!userEditedDescription.current) {
      formik.setFieldValue("description", initialValues.description || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues.title, initialValues.description]);

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={isEdit ? "Edit Ticket Comment" : "Add Ticket Comment"}
      modalClassName="w-full md:w-[31rem] "
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6  bg-customGray border  p-3  rounded-md  space-y-1 mb-3 "
      >
        <InputField
          label="Title"
          name="title"
          placeholder="Enter Comment Title (optional)"
          value={formik.values.title}
          onChange={e => {
            userEditedTitle.current = true;
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.title ? formik.errors.title : undefined}
        />
        <InputField
          label="Description"
          name="description"
          placeholder="Enter Description (optional)"
          value={formik.values.description}
          onChange={e => {
            userEditedDescription.current = true;
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.description ? formik.errors.description : undefined}
        />
        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            label="Status"
            options={statusOptions}
            value={formik.values.status || ""}
            onChange={(value) => formik.setFieldValue("status", value)}
            error={formik.touched.status ? formik.errors.status : undefined}
          />
          <Dropdown
            label="Priority"
            options={priorityOptions}
            value={formik.values.priority || ""}
            onChange={(value) => formik.setFieldValue("priority", value)}
            error={formik.touched.priority ? formik.errors.priority : undefined}
          />
        </div>
        <InputField
          label="Remark"
          name="remark"
          type="textarea"
          placeholder="Enter Remark (optional)"
          value={formik.values.remark}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.remark ? formik.errors.remark : undefined}
        />
        <div className="flex gap-4">
          <Button
            title="Cancel"
            variant="primary-outline"
            type="button"
            onClick={onClose}
            width="w-full"
          />
          <Button
            title={isPending ? (isEdit ? "Saving..." : "Adding...") : (isEdit ? "Save Changes" : "Add Ticket Comment")}
            type="submit"
            width="w-full"
            disabled={isPending}
          />
        </div>
      </form>
    </ModalOverlay>
  );
}
