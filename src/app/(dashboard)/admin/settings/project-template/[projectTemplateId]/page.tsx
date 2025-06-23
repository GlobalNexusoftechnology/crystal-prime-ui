"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import { ProjectTemplateDetail } from "@/features";
import { useProjectTemplateDetailQuery } from "@/services/apis/clients/community-client/query-hooks/useProjectTemplateDetailQuery";
import {
  type IProjectTemplate,
  type IProjectTemplateMilestone,
  type IProjectTemplateTask,
} from "@/services/apis/clients/community-client/types";
import {
  type IProjectTemplateDetail,
  type Milestone,
  type Task,
} from "@/constants/project-template-detail";

/**
 * Type for the expected route parameter.
 */
type TProjectTemplateParam = {
  projectTemplateId: string;
};

const transformTask = (task: IProjectTemplateTask): Task => ({
  id: task.id,
  name: task.title,
  estimatedDays: String(task.estimated_days),
  description: task.description,
});

const transformMilestone = (
  milestone: IProjectTemplateMilestone
): Milestone => ({
  id: milestone.id,
  name: milestone.name,
  estimatedDays: String(milestone.estimated_days),
  description: milestone.description,
  tasks: milestone.project_task_master?.map(transformTask) ?? [],
});

const transformProjectTemplateData = (
  projectTemplate: IProjectTemplate
): IProjectTemplateDetail => ({
  id: projectTemplate.id,
  templateName: projectTemplate.name,
  typeOfProject: projectTemplate.project_type ?? "",
  estimatedDays: projectTemplate.estimated_days ?? 0,
  createdAt: projectTemplate.created_at,
  updatedAt: projectTemplate.updated_at,
  description: projectTemplate.description ?? "",
  milestones:
    projectTemplate.project_milestone_master?.map(transformMilestone) ?? [],
});

/**
 * Component that displays details for a specific projectTemplate.
 * Uses dynamic route parameter to fetch the corresponding data.
 */
export default function ProjectTemplateDetails() {
  const { projectTemplateId } = useParams<TProjectTemplateParam>();

  const { projectTemplateDetailData, isLoading } = useProjectTemplateDetailQuery(
    projectTemplateId
  );

  const projectTemplateData = useMemo(() => {
    if (projectTemplateDetailData) {
      return transformProjectTemplateData(projectTemplateDetailData);
    }
    return null;
  }, [projectTemplateDetailData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!projectTemplateData) {
    return <div>ProjectTemplate Data Not Found</div>;
  }

  return <ProjectTemplateDetail projectTemplateData={projectTemplateData} />;
}
