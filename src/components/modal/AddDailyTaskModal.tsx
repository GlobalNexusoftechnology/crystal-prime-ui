"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay, Dropdown, SimpleDropdown } from "@/components";
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

// Removed hours_spent conversion helpers since field is no longer used

export interface AddDailyTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ICreateDailyTaskEntryPayload & { remarks: string }) => Promise<void> | void;
  initialValues: ICreateDailyTaskEntryPayload & { remarks: string };
  isPending?: boolean;
  isEdit?: boolean;
  showProjectAndUserSelection?: boolean;
  projectOptions?: { label: string; value: string }[];
  userOptions?: { label: string; value: string }[];
  isLoadingProjects?: boolean;
  isLoadingUsers?: boolean;
}

export function AddDailyTaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isPending = false,
  isEdit = false,
  showProjectAndUserSelection = false,
  projectOptions = [],
  userOptions = [],
}: AddDailyTaskModalProps) {
  // Track if user has edited title/description
  const userEditedTitle = useRef(false);
  const userEditedDescription = useRef(false);

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: Yup.object().shape({
      ...(showProjectAndUserSelection && {
        project_id: Yup.string().required("Project is required"),
        assigned_to: Yup.string().required("Assigned to is required"),
      }),
      status: Yup.string().required("Status is required"),
      remarks: Yup.string().required("Remark is required"),
      priority: Yup.string().required("Priority is required"),
    }),
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
        className="flex flex-col gap-6 2xl:gap-[1.5vw] overflow-auto h-[30rem] 2xl:h-[30vw] bg-customGray border 2xl:border-[0.05vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
      >
        {showProjectAndUserSelection && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown
              label="Project"
              options={projectOptions}
              value={formik.values.project_id || ""}
              onChange={(value) => formik.setFieldValue("project_id", value)}
              error={formik.touched.project_id ? formik.errors.project_id : undefined}
            />
            <Dropdown
              label="Assigned To"
              options={userOptions}
              value={formik.values.assigned_to || ""}
              onChange={(value) => formik.setFieldValue("assigned_to", value)}
              error={formik.touched.assigned_to ? formik.errors.assigned_to : undefined}
            />
          </div>
        )}
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
        <SimpleDropdown
          label="Status"
          options={statusOptions}
          value={formik.values.status || ""}
          onChange={(value) => formik.setFieldValue("status", value)}
          error={formik.touched.status ? formik.errors.status : undefined}
        />
        <SimpleDropdown
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
        <div className="flex flex-wrap md:flex-nowrap gap-4">
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