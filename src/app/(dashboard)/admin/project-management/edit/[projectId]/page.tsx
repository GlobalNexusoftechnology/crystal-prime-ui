"use client";

import { useParams } from "next/navigation";
import { EditProject } from "@/features";

type TProjectParam = {
  projectId: string;
};

export default function EditProjectPage() {
  const { projectId } = useParams<TProjectParam>();

  if (!projectId) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Invalid project ID</div>
      </div>
    );
  }

  return <EditProject projectId={projectId} />;
} 