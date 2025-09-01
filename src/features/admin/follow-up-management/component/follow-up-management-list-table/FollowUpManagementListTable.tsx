"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button, Dropdown, SearchBar, Table } from "@/components";
import {
  FollowUpManagementList,
  FollowUpManagementListColumn,
  IFollowUpManagementListProps,
  ITableAction,
} from "@/constants";
import { ViewFollowUp } from "@/features";
import { EditFollowUp } from "../edit-follow-up";

import { ExportIcon } from "@/features";
import { useAllStatusesQuery } from "@/services";
import { useFormik } from "formik";

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
  // State to track view/edit follow-up modal
  const [editFollowUp, setEditFollowUp] =
    useState<IFollowUpManagementListProps | null>(null);

  const [viewFollowUp, setViewFollowUp] =
    useState<IFollowUpManagementListProps | null>(null);

  // Fetch statuses from API
  const { allStatusesData } = useAllStatusesQuery();

  // Create status options dynamically with a fallback
  const statusOptions = [
    { label: "All Status", value: "" },
    ...(allStatusesData?.data?.list?.map((status) => ({
      label: status?.name,
      value: status?.id.toString(),
    })) || []),
  ];

  // Formik state for filters
  const { values, setFieldValue } = useFormik({
    initialValues: {
      status_id: "",
      search: "",
    },
    onSubmit: () => {},
  });

  const actions: ITableAction<IFollowUpManagementListProps>[] = [
    {
      label: "Edit",
      onClick: (row: IFollowUpManagementListProps) => {
        setEditFollowUp(row);
        console.log("Edit clicked", row.id);
      },
      className: "text-blue-500",
    },
    {
      label: "View",
      onClick: (row: IFollowUpManagementListProps) => {
        setViewFollowUp(row);
        console.log("View clicked", row.id);
      },
      className: "text-blue-500",
    },
    {
      label: "Delete",
      onClick: (row: IFollowUpManagementListProps) => {
        console.log("Delete clicked", row.id);
      },
      className: "text-blue-500",
    },
    {
      label: "Explore As xlsx",
      onClick: (row: IFollowUpManagementListProps) => {
        console.log("Explore As xlsx clicked", row.id);
      },
      className: "text-blue-500 whitespace-nowrap",
    },
  ];

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray mx-4 2xl:mx-[1vw] p-4 2xl:p-[1vw] border 2xl:border-[0.05vw] rounded-xl 2xl:rounded-[0.75vw]">
      {/* Header and action controls */}
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Follow Up List
        </h1>

        <div className="flex items-center gap-4 2xl:gap-[1vw]">
          {/* Search input */}
          <SearchBar
            onSearch={(query) => {
              console.log("Searching:", query);
              setFieldValue("search", query);
            }}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />

          {/* Add follow-up button */}
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
            value={values.status_id}
            onChange={(val) => setFieldValue("status_id", val)}
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

      {/* Data table */}
      <Table
        data={FollowUpManagementList}
        columns={FollowUpManagementListColumn}
        actions={actions}
      />

      {/* Edit/View Modal */}
      {editFollowUp && (
        <EditFollowUp
          followUp={editFollowUp}
          onClose={() => setEditFollowUp(null)}
        />
      )}

      {viewFollowUp && (
        <ViewFollowUp
          showFollowUp={viewFollowUp}
          onClose={() => setViewFollowUp(null)}
        />
      )}
    </div>
  );
}
