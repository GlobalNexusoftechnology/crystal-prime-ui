"use client";

import { Dispatch, SetStateAction } from "react";
import { useFormik } from "formik";
import { Button, Dropdown, SearchBar, Table } from "@/components";
import { ExportIcon } from "@/features";
import {
  documentaction,
  DocumentList,
  DocumentListColumn,
} from "@/constants";
import { useAllStatusesQuery } from "@/services";

interface DocumentListTableProps {
  setAddDocumentModalOpen?: Dispatch<SetStateAction<boolean>>;
}

/**
 * DocumentListTable Component
 *
 * Renders the document list with search, filter, and actions.
 */
export function DocumentListTable({
  setAddDocumentModalOpen,
}: DocumentListTableProps) {
  // Fetch status options
  const { allStatusesData } = useAllStatusesQuery();

  const statusOptions =
    allStatusesData?.map((status) => ({
      label: status?.name,
      value: status?.id.toString(),
    })) || [];

  // Formik state for filters
  const { values, setFieldValue } = useFormik({
    initialValues: {
      status_id: "",
      search: "",
    },
    onSubmit: () => {},
  });

  // Handle search
  const handleSearch = (query: string) => {
    setFieldValue("search", query);
    console.log("Searching:", query);
  };

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray 2xl:mx-[1vw] p-4 mt-4 2xl:p-[1vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
      {/* Header */}
      <div className="flex justify-between items-center flex-nowrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium whitespace-nowrap pb-8">
          DOCUMENT LIST TABLE
        </h1>

        {/* Controls */}
        <div className="flex items-center flex-nowrap gap-4 2xl:gap-[1vw]">
          {/* Search */}
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="min-w-[12rem] md:w-[25vw]"
          />

          {/* Add Staff Button */}
          {setAddDocumentModalOpen && (
            <Button
              title="Add Staff"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => setAddDocumentModalOpen(true)}
            />
          )}

          {/* Status Dropdown */}
          <Dropdown
            label="Status"
            options={statusOptions}
            value={values.status_id}
            onChange={(val) => setFieldValue("status_id", val)}
          />

          {/* Export Button */}
          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
          />
        </div>
      </div>

      {/* Document Table */}
      <Table
        data={DocumentList}
        columns={DocumentListColumn}
        actions={documentaction}
      />
    </div>
  );
}
