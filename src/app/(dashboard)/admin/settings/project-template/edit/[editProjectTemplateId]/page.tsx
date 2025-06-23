"use client";

import { AddProjectTemplate } from "@/features";
import { useParams } from "next/navigation";

import { useProjectTemplateDetailQuery } from "@/services/apis/clients/community-client/query-hooks/useProjectTemplateDetailQuery";

/**
 * Type for the expected route parameter.
 */
type TProjectTemplateParam = {
  editProjectTemplateId: string;
};

/**
 * Component that displays details for a specific projectTemplate.
 * Uses dynamic route parameter to fetch the corresponding data.
 */
export default function ProjectTemplateDetails() {
  const { editProjectTemplateId } = useParams<TProjectTemplateParam>();

  const { projectTemplateDetailData, isLoading } = useProjectTemplateDetailQuery(
    editProjectTemplateId
  );


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!projectTemplateDetailData) {
    return <div>ProjectTemplate Data Not Found</div>;
  }

  return <AddProjectTemplate id={projectTemplateDetailData.id} />;
}
