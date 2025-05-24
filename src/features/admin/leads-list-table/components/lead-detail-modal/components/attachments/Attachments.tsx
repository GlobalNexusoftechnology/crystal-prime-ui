"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, UploadDocument } from "@/components";
import {
  useAllLeadAttachmentQuery,
  useAuthStore,
  useCreateLeadAttachmentMutation,
  useUploadAttachmentMutation,
} from "@/services";
import { formattingDate, IApiError } from "@/utils";
import toast from "react-hot-toast";

interface IAttachmentsProps {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  leadId: string
}

const validationSchema = Yup.object({
  document: Yup.mixed()
    .required("Please upload a file")
});

export function Attachments({ leadId, showForm, setShowForm }: IAttachmentsProps) {
  const { allLeadAttachmentData, allLeadAttachment } =
    useAllLeadAttachmentQuery();
  const { activeSession } = useAuthStore()
  const firstName = activeSession?.user?.first_name;
  const lastName = activeSession?.user?.last_name;
  const uploaded_by = `${firstName} ${lastName}`

  const { onCreateLeadAttachment } = useCreateLeadAttachmentMutation(
    {
      onSuccessCallback: (response) => {
        toast.success(response.message);
        setShowForm(false);
        allLeadAttachment();
      },
      onErrorCallback: (error: IApiError) => {
        toast.error(error.message);
      },
    }
  );

  const { isPending,  onUploadAttachment } = useUploadAttachmentMutation({
    onSuccessCallback: (response) => {
      toast.success(response.message);
      setShowForm(false);
      onCreateLeadAttachment({
        lead_id: leadId,
        uploaded_by: uploaded_by,
        file_path: response.data.docUrl,
        file_type: response.data.fileType,
      });
      allLeadAttachment();
    },
    onErrorCallback: (error: IApiError) => {
      toast.error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: { document: null },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.document) {
        const formData = new FormData();
        formData.append("document", values.document);

        try {
          await onUploadAttachment(formData);
          resetForm();
        } catch (err) {
          console.error("Upload error:", err);
        }
      } else {
        console.warn("No valid file found to upload");
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {showForm ? (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 rounded-md"
        >
          <UploadDocument
            label="Upload Document"
            placeholder="Upload Document"
            onChange={(files: FileList | null) => {
              if (files && files[0]) {
                formik.setFieldValue("document", files[0]);
              }
            }}
            error={formik.touched.document ? formik.errors.document : undefined}
          />

          <div className="flex justify-end gap-4 2xl:gap-[1vw]">
            <Button
              title="Cancel"
              onClick={() => setShowForm(false)}
              variant="primary-outline"
              width="w-full"
            />
            <Button
              type="submit"
              title="Add Document"
              width="w-full"
              disabled={isPending}
            />
          </div>
        </form>
      ) : (
        allLeadAttachmentData?.map((attachment, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-6 2xl:gap-[2vw] bg-customGray border 2xl:border-[0.1vw] p-3 rounded-md"
          >
            <div className="flex flex-col gap-4 2xl:gap-[1vw]">
              <div className="text-primary flex items-center underline scrollbar-hidden overflow-x-auto">
                <p>{attachment.file_path}</p>
              </div>
              <div className="text-lightGreen flex items-center gap-2 2xl:gap-[0.5vw] underline">
                <p>Created At:</p>
                <p>{formattingDate(attachment.created_at, "toReadable")}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
