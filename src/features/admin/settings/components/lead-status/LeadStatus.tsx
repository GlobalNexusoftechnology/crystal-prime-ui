"use client";

import { useState } from "react";
import { SearchBar, Button, Table } from "@/components";
import {
  ILeadStatusColumn,
  leadastatusction,
  LeadStatusListTable,
} from "@/constants";
import { LeadStatusModal } from "../lead-status-modal";

/**
 * `LeadStatus` component displays a searchable list of lead statuses.
 * 
 * Features:
 * - Search bar to filter lead statuses by name.
 * - Button to open a modal for adding a new lead status.
 * - Table displaying the filtered lead status data with actions.
 * - Modal dialog for adding a new lead status.
 */
export function LeadStatus() {
  // State to keep track of the search input value
  const [searchTerm, setSearchTerm] = useState("");

  // State to control the visibility of the "Add Lead Status" modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  /**
   * Updates the search term state when the user types in the search bar.
   * 
   * @param value - The current search input value.
   */
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Filter the lead status list based on the search term (case-insensitive)
  const filteredData = LeadStatusListTable.filter((lead) =>
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#F8F8F8] p-5 rounded-xl">
      {/* Header with title, search bar, and add button */}
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Leads Status List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          <Button
            title="Add statuses"
            variant="background-white"
            width="w-full md:w-fit"
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>
      </div>

      {/* Table displaying the filtered lead statuses with defined columns and actions */}
      <div className="w-full mt-4">
        <Table
          data={filteredData}
          columns={ILeadStatusColumn}
          actions={leadastatusction}
        />
      </div>

      {/* Modal for adding a new lead status, conditionally rendered */}
      {isAddModalOpen && (
        <LeadStatusModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
