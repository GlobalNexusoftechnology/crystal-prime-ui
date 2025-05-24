"use client";

import { useState } from "react";
import { Button, SearchBar, Table } from "@/components";
import {
  ITableAction,
  // staffList,
  staffListColumn,
} from "@/constants";
import { IAllUsersListResponse, useAllUsersQuery } from "@/services"; 
import { ExportIcon } from "@/features";
import { AddNewStaffModel } from "../add-new-staff-model";
import { EditStaffModel } from "../edit-staff-model";
import { ViewStaffModel } from "../view-staff-model";
import { formatDate } from "@/utils";

export function StaffListTable() {
  const { allUsersData, refetchAllUsers } = useAllUsersQuery();
  const [ userId, setUserId] = useState("")
  const [isAddStaffModalOpen, setAddStaffIsModalOpen] = useState(false);
  const [isEditStaffModalOpen, setEditStaffIsModalOpen] = useState(false);
    const [isViewStaffModalOpen, setViewStaffIsModalOpen] = useState(false);

      const userList: IAllUsersListResponse[] = (allUsersData ?? []).map((user) => ({
        id: user.id || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        number: user?.phone_number || "",
        email: user?.email || "",
        role: user?.role || "",
        dob: user?.dob || "",
        created_at: formatDate(user?.created_at) || "",
        updated_at: formatDate(user?.updated_at) || "",
      }));

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

  const staffActions: ITableAction<IAllUsersListResponse>[] = [
        {
      label: "View",
      onClick: (row) => {
        console.log("View clicked", row.id);
        setViewStaffIsModalOpen(true);
        setUserId(row.id)
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

  const handleNewStaffSuccesCallback = () => {
    refetchAllUsers();
  }

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
              onNewStaffSuccesCallback={handleNewStaffSuccesCallback}
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
        data={userList}
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
          userId={userId}
        />
      )}
    </div>
  );
}
