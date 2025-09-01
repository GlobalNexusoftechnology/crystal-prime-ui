"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  InputField,
  ModalOverlay,
  Dropdown,
  DatePicker,
} from "@/components";
import { useRef, useEffect } from "react";
import { ICreateProjectTask } from "@/services";

const statusOptions = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

const priorityOptions = [
  { label: "Critical", value: "Critical" },
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

export interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ICreateProjectTask) => Promise<void> | void;
  initialValues: ICreateProjectTask;
  isPending?: boolean;
  isEdit?: boolean;
  projectOptions?: { label: string; value: string }[];
  milestoneOptions?: { label: string; value: string }[];
  userOptions?: { label: string; value: string }[];
  selectedProjectId?: string;
  onProjectChange?: (projectId: string) => void;
}

export function AddTaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isPending = false,
  isEdit = false,
  projectOptions = [],
  milestoneOptions = [],
  userOptions = [],
  selectedProjectId = "",
  onProjectChange,
}: AddTaskModalProps) {
  // Track if user has edited title/description
  const userEditedTitle = useRef(false);
  const userEditedDescription = useRef(false);

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Task title is required"),
      description: Yup.string().required("Description is required"),
      milestone_id: Yup.string().required("Milestone is required"),
      assigned_to: Yup.string().required("Assigned to is required"),
      status: Yup.string().required("Status is required"),
      priority: Yup.string().required("Priority is required"),
      due_date: Yup.string().required("Due date is required"),
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
      modalTitle={isEdit ? "Edit Task" : "Add New Task"}
      modalClassName="w-full md:w-[31rem] 2xl:w-[31vw]"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 2xl:gap-[1.5vw] overflow-auto h-[30rem] 2xl:h-[30vw] bg-customGray border 2xl:border-[0.05vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown
            label="Project"
            options={projectOptions}
            value={selectedProjectId || ""}
            onChange={(value) => {
              formik.setFieldValue("milestone_id", ""); // Reset milestone when project changes
              onProjectChange?.(value);
            }}
          />
          <Dropdown
            label="Assigned To"
            options={userOptions}
            value={formik.values.assigned_to || ""}
            onChange={(value) => formik.setFieldValue("assigned_to", value)}
            error={
              formik.touched.assigned_to ? formik.errors.assigned_to : undefined
            }
          />
        </div>
        <Dropdown
          label="Milestone"
          options={milestoneOptions}
          value={formik.values.milestone_id || ""}
          onChange={(value) => formik.setFieldValue("milestone_id", value)}
          error={
            formik.touched.milestone_id ? formik.errors.milestone_id : undefined
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker
            label="Due Date"
            value={formik.values.due_date || ""}
            onChange={(value) => formik.setFieldValue("due_date", value)}
            placeholder="Select Due Date"
            datePickerWidth="w-full"
            error={formik.touched.due_date ? formik.errors.due_date : undefined}
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
          label="Task Title"
          name="title"
          placeholder="Enter Task Title"
          value={formik.values.title}
          onChange={(e) => {
            userEditedTitle.current = true;
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.title ? formik.errors.title : undefined}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter Description"
          value={formik.values.description}
          onChange={(e) => {
            userEditedDescription.current = true;
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description ? formik.errors.description : undefined
          }
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
            title={
              isPending
                ? isEdit
                  ? "Saving..."
                  : "Adding..."
                : isEdit
                ? "Save Changes"
                : "Add Task"
            }
            type="submit"
            width="w-full"
            disabled={isPending}
          />
        </div>
      </form>
    </ModalOverlay>
  );
}
