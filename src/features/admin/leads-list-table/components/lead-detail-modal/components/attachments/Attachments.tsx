"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, InputField, UploadDocument } from "@/components";

const validationSchema = Yup.object().shape({
  attachments: Yup.mixed().test(
    "required",
    "Please upload at least one file",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) => {
      return value && value.length > 0;
    }
  ),
  remark: Yup.string().required("Remark is required"),
});

interface IAttachmentsProps {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
}

export function Attachments({ showForm, setShowForm }: IAttachmentsProps) {
  const formik = useFormik({
    initialValues: {
      attachments: [] as File[],
      remark: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Files Uploaded:", values.attachments);
      console.log("Remark:", values.remark);
      resetForm();
      setShowForm(false);
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      formik.setFieldValue("attachments", Array.from(files));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {showForm ? (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 rounded-md space-y-1 mb-3"
        >
          <UploadDocument
            label="Upload Document"
            placeholder="Upload Document"
            onChange={handleFileChange}
           
          />

          <InputField
            label="Remark"
            name="remark"
            value={formik.values.remark}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.remark && formik.errors.remark}
          />

          <div className="flex justify-end gap-4 2xl:gap-[1vw]">
            <Button
              title="Cancel"
              onClick={() => {
                setShowForm(false);
              }}
              variant="primary-outline"
              width="w-full"
            />
            <Button type="submit" title="Add Document" width="w-full" />
          </div>
        </form>
      ) : (
        [1, 2].map((item) => (
          <div
            key={item}
            className="flex flex-col gap-6 2xl:gap-[2vw] bg-customGray border 2xl:border-[0.1vw] p-3 rounded-md space-y-1 mb-3"
          >
            <div className="flex flex-col gap-4 2xl:gap-[1vw]">
              <div className="text-primary flex items-center underline">
                <p>https://aisha.name</p>
              </div>
              <div className="text-lightGreen flex items-center gap-2 2xl:gap-[0.5vw] underline">
                <p>Created At:</p>
                <p>26 May 2025, 4:00 PM</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
