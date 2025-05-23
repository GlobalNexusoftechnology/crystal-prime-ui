"use client";

import { useState } from "react";
import { Button, SearchBar, Table } from "@/components";
import {
  IStaffListProps,
  ITableAction,
  staffList,
  staffListColumn,
} from "@/constants";
import { ExportIcon } from "@/features";
import { AddNewStaffModel } from "../add-new-staff-model";
import { EditStaffModel } from "../edit-staff-model";
import { ViewStaffModel } from "../view-staff-model";

export function StaffListTable() {
  const [isAddStaffModalOpen, setAddStaffIsModalOpen] = useState(false);
  const [isEditStaffModalOpen, setEditStaffIsModalOpen] = useState(false);
    const [isViewStaffModalOpen, setViewStaffIsModalOpen] = useState(false);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setSelectedRow] = useState<any>(null);

  const handleOpenModal = () => {
    setSelectedRow(null);
    setAddStaffIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddStaffIsModalOpen(false);
    setSelectedRow(null);
  };
  const handleCloseEditStaffModel = () => {
    setEditStaffIsModalOpen(false);
  };

 const handleCloseViewStaffModel = () => {
    setViewStaffIsModalOpen(false);
  };

  const staffActions: ITableAction<IStaffListProps>[] = [
        {
      label: "View",
      onClick: (row) => {
        console.log("View clicked", row.id);
        setViewStaffIsModalOpen(true);
      },
      className: "text-blue-500 whitespace-nowrap",
    },
    {
      label: "Edit",
      onClick: (row) => {
        console.log("Edit clicked", row.id);
        setEditStaffIsModalOpen(true);
      },
      className: "text-blue-500 whitespace-nowrap",
    },
    {
      label: "Delete",
      onClick: (row) => {
        console.log("Delete clicked", row.id);
      },
      className: "text-red-500",
    },
  ];

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray mx-4 2xl:mx-[1vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Staff List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={(query) => console.log("Searching:", query)}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />

          <div>
            <Button
              title="Add Staff"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={handleOpenModal}
            />

            <AddNewStaffModel
              isOpen={isAddStaffModalOpen}
              onClose={handleCloseModal}
            />
          </div>

          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
          />
        </div>
      </div>

      <Table
        data={staffList}
        columns={staffListColumn}
        actions={staffActions}
      />

      {isEditStaffModalOpen && (
        <EditStaffModel
          isOpen={isEditStaffModalOpen}
          onClose={handleCloseEditStaffModel}
        />
      )}

        {isViewStaffModalOpen && (
        <ViewStaffModel
          isOpen={isViewStaffModalOpen}
          onClose={handleCloseViewStaffModel}
        />
      )}
    </div>
  );
}
