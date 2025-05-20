"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button, Dropdown, SearchBar, Table } from "@/components";
import {
  action,
  FollowUpManagementList,
  FollowUpManagementListColumn,
} from "@/constants";
import { ExportIcon } from "@/features";

/**
 * Props for the FollowUpManagementListTable component
 */
interface LeadsListTableProps {
  /** Optional function to toggle the follow-up modal visibility */
  setIsFollowUpModalOpen?: Dispatch<SetStateAction<boolean>>;
}

/**
 * FollowUpManagementListTable Component
 * 
 * This component displays a searchable, filterable table of follow-up leads.
 * It includes options for:
 * - Searching leads by keyword
 * - Filtering by status (e.g., New, Contacted)
 * - Adding a new follow-up (via modal)
 * - Exporting data
 */
export function FollowUpManagementListTable({
  setIsFollowUpModalOpen,
}: LeadsListTableProps) {
  // Local state to track the selected status filter
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // Options for the status filter dropdown
  const statusOptions = ["All Status", "New", "Contacted", "Qualified", "Lost"];

  /**
   * Handles change in dropdown status filter
   * @param val - selected status string
   */
  const handleChange = (val: string) => {
    setSelectedStatus(val);
  };

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray mx-4 2xl:mx-[1vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
      
      {/* Header and action controls */}
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Follow Up List
        </h1>

        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          {/* Search input */}
          <SearchBar
            onSearch={(query) => console.log("Searching:", query)}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />

          {/* Add follow-up button (if modal control is provided) */}
          {setIsFollowUpModalOpen && (
            <Button
              title="Add Follow Up"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => setIsFollowUpModalOpen(true)}
            />
          )}

          {/* Status filter dropdown */}
          <Dropdown
            options={statusOptions}
            value={selectedStatus}
            onChange={handleChange}
            dropdownWidth="w-full md:w-fit"
          />

          {/* Export button */}
          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
          />
        </div>
      </div>

      {/* Data table for follow-up management */}
      <Table
        data={FollowUpManagementList}
        columns={FollowUpManagementListColumn}
        actions={action}
      />
    </div>
  );
}
