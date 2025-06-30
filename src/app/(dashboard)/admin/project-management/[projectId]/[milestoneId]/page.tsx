"use client";

import { useParams } from "next/navigation";
import { MilestoneDetails } from "@/features";
import { useMilestoneDetailQuery } from "@/services";

type TMilestoneParam = {
  milestoneId: string;
};

export default function MilestoneDetailsPage() {
  const { milestoneId: milestoneSlug } = useParams<TMilestoneParam>();  
  const { milestoneDetailData, isLoading, error } = useMilestoneDetailQuery(milestoneSlug);

  if (!milestoneSlug) {
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

  if (!milestoneDetailData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Project not found</div>
        <div className="text-sm text-gray-600 mt-2">Project ID: {milestoneSlug}</div>
      </div>
    );
  }

  return <MilestoneDetails milestoneData={milestoneDetailData.data} />;
}
