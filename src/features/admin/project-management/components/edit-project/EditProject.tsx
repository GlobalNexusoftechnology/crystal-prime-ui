"use client";
import React, { useState, useEffect } from "react";
import { AddProject } from "../add-project/AddProject";
import { useProjectDetailQuery } from "@/services";
import { IAddProjectFormValues, Milestone } from "../add-project/AddProject";

interface EditProjectProps {
  projectId: string;
}

// Helper function to convert attachment data to File object
const createFileFromAttachment = (attachment: {
  id?: string;
  file_type?: string;
  file_name: string;
  created_at?: string;
  uploaded_by?: { id?: string; first_name?: string; last_name?: string };
  file_path?: string;
}): File => {
  // Create a blob from the file path or use a placeholder
  const blob = new Blob([''], { type: attachment.file_type || 'application/octet-stream' });
  
  // Create a File object with the attachment data
  const file = new File([blob], attachment.file_name, {
    type: attachment.file_type || 'application/octet-stream',
    lastModified: attachment.created_at ? new Date(attachment.created_at).getTime() : Date.now(),
  });
  
  // Add metadata to the file object to preserve original data
  (file as File & { originalAttachment: typeof attachment }).originalAttachment = attachment;
  
  return file;
};

export function EditProject({ projectId }: EditProjectProps) {
  const { projectDetailData, isLoading, error, refetch } = useProjectDetailQuery(projectId);
  const [initialFormValues, setInitialFormValues] = useState<IAddProjectFormValues | null>(null);
  const [transformedMilestones, setTransformedMilestones] = useState<Milestone[]>([]);
  const [existingAttachments, setExistingAttachments] = useState<File[]>([]);

  // Store original project data to preserve tickets
  const [originalProjectData, setOriginalProjectData] = useState<typeof projectDetailData | null>(null);

  // Force refetch on component mount to ensure fresh data
  useEffect(() => {
    refetch();
  }, [projectId, refetch]);

  useEffect(() => {
    if (projectDetailData) {
      // Store original data on first load to preserve tickets
      if (!originalProjectData) {
        setOriginalProjectData(projectDetailData);
      }

      // Transform project detail data to form values
      const formValues: IAddProjectFormValues = {
        client_id: projectDetailData.client?.id || "",
        name: projectDetailData.name || "",
        description: projectDetailData.description || "",
        project_type: typeof projectDetailData.project_type === "object" && projectDetailData.project_type !== null && "id" in projectDetailData.project_type
          ? (projectDetailData.project_type as { id: string }).id
          : projectDetailData.project_type || "",
        budget: projectDetailData.budget || 0,
        estimated_cost: projectDetailData.estimated_cost || 0,
        cost_of_labour: projectDetailData.cost_of_labour || 0,
        overhead_cost: projectDetailData.overhead_cost || 0,
        extra_cost: projectDetailData.extra_cost || 0,
        start_date: projectDetailData.start_date ? new Date(projectDetailData.start_date).toISOString().slice(0, 10) : undefined,
        end_date: projectDetailData.end_date ? new Date(projectDetailData.end_date).toISOString().slice(0, 10) : undefined,
        template_id: projectDetailData.template_id || null,
        renewal_type: projectDetailData.is_renewal ? (projectDetailData.renewal_type || null) : null,
        renewal_date: projectDetailData.is_renewal && projectDetailData.renewal_date ? new Date(projectDetailData.renewal_date).toISOString().slice(0, 10) : undefined,
        is_renewal: projectDetailData.is_renewal || false,
        milestoneOption: "milestone", // Default value for edit mode
      };
      setInitialFormValues(formValues);

      // Transform milestones from API response to local format
      const milestones: Milestone[] = (projectDetailData?.milestones || [])?.map((milestone) => {
        // Find corresponding milestone in original data to preserve tickets
        let originalMilestone = null;
        if (originalProjectData && originalProjectData.milestones) {
          originalMilestone = originalProjectData.milestones.find((orig) => 
            orig.name === milestone.name && orig.name === "Support"
          );
        }

        // Use tickets from original milestone if current milestone has no tickets
        const ticketsToUse = (milestone.tickets && milestone.tickets.length > 0) 
          ? milestone.tickets 
          : (originalMilestone && originalMilestone.tickets) 
            ? originalMilestone.tickets 
            : [];

        return {
          id: milestone.id || "",
          name: milestone.name || "",
          description: milestone.description || "",
          assigned_to: milestone.assigned_to || "",
          status: milestone.status || "",
          start_date: milestone.start_date || "",
          end_date: milestone.end_date || "",
          tasks: (milestone.tasks || [])?.map((task) => ({
            id: task.id || "",
            title: task.title || "",
            description: task.description || "",
            assigned_to: task.assigned_to || "",
            status: task.status || "",
            due_date: task.due_date || "",
          })),
          tickets: ticketsToUse.map((ticket) => ({
            id: ticket.id || "",
            title: ticket.title || "",
            description: ticket.description || "",
            assigned_to: ticket.assigned_to || null,
            status: ticket.status || "",
            priority: ticket.priority || "",
            remark: ticket.remark || "",
            image_url: ticket.image_url || "",
            created_at: ticket.created_at || "",
          })),
        };
      });
      setTransformedMilestones(milestones);

      // Transform existing attachments to File objects
      const attachments: File[] = (projectDetailData.attachments || [])?.map((attachment) => 
        createFileFromAttachment(attachment)
      );
      setExistingAttachments(attachments);
    }
  }, [projectDetailData, originalProjectData]);

  if (isLoading) {
    return (
      <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[1vw]">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading project details...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[1vw]">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error loading project details. Please try again.</div>
          <div className="text-[0.9rem] text-gray-600 mt-2">Error: {error.message}</div>
        </div>
      </section>
    );
  }

  if (!projectDetailData || !initialFormValues) {
    return (
      <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[1vw]">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Project not found</div>
          <div className="text-[0.9rem] text-gray-600 mt-2">Project ID: {projectId}</div>
        </div>
      </section>
    );
  }

  return (
    <AddProject 
      mode="edit" 
      projectId={projectId}
      initialFormValues={initialFormValues}
      existingMilestones={transformedMilestones}
      existingAttachments={existingAttachments}
    />
  );
} 