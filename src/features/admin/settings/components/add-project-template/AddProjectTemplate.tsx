"use client";

import { useFormik, FormikProvider } from "formik";
import { Dropdown, InputField, Button } from "@/components";
import { ProjectTemplateMilestone } from "../project-template-milestone";
import { ProjectTemplateFormValues } from "./types";
import { useCreateProjectTemplateMutation, useUpdateProjectTemplateMutation } from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProjectTemplateDetailQuery, useAllTypesQuery } from "@/services";
import { useQueryClient } from '@tanstack/react-query';


export function AddProjectTemplate({ id, refetchAllProjectTemplates }: { id?: string, refetchAllProjectTemplates: () => void }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { onCreateProjectTemplate } = useCreateProjectTemplateMutation({
    onSuccessCallback: (response) => {
      toast.success(response.message);
      refetchAllProjectTemplates();
      router.push("/admin/settings?tab=projectTemplate");
    },
    onErrorCallback: (err) => {
      toast.error(err.message);
    },
  });
  const { onUpdateProjectTemplate } = useUpdateProjectTemplateMutation({
    onSuccessCallback: (response) => {
      toast.success(response.message);
      refetchAllProjectTemplates();
      if (id) {
        queryClient.invalidateQueries({ queryKey: ['project-template-detail-query-key', id] });
      }
      router.push("/admin/settings?tab=projectTemplate");
    },
    onErrorCallback: (err) => {
      toast.error(err.message);
    },
  });
  const { projectTemplateDetailData, isLoading } = useProjectTemplateDetailQuery(id ?? "");

  const { allTypesData } = useAllTypesQuery();

  const projectTypeOptions =
    allTypesData?.data?.list?.map((type) => ({
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
        milestones: [{ id: "", name: "", estimated_days: "", description: "", tasks: [] }],
      };

  const formik = useFormik<ProjectTemplateFormValues>({
    enableReinitialize: true,
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const payload = {
        ...(id ? { id } : {}),
        name: values.name,
        project_type: values.project_type,
        estimated_days: values.estimated_days ? Number(values.estimated_days) : 0,
        description: values.description,
        milestones: values.milestones?.map((milestone) => ({
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
        const milestoneSum = payload.milestones.reduce((acc, m) => acc + Number(m.estimated_days || 0), 0);
        if (payload.estimated_days !== milestoneSum) {
          toast.error("Project estimated days must equal the sum of its milestones' estimated days.");
          return;
        }
        for (let i = 0; i < payload.milestones.length; i++) {
          const milestone = payload.milestones[i];
          const taskSum = (milestone.tasks || []).reduce((acc, t) => acc + Number(t.estimated_days || 0), 0);
          if (Number(milestone.estimated_days) !== taskSum) {
            toast.error(`Milestone "${milestone.name}" estimated days must equal the sum of its tasks' estimated days.`);
            return;
          }
        }
        onUpdateProjectTemplate({id, payload});
      } else {
        const milestoneSum = payload.milestones.reduce((acc, m) => acc + Number(m.estimated_days || 0), 0);
        if (payload.estimated_days !== milestoneSum) {
          toast.error("Project estimated days must equal the sum of its milestones' estimated days.");
          return;
        }
        for (let i = 0; i < payload.milestones.length; i++) {
          const milestone = payload.milestones[i];
          const taskSum = (milestone.tasks || []).reduce((acc, t) => acc + Number(t.estimated_days || 0), 0);
          if (Number(milestone.estimated_days) !== taskSum) {
            toast.error(`Milestone "${milestone.name}" estimated days must equal the sum of its tasks' estimated days.`);
            return;
          }
        }
        onCreateProjectTemplate(payload);
      }
    },
  });

  if (id && isLoading) return <div>Loading...</div>;

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 "
      >
        <div className="rounded-lg  border  border-borderGray p-4  bg-white">
          <h1 className="text-[1.1rem]  font-medium mb-4">
            Project Info
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
            <InputField
              label="Template Name"
              name="name"
              placeholder="Enter Template Name"
              value={formik.values.name}
              onChange={e => {
                // Disallow special characters
                const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
                formik.setFieldValue('name', value);
              }}
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
              onChange={e => {
                // Allow only numbers
                const value = e.target.value.replace(/[^0-9]/g, '');
                formik.setFieldValue('estimated_days', value);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.estimated_days
                  ? formik.errors.estimated_days
                  : undefined
              }
            />
          </div>

          <div className="flex flex-col gap-2  mt-4">
            <span className="text-[1rem] ">
              Template Description
            </span>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={e => {
                // Disallow special characters
                const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
                formik.setFieldValue('description', value);
              }}
              onBlur={formik.handleBlur}
              placeholder="Write something..."
              className="w-full p-4  border  border-borderGray rounded-md "
            />
            {formik.touched.description && formik.errors.description && (
              <span className="text-red-500 text-[0.9rem] ">
                {formik.errors.description}
              </span>
            )}
          </div>
          <hr className="mt-8 " />

          <ProjectTemplateMilestone formik={formik} />
          <div className="flex justify-start items-center gap-4  mt-4">
            <Button
              type="button"
              variant="primary-outline"
              title="Cancel"
              width="w-fit"
              onClick={() => router.push("/admin/settings?tab=projectTemplate")}
            />
            <Button type="submit" title={id ? "Save Changes" : "Create Template"} width="w-fit" />
          </div>
        </div>
      </form>
    </FormikProvider>
  );
}
