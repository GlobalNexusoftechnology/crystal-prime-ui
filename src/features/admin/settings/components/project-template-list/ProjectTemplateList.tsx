import { ProjectTemplateCard } from "./component";
import { Button } from "@/components";
import Link from "next/link";
import { useAllProjectTemplatesQuery } from "@/services/apis/clients/community-client/query-hooks/useAllProjectTemplatesQuery";

/**
 * ProjectTemplateList: Displays a list of project templates in card format.
 *
 * - Renders a header with a title and "Add New Project Template" button.
 * - Maps through the fetched project templates and renders each item using `ProjectTemplateCard`.
 * - Uses responsive Tailwind CSS classes with `vw` units for scalable spacing and layout.
 */
export function ProjectTemplateList() {
  const { allProjectTemplatesData, isLoading, error } = useAllProjectTemplatesQuery();
  const templates = Array.isArray(allProjectTemplatesData?.templates) ? allProjectTemplatesData.templates : [];

  return (
    <div className=" flex flex-col gap-4 2xl:gap-[1vw] bg-[#F8F8F8] rounded-lg 2xl:rounded-[0.5vw] border 2xl:border-[0.1vw] border-borderGray p-3 sm:p-4 2xl:p-[1vw]">
      <div className="flex flex-col sm:flex-row gap-4 2xl:gap-[1vw] sm:items-center">
        <p className="text-xl 2xl:text-[1.25vw] font-normal">
          Project Template List
        </p>
        <Link href="/admin/settings/project-template">
          <Button
            title="Add New Project Template"
            width="w-full md:w-fit"
            variant="primary-outline"
          />
        </Link>
      </div>
      <div className="flex flex-wrap gap-6 2xl:gap-[1.5vw]">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading project templates.</div>
        ) : (
          templates
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((template) => !!(template as any).id)
            .map((template) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const milestones = Array.isArray((template as any).project_milestone_master) ? (template as any).project_milestone_master : [];
              const milestoneCount = milestones.length;
              const taskCount = milestones.reduce(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (sum: number, milestone: any) => sum + (Array.isArray(milestone.project_task_master) ? milestone.project_task_master.length : 0),
                0
              );
              return (
                <ProjectTemplateCard
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  key={(template as any).id}
                  templateName={template.name || ""}
                  milestoneCount={milestoneCount}
                  taskCount={taskCount}
                  estimatedDays={template.estimated_days ?? 0}
                  projectType={template.project_type ?? ""}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  id={(template as any).id}
                />
              );
            })
        )}
      </div>
    </div>
  );
}
