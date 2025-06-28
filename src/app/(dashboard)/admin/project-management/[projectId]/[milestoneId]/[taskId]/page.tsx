"use client";

import { useParams } from "next/navigation";
import { useMilestoneTaskDetailQuery } from "@/services";
import { TaskDetails } from "@/features";

type TTaskParam = {
  taskId: string;
};

export default function TaskDetailsPage() {
  const { taskId: taskSlug } = useParams<TTaskParam>();  
  const { milestoneTaskDetailData, isLoading, error } = useMilestoneTaskDetailQuery(taskSlug);

  if (!taskSlug) {
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

  if (!milestoneTaskDetailData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Project not found</div>
        <div className="text-sm text-gray-600 mt-2">Project ID: {taskSlug}</div>
      </div>
    );
  }

  return <TaskDetails taskData={milestoneTaskDetailData} />;
}
