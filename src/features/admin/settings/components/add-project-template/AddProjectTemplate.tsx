"use client";

import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Dropdown, InputField, Button } from "@/components";
import { ProjectTemplateMilestone } from "../project-template-milestone";
import { ProjectTemplateFormValues } from "./types";
import { useCreateProjectTemplateMutation } from "@/services/apis/clients/community-client/query-hooks/useCreateProjectTemplateMutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  milestones: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Milestone name is required"),
      estimatedDays: Yup.string().required("Estimated days is required"),
      description: Yup.string().required("Description is required"),
      tasks: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Task name is required"),
          estimatedDays: Yup.string().required("Estimated days is required"),
          description: Yup.string().required("Description is required"),
        })
      ),
    })
  ),
});

export function AddProjectTemplate() {
  const router = useRouter()
  const {
    onCreateProjectTemplate
  } = useCreateProjectTemplateMutation({
    onSuccessCallback: (response) => {
      toast.success(response.message)
      router.push("/admin/settings")
    },
    onErrorCallback: (err) => {
      toast.success(err.message)

    },
  });

  const formik = useFormik<ProjectTemplateFormValues>({
    initialValues: {
      templateName: "",
      projectType: "",
      estimatedDays: "",
      description: "",
      milestones: [],
    },
    validationSchema,
    onSubmit: (values) => {
      // Map form values to API payload (including milestones and tasks)
      const payload = {
        name: values.templateName,
        project_type: values.projectType,
        estimated_days: Number(values.estimatedDays),
        description: values.description,
        milestones: values.milestones.map((milestone) => ({
          name: milestone.name,
          description: milestone.description,
          estimated_days: Number(milestone.estimatedDays),
          tasks: milestone.tasks?.map((task) => ({
            title: task.name,
            description: task.description,
            estimated_days: Number(task.estimatedDays),
          })),
        })),
      };
      onCreateProjectTemplate(payload);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 2xl:gap-[1vw]"
      >
        <div className="rounded-lg 2xl:rounded-[0.5vw] border 2xl:border-[0.1vw] border-borderGray p-4 2xl:p-[1vw] bg-white">
          <h1 className="text-[1.1rem] 2xl:text-[1.1vw] font-medium mb-4">
            Project Info
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 2xl:gap-[1vw]">
            <InputField
              label="Template Name"
              name="templateName"
              placeholder="Enter Template Name"
              value={formik.values.templateName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.templateName
                  ? formik.errors.templateName
                  : undefined
              }
            />

            <Dropdown
              label="Type of Project"
              options={options}
              value={formik.values.projectType}
              onChange={(val: string) =>
                formik.setFieldValue("projectType", val)
              }
              error={
                formik.touched.projectType
                  ? formik.errors.projectType
                  : undefined
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

          <div className="flex flex-col gap-2 2xl:gap-[0.5vw] mt-4">
            <span className="text-[1rem] 2xl:text-[1vw]">
              Template Description
            </span>
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
          <hr className="mt-8 2xl:mt-[2vw]" />

          <ProjectTemplateMilestone formik={formik} />
          <div className="flex justify-start items-center gap-4 2xl:gap-[1vw] mt-4">
            <Button variant="primary-outline" title="Cancel" width="w-fit" />

            <Button type="submit" title="Save Changes" width="w-fit" />

          </div>
        </div>
      </form>
    </FormikProvider>
  );
}
