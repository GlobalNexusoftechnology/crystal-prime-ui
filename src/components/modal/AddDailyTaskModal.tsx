"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay, Dropdown } from "@/components";
import { HoursSpentInput } from "@/components/hours-spent-input";
import { useRef, useEffect } from "react";
import { ICreateDailyTaskEntryPayload } from "@/services";

const priorityOptions = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

const dailyTaskValidationSchema = Yup.object().shape({
  hours_spent: Yup.number()
    .positive("Must be a positive number")
    .required("Hours spent is required"),
  status: Yup.string().required("Status is required"),
  remarks: Yup.string().required("Remark is required"),
  priority: Yup.string().required("Priority is required"),
});

export interface AddDailyTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ICreateDailyTaskEntryPayload & { remarks: string }) => Promise<void> | void;
  initialValues: ICreateDailyTaskEntryPayload & { remarks: string };
  isPending?: boolean;
  isEdit?: boolean;
}

export function AddDailyTaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isPending = false,
  isEdit = false,
}: AddDailyTaskModalProps) {
  // Track if user has edited title/description
  const userEditedTitle = useRef(false);
  const userEditedDescription = useRef(false);

  const formik = useFormik({
    initialValues,
    validationSchema: dailyTaskValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  // Watch for changes in initialValues and update formik if not edited by user
  useEffect(() => {
    if (!userEditedTitle.current) {
      formik.setFieldValue("task_title", initialValues.task_title || "");
    }
    if (!userEditedDescription.current) {
      formik.setFieldValue("description", initialValues.description || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues.task_title, initialValues.description]);

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={isEdit ? "Edit Daily Task Comment" : "Add Daily Task Comment"}
      modalClassName="w-full md:w-[31rem] 2xl:w-[31vw]"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
      >
        <InputField
          label="Task Title"
          name="task_title"
          placeholder="Enter Task Title"
          value={formik.values.task_title}
          onChange={e => {
            userEditedTitle.current = true;
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.task_title ? formik.errors.task_title : undefined}
        />
        <InputField
          label="Description"
          name="description"
          placeholder="Enter Description"
          value={formik.values.description}
          onChange={e => {
            userEditedDescription.current = true;
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.description ? formik.errors.description : undefined}
        />
        <div className="grid grid-cols-2 gap-4">
          <HoursSpentInput
            value={formik.values.hours_spent || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.hours_spent ? formik.errors.hours_spent : undefined}
          />
          <Dropdown
            label="Status"
            options={statusOptions}
            value={formik.values.status || ""}
            onChange={(value) => formik.setFieldValue("status", value)}
            error={formik.touched.status ? formik.errors.status : undefined}
          />
        </div>
        <Dropdown
          label="Priority"
          options={priorityOptions}
          value={formik.values.priority || ""}
          onChange={(value) => formik.setFieldValue("priority", value)}
          error={formik.touched.priority ? formik.errors.priority : undefined}
        />
        <InputField
          label="Remark"
          name="remarks"
          placeholder="Enter Remark"
          value={formik.values.remarks}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.remarks ? formik.errors.remarks : undefined}
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
            title={isPending ? (isEdit ? "Saving..." : "Adding...") : (isEdit ? "Save Changes" : "Add Daily Task Comment")}
            type="submit"
            width="w-full"
            disabled={isPending}
          />
        </div>
      </form>
    </ModalOverlay>
  );
} 