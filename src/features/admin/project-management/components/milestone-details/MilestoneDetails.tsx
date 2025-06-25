"use client";

import { Breadcrumb } from "@/features";
import {
  MilestoneEstimate,
  MilestoneInfo,
  TaskTabs,
} from "./components";
import { HeaderDetails } from "../header-details";
import { IMilestoneResponse } from '@/services';
import { formatDate } from "@/utils";

export function MilestoneDetails({ milestoneData }: { milestoneData: IMilestoneResponse }) {
  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb />
      <HeaderDetails
        title={milestoneData.milestone.name}
        status={milestoneData.milestone.status || 'N/A'}
        progress={'0 / 0'}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <MilestoneInfo milestoneInfoData={{
            name: milestoneData.milestone.name,
            assignedTo: milestoneData.milestone.assigned_to || '',
            description: milestoneData.milestone.desciption,
            createdAt: formatDate(`${milestoneData.milestone.created_at}`),
            updatedAt: formatDate(`${milestoneData.milestone.updated_at}`),
          }} />
          <div>
            <MilestoneEstimate milestoneEstimateData={{
              estimatedStart: milestoneData.milestone.start_date || '',
              estimatedEnd: milestoneData.milestone.end_date || '',
              actualStart: milestoneData.milestone.actual_date || '',
            }} />
          </div>
        </div>
        <TaskTabs
          TaskData={milestoneData.milestone}
          milestoneId={milestoneData.milestone.id}
        />
      </div>
    </section>
  );
}
