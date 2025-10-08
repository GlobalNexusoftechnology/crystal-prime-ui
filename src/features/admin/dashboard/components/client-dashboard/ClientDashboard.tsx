"use client";

import React, { useState } from "react";
import { ClientDashboardCard } from "./components";
import { cardsData } from "@/constants";
import { GenerateTicketModal } from "@/features/admin/my-projects/components";

export function ClientDashboard() {
  const [isGenerateTicketModalOpen, setIsGenerateTicketModalOpen] =
    useState(false);
  const [selectedCardTitle, setSelectedCardTitle] = useState("");

  const handleCardClick = (title: string) => {
    setSelectedCardTitle(title);
    setIsGenerateTicketModalOpen(true);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {cardsData.map((card, index) => (
        <ClientDashboardCard
          key={index}
          title={card.title}
          description={card.description}
          icon={card.icon}
          onClick={() => handleCardClick(card.title)}
        />
      ))}

      {/* Generate Ticket Modal */}
      <GenerateTicketModal
        isOpen={isGenerateTicketModalOpen}
        onClose={() => setIsGenerateTicketModalOpen(false)}
        selectedCardTitle={selectedCardTitle}
      />
    </div>
  );
}
