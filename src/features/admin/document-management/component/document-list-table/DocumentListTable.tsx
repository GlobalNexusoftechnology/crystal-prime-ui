"use client";

/**
 * DocumentListTable Component
 *
 * This component renders the Document List UI, including:
 * - A header with the title and controls such as:
 *    - Search bar
 *    - Status dropdown filter
 *    - Export button
 *    - "Add Staff" button (conditionally rendered)
 * - A responsive table displaying document data with configurable actions
 *
 * Props:
 * - setAddDocumentModalOpen (optional): Controls visibility of the "Add Staff" modal
 *
 * Dependencies:
 * - Uses reusable components: Button, Dropdown, SearchBar, Table
 * - Relies on constants: DocumentList (data), DocumentListColumn (column config), documentaction (row actions)
 *
 * Typically used in the Document Management page to manage uploaded document records.
 */

import { Dispatch, SetStateAction, useState } from "react";
import { Button, Dropdown, SearchBar, Table } from "@/components";
import { ExportIcon } from "@/features";
import { documentaction, DocumentList, DocumentListColumn } from "@/constants";

interface DocumentListTableProps {
  setAddDocumentModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DocumentListTable({ setAddDocumentModalOpen }: DocumentListTableProps) {
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const statusOptions = ["All Status", "New", "Contacted", "Qualified", "Lost"];

  const handleChange = (val: string) => {
    setSelectedStatus(val);
  };

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray 2xl:mx-[1vw] p-4 mt-4 2xl:p-[1vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
      <div className="flex justify-between items-center flex-nowrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium whitespace-nowrap pb-8">
          DOCUMENT LIST TABLE
        </h1>
        <div className="flex items-center flex-nowrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={(query) => console.log("Searching:", query)}
            bgColor="white"
            width="min-w-[12rem] md:w-[25vw]"
          />
          {setAddDocumentModalOpen && (
            <Button
              title="Add Staff"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => setAddDocumentModalOpen(true)}
            />
          )}
          <Dropdown
            options={statusOptions}
            value={selectedStatus}
            onChange={handleChange}
            dropdownWidth="w-full md:w-fit"
          />
          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
          />
        </div>
      </div>
      <Table data={DocumentList} columns={DocumentListColumn} actions={documentaction} />
    </div>
  );
}
