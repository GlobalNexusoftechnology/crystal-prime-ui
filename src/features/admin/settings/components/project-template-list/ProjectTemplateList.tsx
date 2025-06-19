import { ProjectTemplateCard } from "./component";
import { projectTemplates } from "@/constants";
import { Button } from "@/components";

/**
 * ProjectTemplateList: Displays a list of project templates in card format.
 *
 * - Renders a header with a title and "Add New Project Template" button.
 * - Maps through the `projectTemplates` array and renders each item using `ProjectTemplateCard`.
 * - Uses responsive Tailwind CSS classes with `vw` units for scalable spacing and layout.
 */
export function ProjectTemplateList() {
  return (
    <div className=" flex flex-col gap-4 2xl:gap-[1vw] bg-[#F8F8F8] rounded-lg 2xl:rounded-[0.5vw] border 2xl:border-[0.1vw] border-lightWhite p-3 sm:p-4 2xl:p-[1vw]">
      <div className="flex flex-col sm:flex-row gap-4 2xl:gap-[1vw] sm:items-center">
        <p className="text-xl 2xl:text-[1.25vw] font-normal">
          Project Template List
        </p>
        <Button
          title="Add New Project Template"
          width="w-full md:w-fit"
          variant="primary-outline"
        />
      </div>
      <div className="flex flex-wrap gap-6 2xl:gap-[1.5vw]">
        {projectTemplates.map((template) => (
          <ProjectTemplateCard
            key={template.id}
            templateName={template.templateName}
            milestoneCount={template.milestoneCount}
            taskCount={template.taskCount}
            estimatedDays={template.estimatedDays}
            projectType={template.projectType}
          />
        ))}
      </div>
    </div>
  );
}
