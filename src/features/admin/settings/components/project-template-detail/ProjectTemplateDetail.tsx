import { IProjectTemplateDetail } from "@/constants";

type IProjectTemplateDetailProps = {
  projectTemplateData: IProjectTemplateDetail;
};

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
}: IProjectTemplateDetailProps) {
  return (
    <div className="flex flex-col gap-4 2xl:gap-[1vw] justify-between bg-white rounded-lg 2xl:rounded-[0.5vw] border 2xl:border-[0.1vw] border-borderGray p-4 2xl:p-[1vw]">
      <h2 className="text-[1.5rem] 2xl:font-[1.5vw] font-medium">
        {projectTemplateData.templateName}
      </h2>

      <p className="text-[1.1rem] 2xl:text-[1.1vw] font-medium">Project Info</p>

      <div className="flex flex-wrap lg:grid lg:grid-cols-5 gap-8 2xl:gap-[2vw]">
        <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
          <p className=" text-sm 2xl:text-[0.875vw] ">Template Name</p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium underline underline-offset-2 2xl:underline-offset-4 leading-[1.6]">
            {projectTemplateData.templateName}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
          <p className=" text-sm 2xl:text-[0.875vw]">Type Of Project</p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium">
            {projectTemplateData.typeOfProject}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
          <p className=" text-sm 2xl:text-[0.875vw]">Estimated Days</p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium">
            {projectTemplateData.estimatedDays}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
          <p className=" text-sm 2xl:text-[0.875vw]">Created At</p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium">
            {projectTemplateData.createdAt}
          </p>
        </div>
        <div className="flex flex-col gap-1 2xl:gap-[0.5vw]">
          <p className=" text-sm 2xl:text-[0.875vw]">Updated At</p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium">
            {projectTemplateData.updatedAt}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 2xl:gap-[0.5vw]">
        <p className=" text-sm 2xl:text-[0.875vw]">Project Description</p>
        <p className="text-[1rem] 2xl:text-[1vw] font-medium">
          {projectTemplateData.description}
        </p>
      </div>
    </div>
  );
}
