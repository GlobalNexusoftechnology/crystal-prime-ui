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
}

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

const statusOptions = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Resolved", value: "resolved" },
  { label: "Closed", value: "closed" },
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
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

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
      remark: mode === "edit" && ticket ? ticket.remark : "",
    },
    validationSchema,
    enableReinitialize: mode === "edit",
    onSubmit: (values) => {
      if (mode === "edit" && ticket) {
        const payload = {
          title: values.title,
          description: values.description,
          status: values.status,
          priority: values.priority,
          remark: values.remark,
          image_url: uploadedImageUrl || imageUrl || ticket.image_url || undefined,
          project_id: projectId,
        };
        updateTicket({ id: ticket.id, payload });
      } else {
        const payload = {
          ...values,
          project_id: projectId,
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
      modalClassName="w-full md:w-[31rem] 2xl:w-[31vw]"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
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
          placeholder="Enter ticket description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description ? formik.errors.description : undefined
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            label="Status"
            options={statusOptions}
            value={formik.values.status}
            onChange={(value) => formik.setFieldValue("status", value)}
            error={formik.touched.status ? formik.errors.status : undefined}
          />

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
            <label className="block text-sm 2xl:text-[0.875vw] font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <UploadFileInput
              onFileUpload={handleImageUpload}
              placeholder="Choose image file"
            />
            {isUploading && (
              <p className="text-sm text-blue-600 mt-1">Uploading image...</p>
            )}
            {uploadedImageUrl && (
              <p className="text-sm text-green-600 mt-1">
                ✓ Image uploaded successfully
              </p>
            )}
          </div>
        </div>

        <InputField
          label="Remark"
          name="remark"
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
