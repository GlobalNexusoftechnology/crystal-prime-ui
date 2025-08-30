"use client";

import { useState } from "react";
import {
  ModalOverlay,
  Button,
  InputField,
  Dropdown,
  UploadFileInput,
} from "@/components";
import {
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useUploadMultipleAttachmentsMutation,
  useProjectDetailQuery,
} from "@/services";
import { IApiError } from "@/utils";
import { ITicketData } from "@/services/apis/clients/community-client/types";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

interface GenerateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName?: string;
  mode?: "create" | "edit";
  ticket?: ITicketData | null;
  taskId?: string; // Auto-select this task when creating ticket
}

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
  remark: Yup.string().required("Remark is required"),
});

export const GenerateTicketModal: React.FC<GenerateTicketModalProps> = ({
  isOpen,
  onClose,
  projectId,
  mode = "create",
  ticket,
  taskId,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  // Fetch project details to get tasks
  const { projectDetailData } = useProjectDetailQuery(projectId);

  // Extract all tasks from all milestones
  const allTasks = projectDetailData?.milestones?.flatMap(milestone => 
    milestone.tasks?.map(task => ({
      ...task,
      milestoneName: milestone.name
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
      title: mode === "edit" && ticket ? ticket.title : "",
      description: mode === "edit" && ticket ? ticket.description : "",
      status: mode === "edit" && ticket ? ticket.status : "open",
      priority: mode === "edit" && ticket ? ticket.priority : "",
      task_id: mode === "edit" && ticket ? ticket.task?.id || "" : taskId || "",
      remark: mode === "edit" && ticket ? ticket.remark : "",
    },
    validationSchema,
    enableReinitialize: mode === "edit",
    onSubmit: (values) => {
      // Check if ticket title matches any task title
      const matchingTask = allTasks.find(task => 
        task.title.toLowerCase() === values.title.toLowerCase()
      );
      
      // Find task with title "tickets" (auto-add for tickets task)
      const ticketsTask = allTasks.find(task => 
        task.title.toLowerCase() === "tickets"
      );
      
      // Use provided taskId, or matching task ID, or tickets task ID, or existing task_id
      const finalTaskId = values.task_id || matchingTask?.id || ticketsTask?.id || undefined;

      if (mode === "edit" && ticket) {
        const payload = {
          title: values.title,
          description: values.description,
          status: values.status,
          priority: values.priority,
          task_id: finalTaskId,
          remark: values.remark,
          image_url: uploadedImageUrl || imageUrl || ticket.image_url || undefined,
          project_id: projectId,
        };
        updateTicket({ id: ticket.id, payload });
      } else {
        const payload = {
          ...values,
          project_id: projectId,
          task_id: finalTaskId,
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
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        onUploadMultipleAttachments(formData);
      }
    }
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={mode === "edit" ? "Edit Ticket" : "Generate Ticket"}
      modalClassName="w-full md:w-[31rem] 2xl:w-[31vw] bg-white"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="h-[85vh] md:h-auto lg:h-[45vw] 2xl:h-[50vw] overflow-y-auto flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
      >
        <InputField
          label="Title"
          name="title"
          placeholder="Enter ticket title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title ? formik.errors.title : undefined}
        />

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

        <div className="grid grid-cols-1 gap-4 2xl:gap-[1vw]">
          <Dropdown
            label="Priority"
            options={priorityOptions}
            value={formik.values.priority}
            onChange={(value) => formik.setFieldValue("priority", value)}
            error={formik.touched.priority ? formik.errors.priority : undefined}
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-[1vw] 2xl:text-[1vw] text-gray-700 mb-2 2xl:mb-[0.5vw]">
              Upload Image
            </label>
            <UploadFileInput
              onFileUpload={handleImageUpload}
              placeholder="Choose image file"
            />
            {isUploading && (
              <p className="text-sm 2xl:text-[0.875vw] text-blue-600 mt-1 2xl:mt-[0.25vw]">Uploading image...</p>
            )}
            {uploadedImageUrl && (
              <p className="text-sm 2xl:text-[0.875vw] text-green-600 mt-1 2xl:mt-[0.25vw]">
                ✓ Image uploaded successfully
              </p>
            )}
          </div>
        </div>

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

        <div className="flex gap-4">
          <Button
            title="Cancel"
            variant="primary-outline"
            type="button"
            onClick={onClose}
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
