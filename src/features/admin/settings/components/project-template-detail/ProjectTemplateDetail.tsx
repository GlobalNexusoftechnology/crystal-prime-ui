"use client"
import type { IProjectTemplateDetail } from "@/constants/project-template-detail";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { ProjectTemplateMilestone } from "../project-template-milestone";
import { Breadcrumb } from "@/features/admin/breadcrumb";
import { useRouter } from "next/navigation";
import { ActionDropdown } from "@/components/action-dropdown/ActionDropdown";
import { buildUniversalIdToNameMapping, formatIndiaTime } from "@/utils";
import { useAllProjectTemplatesQuery, useDeleteProjectTemplateMutation } from "@/services";
import toast from "react-hot-toast";
import { useAllTypesQuery } from "@/services";

type IProjectTemplateDetailProps = {
  projectTemplateData: IProjectTemplateDetail;
  refetchProjectTemplateDetail?: () => void;
};

const validationSchema = Yup.object({
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

/**
 * ProjectTemplateDetail Component
 *
 * Displays detailed information about a selected project template.
 * It includes:
 * - Template name
 * - Type of project
 * - Estimated completion days
 * - Creation and update timestamps
 * - Project description
 *
 * @param {IProjectTemplateDetail} projectTemplateData - The data object for the selected template.
 * @returns A styled section showing all project template details.
 */
export function ProjectTemplateDetail({
  projectTemplateData,
  refetchProjectTemplateDetail,
}: IProjectTemplateDetailProps) {
  const router = useRouter();
  
  const { allTypesData } = useAllTypesQuery();
  const { refetchAllProjectTemplates } = useAllProjectTemplatesQuery();

  const projectTypeName = allTypesData?.data?.list?.find(type => type.id?.toString() === projectTemplateData.project_type)?.name || projectTemplateData.project_type;

  const { onDeleteProjectTemplate } = useDeleteProjectTemplateMutation({
    onSuccessCallback: (response) => {
      toast.success(response.message || "Project template deleted successfully");
      if (refetchProjectTemplateDetail) refetchProjectTemplateDetail();
      router.push("/admin/settings/project-template");
      refetchAllProjectTemplates();
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to delete project template");
    },
  });

  const handleEdit = () => {
    // Navigate to edit page
    router.push(`/admin/settings/project-template/edit/${projectTemplateData.id}`);
  };

  const handleDelete = () => {
      onDeleteProjectTemplate(projectTemplateData.id);
  };

  const formik = useFormik({
    initialValues: {
      milestones: projectTemplateData.milestones || [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Milestones submitted:", values);
    }
  });
  const idToName = buildUniversalIdToNameMapping(projectTemplateData);


  return (
    <div className="flex flex-col gap-4 2xl:gap-[1vw] justify-between bg-white rounded-lg 2xl:rounded-[0.5vw] border 2xl:border-[0.05vw] border-borderGray p-4 2xl:p-[1vw]">
      <div className="flex items-start justify-between">
        <div>
        <Breadcrumb idToName={idToName} />
        </div>
        <ActionDropdown
        direction="bottom"
          options={[
            {
              label: "Edit",
              onClick: handleEdit,
            },
            {
              label: "Delete",
              onClick: handleDelete,
              className: "text-red-600",
            },
          ]}
        />
      </div>
      <h2 className="text-[1.5rem] 2xl:font-[1.5vw] font-medium">
        {projectTemplateData.name}
      </h2>

      <p className="text-[1.1rem] 2xl:text-[1.1vw] font-medium">Project Info</p>

      <div className="flex flex-wrap lg:grid lg:grid-cols-5 gap-8 2xl:gap-[2vw]">
        <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
          <p className=" text-[0.9rem] 2xl:text-[0.875vw] ">Template Name</p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium underline underline-offset-2 2xl:underline-offset-4 leading-[1.6]">
            {projectTemplateData.name}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
          <p className=" text-[0.9rem] 2xl:text-[0.875vw]">Type Of Project</p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium">
            {projectTypeName}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
          <p className=" text-[0.9rem] 2xl:text-[0.875vw]">Estimated Days</p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium">
            {projectTemplateData.estimated_days}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
          <p className=" text-[0.9rem] 2xl:text-[0.875vw]">Created At</p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium">
            {formatIndiaTime(projectTemplateData.created_at, "toReadable")}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
          <p className=" text-[0.9rem] 2xl:text-[0.875vw]">Updated At</p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium">
            {formatIndiaTime(projectTemplateData.updated_at, "toReadable")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 2xl:gap-[0.5vw]">
        <p className=" text-[0.9rem] 2xl:text-[0.875vw]">Project Description</p>
        <p className="text-[1rem] 2xl:text-[1vw] font-medium">
          {projectTemplateData.description}
        </p>
      </div>
      <hr className="mt-4 2xl:mt-[1vw]"/>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <ProjectTemplateMilestone formik={formik} readOnly={true} />
        </form>
      </FormikProvider>
    </div>
  );
}
