"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { projectData, IProjectData } from "@/constants";
import { ProjectDetails } from "@/features";

function fetchProjectData(projectSlug: string): IProjectData | null {
  return projectData.find((project) => project.slug === projectSlug) || null;
}

type TBlogProjectParam = {
  projectId: string;
};

export default function ProjectDetailsPage() {
  const { projectId: projectSlug } = useParams<TBlogProjectParam>();
  const [projectData, setProjectData] = useState<IProjectData | null>(null);

  useEffect(() => {
    if (projectSlug) {
      const data = fetchProjectData(projectSlug);
      console.log({ data });
      setProjectData(data);
    }
  }, [projectSlug]);

  if (!projectData) {
    return <div>Page Data Found</div>;
  }

  return <ProjectDetails />;
}
