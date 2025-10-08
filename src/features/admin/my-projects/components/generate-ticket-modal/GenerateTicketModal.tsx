// features/admin/my-projects/components/GenerateTicketModal.tsx
"use client";

import { useState } from "react";
import {
  ModalOverlay,
  Button,
  InputField,
  UploadFileInput,
  Dropdown,
} from "@/components";
import {
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useUploadMultipleAttachmentsMutation,
  useAllProjectsQuery,
} from "@/services";
import { IApiError } from "@/utils";
import { ITicketData } from "@/services/apis/clients/community-client/types";
import { IProjectResponse } from "@/services/apis/clients/community-client/types";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

interface GenerateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  ticket?: ITicketData | null;
  taskId?: string;
  selectedCardTitle?: string;
}

// Priority options for radio buttons
const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string().required("Priority is required"),
  project: Yup.string().required("Project is required"),
  remark: Yup.string().required("Remark is required"),
});

export const GenerateTicketModal: React.FC<GenerateTicketModalProps> = ({
  isOpen,
  onClose,
  mode = "create",
  ticket,
  taskId,
  selectedCardTitle = "",
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>(
    mode === "edit" && ticket ? ticket.priority : ""
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    mode === "edit" && ticket ? ticket.project_id || "" : ""
  );

  // Fetch all projects
  const { allProjectsData } = useAllProjectsQuery();

  // Transform projects data for dropdown options
  const projectOptions = allProjectsData?.map((project: IProjectResponse) => ({
    label: project.name,
    value: project.id,
  })) || [];

  // Get selected project details for tasks
  const selectedProject = allProjectsData?.find(
    (project: IProjectResponse) => project.id === selectedProjectId
  );

  // Extract all tasks from all milestones of selected project
  const allTasks = selectedProject?.milestones?.flatMap(
    (milestone) =>
      milestone.tasks?.map((task) => ({
        ...task,
        milestoneName: milestone.name,
      })) || []
  ) || [];

  const { createTicket, isPending: isCreating } = useCreateTicketMutation({
    onSuccessCallback: (response) => {
      toast.success(response?.message || "Ticket created successfully");
      onClose();
      // Reset form
      formik.resetForm();
      setImageFile(null);
      setImageUrl("");
      setUploadedImageUrl("");
      setSelectedPriority("");
      setSelectedProjectId("");
    },
    onErrorCallback: (error: IApiError) => {
      toast.error(error?.message || "Failed to create ticket");
    },
  });

  const { updateTicket, isPending: isUpdating } = useUpdateTicketMutation({
    onSuccessCallback: () => {
      toast.success("Ticket updated successfully");
      onClose();
      // Reset form
      formik.resetForm();
      setImageFile(null);
      setImageUrl("");
      setUploadedImageUrl("");
      setSelectedPriority("");
      setSelectedProjectId("");
    },
    onErrorCallback: (error: IApiError) => {
      toast.error(error?.message || "Failed to update ticket");
    },
  });

  const { onUploadMultipleAttachments, isPending: isUploading } =
    useUploadMultipleAttachmentsMutation({
      onSuccessCallback: (response) => {
        if (response?.data?.length > 0) {
          setUploadedImageUrl(response.data[0]);
          toast.success("Image uploaded successfully");
        }
      },
      onErrorCallback: (error: IApiError) => {
        toast.error(error?.message || "Failed to upload image");
      },
    });

  const formik = useFormik({
    initialValues: {
      title: mode === "edit" && ticket ? ticket.title : selectedCardTitle,
      description: mode === "edit" && ticket ? ticket.description : "",
      status: mode === "edit" && ticket ? ticket.status : "open",
      priority: mode === "edit" && ticket ? ticket.priority : selectedPriority,
      project: mode === "edit" && ticket ? ticket.project_id || "" : selectedProjectId,
      task_id: mode === "edit" && ticket ? ticket.task?.id || "" : taskId || "",
      remark: mode === "edit" && ticket ? ticket.remark : "",
    },
    validationSchema,
    enableReinitialize: mode === "edit" || !!selectedCardTitle,
    onSubmit: (values) => {
      // Check if ticket title matches any task title
      const matchingTask = allTasks.find(
        (task) => task.title.toLowerCase() === values.title.toLowerCase()
      );

      // Find task with title "tickets" (auto-add for tickets task)
      const ticketsTask = allTasks.find(
        (task) => task.title.toLowerCase() === "tickets"
      );

      // Use provided taskId, or matching task ID, or tickets task ID, or existing task_id
      const finalTaskId =
        values.task_id || matchingTask?.id || ticketsTask?.id || undefined;

      if (mode === "edit" && ticket) {
        const payload = {
          title: values.title,
          description: values.description,
          status: values.status,
          priority: selectedPriority,
          project_id: values.project,
          task_id: finalTaskId,
          remark: values.remark,
          image_url:
            uploadedImageUrl || imageUrl || ticket.image_url || undefined,
        };
        updateTicket({ id: ticket.id, payload });
      } else {
        const payload = {
          title: values.title,
          description: values.description,
          status: values.status,
          priority: selectedPriority,
          project_id: values.project,
          task_id: finalTaskId,
          remark: values.remark,
          image_file: imageFile || undefined,
          image_url: uploadedImageUrl || imageUrl || undefined,
        };
        createTicket(payload);
      }
    },
  });

  const handleImageUpload = (file: File | null) => {
    setImageFile(file);
    if (file) {
      setImageUrl("");
      setUploadedImageUrl("");
      const formData = new FormData();
      formData.append("image", file);
      onUploadMultipleAttachments(formData);
    }
  };

  const handlePriorityChange = (priority: string) => {
    setSelectedPriority(priority);
    formik.setFieldValue("priority", priority);
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
    formik.setFieldValue("project", projectId);
  };

  const handleClose = () => {
    // Reset form when closing
    formik.resetForm();
    setSelectedPriority("");
    setSelectedProjectId("");
    setImageFile(null);
    setImageUrl("");
    setUploadedImageUrl("");
    onClose();
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={handleClose}
      modalTitle={mode === "edit" ? "Edit Ticket" : "Generate Ticket"}
      modalClassName="w-full md:w-[31rem] 2xl:w-[31vw] bg-white"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="h-[85vh] md:h-auto lg:h-[45vw] 2xl:h-[50vw] overflow-y-auto flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.05vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
      >
        {/* Title Field - Auto-populated with selected card title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter ticket title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title ? formik.errors.title : undefined}
        />

        {/* Project Dropdown */}
        <Dropdown
          label="Project"
          options={projectOptions}
          value={formik.values.project}
          onChange={handleProjectChange}
          error={formik.touched.project ? formik.errors.project : undefined}
        />

        {/* Description Field */}
        <InputField
          label="Description"
          name="description"
          type="textarea"
          placeholder="Enter ticket description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description ? formik.errors.description : undefined
          }
        />

        {/* Priority Radio Buttons */}
        <div className="space-y-2">
          <label className="block text-sm 2xl:text-[0.875vw] font-medium text-gray-700 mb-2">
            Priority *
          </label>
          <div className="flex flex-wrap gap-4">
            {priorityOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={selectedPriority === option.value}
                  onChange={() => handlePriorityChange(option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm 2xl:text-[0.875vw] text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          {formik.touched.priority && formik.errors.priority && (
            <p className="text-red-500 text-xs 2xl:text-[0.75vw] mt-1">
              {formik.errors.priority}
            </p>
          )}
        </div>

        {/* Upload Image Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm 2xl:text-[0.875vw] font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <UploadFileInput
              onFileUpload={handleImageUpload}
              placeholder="Choose image file"
            />
            {isUploading && (
              <p className="text-sm 2xl:text-[0.875vw] text-blue-600 mt-1 2xl:mt-[0.25vw]">
                Uploading image...
              </p>
            )}
            {uploadedImageUrl && (
              <p className="text-sm 2xl:text-[0.875vw] text-green-600 mt-1 2xl:mt-[0.25vw]">
                ✓ Image uploaded successfully
              </p>
            )}
          </div>
        </div>

        {/* Remark Field */}
        <InputField
          label="Remark"
          name="remark"
          type="textarea"
          placeholder="Enter additional remarks"
          value={formik.values.remark}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.remark ? formik.errors.remark : undefined}
        />

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            title="Cancel"
            variant="primary-outline"
            type="button"
            onClick={handleClose}
            width="w-full"
          />
          <Button
            title={
              isCreating || isUpdating
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                ? "Update Ticket"
                : "Generate Ticket"
            }
            type="submit"
            width="w-full"
            disabled={isCreating || isUpdating || isUploading}
          />
        </div>
      </form>
    </ModalOverlay>
  );
};