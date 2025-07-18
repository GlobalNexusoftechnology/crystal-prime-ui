"use client"
import { AddProjectTemplate } from "@/features";
import { useAllProjectTemplatesQuery } from "@/services";

export default function ProjectTemplatePage() {
  const { refetchAllProjectTemplates } = useAllProjectTemplatesQuery();
  return (
    <AddProjectTemplate refetchAllProjectTemplates={refetchAllProjectTemplates} />
  );
}
