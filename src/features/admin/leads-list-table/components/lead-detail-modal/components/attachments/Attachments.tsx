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
import {
  formatIndiaTime,
  getInitials,
  getRandomColor,
  IApiError,
} from "@/utils";
import toast from "react-hot-toast";
import Link from "next/link";
import { useQueryClient } from '@tanstack/react-query';

interface IAttachmentsProps {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  leadId: string;
}

const validationSchema = Yup.object({
  document: Yup.mixed().required("Please upload a file"),
});

export function Attachments({
  leadId,
  showForm,
  setShowForm,
}: IAttachmentsProps) {
  const queryClient = useQueryClient();
  const { allLeadAttachmentData, allLeadAttachment } =
    useAllLeadAttachmentQuery(leadId);
  const { activeSession } = useAuthStore();
  const firstName = activeSession?.user?.first_name;
  const lastName = activeSession?.user?.last_name;
  const uploaded_by = `${firstName} ${lastName}`;

  const { onCreateLeadAttachment } = useCreateLeadAttachmentMutation({
    onSuccessCallback: (response) => {
      toast.success(response.message);
      setShowForm(false);
      allLeadAttachment();
      queryClient.invalidateQueries({ queryKey: ['leads-list-query-key'] });
    },
    onErrorCallback: (error: IApiError) => {
      toast.error(error.message);
    },
  });

  const { isPending, onUploadAttachment } = useUploadAttachmentMutation({
    onSuccessCallback: async (response) => {
      toast.success(response.message);
      setShowForm(false);
      await onCreateLeadAttachment({
        lead_id: leadId,
        uploaded_by: uploaded_by,
        file_path: response.data.docUrl,
        file_type: response.data.fileType,
        file_name: response.data.fileName,
      });
      allLeadAttachment();
      queryClient.invalidateQueries({ queryKey: ['leads-list-query-key'] });
    },
    onErrorCallback: (error: IApiError) => {
      toast.error(error.message);
      formik.resetForm()
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
          resetForm();
        }
      } else {
        console.warn("No valid file found to upload");
        resetForm();
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 ">
      {showForm ? (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6  bg-customGray border  p-3  rounded-md "
        >
          <UploadDocument
            label="Upload Document"
            placeholder="Upload Document"
            onChange={(files: FileList | null) => {
              if (files && files[0]) {
                formik.setFieldValue("document", files[0]);
              }
            }}
            error={formik?.touched?.document ? formik?.errors?.document : undefined}
          />

          <div className="flex justify-end gap-4  ">
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
            className="flex gap-6  text-darkBlue bg-customGray border  p-3  rounded-md  flex-col md:flex-row justify-between "
          >
            <div className="w-[70%] flex flex-col gap-4  ">
              <div className="text-primary flex items-center underline scrollbar-hidden overflow-x-auto">
                <Link className="text-[1rem] " href={attachment.file_path}>{attachment?.file_name}</Link>
              </div>
              <div className="text-lightGreen flex flex-col md:flex-row gap-2  underline">
                <p className="text-[1rem] ">Created At:</p>
                <p className="text-[1rem] ">{formatIndiaTime(attachment?.created_at, "toReadable")}</p>
              </div>
            </div>
            <div>
              <p className="text-[0.9rem] ">Assigned To</p>
              <div className="flex gap-2  items-center">
                <p
                  className="flex items-center justify-center p-2  w-8 h-8   text-white text-[0.9rem]   rounded-full"
                  style={{
                    backgroundColor: getRandomColor(
                      `${attachment?.uploaded_by?.first_name}`
                    ),
                  }}
                >
                  {getInitials(attachment?.uploaded_by?.first_name)}
                  {getInitials(attachment?.uploaded_by?.last_name)}
                </p>
                <p className="underline font-medium text-textColor text-[1rem]  capitalize">
                  {attachment?.uploaded_by?.first_name} {attachment?.uploaded_by?.last_name}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
