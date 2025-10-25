"use client";

import { Button, UploadDocument } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUploadEILogFromExcelMutation } from "@/services";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface ImportExcelProps {
  setAddEILogModalOpen: (value: boolean) => void;
}

export function ImportExcel({ setAddEILogModalOpen }: ImportExcelProps) {
  const queryClient = useQueryClient();
  const { onUploadEILogFromExcel, isPending } = useUploadEILogFromExcelMutation({
    onSuccessCallback: (response) => {
      toast.success(response?.message);
      queryClient.invalidateQueries({
        predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === 'all-ei-logs-query-key'
      });
      setAddEILogModalOpen(false);
    },
    onErrorCallback: (error: IApiError) => {
      toast.error(error?.message);
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      file: null as File | null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required("File is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (values?.file) {
        const formData = new FormData();
        formData.append("file", values?.file);
        try {
          await onUploadEILogFromExcel(formData);
          resetForm();
        } catch (err) {
          console.error("Upload error:", err);
        }
      }
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl  p-8  text-center bg-gray-50">
        <UploadDocument
          label="Upload Excel File"
          onChange={(files: FileList | null) => {
            if (files && files[0]) {
              formik.setFieldValue("file", files[0]);
              formik.submitForm();
            }
          }}
          error={
            formik?.touched?.file ? formik?.errors?.file : undefined
          }
          accept=".xlsx,.xls"
        />
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: .xlsx, .xls (max 5MB)
        </p>
        {isPending && (
          <p className="text-sm text-blue-500 mt-2">Uploading...</p>
        )}
      </div>
      
      <div className="flex justify-end gap-4">
        <Button
          title="Cancel"
          variant="primary-outline"
          onClick={() => setAddEILogModalOpen(false)}
        />
      </div>
    </div>
  );
} 