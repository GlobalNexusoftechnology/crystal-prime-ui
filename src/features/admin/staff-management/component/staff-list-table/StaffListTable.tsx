"use client";

/**
 * StaffListTable Component
 *
 * This component renders the Staff List UI including:
 * - Header with title and controls (Approved/Not Approved filters, search bar, status dropdown, export and add staff buttons)
 * - A responsive table displaying staff data
 *
 * Props:
 * - setAddStaffModalOpen (optional): Controls visibility of the "Add Staff" modal
 *
 * Used in staff management features/pages.
 */

import { Dispatch, SetStateAction } from "react";
import { Button, Dropdown, SearchBar, Table } from "@/components";
import { ExportIcon } from "@/features";
import { staffActions, StaffList, StaffListColumn } from "@/constants";
import { useAllStatusesQuery } from "@/services";
import { useFormik } from "formik";

interface StaffListTableProps {
  setAddStaffModalOpen?: Dispatch<SetStateAction<boolean>>;
}

// StaffListTable: Displays staff records with filters, actions, and export options
export function StaffListTable({ setAddStaffModalOpen }: StaffListTableProps) {
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

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray mx-4 2xl:mx-[1vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
      <div className="flex justify-between items-center flex-nowrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium whitespace-nowrap pb-8">
          Staff List
        </h1>
        <div className="flex items-center flex-nowrap gap-4 2xl:gap-[1vw]">
          <h1 className="whitespace-nowrap text-fuchsia-950 underline font-semibold">
            Approved
          </h1>
          <h1 className="whitespace-nowrap font-semibold">Not Approved</h1>

          <SearchBar
            onSearch={(query) => console.log("Searching:", query)}
            bgColor="white"
            width="min-w-[12rem] md:w-[25vw]"
          />

          {setAddStaffModalOpen && (
            <Button
              title="Add Staff"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => setAddStaffModalOpen(true)}
            />
          )}
          <Dropdown
            label="Status"
            options={statusOptions}
            value={values.status_id}
            onChange={(val) => setFieldValue("status_id", val)}
          />
          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
          />
        </div>
      </div>
      <Table
        data={StaffList}
        columns={StaffListColumn}
        actions={staffActions}
      />
    </div>
  );
}
