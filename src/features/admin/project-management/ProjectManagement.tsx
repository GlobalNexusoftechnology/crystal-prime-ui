"use client";

import { Button, SearchBar } from "@/components";
import { ProjectStageSection } from "./components";
import { Breadcrumb } from "../breadcrumb";
import { useAllProjectsQuery } from "@/services";
import { useRouter } from "next/navigation";

const stageLabels = {
  open: "Open Projects",
  inProgress: "In Progress Projects",
  completed: "Completed Projects",
};

const bgColors = {
  open: "bg-aqua",
  inProgress: "bg-skyBlue",
  completed: "bg-darkGreen",
};

// Helper function to map API project status to stage
const mapProjectStatusToStage = (status?: string): "open" | "inProgress" | "completed" => {
  if (!status) return "open";
  
  const statusLower = status.toLowerCase();
  
  if (statusLower.includes("open") || statusLower.includes("new") || statusLower.includes("initiated")) {
    return "open";
  } else if (statusLower.includes("progress") || statusLower.includes("ongoing") || statusLower.includes("active")) {
    return "inProgress";
  } else if (statusLower.includes("completed") || statusLower.includes("finished") || statusLower.includes("done")) {
    return "completed";
  }
  
  // Default to open if status doesn't match known patterns
  return "open";
};

export function ProjectManagement() {
  const { allProjectsData, isLoading, error } = useAllProjectsQuery();
  const router = useRouter();

  const handleRedirectToAddProject = () => {
    router.push("/admin/project-management/add-project")
  }

  const getProjectsByStage = (stage: "open" | "inProgress" | "completed") => {
    if (!allProjectsData) return [];
    
    return allProjectsData
      .filter((project) => mapProjectStatusToStage(project.status) === stage)
      .map((project) => ({
        status: true,
        message: "Project found",
        success: true as const,
        data: {
          id: project.id,
          name: project.name,
          description: project.description,
          client_id: project.client_id,
          end_date: project.end_date,
          status: project.status,
          progress: project.milestones?.length || 0,
          project_type: project.project_type,
          budget: project.budget,
          estimated_cost: project.estimated_cost,
          start_date: project.start_date,
          created_at: project.created_at,
          updated_at: project.updated_at,
          deleted: project.deleted,
          deleted_at: project.deleted_at,
          created_by: project.client.name,
          client: project.client || null,
          milestones: project.milestones || [],
          attachments: project.attachments || [],
        }
      }));
  };

  if (isLoading) {
    return (
      <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
        <Breadcrumb />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
        <Breadcrumb />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error loading projects. Please try again.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb />
      <div className="flex flex-wrap md:flex-row flex-col gap-4 2xl:gap-[1.5vw] justify-between items-start md:items-center">
        <h1 className="text-2xl 2xl:text-[1.8vw] font-semibold">
          Project List
        </h1>
        <div className="w-full md:w-auto flex gap-4 2xl:gap-[1vw] flex-col md:flex-row items-center">
          <Button
            title="Add New Project"
            variant="primary-outline"
            width="w-full md:w-fit"
            onClick={handleRedirectToAddProject}
          />
          <SearchBar
            onSearch={(query) => {
              console.log("Searching:", query);
            }}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw] 2xl:w-[20vw]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-[2vw]">
        {(["open", "inProgress", "completed"] as const).map((stage) => (
          <ProjectStageSection
            key={stage}
            projects={getProjectsByStage(stage)}
            label={stageLabels[stage]}
            bgColor={bgColors[stage]}
          />
        ))}
      </div>
    </section>
  );
}
