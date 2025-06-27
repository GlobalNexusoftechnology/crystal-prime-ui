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
import { IProjectResponse } from '@/services';

export function ProjectDetails({ projectDetailData }: { projectDetailData: IProjectResponse }) {
  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb />
      <HeaderDetails
        title={projectDetailData.name}
        status={projectDetailData.status || 'N/A'}
        progress={projectDetailData.milestones ? `${projectDetailData.milestones.filter(m => m.status === 'completed').length} / ${projectDetailData.milestones.length}` : '0 / 0'}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <ProjectInfo projectInfoData={{
            name: projectDetailData.name,
            project_type: projectDetailData.project_type || '',
            contact_person: '',
            description: '',
            created_at: projectDetailData.created_at,
            updated_at: projectDetailData.updated_at,
          }} />
          <DocumentSection documentSectionData={(projectDetailData.documents || []).map(att => ({
            name: att.file_name,
            uploaded_by: typeof att.uploaded_by === 'string' ? att.uploaded_by : att.uploaded_by?.first_name || att.uploaded_by?.email || '',
            created_at: att.created_at ? att.created_at.toString() : '',
          }))} />
        </div>
        <div>
          <ClientInfo clientInfoData={{
            client_name: projectDetailData.client_id || '',
            company_name: '',
            contact_person: '',
            phone: '',
            email: '',
          }} />
          <ProjectEstimate projectEstimateData={{
            start_date: projectDetailData.start_date ? projectDetailData.start_date.toString() : '',
            actual_start: projectDetailData.actual_start_date ? projectDetailData.actual_start_date.toString() : '',
            end_date: projectDetailData.end_date ? projectDetailData.end_date.toString() : '',
            actual_end: projectDetailData.actual_end_date ? projectDetailData.actual_end_date.toString() : '',
            estimated_cost: projectDetailData.estimated_cost ? String(projectDetailData.estimated_cost) : '',
            actual_cost: projectDetailData.actual_cost ? String(projectDetailData.actual_cost) : '',
            labour_cost: '',
            overhead_cost: '',
            budget: projectDetailData.budget ? String(projectDetailData.budget) : '',
          }} />
        </div>
      </div>
      <MilestoneTabs 
        miletonesData={projectDetailData.milestones} 
        projectId={projectDetailData.id} 
      />
    </section>
  );
}
