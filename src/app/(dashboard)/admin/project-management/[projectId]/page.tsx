"use client";

import { useParams } from "next/navigation";
import { ProjectDetails } from "@/features";
import { useProjectDetailQuery } from "@/services";

type TProjectParam = {
  projectId: string;
};

export default function ProjectDetailsPage() {
  const { projectId: projectSlug } = useParams<TProjectParam>();  
  const { projectDetailData, isLoading, error } = useProjectDetailQuery(projectSlug);

  if (!projectSlug) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Invalid project ID</div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Error loading project details. Please try again.</div>
        <div className="text-sm text-gray-600 mt-2">Error: {error.message}</div>
      </div>
    );
  }

  if (!projectDetailData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Project not found</div>
        <div className="text-sm text-gray-600 mt-2">Project ID: {projectSlug}</div>
      </div>
    );
  }

  return <ProjectDetails projectDetailData={projectDetailData} />;
}
