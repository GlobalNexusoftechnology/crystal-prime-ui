"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { projectData, IProjectData } from "@/constants";

function fetchTaskData(taskSlug: string): IProjectData | null {
  return projectData.find((project) => project.slug === taskSlug) || null;
}

type TBlogProjectParam = {
  taskId: string;
};

function TaskDetails() {
  return <div>Task Details Page</div>;
}

export default function TaskDetailsPage() {
  const { taskId: taskSlug } = useParams<TBlogProjectParam>();
  const [taskData, setTaskData] = useState<IProjectData | null>(null);

  useEffect(() => {
    if (taskSlug) {
      const data = fetchTaskData(taskSlug);
      console.log({ data });
      setTaskData(data);
    }
  }, [taskSlug]);

  if (!taskData) {
    return <div>Page Data Found</div>;
  }

  return <TaskDetails />;
}
