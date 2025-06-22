"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { ProjectTemplateDetail } from "@/features";
import type { IProjectTemplateDetail } from "@/constants/project-template-detail";
import { projectTemplateDetails } from "@/constants/project-template-detail";

/**
 * Fetches the projectTemplate data based on the provided projectTemplate ID.
 *
 * @param projectTemplateId - The ID of the projectTemplate to retrieve.
 * @returns The matched projectTemplate data or null if not found.
 */
function fetchProjectTemplateData(projectTemplateId: string): IProjectTemplateDetail | null {
  return (
    projectTemplateDetails.find((projectTemplates) => projectTemplates?.id === projectTemplateId) || null
  );
}

/**
 * Type for the expected route parameter.
 */
type TProjectTemplateParam = {
  projectTemplateId: string;
};

/**
 * Component that displays details for a specific projectTemplate.
 * Uses dynamic route parameter to fetch the corresponding data.
 */
export default function ProjectTemplateDetails() {
  const { projectTemplateId } = useParams<TProjectTemplateParam>();
  const [projectTemplateData, setProjectTemplateData] = useState<IProjectTemplateDetail | null>(null);

  useEffect(() => {
    if (projectTemplateId) {
      const data = fetchProjectTemplateData(projectTemplateId);
      console.log(data);
      setProjectTemplateData(data);
    }
  }, [projectTemplateId]);

  if (!projectTemplateData) {
    return <div>ProjectTemplate Data Not Found</div>;
  }

  return <ProjectTemplateDetail projectTemplateData={projectTemplateData} />
}
