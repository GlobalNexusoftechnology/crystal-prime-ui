"use client";

import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Dropdown, InputField, Button } from "@/components";
import { ProjectTemplateMilestone } from "../project-template-milestone";
import { ProjectTemplateFormValues } from "./types";
import { useCreateProjectTemplateMutation, useUpdateProjectTemplateMutation } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProjectTemplateDetailQuery, useAllTypesQuery } from "@/services";


// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Template Name is required"),
  project_type: Yup.string().required("Type of Project is required"),
  estimated_days: Yup.number()
    .typeError("Must be a number")
    .required("Estimated Days is required"),
  description: Yup.string().required("Description is required"),
  milestones: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Milestone name is required"),
      estimated_days: Yup.string().required("Estimated days is required"),
      description: Yup.string().required("Description is required"),
      tasks: Yup.array().of(
        Yup.object().shape({
          title: Yup.string().required("Task name is required"),
          estimated_days: Yup.string().required("Estimated days is required"),
          description: Yup.string().required("Description is required"),
        })
      ),
    })
  ),
});

export function AddProjectTemplate({ id }: { id?: string }) {
  const router = useRouter();
  const { onCreateProjectTemplate } = useCreateProjectTemplateMutation({
    onSuccessCallback: (response) => {
      toast.success(response.message);
      router.push("/admin/settings");
    },
    onErrorCallback: (err) => {
      toast.error(err.message);
    },
  });
  const { onUpdateProjectTemplate } = useUpdateProjectTemplateMutation({
    onSuccessCallback: (response) => {
      toast.success(response.message);
      router.push("/admin/settings");
    },
    onErrorCallback: (err) => {
      toast.error(err.message);
    },
  });
  const { projectTemplateDetailData, isLoading } = useProjectTemplateDetailQuery(id ?? "");

  const { allTypesData } = useAllTypesQuery();

  const projectTypeOptions =
    allTypesData?.map((type) => ({
      label: type?.name,
      value: type?.id.toString(),
    })) || [];

  const initialValues: ProjectTemplateFormValues = id && projectTemplateDetailData
    ? {
        name: projectTemplateDetailData.name || "",
        project_type: projectTemplateDetailData.project_type || "",
        estimated_days: projectTemplateDetailData.estimated_days?.toString() || "",
        description: projectTemplateDetailData.description || "",
        milestones: (projectTemplateDetailData.project_milestone_master || []).map(m => ({
          id: m.id,
          name: m.name,
          estimated_days: m.estimated_days?.toString() || "",
          description: m.description,
          tasks: (m.project_task_master || []).map(t => ({
            id: t.id,
            title: t.title,
            estimated_days: t.estimated_days?.toString() || "",
            description: t.description,
          })),
        })),
      }
    : {
        name: "",
        project_type: "",
        estimated_days: "",
        description: "",
        milestones: [],
      };

  const formik = useFormik<ProjectTemplateFormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...(id ? { id } : {}),
        name: values.name,
        project_type: values.project_type,
        estimated_days: values.estimated_days ? Number(values.estimated_days) : 0,
        description: values.description,
        milestones: values.milestones.map((milestone) => ({
          ...(milestone.id ? { id: milestone.id } : {}),
          name: milestone.name,
          description: milestone.description,
          estimated_days: milestone.estimated_days ? Number(milestone.estimated_days) : 0,
          tasks: milestone.tasks?.map((task) => ({
            ...(task.id ? { id: task.id } : {}),
            title: task.title,
            description: task.description,
            estimated_days: task.estimated_days ? Number(task.estimated_days) : 0,
          })),
        })),
      };
      if (id) {
        onUpdateProjectTemplate({id, payload});
      } else {
        onCreateProjectTemplate(payload);
      }
    },
  });

  if (id && isLoading) return <div>Loading...</div>;

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
              name="name"
              placeholder="Enter Template Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.name
                  ? formik.errors.name
                  : undefined
              }
            />

            <Dropdown
              label="Type of Project"
              options={projectTypeOptions}
              value={formik.values.project_type}
              onChange={(val: string) =>
                formik.setFieldValue("project_type", val)
              }
              error={
                formik.touched.project_type
                  ? formik.errors.project_type
                  : undefined
              }
            />

            <InputField
              label="Estimated Days"
              name="estimated_days"
              placeholder="Enter Estimated Days"
              value={formik.values.estimated_days}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.estimated_days
                  ? formik.errors.estimated_days
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
            <Button type="submit" title={id ? "Save Changes" : "Create Template"} width="w-fit" />
          </div>
        </div>
      </form>
    </FormikProvider>
  );
}
