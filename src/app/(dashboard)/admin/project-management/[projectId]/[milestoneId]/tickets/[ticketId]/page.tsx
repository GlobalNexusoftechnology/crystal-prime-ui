"use client";

import { useParams } from "next/navigation";
import { useTicketDetailQuery } from "@/services";
import { TicketDetails } from "@/features";

type TTicketParam = {
  ticketId: string;
};

export default function TicketDetailsPage() {
  const { ticketId: ticketSlug } = useParams<TTicketParam>();  
  const { ticketDetailData, isLoading, error } = useTicketDetailQuery({
    ticketId: ticketSlug,
  });

  if (!ticketSlug) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Invalid ticket ID</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading ticket details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Error loading ticket details. Please try again.</div>
        <div className="text-[0.9rem] text-gray-600 mt-2">Error: {error.message}</div>
      </div>
    );
  }

  if (!ticketDetailData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Ticket not found</div>
        <div className="text-[0.9rem] text-gray-600 mt-2">Ticket ID: {ticketSlug}</div>
      </div>
    );
  }

  return <TicketDetails ticketData={ticketDetailData} />;
}
