"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Dropdown, InputField } from "@/components";

/** 
 * @file Client-side component for adding a new project template with Formik and Yup validation.
 * 
 */
const options = [
  { label: "Website", value: "website" },
  { label: "Application", value: "application" },
];

// Validation schema using Yup
const validationSchema = Yup.object({
  templateName: Yup.string().required("Template Name is required"),
  projectType: Yup.string().required("Type of Project is required"),
  estimatedDays: Yup.number()
    .typeError("Must be a number")
    .required("Estimated Days is required"),
  description: Yup.string().required("Description is required"),
});

export function AddProjectTemplate() {
  const formik = useFormik({
    initialValues: {
      templateName: "",
      projectType: "",
      estimatedDays: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 2xl:gap-[1vw] rounded-lg 2xl:rounded-[0.5vw] border 2xl:border-[0.1vw] border-borderGray p-4 2xl:p-[1vw] bg-white"
    >
      <h1 className="text-[1.1rem] 2xl:text-[1.1vw] font-medium">Project Info</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 2xl:gap-[1vw]">
        <InputField
          label="Template Name"
          name="templateName"
          placeholder="Enter Template Name"
          value={formik.values.templateName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.templateName ? formik.errors.templateName : undefined
          }
        />

        <Dropdown
          label="Type of Project"
          options={options}
          value={formik.values.projectType}
          onChange={(val: string) => formik.setFieldValue("projectType", val)}
          error={
            formik.touched.projectType ? formik.errors.projectType : undefined
          }
        />

        <InputField
          label="Estimated Days"
          name="estimatedDays"
          placeholder="Enter Estimated Days"
          value={formik.values.estimatedDays}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.estimatedDays
              ? formik.errors.estimatedDays
              : undefined
          }
        />
      </div>

      <div className="flex flex-col gap-2 2xl:gap-[0.5vw]">
        <span className="text-[1rem] 2xl:text-[1vw]">Template Description</span>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Write something..."
          className="w-full p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] border-borderGray rounded-md 2xl:rounded-[0.375vw]"
        />
        {formik.touched.description && formik.errors.description && (
          <span className="text-red-500 text-sm 2xl:text-[0.875vw]">
            {formik.errors.description}
          </span>
        )}
      </div>
    </form>
  );
}
