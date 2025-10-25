"use client";

import { useState, useMemo } from "react";
import { Breadcrumb } from "@/features";
import { ITicketData } from "@/services";
import { formatIndiaTime } from "@/utils";
import { HeaderDetails } from "../../../header-details";
import { TicketInfo, TicketEstimate, TicketCommentTab } from "./components";
import {
  useUpdateTicketStatusMutation,
  useTicketDetailQuery,
  useProjectDetailQuery,
  useMilestoneDetailQuery,
} from "@/services";
import { useParams } from "next/navigation";

export function TicketDetails({ ticketData }: { ticketData: ITicketData }) {
  const { projectId, milestoneId } = useParams<{ projectId: string; milestoneId: string }>();
  const [status, setStatus] = useState(ticketData.status || "open");
  const { ticketDetailRefetch } = useTicketDetailQuery({
    ticketId: ticketData.id,
  });
  
  // Fetch project and milestone data for breadcrumb
  const { projectDetailData } = useProjectDetailQuery(projectId || ticketData.project_id);
  const { milestoneDetailData } = useMilestoneDetailQuery(milestoneId || "");
  
  const { updateTicketStatus } = useUpdateTicketStatusMutation({
    onSuccessCallback: (response) => {
      setStatus(response.data.status);
      ticketDetailRefetch();
    },
    onErrorCallback: (err) => {
      console.error(err);
    },
  });

  const handleStatusChange = (newStatus: string) => {
    if (ticketData.id && newStatus !== status) {
      updateTicketStatus({ id: ticketData.id, status: newStatus });
    }
  };

  const validOptions = ["open", "in_progress", "completed", "closed"];
  const safeStatus = validOptions.includes(status.toLowerCase()) ? status : "open";

  // Build custom breadcrumb mapping
  const idToName = useMemo(() => {
    const mapping: Record<string, string> = {};
    
    // Add project mapping
    if (projectDetailData?.id && projectDetailData?.name) {
      mapping[projectDetailData.id] = projectDetailData.name;
    }
    
    // Add milestone mapping
    if (milestoneDetailData?.data?.id && milestoneDetailData?.data?.name) {
      mapping[milestoneDetailData.data.id] = milestoneDetailData.data.name;
    }
    
    // Add ticket mapping
    mapping[ticketData.id] = ticketData.title;
    
    return mapping;
  }, [projectDetailData, milestoneDetailData, ticketData.id, ticketData.title]);

  return (
    <section className="flex flex-col gap-6  border border-gray-300 rounded-lg  bg-white p-4 ">
      <Breadcrumb idToName={idToName} />
      <HeaderDetails
        title={ticketData.title}
        status={safeStatus}
        progress={"0 / 0"}
        onStatusChange={handleStatusChange}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <TicketInfo
            ticketInfoData={{
              title: ticketData.title,
              assigned_to: ticketData.assigned_to || "",
              description: ticketData.description || "",
              created_at: formatIndiaTime(
                `${ticketData.created_at}`,
                "toReadable"
              ),
              updated_at: formatIndiaTime(
                `${ticketData.updated_at}`,
                "toReadable"
              ),
              priority: ticketData.priority || "medium",
              // remark: ticketData.remark || "",
            }}
          />
        </div>
        <div>
          <TicketEstimate
            ticketEstimateData={{
              image_url: ticketData.image_url || "",
            }}
          />
        </div>
      </div>
      <TicketCommentTab 
        originalTitle={ticketData.title}
        originalDescription={ticketData.description || ""}
        taskId={ticketData.id}
      />
    </section>
  );
}
