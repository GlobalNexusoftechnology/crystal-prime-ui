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
import { IProjectDetails } from '@/services';

export function ProjectDetails({ projectDetailData }: { projectDetailData: IProjectDetails }) {
  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb />
      <HeaderDetails
        title={projectDetailData.name}
        projectId={projectDetailData.id}
        status={projectDetailData.status || 'N/A'}
        progress={projectDetailData.milestones ? `${projectDetailData.milestones.filter(m => m.status === 'completed').length} / ${projectDetailData.milestones.length}` : '0 / 0'}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <ProjectInfo projectInfoData={{
            name: projectDetailData.name,
            type: projectDetailData.project_type || '',
            contactPerson: '',
            description: '',
            createdAt: projectDetailData.created_at,
            updatedAt: projectDetailData.updated_at,
          }} />
          <DocumentSection documentSectionData={(projectDetailData.attachments || []).map(att => ({
            name: att.file_name,
            uploadedBy: att.uploaded_by || '',
            uploadedAt: att.file_path || '',
          }))} />
        </div>
        <div>
          <ClientInfo clientInfoData={{
            clientName: projectDetailData.client_id || '',
            companyName: '',
            contactPerson: '',
            phone: '',
            email: '',
          }} />
          <ProjectEstimate projectEstimateData={{
            estimatedStart: projectDetailData.start_date || '',
            actualStart: projectDetailData.actual_start_date || '',
            estimatedEnd: projectDetailData.end_date || '',
            actualEnd: projectDetailData.actual_end_date || '',
            estimatedCost: projectDetailData.estimated_cost ? String(projectDetailData.estimated_cost) : '',
            actualCost: projectDetailData.actual_cost ? String(projectDetailData.actual_cost) : '',
            labourCost: '',
            overheadCost: '',
            budget: projectDetailData.budget ? String(projectDetailData.budget) : '',
          }} />
        </div>
      </div>
      <MilestoneTabs miletonesData={projectDetailData.milestones} projectId={projectDetailData.id} />
    </section>
  );
}
