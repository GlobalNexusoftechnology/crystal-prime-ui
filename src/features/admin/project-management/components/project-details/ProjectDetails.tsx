"use client";

import { Breadcrumb } from "@/features";
import {
  ClientInfo,
  DocumentSection,
  MilestoneTabs,
  ProjectEstimate,
  ProjectInfo,
} from "./components";
import { HeaderDetails } from "../header-details";
import { IProjectResponse, useAuthStore } from "@/services";
import { formatIndiaTime } from "@/utils";
import { buildIdToNameMapping } from "@/utils/helpers/buildIdToNameMapping";

export function ProjectDetails({
  projectDetailData,
}: {
  projectDetailData: IProjectResponse;
}) {
  const safeProject = {
    ...projectDetailData,
    milestones: (projectDetailData.milestones || []).map(m => ({
      ...m,
      id: m.id || "",
      name: m.name || "",
      tasks: (m.tasks || []).map(t => ({
        ...t,
        id: t.id || "",
        title: t.title || "",
      })),
    })),
  };

  const idToName = buildIdToNameMapping(
    projectDetailData.client ? [projectDetailData.client] : [],
    [safeProject]
  );
  const { activeSession } = useAuthStore();
  const userRole = activeSession?.user?.role.role;
  const isAdmin = userRole === "admin";

  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb idToName={idToName} />
      <HeaderDetails
        title={projectDetailData.name}
        status={projectDetailData.status || "N/A"}
        progress={
          projectDetailData.milestones
            ? `${
                projectDetailData.milestones.filter(
                  (m) => m.status === "completed"
                ).length
              } / ${projectDetailData.milestones.length}`
            : "0 / 0"
        }
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r border-gray-400">
          <ProjectInfo
            projectInfoData={{
              name: projectDetailData.name,
              project_type:
                typeof projectDetailData.project_type === "object" && projectDetailData.project_type !== null && "id" in projectDetailData.project_type
                  ? (projectDetailData?.project_type as { id: string }).id
                  : projectDetailData.project_type || "",
              contact_person: projectDetailData?.client?.contact_person || "",
              description: projectDetailData?.description || "",
              created_at: formatIndiaTime(
                projectDetailData?.created_at,
                "toReadable"
              ),
              updated_at: formatIndiaTime(
                projectDetailData?.updated_at,
                "toReadable"
              ),
            }}
          />
          <DocumentSection
            documentSectionData={(projectDetailData.attachments || []).map(
              (att) => ({
                file_path: att.file_path,
                name: att.file_name,
                uploaded_by: `${att.uploaded_by?.id}`,
                created_at: formatIndiaTime(`${att.created_at}`, "toReadable"),
              })
            )}
          />
        </div>
        <div>
          <ClientInfo
            clientInfoData={{
              client_name: projectDetailData.client?.name || "",
              company_name: projectDetailData.client?.company_name || "",
              contact_person: projectDetailData.client?.contact_person || "",
              phone: projectDetailData.client?.contact_number || "",
              email: projectDetailData.client?.email || "",
            }}
          />
{isAdmin &&
          <ProjectEstimate
            projectEstimateData={{
              start_date: projectDetailData.start_date
                ? formatIndiaTime(
                    projectDetailData.start_date.toString(),
                    "toReadable"
                  )
                : "",
              actual_start: projectDetailData.actual_start_date
                ? formatIndiaTime(
                    projectDetailData.actual_start_date.toString(),
                    "toReadable"
                  )
                : "",
              end_date: projectDetailData.end_date
                ? formatIndiaTime(projectDetailData.end_date.toString(), "toReadable")
                : "",
              actual_end: projectDetailData.actual_end_date
                ? formatIndiaTime(projectDetailData.actual_end_date.toString(), "toReadable")
                : "",
              estimated_cost: projectDetailData.estimated_cost
                ? String(projectDetailData.estimated_cost)
                : "",
              actual_cost: projectDetailData.actual_cost
                ? String(projectDetailData.actual_cost)
                : "",
              labour_cost: projectDetailData.cost_of_labour
                ? String(projectDetailData.cost_of_labour)
                : "",
              overhead_cost: projectDetailData.overhead_cost
                ? String(projectDetailData.overhead_cost)
                : "",
              budget: projectDetailData.budget
                ? String(projectDetailData.budget)
                : "",
              extra_cost: projectDetailData.extra_cost
                ? String(projectDetailData.extra_cost)
                : "",
            }}
          />}
        </div>
      </div>
      <MilestoneTabs
        milestoneData={projectDetailData.milestones}
        projectId={projectDetailData.id}
      />
    </section>
  );
}
